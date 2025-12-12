# WorkFlowAssist

Mobile App zur schnellen Erfassung und Verwaltung von Arbeitsplatz-Problemen.

![Ionic](https://img.shields.io/badge/Ionic-8.0-blue)
![Angular](https://img.shields.io/badge/Angular-20-red)
![Capacitor](https://img.shields.io/badge/Capacitor-7.4-purple)

---

## Quick Start

```bash
# 1. Dependencies installieren
npm install

# 2. Supabase konfigurieren (siehe unten)
# Trage deine Keys in src/environments/environment.ts ein

# 3. App im Browser starten
ionic serve
```

App öffnet sich unter `http://localhost:8100`

---

## App-Features

### **Tickets verwalten**
- **Erstellen**: Titel, Beschreibung, Kategorie, Standort
- **Ansehen**: Liste mit Filter (Alle, Offen, In Bearbeitung, Gelöst)
- **Bearbeiten**: Status ändern (Offen → In Bearbeitung → Gelöst)
- **Löschen**: Swipe-to-Delete in der Liste

### **GPS-Standort**
- Automatische GPS-Erfassung beim Ticket erstellen
- Oder manuelle Eingabe (z.B. "Raum 201")
- Standort wird mit Koordinaten gespeichert

### **Offline-Modus**
- Tickets offline erstellen
- Automatische Synchronisierung bei Online-Verbindung
- Online/Offline Status wird angezeigt

### **Push-Benachrichtigungen**
- Bei Ticket-Erstellung
- Bei Status-Änderung
- Ein/Ausschalten in Einstellungen

### **Dark Mode**
- Manueller Umschalter in Einstellungen
- Einstellung wird gespeichert
- Alle Seiten passen sich automatisch an

### **Dashboard**
- Übersicht aller Tickets
- Statistiken (Gesamt, Offen, In Bearbeitung, Gelöst)
- Neueste Tickets
- Schnellzugriff zu wichtigen Funktionen

---

## Setup für Entwickler

### 1. Supabase einrichten

Erstelle ein kostenloses Supabase-Projekt: https://supabase.com

```sql
-- SQL-Tabelle erstellen in Supabase SQL Editor
CREATE TABLE tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Offen',
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security aktivieren
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access" ON tickets FOR ALL USING (true);
```

Trage deine Keys ein in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'DEINE_SUPABASE_URL',
    key: 'DEIN_SUPABASE_ANON_KEY'
  }
};
```

Mehr Details: siehe `SUPABASE_SETUP.md`

### 2. Development-Server

```bash
ionic serve
```

### 3. Auf Android testen

```bash
# Production Build
ionic build --prod

# Android Platform hinzufügen (nur einmal)
ionic cap add android

# Nach jedem Build: Sync
ionic cap sync android

# Android Studio öffnen
ionic cap open android
```

In Android Studio auf klicken zum Installieren auf Emulator/Gerät.

---

## APK erstellen

### Schritt-für-Schritt:

```bash
# 1. Production Build erstellen
ionic build --prod

# 2. Nach Android kopieren
npx cap sync android

# 3. Android Studio öffnen
npx cap open android
```

### In Android Studio:

**Für Debug-APK (zum Testen):**
- Build → Build Bundle(s) / APK(s) → **Build APK(s)**
- APK liegt in: `android/app/build/outputs/apk/debug/app-debug.apk`

**Für Release-APK (Production):**
- Build → Build Bundle(s) / APK(s) → **Build APK(s)**
- Wähle "release" Build Variant (links in "Build Variants" Panel)
- APK liegt in: `android/app/build/outputs/apk/release/app-release.apk`

**Oder via Command Line:**
```bash
cd android
./gradlew assembleDebug    # Debug-APK
./gradlew assembleRelease  # Release-APK
```

---

## Technologien

### Frontend
- **Ionic 8** - UI Framework
- **Angular 20** - TypeScript Framework
- **Capacitor 7.4** - Native Runtime

### Backend
- **Supabase** - Database as a Service
- **PostgreSQL** - Datenbank

### Capacitor Plugins
- `@capacitor/geolocation` - GPS-Standort
- `@capacitor/local-notifications` - Push-Benachrichtigungen
- `@capacitor/network` - Online/Offline Detection
- `localforage` - Lokaler Speicher

---

## Projekt-Struktur

```
smart-activity-logger/
├── src/app/
│   ├── models/              # TypeScript Interfaces
│   │   └── ticket.model.ts
│   ├── services/            # Business Logic
│   │   ├── supabase.service.ts      # CRUD Operations
│   │   ├── geolocation.service.ts   # GPS
│   │   ├── storage.service.ts       # Lokaler Speicher
│   │   ├── network.service.ts       # Online/Offline
│   │   ├── notification.service.ts  # Push-Benachrichtigungen
│   │   └── theme.service.ts         # Dark Mode
│   ├── pages/               # App-Seiten
│   │   ├── ticket-create/   # Ticket erstellen
│   │   ├── ticket-list/     # Ticket-Liste
│   │   ├── ticket-detail/   # Ticket-Details
│   │   └── settings/        # Einstellungen
│   ├── home/                # Dashboard
│   └── tabs/                # Tab-Navigation
├── android/                 # Android-Projekt (für APK)
├── www/                     # Kompilierte Web-App
├── resources/               # Icon & Splash Screen
└── DOKUMENTATION.md         # Vollständige Projektdokumentation
```

---

## Troubleshooting

### App startet nicht

```bash
# Cache löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
ionic serve
```

### Supabase-Fehler: "Invalid API key"

- Überprüfe `src/environments/environment.ts`
- Sind URL und Key korrekt?
- Verwende den **anon/public** Key, nicht den Service Key

### GPS funktioniert nicht

- Im Browser: GPS geht nur mit HTTPS oder localhost
- Auf Gerät: GPS-Berechtigung erteilen
- Im Emulator: "Extended Controls" → Location → GPS-Koordinaten setzen

### Push-Benachrichtigungen gehen nicht

- Im Browser: Nicht verfügbar
- Auf echtem Gerät: Berechtigung erteilen
- In Einstellungen: Benachrichtigungen aktivieren

### Dark Mode funktioniert nicht

- Hard Refresh im Browser: `Cmd/Ctrl + Shift + R`
- In Settings aus- und wieder einschalten

### Android Build schlägt fehl

```bash
# Gradle Cache löschen
cd android
./gradlew clean

# Neu bauen
cd ..
ionic build --prod
npx cap sync android
```

---

## Weitere Dokumentation

- **DOKUMENTATION.md** - Vollständige Projektdokumentation (ÜK Modul 335)
- **SUPABASE_SETUP.md** - Detaillierte Supabase-Einrichtung

---

## Tipps

### Schneller entwickeln

```bash
# Mit automatischem Browser-Öffnen
ionic serve --open

# Auf anderem Port
ionic serve --port 8200
```

### Native Features testen

Folgende Features funktionieren **nur auf echtem Gerät oder Emulator**:
- GPS-Standort
- Push-Benachrichtigungen
- Kamera (falls implementiert)

**Nicht im Browser verfügbar!**

### Performance

- Offline-Modus für schnellere Bedienung nutzen
- Dark Mode spart Akku (OLED-Displays)
- Regelmäßig Tickets löschen für bessere Performance

---

**App-Name:** WorkFlowAssist  
**App-ID:** com.workflow.assist  
**Version:** 1.0.0  

**ÜK Modul 335** - Mobile-Applikation mit Ionic Framework  
**Dezember 2025**

---

## Los geht's!

```bash
npm install
ionic serve
```

