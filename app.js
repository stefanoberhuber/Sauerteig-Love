const IMAGE = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const YT_THUMB = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const YT_URL = (id) => `https://www.youtube.com/watch?v=${id}`;

const PETS = [
  { id: "sourdough-crumb", name: "Brösel", label: "Weicher Teigfreund" },
  { id: "sourdough-rye", name: "Krusti", label: "Roggenlaib" },
  { id: "sourdough-starter", name: "Blubbi", label: "Starterkern" },
];

const STATUS_META = {
  active: {
    label: "Aktiv",
    color: "#8ac7a4",
    title: "Der Starter arbeitet.",
  },
  ready: {
    label: "Bereit zum Backen",
    color: "#5a8fb5",
    title: "Jetzt ist ein gutes Backfenster.",
  },
  hungry: {
    label: "Hungrig",
    color: "#f7b84b",
    title: "Bald wieder füttern.",
  },
  overdue: {
    label: "Überfällig",
    color: "#bc5268",
    title: "Zeit für eine Fütterung.",
  },
  sleeping: {
    label: "Schläft",
    color: "#9cc9c5",
    title: "Der Starter ruht gerade.",
  },
};

const GUIDE_SECTIONS = [
  {
    title: "Was Sauerteig eigentlich ist",
    summary:
      "Sauerteig ist eine lebendige Kultur aus Mehl, Wasser, wilden Hefen und Milchsäurebakterien. Er lockert Brot, bringt Aroma und macht den Teig bekömmlicher.",
    points: [
      "Hefen sorgen für Trieb und Volumen.",
      "Milchsäurebakterien geben Säure, Aroma und Haltbarkeit.",
      "Zeit und Temperatur sind genauso wichtig wie die Zutaten.",
    ],
  },
  {
    title: "Starter neu ansetzen",
    summary:
      "Für den Start reichen Mehl, Wasser, ein sauberes Glas und Geduld. Vollkorn- oder Roggenmehl bringt oft schneller Aktivität.",
    points: [
      "Tag 1: 50 g Mehl und 50 g Wasser mischen.",
      "Tag 2 bis 4: Täglich einen Teil behalten und frisch füttern.",
      "Ab Tag 5: Wenn er zuverlässig aufgeht, auf 12-Stunden-Fütterung wechseln.",
    ],
  },
  {
    title: "Richtig füttern",
    summary:
      "Eine einfache Standardfütterung ist 1 Teil Starter, 1 Teil Wasser, 1 Teil Mehl nach Gewicht. Ein stärkerer Starter darf auch höher gefüttert werden.",
    points: [
      "Sauberes Glas nutzen und den Rand abwischen.",
      "Mit einem Gummiband den Anfangsstand markieren.",
      "Bei Raumtemperatur reift der Starter deutlich schneller als im Kühlschrank.",
    ],
  },
  {
    title: "Reife erkennen",
    summary:
      "Ein reifer Starter ist sichtbar aufgegangen, voller Bläschen und riecht angenehm säuerlich bis fruchtig.",
    points: [
      "Verdoppelt er sich in 6 bis 8 Stunden, ist er backstark.",
      "Sinkt er wieder ein, war er schon am Peak und wird hungrig.",
      "Ein leichter Alkoholgeruch heißt meistens: füttern, nicht panisch werden.",
    ],
  },
  {
    title: "Kühlschrankpflege",
    summary:
      "Wenn ihr nicht täglich backt, darf der Starter im Kühlschrank schlafen. Dann reicht meist eine Fütterung pro Woche.",
    points: [
      "Nach dem Füttern 1 bis 2 Stunden anspringen lassen.",
      "Dann abgedeckt in den Kühlschrank stellen.",
      "Vor dem Backen ein- bis zweimal bei Raumtemperatur auffrischen.",
    ],
  },
  {
    title: "Typische Anfängerfehler",
    summary:
      "Die meisten Probleme entstehen durch zu wenig Zeit, ungenaue Mengen oder einen Starter, der noch nicht stark genug ist.",
    points: [
      "Gehzeiten sind Richtwerte, keine Stoppuhr-Gesetze.",
      "Teigtemperatur entscheidet über Tempo.",
      "Ein flacher Laib ist oft Untergare, Übergare oder fehlende Spannung.",
    ],
  },
];

const GLOSSARY = [
  ["Anstellgut", "Der kleine Teil eures Starters, den ihr aufbewahrt und weiterfüttert."],
  ["Levain", "Ein Vorteig aus Anstellgut, Mehl und Wasser, der gezielt fürs Rezept angesetzt wird."],
  ["Autolyse", "Mehl und Wasser ruhen, bevor Salz und Starter dazukommen. Das macht den Teig geschmeidiger."],
  ["Stockgare", "Die erste lange Teigruhe nach dem Mischen."],
  ["Stückgare", "Die letzte Gare nach dem Formen."],
  ["Dehnen & Falten", "Schonende Methode, um Glutenstruktur und Spannung aufzubauen."],
  ["Hooch", "Dunkle Flüssigkeit auf hungrigem Starter. Meist ein Zeichen, dass Futter fehlt."],
  ["Peak", "Der höchste Stand nach dem Füttern. Oft der beste Moment zum Backen."],
];

