# Sauerteig Love

Eine warme, niedliche PWA fuer Sauerteig-Starterpflege, Rezepte, Lerninhalte und Backplanung.

## Was die App kann

- Einen gemeinsamen Starter benennen.
- Eines von 5 suessen Sauerteig-Pets auswaehlen.
- Status anzeigen: aktiv, hungrig, schlaeft, ueberfaellig oder bereit zum Backen.
- Fuetterungen lokal speichern.
- Fuetterungserinnerungen als `.ics`-Kalenderdatei exportieren.
- 15 Rezepte anzeigen, davon 10 klassische Brote und 5 Alternativen.
- Rezepte per Herz markieren oder fuer spaeter speichern.
- Backplaene vorwaerts ab Startzeit oder rueckwaerts ab Fertigzeit berechnen.
- Backplaene als `.ics`-Kalenderdatei exportieren.
- Lerninhalte, Video-Vorschauen und Bildkarten anzeigen.
- Als PWA auf dem iPhone zum Home-Bildschirm hinzugefuegt werden.

## Lokal ansehen

Am einfachsten mit einem kleinen lokalen Webserver:

```powershell
python -m http.server 4173
```

Dann im Browser oeffnen:

```text
http://127.0.0.1:4173/
```

## GitHub Pages

Die App ist fuer dieses Repository vorbereitet:

```text
stefanoberhuber/Sauerteig-Love
```

Nach dem Push kann GitHub Pages auf den Branch `main` und den Ordner `/` zeigen.

Geplante URL:

```text
https://stefanoberhuber.github.io/Sauerteig-Love/
```

## iPhone Nutzung

1. App-Link in Safari oeffnen.
2. Teilen-Menue oeffnen.
3. "Zum Home-Bildschirm" waehlen.
4. App vom Home-Bildschirm starten.

Kalendererinnerungen entstehen ueber die Export-Buttons in der App. Die erzeugte `.ics`-Datei kann in Apple Kalender, Outlook oder Google Kalender importiert werden.
