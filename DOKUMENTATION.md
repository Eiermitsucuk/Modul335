# WorkFlow Assist
## Mobile-Applikation zur Erfassung und Verwaltung von Arbeitsplatz-Problemen

---

## ÜK Modul 335
**Mobile-Applikation mit dem Ionic-Framework (Angular) realisieren**

---

### Projektinformationen

| | |
|---|---|
| **Projekttitel** | WorkFlow Assist |
| **Modulname** | ÜK Modul 335 |
| **Datum** | Dezember 2025 |
| **Name** | [Ihr Vor- und Nachname] |
| **Klasse** | [Ihre Klasse] |

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
- Titel und Beschreibung können eingegeben werden (mit Validierung)
- Kategorie kann ausgewählt werden (Technik, Infrastruktur, Ergonomie, Sonstiges)
- GPS-Standort kann automatisch erfasst werden
- Standort kann auch manuell eingegeben werden
- Formulareingaben werden vollständig validiert mit Feedback
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
- Standort wird angezeigt (mit Option zur Kartenansicht)
- Zeitstempel (Erstellung, letzte Änderung)
- Status kann geändert werden
- Ticket kann gelöscht werden
- Alle Informationen sind übersichtlich strukturiert

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

### US5: GPS-Standort erfassen
**Als** Lernender  
**möchte ich** meinen aktuellen GPS-Standort automatisch erfassen können  
**damit** der genaue Ort des Problems dokumentiert wird.

**Akzeptanzkriterien:**
- GPS-Standort kann per Button abgerufen werden
- Koordinaten (Latitude, Longitude) werden angezeigt
- Genauigkeit wird angezeigt (±X Meter)
- Standort kann auch manuell eingegeben werden (z.B. "Raum 201")
- Berechtigungsabfrage wird korrekt behandelt
- Fehlerbehandlung bei fehlgeschlagener GPS-Erfassung
- Standort kann in Google Maps geöffnet werden

---

### US6: Offline arbeiten
**Als** Lernender  
**möchte ich** Tickets auch ohne Internet erstellen können  
**damit** ich nicht auf eine Verbindung warten muss.

**Akzeptanzkriterien:**
- Online/Offline Status wird angezeigt (über Network Service)
- Tickets können offline erstellt werden
- Offline-Tickets werden lokal gespeichert (localforage)
- Hinweis über Offline-Speicherung wird angezeigt
- Automatische Synchronisierung wenn Online

---

### US7: Benachrichtigungen erhalten
**Als** Lernender  
**möchte ich** Benachrichtigungen bei wichtigen Ereignissen erhalten  
**damit** ich informiert bleibe.

**Akzeptanzkriterien:**
- Benachrichtigung bei Ticket-Erstellung
- Benachrichtigung bei Statusänderung
- Benachrichtigungen können in Settings getestet werden
- Berechtigung wird korrekt angefragt

---

### US8: Dark Mode aktivieren
**Als** Benutzer  
**möchte ich** zwischen hellem und dunklem Design wechseln  
**damit** ich die App auch nachts angenehm nutzen kann.

**Akzeptanzkriterien:**
- Dark Mode kann manuell umgeschaltet werden (Toggle in Settings)
- Einstellung wird persistent gespeichert
- Alle Seiten passen sich automatisch an
- Custom Farbschema wird in beiden Modi korrekt angewendet
- Alle Elemente bleiben lesbar (ISO 9241-110 konform)

---

### US9: Statistiken einsehen
**Als** Ausbildungsverantwortlicher  
**möchte ich** eine Übersicht über alle Tickets sehen  
**damit** ich Trends erkennen kann.

