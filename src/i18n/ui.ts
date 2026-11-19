import type { Lang } from './routes';

// Texte aus dem Entwurf der Startseite. Alles darüber
// hinaus ist Entwurf und wird vor Veröffentlichung redaktionell geprüft.
const de = {
  meta: {
    homeTitle: 'Anthony Bánh Mì – Vietnamesische Sandwiches & Kaffee',
    homeDescription:
      'Anthony Bánh Mì: frische Zutaten, authentische Aromen und moderne Café-Kultur. Speisekarte, Standorte und Kontakt.',
  },
  seo: {
    menu: {
      title: 'Speisekarte: Bánh mì, Kaffee & Getränke',
      description:
        'Die Speisekarte von Anthony Bánh Mì: Bánh mì mit Hähnchen, Schwein, Ei oder Tofu, dazu vietnamesischer Kaffee, Matcha, hausgemachte Eistees und vegane Auswahl.',
    },
    locations: {
      title: 'Standorte & Öffnungszeiten',
      description:
        'Alle Standorte von Anthony Bánh Mì mit Adresse, Öffnungszeiten und Route. Finde deinen nächsten Laden für Bánh mì und Kaffee.',
    },
    about: {
      title: 'Über uns: Geschichte & Konzept',
      description:
        'Wer hinter Anthony Bánh Mì steht: unsere Geschichte, unser Konzept und was uns antreibt. Frische Zutaten, authentische Rezepte, moderne Café-Kultur.',
    },
    franchise: {
      title: 'Franchise: Anthony Bánh Mì in deine Stadt',
      description:
        'Gemeinsam wachsen: Informationen zum Franchise-Konzept von Anthony Bánh Mì, zu den Voraussetzungen und zum Kontakt für Interessierte.',
    },
    careers: {
      title: 'Karriere & Jobs',
      description: 'Werde Teil des Teams von Anthony Bánh Mì: offene Stellen, Bewerbungsweg und Kontakt.',
    },
    contact: {
      title: 'Kontakt',
      description: 'So erreichst du Anthony Bánh Mì: E-Mail, Telefon und Standorte für Fragen und Lob.',
    },
    imprint: { title: 'Impressum', description: 'Impressum von Anthony Bánh Mì: Anbieterkennzeichnung und Kontakt.' },
    privacy: {
      title: 'Datenschutzerklärung',
      description: 'Datenschutzerklärung von Anthony Bánh Mì: keine Cookies, kein Tracking, Informationen zu deinen Rechten.',
    },
  },
  a11y: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    closeMenu: 'Menü schließen',
    mainNav: 'Hauptnavigation',
    footerNav: 'Rechtliches',
    langSwitch: 'Sprache wählen',
    homeSuffix: '(zur Startseite)',
    breadcrumb: 'Brotkrumen',
  },
  nav: {
    menu: 'Speisekarte',
    menuAll: 'Gesamte Speisekarte',
    locations: 'Standorte',
    locationsAll: 'Alle Standorte',
    about: 'Über uns',
    aboutStory: 'Unsere Geschichte',
    aboutConcept: 'Unser Konzept',
    franchise: 'Franchise',
    careers: 'Karriere',
    contact: 'Kontakt',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
  home: {
    eyebrow: 'Vietnamese Sandwich House',
    title: ['Ehrlich.', 'Vietnamesisch.', 'Besonders.'],
    lead: 'Frische Zutaten, authentische Aromen und moderne Café-Kultur. Willkommen bei Anthony Bánh Mì.',
    cta: 'Speisekarte entdecken',
    heroAlt: 'Bánh mì mit Hähnchen, eingelegtem Gemüse, Gurke, Koriander und Chili auf einem Teller',
    categoriesTitle: 'Unsere Speisekarte',
    locationsTitle: 'Standorte',
    locationsText: 'Finde deinen nächsten Anthony Bánh Mì.',
    locationsCta: 'Standortfinder',
    aboutTitle: 'Über uns',
    aboutText: 'Unsere Geschichte, unser Konzept und was uns antreibt.',
    aboutCta: 'Mehr erfahren',
    careersTitle: 'Karriere',
    careersText: 'Werde Teil unseres Teams.',
    careersCta: 'Jetzt bewerben',
    franchiseTitle: 'Franchise',
    franchiseText: ['Gemeinsam wachsen.', 'Bring Anthony Bánh Mì in deine Stadt.'],
    franchiseCta: 'Mehr erfahren',
    valuesTitle: 'Wofür wir stehen',
    values: {
      fresh: 'Frische Zutaten',
      authentic: 'Authentische Rezepte',
      cafe: 'Moderne Café-Kultur',
      sustainable: 'Nachhaltiges Handeln',
    },
  },
  menu: {
    title: 'Speisekarte',
    lead: 'Bánh mì, Kaffee und mehr.',
    photoSoon: 'Foto folgt',
    price: 'Preis',
    priceNote: 'Alle Preise in Euro inkl. MwSt.',
    allergens: 'Allergene und Zusatzstoffe',
    allergensNone: 'keine kennzeichnungspflichtigen',
    extras: 'Aufpreis',
    tags: { klassisch: 'Klassisch', vegan: 'Vegan', vegetarisch: 'Vegetarisch', suess: 'Süß', scharf: 'Scharf' },
  },
  locations: {
    title: 'Standorte',
    lead: 'Finde deinen nächsten Anthony Bánh Mì.',
    address: 'Adresse',
    hours: 'Öffnungszeiten',
    phone: 'Telefon',
    email: 'E-Mail',
    map: 'Route planen',
    mapNote: 'öffnet externe Kartenseite',
  },
  about: {
    title: 'Über uns',
    lead: 'Unsere Geschichte, unser Konzept und was uns antreibt.',
    story: 'Unsere Geschichte',
    concept: 'Unser Konzept',
    portraitAlt: 'Gezeichnetes Porträt von Anthony, Gründer von Anthony Bánh Mì',
  },
  franchise: {
    title: 'Franchise',
    lead: 'Gemeinsam wachsen. Bring Anthony Bánh Mì in deine Stadt.',
    concept: 'Das Konzept',
    requirements: 'Was du mitbringst',
    contact: 'Kontakt aufnehmen',
  },
  careers: {
    title: 'Karriere',
    lead: 'Werde Teil unseres Teams.',
    jobs: 'Offene Stellen',
    apply: 'So bewirbst du dich',
  },
  contact: {
    title: 'Kontakt',
    lead: 'Fragen oder Lob: schreib uns.',
    write: 'E-Mail schreiben',
    call: 'Anrufen',
  },
  legal: {
    imprintTitle: 'Impressum',
    privacyTitle: 'Datenschutzerklärung',
  },
  footer: {
    rights: 'Alle Rechte vorbehalten.',
  },
  related: {
    title: 'Mehr entdecken',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    text: 'Diese Seite gibt es nicht (mehr).',
    back: 'Zur Startseite',
  },
};

