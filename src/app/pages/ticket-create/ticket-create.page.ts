import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonItem, IonInput, IonSelect, IonSelectOption,
  IonTextarea, IonButton, IonIcon, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonNote, AlertController,
  ToastController, LoadingController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  qrCode, locate, checkmarkCircle, warning, closeCircle, navigateCircle
} from 'ionicons/icons';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Ticket, TicketCategory, TicketStatus } from '../../models/ticket.model';
import { SupabaseService } from '../../services/supabase.service';
import { GeolocationService } from '../../services/geolocation.service';
import { NetworkService } from '../../services/network.service';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.page.html',
  styleUrls: ['./ticket-create.page.scss'],
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonBackButton, IonButtons, IonItem, IonInput, IonSelect, IonSelectOption,
    IonTextarea, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonNote
  ]
})
export class TicketCreatePage implements OnInit {
  ticket: Ticket = {
    title: '',
    description: '',
    category: TicketCategory.TECHNIK,
    status: TicketStatus.OFFEN,
    location: ''
  };

  categories = TicketCategory;
  isOnline = true;
  isSubmitting = false;
  isGettingLocation = false;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private geolocationService: GeolocationService,
    private networkService: NetworkService,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({ qrCode, locate, checkmarkCircle, warning, closeCircle, navigateCircle });
  }

  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe(isOnline => {
      this.isOnline = isOnline;
    });
  }

  async getGPSLocation() {
    this.isGettingLocation = true;
    console.log('🎯 GPS button clicked');
    
    try {
      const locationString = await this.geolocationService.getLocationString();
      console.log('📍 Location string received:', locationString);
      
      if (locationString && locationString !== 'Standort nicht verfügbar') {
        this.ticket.location = locationString;
        this.showToast('✅ GPS-Standort erfasst', 'success');
        console.log('✅ Location set to ticket:', this.ticket.location);
      } else {
        this.showToast('⚠️ GPS-Standort konnte nicht ermittelt werden', 'warning');
      }
    } catch (error: any) {
      console.error('❌ Error getting GPS location:', error);
      
      let errorMessage = 'Fehler beim Abrufen des Standorts';
      if (error.message) {
        errorMessage = error.message;
      }
      
      this.showToast(errorMessage, 'danger');
    } finally {
      this.isGettingLocation = false;
    }
  }

  async scanQRCode() {
    try {
      // Berechtigung prüfen
      const permission = await BarcodeScanner.checkPermissions();
      if (permission.camera !== 'granted') {
        const request = await BarcodeScanner.requestPermissions();
        if (request.camera !== 'granted') {
          this.showToast('Kamera-Berechtigung erforderlich', 'warning');
          return;
        }
      }

      // QR-Code scannen
      const result = await BarcodeScanner.scan();
      if (result.barcodes && result.barcodes.length > 0) {
        this.ticket.location = result.barcodes[0].rawValue;
        this.showToast('QR-Code erfolgreich gescannt', 'success');
      }
    } catch (error) {
      console.error('QR-Code Scan Error:', error);
      // Fallback: Manuelle Eingabe
      const alert = await this.alertController.create({
        header: 'QR-Code Scanner',
        message: 'QR-Code Scanner nicht verfügbar. Bitte Standort manuell eingeben.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  isFormValid(): boolean {
    return !!(this.ticket.title && this.ticket.description && this.ticket.category);
  }

  async submitTicket() {
    if (!this.isFormValid()) {
      this.showToast('Bitte fülle alle Pflichtfelder aus', 'warning');
      return;
    }

    this.isSubmitting = true;
    const loading = await this.loadingController.create({
      message: 'Ticket wird erstellt...'
    });
    await loading.present();

    try {
      this.ticket.created_at = new Date().toISOString();
      this.ticket.updated_at = new Date().toISOString();

      if (this.isOnline) {
        // Online: Direkt in Supabase speichern
        const savedTicket = await this.supabaseService.createTicket(this.ticket);
        if (savedTicket) {
          await this.notificationService.notifyTicketCreated(this.ticket.title);
          this.showToast('Ticket erfolgreich erstellt', 'success');
          this.router.navigate(['/ticket-list']);
        } else {
          throw new Error('Fehler beim Speichern');
        }
      } else {
        // Offline: Lokal speichern
        await this.storageService.saveTicketLocally(this.ticket);
        this.showToast('Ticket lokal gespeichert (wird später synchronisiert)', 'warning');
        this.router.navigate(['/ticket-list']);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      this.showToast('Fehler beim Erstellen des Tickets', 'danger');
    } finally {
      this.isSubmitting = false;
      await loading.dismiss();
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