**Akzeptanzkriterien:**
- Dashboard zeigt Anzahl aller Tickets
- Anzahl nach Status (Offen, In Bearbeitung, Gelöst)
- Statistiken auf Home-Seite (Dashboard)
- Statistiken auf Settings-Seite
- Neueste Tickets werden auf Home-Seite angezeigt

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
- `ion-input` für Titel (mit Validierung: min 3, max 100 Zeichen)
- `ion-select` für Kategorie
- `ion-textarea` für Beschreibung (mit Validierung: min 10, max 500 Zeichen)
- `ion-card` für Standort
  - `ion-input` für manuellen Standort
  - `ion-button` für GPS-Standort abrufen
  - `ion-note` mit Hinweisen
- Validierungs-Feedback mit `ion-note` (Fehler und Zeichenzähler)
- `ion-button` Submit (nur aktiv wenn Formular valide)
- `ion-note` für Offline-Warnung

**Wireframe:**
```
┌─────────────────────────┐
│ [<] Neues Ticket        │
├─────────────────────────┤
│ Titel: *                │
│ [________________]      │
│ (min. 3 Zeichen)        │
│                         │
│ Kategorie: *            │
│ [Technik ▼]             │
│                         │
│ Beschreibung: *         │
│ [________________]      │
│ [________________]      │
│ 245/500 Zeichen         │
│                         │
│ ┌─────────────────────┐ │
│ │ Standort *          │ │
│ │ [Raum 201____]      │ │
│ │ [📍 GPS abrufen]    │ │
│ │ ℹ️ GPS für präzise   │ │
│ │   Koordinaten       │ │
│ └─────────────────────┘ │
│                         │
│ * Pflichtfelder         │
│                         │
│ [✓ Ticket erstellen]    │
│                         │
│ ⚠️ Offline: lokal      │
│    gespeichert          │
└─────────────────────────┘
```

#### Seite 4: Ticket-Detail
**Zweck:** Vollständige Ticket-Informationen

**UI-Elemente:**
- `ion-header` mit Back + Menu
- `ion-card` für Titel & Status
  - Kategorie-Icon
  - `ion-badge` für Status (farbcodiert)
- `ion-card` für Beschreibung
- `ion-card` für Standort
  - Standort-Anzeige
  - `ion-button` für Google Maps öffnen (wenn GPS-Koordinaten)
- `ion-card` für Zeitstempel
  - Erstellt am
  - Zuletzt aktualisiert
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
│ 📍 Standort:            │
│ Lat: 47.123456          │
│ Lng: 8.654321 (±12m)    │
│ [🗺️ In Maps öffnen]    │
│                         │
│ 🕐 Zeitstempel:         │
│ Erstellt: 05.12 14:30   │
│ Aktualisiert: 05.12...  │
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

**Custom Farb-Schema:**

**Light Mode:**
- Primary: `#154360` (Dunkles Blau) - RGB(21,67,96)
- Secondary: `#60ce80` (Mintgrün) - RGB(96,206,128)
- Tertiary: `#4db8ff` (Helles Türkis) - RGB(77,184,255)
- Background: `#f0f0f0` (Hellgrau)
- Cards: `#ffffff` (Weiß)
- Text: `#000000` (Schwarz)

**Dark Mode:**
- Primary: `#60ce80` (Mintgrün) - RGB(96,206,128)
- Secondary: `#4db8ff` (Hellblau) - RGB(77,184,255)
- Tertiary: `#154360` (Dunkles Blau) - RGB(21,67,96)
- Background: `#0a1929` (Sehr Dunkel)
- Cards: `#1a2332` (Dunkelgrau)
- Text: `#ffffff` (Weiß)

**Status-Farben (beide Modi):**
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
- Sonstiges: `ellipsis-horizontal`
- GPS: `locate`, `navigate-circle`
- Benachrichtigung: `notifications`

