# Projektbeschreibung: Sauerteig Love

## Ziel

**Sauerteig Love** ist eine warme, niedliche und verspielte iPhone-taugliche PWA fuer ein Paar, das gemeinsam in das Thema Sauerteig einsteigt. Die App soll Wissen, Rezepte, Starter-Pflege, ein suesses animiertes Sauerteig-Pet und eine praktische Backplanung verbinden.

Die App wird zunaechst kostenlos als PWA umgesetzt und ueber GitHub Pages bereitgestellt. Erinnerungen werden ueber exportierbare Kalenderdateien im `.ics`-Format geloest, damit sie in Apple Kalender, Outlook oder Google Kalender genutzt werden koennen.

Geplante Live-URL:

`https://stefanoberhuber.github.io/Sauerteig-Love/`

GitHub Repository:

`stefanoberhuber/Sauerteig-Love`

## Zielgruppe

Die App ist fuer zwei Personen gedacht, die denselben Sauerteig-Starter gemeinsam pflegen. Sie soll besonders anfaengerfreundlich sein und nicht voraussetzen, dass man bereits Erfahrung mit Sauerteig, Gehzeiten, Fuetterungsrhythmen oder Rezeptplanung hat.

## Plattform und Verteilung

- PWA, optimiert fuer iPhone/Safari.
- Installation ueber "Zum Home-Bildschirm".
- Hosting ueber GitHub Pages.
- Keine Apple-Developer-Kosten.
- Keine Nutzerkonten im ersten MVP.
- Keine Serverpflicht im ersten MVP.
- Lokale Speicherung im Browser.
- Kalenderexport per `.ics` fuer Erinnerungen.

## Gestaltung

Der visuelle Stil soll:

- warm,
- niedlich,
- verspielt,
- freundlich,
- einladend,
- aber trotzdem uebersichtlich und alltagstauglich sein.

Die App soll eher wie ein liebevoller Begleiter wirken als wie ein trockenes Rezeptarchiv. Farben, Illustrationen und Animationen sollen das Thema Sauerteig, Mehl, Waerme, Kueche und gemeinsames Backen aufnehmen.

## Hauptnavigation

Die App soll vier Hauptbereiche haben:

1. **Lernen**
2. **Rezepte**
3. **Starter & Pet**
4. **Backplaner**

Optional kann spaeter ein Bereich **Favoriten** oder **Merkliste** ergaenzt werden, falls die Rezeptliste stark waechst.

## Bereich: Lernen

Dieser Bereich erklaert Sauerteig ausfuehrlich und auf Deutsch. Die Inhalte sollen anfaengerfreundlich, aber nicht oberflaechlich sein.

Geplante Inhalte:

- Was ist Sauerteig?
- Unterschied zwischen Sauerteig, Hefe und Lievito Madre.
- Was passiert bei Fermentation?
- Welche Mehle eignen sich?
- Wasser, Temperatur und Zeit verstehen.
- Starter neu ansetzen.
- Starter richtig fuettern.
- Reife erkennen.
- Hooch erkennen und einordnen.
- Warum riecht mein Starter komisch?
- Warum geht mein Starter nicht auf?
- Kuehlschrankpflege.
- Auffrischen vor dem Backen.
- Typische Fehler bei Anfaengern.
- Grundbegriffe: Anstellgut, Levain, Autolyse, Stockgare, Stueckgare, Dehnen & Falten, Gare, Ofentrieb.

### Videos

Videos werden nicht direkt in der App abgespielt, sondern als Videokarten angezeigt:

- Vorschaubild sichtbar in der App.
- Titel und kurze Beschreibung.
- Klick oeffnet das Video extern, z. B. auf YouTube.

Die Videos sollen passend fuer Anfaenger sein. Spaeter werden konkrete Videoquellen ausgewaehlt und dokumentiert.

## Bereich: Rezepte

Der Rezeptbereich soll mindestens 10 klassische Brotrezepte und einige Alternativen enthalten.

### Rezeptfunktionen

Jedes Rezept soll enthalten:

- Titel.
- Bild.
- Kategorie.
- Schwierigkeit.
- Gesamtzeit.
- aktive Arbeitszeit.
- Zutaten.
- Schritt-fuer-Schritt-Anleitung.
- Hinweise fuer Anfaenger.
- optionaler Zeitplan fuer den Backplaner.
- Herz-Funktion fuer Favoriten.
- Markierung "Spaeter backen".

Favoriten und "Spaeter backen" werden lokal gespeichert.

### Schwierigkeitsgrade

Geplante Kategorien:

- Einfach
- Mittel
- Anspruchsvoll

Alternativ koennen die Rezepte auch mit 1 bis 3 Symbolen dargestellt werden, die intern denselben Schwierigkeitswert nutzen.

### Klassische Brote

Mindestens diese 10 Brote sollen in Version 1 enthalten sein:

1. Einfaches Sauerteig-Weizenbrot
2. Rustikales Bauernbrot
3. Roggenmischbrot
4. Reines Roggenbrot
5. Dinkel-Sauerteigbrot
6. Vollkorn-Sauerteigbrot
7. Landbrot
8. Baguette mit Sauerteig
9. Ciabatta mit Sauerteig
10. Kastenbrot fuer den Alltag

### Alternative Rezepte

Zusaetzlich sollen einige Alternativen enthalten sein:

- Sauerteig-Focaccia
- Sauerteig-Pizza
- Pancakes oder Waffeln mit Reststarter
- Sauerteig-Cracker
- Fladenbrot oder Naan mit Sauerteig

### Bilder

Bilder sollen direkt in der App angezeigt werden. Fuer den ersten MVP koennen passende frei nutzbare Webbilder eingebunden werden, z. B. ueber Unsplash oder Pexels. Die Bildquellen sollen spaeter sauber dokumentiert werden.

## Bereich: Starter & Pet

Es gibt einen gemeinsamen Sauerteig-Starter fuer beide Nutzer.

Der Starter bekommt einen Namen. Der Name wird lokal gespeichert und kann geaendert werden.

### Pet-Auswahl

Das Pet soll aus 5 super suessen Varianten auswaehlbar sein.

Moegliche Pet-Konzepte:

1. Sauerteigglas mit Gesicht
2. Kleiner Teigblob
3. Mini-Brotlaib
4. Blubbernder Starter im Weckglas
5. Flauschige Mehlwolke mit Teigbauch

Alle Varianten sollen animiert sein. Die Animationen koennen im MVP per CSS umgesetzt werden:

- Blubbern
- Atmen
- Schlafen
- Wackeln bei Hunger
- kleine Freudensanimation nach dem Fuettern

### Pet-Status

Das Pet soll eindeutig zeigen, was gerade los ist.

Geplante Status:

- **Schlaeft:** Starter ist im Kuehlschrankmodus oder weit vor der naechsten Fuetterung.
- **Aktiv:** Starter wurde kuerzlich gefuettert und arbeitet.
- **Hungrig:** Fuetterung steht bald an.
- **Ueberfaellig:** Fuetterung wurde verpasst.
- **Bereit zum Backen:** Starter ist im optimalen Zeitfenster nach dem Auffrischen.

Die App soll zusaetzlich in Textform anzeigen, was zu tun ist, z. B.:

- "Heute fuettern."
- "In 3 Stunden wieder nachsehen."
- "Perfekt zum Backen."
- "Dein Starter ist ueberfaellig."

### Starter-Modi

Die App soll zwei Grundmodi enthalten:

- **Neue Anzucht:** fuer die ersten Tage eines neuen Starters.
- **Bestehender Starter:** fuer wiederkehrende Pflege.

### Fuetterungsrhythmen

Der Rhythmus soll waehlbar sein:

- alle 12 Stunden
- taeglich
- woechentlich
- frei einstellbar

Die App speichert:

- letzte Fuetterung
- naechste Fuetterung
- gewaehlten Rhythmus
- Starter-Name
- Pet-Auswahl
- aktueller Pflege-Modus

### Kalendererinnerungen

Beim Export soll auswaehlbar sein:

- nur naechste Fuetterung
- naechste 7 Tage
- ganzer Monat

Der Export erzeugt `.ics`-Dateien, die am iPhone in den Kalender importiert werden koennen.

## Bereich: Backplaner

