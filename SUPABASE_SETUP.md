# Supabase Setup Anleitung

Diese Anleitung erklärt Schritt für Schritt, wie du Supabase für die WorkFlow Assist App einrichtest.

## 1. Supabase Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Klicke auf "Start your project"
3. Registriere dich oder melde dich an
4. Klicke auf "New Project"
5. Gib folgende Informationen ein:
   - **Name**: workflow-assist (oder beliebig)
   - **Database Password**: Sicheres Passwort (pbog9QfZGMJCozdQ)
   - **Region**: Wähle die nächstgelegene Region (z.B. Europe West)
6. Klicke auf "Create new project"
7. Warte ca. 2 Minuten, bis das Projekt bereit ist

## 2. API Keys kopieren

1. Gehe zu **Settings** (Zahnrad-Symbol links unten)
2. Klicke auf **API**
3. Kopiere folgende Werte:
   - **Project URL** (z.B. `https://xxxxx.supabase.co`)
   - **anon public** Key (der lange String unter "Project API keys")

## 3. API Keys in die App einfügen

Öffne die Datei `src/environments/environment.ts` und ersetze die Platzhalter:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'HIER_DEINE_PROJECT_URL',
    anonKey: 'HIER_DEIN_ANON_KEY'
  }
};
```

Mache dasselbe für `src/environments/environment.prod.ts`.

## 4. Datenbank-Tabelle erstellen

1. Gehe zurück zu deinem Supabase-Projekt
2. Klicke links auf **SQL Editor**
3. Klicke auf **New query**
4. Kopiere folgenden SQL-Code:

```sql
-- Tickets Tabelle erstellen
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

-- Index für schnellere Queries
CREATE INDEX tickets_status_idx ON tickets(status);
CREATE INDEX tickets_created_at_idx ON tickets(created_at DESC);

-- RLS (Row Level Security) aktivieren
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann alles lesen, schreiben, löschen (für Demo-Zwecke)
-- WICHTIG: Für Production solltest du hier User-spezifische Policies erstellen!
CREATE POLICY "Enable all access for all users" ON tickets
  FOR ALL USING (true);

-- Funktion für automatisches Update des updated_at Feldes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für automatisches Update
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

5. Klicke auf **Run** (oder drücke Cmd/Ctrl + Enter)
6. Du solltest "Success. No rows returned" sehen

## 6. Test

Um zu testen, ob alles funktioniert:

1. Starte die App: `ionic serve`
2. Erstelle ein Test-Ticket
3. Gehe zu Supabase → **Table Editor** → **tickets**
4. Du solltest jetzt das erstellte Ticket sehen

## 7. Sicherheitshinweise für Production

⚠️ **WICHTIG**: Die aktuellen Policies erlauben jedem vollen Zugriff! Für eine produktive App solltest du:

1. **Authentifizierung aktivieren**: Nutze Supabase Auth
2. **User-spezifische Policies**: Nutzer sehen nur ihre eigenen Tickets

Beispiel für sichere Policy:

```sql
-- Nur eigene Tickets sehen
CREATE POLICY "Users can view own tickets" ON tickets
  FOR SELECT USING (auth.uid() = user_id);

-- Nur eigene Tickets erstellen
CREATE POLICY "Users can create own tickets" ON tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Nur eigene Tickets bearbeiten
CREATE POLICY "Users can update own tickets" ON tickets
  FOR UPDATE USING (auth.uid() = user_id);
```

## Troubleshooting

### Fehler: "Failed to fetch"

- Überprüfe, ob die URL und API Key korrekt sind
- Stelle sicher, dass du eine Internetverbindung hast
- Überprüfe in der Browser-Konsole die genaue Fehlermeldung

### Fehler: "Row Level Security Policy"

- Stelle sicher, dass die RLS Policies korrekt erstellt wurden
- Überprüfe in Supabase → **Authentication** → **Policies**

### Realtime funktioniert nicht

- Stelle sicher, dass Realtime für die `tickets` Tabelle aktiviert ist
- Überprüfe in **Database** → **Replication**

## Weitere Ressourcen

- [Supabase Dokumentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## Hinweise zur App-Funktionalität

**Standorterfassung:**
Die App nutzt GPS/Geolocation zur Standortbestimmung. Der Standort wird als Koordinaten im `location` Feld gespeichert (z.B. "Lat: 47.376886, Lng: 8.541694 (±15m)").

**Keine Foto-Speicherung:**
Diese Version der App speichert keine Fotos. Der Fokus liegt auf schneller Problemerfassung mit GPS-Koordinaten.

---

Bei Fragen oder Problemen, schaue in die offizielle Supabase-Dokumentation oder frage in der [Supabase Discord Community](https://discord.supabase.com/).

