import type { Locale } from "./i18n";

export const site = {
  name: "La Marquise",
  tagline: "Restaurant & Lounge · Douala",
  descriptionBilingual: {
    en: "A beloved restaurant & lounge in Bonapriso, Douala. Two floors — a cosy fast-food downstairs and an upscale gastronomic restaurant upstairs — serving Cameroonian, Lebanese, Italian, French, Mediterranean & international cuisine in the heart of the economic capital.",
    fr: "Un restaurant & lounge ador\u00e9 \u00e0 Bonapriso, Douala. Deux \u00e9tages \u2014 un fast-food cosy au rez-de-chauss\u00e9e et un restaurant gastronomique haut de gamme \u00e0 l'\u00e9tage \u2014 proposant une cuisine camerounaise, libanaise, italienne, fran\u00e7aise, m\u00e9diterran\u00e9enne et internationale au c\u0153ur de la capitale \u00e9conomique.",
  },
  address: {
    street: "Rue Tokoto, Bonapriso",
    area: "Next to Croissanterie Total",
    city: "Douala",
    region: "Littoral Region",
    country: "Cameroon",
  },
  geo: { lat: 4.025167, lng: 9.697593 },
  phone: "+237 698 434 343",
  phoneAlt: ["+237 670 858 585", "+237 674 730 000"],
  email: "lamarquisedouala@gmail.com",
  delivery: "+237 698 434 343",
  hours: [
    { day: "Monday", open: "09:00", close: "23:00" },
    { day: "Tuesday", open: "09:00", close: "23:00" },
    { day: "Wednesday", open: "09:00", close: "23:00" },
    { day: "Thursday", open: "09:00", close: "23:00" },
    { day: "Friday", open: "09:00", close: "23:00" },
    { day: "Saturday", open: "10:00", close: "23:00" },
    { day: "Sunday", open: "09:00", close: "23:00" },
  ],
  cuisinesBilingual: {
    en: ["Cameroonian", "Italian", "French", "Lebanese", "Mediterranean", "Asian", "International"],
    fr: ["Camerounaise", "Italienne", "Fran\u00e7aise", "Libanaise", "M\u00e9diterran\u00e9enne", "Asiatique", "Internationale"],
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=La+Marquise+Restaurant+Bonapriso+Douala",
  instagram: "https://www.instagram.com/explore/tags/lamarquisedouala",
  facebook: "https://www.facebook.com/lamarquisedouala",
} as const;

export const heroImages = {
  hero: "https://images.pexels.com/photos/37968303/pexels-photo-37968303.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  heroMobile: "https://images.pexels.com/photos/37968303/pexels-photo-37968303.jpeg?auto=compress&cs=tinysrgb&w=750&h=1100&fit=crop",
};

export const imageUrls = {
  gastronomic: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
  lounge: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
  gambas: "https://images.pexels.com/photos/38461299/pexels-photo-38461299.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  meze: "https://images.pexels.com/photos/14930656/pexels-photo-14930656.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  grilled: "https://images.pexels.com/photos/28321266/pexels-photo-28321266.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  cocktails: "https://images.pexels.com/photos/33231324/pexels-photo-33231324.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  dessert: "https://images.pexels.com/photos/29405077/pexels-photo-29405077.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  family: "https://images.pexels.com/photos/5083910/pexels-photo-5083910.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  tableTwo: "https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  wine: "https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
} as const;

type LocalizedText = { en: string; fr: string };

const localized = (en: string, fr: string): LocalizedText => ({ en, fr });

// ---- Bilingual menu data ----
type MenuItem = { name: LocalizedText; desc: LocalizedText; price: string };
type GastronomicCategory = { category: LocalizedText; items: MenuItem[] };

const gastronomicBilingual: GastronomicCategory[] = [
  {
    category: localized("To begin", "Pour commencer"),
    items: [
      { name: localized("Mezze La Marquise", "Mezze La Marquise"), desc: localized("Hummus, moutabal, falafel, pita & olives — the guest favourite", "Houmous, moutabal, falafels, pita & olives — le favori des clients"), price: "6 500 FCFA" },
      { name: localized("Crevettes grillées", "Crevettes grillées"), desc: localized("Flame-grilled jumbo prawns, garlic butter & herbs", "Grosses crevettes grillées, beurre à l'ail & fines herbes"), price: "9 500 FCFA" },
      { name: localized("Ngond'ba (mfoundé)", "Ngond'ba (mfoundé)"), desc: localized("Traditional Cameroonian green stew with basmati rice", "Ragoût vert traditionnel camerounais au riz basmati"), price: "8 000 FCFA" },
    ],
  },
  {
    category: localized("From the fire", "Au feu"),
    items: [
      { name: localized("Gambas La Marquise", "Gambas La Marquise"), desc: localized("Signature jumbo prawns served on a lively biryani", "Grosses crevettes signatures servies sur un biryani relevé"), price: "15 000 FCFA" },
      { name: localized("Roulade de poulet", "Roulade de poulet"), desc: localized("Stuffed chicken roulade, roast vegetables & jus", "Roulade de poulet farcie, légumes rôtis & jus"), price: "12 500 FCFA" },
      { name: localized("Brochette de bœuf", "Brochette de bœuf"), desc: localized("Char-grilled beef skewers, house sauce & fries", "Brochettes de bœuf grillées, sauce maison & frites"), price: "11 000 FCFA" },
      { name: localized("Poulet Alfredo", "Poulet Alfredo"), desc: localized("Grilled chicken, tagliatelle & creamy parmesan sauce", "Poulet grillé, tagliatelles & sauce crémeuse au parmesan"), price: "12 000 FCFA" },
    ],
  },
  {
    category: localized("Something sweet", "Côté sucré"),
    items: [
      { name: localized("Fondant chocolat", "Fondant chocolat"), desc: localized("Warm chocolate fondant, vanilla cream", "Fondant au chocolat tiède, crème vanillée"), price: "7 000 FCFA" },
      { name: localized("Dessert de saison", "Dessert de saison"), desc: localized("Ask about today's seasonal creation", "Demandez la création de saison du jour"), price: "6 000 FCFA" },
    ],
  },
];

const fastfoodBilingual: MenuItem[] = [
  { name: localized("Gambas grillées", "Gambas grillées"), desc: localized("Grilled prawns with fries & salad", "Crevettes grillées avec frites & salade"), price: "8 000 FCFA" },
  { name: localized("Poulet & frites", "Poulet & frites"), desc: localized("Crispy chicken, golden fries", "Poulet croustillant, frites dorées"), price: "5 500 FCFA" },
  { name: localized("Brochettes", "Brochettes"), desc: localized("Beef or chicken skewers, choice of sides", "Brochettes de bœuf ou de poulet, accompagnements au choix"), price: "4 500 FCFA" },
  { name: localized("Dodo & alloco", "Dodo & alloco"), desc: localized("Sweet fried plantain, spicy dip", "Plantain sucré frit, sauce épicée"), price: "3 500 FCFA" },
  { name: localized("Burgers & wraps", "Burgers & wraps"), desc: localized("House-made, with fries & drink", "Fait maison, avec frites & boisson"), price: "6 000 FCFA" },
];

const barBilingual: MenuItem[] = [
  { name: localized("Cocktails", "Cocktails"), desc: localized("Classics & La Marquise signature creations", "Classiques & créations signatures La Marquise"), price: "from 5 000 FCFA / dès 5 000 FCFA" },
  { name: localized("Mocktails", "Mocktails"), desc: localized("Zero-proof, fresh & fruity", "Sans alcool, frais & fruités"), price: "from 3 500 FCFA / dès 3 500 FCFA" },
  { name: localized("Liquors", "Liqueurs"), desc: localized("A curated selection from around the world", "Une sélection choisie du monde entier"), price: "on request / sur demande" },
  { name: localized("Chicha", "Chicha"), desc: localized("Available at the restaurant lounge", "Disponible au lounge du restaurant"), price: "on request / sur demande" },
  { name: localized("Softs & juices", "Sodas & jus"), desc: localized("Sodas, fresh fruit juices & smoothies", "Sodas, jus de fruits frais & smoothies"), price: "from 1 500 FCFA / dès 1 500 FCFA" },
];

// ---- Bilingual services ----
export type Service = { icon: string; title: LocalizedText; desc: LocalizedText };

export const servicesBilingual: Service[] = [
  { icon: "utensils", title: localized("Gastronomic restaurant", "Restaurant gastronomique"), desc: localized("Upscale dining upstairs — set lunches, business dinners & romantic evenings.", "Déjeuners, dîners d'affaires & soirées romantiques à l'étage, dans un cadre haut de gamme.") },
  { icon: "burger", title: localized("Fast-food & family", "Fast-food & famille"), desc: localized("Cosy wood decor, a relaxed menu & a play area for the little ones.", "Décor bois cosy, menu décontracté & aire de jeux pour les enfants.") },
  { icon: "party", title: localized("Events & celebrations", "Événements & célébrations"), desc: localized("Birthdays, silver jubilees, engagements & private parties.", "Anniversaires, jubilés, fiançailles & fêtes privées.") },
  { icon: "cocktail", title: localized("Bar & lounge", "Bar & lounge"), desc: localized("Cocktails, mocktails, global liquors & chicha in the evenings.", "Cocktails, mocktails, liqueurs du monde & chicha le soir.") },
  { icon: "delivery", title: localized("Delivery & takeaway", "Livraison & emporté"), desc: localized("Order ahead and enjoy La Marquise wherever you are.", "Commandez à l'avance et savourez La Marquise où que vous soyez.") },
  { icon: "access", title: localized("Accessibility", "Accessibilité"), desc: localized("Wheelchair-friendly access, street parking & moto parking.", "Accès adapté, stationnement rue & moto.") },
];

// ---- Bilingual FAQs ----
export type Faq = { q: LocalizedText; a: LocalizedText };

export const faqsBilingual: Faq[] = [
  {
    q: localized("Where is La Marquise located?", "Où se trouve La Marquise ?"),
    a: localized("We're at Rue Tokoto, Bonapriso, Douala — next to Croissanterie Total, right in the heart of the city.", "Nous sommes Rue Tokoto, Bonapriso, Douala — à côté de Croissanterie Total, au cœur de la ville."),
  },
  {
    q: localized("Can I reserve in advance?", "Puis-je réserver à l'avance ?"),
    a: localized("Yes. Reservations are welcome and recommended for weekends and groups. Call +237 698 434 343 or use the form on this page.", "Oui. Les réservations sont les bienvenues et recommandées pour les week-ends et les groupes. Appelez le +237 698 434 343 ou utilisez le formulaire de cette page."),
  },
  {
    q: localized("What type of cuisine do you serve?", "Quel type de cuisine servez-vous ?"),
    a: localized("We offer Cameroonian classics alongside Lebanese, Italian, French, Mediterranean, Asian and international dishes — plus excellent cocktails and drinks.", "Nous proposons des classiques camerounais, ainsi que des plats libanais, italiens, français, méditerranéens, asiatiques et internationaux — plus d'excellents cocktails et boissons."),
  },
  {
    q: localized("Are children welcome?", "Les enfants sont-ils les bienvenus ?"),
    a: localized("Absolutely. Our fast-food level has a cosy, family-friendly atmosphere and a play area, perfect for families and groups.", "Absolument. Notre niveau fast-food a une ambiance familiale cosy et une aire de jeux, idéale pour les familles et les groupes."),
  },
  {
    q: localized("What are your opening hours?", "Quels sont vos horaires d'ouverture ?"),
    a: localized("We're open Monday–Friday and Sunday from 09:00 to 23:00, and Saturday from 10:00 to 23:00.", "Nous sommes ouverts du lundi au vendredi et le dimanche de 9h00 à 23h00, et le samedi de 10h00 à 23h00."),
  },
  {
    q: localized("Do you offer delivery or takeaways?", "Proposez-vous la livraison ou l'emporté ?"),
    a: localized("Yes — we offer takeaways and delivery. Call +237 698 434 343 to place an order.", "Oui — nous proposons l'emporté et la livraison. Appelez le +237 698 434 343 pour passer commande."),
  },
  {
    q: localized("How can I pay?", "Comment puis-je payer ?"),
    a: localized("We accept cash and mobile money for your convenience.", "Nous acceptons les espèces et l'argent mobile pour votre confort."),
  },
];

// ---- Localized accessor helpers ----
export function pick<T>(value: { en: T; fr: T }, locale: Locale): T {
  return value[locale];
}

export function getCuisines(locale: Locale): string[] {
  return [...site.cuisinesBilingual[locale]];
}

type MenuEntry = { name: string; desc: string; price: string };
type MenuCategory = { category: string; items: MenuEntry[] };

export function getMenu(locale: Locale): { gastronomic: MenuCategory[]; fastfood: MenuEntry[]; bar: MenuEntry[] } {
  return {
    gastronomic: gastronomicBilingual.map((cat) => ({
      category: pick(cat.category, locale),
      items: cat.items.map((item) => ({ name: pick(item.name, locale), desc: pick(item.desc, locale), price: item.price })),
    })),
    fastfood: fastfoodBilingual.map((item) => ({ name: pick(item.name, locale), desc: pick(item.desc, locale), price: item.price })),
    bar: barBilingual.map((item) => ({ name: pick(item.name, locale), desc: pick(item.desc, locale), price: item.price })),
  };
}

export function getServices(locale: Locale): { icon: string; title: string; desc: string }[] {
  return servicesBilingual.map((s) => ({ icon: s.icon, title: pick(s.title, locale), desc: pick(s.desc, locale) }));
}

export function getFaqs(locale: Locale): { q: string; a: string }[] {
  return faqsBilingual.map((f) => ({ q: pick(f.q, locale), a: pick(f.a, locale) }));
}
