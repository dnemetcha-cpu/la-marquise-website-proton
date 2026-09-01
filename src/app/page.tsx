"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { site, heroImages, getMenu, getServices, getFaqs, getCuisines } from "@/lib/site";

// Only import the image URLs actually used in this page
const imageUrls = {
  gastronomic: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
  wine: "https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  gambas: "https://images.pexels.com/photos/38461299/pexels-photo-38461299.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  meze: "https://images.pexels.com/photos/14930656/pexels-photo-14930656.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  cocktails: "https://images.pexels.com/photos/33231324/pexels-photo-33231324.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
  dessert: "https://images.pexels.com/photos/29405077/pexels-photo-29405077.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
} as const;
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type MenuLevel = "gastronomic" | "fastfood" | "bar";
type TabKey = "starters" | "mains" | "desserts" | "sweets";

// ---- SVG icon set (inline, fast, no external requests) ----
const ICONS: Record<string, (props: { size?: number }) => ReactElement> = {
  phone: () => <Icon paths="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />,
  pin: () => <Icon paths="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z M9.5 10a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0" />,
  clock: () => <Icon paths="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 3" />,
  mail: () => <Icon paths="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z m20 2-8 6-8-6" />,
  check: () => <Icon paths="m4 12 5 5L20 7" />,
  star: () => <Icon fill paths="M12 2.5 14.8 8.3l6.2.8-4.5 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.1l6.2-.8z" />,
  utensils: () => <Icon paths="M4 3v6a1 1 0 0 0 1 1h1v11a1 1 0 0 0 2 0V10h1a1 1 0 0 0 1-1V3 M4 3v3h4V3 M17 3c-1.7 0-3 2-3 5 0 2 1 3.5 2.5 3.9V21a1 1 0 0 0 2 0V3z" />,
  burger: () => <Icon paths="M4 9h16a1 1 0 0 1 1 1v2H3v-2a1 1 0 0 1 1-1z M3 15h18v1a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />,
  party: () => <Icon paths="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z M5 16c-1 1-1 2 0 3s2 1 3 0 M18 14c1 1 1 2 0 3M9 18l2 2" />,
  cocktail: () => <Icon paths="M6 3h12l-6 8z m6 8v8 M9 21h6 M8 3l4 8 4-8" />,
  delivery: () => <Icon paths="M3 6h11v9H3z m14 4h3l3 3v3h-6z M17 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z m-9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  access: () => <Icon paths="M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z M10 7h4l1.5 4H18l1-2 1 .5-1.5 3.5h-3l-1.5 4L15 20l-1.5.5L12 16l-2 1.5v5H8v-6l1.8-3.5L10 7z" />,
  instagram: () => <Icon paths="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M17 7h.01" />,
  facebook: () => <Icon fill paths="M14.5 8V6.5A1.5 1.5 0 0 1 16 5h1V2h-2.5A3.5 3.5 0 0 0 11 5.5V8H9v3h2v11h3V11h2l.5-3z" />,
};

