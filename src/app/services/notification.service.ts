import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private storageService: StorageService) {
    this.initNotifications();
  }

  private async initNotifications() {
    // Berechtigung anfragen
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== 'granted') {
      console.warn('Notification permission not granted');
    }
  }

  private async areNotificationsEnabled(): Promise<boolean> {
    const enabled = await this.storageService.getItem('notificationsEnabled');
    return enabled !== null ? enabled : true; // Standard: aktiviert
  }

  async scheduleNotification(title: string, body: string, id?: number) {
    try {
      // Überprüfe, ob Benachrichtigungen aktiviert sind
      const enabled = await this.areNotificationsEnabled();
      if (!enabled) {
        console.log('📵 Notifications disabled, skipping notification');
        return;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: id || Math.floor(Math.random() * 100000),
            schedule: { at: new Date(Date.now() + 1000) }, // Sofort
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
      console.log('✅ Notification scheduled:', title);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async scheduleTestNotification(title: string, body: string, id?: number) {
    // Test-Benachrichtigungen ignorieren die Einstellung (zum Testen)
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: id || Math.floor(Math.random() * 100000),
            schedule: { at: new Date(Date.now() + 1000) },
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
      console.log('✅ Test notification scheduled:', title);
    } catch (error) {
      console.error('Error scheduling test notification:', error);
    }
  }

  async notifyTicketStatusChange(ticketTitle: string, newStatus: string) {
    await this.scheduleNotification(
      'Ticket Status Aktualisiert',
      `"${ticketTitle}" ist jetzt: ${newStatus}`
    );
  }

  async notifyTicketCreated(ticketTitle: string) {
    await this.scheduleNotification(
      'Ticket Erstellt',
      `Dein Ticket "${ticketTitle}" wurde erfolgreich erstellt`
    );
  }
}