const VIDEOS = [
  {
    title: "The Ultimate Beginner Sourdough Bread Guide",
    source: "The Perfect Loaf",
    language: "Englisch",
    image: YT_THUMB("4a6HoqYejd0"),
    url: YT_URL("4a6HoqYejd0"),
    description: "Sehr klarer kompletter Ablauf vom Levain bis zum fertigen Brot.",
  },
  {
    title: "Your First Sourdough Bread",
    source: "Brian Lagerstrom",
    language: "Englisch",
    image: YT_THUMB("VEtU4Co08yY"),
    url: YT_URL("VEtU4Co08yY"),
    description: "Guter Einstieg, wenn man sehen möchte, wie ein Anfängerbrot praktisch abläuft.",
  },
  {
    title: "The Easiest Way to Make a Sourdough Starter",
    source: "Our Gabled Home",
    language: "Englisch",
    image: YT_THUMB("whGTP6YkRzg"),
    url: YT_URL("whGTP6YkRzg"),
    description: "Fokussiert auf die Starter-Anzucht und Pflege.",
  },
  {
    title: "How To Feed Sourdough Starter",
    source: "King Arthur Baking",
    language: "Englisch",
    image: IMAGE(6654104),
    url: "https://www.kingarthurbaking.com/videos/baking-skills/how-to-feed-sourdough-starter",
    description: "Kurze Technik-Erklärung zum Füttern eines Starters.",
  },
  {
    title: "Sauerteig Schritt für Schritt selber machen",
    source: "Thomas kocht",
    language: "Deutsch",
    image: IMAGE(31428934),
    url: "https://www.privatkoch-hamburg.de/sauerteig-selber-machen/",
    description: "Deutschsprachige Anleitung für Roggen- und Weizensauerteig.",
  },
];

const SCHEDULES = {
  overnight: {
    label: "Klassisch über Nacht",
    totalHours: 34,
    steps: [
      ["Starter auffrischen", 0, 15, "Anstellgut mit Mehl und Wasser füttern, damit es backstark wird."],
      ["Levain ansetzen", 10, 15, "Ein Teil des aktiven Starters wird zum Vorteig für das Rezept."],
      ["Teig mischen", 16, 20, "Mehl, Wasser, Levain und später Salz zusammenführen."],
      ["Dehnen & Falten 1", 17, 10, "Teig vorsichtig dehnen und über sich selbst falten."],
      ["Dehnen & Falten 2", 17.5, 10, "Zweite Runde für mehr Struktur."],
      ["Stockgare prüfen", 21, 10, "Der Teig sollte luftiger wirken und sichtbar Volumen haben."],
      ["Formen", 22, 20, "Teigling straff formen und ins Gärkörbchen legen."],
      ["Kühlschrankgare", 22.5, 10, "Abgedeckt kalt stellen. Die lange Gare bringt Aroma."],
      ["Ofen vorheizen", 33, 30, "Topf, Stein oder Stahl kräftig vorheizen."],
      ["Backen", 33.5, 45, "Mit Dampf oder im Topf backen, dann ausdampfen lassen."],
    ],
  },
  sameDay: {
    label: "Gleicher Tag",
    totalHours: 14,
    steps: [
      ["Starter auffrischen", 0, 15, "Morgens füttern und warm stellen."],
      ["Teig mischen", 5, 20, "Starter auf Peak nutzen und Hauptteig mischen."],
      ["Dehnen & Falten 1", 5.75, 10, "Erste Struktur-Runde."],
      ["Dehnen & Falten 2", 6.25, 10, "Zweite Struktur-Runde."],
      ["Stockgare", 6.5, 240, "Teig warm reifen lassen und Volumen beobachten."],
      ["Formen", 10.75, 20, "Rund oder länglich formen."],
      ["Stückgare", 11.5, 90, "Bis der Teig federnd reagiert."],
      ["Ofen vorheizen", 12.75, 30, "Topf oder Blech vorheizen."],
      ["Backen", 13.25, 45, "Kräftig backen, danach auskühlen lassen."],
    ],
  },
  rye: {
    label: "Roggen ruhig geführt",
    totalHours: 22,
    steps: [
      ["Sauerteig ansetzen", 0, 15, "Roggenanstellgut mit Roggenmehl und Wasser mischen."],
      ["Quellstück vorbereiten", 0.25, 15, "Saaten oder Schrot mit Wasser quellen lassen."],
      ["Hauptteig mischen", 14, 20, "Roggenteig nur gründlich mischen, nicht stark kneten."],
      ["Teigruhe", 14.5, 60, "Abgedeckt ruhen lassen."],
      ["In die Form geben", 15.5, 15, "Oberfläche glatt streichen und bemehlen."],
      ["Stückgare", 15.75, 180, "Warten, bis kleine Risse sichtbar werden."],
      ["Ofen vorheizen", 20.25, 30, "Heiß starten, später Temperatur reduzieren."],
      ["Backen", 20.75, 75, "Länger ausbacken und vollständig auskühlen lassen."],
    ],
  },
  pizza: {
    label: "Pizza mit langer Gare",
    totalHours: 28,
    steps: [
      ["Starter auffrischen", 0, 15, "Starter für den Teig aktivieren."],
      ["Pizzateig mischen", 8, 20, "Mehl, Wasser, Starter, Salz und Öl mischen."],
      ["Dehnen & Falten", 9, 10, "Eine Runde reicht meistens."],
      ["Kühlschrankgare", 10, 10, "Teig abgedeckt kalt reifen lassen."],
      ["Teig akklimatisieren", 25, 60, "Vor dem Backen auf Raumtemperatur kommen lassen."],
      ["Ofen sehr heiß vorheizen", 26.5, 45, "Stein oder Stahl maximal heiß vorheizen."],
      ["Pizza backen", 27.5, 12, "Kurz und heiß backen."],
    ],
  },
  focaccia: {
    label: "Focaccia locker",
    totalHours: 24,
    steps: [
      ["Starter auffrischen", 0, 15, "Starter aktivieren."],
      ["Teig mischen", 8, 20, "Weichen Teig mischen und abdecken."],
      ["Falten", 9, 10, "Mit nassen Händen falten."],
      ["Kühlschrankgare", 10, 10, "Langsam Aroma entwickeln lassen."],
      ["In die Form geben", 21, 15, "Mit Olivenöl in die Form legen."],
      ["Dellen und belegen", 23, 15, "Mit Fingern eindrücken und belegen."],
      ["Backen", 23.5, 25, "Goldbraun backen."],
    ],
  },
  discard: {
    label: "Reststarter schnell",
    totalHours: 3,
    steps: [
      ["Teig anrühren", 0, 15, "Reststarter mit den übrigen Zutaten mischen."],
      ["Ruhen lassen", 0.5, 45, "Kurz entspannen lassen."],
      ["Formen oder portionieren", 1.5, 15, "In Pfanne, Ofen oder Blech vorbereiten."],
      ["Backen oder ausbacken", 2, 40, "Fertig backen und warm genießen."],
    ],
  },
};

