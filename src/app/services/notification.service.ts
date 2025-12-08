import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
    this.initNotifications();
  }

  private async initNotifications() {
    // Berechtigung anfragen
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== 'granted') {
      console.warn('Notification permission not granted');
    }
  }

  async scheduleNotification(title: string, body: string, id?: number) {
    try {
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
    } catch (error) {
      console.error('Error scheduling notification:', error);
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

