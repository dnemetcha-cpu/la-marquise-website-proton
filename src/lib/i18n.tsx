"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Locale = "en" | "fr";

type Dict = Record<string, string>;

const en: Dict = {
  // Top bar
  "top.openToday": "Open today until 23:00",
  // Nav
  "nav.story": "Our story",
  "nav.menus": "Menus",
  "nav.visit": "Plan your visit",
  "nav.services": "Services",
  "nav.faq": "FAQ",
  "nav.call": "Call",
  "nav.book": "Book a table",
  // Hero
  "hero.tagline": "Since 1989 · Bonapriso · Douala",
  "hero.title1": "La Marquise.",
  "hero.title2": "Where Douala",
  "hero.title3": "comes to dine.",
  "hero.text":
    "Two unforgettable experiences under one roof — a cosy fast-food & play area downstairs, and an upscale gastronomic restaurant & lounge upstairs.",
  "hero.book": "Book a table",
  "hero.menu": "View the menu",
  "hero.score": "88% recommend",
  "hero.hours": "Open 7 days",
  "hero.location": "Rue Tokoto, Bonapriso",
  "hero.discover": "Discover",
  // Quick links
  "quick.gastro": "Gastronomic menu",
  "quick.fastfood": "Fast-food",
  "quick.hours": "Opening hours",
  "quick.events": "Events & bookings",
  // Story
  "story.eyebrow": "Our story",
  "story.title": "Two floors of flavour in the heart of the city.",
  "story.p1":
    "La Marquise is a beloved dining destination in Bonapriso. Downstairs, our fast-food welcomes families and friends with a cosy wood d\u00e9cor and a play area. Upstairs, the gastronomic restaurant offers intimate lunches, business dinners and romantic evenings.",
  "story.p2":
    "Our kitchen celebrates Cameroon while embracing the world \u2014 Lebanese mezzes, Italian pastas, French classics, Mediterranean dishes and international favourites, all served with warmth and style.",
  "story.metric1big": "2",
  "story.metric1small": "floors under one roof",
  "story.metric2big": "7",
  "story.metric2small": "cuisines celebrated",
  "story.metric3big": "5\u2605",
  "story.metric3small": "consistent reviews",
  // Menu
  "menu.eyebrow": "The Menus",
  "menu.title": "Food you'll <em>remember.</em>",
  "menu.text":
    "From hearty fast-food platters to refined gastronomic dishes and signature cocktails \u2014 there's a table for every appetite.",
  "menu.gastronomic": "Gastronomic",
  "menu.fastfood": "Fast-food",
  "menu.bar": "Bar & Lounge",
  "menu.toBegin": "To begin",
  "menu.fromFire": "From the fire",
  "menu.dessert": "Something sweet",
  "menu.full": "Full menu",
  "menu.note": "Prices are indicative · Seasonal menu changes daily · Complimentary dessert while you wait.",
  // Signature
  "sig.eyebrow": "Signature dishes",
  "sig.title": "Don't miss <em>these.</em>",
  "sig.guests": "Guest favourite",
  "sig.classic": "House classic",
  "sig.bar": "Bar & lounge",
  "sig.finish": "To finish",
  "sig.name1": "Gambas La Marquise",
  "sig.desc1": "Jumbo grilled prawns served on a lively, spiced biryani.",
  "sig.name2": "Mezzes & pita",
  "sig.desc2": "Hummus, moutabal, falafel and warm pita — widely loved.",
  "sig.name3": "Signature cocktails",
  "sig.desc3": "Fresh cocktails, mocktails and a global selection of liquors.",
  "sig.name4": "Dessert of the season",
  "sig.desc4": "End on a sweet note with a fresh creation from the patisserie.",
  // Info
  "info.eyebrow": "Plan your visit",
  "info.title": "Everything you need <em>to know.</em>",
  "info.hours": "Opening hours",
  "info.find": "Find us",
  "info.contact": "Contact",
  "info.good": "Good to know",
  "info.gastroCard": "Gastronomic restaurant",
  "info.directions": "Get directions",
  "info.callNow": "Call now",
  "info.things1": "Wheelchair access",
  "info.things2": "Cash & mobile money accepted",
  "info.things3": "Delivery & takeaway",
  "info.things4": "Street & moto parking",
  "info.things5": "Family & play area",
  "info.allServices": "All services",
  "day.Monday": "Monday",
  "day.Tuesday": "Tuesday",
  "day.Wednesday": "Wednesday",
  "day.Thursday": "Thursday",
  "day.Friday": "Friday",
  "day.Saturday": "Saturday",
  "day.Sunday": "Sunday",
  // Services
  "services.eyebrow": "What we offer",
  "services.title": "Services made <em>simple.</em>",
  "services.text": "Everything from a quick family lunch to a lavish evening celebration — all in one beloved address.",
  // Testimonials
  "testimonial.eyebrow": "Kind words",
  // FAQ
  "faq.eyebrow": "Questions?",
  "faq.title": "Good to <em>know.</em>",
  // CTA
  "cta.eyebrow": "Make it an evening",
  "cta.title": "Your table is <em>waiting.</em>",
  "cta.text":
    "Reserve by phone or send us a booking request and we'll take care of the rest. For same-day tables, calling is fastest.",
  "cta.book": "Request a reservation",
  // Footer
  "footer.explore": "Explore",
  "footer.contact": "Contact",
  "footer.find": "Find us",
  "footer.directions": "Get directions",
  "footer.delivery": "Delivery",
  "footer.follow": "Follow us",
  "footer.rights": "All rights reserved.",
  "footer.back": "Back to top",
  // Booking modal
  "book.eyebrow": "La Marquise · Bonapriso",
  "book.title": "Reserve <em>your table.</em>",
  "book.text":
    "Tell us when you'd like to dine. For same-day bookings, call {phone} — it's fastest.",
  "book.name": "Full name",
  "book.phone": "Phone number",
  "book.email": "Email address",
  "book.guests": "Number of guests",
  "book.date": "Date",
  "book.time": "Time",
  "book.level": "Level",
  "book.level.gastro": "Gastronomic restaurant (upstairs)",
  "book.level.fastfood": "Fast-food & family (downstairs)",
  "book.level.event": "Event / celebration",
  "book.occasion": "Occasion",
  "book.optional": "(optional)",
  "book.note": "A note for us",
  "book.placeholder.occasion": "Birthday, business dinner, date night...",
  "book.placeholder.note": "Anything we should know?",
  "book.submit": "Request my table",
  "book.submitting": "Sending request...",
  "book.footnote": "No charge to reserve · We confirm by phone or email · Complimentary dessert while you wait.",
  "book.success.eyebrow": "You're on the list",
  "book.success.title": "See you <em>soon.</em>",
  "book.success.text": "Thank you for choosing La Marquise. We'll confirm your reservation by phone or email.",
  "book.success.call": "Call if in a hurry",
  "book.success.done": "Done",
  "book.error": "We couldn't send that just now — please call {phone}.",
  "guests.1": "1 guest",
  "guests.2": "2 guests",
  "guests.3": "3 guests",
  "guests.4": "4 guests",
  "guests.5": "5 guests",
  "guests.6": "6+ guests",
  "aria.close": "Close",
};

