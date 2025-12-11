import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private isSyncing = false;

  constructor(
    private storageService: StorageService,
    private supabaseService: SupabaseService
  ) {}

  async syncLocalTicketsToSupabase(): Promise<number> {
    // Verhindere parallele Sync-Prozesse
    if (this.isSyncing) {
      console.log('⏳ Sync läuft bereits, überspringe...');
      return 0;
    }

    this.isSyncing = true;
    let syncCount = 0;
    const ticketsToDelete: string[] = [];

    try {
      // ERST lokale Tickets holen
      const localTickets = await this.storageService.getLocalTickets();
      
      // Filtere nur Tickets mit temp IDs (die noch nicht synchronisiert wurden)
      const unsyncedTickets = localTickets.filter(ticket => 
        !ticket.id || ticket.id.toString().startsWith('temp_')
      );
      
      if (unsyncedTickets.length === 0) {
        console.log('ℹ️ Keine unsynchronisierten Tickets zum Hochladen');
        return 0;
      }
      
      console.log(`🔄 Synchronisiere ${unsyncedTickets.length} unsynchronisierte Tickets...`);
      
      // Jetzt Tickets hochladen
      for (const ticket of unsyncedTickets) {
        try {
          const tempId = ticket.id;
          
          // Entferne temp ID vor dem Upload
          const ticketToUpload = { ...ticket };
          delete ticketToUpload.id;
          
          // Upload zu Supabase
          console.log(`📤 Uploading ticket: "${ticket.title}"`);
          const uploadedTicket = await this.supabaseService.createTicket(ticketToUpload);
          
          if (uploadedTicket) {
            console.log(`✅ Ticket "${ticket.title}" synchronisiert (neue ID: ${uploadedTicket.id})`);
            
            // Speichere das Ticket mit der echten ID lokal
            await this.storageService.saveTicketLocally(uploadedTicket);
            
            // Merke die temp_ID zum Löschen
            if (tempId) {
              ticketsToDelete.push(tempId.toString());
            }
            
            syncCount++;
          }
        } catch (error) {
          console.error(`❌ Fehler beim Synchronisieren von "${ticket.title}":`, error);
        }
      }
      
      // Lösche nur die alten temp_IDs, behalte die neuen echten IDs
      for (const tempId of ticketsToDelete) {
        console.log(`🗑️ Lösche alte temp_ID: ${tempId}`);
        await this.storageService.removeLocalTicket(tempId);
      }
      
      console.log(`✅ Synchronisierung abgeschlossen: ${syncCount}/${unsyncedTickets.length} erfolgreich`);
      return syncCount;
    } catch (error) {
      console.error('❌ Error syncing local tickets:', error);
      return 0;
    } finally {
      this.isSyncing = false;
    }
  }

  async saveTicketsForOffline(): Promise<void> {
    try {
      console.log('💾 Speichere aktuelle Tickets für Offline-Modus...');
      
      // Lade aktuelle Tickets von Supabase
      const supabaseTickets = await this.supabaseService.getTickets();
      
      // Hole bestehende lokale Tickets
      const localTickets = await this.storageService.getLocalTickets();
      
      // Filtere lokale Tickets: Nur unsynchronisierte (temp_IDs) behalten
      const unsyncedLocalTickets = localTickets.filter(ticket => 
        ticket.id && ticket.id.toString().startsWith('temp_')
      );
      
      console.log(`📊 Supabase: ${supabaseTickets.length} Tickets, Lokal: ${localTickets.length} (davon ${unsyncedLocalTickets.length} unsynchronisiert)`);
      
      // Lösche lokalen Speicher komplett
      await this.storageService.clearLocalTickets();
      
      // Speichere alle Supabase-Tickets lokal (mit echten IDs)
      for (const ticket of supabaseTickets) {
        await this.storageService.saveTicketLocally(ticket);
      }
      
      // Speichere unsynchronisierte lokale Tickets wieder (falls vorhanden)
      for (const ticket of unsyncedLocalTickets) {
        await this.storageService.saveTicketLocally(ticket);
      }
      
      const totalSaved = supabaseTickets.length + unsyncedLocalTickets.length;
      console.log(`✅ ${totalSaved} Tickets für Offline-Modus gespeichert (${supabaseTickets.length} von Supabase + ${unsyncedLocalTickets.length} unsynchronisiert)`);
    } catch (error) {
      console.error('❌ Error saving tickets for offline:', error);
    }
  }

  isSyncInProgress(): boolean {
    return this.isSyncing;
  }
}