Der Backplaner soll zwei Varianten unterstuetzen.

### Variante 1: Fertig um

Der Nutzer gibt ein, wann das Brot fertig gebacken sein soll.

Die App rechnet rueckwaerts und erstellt einen Zeitplan.

Beispiel:

- Starter auffrischen
- Teig mischen
- Autolyse
- Salz einarbeiten
- Dehnen & Falten
- Stockgare
- Formen
- Stueckgare oder Kuehlschrankgare
- Ofen vorheizen
- Backen
- Auskuehlen

### Variante 2: Starten um

Der Nutzer gibt ein, wann er mit dem Rezept beginnen moechte.

Die App rechnet vorwaerts und zeigt, wann welcher Schritt ansteht und wann das Brot voraussichtlich fertig ist.

### Kalenderexport

Der Backplaner soll einen Kalenderexport fuer alle Backschritte erzeugen.

Jeder Kalendertermin soll enthalten:

- Titel des Schrittes
- Uhrzeit
- kurze Beschreibung
- optional Hinweis, was vorbereitet werden muss

## Datenmodell im MVP

Die App kann zunaechst lokal im Browser speichern:

- Starter-Name
- Pet-Auswahl
- letzter Fuetterungszeitpunkt
- Fuetterungsrhythmus
- Starter-Modus
- Favoriten
- "Spaeter backen"-Liste
- zuletzt genutzter Backplan
- Grundeinstellungen fuer Kalenderexporte

Eine Cloud-Synchronisierung ist im MVP nicht geplant. Da beide dieselbe PWA nutzen, aber jeweils auf eigenen iPhones, koennen lokale Daten voneinander abweichen. Fuer den Start ist das akzeptabel. Spaeter kann eine gemeinsame Cloud-Speicherung ergaenzt werden.

## Wichtige Einschraenkungen

- Eine reine PWA kann auf iPhones nicht so verlaesslich im Hintergrund erinnern wie eine native App.
- Der kostenlose MVP nutzt deshalb Kalenderexporte.
- Ohne Login oder Cloud gibt es keine echte Synchronisierung zwischen beiden iPhones.
- GitHub Pages hostet statische Dateien. Serverseitige Funktionen sind dort nicht vorgesehen.

## Spaetere Erweiterungen

Moegliche Erweiterungen nach dem MVP:

- Gemeinsame Cloud-Synchronisierung.
- Outlook- oder Google-Kalender-Integration per API.
- Echte Web-Push-Benachrichtigungen.
- Native iOS-App mit Expo oder React Native.
- Eigene Rezeptnotizen.
- Foto-Tagebuch fuer den Starter.
- Brot-Bewertungen.
- Hydration-Rechner.
- Rezeptskalierung nach Teiggewicht.
- Einkaufsliste.
- Mehrere Starter.
- Teilen von Backplaenen zwischen beiden Nutzern.

## MVP-Erfolgskriterien

Der erste MVP gilt als gelungen, wenn:

- die App auf dem iPhone als Home-Screen-PWA funktioniert,
- der Starter benannt und als Pet dargestellt werden kann,
- eines von 5 Pets ausgewaehlt werden kann,
- Fuetterungsstatus und naechste Aktion klar sichtbar sind,
- Kalenderexport fuer Fuetterungen funktioniert,
- mindestens 10 klassische Brotrezepte plus Alternativen enthalten sind,
- Rezepte favorisiert und fuer spaeter markiert werden koennen,
- der Backplaner vorwaerts und rueckwaerts rechnen kann,
- Backplaene als Kalendertermine exportiert werden koennen,
- Lerninhalte, Bilder und Video-Vorschauen direkt in der App sichtbar sind.

## Naechste Umsetzungsschritte

1. Informationsarchitektur und Screen-Aufbau finalisieren.
2. Bild- und Videoquellen auswaehlen.
3. Rezeptdaten strukturieren.
4. Pet-Designs definieren.
5. PWA-Grundgeruest erstellen.
6. Lokale Speicherung umsetzen.
7. ICS-Export fuer Fuetterungen bauen.
8. Backplaner mit ICS-Export bauen.
9. GitHub Pages Deployment vorbereiten.
10. iPhone-Test durchfuehren.
