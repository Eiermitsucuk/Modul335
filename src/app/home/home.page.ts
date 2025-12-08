import { Component, OnInit } from '@angular/core';
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
import { Ticket, TicketCategory, TicketStatus } from '../models/ticket.model';

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
export class HomePage implements OnInit {
  isOnline = true;
  networkType = '';
  recentTickets: Ticket[] = [];
  stats = {
    total: 0,
    open: 0,
    inProgress: 0
  };

  constructor(
    private supabaseService: SupabaseService,
    private networkService: NetworkService
  ) {
    addIcons({ 
      wifi, wifiOutline, statsChart, addCircle, list, construct, 
      business, fitness, ellipsisHorizontal 
    });
  }

  ngOnInit() {
    this.loadData();
    this.initNetworkStatus();
  }

  async loadData() {
    const tickets = await this.supabaseService.getTickets();
    this.recentTickets = tickets.slice(0, 5);
    this.calculateStats(tickets);
  }

  calculateStats(tickets: Ticket[]) {
    this.stats.total = tickets.length;
    this.stats.open = tickets.filter(t => t.status === TicketStatus.OFFEN).length;
    this.stats.inProgress = tickets.filter(t => t.status === TicketStatus.IN_BEARBEITUNG).length;
  }

  initNetworkStatus() {
    this.networkService.getNetworkStatus().subscribe(isOnline => {
      this.isOnline = isOnline;
    });

    this.networkService.getNetworkType().subscribe(type => {
      this.networkType = type;
    });
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
