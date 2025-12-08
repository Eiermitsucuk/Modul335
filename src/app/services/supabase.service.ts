import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private isConfigured: boolean = false;

  constructor() {
    // Check if Supabase is configured
    if (environment.supabase.url && 
        environment.supabase.url !== 'YOUR_SUPABASE_URL' &&
        environment.supabase.url.startsWith('http')) {
      this.supabase = createClient(
        environment.supabase.url,
        environment.supabase.anonKey
      );
      this.isConfigured = true;
      console.log('✅ Supabase connected');
    } else {
      // Dummy client if not configured - Supress auth errors
      console.warn('⚠️ Supabase not configured. Using offline mode. See SUPABASE_SETUP.md');
      this.supabase = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder', {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      });
      this.isConfigured = false;
    }
  }

  // CRUD Operations für Tickets
  async createTicket(ticket: Ticket): Promise<Ticket | null> {
    if (!this.isConfigured) {
      console.warn('Supabase not configured, cannot create ticket online');
      return null;
    }
    
    const { data, error } = await this.supabase
      .from('tickets')
      .insert([ticket])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating ticket:', error);
      return null;
    }
    return data;
  }

  async getTickets(): Promise<Ticket[]> {
    if (!this.isConfigured) {
      console.log('Supabase not configured, returning empty array');
      return [];
    }
    
    const { data, error } = await this.supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
    return data || [];
  }

  async getTicketById(id: string): Promise<Ticket | null> {
    const { data, error } = await this.supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }
    return data;
  }

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket | null> {
    const { data, error } = await this.supabase
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating ticket:', error);
      return null;
    }
    return data;
  }

  async deleteTicket(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('tickets')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting ticket:', error);
      return false;
    }
    return true;
  }

  // Subscribe to ticket changes (Realtime)
  subscribeToTickets(callback: (payload: any) => void) {
    return this.supabase
      .channel('tickets-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tickets' },
        callback
      )
      .subscribe();
  }
}

