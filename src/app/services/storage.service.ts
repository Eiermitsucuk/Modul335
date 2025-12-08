import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private ticketsStore: LocalForage;

  constructor() {
    this.ticketsStore = localforage.createInstance({
      name: 'workflow-assist',
      storeName: 'tickets'
    });
  }

  // Lokale Speicherung für Offline-Support
  async saveTicketLocally(ticket: Ticket): Promise<void> {
    try {
      const key = ticket.id || `temp_${Date.now()}`;
      await this.ticketsStore.setItem(key, ticket);
    } catch (error) {
      console.error('Error saving ticket locally:', error);
    }
  }

  async getLocalTickets(): Promise<Ticket[]> {
    try {
      const tickets: Ticket[] = [];
      await this.ticketsStore.iterate((value: any) => {
        tickets.push(value);
      });
      return tickets;
    } catch (error) {
      console.error('Error getting local tickets:', error);
      return [];
    }
  }

  async removeLocalTicket(key: string): Promise<void> {
    try {
      await this.ticketsStore.removeItem(key);
    } catch (error) {
      console.error('Error removing local ticket:', error);
    }
  }

  async clearLocalTickets(): Promise<void> {
    try {
      await this.ticketsStore.clear();
    } catch (error) {
      console.error('Error clearing local tickets:', error);
    }
  }

  // Generische Speicherfunktionen
  async setItem(key: string, value: any): Promise<void> {
    await this.ticketsStore.setItem(key, value);
  }

  async getItem(key: string): Promise<any> {
    return await this.ticketsStore.getItem(key);
  }
}

