import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonBadge, IonList, IonItem, IonLabel, IonSegment,
  IonSegmentButton, IonSpinner, AlertController, ToastController,
  ActionSheetController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  ellipsisVertical, location, time, trash, share, construct, business,
  fitness, ellipsisHorizontal
} from 'ionicons/icons';
import { Ticket, TicketCategory, TicketStatus } from '../../models/ticket.model';
import { SupabaseService } from '../../services/supabase.service';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonBackButton, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge, IonList, IonItem,
    IonLabel, IonSegment, IonSegmentButton, IonSpinner
  ]
})
export class TicketDetailPage implements OnInit {
  ticket: Ticket | null = null;
  ticketStatus = TicketStatus;
  isLoading = true;
  isOnline = true;
  private ticketId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private networkService: NetworkService,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
    addIcons({
      ellipsisVertical, location, time, trash, share, construct, business,
      fitness, ellipsisHorizontal
    });
  }

  async ngOnInit() {
    this.ticketId = this.route.snapshot.paramMap.get('id') || '';
    
    // Network-Status prüfen
    this.networkService.getNetworkStatus().subscribe(isOnline => {
      this.isOnline = isOnline;
    });
    
    await this.loadTicket();
  }

  async loadTicket() {
    this.isLoading = true;
    try {
      if (this.ticketId) {
        this.ticket = await this.supabaseService.getTicketById(this.ticketId);
      }
    } catch (error) {
      console.error('Error loading ticket:', error);
      this.showToast('Fehler beim Laden des Tickets', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async updateStatus() {
    if (!this.ticket || !this.ticket.id) return;

    try {
      const updatedTicket = await this.supabaseService.updateTicket(
        this.ticket.id,
        { 
          status: this.ticket.status,
          updated_at: new Date().toISOString()
        }
      );

      if (updatedTicket) {
        this.ticket = updatedTicket;
        await this.notificationService.notifyTicketStatusChange(
          this.ticket.title,
          this.ticket.status
        );
        this.showToast('Status aktualisiert', 'success');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      this.showToast('Fehler beim Aktualisieren', 'danger');
    }
  }

  async deleteTicket() {
    if (!this.ticket) return;

    const alert = await this.alertController.create({
      header: 'Ticket löschen?',
      message: `Möchtest du das Ticket "${this.ticket.title}" wirklich löschen?`,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: async () => {
            try {
              if (this.isOnline && this.ticket?.id) {
                // Online: Aus Supabase löschen
                const success = await this.supabaseService.deleteTicket(this.ticket.id);
                if (success) {
                  this.showToast('Ticket gelöscht', 'success');
                  this.router.navigate(['/ticket-list']);
                } else {
                  this.showToast('Fehler beim Löschen', 'danger');
                }
              } else {
                // Offline: Nur lokal löschen
                const key = this.ticket?.id || `temp_${this.ticket?.created_at}`;
                await this.storageService.removeLocalTicket(key);
                this.showToast('Ticket lokal gelöscht', 'success');
                this.router.navigate(['/ticket-list']);
              }
            } catch (error) {
              console.error('Error deleting ticket:', error);
              this.showToast('Fehler beim Löschen', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Aktionen',
      buttons: [
        {
          text: 'Teilen',
          icon: 'share',
          handler: () => {
            this.shareTicket();
          }
        },
        {
          text: 'Löschen',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteTicket();
          }
        },
        {
          text: 'Abbrechen',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });

    await actionSheet.present();
  }

  async shareTicket() {
    if (!this.ticket) return;

    const text = `Ticket: ${this.ticket.title}\nKategorie: ${this.ticket.category}\nStatus: ${this.ticket.status}\nBeschreibung: ${this.ticket.description}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.ticket.title,
          text: text
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      this.showToast('Teilen nicht verfügbar', 'warning');
    }
  }

  getCategoryIcon(category: TicketCategory): string {
    switch (category) {
      case TicketCategory.TECHNIK:
        return 'construct';
      case TicketCategory.INFRASTRUKTUR:
        return 'business';
      case TicketCategory.ERGONOMIE:
        return 'fitness';
      default:
        return 'ellipsisHorizontal';
    }
  }

  getStatusColor(status: TicketStatus): string {
    switch (status) {
      case TicketStatus.OFFEN:
        return 'danger';
      case TicketStatus.IN_BEARBEITUNG:
        return 'warning';
      case TicketStatus.GELOEST:
        return 'success';
      default:
        return 'medium';
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
