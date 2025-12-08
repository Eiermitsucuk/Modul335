# WorkFlow Assist 📱

Eine mobile App zur schnellen Erfassung und Verwaltung von Arbeitsplatz-Problemen.

![Ionic](https://img.shields.io/badge/Ionic-8.0-blue)
![Angular](https://img.shields.io/badge/Angular-20-red)
![Capacitor](https://img.shields.io/badge/Capacitor-7.4-purple)

---

## 🚀 Quick Start

### Installation

```bash
# Dependencies installieren
npm install

# App im Browser starten
ionic serve
```

Die App öffnet sich automatisch im Browser unter `http://localhost:8100`

---

## 📖 Wie benutzt man die App?

### 1. Erstes Ticket erstellen

1. Öffne die App
2. Tippe auf den **"Erstellen"** Tab (➕ Icon)
3. Fülle das Formular aus:
   - **Titel**: z.B. "Monitor zeigt kein Bild"
   - **Kategorie**: Wähle "Technik"
   - **Beschreibung**: Beschreibe das Problem
   - **Standort** (optional): z.B. "Raum 201"
   - **Foto** (optional): Nimm ein Foto auf
4. Tippe auf **"Ticket erstellen"**

✅ Dein Ticket ist jetzt gespeichert!

### 2. Tickets ansehen

1. Öffne den **"Tickets"** Tab (📋 Icon)
2. Hier siehst du alle deine Tickets
3. **Filtern**: Tippe oben auf "Offen", "In Bearbeitung" oder "Gelöst"
4. **Details ansehen**: Tippe auf ein Ticket
5. **Löschen**: Swipe nach links auf einem Ticket

### 3. Ticket-Status ändern

1. Öffne ein Ticket in der Detail-Ansicht
2. Scrolle nach unten zu "Status ändern"
3. Tippe auf den gewünschten Status:
   - **Offen** (rot)
   - **In Bearbeitung** (orange)
   - **Gelöst** (grün)
4. Status wird automatisch gespeichert

💡 Du erhältst eine Push-Benachrichtigung bei Statusänderungen!

### 4. Foto hinzufügen

Beim Ticket erstellen:

1. Scrolle zu "Foto (optional)"
2. Wähle eine Option:
   - **📷 Foto aufnehmen**: Öffnet die Kamera
   - **🖼️ Aus Galerie wählen**: Öffnet die Galerie
3. Das Foto wird hochgeladen
4. Im Ticket-Detail wird das Foto angezeigt

### 5. QR-Code scannen

Für schnelle Standort-Erfassung:

1. Beim Ticket erstellen
2. Neben "Standort" auf das **QR-Code Icon** tippen
3. Scanner öffnet sich
4. QR-Code scannen
5. Standort wird automatisch eingetragen

📱 **Hinweis**: QR-Scanner funktioniert nur auf echtem Gerät!

### 6. Dark Mode aktivieren

1. Öffne **"Einstellungen"** Tab (⚙️ Icon)
2. Unter "Darstellung"
3. Schalte **"Dark Mode"** um
4. Die ganze App wird dunkel! 🌙

Die Einstellung wird gespeichert.

### 7. Offline arbeiten

Die App funktioniert auch **ohne Internet**:

1. Im **Home** Tab siehst du den Verbindungsstatus
2. Bei **Offline**:
   - Tickets werden lokal gespeichert
   - Du siehst einen Hinweis beim Erstellen
   - Bei **Online** wieder: Tickets synchronisieren

---

## 🔧 Für Entwickler

### Projekt-Setup

```bash
# Dependencies installieren
npm install

# Supabase konfigurieren
# 1. Öffne src/environments/environment.ts
# 2. Trage deine Supabase URL und Key ein
# 3. Siehe SUPABASE_SETUP.md für Details

# Development-Server starten
ionic serve
```

### Auf Android testen

```bash
# Production Build
npm run build

# Android-Plattform hinzufügen (einmalig)
ionic cap add android

# Sync (nach jedem Build)
ionic cap sync android

# In Android Studio öffnen
ionic cap open android
```

In Android Studio:
1. Emulator oder Gerät auswählen
2. Auf ▶️ klicken
3. App wird installiert und gestartet

### APK erstellen

```bash
# Production Build
npm run build --prod
ionic cap sync android

# Android Studio öffnen
ionic cap open android
```

In Android Studio:
1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Warte bis Build fertig
3. APK liegt in: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 Features im Detail

### Home Dashboard

- **Netzwerk-Status**: Zeigt Online/Offline an
- **Statistiken**: Übersicht aller Tickets
- **Schnellaktionen**: Direkt neues Ticket oder Liste öffnen
- **Neueste Tickets**: Die letzten 5 Tickets

### Ticket-Liste

- **Filter**: Nach Status filtern
- **Swipe-to-Delete**: Nach links wischen zum Löschen
- **Pull-to-Refresh**: Nach unten ziehen zum Aktualisieren
- **FAB**: Floating Button für neues Ticket

### Ticket-Detail

- **Vollständige Info**: Alle Details auf einen Blick
- **Status ändern**: Direkt im Detail
- **Foto anzeigen**: Hochgeladene Fotos
- **Teilen**: Ticket-Info teilen (Web Share API)
- **Löschen**: Mit Bestätigung

### Einstellungen

- **Dark Mode**: Hell/Dunkel umschalten
- **Benachrichtigungen**: Test-Benachrichtigung senden
- **Netzwerk-Info**: Status und Typ
- **Statistiken**: Ticket-Übersicht
- **Speicher**: Lokalen Cache leeren

---

## 🛠️ Verwendete Technologien

### Frontend
- **Ionic 8** - UI Components
- **Angular 20** - Framework
- **TypeScript** - Programmiersprache
- **SCSS** - Styling

### Backend
- **Supabase** - Database as a Service
- **PostgreSQL** - Datenbank
- **Supabase Storage** - Datei-Speicherung

### Mobile
- **Capacitor 7** - Native Runtime
- **Camera Plugin** - Fotos aufnehmen
- **Barcode Scanner** - QR-Codes scannen
- **Local Notifications** - Push-Benachrichtigungen
- **Network Plugin** - Online/Offline Detection
- **localforage** - Lokaler Speicher

---

## 📁 Projekt-Struktur

```
src/app/
├── models/              # TypeScript Interfaces
│   └── ticket.model.ts
├── services/            # Business Logic
│   ├── supabase.service.ts      # CRUD + Cloud
│   ├── camera.service.ts        # Kamera
│   ├── storage.service.ts       # Lokaler Speicher
│   ├── network.service.ts       # Netzwerk
│   ├── notification.service.ts  # Benachrichtigungen
│   └── theme.service.ts         # Dark Mode
├── pages/               # App-Seiten
│   ├── ticket-create/
│   ├── ticket-list/
│   ├── ticket-detail/
│   └── settings/
├── home/                # Dashboard
└── tabs/                # Navigation
```

---

## 🎨 Theming anpassen

Farben ändern in `src/theme/variables.scss`:

```scss
:root {
  --ion-color-primary: #3880ff;    // Hauptfarbe
  --ion-color-success: #2dd36f;    // Erfolg (grün)
  --ion-color-warning: #ffc409;    // Warnung (orange)
  --ion-color-danger: #eb445a;     // Fehler (rot)
}
```

Dark Mode Farben auch in `variables.scss` unter `body.dark { ... }`

---

## 🐛 Troubleshooting

### App startet nicht im Browser

```bash
# Cache löschen
rm -rf node_modules package-lock.json
npm install
ionic serve
```

### Supabase-Fehler

- Überprüfe `src/environments/environment.ts`
- Sind URL und Key korrekt?
- Siehe `SUPABASE_SETUP.md` für Setup

### Kamera funktioniert nicht

- Im Browser: Kamera geht nicht, nur auf echtem Gerät
- Auf Gerät: Berechtigungen erlauben

### QR-Scanner funktioniert nicht

- Nur auf echtem Gerät verfügbar
- Im Browser: Manuelle Standort-Eingabe nutzen

### Dark Mode bleibt immer dunkel

- Hard Refresh: `Cmd/Ctrl + Shift + R`
- Cache leeren im Browser
- In Settings Dark Mode aus/ein schalten

---

## 📚 Weitere Dokumentation

- **DOKUMENTATION.md** - Vollständige Projektdokumentation (für Abgabe)
- **SUPABASE_SETUP.md** - Schritt-für-Schritt Supabase Einrichtung

---

## 💡 Tipps & Tricks

### Schneller entwickeln

```bash
# Browser öffnet automatisch
ionic serve --open

# Auf bestimmtem Port
ionic serve --port 8200

# Mit Labs (experimentelle Features)
ionic serve --lab
```

### Device Features testen

Kamera, QR-Scanner, Push-Benachrichtigungen funktionieren nur auf:
- Echtem Android/iOS Gerät
- Android Emulator mit Kamera
- iOS Simulator (eingeschränkt)

**Nicht im Browser!**

### Performance

- Bilder: Maximal 1024x1024px
- Offline-Modus nutzen für schnellere Bedienung
- Dark Mode spart Akku (OLED-Displays)

---

## 🤝 Support

Bei Problemen:

1. Siehe Troubleshooting oben
2. Supabase-Setup überprüfen
3. Console-Logs prüfen (F12 im Browser)
4. Google nach spezifischer Fehlermeldung

---

## ⚡ Shortcuts

| Aktion | Shortcut |
|--------|----------|
| Neues Ticket | FAB-Button in Ticket-Liste |
| Zurück | Back-Button oder Swipe-Geste |
| Ticket löschen | Swipe nach links |
| Aktualisieren | Pull-to-Refresh |
| Dark Mode | Settings → Toggle |

---

**Version:** 1.0.0  
**Entwickelt mit:** Ionic 8 + Angular 20 + Capacitor 7  
**ÜK Modul 335** - Dezember 2025

🚀 Viel Erfolg mit WorkFlow Assist!
