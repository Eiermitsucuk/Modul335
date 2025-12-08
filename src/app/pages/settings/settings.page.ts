import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem,
  IonLabel, IonToggle, IonIcon, IonChip, AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  colorPalette, moon, notifications, notificationsOutline, megaphone,
  server, wifi, wifiOutline, trashBin, statsChart, informationCircle
} from 'ionicons/icons';
import { ThemeService } from '../../services/theme.service';
import { NetworkService } from '../../services/network.service';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';
import { SupabaseService } from '../../services/supabase.service';
import { TicketStatus } from '../../models/ticket.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonList, IonItem, IonLabel, IonToggle, IonIcon, IonChip
  ]
})
export class SettingsPage implements OnInit {
  darkMode = false;
  notificationsEnabled = true;
  isOnline = true;
  networkType = '';
  stats = {
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  };

  constructor(
    private themeService: ThemeService,
    private networkService: NetworkService,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private supabaseService: SupabaseService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      colorPalette, moon, notifications, notificationsOutline, megaphone,
      server, wifi, wifiOutline, trashBin, statsChart, informationCircle
    });
  }

  async ngOnInit() {
    // Warte auf Theme-Initialisierung
    await this.themeService.initTheme();
    this.darkMode = this.themeService.isDarkMode();
    console.log('Settings loaded, darkMode:', this.darkMode);
    
    this.loadNotificationSettings();
    this.initNetworkStatus();
    await this.loadStats();
  }

  toggleDarkMode() {
    console.log('Toggle clicked, new value:', this.darkMode);
    this.themeService.setDarkMode(this.darkMode);
    this.showToast(
      this.darkMode ? 'Dark Mode aktiviert' : 'Dark Mode deaktiviert',
      'success'
    );
  }

  async toggleNotifications() {
    await this.storageService.setItem('notificationsEnabled', this.notificationsEnabled);
    this.showToast(
      this.notificationsEnabled 
        ? 'Benachrichtigungen aktiviert' 
        : 'Benachrichtigungen deaktiviert',
      'success'
    );
  }

  async testNotification() {
    await this.notificationService.scheduleNotification(
      'Test Benachrichtigung',
      'Dies ist eine Test-Benachrichtigung von WorkFlow Assist'
    );
    this.showToast('Test-Benachrichtigung gesendet', 'success');
  }

  async loadNotificationSettings() {
    const saved = await this.storageService.getItem('notificationsEnabled');
    this.notificationsEnabled = saved !== null ? saved : true;
  }

  initNetworkStatus() {
    this.networkService.getNetworkStatus().subscribe(isOnline => {
      this.isOnline = isOnline;
    });

    this.networkService.getNetworkType().subscribe(type => {
      this.networkType = type;
    });
  }

  async loadStats() {
    try {
      const tickets = await this.supabaseService.getTickets();
      this.stats.total = tickets.length;
      this.stats.open = tickets.filter(t => t.status === TicketStatus.OFFEN).length;
      this.stats.inProgress = tickets.filter(t => t.status === TicketStatus.IN_BEARBEITUNG).length;
      this.stats.resolved = tickets.filter(t => t.status === TicketStatus.GELOEST).length;
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  async clearLocalStorage() {
    const alert = await this.alertController.create({
      header: 'Lokalen Speicher leeren?',
      message: 'Alle lokal gespeicherten Daten werden gelöscht. Dies kann nicht rückgängig gemacht werden.',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: async () => {
            await this.storageService.clearLocalTickets();
            this.showToast('Lokaler Speicher geleert', 'success');
          }
        }
      ]
    });

    await alert.present();
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
