// Program content and personalization logic for Chill Path.
// The app uses the onboarding answers to choose one of four 28-day tracks.

export const PROGRAM_LENGTH_DAYS = 28;

export const TRACKS = {
  "calm_start": {
    "name": "Kom i gang rolig",
    "shortName": "Rolig start",
    "description": "For dager der lav energi, stress eller overveldelse gjør det vanskelig å starte.",
    "whyTemplate": "Dette sporet passer fordi svarene dine peker mot lav energi, overveldelse eller behov for en roligere start.",
    "basis": [
      "Atferdsaktivering: små planlagte handlinger før motivasjonen kommer.",
      "Aktivitets- og humørkobling: legg merke til hva som gir litt mestring, ro eller kontakt.",
      "Minimumsversjoner: gjør vaner små nok til at de tåler vanlige dårlige dager."
    ],
    "recommendations": [
      "Velg handlinger på 2-10 minutter",
      "Planlegg etter energi, ikke idealdag",
      "Logg små seire uten å gjøre appen til en plikt"
    ],
    "journalPrompts": [
      "Hva ga meg litt mer ro eller mestring i dag?",
      "Hva var minste nyttige handling?",
      "Hva bør jeg gjøre mindre av på lavenergIdager?",
      "Hvilken situasjon ble litt lettere enn forventet?"
    ],
    "maintenance": [
      "Ukentlig: velg tre små handlinger som gir mestring eller ro.",
      "Behold én lavenergiversjon for hver viktig vane.",
      "Se etter mønstre mellom energi, aktivitet og humør."
    ]
  },
  "focus_structure": {
    "name": "Fokus og struktur",
    "shortName": "Fokus",
    "description": "For deg som mister tråden, blir distrahert eller trenger mer ytre struktur.",
    "whyTemplate": "Dette sporet passer fordi svarene dine peker mot distraksjon, fokusvansker eller behov for tydeligere rammer.",
    "basis": [
      "Ekstern struktur: få oppgaver ut av hodet og inn i synlige systemer.",
      "CBT-inspirerte organisasjonsstrategier: plan, problemløsning, tidsblokker og neste handling.",
      "Miljødesign: reduser friksjon og distraksjoner før du starter."
    ],
    "recommendations": [
      "Én oppgave om gangen",
      "Bruk synlige tidsblokker",
      "Lag en fast regel for distraksjoner"
    ],
    "journalPrompts": [
      "Hva hjalp meg å holde fokus i dag?",
      "Hva distraherte meg mest, og hva kan justeres?",
      "Hva var neste tydelige handling?",
      "Når på dagen var fokuset lettest?"
    ],
    "maintenance": [
      "Ukentlig: tøm hodet, velg tre prioriteringer og sett av fokusblokker.",
      "Hold distraksjonslisten synlig under arbeid.",
      "Avslutt økter med å skrive neste start."
    ]
  },
  "good_enough": {
    "name": "Ferdig er bedre enn perfekt",
    "shortName": "Ferdig nok",
    "description": "For deg som blir stoppet av høye krav, selvkritikk eller frykt for feil.",
    "whyTemplate": "Dette sporet passer fordi svarene dine peker mot perfeksjonisme, høye krav eller frykt for å gjøre feil.",
    "basis": [
      "CBT for perfeksjonisme: test antakelser om feil, kvalitet og andres vurdering.",
      "Atferdseksperimenter: prøv 'godt nok' i små, trygge situasjoner.",
      "Selvmedfølelse: bytt hard selvsnakk med presist og støttende språk."
    ],
    "recommendations": [
      "Definer ferdig-nok før du starter",
      "Bruk stoppregler",
      "Øv på små, trygge 80-prosentleveringer"
    ],
    "journalPrompts": [
      "Hva var godt nok i dag?",
      "Hvilken standard gjorde oppgaven større enn nødvendig?",
      "Hva skjedde faktisk da jeg senket kravet litt?",
      "Hvordan ville jeg snakket til en venn i samme situasjon?"
    ],
    "maintenance": [
      "Ukentlig: velg én oppgave der 80 prosent er nok.",
      "Skriv en stoppregel før store oppgaver.",
      "Følg med på om selvkritikk øker eller reduserer handling."
    ]
  },
  "stop_postponing": {
    "name": "Slutt å utsette",
    "shortName": "Start nå",
    "description": "For deg som vet hva du burde gjøre, men likevel skyver starten foran deg.",
    "whyTemplate": "Dette sporet passer fordi svarene dine peker mot utsettelse, uklar start eller unngåelse av ubehag.",
    "basis": [
      "CBT mot prokrastinering: forstå unngåelsessirkelen og tren på konkret handling.",
      "Når-så-planer: knytt bestemte situasjoner til bestemte små handlinger.",
      "Emosjonsregulering: gjenkjenn følelsen du prøver å slippe unna, uten å la den styre alt."
    ],
    "recommendations": [
      "Start med første synlige handling",
      "Bruk 5-minuttersregelen",
      "Belønn oppstart, ikke bare fullføring"
    ],
    "journalPrompts": [
      "Hva utsatte jeg, og hva var følelsen bak?",
      "Hva var første synlige handling?",
      "Hvilken når-så-plan kan jeg bruke i morgen?",
      "Hva skjedde etter fem minutter?"
    ],
    "maintenance": [
      "Ukentlig: lag når-så-planer for de tre vanligste utsettelsene.",
      "Hold en liste over første synlige handlinger.",
      "Belønn oppstart tydeligere enn perfekt sluttresultat."
    ]
  }
};

