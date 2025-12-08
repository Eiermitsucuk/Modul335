# Projektdokumentation
## WorkFlow Assist - Mobile Applikation zur Erfassung und Verwaltung von Arbeitsplatz-Problemen

---

### ÜK Modul 335
**Mobile-Applikation mit dem Ionic-Framework (Angular) realisieren**

**Projekttitel:** WorkFlow Assist  
**Datum:** [DATUM HIER EINTRAGEN]  
**Name:** [DEIN VOR- UND NACHNAME HIER EINTRAGEN]  
**Klasse:** [DEINE KLASSE HIER EINTRAGEN]

---

## Inhaltsverzeichnis

1. [Projektbeschreibung](#1-projektbeschreibung)
2. [User Stories](#2-user-stories)
3. [Storyboard und UI-Elemente](#3-storyboard-und-ui-elemente)
4. [Datenbank-Modell](#4-datenbank-modell)
5. [Technische Umsetzung](#5-technische-umsetzung)
6. [Installation](#6-installation)

---

## 1. Projektbeschreibung

### 1.1 Ausgangslage / Problemstellung

In vielen Ausbildungsbetrieben werden technische, infrastrukturelle oder ergonomische Probleme über unstrukturierte Kanäle gemeldet – beispielsweise per E-Mail, Zuruf oder über isolierte Formulare. Dies führt regelmäßig zu:

- **Medienbrüchen** und fehlender Transparenz
- **Langen Reaktionszeiten** durch unklare Zuständigkeiten
- **Doppelspurigkeiten** bei der Bearbeitung
- **Hoher Hemmschwelle** zur Meldung, insbesondere wenn kein PC verfügbar ist

Lernende haben zudem nicht immer Zugriff auf einen Computer, wodurch die Hemmschwelle zur Meldung steigt und relevante Probleme oft zu spät adressiert werden.

### 1.2 Zielsetzung

Das Projekt verfolgt das Ziel, eine **mobile Applikation** (Ionic/Angular) zu entwickeln, die eine schnelle, intuitive und strukturierte Erfassung von Arbeitsplatz-Problemen ermöglicht. Die App soll den gesamten Meldungsprozess vereinfachen, beschleunigen und für alle Beteiligten transparent machen.

**Zentrale Ziele:**
- Vereinfachung und Standardisierung des Meldeprozesses
- Mobile-first: unmittelbare Nutzung direkt am Arbeitsplatz
- Transparenz über Status, Verantwortlichkeiten und Fortschritt
- Verbesserung der Reaktionszeiten durch strukturierte Inputs
- Reduktion von Medienbrüchen und ineffizienten Kommunikationswegen

### 1.3 Zielgruppen

- **Lernende**: Erfassen Probleme schnell und intuitiv am Smartphone
- **IT-Support / Facility Management**: Empfangen strukturierte Meldungen mit klarem Kontext
- **Ausbildungsverantwortliche**: Überwachung von Trends und Wiederholungsproblemen

---

## 2. User Stories

### US1: Ticket erstellen
**Als** Lernender  
**möchte ich** schnell und einfach ein Problem melden können  
**damit** technische Probleme zeitnah behoben werden können.

**Akzeptanzkriterien:**
- Titel und Beschreibung können eingegeben werden
- Kategorie kann ausgewählt werden (Technik, Infrastruktur, Ergonomie, Sonstiges)
- Optional kann ein Foto hinzugefügt werden
- Optional kann ein Standort angegeben werden
- Ticket wird in Datenbank gespeichert
- Bei Offline-Modus: Lokale Speicherung

---

### US2: Tickets übersichtlich anzeigen
**Als** Lernender  
**möchte ich** alle meine gemeldeten Tickets übersichtlich sehen  
**damit** ich den Überblick über offene und gelöste Probleme behalte.

**Akzeptanzkriterien:**
- Alle Tickets werden als Liste angezeigt
- Tickets können nach Status gefiltert werden (Alle, Offen, In Bearbeitung, Gelöst)
- Status-Badge zeigt aktuellen Zustand farblich an
- Tickets können durch Antippen geöffnet werden

---

### US3: Ticket-Details einsehen
**Als** Lernender  
**möchte ich** detaillierte Informationen zu einem Ticket sehen  
**damit** ich den vollständigen Kontext verstehe.

**Akzeptanzkriterien:**
- Vollständige Beschreibung wird angezeigt
- Hochgeladenes Foto wird angezeigt
- Standort wird angezeigt
- Zeitstempel (Erstellung, letzte Änderung)
- Status kann geändert werden
- Ticket kann gelöscht werden

---

### US4: Ticket-Status ändern
**Als** Support-Mitarbeiter  
**möchte ich** den Status eines Tickets aktualisieren können  
**damit** der Bearbeitungsfortschritt transparent ist.

**Akzeptanzkriterien:**
- Status kann gewechselt werden (Offen → In Bearbeitung → Gelöst)
- Statusänderung wird sofort gespeichert
- Push-Benachrichtigung wird gesendet
- Zeitstempel wird aktualisiert

---

### US5: Foto hinzufügen
**Als** Lernender  
**möchte ich** ein Foto des Problems aufnehmen können  
**damit** das Problem besser verstanden wird.

**Akzeptanzkriterien:**
- Foto kann mit Kamera aufgenommen werden
- Foto kann aus Galerie gewählt werden
- Foto-Vorschau wird angezeigt
- Foto wird hochgeladen
- Foto wird im Ticket-Detail angezeigt

---

### US6: Standort via QR-Code erfassen
**Als** Lernender  
**möchte ich** den Standort durch QR-Code-Scan erfassen  
**damit** ich nicht manuell tippen muss.

**Akzeptanzkriterien:**
- QR-Code Scanner kann geöffnet werden
- QR-Code wird gescannt und eingetragen
- Manuelle Eingabe ist auch möglich
- Kamera-Berechtigung wird abgefragt

---

### US7: Offline arbeiten
**Als** Lernender  
**möchte ich** Tickets auch ohne Internet erstellen können  
**damit** ich nicht auf eine Verbindung warten muss.

**Akzeptanzkriterien:**
- Online/Offline Status wird angezeigt
- Tickets können offline erstellt werden
- Offline-Tickets werden lokal gespeichert
- Hinweis über Offline-Speicherung

---

### US8: Benachrichtigungen erhalten
**Als** Lernender  
**möchte ich** Benachrichtigungen bei Statusänderungen erhalten  
**damit** ich informiert bleibe.

**Akzeptanzkriterien:**
- Benachrichtigung bei Ticket-Erstellung
- Benachrichtigung bei Statusänderung
- Benachrichtigungen können getestet werden

---

### US9: Dark Mode aktivieren
**Als** Benutzer  
**möchte ich** zwischen hellem und dunklem Design wechseln  
**damit** ich die App auch nachts angenehm nutzen kann.

**Akzeptanzkriterien:**
- Dark Mode kann umgeschaltet werden
- Einstellung wird gespeichert
- Alle Seiten passen sich an

---

### US10: Statistiken einsehen
**Als** Ausbildungsverantwortlicher  
**möchte ich** eine Übersicht über alle Tickets sehen  
**damit** ich Trends erkennen kann.

**Akzeptanzkriterien:**
- Dashboard zeigt Anzahl aller Tickets
- Anzahl nach Status (Offen, In Bearbeitung, Gelöst)
- Statistiken auf Home- und Settings-Seite

---

## 3. Storyboard und UI-Elemente

### 3.1 App-Navigation (Tab-basiert)

```
┌─────────────────────────────────────┐
│     WorkFlow Assist (Header)        │
├─────────────────────────────────────┤
│                                     │
│         Content Area                │
│      (wechselt pro Tab)             │
│                                     │
├─────────────────────────────────────┤
│  [🏠]  [📋]  [➕]  [⚙️]            │ ← Tab Bar
│  Home Tickets  Neu  Settings        │
└─────────────────────────────────────┘
```

### 3.2 Seiten-Übersicht

#### Seite 1: Home (Dashboard)
**Zweck:** Übersicht und Schnellzugriff

**UI-Elemente:**
- `ion-header` mit `ion-toolbar` und `ion-title`
- `ion-card` für Netzwerk-Status
  - `ion-icon` (wifi/wifi-outline)
  - Online/Offline Anzeige
- `ion-card` für Statistiken
  - `ion-grid` mit 3 Spalten
  - Anzahlen: Gesamt, Offen, In Bearbeitung
- `ion-card` für Schnellaktionen
  - 2x `ion-button` (Neues Ticket, Alle Tickets)
- `ion-card` für neueste Tickets
  - `ion-list` mit `ion-item`
  - Icons je Kategorie
  - `ion-badge` für Status

**Wireframe:**
```
┌─────────────────────────┐
│ WorkFlow Assist         │
├─────────────────────────┤
│ Willkommen!             │
│                         │
│ ┌─────────────────────┐ │
│ │ [📶] Online         │ │
│ │ Verbindungstyp: 4G  │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Ticket-Übersicht    │ │
│ │ [10] [5]  [3]       │ │
│ │ Alle Offen InArbeit │ │
│ └─────────────────────┘ │
│                         │
│ [+ Neues Ticket]        │
│ [📋 Alle Tickets]       │
└─────────────────────────┘
```

#### Seite 2: Ticket-Liste
**Zweck:** Alle Tickets anzeigen mit Filter

**UI-Elemente:**
- `ion-header` mit Refresh-Button
- `ion-segment` für Filter
  - 4 Buttons: Alle, Offen, In Bearbeitung, Gelöst
- `ion-list` mit `ion-item-sliding`
  - Icon (Kategorie)
  - Titel, Beschreibung (gekürzt)
  - Standort, Datum
  - `ion-badge` für Status
  - Swipe-to-Delete
- `ion-fab` (Floating Action Button) für neues Ticket

**Wireframe:**
```
┌─────────────────────────┐
│ Meine Tickets      [↻]  │
├─────────────────────────┤
│ [Alle][Offen][...]      │
├─────────────────────────┤
│ [🔧] Monitor defekt     │
│      Raum 201 · Offen   │
│                         │
│ [🏢] Stuhl kaputt       │
│      Raum 105 · Gelöst  │
│                         │
│                    [➕] │ ← FAB
└─────────────────────────┘
```

#### Seite 3: Ticket erstellen
**Zweck:** Neues Ticket erfassen

**UI-Elemente:**
- `ion-header` mit `ion-back-button`
- `ion-input` für Titel
- `ion-select` für Kategorie
- `ion-textarea` für Beschreibung
- `ion-input` für Standort + QR-Button
- `ion-card` für Foto
  - 2x `ion-button` (Kamera, Galerie)
  - Foto-Vorschau (wenn vorhanden)
- `ion-button` Submit
- `ion-note` für Offline-Warnung

**Wireframe:**
```
┌─────────────────────────┐
│ [<] Neues Ticket        │
├─────────────────────────┤
│ Titel:                  │
│ [________________]      │
│                         │
│ Kategorie:              │
│ [Technik ▼]             │
│                         │
│ Beschreibung:           │
│ [________________]      │
│ [________________]      │
│                         │
│ Standort: [____] [QR]   │
│                         │
│ ┌─────────────────────┐ │
│ │ Foto (optional)     │ │
│ │ [📷 Kamera]         │ │
│ │ [🖼️ Galerie]        │ │
│ └─────────────────────┘ │
│                         │
│ [✓ Ticket erstellen]    │
└─────────────────────────┘
```

#### Seite 4: Ticket-Detail
**Zweck:** Vollständige Ticket-Informationen

**UI-Elemente:**
- `ion-header` mit Back + Menu
- `ion-card` für Titel & Status
  - Kategorie-Icon
  - `ion-badge` für Status
- `ion-card` für Beschreibung
- `ion-card` für Foto
- `ion-card` für Standort
- `ion-card` für Zeitstempel
- `ion-segment` für Status ändern
- `ion-button` (danger) für Löschen

**Wireframe:**
```
┌─────────────────────────┐
│ [<] Ticket Details [⋮]  │
├─────────────────────────┤
│ [🔧] Monitor defekt     │
│      Technik · [Offen]  │
│                         │
│ Beschreibung:           │
│ Monitor zeigt kein      │
│ Bild mehr...            │
│                         │
│ [📷 Foto]               │
│                         │
│ 📍 Raum 201             │
│                         │
│ 🕐 05.12.2025 14:30     │
│                         │
│ Status ändern:          │
│ [Offen][InArbeit][...]  │
│                         │
│ [🗑️ Ticket löschen]     │
└─────────────────────────┘
```

#### Seite 5: Einstellungen
**Zweck:** App-Konfiguration

**UI-Elemente:**
- `ion-header`
- `ion-card` für App-Info
- `ion-card` für Darstellung
  - `ion-toggle` für Dark Mode
- `ion-card` für Benachrichtigungen
  - `ion-toggle` + Test-Button
- `ion-card` für Netzwerk
  - Status-Anzeige
  - Button: Lokalen Speicher leeren
- `ion-card` für Statistiken
- `ion-card` für Über
  - `ion-chip` für Technologien

**Wireframe:**
```
┌─────────────────────────┐
│ Einstellungen           │
├─────────────────────────┤
│ WorkFlow Assist         │
│ Version 1.0.0           │
│                         │
│ Darstellung             │
│ [🌙 Dark Mode]     [◯]  │
│                         │
│ Benachrichtigungen      │
│ [🔔 Push]          [◉]  │
│ [Test senden]           │
│                         │
│ Netzwerk                │
│ [📶 Online]             │
│ [Speicher leeren]       │
│                         │
│ Statistiken             │
│ Gesamt: 10              │
│ Offen: 5                │
└─────────────────────────┘
```

#### Seite 6: Tabs (Navigation)
**Zweck:** Haupt-Navigation

**UI-Elemente:**
- `ion-tabs`
- `ion-tab-bar` (slot="bottom")
- 4x `ion-tab-button`
  - Icons + Labels
  - Home, Tickets, Erstellen, Settings

### 3.3 Verwendete Ionic Components

| Component | Verwendung |
|-----------|------------|
| `ion-tabs` | Haupt-Navigation |
| `ion-tab-bar` | Tab-Leiste unten |
| `ion-header` | Seiten-Header |
| `ion-toolbar` | Header-Container |
| `ion-title` | Seitentitel |
| `ion-content` | Haupt-Content |
| `ion-card` | Content-Gruppierung |
| `ion-list` | Listen-Darstellung |
| `ion-item` | Listen-Einträge |
| `ion-input` | Text-Eingabe |
| `ion-textarea` | Mehrzeilige Eingabe |
| `ion-select` | Dropdown-Auswahl |
| `ion-button` | Aktions-Buttons |
| `ion-icon` | Icons (Ionicons) |
| `ion-badge` | Status-Badges |
| `ion-segment` | Filter-Tabs |
| `ion-toggle` | Switches |
| `ion-fab` | Floating Button |
| `ion-back-button` | Zurück-Navigation |

### 3.4 Design-System

**Farb-Schema:**
- Primary: `#3880ff` (Blau)
- Success: `#2dd36f` (Grün)
- Warning: `#ffc409` (Orange)
- Danger: `#eb445a` (Rot)

**Icons (Ionicons):**
- Home: `home`
- Liste: `list`
- Erstellen: `add-circle`
- Settings: `settings`
- Technik: `construct`
- Infrastruktur: `business`
- Ergonomie: `fitness`
- Sonstiges: `ellipsisHorizontal`

---

## 4. Datenbank-Modell

### 4.1 Verwendete Technologie

- **Backend-as-a-Service**: Supabase
- **Datenbank**: PostgreSQL
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime (optional)

### 4.2 Tabellen-Schema

#### Tabelle: `tickets`

Haupttabelle für alle Problem-Meldungen.

| Feldname | Datentyp | Constraints | Beschreibung |
|----------|----------|-------------|--------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Eindeutige ID |
| `title` | TEXT | NOT NULL | Titel des Problems |
| `description` | TEXT | NOT NULL | Detaillierte Beschreibung |
| `category` | TEXT | NOT NULL | Kategorie (Enum) |
| `status` | TEXT | NOT NULL, DEFAULT 'Offen' | Status (Enum) |
| `location` | TEXT | NULL | Standort (Raum, Arbeitsplatz) |
| `photo_url` | TEXT | NULL | URL zum Foto (Storage) |
| `user_id` | UUID | NULL | Benutzer-ID (optional) |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Erstellungszeitpunkt |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW() | Letzte Änderung |

**Kategorien (Enum-Werte):**
- `Technik` - Hardware, Software, Netzwerk
- `Infrastruktur` - Gebäude, Räume, Möbel
- `Ergonomie` - Arbeitsplatz, Gesundheit
- `Sonstiges` - Andere Probleme

**Status (Enum-Werte):**
- `Offen` - Neu erstellt, noch nicht bearbeitet
- `In Bearbeitung` - Wird aktuell bearbeitet
- `Gelöst` - Problem wurde behoben

### 4.3 Indizes

Für Performance-Optimierung:

```sql
CREATE INDEX tickets_status_idx ON tickets(status);
CREATE INDEX tickets_created_at_idx ON tickets(created_at DESC);
```

### 4.4 Trigger

Automatisches Update des `updated_at` Feldes:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tickets_updated_at 
BEFORE UPDATE ON tickets
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
```

### 4.5 Row Level Security

Für Demo-Zwecke offene Policy:

```sql
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for all users" ON tickets
  FOR ALL USING (true);
```

### 4.6 Storage Bucket

#### Bucket: `ticket-photos`

- **Name**: `ticket-photos`
- **Public**: Ja
- **Dateipfad-Format**: `tickets/{timestamp}_{filename}.jpg`

**Storage Policies:**

```sql
CREATE POLICY "Enable upload for all users" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'ticket-photos');

CREATE POLICY "Enable read for all users" ON storage.objects
  FOR SELECT USING (bucket_id = 'ticket-photos');
```

### 4.7 ER-Diagramm

```
┌────────────────────────────────┐
│          tickets               │
├────────────────────────────────┤
│ PK  id (UUID)                  │
│     title (TEXT)               │
│     description (TEXT)         │
│     category (TEXT)            │
│     status (TEXT)              │
│     location (TEXT, NULL)      │
│     photo_url (TEXT, NULL) ────┼──> Storage: ticket-photos
│     user_id (UUID, NULL)       │
│     created_at (TIMESTAMP)     │
│     updated_at (TIMESTAMP)     │
└────────────────────────────────┘
```

### 4.8 Lokale Speicherung (Offline)

Für Offline-Funktionalität wird **localforage** verwendet.

**Store Name**: `workflow-assist`

**Struktur:**
```javascript
{
  key: 'temp_1234567890',
  value: {
    title: 'Monitor defekt',
    description: '...',
    category: 'Technik',
    // ...
  }
}
```

### 4.9 Vollständiges SQL-Schema

```sql
-- Tabelle erstellen
CREATE TABLE tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Offen',
  location TEXT,
  photo_url TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indizes
CREATE INDEX tickets_status_idx ON tickets(status);
CREATE INDEX tickets_created_at_idx ON tickets(created_at DESC);

-- RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for all users" ON tickets
  FOR ALL USING (true);

-- Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tickets_updated_at 
BEFORE UPDATE ON tickets
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
```

---

## 5. Technische Umsetzung

### 5.1 Technologie-Stack

**Frontend:**
- Framework: Ionic 8
- UI-Framework: Angular 20
- Styling: Ionic CSS Variables + SCSS
- State Management: Services (Angular Singleton Pattern)

**Backend:**
- BaaS: Supabase
- Datenbank: PostgreSQL
- Storage: Supabase Storage
- Realtime: Supabase Realtime

**Mobile Runtime:**
- Capacitor: 7.4.4
- Plattformen: Android, iOS, PWA

### 5.2 Capacitor Plugins (Geräteschnittstellen)

| # | Plugin | Verwendung | Erfüllt |
|---|--------|------------|---------|
| 1 | `@capacitor/camera` | Foto aufnehmen, Galerie | ✅ |
| 2 | `@capacitor-mlkit/barcode-scanning` | QR-Code Scanner | ✅ |
| 3 | `@capacitor/local-notifications` | Push-Benachrichtigungen | ✅ |
| 4 | `@capacitor/network` | Online/Offline Detection | ✅ |
| 5 | `@capacitor/filesystem` | Datei-Operationen | ✅ |

**Lokaler Speicher:** localforage (für Offline-Modus)

### 5.3 Projekt-Struktur

```
src/app/
├── models/
│   └── ticket.model.ts          # TypeScript Interfaces
├── services/
│   ├── supabase.service.ts      # CRUD-Operationen
│   ├── camera.service.ts        # Kamera-Funktionen
│   ├── storage.service.ts       # Lokale Speicherung
│   ├── network.service.ts       # Netzwerk-Status
│   ├── notification.service.ts  # Push Notifications
│   └── theme.service.ts         # Dark Mode
├── pages/
│   ├── ticket-create/           # Ticket erstellen
│   ├── ticket-list/             # Ticket-Liste
│   ├── ticket-detail/           # Ticket-Details
│   └── settings/                # Einstellungen
├── home/                        # Dashboard
└── tabs/                        # Tab-Navigation
```

### 5.4 Erfüllte Anforderungen

| Anforderung | Status | Umsetzung |
|-------------|--------|-----------|
| IONIC + Capacitor | ✅ | Ionic 8.0, Capacitor 7.4 |
| ≥ 4 Ansichten | ✅ | 6 Seiten implementiert |
| Supabase CRUD | ✅ | Create, Read, Update, Delete |
| ≥ 3 Geräteschnittstellen | ✅ | 5 implementiert |
| Eigenständiges Theming | ✅ | Custom Colors, Icon, Splash |
| Manueller Dark-Mode | ✅ | Toggle in Settings |

### 5.5 Zusätzliche Features

- Swipe-to-Delete für Tickets
- Pull-to-Refresh
- Loading States & Error Handling
- Toast-Benachrichtigungen
- Statistik-Dashboard
- Filter-Funktionalität
- Share-Funktion (Web Share API)

---

## 6. Installation

### 6.1 Voraussetzungen

- Node.js (v18+)
- npm
- Ionic CLI: `npm install -g @ionic/cli`
- Android Studio (für Android)

### 6.2 Setup

```bash
# 1. Dependencies installieren
npm install

# 2. Supabase konfigurieren (siehe SUPABASE_SETUP.md)

# 3. Im Browser testen
ionic serve

# 4. Für Android bauen
ionic build
ionic cap add android
ionic cap sync android
ionic cap open android
```

### 6.3 Supabase einrichten

Siehe separate Datei `SUPABASE_SETUP.md` für detaillierte Anleitung.

**Kurzfassung:**
1. Supabase-Projekt erstellen
2. API Keys in `src/environments/environment.ts` eintragen
3. SQL-Script für Tabelle ausführen
4. Storage Bucket erstellen

---

## Fazit

WorkFlow Assist erfüllt alle Anforderungen des ÜK Modul 335:

✅ **6 Ansichten** (4 erforderlich)  
✅ **5 Geräteschnittstellen** (3 erforderlich)  
✅ **Vollständiges CRUD** über Supabase  
✅ **Dark Mode** manuell umschaltbar  
✅ **Eigenständiges Theming** mit Custom Colors  
✅ **Offline-Funktionalität** mit lokalem Speicher  

Die App ist vollständig funktionsfähig und kann auf Android-Geräten deployed werden.

---

**Entwickelt im Rahmen des ÜK Modul 335**  
*Mobile-Applikation mit dem Ionic-Framework (Angular) realisieren*  
Dezember 2025