**UI-Prinzipien (ISO 9241-110):**
- Aufgabenangemessenheit: Klare Formulare mit Validierung
- Selbstbeschreibungsfähigkeit: Hilfe-Texte und Icons
- Erwartungskonformität: Standard Ionic Komponenten
- Fehlertoleranz: Validierung mit konstruktivem Feedback
- Individualisierbarkeit: Dark Mode Toggle
- Lernförderlichkeit: Konsistente Navigation
- Steuerbarkeit: Manuelle Eingaben als Alternative zu GPS

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
| `title` | TEXT | NOT NULL | Titel des Problems (3-100 Zeichen) |
| `description` | TEXT | NOT NULL | Detaillierte Beschreibung (10-500 Zeichen) |
| `category` | TEXT | NOT NULL | Kategorie (Enum) |
| `status` | TEXT | NOT NULL, DEFAULT 'Offen' | Status (Enum) |
| `location` | TEXT | NULL | Standort (GPS-Koordinaten oder Raum) |
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

### 4.6 ER-Diagramm

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
│     user_id (UUID, NULL)       │
│     created_at (TIMESTAMP)     │
│     updated_at (TIMESTAMP)     │
└────────────────────────────────┘

Hinweis: GPS-Standorte werden als Text gespeichert
Format: "Lat: X.XXXXXX, Lng: Y.YYYYYY (±Xm)"
oder manuell: "Raum 201"
```

### 4.7 Lokale Speicherung (Offline)

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

### 4.8 Vollständiges SQL-Schema

```sql
-- Tabelle erstellen
CREATE TABLE tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Offen',
  location TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indizes