const fr: Dict = {
  "top.openToday": "Ouvert aujourd'hui jusqu'\u00e0 23h00",
  "nav.story": "Notre histoire",
  "nav.menus": "Menus",
  "nav.visit": "Planifiez votre visite",
  "nav.services": "Services",
  "nav.faq": "FAQ",
  "nav.call": "Appeler",
  "nav.book": "R\u00e9server",
  "hero.tagline": "Depuis 1989 · Bonapriso · Douala",
  "hero.title1": "La Marquise.",
  "hero.title2": "L\u00e0 o\u00f9 Douala",
  "hero.title3": "vient d\u00eener.",
  "hero.text":
    "Deux exp\u00e9riences inoubliables sous un m\u00eame toit \u2014 un fast-food cosy avec espace de jeux au rez-de-chauss\u00e9e, et un restaurant gastronomique & lounge haut de gamme \u00e0 l'\u00e9tage.",
  "hero.book": "R\u00e9server une table",
  "hero.menu": "Voir le menu",
  "hero.score": "88 % de recommandations",
  "hero.hours": "Ouvert 7 jours",
  "hero.location": "Rue Tokoto, Bonapriso",
  "hero.discover": "D\u00e9couvrir",
  "quick.gastro": "Menu gastronomique",
  "quick.fastfood": "Fast-food",
  "quick.hours": "Horaires",
  "quick.events": "\u00c9v\u00e9nements & r\u00e9servations",
  "story.eyebrow": "Notre histoire",
  "story.title": "Deux \u00e9tages de saveurs au c\u0153ur de la ville.",
  "story.p1":
    "La Marquise est une adresse culinaire ador\u00e9e de Bonapriso. Au rez-de-chauss\u00e9e, notre fast-food accueille familles et amis dans un d\u00e9cor bois\u00e9 cosy avec une aire de jeux. \u00c0 l'\u00e9tage, le restaurant gastronomique propose d\u00e9jeuners intimes, repas d'affaires et soir\u00e9es romantiques.",
  "story.p2":
    "Notre cuisine c\u00e9l\u00e8bre le Cameroun tout en embrassant le monde \u2014 mezz\u00e9s libanais, p\u00e2tes italiennes, classiques fran\u00e7ais, mets m\u00e9diterran\u00e9ens et plats internationaux, le tout servi avec chaleur et style.",
  "story.metric1big": "2",
  "story.metric1small": "\u00e9tages sous un m\u00eame toit",
  "story.metric2big": "7",
  "story.metric2small": "cuisines c\u00e9l\u00e9br\u00e9es",
  "story.metric3big": "5\u2605",
  "story.metric3small": "avis constants",
  "menu.eyebrow": "Les menus",
  "menu.title": "Une cuisine que vous <em>n'oublierez pas.</em>",
  "menu.text":
    "Des plats de fast-food copieux aux cr\u00e9ations gastronomiques raffin\u00e9es et aux cocktails signatures \u2014 une table pour chaque envie.",
  "menu.gastronomic": "Gastronomique",
  "menu.fastfood": "Fast-food",
  "menu.bar": "Bar & Lounge",
  "menu.toBegin": "Pour commencer",
  "menu.fromFire": "Au feu",
  "menu.dessert": "C\u00f4t\u00e9 sucr\u00e9",
  "menu.full": "Menu complet",
  "menu.note": "Prix indicatifs · Menu de saison qui change chaque jour · Dessert offert en attendant vos plats.",
  "sig.eyebrow": "Plats signatures",
  "sig.title": "\u00c0 ne pas <em>manquer.</em>",
  "sig.guests": "Favori des clients",
  "sig.classic": "Classique maison",
  "sig.bar": "Bar & lounge",
  "sig.finish": "Pour finir",
  "sig.name1": "Gambas La Marquise",
  "sig.desc1": "Grosses crevettes grill\u00e9es servies sur un biryani \u00e9pic\u00e9.",
  "sig.name2": "Mezz\u00e9s & pain pita",
  "sig.desc2": "Houmous, moutabal, falafels et pita chaud \u2014 tr\u00e8s appr\u00e9ci\u00e9s.",
  "sig.name3": "Cocktails signatures",
  "sig.desc3": "Cocktails frais, mocktails et une s\u00e9lection mondiale de liqueurs.",
  "sig.name4": "Dessert de saison",
  "sig.desc4": "Terminez en douceur avec une cr\u00e9ation fra\u00eeche de la p\u00e2tisserie.",
  "info.eyebrow": "Planifiez votre visite",
  "info.title": "Tout ce que vous devez <em>savoir.</em>",
  "info.hours": "Horaires",
  "info.find": "Nous trouver",
  "info.contact": "Contact",
  "info.good": "\u00c0 savoir",
  "info.gastroCard": "Restaurant gastronomique",
  "info.directions": "Itin\u00e9raire",
  "info.callNow": "Appeler maintenant",
  "info.things1": "Acc\u00e8s handicap\u00e9",
  "info.things2": "Cartes & argent mobile accept\u00e9s",
  "info.things3": "Livraison & emport\u00e9",
  "info.things4": "Stationnement rue & moto",
  "info.things5": "Espace famille & jeux",
  "info.allServices": "Tous les services",
  "day.Monday": "Lundi",
  "day.Tuesday": "Mardi",
  "day.Wednesday": "Mercredi",
  "day.Thursday": "Jeudi",
  "day.Friday": "Vendredi",
  "day.Saturday": "Samedi",
  "day.Sunday": "Dimanche",
  "services.eyebrow": "Ce que nous offrons",
  "services.title": "Des services <em>simples.</em>",
  "services.text": "Tout, du d\u00e9jeuner familial rapide au gala du soir \u2014 dans une seule adresse ador\u00e9e.",
  "testimonial.eyebrow": "T\u00e9moignages",
  "faq.eyebrow": "Des questions ?",
  "faq.title": "\u00c0 <em>savoir.</em>",
  "cta.eyebrow": "Faites-en une soir\u00e9e",
  "cta.title": "Votre table vous <em>attend.</em>",
  "cta.text":
    "R\u00e9servez par t\u00e9l\u00e9phone ou envoyez-nous une demande de r\u00e9servation et nous nous occupons du reste. Pour le jour m\u00eame, appelez, c'est plus rapide.",
  "cta.book": "Demander une r\u00e9servation",
  "footer.explore": "Explorer",
  "footer.contact": "Contact",
  "footer.find": "Nous trouver",
  "footer.directions": "Itin\u00e9raire",
  "footer.delivery": "Livraison",
  "footer.follow": "Suivez-nous",
  "footer.rights": "Tous droits r\u00e9serv\u00e9s.",
  "footer.back": "Retour en haut",
  "book.eyebrow": "La Marquise · Bonapriso",
  "book.title": "R\u00e9servez <em>votre table.</em>",
  "book.text":
    "Dites-nous quand vous souhaitez d\u00eener. Pour une r\u00e9servation le jour m\u00eame, appelez le {phone} \u2014 c'est plus rapide.",
  "book.name": "Nom complet",
  "book.phone": "Num\u00e9ro de t\u00e9l\u00e9phone",
  "book.email": "Adresse e-mail",
  "book.guests": "Nombre de convives",
  "book.date": "Date",
  "book.time": "Heure",
  "book.level": "\u00c9tage",
  "book.level.gastro": "Restaurant gastronomique (\u00e9tage)",
  "book.level.fastfood": "Fast-food & famille (rez-de-chauss\u00e9e)",
  "book.level.event": "\u00c9v\u00e9nement / c\u00e9l\u00e9bration",
  "book.occasion": "Occasion",
  "book.optional": "(facultatif)",
  "book.note": "Un mot pour nous",
  "book.placeholder.occasion": "Anniversaire, d\u00eener d'affaires, t\u00eate-\u00e0-t\u00eate...",
  "book.placeholder.note": "Y a-t-il une chose que nous devrions savoir ?",
  "book.submit": "Demander ma table",
  "book.submitting": "Envoi en cours...",
  "book.footnote": "R\u00e9servation gratuite · Confirmation par t\u00e9l\u00e9phone ou e-mail · Dessert offert en attendant.",
  "book.success.eyebrow": "Vous \u00eates sur la liste",
  "book.success.title": "\u00c0 <em>bient\u00f4t.</em>",
  "book.success.text": "Merci d'avoir choisi La Marquise. Nous confirmerons votre r\u00e9servation par t\u00e9l\u00e9phone ou e-mail.",
  "book.success.call": "Appelez si c'est urgent",
  "book.success.done": "Termin\u00e9",
  "book.error": "Impossible d'envoyer pour le moment \u2014 veuillez appeler le {phone}.",
  "guests.1": "1 convive",
  "guests.2": "2 convives",
  "guests.3": "3 convives",
  "guests.4": "4 convives",
  "guests.5": "5 convives",
  "guests.6": "6+ convives",
  "aria.close": "Fermer",
};

