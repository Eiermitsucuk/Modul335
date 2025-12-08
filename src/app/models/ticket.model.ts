export interface Ticket {
  id?: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  location?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

export enum TicketCategory {
  TECHNIK = 'Technik',
  INFRASTRUKTUR = 'Infrastruktur',
  ERGONOMIE = 'Ergonomie',
  SONSTIGES = 'Sonstiges'
}

export enum TicketStatus {
  OFFEN = 'Offen',
  IN_BEARBEITUNG = 'In Bearbeitung',
  GELOEST = 'Gelöst'
}