function Icon({ paths, fill }: { paths: string; fill?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth={fill ? 0 : 1.7} strokeLinecap="round" strokeLinejoin="round">
      {paths.split(" ").map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function renderIcon(name: string) {
  const C = ICONS[name];
  return C ? <C /> : null;
}

export default function HomePage() {
  const { lang, switchLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("starters");
  const [activeLevel, setActiveLevel] = useState<MenuLevel>("gastronomic");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const menu = getMenu(lang);
  const services = getServices(lang);
  const faqs = getFaqs(lang);
  const cuisines = getCuisines(lang);

  const gastronomicTabs: { key: TabKey; label: string }[] = [
    { key: "starters", label: t("menu.toBegin") },
    { key: "mains", label: t("menu.fromFire") },
    { key: "desserts", label: t("menu.dessert") },
    { key: "sweets", label: t("menu.full") },
  ];

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBookingOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [bookingOpen]);

  const closeBooking = () => {
    setBookingOpen(false);
    window.setTimeout(() => setFormState("idle"), 300);
  };

  const handleReservation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitting");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Could not send");
      }
      setFormState("success");
      event.currentTarget.reset();
    } catch {
      setFormState("error");
    }
  };

  const handleNav = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLabel = gastronomicTabs.find((tb) => tb.key === activeTab)?.label;
  const gastronomicCategory = menu.gastronomic.find((c) => c.category === activeLabel);

  const switchTo = (l: Locale) => (e: React.MouseEvent) => {
    e.preventDefault();
    switchLang(l);
  };

  return (
    <main className="site-shell">
      {/* ===== TOP BAR ===== */}
      <div className="topbar">
        <div className="topbar-inner">
          <span className="topbar-item"><span className="dot" /> {t("top.openToday")}</span>
          <span className="topbar-rule" />
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="topbar-link"><ICONS.phone /> {site.phone}</a>
          <span className="topbar-rule hide-mobile" />
          <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="topbar-link hide-mobile"><ICONS.pin /> Rue Tokoto · Bonapriso</a>
          <div className="lang-switch topbar-lang" role="group" aria-label="Language / Langue">
            <button
              type="button"
              className={`lang-btn ${lang === "fr" ? "" : "active"}`}
              onClick={switchTo("en")}
              aria-pressed={lang === "en"}
            >EN</button>
            <button
              type="button"
              className={`lang-btn ${lang === "fr" ? "active" : ""}`}
              onClick={switchTo("fr")}
              aria-pressed={lang === "fr"}
            >FR</button>
          </div>
        </div>
      </div>

      {/* ===== HEADER / NAV ===== */}
      <header className="site-header">
        <div className="nav-inner">
          <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-monogram">LM</span>
            <span className="brand-body">
              <span className="brand-name">La Marquise</span>
              <span className="brand-sub">Restaurant &amp; Lounge · Douala</span>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#story" onClick={() => handleNav("story")}>{t("nav.story")}</a>
            <a href="#menu" onClick={() => handleNav("menu")}>{t("nav.menus")}</a>
            <a href="#info" onClick={() => handleNav("info")}>{t("nav.visit")}</a>
            <a href="#services" onClick={() => handleNav("services")}>{t("nav.services")}</a>
            <a href="#faq" onClick={() => handleNav("faq")}>{t("nav.faq")}</a>
            <button type="button" className="nav-cta-mobile" onClick={() => { setMenuOpen(false); setBookingOpen(true); }}>{t("nav.book")}</button>
          </nav>

          <div className="nav-actions">
            <div className="lang-switch nav-lang" role="group" aria-label="Language / Langue">
              <button type="button" className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={switchTo("en")} aria-pressed={lang === "en"}>EN</button>
              <button type="button" className={`lang-btn ${lang === "fr" ? "active" : ""}`} onClick={switchTo("fr")} aria-pressed={lang === "fr"}>FR</button>
            </div>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="nav-phone"><ICONS.phone /> <span>{t("nav.call")}</span></a>
            <button type="button" className="nav-booking" onClick={() => setBookingOpen(true)}>{t("nav.book")} <span className="arrow">→</span></button>
            <button type="button" className="menu-toggle" aria-label={menuOpen ? t("aria.close") : "Menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
              <span className={`menu-icon ${menuOpen ? "is-open" : ""}`}><span /><span /></span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero" id="top">
        <img
          className="hero-bg"
          srcSet={`${heroImages.heroMobile} 750w, ${heroImages.hero} 1920w`}
          sizes="100vw"
          src={heroImages.hero}
          alt="La Marquise gastronomic dining room in Bonapriso, Douala"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> {t("hero.tagline")}</p>
          <h1>{t("hero.title1")}<br /><em>{t("hero.title2")}</em><br />{t("hero.title3")}</h1>
          <p className="hero-text">{t("hero.text")}</p>
          <div className="hero-actions">
            <button type="button" className="button button-gold" onClick={() => setBookingOpen(true)}>{t("hero.book")} <span className="arrow">→</span></button>
            <a className="text-link text-link-light" href="#menu" onClick={() => handleNav("menu")}>{t("hero.menu")} <span className="arrow">→</span></a>
          </div>
          <div className="hero-badges">
            <span className="hero-badge"><ICONS.star /> {t("hero.score")}</span>
            <span className="hero-badge"><ICONS.clock /> {t("hero.hours")}</span>
            <span className="hero-badge"><ICONS.pin /> {t("hero.location")}</span>
          </div>
        </div>
        <a href="#story" className="scroll-cue" onClick={() => handleNav("story")} aria-label={t("hero.discover")}>
          <span>{t("hero.discover")}</span><span className="cue-line" />
        </a>
      </section>

      {/* ===== QUICK LINKS ===== */}
      <section className="quick-strip" aria-label={t("nav.story")}>
        {[
          { icon: "utensils", label: t("quick.gastro"), target: "menu" },
          { icon: "burger", label: t("quick.fastfood"), target: "services" },
          { icon: "clock", label: t("quick.hours"), target: "info" },
          { icon: "party", label: t("quick.events"), target: "booking" },
        ].map((item) => (
          <button key={item.label} className="quick-link" onClick={() => item.target === "booking" ? setBookingOpen(true) : handleNav(item.target)}>
            <span className="quick-icon">{renderIcon(item.icon)}</span>
            {item.label}
          </button>
        ))}
      </section>

      {/* ===== STORY ===== */}
      <section className="story-section" id="story">
        <div className="story-images">
          <img src={imageUrls.gastronomic} alt="La Marquise gastronomic restaurant, glowing candlelit tables" loading="lazy" decoding="async" />
          <img className="story-img-2" src={imageUrls.wine} alt="Wine glasses and candles at La Marquise" loading="lazy" decoding="async" />
        </div>
        <div className="story-body">
          <p className="eyebrow"><span className="eyebrow-line" /> {t("story.eyebrow")}</p>
          <h2>{t("story.title")}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: t("story.p1")
                .replace("fast-food", "<strong>fast-food</strong>")
                .replace("gastronomic restaurant", "<strong>gastronomic restaurant</strong>")
                .replace("restaurant gastronomique", "<strong>restaurant gastronomique</strong>"),
            }}
          />
          <p>{t("story.p2")}</p>
          <div className="story-metrics">
            <div className="metric"><strong>{t("story.metric1big")}</strong><span>{t("story.metric1small").replace("<br />", "")}</span></div>
            <div className="metric"><strong>{t("story.metric2big")}</strong><span>{t("story.metric2small").replace("<br />", "")}</span></div>
            <div className="metric"><strong>{t("story.metric3big")}</strong><span>{t("story.metric3small").replace("<br />", "")}</span></div>
          </div>
        </div>
      </section>

      {/* ===== MENU ===== */}
      <section className="menu-section content-section" id="menu">
        <div className="menu-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> {t("menu.eyebrow")}</p>
          <h2 dangerouslySetInnerHTML={{ __html: t("menu.title") }} />
          <p className="body-copy">{t("menu.text")}</p>
          <ul className="cuisine-list">
            {cuisines.map((c) => (
              <li key={c}><ICONS.check /> {c}</li>
            ))}
          </ul>
        </div>

        <div className="menu-panel">
          <div className="level-toggle" role="tablist" aria-label={t("menu.eyebrow")}>
            <button role="tab" aria-selected={activeLevel === "gastronomic"} className={activeLevel === "gastronomic" ? "active" : ""} onClick={() => setActiveLevel("gastronomic")}>{renderIcon("utensils")} {t("menu.gastronomic")}</button>
            <button role="tab" aria-selected={activeLevel === "fastfood"} className={activeLevel === "fastfood" ? "active" : ""} onClick={() => setActiveLevel("fastfood")}>{renderIcon("burger")} {t("menu.fastfood")}</button>
            <button role="tab" aria-selected={activeLevel === "bar"} className={activeLevel === "bar" ? "active" : ""} onClick={() => setActiveLevel("bar")}>{renderIcon("cocktail")} {t("menu.bar")}</button>
          </div>

          {activeLevel === "gastronomic" && (
            <div className="menu-tab-row">
              {gastronomicTabs.map((tab) => (
                <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {activeLevel === "gastronomic" ? (
            <div className="menu-items">
              {gastronomicCategory?.items.map((item) => (
                <div className="menu-item" key={item.name}>
                  <div><h3>{item.name}</h3><p>{item.desc}</p></div>
                  <span className="menu-price">{item.price}</span>
                </div>
              ))}
              <p className="menu-note">{t("menu.note")}</p>
            </div>
          ) : (
            <ul className="menu-vertical">
              {(activeLevel === "fastfood" ? menu.fastfood : menu.bar).map((item) => (
                <li className="menu-item" key={item.name}>
                  <div><h3>{item.name}</h3><p>{item.desc}</p></div>
                  <span className="menu-price">{item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ===== SIGNATURE DISHES ===== */}
      <section className="signature-section content-section">
        <div className="section-heading">
          <p className="eyebrow"><span className="eyebrow-line" /> {t("sig.eyebrow")}</p>
          <h2 dangerouslySetInnerHTML={{ __html: t("sig.title") }} />
        </div>
        <div className="signature-grid">
          <article className="signature-card">
            <img src={imageUrls.gambas} alt="Gambas La Marquise — grilled jumbo prawns with biryani" loading="lazy" decoding="async" />
            <div className="signature-body"><span className="tag">{t("sig.guests")}</span><h3>{t("sig.name1")}</h3><p>{t("sig.desc1")}</p><span className="price">from 15 000 FCFA</span></div>
          </article>
          <article className="signature-card">
            <img src={imageUrls.meze} alt="Lebanese mezzes with hummus, pita and olives" loading="lazy" decoding="async" />
            <div className="signature-body"><span className="tag">{t("sig.classic")}</span><h3>{t("sig.name2")}</h3><p>{t("sig.desc2")}</p><span className="price">from 6 500 FCFA</span></div>
          </article>
          <article className="signature-card">
            <img src={imageUrls.cocktails} alt="La Marquise signature cocktails and mocktails" loading="lazy" decoding="async" />
            <div className="signature-body"><span className="tag">{t("sig.bar")}</span><h3>{t("sig.name3")}</h3><p>{t("sig.desc3")}</p><span className="price">from 5 000 FCFA</span></div>
          </article>
          <article className="signature-card">
            <img src={imageUrls.dessert} alt="Dessert and cocktail at La Marquise" loading="lazy" decoding="async" />
            <div className="signature-body"><span className="tag">{t("sig.finish")}</span><h3>{t("sig.name4")}</h3><p>{t("sig.desc4")}</p><span className="price">from 6 000 FCFA</span></div>
          </article>
        </div>
      </section>

      {/* ===== PLAN YOUR VISIT ===== */}
      <section className="info-section" id="info">
        <div className="info-inner">
          <div className="info-heading">
            <p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> {t("info.eyebrow")}</p>
            <h2 dangerouslySetInnerHTML={{ __html: t("info.title") }} />
          </div>
          <div className="info-grid">
            <div className="info-card info-card-primary">
              <div className="info-tile-icon"><ICONS.clock /></div>
              <h4>{t("info.hours")}</h4>
              <div className="hours">
                {site.hours.map((h) => (
                  <div className="hour" key={h.day}><span>{t(`day.${h.day}`)}</span><span>{h.open} – {h.close}</span></div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <div className="info-tile-icon"><ICONS.pin /></div>
              <h4>{t("info.find")}</h4>
              <p><strong>Rue Tokoto, Bonapriso</strong><br />{site.address.area}<br />Douala, Cameroon</p>
              <a className="info-action" href={site.mapsUrl} target="_blank" rel="noreferrer"><ICONS.pin /> {t("info.directions")} <span className="arrow">→</span></a>
            </div>

            <div className="info-card">
              <div className="info-tile-icon"><ICONS.phone /></div>
              <h4>{t("info.contact")}</h4>
              <p><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="contact-link">{site.phone}</a><br />
              {site.phoneAlt.map((p) => <span key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="contact-link">{p}</a><br /></span>)}<br />
              <a href={`mailto:${site.email}`} className="contact-link">{site.email}</a></p>
              <a className="info-action" href={`tel:${site.phone.replace(/\s/g, "")}`}><ICONS.phone /> {t("info.callNow")} <span className="arrow">→</span></a>
            </div>

            <div className="info-card">
              <div className="info-tile-icon"><ICONS.access /></div>
              <h4>{t("info.good")}</h4>
              <ul className="goodto-know">
                <li><ICONS.check /> {t("info.things1")}</li>
                <li><ICONS.check /> {t("info.things2")}</li>
                <li><ICONS.check /> {t("info.things3")}</li>
                <li><ICONS.check /> {t("info.things4")}</li>
                <li><ICONS.check /> {t("info.things5")}</li>
              </ul>
              <a className="info-action" href="#services" onClick={() => handleNav("services")}>{t("info.allServices")} <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services-section" id="services">
        <div className="services-inner">
          <div className="services-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> {t("services.eyebrow")}</p>
            <h2 dangerouslySetInnerHTML={{ __html: t("services.title") }} />
            <p className="body-copy">{t("services.text")}</p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{renderIcon(s.icon)}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonial-section">
        <p className="eyebrow light-eyebrow center-eyebrow"><span className="eyebrow-line" /> {t("testimonial.eyebrow")}</p>
        <div className="testimonial-scroller">
          <div className="testimonial-track">
            {[
              { text: "Interior design is beyond classic. It's mind blowing. Deco is top notch and they love seasonal periods.", name: "Chelsey C." },
              { text: "The food was perfect, I ate and almost licked my plate. Service is polite, fast and there's always a waiter available.", name: "Joyce J." },
              { text: "A wide variety of dishes. The taste is very good — the appearance, service and ambiance were very satisfying.", name: "Sarkis B." },
            ].map((testimonial, i) => (
              <figure className="testimonial-slide" key={i}>
                <div className="stars">{"12345".split("").map((s, j) => <ICONS.star key={j} />)}</div>
                <blockquote>{testimonial.text}</blockquote>
                <figcaption>{testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq-section content-section" id="faq">
        <div className="faq-heading">
          <p className="eyebrow"><span className="eyebrow-line" /> {t("faq.eyebrow")}</p>
          <h2 dangerouslySetInnerHTML={{ __html: t("faq.title") }} />
        </div>
        <div className="faq-list">
          {faqs.map((f, idx) => (
            <div className={`faq-item ${openFaq === idx ? "open" : ""}`} key={idx}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)} aria-expanded={openFaq === idx}>
                <span>{f.q}</span>
                <span className="faq-icon">{openFaq === idx ? "−" : "+"}</span>
              </button>
              <div className="faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA / CONTACT ===== */}
      <section className="cta-section" id="contact">
        <div className="cta-inner">
          <div className="cta-copy">
            <p className="eyebrow light-eyebrow"><span className="eyebrow-line" /> {t("cta.eyebrow")}</p>
            <h2 dangerouslySetInnerHTML={{ __html: t("cta.title") }} />
            <p>{t("cta.text")}</p>
            <div className="cta-actions">
              <button type="button" className="button button-gold" onClick={() => setBookingOpen(true)}>{t("cta.book")} <span className="arrow">→</span></button>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="button button-outline-light"><ICONS.phone /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="brand-footer">La <em>Marquise</em></span>
              <p>Restaurant &amp; Lounge<br />Rue Tokoto · Bonapriso · Douala</p>
            </div>
            <div className="footer-col">
              <h5>{t("footer.explore")}</h5>
              <a href="#story" onClick={() => handleNav("story")}>{t("nav.story")}</a>
              <a href="#menu" onClick={() => handleNav("menu")}>{t("nav.menus")}</a>
              <a href="#services" onClick={() => handleNav("services")}>{t("nav.services")}</a>
              <a href="#faq" onClick={() => handleNav("faq")}>{t("nav.faq")}</a>
            </div>
            <div className="footer-col">
              <h5>{t("footer.contact")}</h5>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              <a href={`tel:${site.phoneAlt[0].replace(/\s/g, "")}`}>{site.phoneAlt[0]}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="footer-col">
              <h5>{t("footer.find")}</h5>
              <a href={site.mapsUrl} target="_blank" rel="noreferrer">{t("footer.directions")} <span className="arrow">→</span></a>
              <a href={`tel:${site.delivery.replace(/\s/g, "")}`}>{t("footer.delivery")}: {site.delivery}</a>
            </div>
          </div>
          <div className="footer-social">
            <span className="footer-social-label">{t("footer.follow")}</span>
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><ICONS.instagram /></a>
            <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><ICONS.facebook /></a>
            <span className="footer-social-hashtag">@lamarquisedouala</span>
            <div className="lang-switch" role="group" aria-label="Language / Langue">
              <button type="button" className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={switchTo("en")} aria-pressed={lang === "en"}>English</button>
              <button type="button" className={`lang-btn ${lang === "fr" ? "active" : ""}`} onClick={switchTo("fr")} aria-pressed={lang === "fr"}>Français</button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} La Marquise — Bonapriso, Douala. {t("footer.rights")}</span>
            <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{t("footer.back")} ↑</a>
          </div>
        </div>
      </footer>

      {/* ===== BOOKING MODAL ===== */}
      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) closeBooking(); }}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button type="button" className="modal-close" onClick={closeBooking} aria-label={t("aria.close")}>×</button>
            {formState === "success" ? (
              <div className="booking-success">
                <span className="success-check">✓</span>
                <p className="eyebrow center-eyebrow"><span className="eyebrow-line" /> {t("book.success.eyebrow")}</p>
                <h2 dangerouslySetInnerHTML={{ __html: t("book.success.title") }} />
                <p>{t("book.success.text")}</p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="button button-gold"><ICONS.phone /> {t("book.success.call")}</a>
                <button type="button" className="text-link" onClick={closeBooking}>{t("book.success.done")} <span className="arrow">→</span></button>
              </div>
            ) : (
              <>
                <div className="modal-heading">
                  <p className="eyebrow"><span className="eyebrow-line" /> {t("book.eyebrow")}</p>
                  <h2 id="booking-title" dangerouslySetInnerHTML={{ __html: t("book.title") }} />
                  <p>{t("book.text", { phone: site.phone })}</p>
                </div>
                <form className="booking-form" onSubmit={handleReservation}>
                  <div className="form-grid">
                    <label><span>{t("book.name")}</span><input name="name" type="text" placeholder="e.g. Amélie Njoya" required /></label>
                    <label><span>{t("book.phone")}</span><input name="phone" type="tel" placeholder="+237 ..." required /></label>
                    <label><span>{t("book.email")}</span><input name="email" type="email" placeholder="you@email.com" required /></label>
                    <label><span>{t("book.guests")}</span><select name="guests" defaultValue="2" required>
                      {[1, 2, 3, 4, 5, 6].map((g) => (
                        <option key={g} value={String(g)}>{g === 6 ? t("guests.6") : t(`guests.${g}`)}</option>
                      ))}
                    </select></label>
                    <label><span>{t("book.date")}</span><input name="date" type="date" required /></label>
                    <label><span>{t("book.time")}</span><select name="time" defaultValue="19:30" required><option>12:00</option><option>13:00</option><option>18:30</option><option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option></select></label>
                    <label className="span-2"><span>{t("book.level")}</span><select name="level" defaultValue="gastronomic">
                      <option value="gastronomic">{t("book.level.gastro")}</option>
                      <option value="fastfood">{t("book.level.fastfood")}</option>
                      <option value="event">{t("book.level.event")}</option>
                    </select></label>
                    <label className="span-2"><span>{t("book.occasion")} <small>{t("book.optional")}</small></span><input name="occasion" type="text" placeholder={t("book.placeholder.occasion")} /></label>
                    <label className="span-2"><span>{t("book.note")} <small>{t("book.optional")}</small></span><textarea name="message" rows={2} placeholder={t("book.placeholder.note")}></textarea></label>
                  </div>
                  {formState === "error" && <p className="form-error">{t("book.error", { phone: site.phone })}</p>}
                  <button type="submit" className="button button-gold form-submit" disabled={formState === "submitting"}>{formState === "submitting" ? t("book.submitting") : t("book.submit")} <span className="arrow">→</span></button>
                  <p className="form-footnote">{t("book.footnote")}</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