const dictionaries: Record<Locale, Dict> = { en, fr };

function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    try {
      const saved = window.localStorage.getItem("lm-lang");
      if (saved === "en" || saved === "fr") return saved;
      const nav = (navigator.language || "en").toLowerCase();
      if (nav.startsWith("fr")) return "fr";
    } catch {
      // Storage may be blocked (e.g. sandboxed iframe / private mode).
      // Fall back to the browser language without reading localStorage.
      try {
        const nav = (navigator.language || "en").toLowerCase();
        if (nav.startsWith("fr")) return "fr";
      } catch {
        return "en";
      }
    }
  }
  return "en";
}

interface I18nValue {
  lang: Locale;
  switchLang: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nValue>({
  lang: "en",
  switchLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>("en");

  useEffect(() => {
    setLang(getInitialLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "fr"
      ? "La Marquise | Restaurant & Lounge \u00e0 Bonapriso, Douala"
      : "La Marquise | Restaurant & Lounge in Bonapriso, Douala";
  }, [lang]);

  const switchLang = (l: Locale) => {
    setLang(l);
    try {
      window.localStorage.setItem("lm-lang", l);
    } catch {}
  };

  const dict: Dict = dictionaries[lang];

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let str = dict[key] ?? en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return str;
  };

  return <I18nContext.Provider value={{ lang, switchLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