const RECIPES = [
  {
    id: "weizenbrot",
    title: "Einfaches Sauerteig-Weizenbrot",
    category: "klassiker",
    difficulty: "Einfach",
    time: "ca. 34 Std.",
    active: "50 Min.",
    image: IMAGE(36370202),
    credit: "Pexels / Alex Agnoluzzi",
    profile: "overnight",
    summary: "Ein mildes Einstiegsbrot mit heller Krume und knuspriger Kruste.",
    ingredients: ["450 g Weizenmehl 550", "50 g Vollkornmehl", "350 g Wasser", "100 g aktiver Starter", "10 g Salz"],
    steps: [
      "Mehl und 320 g Wasser mischen und 45 Minuten ruhen lassen.",
      "Starter, Salz und restliches Wasser einarbeiten.",
      "3 Runden dehnen und falten, dann bis zu 50 Prozent Volumenzuwachs gehen lassen.",
      "Formen, über Nacht kalt stellen und heiß im Topf backen.",
    ],
    tip: "Für den ersten Versuch lieber etwas weniger Wasser nehmen. Ein handhabbarer Teig ist mehr wert als eine hohe Hydration.",
  },
  {
    id: "bauernbrot",
    title: "Rustikales Bauernbrot",
    category: "klassiker",
    difficulty: "Mittel",
    time: "ca. 34 Std.",
    active: "60 Min.",
    image: IMAGE(36202913),
    credit: "Pexels / Ece Ebrar Toycu",
    profile: "overnight",
    summary: "Herzhaftes Mischbrot mit kräftiger Kruste und alltagstauglicher Führung.",
    ingredients: ["320 g Weizenmehl", "180 g Roggenmehl", "360 g Wasser", "120 g Starter", "11 g Salz", "1 TL Brotgewürz"],
    steps: [
      "Mehle, Wasser und Starter mischen.",
      "Nach 30 Minuten Salz und Gewürz einarbeiten.",
      "Während der Stockgare zweimal falten.",
      "Rund formen, kalt führen und kräftig ausbacken.",
    ],
    tip: "Roggen macht den Teig klebriger. Mit nassen Händen arbeiten statt immer mehr Mehl zuzugeben.",
  },
  {
    id: "roggenmischbrot",
    title: "Roggenmischbrot",
    category: "klassiker",
    difficulty: "Mittel",
    time: "ca. 22 Std.",
    active: "45 Min.",
    image: IMAGE(31428934),
    credit: "Pexels / Frank Schrader",
    profile: "rye",
    summary: "Ein saftiges Brot mit Roggenaroma, gut für Käse, Aufstriche und Jausen.",
    ingredients: ["280 g Roggenmehl", "220 g Weizenmehl", "380 g Wasser", "150 g Roggensauer", "12 g Salz"],
    steps: [
      "Roggensauer über Nacht reifen lassen.",
      "Alle Zutaten gründlich mischen.",
      "Teigruhe geben und in eine bemehlte Form setzen.",
      "Nach sichtbaren Rissen heiß anbacken und lange ausbacken.",
    ],
    tip: "Roggenbrote brauchen nach dem Backen Ruhe. Am besten erst am nächsten Tag anschneiden.",
  },
  {
    id: "reines-roggenbrot",
    title: "Reines Roggenbrot",
    category: "klassiker",
    difficulty: "Anspruchsvoll",
    time: "ca. 22 Std.",
    active: "40 Min.",
    image: IMAGE(4881596),
    credit: "Pexels / Jytte Elfferich",
    profile: "rye",
    summary: "Dicht, aromatisch und lange frisch. Kein Knetbrot, sondern ein ruhiger Roggenklassiker.",
    ingredients: ["500 g Roggenmehl", "430 g Wasser", "200 g aktiver Roggensauer", "12 g Salz", "optional Saaten"],
    steps: [
      "Sauerteig reif werden lassen.",
      "Zutaten zu einem klebrigen Teig mischen.",
      "In eine Form streichen und glattziehen.",
      "Bis zu kleinen Oberflächenrissen gehen lassen und ausbacken.",
    ],
    tip: "Nicht wie Weizenteig behandeln. Roggen will gemischt, nicht elastisch geknetet werden.",
  },
  {
    id: "dinkelbrot",
    title: "Dinkel-Sauerteigbrot",
    category: "klassiker",
    difficulty: "Einfach",
    time: "ca. 14 Std.",
    active: "45 Min.",
    image: IMAGE(10075983),
    credit: "Pexels / Noemí Jiménez",
    profile: "sameDay",
    summary: "Mild und nussig. Dinkel ist zart und wird mit vorsichtiger Bearbeitung besonders schön.",
    ingredients: ["500 g Dinkelmehl 630", "330 g Wasser", "90 g Starter", "10 g Salz", "15 g Honig"],
    steps: [
      "Teig nur kurz mischen und ruhen lassen.",
      "Zwei sanfte Falt-Runden geben.",
      "Nicht überkneten, Dinkel wird sonst schnell weich.",
      "Formen und goldbraun backen.",
    ],
    tip: "Ein kleines Brühstück aus Dinkelmehl und Wasser macht das Brot saftiger.",
  },
  {
    id: "vollkornbrot",
    title: "Vollkorn-Sauerteigbrot",
    category: "klassiker",
    difficulty: "Mittel",
    time: "ca. 34 Std.",
    active: "55 Min.",
    image: IMAGE(36930991),
    credit: "Pexels / Kerim Eveyik",
    profile: "overnight",
    summary: "Kräftiger Geschmack, mehr Wasserbindung und ein sehr sättigendes Brot.",
    ingredients: ["400 g Weizenvollkorn", "100 g Roggenvollkorn", "410 g Wasser", "120 g Starter", "12 g Salz"],
    steps: [
      "Vollkornmehl mit Wasser länger quellen lassen.",
      "Starter und Salz einarbeiten.",
      "Während der Stockgare falten und Volumen beobachten.",
      "Kalt gehen lassen und gründlich backen.",
    ],
    tip: "Vollkorn braucht mehr Wasser und mehr Quellzeit. Nicht zu früh nachschütten, erst ruhen lassen.",
  },
  {
    id: "landbrot",
    title: "Landbrot",
    category: "klassiker",
    difficulty: "Mittel",
    time: "ca. 34 Std.",
    active: "60 Min.",
    image: IMAGE(32935771),
    credit: "Pexels / Alejandro Esquivel",
    profile: "overnight",
    summary: "Ein aromatischer Allrounder mit Weizen, Roggen und langer kalter Gare.",
    ingredients: ["380 g Weizenmehl", "120 g Roggenmehl", "360 g Wasser", "110 g Starter", "11 g Salz"],
    steps: [
      "Teig mischen und 30 Minuten ruhen lassen.",
      "Drei Falt-Runden einplanen.",
      "Bei 40 bis 60 Prozent Volumenzuwachs formen.",
      "Über Nacht kalt stellen und heiß backen.",
    ],
    tip: "Das Brot eignet sich gut zum Lernen, weil es kleine Fehler recht freundlich verzeiht.",
  },
  {
    id: "baguette",
    title: "Baguette mit Sauerteig",
    category: "klassiker",
    difficulty: "Anspruchsvoll",
    time: "ca. 34 Std.",
    active: "75 Min.",
    image: IMAGE(1079020),
    credit: "Pexels / Marcel Fiedler",
    profile: "overnight",
    summary: "Luftig, knusprig und etwas anspruchsvoller beim Formen.",
    ingredients: ["500 g Weizenmehl", "370 g Wasser", "100 g Starter", "10 g Salz"],
    steps: [
      "Weichen Teig mischen und schonend falten.",
      "Lange Stockgare mit guter Beobachtung führen.",
      "Vorsichtig vorformen und entspannen lassen.",
      "Zu Baguettes rollen, einschneiden und mit Dampf backen.",
    ],
    tip: "Beim Formen weniger drücken. Die Luft im Teig ist eure Freundin.",
  },
  {
    id: "ciabatta",
    title: "Ciabatta mit Sauerteig",
    category: "klassiker",
    difficulty: "Anspruchsvoll",
    time: "ca. 34 Std.",
    active: "55 Min.",
    image: IMAGE(31546232),
    credit: "Pexels",
    profile: "overnight",
    summary: "Sehr weicher Teig, große Poren und viel Aroma.",
    ingredients: ["500 g Weizenmehl", "400 g Wasser", "100 g Starter", "11 g Salz", "20 g Olivenöl"],
    steps: [
      "Teig mit hoher Hydration mischen.",
      "Mehrere Coil-Folds oder sanfte Faltungen geben.",
      "Reifen lassen, bis der Teig luftig und wackelig ist.",
      "Abstechen statt stark formen und heiß backen.",
    ],
    tip: "Sehr nasse Hände und eine Teigkarte machen Ciabatta deutlich entspannter.",
  },
  {
    id: "kastenbrot",
    title: "Kastenbrot für den Alltag",
    category: "klassiker",
    difficulty: "Einfach",
    time: "ca. 14 Std.",
    active: "35 Min.",
    image: IMAGE(6654104),
    credit: "Pexels / Arina Krasnikova",
    profile: "sameDay",
    summary: "Ein unkompliziertes Brot aus der Form. Ideal für Toast, Frühstück und Sandwiches.",
    ingredients: ["450 g Weizen- oder Dinkelmehl", "320 g Wasser", "100 g Starter", "10 g Salz", "15 g Öl"],
    steps: [
      "Alle Zutaten mischen und kurz ruhen lassen.",
      "Ein bis zwei Faltungen geben.",
      "In die gefettete Form legen und bis knapp unter den Rand gehen lassen.",
      "Backen, aus der Form nehmen und kurz nachbacken.",
    ],
    tip: "Die Form nimmt Druck raus. Perfekt, wenn ihr erst ein Gefühl für Gare entwickeln wollt.",
  },
  {
    id: "focaccia",
    title: "Sauerteig-Focaccia",
    category: "alternative",
    difficulty: "Einfach",
    time: "ca. 24 Std.",
    active: "40 Min.",
    image: IMAGE(13673954),
    credit: "Pexels / Büşra Yaman",
    profile: "focaccia",
    summary: "Weich, ölig, aromatisch und sehr dankbar für Anfänger.",
    ingredients: ["500 g Weizenmehl", "410 g Wasser", "100 g Starter", "11 g Salz", "35 g Olivenöl", "Rosmarin"],
    steps: [
      "Weichen Teig mischen und mit Olivenöl abdecken.",
      "Ein bis zwei Faltungen geben.",
      "Lang kalt reifen lassen.",
      "In der Form eindrücken, belegen und goldbraun backen.",
    ],
    tip: "Focaccia darf wild und lebendig aussehen. Das macht sie charmant.",
  },
  {
    id: "pizza",
    title: "Sauerteig-Pizza",
    category: "alternative",
    difficulty: "Mittel",
    time: "ca. 28 Std.",
    active: "45 Min.",
    image: IMAGE(5953519),
    credit: "Pexels / Anna Shvets",
    profile: "pizza",
    summary: "Knuspriger Rand, lange Gare und viel Aroma.",
    ingredients: ["500 g Pizzamehl", "330 g Wasser", "90 g Starter", "12 g Salz", "15 g Olivenöl"],
    steps: [
      "Teig mischen und kurz ruhen lassen.",
      "Einmal falten und kalt reifen lassen.",
      "Vor dem Backen Raumtemperatur annehmen lassen.",
      "Sehr heiß und kurz backen.",
    ],
    tip: "Je heißer der Ofen, desto besser der Rand. Backstahl oder Stein hilft sehr.",
  },
  {
    id: "pancakes",
    title: "Pancakes mit Reststarter",
    category: "alternative",
    difficulty: "Einfach",
    time: "ca. 3 Std.",
    active: "25 Min.",
    image: IMAGE(6632444),
    credit: "Pexels / Alesia Kozik",
    profile: "discard",
    summary: "Eine süße Reststarter-Idee für Frühstück und Sonntage.",
    ingredients: ["150 g Reststarter", "120 g Mehl", "160 g Milch", "1 Ei", "20 g Zucker", "1 TL Backpulver", "Prise Salz"],
    steps: [
      "Alle Zutaten zu einem dicken Teig verrühren.",
      "10 Minuten ruhen lassen.",
      "Kleine Pancakes in wenig Butter ausbacken.",
      "Warm mit Ahornsirup oder Obst servieren.",
    ],
    tip: "Auch super mit Banane im Teig oder Blaubeeren direkt in der Pfanne.",
  },
  {
    id: "waffeln",
    title: "Waffeln mit Reststarter",
    category: "alternative",
    difficulty: "Einfach",
    time: "ca. 3 Std.",
    active: "20 Min.",
    image: IMAGE(3776947),
    credit: "Pexels / Daria Shevtsova",
    profile: "discard",
    summary: "Außen goldig, innen weich, mit leichter Sauerteignote.",
    ingredients: ["150 g Reststarter", "140 g Mehl", "180 g Milch", "2 Eier", "40 g Butter", "25 g Zucker"],
    steps: [
      "Zutaten glattrühren.",
      "Waffeleisen gut vorheizen.",
      "Portionen goldbraun backen.",
      "Mit Puderzucker oder Kompott servieren.",
    ],
    tip: "Der Reststarter darf direkt aus dem Kühlschrank kommen.",
  },
  {
    id: "cracker",
    title: "Reststarter-Cracker",
    category: "alternative",
    difficulty: "Einfach",
    time: "ca. 3 Std.",
    active: "20 Min.",
    image: IMAGE(1872904),
    credit: "Pexels / Mariana Kurnyk",
    profile: "discard",
    summary: "Knusprige kleine Cracker für Dips, Jause und Käseplatte.",
    ingredients: ["180 g Reststarter", "60 g Mehl", "35 g Olivenöl", "1 TL Salz", "Saaten oder Kräuter"],
    steps: [
      "Alles zu einem streichfähigen Teig verrühren.",
      "Dünn auf Backpapier verstreichen.",
      "Mit Saaten bestreuen, vorschneiden und knusprig backen.",
      "Komplett auskühlen lassen.",
    ],
    tip: "Je dünner der Teig verteilt ist, desto knuspriger wird das Ergebnis.",
  },
  {
    id: "fladenbrot",
    title: "Pfannen-Fladenbrot mit Reststarter",
    category: "alternative",
    difficulty: "Einfach",
    time: "ca. 3 Std.",
    active: "25 Min.",
    image: IMAGE(2367817),
    credit: "Pexels / Eneida Nieves",
    profile: "discard",
    summary: "Schnelles Fladenbrot für Suppen, Dips oder als Beilage zum Abendessen.",
    ingredients: ["160 g Reststarter", "180 g Mehl", "100 g Joghurt", "1 TL Salz", "1 EL Öl"],
    steps: [
      "Zu einem weichen Teig mischen und kurz ruhen lassen.",
      "In Portionen teilen und flach ausrollen.",
      "In heißer Pfanne mit wenig Öl ausbacken.",
      "Warm stapeln und weich halten.",
    ],
    tip: "Mit Knoblauchbutter und Kräutern werden sie besonders gut.",
  },
];