type Dict = typeof de;

const en: Dict = {
  meta: {
    homeTitle: 'Anthony Bánh Mì – Vietnamese Sandwich House',
    homeDescription:
      'Anthony Bánh Mì: fresh ingredients, authentic flavours and modern café culture. Menu, locations and contact.',
  },
  seo: {
    menu: {
      title: 'Menu: bánh mì, coffee & drinks',
      description:
        'The Anthony Bánh Mì menu: bánh mì with chicken, pork, egg or tofu, plus Vietnamese coffee, matcha, homemade iced teas and a vegan selection.',
    },
    locations: {
      title: 'Locations & opening hours',
      description:
        'All Anthony Bánh Mì locations with address, opening hours and directions. Find your nearest shop for bánh mì and coffee.',
    },
    about: {
      title: 'About us: story & concept',
      description:
        'Who is behind Anthony Bánh Mì: our story, our concept and what drives us. Fresh ingredients, authentic recipes, modern café culture.',
    },
    franchise: {
      title: 'Franchise: bring Anthony Bánh Mì to your city',
      description:
        'Grow together: information on the Anthony Bánh Mì franchise concept, requirements and how to get in touch.',
    },
    careers: {
      title: 'Careers & jobs',
      description: 'Join the Anthony Bánh Mì team: open positions, how to apply and contact.',
    },
    contact: {
      title: 'Contact',
      description: 'How to reach Anthony Bánh Mì: email, phone and locations for questions and feedback.',
    },
    imprint: { title: 'Legal notice', description: 'Legal notice of Anthony Bánh Mì: provider information and contact.' },
    privacy: {
      title: 'Privacy policy',
      description: 'Privacy policy of Anthony Bánh Mì: no cookies, no tracking, information about your rights.',
    },
  },
  a11y: {
    skip: 'Skip to content',
    menu: 'Menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    footerNav: 'Legal',
    langSwitch: 'Choose language',
    homeSuffix: '(home)',
    breadcrumb: 'Breadcrumb',
  },
  nav: {
    menu: 'Menu',
    menuAll: 'Full menu',
    locations: 'Locations',
    locationsAll: 'All locations',
    about: 'About us',
    aboutStory: 'Our story',
    aboutConcept: 'Our concept',
    franchise: 'Franchise',
    careers: 'Careers',
    contact: 'Contact',
    imprint: 'Legal notice',
    privacy: 'Privacy',
  },
  home: {
    eyebrow: 'Vietnamese Sandwich House',
    title: ['Honest.', 'Vietnamese.', 'Special.'],
    lead: 'Fresh ingredients, authentic flavours and modern café culture. Welcome to Anthony Bánh Mì.',
    cta: 'Discover the menu',
    heroAlt: 'Chicken bánh mì with pickled vegetables, cucumber, coriander and chilli on a plate',
    categoriesTitle: 'Our menu',
    locationsTitle: 'Locations',
    locationsText: 'Find your nearest Anthony Bánh Mì.',
    locationsCta: 'Store finder',
    aboutTitle: 'About us',
    aboutText: 'Our story, our concept and what drives us.',
    aboutCta: 'Learn more',
    careersTitle: 'Careers',
    careersText: 'Join our team.',
    careersCta: 'Apply now',
    franchiseTitle: 'Franchise',
    franchiseText: ['Grow together.', 'Bring Anthony Bánh Mì to your city.'],
    franchiseCta: 'Learn more',
    valuesTitle: 'What we stand for',
    values: {
      fresh: 'Fresh ingredients',
      authentic: 'Authentic recipes',
      cafe: 'Modern café culture',
      sustainable: 'Sustainable business',
    },
  },
  menu: {
    title: 'Menu',
    lead: 'Bánh mì, coffee and more.',
    photoSoon: 'Photo coming soon',
    price: 'Price',
    priceNote: 'All prices in euros incl. VAT.',
    allergens: 'Allergens and additives',
    allergensNone: 'none requiring declaration',
    extras: 'Extra charge',
    tags: { klassisch: 'Classic', vegan: 'Vegan', vegetarisch: 'Vegetarian', suess: 'Sweet', scharf: 'Spicy' },
  },
  locations: {
    title: 'Locations',
    lead: 'Find your nearest Anthony Bánh Mì.',
    address: 'Address',
    hours: 'Opening hours',
    phone: 'Phone',
    email: 'Email',
    map: 'Get directions',
    mapNote: 'opens external map site',
  },
  about: {
    title: 'About us',
    lead: 'Our story, our concept and what drives us.',
    story: 'Our story',
    concept: 'Our concept',
    portraitAlt: 'Drawn portrait of Anthony, founder of Anthony Bánh Mì',
  },
  franchise: {
    title: 'Franchise',
    lead: 'Grow together. Bring Anthony Bánh Mì to your city.',
    concept: 'The concept',
    requirements: 'What you bring',
    contact: 'Get in touch',
  },
  careers: {
    title: 'Careers',
    lead: 'Join our team.',
    jobs: 'Open positions',
    apply: 'How to apply',
  },
  contact: {
    title: 'Contact',
    lead: 'Questions or feedback: write to us.',
    write: 'Send an email',
    call: 'Call us',
  },
  legal: {
    imprintTitle: 'Legal notice',
    privacyTitle: 'Privacy policy',
  },
  footer: {
    rights: 'All rights reserved.',
  },
  related: {
    title: 'Discover more',
  },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist (any more).',
    back: 'Back to home',
  },
};

const dicts: Record<Lang, Dict> = { de, en };
export const useT = (lang: Lang) => dicts[lang];