export const PROGRAMS = {
  "calm_start": [
    {
      "theme": "Velg minste nyttige handling",
      "tagline": "Start så lite at kroppen ikke protesterer.",
      "lessons": [
        {
          "id": "calm_start-d01-l1",
          "title": "Motivasjon kan komme etter handling",
          "minutes": 4,
          "body": "Når energi er lav, er det ofte bedre å gjøre en liten handling enn å vente på riktig følelse. Små handlinger kan gi litt mestring og gjøre neste steg lettere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre en liten, konkret start",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d01-l2",
          "title": "To-minuttersstart",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én oppgave og gjør bare første to minutter. Stopp gjerne etterpå.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Koble aktivitet og humør",
      "tagline": "Se hva som faktisk påvirker dagsformen.",
      "lessons": [
        {
          "id": "calm_start-d02-l1",
          "title": "Dagsform er informasjon",
          "minutes": 4,
          "body": "Humør og energi påvirkes av søvn, mat, kontakt, bevegelse og mestring. Du trenger ikke analysere alt, bare samle litt nyttig informasjon.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å legge merke til hva handlingen ga deg",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d02-l2",
          "title": "Merk én handling",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gjør én liten ting og merk den som mestring, ro eller kontakt.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Planlegg etter energi",
      "tagline": "Bruk beste tidspunkt til det viktigste.",
      "lessons": [
        {
          "id": "calm_start-d03-l1",
          "title": "Ikke alle timer er like",
          "minutes": 4,
          "body": "Mange planer feiler fordi de antar at du har samme kapasitet hele dagen. Et bedre system legger krevende ting i bedre energivinduer og enklere ting i tyngre perioder.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke energien der den faktisk finnes",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d03-l2",
          "title": "Finn energivinduet",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv når på dagen du vanligvis har mest energi, og legg én viktig liten handling der.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Lag minimumsversjoner",
      "tagline": "Gjør vaner små nok til vanlige dager.",
      "lessons": [
        {
          "id": "calm_start-d04-l1",
          "title": "Minimum teller",
          "minutes": 4,
          "body": "En god vane bør ha en minstevariant som fortsatt teller. Da slipper du å velge mellom perfekt gjennomføring og ingenting.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bevare kontakt med vanen",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d04-l2",
          "title": "Lag én minstevariant",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv en minimumsversjon av en vane: for eksempel én setning, to minutter rydding eller fem rolige pust.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Ro kroppen før press",
      "tagline": "Litt regulering kan gjøre handling lettere.",
      "lessons": [
        {
          "id": "calm_start-d05-l1",
          "title": "Stress gjør start tyngre",
          "minutes": 4,
          "body": "Når kroppen er aktivert, blir prioritering og planlegging ofte vanskeligere. En kort rolig pause kan være et startverktøy, ikke en utsettelse.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre neste steg litt lettere",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d05-l2",
          "title": "Sansesjekk",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Ta tre rolige pust og legg merke til én lyd, én farge og ett kontaktpunkt mot stolen eller gulvet.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Mestring eller glede",
      "tagline": "Velg handlinger med tydelig verdi.",
      "lessons": [
        {
          "id": "calm_start-d06-l1",
          "title": "Handling bør gi noe tilbake",
          "minutes": 4,
          "body": "Atferdsaktivering handler ofte om å planlegge handlinger som gir mestring, glede, ro eller kontakt, selv om lysten ikke er der først.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å velge en handling med mulig positiv effekt",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d06-l2",
          "title": "Velg én verdi-handling",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én handling under 10 minutter som gir litt mestring, glede, ro eller kontakt.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Første ukes sjekk",
      "tagline": "Se etter mønster uten selvkritikk.",
      "lessons": [
        {
          "id": "calm_start-d07-l1",
          "title": "Data, ikke dom",
          "minutes": 4,
          "body": "En uke med små observasjoner kan vise hva som hjelper. Målet er ikke å vurdere deg selv, men å justere planen.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke erfaring til å justere",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d07-l2",
          "title": "Tre observasjoner",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre ting som gjorde dagene litt lettere eller tyngre.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Gjør morgenen enklere",
      "tagline": "Fjern én beslutning før dagen starter.",
      "lessons": [
        {
          "id": "calm_start-d08-l1",
          "title": "Mindre valg gir mindre friksjon",
          "minutes": 4,
          "body": "Når kapasiteten er lav, kan små valg spise mye energi. En enkel forberedelse kvelden før kan gjøre starten mildere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å redusere én beslutning",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d08-l2",
          "title": "Forbered én ting",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Legg frem, åpne, skriv ned eller klargjør én ting som gjør morgendagen 10 prosent enklere.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Håndter overveldelse",
      "tagline": "Samle kaoset i én liten boks.",
      "lessons": [
        {
          "id": "calm_start-d09-l1",
          "title": "Overveldelse trenger ramme",
          "minutes": 4,
          "body": "Når alt føles stort samtidig, kan hjernen fryse. En liten ramme gjør problemet håndterbart.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å skille alt fra neste handling",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d09-l2",
          "title": "Én boks",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv alt som presser på i én liste. Velg deretter bare én ting som skal få oppmerksomhet.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Litt bevegelse",
      "tagline": "Bruk kroppen som startknapp.",
      "lessons": [
        {
          "id": "calm_start-d10-l1",
          "title": "Bevegelse kan skifte tilstand",
          "minutes": 4,
          "body": "Kort, mild bevegelse kan hjelpe når du sitter fast. Det trenger ikke være trening for å ha verdi.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke bevegelse til å komme i gang",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d10-l2",
          "title": "Tre minutter bevegelse",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gå rundt, strekk deg eller rydd en liten flate i tre minutter.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Kontakt uten press",
      "tagline": "Små sosiale signaler kan gi energi.",
      "lessons": [
        {
          "id": "calm_start-d11-l1",
          "title": "Kontakt kan regulere",
          "minutes": 4,
          "body": "Noen ganger blir alt tyngre når man sitter alene med det. En liten kontakt kan gi støtte uten å bli en stor samtale.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre kontakt lavterskel",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d11-l2",
          "title": "Send én enkel melding",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Send en kort melding til noen, eller avtal en liten praktisk ting.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Gjør miljøet mildere",
      "tagline": "Omgivelsene skal hjelpe, ikke kreve.",
      "lessons": [
        {
          "id": "calm_start-d12-l1",
          "title": "Miljøet påvirker kapasitet",
          "minutes": 4,
          "body": "Et perfekt system er ikke nødvendig. Én mindre forstyrrelse eller én tydeligere startflate kan være nok.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre starten mer synlig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d12-l2",
          "title": "Rydd én startflate",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gjør én liten plass klar for neste handling: bord, skjerm, notat eller veske.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Når planen glipper",
      "tagline": "Kom tilbake uten å starte på nytt.",
      "lessons": [
        {
          "id": "calm_start-d13-l1",
          "title": "Glipp er forventet",
          "minutes": 4,
          "body": "Alle mister en dag. Et godt system har en returregel, slik at en glipp ikke blir en lang pause.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre retur lett",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d13-l2",
          "title": "Lag returregel",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Når jeg mister en dag, skal jeg gjøre denne minste handlingen neste dag: ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Halvveis med mildhet",
      "tagline": "Behold det som virker, kutt resten.",
      "lessons": [
        {
          "id": "calm_start-d14-l1",
          "title": "Mindre kan vare lenger",
          "minutes": 4,
          "body": "Et godt program skal ikke bli enda en prestasjon. Halvveis er det lurt å kutte det som gir lite og beholde det som hjelper.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å forenkle uten å gi opp",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d14-l2",
          "title": "Behold én ting",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv én øvelse du vil beholde og én ting du vil gjøre enklere.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Stabiliser en rutine",
      "tagline": "En rytme er bedre enn daglig forhandling.",
      "lessons": [
        {
          "id": "calm_start-d15-l1",
          "title": "Rytme sparer energi",
          "minutes": 4,
          "body": "Når en handling har fast plass, krever den mindre forhandling. Start med én liten rutine, ikke hele livet.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gi handlingen en fast krok",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d15-l2",
          "title": "Velg fast plass",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Knytt én liten handling til et tidspunkt eller en eksisterende rutine.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Beskytt hvile",
      "tagline": "Hvile kan være del av planen.",
      "lessons": [
        {
          "id": "calm_start-d16-l1",
          "title": "Restitusjon er ikke feil",
          "minutes": 4,
          "body": "Lav energi blir ofte verre når hvile bare skjer med skyldfølelse. Planlagt hvile kan gjøre neste handling mer mulig.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å hvile på en måte som hjelper",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d16-l2",
          "title": "Planlegg én ekte pause",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg en pause som faktisk gir litt påfyll, ikke bare mer støy.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Vanskelig dag-plan",
      "tagline": "Bestem hva som teller på tunge dager.",
      "lessons": [
        {
          "id": "calm_start-d17-l1",
          "title": "Plan B er en styrke",
          "minutes": 4,
          "body": "Når du har en plan for dårlige dager, slipper du å bruke energi på å finne den mens du allerede er sliten.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre tunge dager håndterbare",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d17-l2",
          "title": "Skriv Plan B",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Lag en dagsplan med bare tre små ting: én for kropp, én for hjem/arbeid og én for ro.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Reduser krav",
      "tagline": "Spør hva som faktisk må gjøres.",
      "lessons": [
        {
          "id": "calm_start-d18-l1",
          "title": "Alt haster ikke likt",
          "minutes": 4,
          "body": "Overveldelse vokser når alt får samme status. Å senke eller fjerne ett krav kan være mer effektivt enn å presse mer.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å frigjøre kapasitet med vilje",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d18-l2",
          "title": "Kutt én ting",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Finn én oppgave du kan utsette, forenkle eller gjøre mindre.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Bruk støtte",
      "tagline": "Ikke alt må løses alene.",
      "lessons": [
        {
          "id": "calm_start-d19-l1",
          "title": "Støtte kan være praktisk",
          "minutes": 4,
          "body": "Støtte trenger ikke være dyp samtale. Det kan være å spørre, avtale, delegere eller få noen til å sitte i samme rom.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre støtte konkret",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d19-l2",
          "title": "Be om én konkret ting",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv eller send én konkret forespørsel om hjelp, avklaring eller selskap.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Gjør fremgang synlig",
      "tagline": "Små kryss kan holde systemet levende.",
      "lessons": [
        {
          "id": "calm_start-d20-l1",
          "title": "Synlighet gir mestring",
          "minutes": 4,
          "body": "Når fremgang bare ligger i hodet, forsvinner den lett. Små logger gjør innsatsen mer synlig.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å se innsatsen tydeligere",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d20-l2",
          "title": "Logg tre små ting",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre ting du faktisk gjorde denne uken, også de små.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Andre ukes sjekk",
      "tagline": "Finn det som tåler hverdagen.",
      "lessons": [
        {
          "id": "calm_start-d21-l1",
          "title": "Bærekraft slår intensitet",
          "minutes": 4,
          "body": "Det som fungerer når livet er normalt rotete, er mer verdifullt enn det som bare fungerer på perfekte dager.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å velge noe som varer",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d21-l2",
          "title": "Velg robust øvelse",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én øvelse fra programmet som er enkel nok til å brukes videre.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Start før du vurderer",
      "tagline": "La handling gi mer informasjon enn grubling.",
      "lessons": [
        {
          "id": "calm_start-d22-l1",
          "title": "Vurdering kan komme etterpå",
          "minutes": 4,
          "body": "Når du vurderer for lenge, kan start bli tyngre. En kort handling gir ofte bedre informasjon enn mer tenking.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å la erfaring komme før vurdering",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d22-l2",
          "title": "Prøv først",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gjør én liten handling før du bestemmer om du orker mer.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Avslutt mykt",
      "tagline": "Neste start begynner ved forrige slutt.",
      "lessons": [
        {
          "id": "calm_start-d23-l1",
          "title": "Ryddig avslutning hjelper",
          "minutes": 4,
          "body": "En to-minutters avslutning kan gjøre neste gang mindre tung.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre neste start enklere",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d23-l2",
          "title": "Skriv neste start",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Før du avslutter en oppgave, skriv nøyaktig hva første steg er neste gang.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Vær realistisk",
      "tagline": "Planen skal passe livet du faktisk har.",
      "lessons": [
        {
          "id": "calm_start-d24-l1",
          "title": "Realistisk er respektfullt",
          "minutes": 4,
          "body": "En plan som krever en ideell versjon av deg, holder sjelden. En realistisk plan er mer støttende og mer effektiv.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å tilpasse planen til virkeligheten",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d24-l2",
          "title": "Juster én plan",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Ta en plan for i morgen og gjør den 30 prosent lettere.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Bygg egen håndbok",
      "tagline": "Samle det som virker for deg.",
      "lessons": [
        {
          "id": "calm_start-d25-l1",
          "title": "Egen erfaring teller",
          "minutes": 4,
          "body": "Etter noen uker har du bedre data om deg selv. Det er verdt mer enn generelle råd.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke egne erfaringer",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d25-l2",
          "title": "Skriv tre regler",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre personlige regler for lavenergIdager.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Forebygg frafall",
      "tagline": "Gjør det lett å starte igjen.",
      "lessons": [
        {
          "id": "calm_start-d26-l1",
          "title": "Retur er en del av systemet",
          "minutes": 4,
          "body": "Vedlikehold handler ikke om ubrutt rekke. Det handler om å komme tilbake raskere og mildere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre comeback enkelt",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d26-l2",
          "title": "Lag start-igjen-knapp",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv én handling du alltid kan gjøre for å starte igjen etter pause.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Velg neste måned",
      "tagline": "Gjør programmet om til enkel rytme.",
      "lessons": [
        {
          "id": "calm_start-d27-l1",
          "title": "Få ting, ofte nok",
          "minutes": 4,
          "body": "Etter 28 dager trenger du ikke mer innhold. Du trenger en enkel rytme som kan gjentas.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å lage en enkel videreplan",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d27-l2",
          "title": "Planlegg ukerytme",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én ukentlig gjennomgang, én liten vane og én lavenergiregel for neste måned.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Avslutt og behold",
      "tagline": "Ta med deg det nyttigste.",
      "lessons": [
        {
          "id": "calm_start-d28-l1",
          "title": "Programmet er start, ikke fasit",
          "minutes": 4,
          "body": "Målet er ikke å bli ferdig, men å ha noen verktøy som gjør hverdagen litt lettere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å velge videre med lavt press",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "calm_start-d28-l2",
          "title": "Skriv videre-avtalen",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: De neste fire ukene vil jeg beholde ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    }
  ],
  "focus_structure": [
    {
      "theme": "Få alt ut av hodet",
      "tagline": "Start med å gjøre oppgaver synlige.",
      "lessons": [
        {
          "id": "focus_structure-d01-l1",
          "title": "Hodet er dårlig lager",
          "minutes": 4,
          "body": "Når oppgaver ligger i hodet, bruker de oppmerksomhet. En ekstern liste frigjør kapasitet og gjør prioritering enklere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å flytte oppgaver ut av hodet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d01-l2",
          "title": "Tøm hodet",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv alt du kommer på i tre minutter. Ikke sorter mens du skriver.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Velg én ting",
      "tagline": "Fokus trenger en tydelig vinner.",
      "lessons": [
        {
          "id": "focus_structure-d02-l1",
          "title": "Prioritering er fravalg",
          "minutes": 4,
          "body": "Å ha mange viktige oppgaver samtidig gjør det vanskelig å starte. Fokus begynner når én ting får førsteplass.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gi én oppgave førsteplass",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d02-l2",
          "title": "Dagens ene hovedting",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én oppgave som betyr mest i dag, og skriv hva som skal være sant når den er gjort.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Lag neste handling",
      "tagline": "Mål må oversettes til handling.",
      "lessons": [
        {
          "id": "focus_structure-d03-l1",
          "title": "Neste handling må kunne gjøres",
          "minutes": 4,
          "body": "Et mål som 'jobbe med rapporten' er ofte for uklart. En god neste handling er fysisk eller digital og kan startes uten mer planlegging.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "At handlingen kan startes med en gang",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d03-l2",
          "title": "Oversett et mål",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv en oppgave om til én konkret neste handling.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Bruk tidsblokk",
      "tagline": "Gi oppgaven en kant.",
      "lessons": [
        {
          "id": "focus_structure-d04-l1",
          "title": "Tid må synes",
          "minutes": 4,
          "body": "En tidsblokk gjør arbeid mindre uendelig. Den trenger ikke være lang; den må bare ha start og slutt.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gi arbeidet en tydelig ramme",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d04-l2",
          "title": "Sett en blokk",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg 10, 15 eller 25 minutter for én oppgave. Skriv starttid og sluttid.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Lag distraksjonsliste",
      "tagline": "Ikke følg alle impulser.",
      "lessons": [
        {
          "id": "focus_structure-d05-l1",
          "title": "Parker impulser",
          "minutes": 4,
          "body": "Distraksjoner forsvinner ikke fordi du bestemmer deg. En distraksjonsliste lar deg notere impulsen uten å følge den.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å notere impulser uten å bytte oppgave",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d05-l2",
          "title": "Parker tre impulser",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Under en kort økt: skriv distraksjoner på en liste i stedet for å åpne dem.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Design startflaten",
      "tagline": "Miljøet skal peke på neste handling.",
      "lessons": [
        {
          "id": "focus_structure-d06-l1",
          "title": "Synlighet styrer oppmerksomhet",
          "minutes": 4,
          "body": "Det som ligger foran deg, får mer oppmerksomhet. Du kan bruke dette aktivt.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre riktig handling mest synlig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d06-l2",
          "title": "Én flate, én oppgave",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Rydd skjermen eller bordet slik at bare dagens oppgave er synlig.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Første ukes system",
      "tagline": "Lag en enkel rytme du kan gjenta.",
      "lessons": [
        {
          "id": "focus_structure-d07-l1",
          "title": "Systemet må være lite",
          "minutes": 4,
          "body": "Et system som er for omfattende, blir en ny oppgave. Start med en enkel daglig sjekk.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å ha en liten gjentakbar sjekk",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d07-l2",
          "title": "Tre-punkts sjekk",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Hva er viktigst? Hva er neste handling? Når gjør jeg den?",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Tidsestimat",
      "tagline": "Lær av forskjellen mellom plan og virkelighet.",
      "lessons": [
        {
          "id": "focus_structure-d08-l1",
          "title": "Tid er ofte vanskelig å kjenne",
          "minutes": 4,
          "body": "Mange undervurderer eller overvurderer tid. Små estimater og faktisk tid gir bedre treffsikkerhet over tid.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å lære av faktisk tidsbruk",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d08-l2",
          "title": "Gjett og mål",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én oppgave. Gjett tid, mål faktisk tid, og noter forskjellen uten dom.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Når-så for fokus",
      "tagline": "Bestem responsen før distraksjonen kommer.",
      "lessons": [
        {
          "id": "focus_structure-d09-l1",
          "title": "Forhåndsvalg hjelper",
          "minutes": 4,
          "body": "Når du vet hva som ofte forstyrrer, kan du lage en enkel regel på forhånd.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bestemme responsen på forhånd",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d09-l2",
          "title": "Lag én regel",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Når jeg får lyst til å sjekke noe, så skriver jeg det på listen og fortsetter til timeren ringer.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Arbeid med noen",
      "tagline": "Ytre nærvær kan gi struktur.",
      "lessons": [
        {
          "id": "focus_structure-d10-l1",
          "title": "Kroppsdobling kan hjelpe",
          "minutes": 4,
          "body": "Noen får lettere start når en annen person er til stede, fysisk eller digitalt. Det trenger ikke være kontroll, bare ramme.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke sosial ramme som støtte",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d10-l2",
          "title": "Avtal en fokusøkt",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Spør noen om 20 minutter stille arbeid samtidig, eller bruk et offentlig sted som ramme.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Problemløs når planen sprekker",
      "tagline": "Bytt selvkritikk med feilsøking.",
      "lessons": [
        {
          "id": "focus_structure-d11-l1",
          "title": "Planbrudd er data",
          "minutes": 4,
          "body": "Når en plan ikke virker, er spørsmålet ikke 'hva er galt med meg?', men 'hva manglet systemet?'.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å feilsøke systemet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d11-l2",
          "title": "Finn manglende del",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv hva som manglet: tid, tydelighet, ro, verktøy, energi eller påminnelse.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Påminnelser som virker",
      "tagline": "Gjør viktige ting synlige på rett tidspunkt.",
      "lessons": [
        {
          "id": "focus_structure-d12-l1",
          "title": "Påminnelse må ha handling",
          "minutes": 4,
          "body": "En god påminnelse sier ikke bare 'husk'. Den sier hva du skal gjøre og når.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre påminnelsen handlingsrettet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d12-l2",
          "title": "Skriv bedre påminnelse",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Lag én påminnelse som starter med et verb: åpne, send, skriv, ring eller legg frem.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Ukentlig opprydding",
      "tagline": "Hold systemet lett.",
      "lessons": [
        {
          "id": "focus_structure-d13-l1",
          "title": "Lister må vedlikeholdes",
          "minutes": 4,
          "body": "Et system blir raskt støy hvis alt blir liggende. En kort opprydding gjør listen troverdig igjen.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre systemet lett å bruke",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d13-l2",
          "title": "Slett og velg",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Slett eller arkiver tre irrelevante ting. Velg tre viktige for neste uke.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Halvveis: behold rammen",
      "tagline": "Finn det som faktisk hjelper fokus.",
      "lessons": [
        {
          "id": "focus_structure-d14-l1",
          "title": "Fokus trenger få regler",
          "minutes": 4,
          "body": "For mange produktivitetsteknikker kan skape mer støy. Behold de få rammene som hjelper mest.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å forenkle systemet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d14-l2",
          "title": "Velg topp to",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg de to fokusgrepene som har fungert best hittil.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Startsignal",
      "tagline": "Gi hjernen et fast tegn på arbeid.",
      "lessons": [
        {
          "id": "focus_structure-d15-l1",
          "title": "Ritualer kan senke terskelen",
          "minutes": 4,
          "body": "Et lite startsignal gjør overgangen til arbeid tydeligere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre overgangen tydelig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d15-l2",
          "title": "Lag startsignal",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg et fast startsignal: timer på, vann klart, dokument åpnet, eller hodetelefoner på.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Pause med slutt",
      "tagline": "Pauser bør gjøre retur enklere.",
      "lessons": [
        {
          "id": "focus_structure-d16-l1",
          "title": "Pause trenger kant",
          "minutes": 4,
          "body": "Pauser uten slutt kan bli en ny distraksjon. En god pause har både formål og returpunkt.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre retur til del av pausen",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d16-l2",
          "title": "Planlegg pause",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg en 5-minutters pause og bestem hva du gjør når den er ferdig.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Oppgaveparkering",
      "tagline": "Ikke bland inn nye oppgaver i fokusøkten.",
      "lessons": [
        {
          "id": "focus_structure-d17-l1",
          "title": "Nye ideer er ikke ordre",
          "minutes": 4,
          "body": "Når nye ting dukker opp, kan de være nyttige uten å avbryte deg. Parker dem.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å beskytte nåværende oppgave",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d17-l2",
          "title": "Lag parkeringsfelt",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Ha en lapp/notat for nye ideer under arbeid. Ikke sorter før økten er over.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Visuell fremdrift",
      "tagline": "Gjør arbeid konkret.",
      "lessons": [
        {
          "id": "focus_structure-d18-l1",
          "title": "Fremdrift motiverer mer når den synes",
          "minutes": 4,
          "body": "Små synlige markører kan gjøre det lettere å holde retningen.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre fremdrift synlig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d18-l2",
          "title": "Lag mini-sjekkliste",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Del én oppgave i tre synlige delsteg og kryss av ett.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Beskytt søvn og start",
      "tagline": "Fokus begynner ofte dagen før.",
      "lessons": [
        {
          "id": "focus_structure-d19-l1",
          "title": "Restitusjon påvirker fokus",
          "minutes": 4,
          "body": "Fokusstrategier virker dårligere hvis kroppen er tom. Et lite grep kvelden før kan hjelpe neste dag.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre neste morgen lettere",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d19-l2",
          "title": "Kveldsklargjøring",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv morgendagens første handling før du avslutter dagen.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Kommuniser behov",
      "tagline": "Struktur kan også komme fra andre.",
      "lessons": [
        {
          "id": "focus_structure-d20-l1",
          "title": "Avklaringer sparer fokus",
          "minutes": 4,
          "body": "Uklar forventning stjeler oppmerksomhet. Det er lov å be om tydeligere rammer.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å redusere uklarhet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d20-l2",
          "title": "Be om avklaring",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Send eller skriv ett spørsmål som gjør en oppgave tydeligere.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Andre ukes sjekk",
      "tagline": "Se hva som gir mest fokus per innsats.",
      "lessons": [
        {
          "id": "focus_structure-d21-l1",
          "title": "Effekt over kompleksitet",
          "minutes": 4,
          "body": "Målet er ikke det mest avanserte systemet, men det enkleste som faktisk brukes.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å velge etter faktisk nytte",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d21-l2",
          "title": "Vurder tre verktøy",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gi timer, liste og miljøgrep karakter 1-5 for hvor mye de hjelper deg.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Energi i fokusplanen",
      "tagline": "Ikke bruk beste fokus på smårot.",
      "lessons": [
        {
          "id": "focus_structure-d22-l1",
          "title": "Viktig arbeid trenger riktig vindu",
          "minutes": 4,
          "body": "Hvis du bruker beste tidspunkt på e-post og småting, blir krevende arbeid skjøvet til dårligere timer.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å beskytte beste tidspunkt",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d22-l2",
          "title": "Flytt én oppgave",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Legg én krevende oppgave til ditt beste fokusvindu i morgen.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Avslutt med neste start",
      "tagline": "Hver økt bør hjelpe neste økt.",
      "lessons": [
        {
          "id": "focus_structure-d23-l1",
          "title": "Neste handling fjerner friksjon",
          "minutes": 4,
          "body": "Det er lettere å starte når du vet nøyaktig hvor du skal fortsette.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre neste start tydelig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d23-l2",
          "title": "Skriv fortsettelsen",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Før du stopper: skriv første setning, første fil, første knapp eller første spørsmål for neste gang.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Gjør systemet mobilt",
      "tagline": "Planen bør fungere der du er.",
      "lessons": [
        {
          "id": "focus_structure-d24-l1",
          "title": "Fokus trenger tilgjengelighet",
          "minutes": 4,
          "body": "Hvis systemet bare virker på perfekte steder, blir det sårbart. Lag en enkel mobil variant.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre systemet fleksibelt",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d24-l2",
          "title": "Lag reiseversjon",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv hvordan du kan gjøre en 10-minutters fokusøkt uten fast kontor.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Reduser varsler",
      "tagline": "Ikke la alle andre velge din oppmerksomhet.",
      "lessons": [
        {
          "id": "focus_structure-d25-l1",
          "title": "Varsler er eksterne prioriteringer",
          "minutes": 4,
          "body": "Varsler kan gjøre dagen reaktiv. Du kan lage vinduer for å sjekke i stedet for å være åpen hele tiden.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å beskytte oppmerksomhet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d25-l2",
          "title": "Skru av én varsling",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én app eller kanal du kan dempe i én fokusblokk.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Egen fokusmanual",
      "tagline": "Samle reglene som virker.",
      "lessons": [
        {
          "id": "focus_structure-d26-l1",
          "title": "Egne mønstre slår generelle råd",
          "minutes": 4,
          "body": "Etter noen uker vet du mer om når, hvor og hvordan du fokuserer best.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke egne data",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d26-l2",
          "title": "Skriv manualen",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre setninger: Jeg fokuserer best når ..., jeg mister fokus når ..., jeg kommer tilbake ved å ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Plan for neste måned",
      "tagline": "Hold strukturen enkel nok til å vare.",
      "lessons": [
        {
          "id": "focus_structure-d27-l1",
          "title": "Vedlikehold er repetisjon",
          "minutes": 4,
          "body": "Etter programmet trenger du ikke mer kompleksitet. Du trenger en ukentlig rytme for å tømme, velge og blokkere tid.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre strukturen gjentakbar",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d27-l2",
          "title": "Lag ukerytme",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg en fast 15-minutters ukentlig planlegging og to fokusblokker for neste uke.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Avslutt og behold",
      "tagline": "Ta med deg den enkleste strukturen.",
      "lessons": [
        {
          "id": "focus_structure-d28-l1",
          "title": "Lite brukt er bedre enn stort ubrukt",
          "minutes": 4,
          "body": "Den beste planen er den du faktisk åpner igjen.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å beholde et lite system",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "focus_structure-d28-l2",
          "title": "Velg minimumssystem",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg ett sted for oppgaver, én daglig sjekk og én fokusregel du vil beholde.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    }
  ],
  "good_enough": [
    {
      "theme": "Se kravene tydelig",
      "tagline": "Perfeksjonisme blir lettere å jobbe med når standardene blir synlige.",
      "lessons": [
        {
          "id": "good_enough-d01-l1",
          "title": "Krav kan bli usynlige regler",
          "minutes": 4,
          "body": "Mange høye krav kjennes bare som 'må'. Første steg er å skrive dem ned så de kan vurderes.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre regelen synlig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d01-l2",
          "title": "Skriv ett krav",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg en oppgave og skriv regelen du føler du må følge.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Definer ferdig nok",
      "tagline": "Sett sluttpunkt før du starter.",
      "lessons": [
        {
          "id": "good_enough-d02-l1",
          "title": "Uten sluttpunkt vokser oppgaven",
          "minutes": 4,
          "body": "Perfeksjon gjør ofte oppgaver grenseløse. En ferdig-nok-definisjon gjør det mulig å avslutte.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å definere stopp før arbeidet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d02-l2",
          "title": "Lag sluttpunkt",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Denne oppgaven er ferdig nok når ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Test 80 prosent",
      "tagline": "Øv trygt på lavere krav.",
      "lessons": [
        {
          "id": "good_enough-d03-l1",
          "title": "Godt nok er en ferdighet",
          "minutes": 4,
          "body": "Du trenger ikke senke kravene overalt. Start med en liten, trygg oppgave der 80 prosent er nok.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å teste lavere krav i praksis",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d03-l2",
          "title": "80-prosentforsøk",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én liten oppgave og lever/avslutt den på godt-nok-nivå.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Skill kvalitet fra verdi",
      "tagline": "Du er mer enn prestasjonen.",
      "lessons": [
        {
          "id": "good_enough-d04-l1",
          "title": "Selvverdi bør ikke stå på hver oppgave",
          "minutes": 4,
          "body": "Når egenverdi kobles til resultat, blir start og avslutning tyngre. Øv på å skille deg fra arbeidet.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å skille person fra prestasjon",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d04-l2",
          "title": "Skriv skillelinjen",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Resultatet kan vurderes, men det definerer ikke meg.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Mykere selvsnakk",
      "tagline": "Hard kritikk gir sjelden bedre handling.",
      "lessons": [
        {
          "id": "good_enough-d05-l1",
          "title": "Presist språk hjelper mer",
          "minutes": 4,
          "body": "Selvkritikk kan føles motiverende, men gir ofte mer unngåelse. Mildt og presist språk gjør handling lettere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre språket mer presist",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d05-l2",
          "title": "Bytt setning",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Bytt 'jeg er håpløs' med en presis setning: 'Denne starten er vanskelig'.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Fryktkart",
      "tagline": "Hva tror du vil skje hvis det ikke er perfekt?",
      "lessons": [
        {
          "id": "good_enough-d06-l1",
          "title": "Antakelser kan testes",
          "minutes": 4,
          "body": "Perfeksjonisme drives ofte av spådommer: andre vil dømme, alt faller sammen, eller feil blir farlige. Skriv spådommen før du tester.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre frykten testbar",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d06-l2",
          "title": "Skriv spådom",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Før en godt-nok-handling: skriv hva du frykter vil skje.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Første ukes sjekk",
      "tagline": "Sammenlign frykt med faktisk utfall.",
      "lessons": [
        {
          "id": "good_enough-d07-l1",
          "title": "Virkelighet slår spådom",
          "minutes": 4,
          "body": "Når du tester små senkede krav, kan du sammenligne hva du fryktet med hva som skjedde.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke erfaring som korreksjon",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d07-l2",
          "title": "Frykt vs fakta",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv én situasjon: Hva fryktet jeg? Hva skjedde faktisk?",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Stoppregel",
      "tagline": "Bestem når arbeid skal avsluttes.",
      "lessons": [
        {
          "id": "good_enough-d08-l1",
          "title": "Stopp er en ferdighet",
          "minutes": 4,
          "body": "Perfeksjonisme gjør det vanskelig å vite når nok er nok. En stoppregel kan være tid, kriterium eller antall revisjoner.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å stoppe etter en forhåndsregel",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d08-l2",
          "title": "Lag stoppregel",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én oppgave og bestem maks tid eller maks antall runder.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Prioriter etter konsekvens",
      "tagline": "Ikke alt fortjener toppnivå.",
      "lessons": [
        {
          "id": "good_enough-d09-l1",
          "title": "Kvalitet bør varieres",
          "minutes": 4,
          "body": "Noen oppgaver trenger høy kvalitet. Mange trenger bare tydelig og nyttig. Bruk innsats der konsekvensen faktisk er høy.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke riktig nivå på riktig oppgave",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d09-l2",
          "title": "Sorter oppgaver",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Del tre oppgaver i høy, middels og lav kvalitetsstandard.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Øv på små feil",
      "tagline": "Trygg eksponering for ufullkommenhet.",
      "lessons": [
        {
          "id": "good_enough-d10-l1",
          "title": "Små feil kan være ufarlige",
          "minutes": 4,
          "body": "Å oppleve at små ufullkommenheter tåles, kan redusere presset over tid.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å erfare at ufullkommenhet tåles",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d10-l2",
          "title": "Liten ufullkommenhet",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gjør én ufarlig ting litt mindre perfekt: kortere melding, enklere format eller færre justeringer.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Verdier over fasade",
      "tagline": "Hva skal oppgaven være til for?",
      "lessons": [
        {
          "id": "good_enough-d11-l1",
          "title": "Formål kan slå perfeksjon",
          "minutes": 4,
          "body": "Når du husker formålet, blir det lettere å velge riktig innsatsnivå.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å la formålet styre nivået",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d11-l2",
          "title": "Skriv formål",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Denne oppgaven skal hjelpe med ..., derfor er nok-nivået ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Motta tilbakemelding",
      "tagline": "Tilbakemelding er informasjon, ikke dom.",
      "lessons": [
        {
          "id": "good_enough-d12-l1",
          "title": "Respons kan brukes praktisk",
          "minutes": 4,
          "body": "Perfeksjonisme gjør tilbakemelding truende. Øv på å sortere respons i nyttig, uklart og irrelevant.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke respons som informasjon",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d12-l2",
          "title": "Sorter én respons",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Tenk på en tilbakemelding og del den i: nyttig, uklart, irrelevant.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Ukentlig nok-sjekk",
      "tagline": "Hva ble større enn nødvendig?",
      "lessons": [
        {
          "id": "good_enough-d13-l1",
          "title": "Overarbeid kan oppdages",
          "minutes": 4,
          "body": "En kort sjekk kan vise hvor du brukte mer energi enn oppgaven trengte.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å justere innsatsnivå",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d13-l2",
          "title": "Finn overarbeid",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv én oppgave du overarbeidet og hva en nok-versjon ville vært.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Halvveis: behold motet",
      "tagline": "Du trener på ubehag, ikke dårlig arbeid.",
      "lessons": [
        {
          "id": "good_enough-d14-l1",
          "title": "Godt nok er ikke slurv",
          "minutes": 4,
          "body": "Målet er ikke å lage dårligere arbeid, men å slutte å bruke toppnivå på alt.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å velge kvalitet bevisst",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d14-l2",
          "title": "Skriv ny regel",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv en ny regel: Jeg kan velge kvalitetsnivå etter formål og konsekvens.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Første utkast",
      "tagline": "Utkast skal være uferdige.",
      "lessons": [
        {
          "id": "good_enough-d15-l1",
          "title": "Uferdig er en fase",
          "minutes": 4,
          "body": "Perfeksjonisme kan prøve å gjøre første utkast til sluttprodukt. Det gjør start tyngre.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å la utkast være utkast",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d15-l2",
          "title": "Lag dårlig førsteutkast",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv eller skisser i fem minutter uten å rette underveis.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Tidsboks revisjon",
      "tagline": "Gi forbedring en grense.",
      "lessons": [
        {
          "id": "good_enough-d16-l1",
          "title": "Revisjon kan bli endeløs",
          "minutes": 4,
          "body": "Forbedring er nyttig til et punkt. Etterpå kan den bli trygghetssøking.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å begrense trygghetssøking",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d16-l2",
          "title": "Maks to runder",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg en liten tekst/oppgave og gi deg selv maks to forbedringsrunder.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Vennestemmen",
      "tagline": "Snakk til deg selv som til en du liker.",
      "lessons": [
        {
          "id": "good_enough-d17-l1",
          "title": "Selvmedfølelse er praktisk",
          "minutes": 4,
          "body": "Mildhet betyr ikke å slippe alt. Det betyr å støtte handling uten å øke skam.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å støtte uten å angripe",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d17-l2",
          "title": "Skriv vennelig respons",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv hva du ville sagt til en venn som strevde med samme oppgave.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Synlig leveranse",
      "tagline": "La noe bli sett før det føles helt klart.",
      "lessons": [
        {
          "id": "good_enough-d18-l1",
          "title": "Trygg deling kan trene mot",
          "minutes": 4,
          "body": "Å dele små uferdige eller ferdig-nok ting i trygge rammer kan svekke frykten for vurdering.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å øve på trygg synlighet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d18-l2",
          "title": "Del en liten ting",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Del et utkast, et spørsmål eller en enkel versjon med en trygg person.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Aksepter læring",
      "tagline": "Feil er ofte data.",
      "lessons": [
        {
          "id": "good_enough-d19-l1",
          "title": "Feil kan forbedre systemet",
          "minutes": 4,
          "body": "Hvis feil alltid betyr nederlag, blir læring farlig. Prøv å se feil som informasjon om neste justering.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre feil om til justering",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d19-l2",
          "title": "Feillogg uten dom",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv én feil eller mangel og én praktisk justering.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Kutt sammenligning",
      "tagline": "Andre viser ofte sluttproduktet.",
      "lessons": [
        {
          "id": "good_enough-d20-l1",
          "title": "Sammenligning er skjevt datagrunnlag",
          "minutes": 4,
          "body": "Du ser ofte andres ferdige utside og din egen rotete prosess. Det er ikke en rettferdig sammenligning.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å se at sammenligningen er ufullstendig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d20-l2",
          "title": "Bytt sammenligning",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Når du sammenligner deg: skriv hva du ikke vet om den andres prosess.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Andre ukes sjekk",
      "tagline": "Hva skjedde da kravene ble litt lavere?",
      "lessons": [
        {
          "id": "good_enough-d21-l1",
          "title": "Resultater kan undersøkes",
          "minutes": 4,
          "body": "Etter flere små forsøk kan du se om lavere krav faktisk ga katastrofe, eller om det ofte gikk bra nok.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bygge erfaring mot frykt",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d21-l2",
          "title": "Samle bevis",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre ting som gikk greit selv om de ikke var perfekte.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Velg innsatsnivå",
      "tagline": "Ikke alle oppgaver er A-oppgaver.",
      "lessons": [
        {
          "id": "good_enough-d22-l1",
          "title": "Riktig innsats er smart",
          "minutes": 4,
          "body": "Noen oppgaver fortjener høy innsats, andre ikke. Det er en prioriteringsferdighet.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å matche innsats med betydning",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d22-l2",
          "title": "A/B/C-nivå",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gi dagens oppgaver nivå A, B eller C. Bruk mest tid på A.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Avslutt med læring",
      "tagline": "Hva lærte du, ikke bare hvordan gikk det?",
      "lessons": [
        {
          "id": "good_enough-d23-l1",
          "title": "Læring tåler ufullkommenhet",
          "minutes": 4,
          "body": "Et læringsmål gjør feil mindre truende enn et prestasjonsmål.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å fokusere på læring",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d23-l2",
          "title": "Skriv læringspunkt",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Etter en oppgave: skriv én ting du lærte og én ting du vil justere.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Tåle usikkerhet",
      "tagline": "Du trenger ikke full garanti.",
      "lessons": [
        {
          "id": "good_enough-d24-l1",
          "title": "Sikkerhetssøking kan forlenge arbeid",
          "minutes": 4,
          "body": "Perfeksjonisme prøver ofte å få full sikkerhet før avslutning. Mange oppgaver må avsluttes med noe usikkerhet.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å tåle litt usikkerhet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d24-l2",
          "title": "Stopp med 10 prosent usikkerhet",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg en liten oppgave og stopp selv om du fortsatt kjenner litt usikkerhet.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Egen nok-standard",
      "tagline": "Skriv reglene du vil leve etter.",
      "lessons": [
        {
          "id": "good_enough-d25-l1",
          "title": "Standarder kan velges",
          "minutes": 4,
          "body": "Du kan ha høye ambisjoner uten å bruke perfeksjon som eneste standard.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å velge standarder bevisst",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d25-l2",
          "title": "Skriv tre nok-regler",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre regler for når arbeid er godt nok.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Forebygg tilbakefall",
      "tagline": "Perfeksjonisme kommer gjerne tilbake under stress.",
      "lessons": [
        {
          "id": "good_enough-d26-l1",
          "title": "Stress øker gamle mønstre",
          "minutes": 4,
          "body": "Når presset øker, kan gamle krav komme tilbake. En plan gjør det lettere å oppdage tidlig.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjenkjenne mønsteret tidlig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d26-l2",
          "title": "Varseltegn",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre tegn på at perfeksjonismen tar over, og én respons for hvert tegn.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Plan for neste måned",
      "tagline": "Fortsett med små eksperimenter.",
      "lessons": [
        {
          "id": "good_enough-d27-l1",
          "title": "Trygg øving virker over tid",
          "minutes": 4,
          "body": "Det viktigste videre er ikke mer teori, men jevnlige små godt-nok-forsøk.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre øvingen gjentakbar",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d27-l2",
          "title": "Velg ukentlig forsøk",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Planlegg én 80-prosenthandling per uke de neste fire ukene.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Avslutt og behold",
      "tagline": "Ta med deg en mildere standard.",
      "lessons": [
        {
          "id": "good_enough-d28-l1",
          "title": "Mildere kan være mer effektivt",
          "minutes": 4,
          "body": "Når presset blir lavere, blir det ofte lettere å starte, lære og avslutte.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke krav med mer fleksibilitet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "good_enough-d28-l2",
          "title": "Skriv videre-avtalen",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Jeg vil bruke høye krav der de betyr mest, og godt nok der det holder.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    }
  ],
  "stop_postponing": [
    {
      "theme": "Finn utsettelsessirkelen",
      "tagline": "Se hva som skjer før du utsetter.",
      "lessons": [
        {
          "id": "stop_postponing-d01-l1",
          "title": "Utsettelse er ofte følelsesregulering",
          "minutes": 4,
          "body": "Vi utsetter ofte for å slippe ubehag nå, selv om det gir mer ubehag senere. Å se sirkelen gjør den lettere å bryte.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å se mønsteret før du endrer det",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d01-l2",
          "title": "Skriv sirkelen",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Velg én utsatt oppgave og skriv: oppgave, følelse, flukt, kostnad.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Første synlige handling",
      "tagline": "Gjør starten konkret nok.",
      "lessons": [
        {
          "id": "stop_postponing-d02-l1",
          "title": "Start må være synlig",
          "minutes": 4,
          "body": "En oppgave som 'fikse økonomi' er for stor. En første synlig handling kan være 'åpne nettbanken'.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "At handlingen kan ses og gjøres nå",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d02-l2",
          "title": "Lag første handling",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv første fysiske eller digitale handling for én utsatt oppgave.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Fem minutter",
      "tagline": "Gjør start viktigere enn fullføring.",
      "lessons": [
        {
          "id": "stop_postponing-d03-l1",
          "title": "Kort start senker terskelen",
          "minutes": 4,
          "body": "Fem minutter er ofte nok til å bryte stillstand. Du har lov til å stoppe etterpå.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å møte opp i fem minutter",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d03-l2",
          "title": "Start i fem",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Sett timer på fem minutter og jobb bare til den ringer.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Når-så-plan",
      "tagline": "Bestem starten før situasjonen kommer.",
      "lessons": [
        {
          "id": "stop_postponing-d04-l1",
          "title": "Forhåndsvalg reduserer forhandling",
          "minutes": 4,
          "body": "Når du lager en konkret plan for situasjon og handling, blir det mindre rom for ny forhandling.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å koble situasjon til handling",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d04-l2",
          "title": "Lag én når-så",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Når klokken er ..., så skal jeg åpne ... og jobbe i fem minutter.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Navngi følelsen",
      "tagline": "Følelse er ikke ordre.",
      "lessons": [
        {
          "id": "stop_postponing-d05-l1",
          "title": "Navn gir avstand",
          "minutes": 4,
          "body": "Å sette ord på følelsen kan skape litt avstand: kjedsomhet, frykt, uklarhet, skam eller motstand.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å skille følelsen fra valget",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d05-l2",
          "title": "Ett følelsesord",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv ett ord for følelsen som dukker opp rundt oppgaven.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Gjør belønningen nær",
      "tagline": "Start trenger positivt signal.",
      "lessons": [
        {
          "id": "stop_postponing-d06-l1",
          "title": "Fjern belønning virker svakt",
          "minutes": 4,
          "body": "Hvis belønningen bare kommer langt frem i tid, kan oppstart føles meningsløs. Gi starten en liten, trygg belønning.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å belønne oppstart",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d06-l2",
          "title": "Velg startbelønning",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Bestem en liten belønning etter fem minutter: kryss, kaffe, musikk eller kort pause.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Første ukes sjekk",
      "tagline": "Hva utsetter du mest, og hvorfor?",
      "lessons": [
        {
          "id": "stop_postponing-d07-l1",
          "title": "Mønstre gir grep",
          "minutes": 4,
          "body": "Når du ser hvilke oppgaver og følelser som går igjen, kan du lage bedre startregler.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å finne mønsteret",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d07-l2",
          "title": "Finn toppmønster",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv den vanligste typen oppgave du utsetter og den vanligste følelsen.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Mental kontrast",
      "tagline": "Se både ønsket og hindringen.",
      "lessons": [
        {
          "id": "stop_postponing-d08-l1",
          "title": "Mål trenger hindringsplan",
          "minutes": 4,
          "body": "Det hjelper å se for seg ønsket resultat, men også den mest sannsynlige hindringen. Da kan du planlegge responsen.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å koble mål til hindring og handling",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d08-l2",
          "title": "Ønske-hindring-plan",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Jeg ønsker ..., hindringen er ..., når den kommer skal jeg ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Kutt oppgaven ned",
      "tagline": "Mindre oppgave, mindre unngåelse.",
      "lessons": [
        {
          "id": "stop_postponing-d09-l1",
          "title": "Størrelse skaper motstand",
          "minutes": 4,
          "body": "Store oppgaver vekker mer ubehag. En smalere oppgave er lettere å starte.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre dagens versjon mindre",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d09-l2",
          "title": "Halver oppgaven",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Ta én utsatt oppgave og gjør dagens versjon halvparten så stor.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Start uten å føle deg klar",
      "tagline": "Klarhet kan komme etter start.",
      "lessons": [
        {
          "id": "stop_postponing-d10-l1",
          "title": "Klar først er ofte felle",
          "minutes": 4,
          "body": "Hvis du må føle deg klar før du starter, kan du vente lenge. En liten start kan skape mer klarhet.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å la handling komme før følelse",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d10-l2",
          "title": "Start før klar",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gjør første handling mens du fortsatt er litt uklar eller umotivert.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Fjern én friksjon",
      "tagline": "Gjør riktig handling lettere enn flukt.",
      "lessons": [
        {
          "id": "stop_postponing-d11-l1",
          "title": "Friksjon styrer valg",
          "minutes": 4,
          "body": "Hvis flukt er ett klikk unna og oppgaven krever leting, vinner flukten ofte. Flytt balansen litt.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre starten lettere enn flukten",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d11-l2",
          "title": "Reduser friksjon",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Åpne riktig dokument, legg frem utstyr eller blokker én distraksjon før start.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Bruk sosial forpliktelse",
      "tagline": "La noen vite hva du starter.",
      "lessons": [
        {
          "id": "stop_postponing-d12-l1",
          "title": "Lett ansvar kan hjelpe",
          "minutes": 4,
          "body": "En mild forpliktelse kan gjøre start mer konkret uten å bli press.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre starten synlig for noen",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d12-l2",
          "title": "Send startmelding",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Si til noen: Jeg skal gjøre fem minutter av X nå, og melder når jeg har startet.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Ukentlig startliste",
      "tagline": "Samle første handlinger før du trenger dem.",
      "lessons": [
        {
          "id": "stop_postponing-d13-l1",
          "title": "Startlister sparer energi",
          "minutes": 4,
          "body": "Når første handling allerede er skrevet, slipper du å tenke deg inn i oppgaven hver gang.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å ha starter klare",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d13-l2",
          "title": "Lag fem starter",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv første synlige handling for fem oppgaver du ofte utsetter.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Halvveis: lær av startene",
      "tagline": "Hva fikk deg faktisk i gang?",
      "lessons": [
        {
          "id": "stop_postponing-d14-l1",
          "title": "Faktisk effekt er viktigst",
          "minutes": 4,
          "body": "Ikke alle tips virker for alle. Halvveis bør du velge det som faktisk ga handling.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å beholde det som virker",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d14-l2",
          "title": "Velg beste startgrep",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv de to grepene som oftest fikk deg i gang.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Håndter kjedsomhet",
      "tagline": "Kjedsomhet er en vanlig startbrems.",
      "lessons": [
        {
          "id": "stop_postponing-d15-l1",
          "title": "Kjedelig er ikke farlig",
          "minutes": 4,
          "body": "Mange utsatte oppgaver er ikke skumle, bare kjedelige. Da kan kort varighet og liten belønning hjelpe.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å tåle litt kjedsomhet",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d15-l2",
          "title": "Kjedelig femmer",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gjør fem minutter av en kjedelig oppgave og stopp med god samvittighet.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Håndter frykt for feil",
      "tagline": "Noen utsettelser beskytter mot vurdering.",
      "lessons": [
        {
          "id": "stop_postponing-d16-l1",
          "title": "Frykt trenger trygg test",
          "minutes": 4,
          "body": "Hvis du utsetter fordi du kan gjøre feil, kan en liten uferdig start være tryggere enn en stor leveranse.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å starte uten vurdering",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d16-l2",
          "title": "Trygg kladd",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Lag en kladd ingen andre skal se i fem minutter.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Håndter uklarhet",
      "tagline": "Uklarhet må gjøres om til spørsmål.",
      "lessons": [
        {
          "id": "stop_postponing-d17-l1",
          "title": "Spørsmål slår tåke",
          "minutes": 4,
          "body": "Når du ikke vet hva du skal gjøre, blir utsettelse lett. Et godt spørsmål kan være første handling.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre uklarhet konkret",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d17-l2",
          "title": "Skriv spørsmålet",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv det ene spørsmålet du trenger svar på for å komme videre.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Beskytt mot scrolling",
      "tagline": "Lag en stoppregel for rask flukt.",
      "lessons": [
        {
          "id": "stop_postponing-d18-l1",
          "title": "Flukt må avbrytes tidlig",
          "minutes": 4,
          "body": "Telefon og nett kan gi rask lindring. En enkel regel gjør det lettere å oppdage før du er borte lenge.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å avbryte flukten tidlig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d18-l2",
          "title": "Lag fluktregel",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: Hvis jeg åpner X under arbeid, så lukker jeg og skriver impulsen på listen.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Etter-start-effekten",
      "tagline": "Legg merke til hva som skjer etter noen minutter.",
      "lessons": [
        {
          "id": "stop_postponing-d19-l1",
          "title": "Motstand endrer seg ofte",
          "minutes": 4,
          "body": "Mange opplever at motstand er sterkest før start. Å måle følelsen før og etter kan vise dette.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å se om følelsen endrer seg",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d19-l2",
          "title": "Mål før/etter",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gi motstand 1-5 før fem minutter og etter fem minutter.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Gjør fremtidig deg en tjeneste",
      "tagline": "Koble oppgaven til senere lettelse.",
      "lessons": [
        {
          "id": "stop_postponing-d20-l1",
          "title": "Fremtidig lettelse kan motivere",
          "minutes": 4,
          "body": "Utsettelse prioriterer lettelse nå. Du kan trene på å se lettelsen du gir deg selv senere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre fremtidig nytte tydelig",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d20-l2",
          "title": "Skriv fremtidig gevinst",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: I morgen blir dette lettere fordi jeg starter med ... i dag.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Andre ukes sjekk",
      "tagline": "Finn din vanligste fluktrute.",
      "lessons": [
        {
          "id": "stop_postponing-d21-l1",
          "title": "Unngåelse har mønster",
          "minutes": 4,
          "body": "Hvis du vet hvor du vanligvis rømmer, kan du planlegge akkurat der.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å planlegge for vanligste flukt",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d21-l2",
          "title": "Kartlegg flukt",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv din vanligste fluktrute og én regel for den.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Start med en annen",
      "tagline": "Ikke vent alene hvis alene gjør det tyngre.",
      "lessons": [
        {
          "id": "stop_postponing-d22-l1",
          "title": "Sosial ramme kan senke startterskel",
          "minutes": 4,
          "body": "Noen starter lettere når de avtaler tidspunkt med andre. Det kan være stille parallelljobbing.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke ramme, ikke press",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d22-l2",
          "title": "Avtal parallellstart",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Avtal 15 minutter der du og en annen starter hver deres oppgave.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Lag oppgavekontrakt",
      "tagline": "Forplikt deg til minimum, ikke maksimum.",
      "lessons": [
        {
          "id": "stop_postponing-d23-l1",
          "title": "Små kontrakter er lettere å holde",
          "minutes": 4,
          "body": "En kontrakt bør være så liten at du faktisk kan holde den på en vanlig dag.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å forplikte seg til minste start",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d23-l2",
          "title": "Skriv kontrakt",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv: I dag forplikter jeg meg bare til ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Unngå oppryddingsfellen",
      "tagline": "Forberedelse kan bli utsettelse.",
      "lessons": [
        {
          "id": "stop_postponing-d24-l1",
          "title": "Klargjøring må ha grense",
          "minutes": 4,
          "body": "Det er lett å rydde, lese og planlegge i stedet for å starte. Sett grense for forberedelse.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å stoppe forberedelse i tide",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d24-l2",
          "title": "Maks fem min prep",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Bruk maks fem minutter på forberedelse, deretter første handling.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Egen startmanual",
      "tagline": "Samle dine beste startregler.",
      "lessons": [
        {
          "id": "stop_postponing-d25-l1",
          "title": "Personlige regler virker best",
          "minutes": 4,
          "body": "Etter noen uker vet du mer om hva som faktisk får deg i gang.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å bruke egne startdata",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d25-l2",
          "title": "Skriv manual",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv tre setninger: Når jeg utsetter, hjelper det å ..., jeg bør unngå ..., første handling er ofte ...",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Forebygg mandagsstart",
      "tagline": "Ikke vent på ny uke.",
      "lessons": [
        {
          "id": "stop_postponing-d26-l1",
          "title": "Ny start kan begynne lite nå",
          "minutes": 4,
          "body": "Å vente til mandag kan bli en del av utsettelsen. En mikrostart i dag gjør overgangen lettere.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å starte før den perfekte anledningen",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d26-l2",
          "title": "Start før ny start",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Gjør én to-minutters handling på noe du helst ville utsatt til mandag.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Plan for neste måned",
      "tagline": "Hold startferdigheten levende.",
      "lessons": [
        {
          "id": "stop_postponing-d27-l1",
          "title": "Oppstart må trenes",
          "minutes": 4,
          "body": "Du trenger ikke gjøre alt hver dag. Du trenger jevnlig trening i å starte smått.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å gjøre oppstart til en vane",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d27-l2",
          "title": "Ukentlig startøkt",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Planlegg tre 10-minutters startøkter for neste uke.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    },
    {
      "theme": "Avslutt og behold",
      "tagline": "Velg startregelen som skal følge deg videre.",
      "lessons": [
        {
          "id": "stop_postponing-d28-l1",
          "title": "En god startregel er enkel",
          "minutes": 4,
          "body": "Det beste verktøyet er det du husker når motstanden er høy.",
          "task": "Les kortteksten og skriv ett nøkkelord du vil ta med deg i dag.",
          "question": "Hva er hovedideen her?",
          "options": [
            "Å velge én regel som er lett å bruke",
            "Å vente til motivasjonen er perfekt",
            "Å gjøre alt på én gang",
            "Å bruke mer selvkritikk"
          ]
        },
        {
          "id": "stop_postponing-d28-l2",
          "title": "Skriv hovedregelen",
          "minutes": 5,
          "body": "Nå gjør du prinsippet praktisk. Velg en så liten variant at du kan gjennomføre den selv om dagen ikke er ideell.",
          "task": "Skriv én startregel du vil bruke de neste fire ukene.",
          "question": "Hva teller som fullført i dag?",
          "options": [
            "At du prøver den lille handlingen",
            "At hele problemet er løst",
            "At du gjør det perfekt",
            "At du aldri møter motstand"
          ]
        }
      ]
    }
  ]
};

export const GOALS = [
  {
    "id": "start",
    "label": "Komme lettere i gang"
  },
  {
    "id": "procrastination",
    "label": "Slutte å utsette viktige ting"
  },
  {
    "id": "focus",
    "label": "Få bedre fokus og struktur"
  },
  {
    "id": "calm",
    "label": "Få mer ro i hodet"
  },
  {
    "id": "energy",
    "label": "Bruke energien smartere"
  },
  {
    "id": "habits",
    "label": "Bygge stabile vaner"
  },
  {
    "id": "self_criticism",
    "label": "Bli mindre hard mot meg selv"
  }
];

export const BLOCKERS = [
  {
    "id": "unclear",
    "label": "Oppgaver føles uklare"
  },
  {
    "id": "overwhelm",
    "label": "Jeg blir overveldet"
  },
  {
    "id": "perfectionism",
    "label": "Jeg vil gjøre ting perfekt"
  },
  {
    "id": "distraction",
    "label": "Jeg blir lett distrahert"
  },
  {
    "id": "low_energy",
    "label": "Jeg har ofte lite energi"
  },
  {
    "id": "avoidance",
    "label": "Jeg unngår ubehagelige oppgaver"
  },
  {
    "id": "time_blind",
    "label": "Jeg mister oversikt over tid"
  }
];


const TRACK_PRIORITY = ['calm_start', 'good_enough', 'focus_structure', 'stop_postponing'];

export function getTrackKey(onboarding) {
  const goals = onboarding?.goals || [];
  const blockers = onboarding?.blockers || [];
  const energy = onboarding?.energy;

  const score = {
    calm_start: 0,
    focus_structure: 0,
    good_enough: 0,
    stop_postponing: 0
  };

  if (energy === 'lav') score.calm_start += 3;
  if (energy === 'varierer') score.calm_start += 1;

  if (goals.includes('calm')) score.calm_start += 2;
  if (goals.includes('energy')) score.calm_start += 2;
  if (goals.includes('habits')) score.calm_start += 1;
  if (goals.includes('focus')) score.focus_structure += 3;
  if (goals.includes('start')) score.stop_postponing += 2;
  if (goals.includes('procrastination')) score.stop_postponing += 3;
  if (goals.includes('self_criticism')) score.good_enough += 2;

  if (blockers.includes('low_energy')) score.calm_start += 4;
  if (blockers.includes('overwhelm')) score.calm_start += 4;
  if (blockers.includes('perfectionism')) score.good_enough += 5;
  if (blockers.includes('distraction')) score.focus_structure += 4;
  if (blockers.includes('time_blind')) score.focus_structure += 3;
  if (blockers.includes('unclear')) score.stop_postponing += 3;
  if (blockers.includes('avoidance')) score.stop_postponing += 4;

  return TRACK_PRIORITY
    .map((key) => ({ key, value: score[key] }))
    .sort((a, b) => b.value - a.value)[0].key;
}

export function getTrackMeta(onboarding) {
  const key = getTrackKey(onboarding);
  return { key, ...TRACKS[key] };
}

export function getProgramDays(onboarding) {
  return PROGRAMS[getTrackKey(onboarding)] || PROGRAMS.stop_postponing;
}

export function getProgramLessonIds(onboarding) {
  return getProgramDays(onboarding).flatMap((day) => day.lessons.map((lesson) => lesson.id));
}

export function getFilteredCompletions(onboarding, completions = []) {
  const ids = new Set(getProgramLessonIds(onboarding));
  return completions.filter((completion) => ids.has(completion.lesson_key));
}

export function getPlanSummary(onboarding) {
  const meta = getTrackMeta(onboarding);
  return {
    key: meta.key,
    label: meta.name,
    shortName: meta.shortName,
    description: meta.description,
    whyThisFits: meta.whyTemplate,
    basis: meta.basis,
    recommendations: meta.recommendations,
    maintenance: meta.maintenance
  };
}

export function getSuggestedJournalPrompts(onboarding) {
  return getTrackMeta(onboarding).journalPrompts;
}

export function getMaintenanceItems(onboarding) {
  return getTrackMeta(onboarding).maintenance;
}