const CARE_TIMELINE = [
  ["Tag 1", "50 g Mehl und 50 g Wasser mischen, locker abdecken und warm stehen lassen."],
  ["Tag 2", "Etwa die Hälfte verwerfen und wieder mit Mehl und Wasser füttern."],
  ["Tag 3", "Bläschen beobachten, Geruch prüfen, bei Bedarf zweimal füttern."],
  ["Tag 4", "Jetzt sollte mehr Leben sichtbar sein. Rhythmus beibehalten."],
  ["Tag 5", "Wenn der Starter deutlich aufgeht, auf kräftigere Fütterungen wechseln."],
  ["Danach", "Einen klaren Pflege-Rhythmus wählen: Raumtemperatur oder Kühlschrank."],
];

const STORE_KEY = "sauerteig-love-state-v1";
let deferredInstallPrompt = null;
let currentPlanEvents = [];

const DEFAULT_STATE = {
  starterName: "Blubber",
  starterNameSaved: false,
  petId: "sourdough-crumb",
  starterMode: "new",
  feedInterval: "12",
  customFeedHours: 24,
  lastFed: new Date().toISOString(),
  favorites: [],
  later: [],
  lastPlan: null,
};

const state = loadState();

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function loadState() {
  try {
    const loaded = { ...DEFAULT_STATE, ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}") };
    if (!PETS.some((pet) => pet.id === loaded.petId)) {
      loaded.petId = DEFAULT_STATE.petId;
    }
    return loaded;
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function toLocalInput(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function fromLocalInput(value) {
  return value ? new Date(value) : new Date();
}

function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("de-AT", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatShortTime(date) {
  return new Intl.DateTimeFormat("de-AT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function hoursLabel(hours) {
  const rounded = Math.max(0, Math.round(hours * 10) / 10);
  if (rounded < 1) return `${Math.round(rounded * 60)} Min.`;
  if (rounded < 48) return `${rounded.toString().replace(".", ",")} Std.`;
  return `${Math.round(rounded / 24)} Tage`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getFeedHours() {
  if (state.feedInterval === "custom") {
    return Math.max(1, Number(state.customFeedHours) || 24);
  }
  return Number(state.feedInterval) || 24;
}

function getFeedingInfo() {
  const now = new Date();
  const lastFed = new Date(state.lastFed || now);
  const interval = getFeedHours();
  const nextFed = addHours(lastFed, interval);
  const elapsed = (now - lastFed) / 36e5;
  const remaining = (nextFed - now) / 36e5;
  const progress = Math.min(1, Math.max(0, elapsed / interval));
  let key = "active";

  if (remaining < 0) {
    key = "overdue";
  } else if (interval >= 120 && remaining > 48) {
    key = "sleeping";
  } else if (interval <= 48 && elapsed >= 4 && elapsed <= 8) {
    key = "ready";
  } else if (remaining <= Math.max(2, interval * 0.2)) {
    key = "hungry";
  }

  return { now, lastFed, interval, nextFed, elapsed, remaining, progress, key };
}

function petMessage(info) {
  const name = state.starterName || "Euer Starter";
  if (info.key === "overdue") {
    return `${name} ist überfällig und möchte gefüttert werden. Danach wird die nächste Erinnerung neu berechnet.`;
  }
  if (info.key === "hungry") {
    return `${name} wird hungrig. Bereitet Mehl, Wasser und ein sauberes Glas vor.`;
  }
  if (info.key === "ready") {
    return `${name} ist im starken Fenster: schön blubbrig, aktiv und bereit für ein Rezept.`;
  }
  if (info.key === "sleeping") {
    return `${name} ruht im Langzeitmodus. Nicht stören, nur rechtzeitig wieder auffrischen.`;
  }
  return `${name} arbeitet gerade gemütlich vor sich hin. Behaltet den Stand im Glas im Blick.`;
}

function renderPet() {
  const info = getFeedingInfo();
  const status = STATUS_META[info.key];
  const stage = $("#petStage");
  stage.innerHTML = "";

  $("#starterNameTitle").textContent = state.starterName || "Blubber";
  $("#starterEditor").classList.toggle("is-saved", Boolean(state.starterNameSaved));
  $("#statusDot").style.background = status.color;
  $("#petStatusLabel").textContent = status.label;
  $("#petMessage").textContent = petMessage(info);
  $("#nextFeedingText").textContent =
    info.remaining < 0
      ? `Fütterung verpasst seit ${hoursLabel(Math.abs(info.remaining))}`
      : `Nächste Fütterung: ${formatDateTime(info.nextFed)} · in ${hoursLabel(info.remaining)}`;
  $("#careTitle").textContent = status.title;
  $("#careText").textContent = petMessage(info);
  $("#careMeterFill").style.height = `${Math.max(10, Math.round(info.progress * 100))}%`;
}

function renderGuides() {
  $("#guideGrid").innerHTML = GUIDE_SECTIONS.map(
    (guide) => `
      <article class="guide-card">
        <h3>${escapeHtml(guide.title)}</h3>
        <p>${escapeHtml(guide.summary)}</p>
        <ul>
          ${guide.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
        </ul>
      </article>
    `,
  ).join("");

  $("#videoGrid").innerHTML = VIDEOS.map(
    (video) => `
      <a class="video-card" href="${video.url}" target="_blank" rel="noreferrer">
        <div class="video-thumb">
          <img src="${video.image}" alt="${escapeHtml(video.title)}" loading="lazy" />
          <span class="play-badge">▶</span>
        </div>
        <div class="video-body">
          <div class="badge-row">
            <span class="badge berry">${escapeHtml(video.language)}</span>
            <span class="badge blue">${escapeHtml(video.source)}</span>
          </div>
          <h3>${escapeHtml(video.title)}</h3>
          <p>${escapeHtml(video.description)}</p>
        </div>
      </a>
    `,
  ).join("");

  $("#glossaryGrid").innerHTML = GLOSSARY.map(
    ([term, definition]) => `
      <article class="glossary-card">
        <h3>${escapeHtml(term)}</h3>
        <p>${escapeHtml(definition)}</p>
      </article>
    `,
  ).join("");
}

function recipeMatchesFilters(recipe) {
  const search = $("#recipeSearch").value.trim().toLowerCase();
  const category = $("#categoryFilter").value;
  const difficulty = $("#difficultyFilter").value;
  const text = `${recipe.title} ${recipe.summary} ${recipe.ingredients.join(" ")}`.toLowerCase();

  if (search && !text.includes(search)) return false;
  if (difficulty !== "alle" && recipe.difficulty !== difficulty) return false;
  if (category === "favoriten" && !state.favorites.includes(recipe.id)) return false;
  if (category === "spaeter" && !state.later.includes(recipe.id)) return false;
  if (category !== "alle" && category !== "favoriten" && category !== "spaeter" && recipe.category !== category) return false;
  return true;
}

function renderRecipes() {
  const recipes = RECIPES.filter(recipeMatchesFilters);
  $("#recipeCount").textContent = `${recipes.length} Rezepte`;
  $("#recipeGrid").innerHTML = recipes
    .map((recipe) => {
      const favorite = state.favorites.includes(recipe.id);
      const later = state.later.includes(recipe.id);
      return `
        <article class="recipe-card">
          <div class="recipe-image">
            <img src="${recipe.image}" alt="${escapeHtml(recipe.title)}" loading="lazy" />
            <div class="image-actions" aria-label="Rezeptaktionen">
              <button class="image-action ${favorite ? "active" : ""}" data-action="favorite" data-id="${recipe.id}" aria-label="Als Herz-Rezept markieren">
                ♥
              </button>
              <button class="image-action ${later ? "active" : ""}" data-action="later" data-id="${recipe.id}" aria-label="Für später speichern">
                ◷
              </button>
            </div>
          </div>
          <div class="recipe-body">
            <div class="badge-row">
              <span class="badge ${recipe.category === "alternative" ? "mint" : "blue"}">
                ${recipe.category === "alternative" ? "Alternative" : "Klassiker"}
              </span>
              <span class="badge berry">${escapeHtml(recipe.difficulty)}</span>
            </div>
            <h3>${escapeHtml(recipe.title)}</h3>
            <p>${escapeHtml(recipe.summary)}</p>
            <div class="meta-row">
              <span class="badge">${escapeHtml(recipe.time)}</span>
              <span class="badge">${escapeHtml(recipe.active)} aktiv</span>
            </div>
            <div class="recipe-actions">
              <button class="card-button" data-action="detail" data-id="${recipe.id}">
                Details
              </button>
              <button class="card-button plan-card-button" data-action="plan" data-id="${recipe.id}">
                Planen
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderStarterControls() {
  $("#starterName").value = state.starterName;
  $("#starterNameTitle").textContent = state.starterName || "Blubber";
  $("#starterEditor").classList.toggle("is-saved", Boolean(state.starterNameSaved));
  $("#starterMode").value = state.starterMode;
  $("#feedInterval").value = state.feedInterval;
  $("#customFeedHours").value = state.customFeedHours;
  $("#customFeedWrap").hidden = state.feedInterval !== "custom";
  $("#lastFed").value = toLocalInput(new Date(state.lastFed));

  $("#petPicker").innerHTML = PETS.map(
    (pet) => `
      <button class="pet-choice ${state.petId === pet.id ? "active" : ""}" data-pet="${pet.id}">
        <span class="pet-mini ${pet.id}" aria-hidden="true"></span>
        <span>${escapeHtml(pet.name)}</span>
        <small>${escapeHtml(pet.label)}</small>
      </button>
    `,
  ).join("");

  $("#careTimeline").innerHTML = CARE_TIMELINE.map(
    ([day, text]) => `
      <div class="timeline-item">
        <span class="timeline-day">${escapeHtml(day)}</span>
        <p>${escapeHtml(text)}</p>
      </div>
    `,
  ).join("");
}

function renderPlannerOptions() {
  $("#plannerRecipe").innerHTML = RECIPES.map(
    (recipe) => `<option value="${recipe.id}">${escapeHtml(recipe.title)}</option>`,
  ).join("");
  $("#plannerDate").value = toLocalInput(addHours(new Date(), 34));
}

function toggleInArray(array, value) {
  const index = array.indexOf(value);
  if (index >= 0) {
    array.splice(index, 1);
    return false;
  }
  array.push(value);
  return true;
}

function openRecipeDetail(recipeId) {
  const recipe = RECIPES.find((item) => item.id === recipeId);
  if (!recipe) return;
  const profile = SCHEDULES[recipe.profile];
  $("#recipeDetail").innerHTML = `
    <article class="recipe-detail">
      <img src="${recipe.image}" alt="${escapeHtml(recipe.title)}" />
      <div class="badge-row">
        <span class="badge ${recipe.category === "alternative" ? "mint" : "blue"}">${recipe.category === "alternative" ? "Alternative" : "Klassiker"}</span>
        <span class="badge berry">${escapeHtml(recipe.difficulty)}</span>
        <span class="badge">${escapeHtml(profile.label)}</span>
      </div>
      <h2>${escapeHtml(recipe.title)}</h2>
      <p>${escapeHtml(recipe.summary)}</p>
      <div class="detail-columns">
        <div>
          <h3>Zutaten</h3>
          <ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Ablauf</h3>
          <ol>${recipe.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
        </div>
      </div>
      <h3>Anfängerhinweis</h3>
      <p>${escapeHtml(recipe.tip)}</p>
      <button class="primary-button detail-plan-button" data-detail-plan="${recipe.id}">Mit diesem Rezept planen</button>
      <p><small>Bild: ${escapeHtml(recipe.credit)}</small></p>
    </article>
  `;

  const dialog = $("#recipeDialog");
  if (dialog.showModal) {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function markFedNow() {
  state.lastFed = new Date().toISOString();
  saveState();
  renderStarterControls();
  renderPet();
  toast(`${state.starterName} wurde als gefüttert gespeichert.`);
}

function goToPlanner(recipeId) {
  const recipe = RECIPES.find((item) => item.id === recipeId);
  if (!recipe) return;
  const dialog = $("#recipeDialog");
  if (dialog.open && dialog.close) dialog.close();
  else dialog.removeAttribute("open");
  $("#plannerRecipe").value = recipe.id;
  $$(".tab").find((tab) => tab.dataset.section === "planer").click();
  $("#plannerDate").focus();
  toast(`${recipe.title} ist im Planer ausgewählt.`);
}

function createFeedingEvents() {
  const range = $("#feedingExportRange").value;
  const info = getFeedingInfo();
  const events = [];
  const endDate =
    range === "next" ? addHours(info.nextFed, 1) : range === "week" ? addHours(info.now, 24 * 7) : addHours(info.now, 24 * 31);
  let current = new Date(info.nextFed);

  while (current <= endDate && events.length < 80) {
    events.push({
      title: `${state.starterName || "Sauerteig"} füttern`,
      start: new Date(current),
      end: addHours(current, 0.25),
      description:
        "Sauerteig füttern: Einen Teil Starter behalten und nach Gewicht mit Wasser und Mehl auffrischen. Danach Anfangsstand markieren.",
    });
    if (range === "next") break;
    current = addHours(current, info.interval);
  }

  return events;
}

function calculatePlan() {
  const recipe = RECIPES.find((item) => item.id === $("#plannerRecipe").value) || RECIPES[0];
  const profile = SCHEDULES[recipe.profile];
  const direction = document.querySelector("input[name='planDirection']:checked").value;
  const selected = fromLocalInput($("#plannerDate").value);
  const startTime = direction === "finish" ? addHours(selected, -profile.totalHours) : selected;
  const finishTime = addHours(startTime, profile.totalHours);

  currentPlanEvents = profile.steps.map(([title, offset, minutes, description]) => {
    const start = addHours(startTime, offset);
    return {
      title,
      start,
      end: new Date(start.getTime() + Math.max(15, minutes) * 60000),
      description: `${recipe.title}: ${description}`,
    };
  });

  state.lastPlan = {
    recipeId: recipe.id,
    direction,
    selected: selected.toISOString(),
  };
  saveState();

  $("#planSummary").innerHTML = `
    <p class="eyebrow">${escapeHtml(profile.label)}</p>
    <h3>${escapeHtml(recipe.title)}</h3>
    <p>Start: <strong>${formatDateTime(startTime)}</strong><br />Fertig: <strong>${formatDateTime(finishTime)}</strong></p>
    <p>${direction === "finish" ? "Rückwärts vom gewünschten Fertig-Zeitpunkt gerechnet." : "Vorwärts ab eurem Start-Zeitpunkt gerechnet."}</p>
  `;

  $("#planList").innerHTML = currentPlanEvents
    .map(
      (event) => `
        <article class="plan-item">
          <div class="plan-time">
            <span>${formatShortTime(event.start)}</span>
          </div>
          <div>
            <p class="eyebrow">${formatDateTime(event.start)}</p>
            <h3>${escapeHtml(event.title)}</h3>
            <p>${escapeHtml(event.description)}</p>
          </div>
        </article>
      `,
    )
    .join("");

  $("#exportPlanIcs").disabled = false;
  toast("Backplan berechnet.");
}

function icsDate(date) {
  return date
    .toISOString()
    .replaceAll("-", "")
    .replaceAll(":", "")
    .replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function makeUid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function buildIcs(events, calendarName) {
  const now = icsDate(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sauerteig Love//PWA//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcs(calendarName)}`,
  ];

  events.forEach((event) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${makeUid()}@sauerteig-love`,
      `DTSTAMP:${now}`,
      `DTSTART:${icsDate(event.start)}`,
      `DTEND:${icsDate(event.end)}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `DESCRIPTION:${escapeIcs(event.description)}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT20M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeIcs(event.title)}`,
      "END:VALARM",
      "END:VEVENT",
    );
  });

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

function downloadIcs(events, filename, calendarName) {
  if (!events.length) {
    toast("Es gibt noch keine Termine zum Exportieren.");
    return;
  }
  const blob = new Blob([buildIcs(events, calendarName)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast("Kalenderdatei wurde erstellt.");
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 2800);
}

function setupEvents() {
  $$(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.section;
      $$(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
      $$(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === section));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  $("#saveName").addEventListener("click", () => {
    state.starterName = $("#starterName").value.trim() || "Blubber";
    state.starterNameSaved = true;
    saveState();
    renderStarterControls();
    renderPet();
    toast("Name gespeichert.");
  });

  $("#starterName").addEventListener("change", () => {
    state.starterName = $("#starterName").value.trim() || "Blubber";
    saveState();
    renderPet();
  });

  $("#editName").addEventListener("click", () => {
    state.starterNameSaved = false;
    saveState();
    renderStarterControls();
    $("#starterName").focus();
  });

  $("#quickFed").addEventListener("click", markFedNow);
  $("#fedNow").addEventListener("click", markFedNow);

  $("#quickCalendar").addEventListener("click", () => {
    $$(".tab").find((tab) => tab.dataset.section === "starter").click();
    $("#feedingExportRange").focus();
  });

  $("#petPicker").addEventListener("click", (event) => {
    const button = event.target.closest("[data-pet]");
    if (!button) return;
    state.petId = button.dataset.pet;
    saveState();
    renderStarterControls();
    renderPet();
  });

  $("#starterMode").addEventListener("change", (event) => {
    state.starterMode = event.target.value;
    saveState();
    toast(state.starterMode === "new" ? "Anzuchtmodus aktiv." : "Pflegemodus aktiv.");
  });

  $("#feedInterval").addEventListener("change", (event) => {
    state.feedInterval = event.target.value;
    $("#customFeedWrap").hidden = state.feedInterval !== "custom";
    saveState();
    renderPet();
  });

  $("#customFeedHours").addEventListener("change", (event) => {
    state.customFeedHours = Math.max(1, Number(event.target.value) || 24);
    saveState();
    renderPet();
  });

  $("#lastFed").addEventListener("change", (event) => {
    state.lastFed = fromLocalInput(event.target.value).toISOString();
    saveState();
    renderPet();
  });

  $("#exportFeedingIcs").addEventListener("click", () => {
    downloadIcs(createFeedingEvents(), "sauerteig-fuetterungen.ics", "Sauerteig Love Fütterungen");
  });

  ["recipeSearch", "categoryFilter", "difficultyFilter"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderRecipes);
    $(`#${id}`).addEventListener("change", renderRecipes);
  });

  $("#recipeGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === "favorite") {
      const active = toggleInArray(state.favorites, id);
      saveState();
      renderRecipes();
      toast(active ? "Als Herz-Rezept markiert." : "Herz entfernt.");
    }
    if (action === "later") {
      const active = toggleInArray(state.later, id);
      saveState();
      renderRecipes();
      toast(active ? "Für später gespeichert." : "Aus später backen entfernt.");
    }
    if (action === "detail") {
      openRecipeDetail(id);
    }
    if (action === "plan") {
      goToPlanner(id);
    }
  });

  $("#recipeDetail").addEventListener("click", (event) => {
    const button = event.target.closest("[data-detail-plan]");
    if (!button) return;
    goToPlanner(button.dataset.detailPlan);
  });

  $("#closeRecipeDialog").addEventListener("click", () => {
    const dialog = $("#recipeDialog");
    if (dialog.close) dialog.close();
    else dialog.removeAttribute("open");
  });

  $("#calculatePlan").addEventListener("click", calculatePlan);
  $("#exportPlanIcs").addEventListener("click", () => {
    const recipe = RECIPES.find((item) => item.id === $("#plannerRecipe").value) || RECIPES[0];
    downloadIcs(currentPlanEvents, `backplan-${recipe.id}.ics`, `Sauerteig Love Backplan ${recipe.title}`);
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    $("#installButton").hidden = false;
  });

  $("#installButton").addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    $("#installButton").hidden = true;
  });
}

function restoreLastPlan() {
  if (!state.lastPlan) return;
  const recipeExists = RECIPES.some((item) => item.id === state.lastPlan.recipeId);
  if (!recipeExists) return;
  $("#plannerRecipe").value = state.lastPlan.recipeId;
  document.querySelector(`input[name="planDirection"][value="${state.lastPlan.direction}"]`).checked = true;
  $("#plannerDate").value = toLocalInput(new Date(state.lastPlan.selected));
  calculatePlan();
}

function init() {
  renderGuides();
  renderStarterControls();
  renderPlannerOptions();
  renderRecipes();
  renderPet();
  setupEvents();
  restoreLastPlan();
  setInterval(renderPet, 60 * 1000);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The app still works without offline caching.
    });
  }
}

init();
