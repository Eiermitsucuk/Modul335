import { Component, OnInit, OnDestroy } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, 
  IonCol, IonList, IonItem, IonLabel, IonBadge 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  wifi, wifiOutline, statsChart, addCircle, list, construct, 
  business, fitness, ellipsisHorizontal 
} from 'ionicons/icons';
import { SupabaseService } from '../services/supabase.service';
import { NetworkService } from '../services/network.service';
import { StorageService } from '../services/storage.service';
import { Ticket, TicketCategory, TicketStatus } from '../models/ticket.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon,
    IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonBadge
  ],
})
export class HomePage implements OnInit, OnDestroy {
  isOnline = true;
  networkType = '';
  recentTickets: Ticket[] = [];
  stats = {
    total: 0,
    open: 0,
    inProgress: 0
  };
  private networkSubscription?: Subscription;

  constructor(
    private supabaseService: SupabaseService,
    private networkService: NetworkService,
    private storageService: StorageService
  ) {
    addIcons({ 
      wifi, wifiOutline, statsChart, addCircle, list, construct, 
      business, fitness, ellipsisHorizontal 
    });
  }

  async ngOnInit() {
    await this.initNetworkStatus();
    await this.loadData();
  }

  // Wird jedes Mal aufgerufen, wenn die Seite betreten wird
  async ionViewWillEnter() {
    console.log('🏠 Home-Page: Lade Daten neu...');
    await this.loadData();
  }

  ngOnDestroy() {
    this.networkSubscription?.unsubscribe();
  }

  async loadData() {
    try {
      let tickets: Ticket[] = [];
      
      console.log(`📂 Home: Lade Tickets... (${this.isOnline ? 'Online' : 'Offline'})`);
      
      if (this.isOnline) {
        // Online: Nur von Supabase laden
        tickets = await this.supabaseService.getTickets();
        console.log(`✅ Home: ${tickets.length} Tickets von Supabase geladen`);
      } else {
        // Offline: Nur lokale Tickets
        tickets = await this.storageService.getLocalTickets();
        console.log(`✅ Home: ${tickets.length} lokale Tickets geladen`);
      }
      
      // Nur valide Tickets (mit Titel und Beschreibung)
      tickets = tickets.filter(ticket => 
        ticket && 
        ticket.title && 
        ticket.title.trim().length > 0 &&
        ticket.description &&
        ticket.description.trim().length > 0
      );
      console.log(`🔍 Nach Validierung: ${tickets.length} valide Tickets`);
      
      // Sortiere nach Datum (neueste zuerst)
      tickets.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });
      
      this.recentTickets = tickets.slice(0, 5);
      this.calculateStats(tickets);
    } catch (error) {
      console.error('Error loading data:', error);
      
      // Fallback: Versuche lokale Tickets
      try {
        const localTickets = await this.storageService.getLocalTickets();
        const validTickets = localTickets.filter(ticket => 
          ticket && ticket.title && ticket.description
        );
        this.recentTickets = validTickets.slice(0, 5);
        this.calculateStats(validTickets);
      } catch (fallbackError) {
        console.error('Auch lokale Tickets konnten nicht geladen werden:', fallbackError);
      }
    }
  }

  calculateStats(tickets: Ticket[]) {
    this.stats.total = tickets.length;
    this.stats.open = tickets.filter(t => t.status === TicketStatus.OFFEN).length;
    this.stats.inProgress = tickets.filter(t => t.status === TicketStatus.IN_BEARBEITUNG).length;
  }

  async initNetworkStatus() {
    // Initial status prüfen
    this.networkSubscription = this.networkService.getNetworkStatus().subscribe(async isOnline => {
      const wasOnline = this.isOnline;
      this.isOnline = isOnline;
      
      // Wenn sich der Status ändert, Daten neu laden
      if (wasOnline !== isOnline) {
        console.log(`🔄 Home: Network Status changed to ${isOnline ? 'Online' : 'Offline'} - reload data`);
        await this.loadData();
      }
    });

    this.networkService.getNetworkType().subscribe(type => {
      this.networkType = type;
    });
    
    // Warte kurz, damit die Subscriptions sich initialisieren können
    await new Promise(resolve => setTimeout(resolve, 100));
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
}
