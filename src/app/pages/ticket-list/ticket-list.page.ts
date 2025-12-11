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
import { SyncService } from '../../services/sync.service';
import { Subscription, firstValueFrom } from 'rxjs';

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
  private isSyncing = false;
  private networkSubscription?: Subscription;

  constructor(
    private supabaseService: SupabaseService,
    private networkService: NetworkService,
    private storageService: StorageService,
    private syncService: SyncService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      refresh, warning, location, trash, add, construct, business,
      fitness, ellipsisHorizontal
    });
  }

  async ngOnInit() {
    // Zuerst Network-Status prüfen
    await this.initNetworkStatus();
    // Dann Tickets laden
    await this.loadTickets();
  }

  // Wird jedes Mal aufgerufen, wenn die Seite betreten wird
  async ionViewWillEnter() {
    console.log('📋 Ticket-Liste: Lade Tickets neu...');
    // Nicht laden, wenn gerade synchronisiert wird
    if (!this.isSyncing) {
      await this.loadTickets();
    } else {
      console.log('⏳ Sync läuft noch, überspringe ionViewWillEnter load');
    }
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async initNetworkStatus() {
    // Initialen Status sofort abrufen
    try {
      this.isOnline = await firstValueFrom(this.networkService.getNetworkStatus());
    } catch (error) {
      console.error('Error getting network status:', error);
      this.isOnline = false; // Sicher ist sicher: Bei Fehler als offline behandeln
    }
    console.log('📡 Initial Network Status:', this.isOnline ? 'Online' : 'Offline');
    
    // Dann auf Änderungen lauschen
    this.networkSubscription = this.networkService.getNetworkStatus().subscribe(async isOnline => {
      const wasOffline = !this.isOnline;
      this.isOnline = isOnline;
      console.log('📡 Network Status changed:', this.isOnline ? 'Online' : 'Offline');
      
      if (isOnline && wasOffline) {
        // Von Offline zu Online gewechselt → ERST Synchronisieren, DANN laden
        console.log('🔄 Ticket-List: Wechsel zu Online - starte Synchronisierung');
        this.isSyncing = true;
        try {
          const syncCount = await this.syncService.syncLocalTicketsToSupabase();
          if (syncCount > 0) {
            this.showToast(`${syncCount} Offline-Ticket(s) synchronisiert`, 'success');
          }
          console.log('✅ Ticket-List: Synchronisierung abgeschlossen - lade Tickets neu');
          await this.loadTickets();
        } finally {
          this.isSyncing = false;
        }
      } else if (!isOnline && !wasOffline) {
        // Von Online zu Offline gewechselt → Speichere aktuelle Tickets lokal
        console.log('📴 Ticket-List: Wechsel zu Offline - speichere aktuelle Tickets lokal');
        try {
          await this.syncService.saveTicketsForOffline();
        } catch (error) {
          console.error('❌ Fehler beim Speichern für Offline:', error);
        }
        await this.loadTickets();
      }
    });
  }


  async loadTickets() {
    // Verhindere paralleles Laden während Sync
    if (this.isSyncing) {
      console.log('⏳ Sync läuft noch, überspringe loadTickets');
      return;
    }
    
    this.isLoading = true;
    try {
      console.log(`📂 Lade Tickets... (${this.isOnline ? 'Online' : 'Offline'})`);
      
      if (this.isOnline) {
        // Online: Von Supabase laden (lokaler Speicher wird NICHT gelöscht)
        console.log('☁️ Lade von Supabase...');
        this.allTickets = await this.supabaseService.getTickets();
        console.log(`✅ ${this.allTickets.length} Tickets von Supabase geladen`);
      } else {
        // Offline: Lade lokal gespeicherte Tickets
        console.log('💾 Lade lokale Tickets...');
        this.allTickets = await this.storageService.getLocalTickets();
        console.log(`✅ ${this.allTickets.length} lokale Tickets geladen`, this.allTickets);
      }
      
      // Sortiere nach Datum
      this.allTickets.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });
      
      this.filterTickets();
    } catch (error) {
      console.error('❌ Error loading tickets:', error);
      this.showToast('Fehler beim Laden der Tickets', 'danger');
      
      // Fallback: Versuche lokale Tickets zu laden
      try {
        console.log('🔄 Fallback: Versuche lokale Tickets...');
        this.allTickets = await this.storageService.getLocalTickets();
        this.filterTickets();
      } catch (fallbackError) {
        console.error('❌ Auch lokale Tickets konnten nicht geladen werden:', fallbackError);
      }
    } finally {
      this.isLoading = false;
    }
  }

  filterTickets() {
    // Erst nach Status filtern
    let tickets = this.filterStatus === 'all' 
      ? [...this.allTickets]
      : this.allTickets.filter(ticket => ticket.status === this.filterStatus);
    
    // Dann nur valide Tickets anzeigen (müssen Titel und Beschreibung haben)
    this.filteredTickets = tickets.filter(ticket => 
      ticket && 
      ticket.title && 
      ticket.title.trim().length > 0 &&
      ticket.description &&
      ticket.description.trim().length > 0
    );
    
    console.log(`🔍 Gefiltert: ${this.filteredTickets.length}/${tickets.length} valide Tickets`);
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
            try {
              if (this.isOnline && ticket.id) {
                // Online: Aus Supabase löschen
                const success = await this.supabaseService.deleteTicket(ticket.id);
                if (success) {
                  this.showToast('Ticket gelöscht', 'success');
                  await this.loadTickets();
                } else {
                  this.showToast('Fehler beim Löschen', 'danger');
                }
              } else {
                // Offline: Nur lokal löschen
                const key = ticket.id || `temp_${ticket.created_at}`;
                await this.storageService.removeLocalTicket(key);
                this.showToast('Ticket lokal gelöscht', 'success');
                await this.loadTickets();
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
