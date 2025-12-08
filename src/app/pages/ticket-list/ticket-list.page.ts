import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
  IonIcon, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem,
  IonItemSliding, IonItemOptions, IonItemOption, IonBadge, IonNote,
  IonCard, IonCardContent, IonSpinner, IonFab, IonFabButton,
  AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  refresh, warning, location, trash, add, construct, business,
  fitness, ellipsisHorizontal
} from 'ionicons/icons';
import { Ticket, TicketCategory, TicketStatus } from '../../models/ticket.model';
import { SupabaseService } from '../../services/supabase.service';
import { NetworkService } from '../../services/network.service';
import { StorageService } from '../../services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
  imports: [
    CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonButton, IonIcon, IonSegment, IonSegmentButton,
    IonLabel, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
    IonBadge, IonNote, IonCard, IonCardContent, IonSpinner, IonFab, IonFabButton
  ]
})
export class TicketListPage implements OnInit, OnDestroy {
  allTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  filterStatus: string = 'all';
  ticketStatus = TicketStatus;
  isLoading = true;
  isOnline = true;
  private networkSubscription?: Subscription;

  constructor(
    private supabaseService: SupabaseService,
    private networkService: NetworkService,
    private storageService: StorageService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      refresh, warning, location, trash, add, construct, business,
      fitness, ellipsisHorizontal
    });
  }

  ngOnInit() {
    this.loadTickets();
    this.initNetworkStatus();
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  initNetworkStatus() {
    this.networkSubscription = this.networkService.getNetworkStatus().subscribe(isOnline => {
      this.isOnline = isOnline;
      if (isOnline) {
        this.loadTickets();
      }
    });
  }

  async loadTickets() {
    this.isLoading = true;
    try {
      if (this.isOnline) {
        // Online: Lade von Supabase
        this.allTickets = await this.supabaseService.getTickets();
      } else {
        // Offline: Lade lokal gespeicherte Tickets
        this.allTickets = await this.storageService.getLocalTickets();
      }
      this.filterTickets();
    } catch (error) {
      console.error('Error loading tickets:', error);
      this.showToast('Fehler beim Laden der Tickets', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  filterTickets() {
    if (this.filterStatus === 'all') {
      this.filteredTickets = [...this.allTickets];
    } else {
      this.filteredTickets = this.allTickets.filter(
        ticket => ticket.status === this.filterStatus
      );
    }
  }

  async refreshTickets() {
    await this.loadTickets();
    this.showToast('Tickets aktualisiert', 'success');
  }

  async deleteTicket(ticket: Ticket) {
    const alert = await this.alertController.create({
      header: 'Ticket löschen?',
      message: `Möchtest du das Ticket "${ticket.title}" wirklich löschen?`,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: async () => {
            if (ticket.id) {
              const success = await this.supabaseService.deleteTicket(ticket.id);
              if (success) {
                this.showToast('Ticket gelöscht', 'success');
                await this.loadTickets();
              } else {
                this.showToast('Fehler beim Löschen', 'danger');
              }
            }
          }
        }
      ]
    });

    await alert.present();
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