CREATE INDEX tickets_status_idx ON tickets(status);
CREATE INDEX tickets_created_at_idx ON tickets(created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for all users" ON tickets
  FOR ALL USING (true);

-- Trigger für automatisches Updated_at
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

**3 Geräteschnittstellen erforderlich - 3 implementiert:**

| # | Plugin | Verwendung | Erfüllt |
|---|--------|------------|---------|
| 1 | `@capacitor/geolocation` | GPS-Standort erfassen | ✅ |
| 2 | `@capacitor/local-notifications` | Push-Benachrichtigungen | ✅ |
| 3 | `@capacitor/network` | Online/Offline Detection | ✅ |

**Zusätzliche Technologien:**
- **localforage**: Lokaler Speicher für Offline-Modus
- **Supabase Client**: Backend-Kommunikation
- **Browser Geolocation API**: Fallback für Web-Plattform

### 5.3 Projekt-Struktur

```
src/app/
├── models/
│   └── ticket.model.ts          # TypeScript Interfaces & Enums
├── services/
│   ├── supabase.service.ts      # CRUD-Operationen (Create, Read, Update, Delete)
│   ├── geolocation.service.ts   # GPS-Standorterfassung
│   ├── storage.service.ts       # Lokale Speicherung (localforage)
│   ├── network.service.ts       # Netzwerk-Status (Online/Offline)
│   ├── notification.service.ts  # Push Notifications
│   └── theme.service.ts         # Dark Mode Verwaltung
├── pages/
│   ├── ticket-create/           # Ticket erstellen (mit Validierung)
│   ├── ticket-list/             # Ticket-Liste (mit Filter)
│   ├── ticket-detail/           # Ticket-Details (mit Status-Änderung)
│   └── settings/                # Einstellungen
├── home/                        # Dashboard (Statistiken & Schnellzugriff)
├── tabs/                        # Tab-Navigation
└── theme/
    └── variables.scss           # Custom Color Scheme
```

### 5.4 Erfüllte Anforderungen (ÜK Modul 335)

| Anforderung | Minimum | Umgesetzt | Status |
|-------------|---------|-----------|--------|
| **Ansichten** | ≥ 4 | 6 Seiten | ✅ |
| | | - Home (Dashboard) | |
| | | - Ticket-Liste | |
| | | - Ticket erstellen | |
| | | - Ticket-Details | |
| | | - Einstellungen | |
| | | - Tabs (Navigation) | |
| **Geräteschnittstellen** | ≥ 3 | 3 Plugins | ✅ |
| | | - Geolocation (GPS) | |
| | | - Local Notifications | |
| | | - Network Status | |
| **CRUD-Operationen** | Vollständig | Vollständig | ✅ |
| | | - Create (Ticket erstellen) | |
| | | - Read (Liste & Details) | |
| | | - Update (Status ändern) | |
| | | - Delete (Ticket löschen) | |
| **Backend** | Supabase | PostgreSQL | ✅ |
| **Theming** | Eigenständig | Custom Colors | ✅ |
| **Dark Mode** | Manuell | Toggle | ✅ |
| **UX** | ISO 9241-110 | Vollständig | ✅ |
| | | - Formularvalidierung | |
| | | - Fehler-Feedback | |
| | | - Intuitive Navigation | |
| | | - Lesbarkeit (beides Modi) | |

### 5.5 Zusätzliche Features

**Offline-Funktionalität:**
- Lokale Speicherung mit localforage
- Online/Offline Status-Anzeige
- Automatische Synchronisierung

**UX-Verbesserungen:**
- Swipe-to-Delete für Tickets
- Pull-to-Refresh (manuell)
- Loading States mit Spinner
- Toast-Benachrichtigungen
- Statistik-Dashboard mit Echtzeit-Daten
- Filter-Funktionalität (Alle, Offen, In Bearbeitung, Gelöst)
- Formular-Validierung mit Echtzeit-Feedback
- Zeichenzähler für Textfelder

**Technische Features:**
- Responsive Design (Mobile-First)
- GPS-Integration mit Fallback
- Fehlerbehandlung mit Alerts
- Persistente Theme-Speicherung
- Performance-optimierte Indizes

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

**WorkFlow Assist** erfüllt alle Anforderungen des **ÜK Modul 335** vollständig:

### Erfüllte Kriterien

✅ **Projektdokumentation**
   - Vollständiges Titelblatt mit allen erforderlichen Informationen
   - Strukturierte Projektbeschreibung mit Ausgangslage und Zielsetzung
   - Ablage und Versionierung mit Git/GitHub

✅ **User Stories** (9 Stück, 5 erforderlich)
   - Zweckmäßig und sinnvoll formuliert
   - Klare Akzeptanzkriterien
   - Abdeckung aller Hauptfunktionen

✅ **Storyboard & UI-Elemente**
   - 6 detaillierte Wireframes
   - Vollständige UI-Komponenten-Übersicht
   - Intuitive Benutzeroberfläche nach ISO 9241-110

✅ **Datenbank-Modell**
   - Vollständiges Schema (tickets-Tabelle)
   - ER-Diagramm
   - SQL-Implementierung mit Triggern und RLS

✅ **App-Umsetzung**
   - **6 Ansichten** (4 erforderlich)
   - **3 Geräteschnittstellen** (3 erforderlich): GPS, Notifications, Network
   - **Vollständiges CRUD** über Supabase
   - **Manueller Dark Mode** mit persistenter Speicherung
   - **Eigenständiges Theming** mit Custom Color Scheme
   - Aussagekräftige Bezeichnungen für Variablen, Funktionen und Komponenten

✅ **App-UX**
   - Intuitive Benutzeroberfläche gemäß ISO 9241-110
   - Vollständige Formularvalidierung mit konstruktivem Feedback
   - Echtzeit-Zeichenzähler
   - Hilfe-Texte und Icons für Selbstbeschreibungsfähigkeit
   - Offline-Funktionalität mit lokalem Speicher

### Technische Highlights

- **Modern Stack**: Ionic 8, Angular 20, Capacitor 7.4, Supabase
- **Mobile-First**: Optimiert für Android mit GPS-Integration
- **Offline-Ready**: Lokale Speicherung und Synchronisierung
- **Accessible**: Lesbar in beiden Modi (Light & Dark)
- **Performant**: Indizes und optimierte Queries

Die App ist vollständig funktionsfähig und kann als **lauffähige Android APK** bereitgestellt werden.

---

**Entwickelt im Rahmen des ÜK Modul 335**  
*Mobile-Applikation mit dem Ionic-Framework (Angular) realisieren*  
**Dezember 2025**

