import { useEffect, useState } from 'react';
import { ArrowRight, Check, Compass, Coffee, Download, GraduationCap, MapPin, Menu, Play, Store, Tag, UsersRound, X } from 'lucide-react';
import { useGetBrandLogo } from '@workspace/api-client-react';
import AnimatedPanorama from '@/components/AnimatedPanorama';
import { Link } from 'wouter';
import './landing.css';

type Language = 'es' | 'en';

const copy = {
  es: {
    nav: ['Cómo funciona', 'Beneficios', 'Para comercios'],
    app: 'Descarga la app',
    heroEyebrow: 'Una nueva forma de vivir Medellín',
    titleA: 'Estudia mucho.', titleB: 'Paga menos.',
    intro: 'Tanda será una app de beneficios para estudiantes, hecha para descubrir lugares locales y disfrutar más de la ciudad.',
    download: 'Descargar Tanda', how: 'Ver cómo funciona',
    stickerOfferA: '20% OFF', stickerOfferB: '30% OFF',
    stickerFood: 'Restaurantes', stickerFashion: 'Moda', stickerCoffee: 'Cafés',
    city: 'Empezamos en Medellín, Colombia',
    phoneGreeting: '¡Hola, estudiante!',
    phoneSub: 'Un barrio nuevo, a tu ritmo.',
    search: 'Buscar un lugar cerca',
    nearby: 'Para descubrir', viewAll: 'Ver ideas',
    cafe: 'Café de barrio', cafeType: 'Café · Laureles',
    samplePerk: 'Ejemplo ilustrativo', sampleValue: '10% menos',
    bakery: 'Panadería local', bakeryType: 'Pan y café · Manila',
    mockDisclaimer: 'Vista conceptual · beneficios y comercios no activos',
    panoramaNote: 'Descuentos de la ilustración: ejemplos gráficos, no ofertas activas.',
    benefitsTitle: 'Todo lo que necesitas para ahorrar más.',
    benefitsSub: 'Una idea sencilla, pensada para la vida que ya tienes.',
    brandsTitle: 'Marcas y lugares que te van a encantar',
    brandsDisclaimer: 'Nombres mostrados solo como ejemplos ilustrativos. No representan alianzas, comercios participantes ni ofertas activas.',
    cards: [
      ['Descubre', 'Lugares locales cerca de tu campus y tus planes.'],
      ['Ahorra', 'Beneficios estudiantiles que estamos imaginando.'],
      ['Comparte', 'Más planes de barrio, para hacer con tu gente.'],
    ],
    howEyebrow: 'La idea, paso a paso',
    howTitle: 'Tu ciudad, más cerca.',
    steps: [
      ['01', 'Explora tu barrio', 'La app futura te ayudará a encontrar cafés, tiendas y favoritos locales.'],
      ['02', 'Verifica tu condición', 'La verificación estudiantil se contempla para la app; este sitio no verifica estudiantes.'],
      ['03', 'Disfruta beneficios', 'Los comercios participantes podrían ofrecer beneficios en el futuro, según sus condiciones.'],
    ],
    note: 'Tanda aún está en desarrollo. No hay ofertas activas ni comercios asociados anunciados.',
    status: 'APLICACIÓN MÓVIL EN DESARROLLO',
    footer: 'Medellín, Colombia · una idea en construcción',
    footerNote: 'Sin ofertas activas. Este sitio no recopila datos estudiantiles.',
    admin: 'Administración',
    dialogTitle: 'Tanda viene en camino.',
    dialogBody: 'La app móvil todavía está en desarrollo y aún no está disponible en las tiendas. Aquí te contamos la idea mientras la construimos.',
    close: 'Entendido',
    menu: 'Abrir menú',
  },
  en: {
    nav: ['How it works', 'Benefits', 'For businesses'],
    app: 'Download the app',
    heroEyebrow: 'A new way to make Medellín yours',
    titleA: 'Study hard.', titleB: 'Pay less.',
    intro: 'Tanda will be a student-perks app made for discovering local places and enjoying more of the city.',
    download: 'Download Tanda', how: 'See how it works',
    stickerOfferA: '20% OFF', stickerOfferB: '30% OFF',
    stickerFood: 'Restaurants', stickerFashion: 'Fashion', stickerCoffee: 'Cafés',
    city: 'Starting in Medellín, Colombia',
    phoneGreeting: 'Hey, student!',
    phoneSub: 'A new neighborhood, your way.',
    search: 'Find a place nearby',
    nearby: 'Ideas nearby', viewAll: 'See ideas',
    cafe: 'Neighborhood café', cafeType: 'Coffee · Laureles',
    samplePerk: 'Illustrative example', sampleValue: '10% off',
    bakery: 'Local bakery', bakeryType: 'Bread & coffee · Manila',
    mockDisclaimer: 'Concept preview · places and perks are not live',
    panoramaNote: 'Discounts in the illustration are graphic examples, not live offers.',
    benefitsTitle: 'Everything you need to save more.',
    benefitsSub: 'A simple idea, made for the life you already have.',
    brandsTitle: 'Brands and places you’ll love',
    brandsDisclaimer: 'Names shown as illustrative examples only. They do not represent partnerships, participating businesses or live offers.',
    cards: [
      ['Discover', 'Local places around campus and your everyday plans.'],
      ['Save', 'Student perks we are imagining for the future.'],
      ['Share', 'More neighborhood plans to enjoy with your people.'],
    ],
    howEyebrow: 'The idea, step by step',
    howTitle: 'Your city, a little closer.',
    steps: [
      ['01', 'Explore your neighborhood', 'The future app will help you find cafés, shops and local favorites.'],
      ['02', 'Verify student status', 'Student verification is being considered for the app; this site does not verify students.'],
      ['03', 'Enjoy future perks', 'Participating businesses may offer future perks, subject to their terms.'],
    ],
    note: 'Tanda is still in development. There are no live offers or announced business partners.',
    status: 'MOBILE APP IN DEVELOPMENT',
    footer: 'Medellín, Colombia · an idea in the making',
    footerNote: 'No live offers. This site does not collect student data.',
    admin: 'Admin',
    dialogTitle: 'Tanda is on its way.',
    dialogBody: 'The mobile app is still in development and is not in app stores yet. Here is the idea while we build it.',
    close: 'Got it',
    menu: 'Open menu',
  },
} as const;

type Copy = typeof copy[keyof typeof copy];

function Brand({ footer = false }: { footer?: boolean }) {
  const logo = useGetBrandLogo();
  const [imageFailed, setImageFailed] = useState(false);
  const logoUrl = logo.data?.logoUrl;
  useEffect(() => setImageFailed(false), [logoUrl]);
  const useUploadedLogo = Boolean(logoUrl && !imageFailed);

  return <a className={`tanda-brand${footer ? ' tanda-brand-footer' : ''}`} href="#inicio" aria-label="Tanda">
    <span className="tanda-logo-slot" data-logo-slot="replaceable-brand-mark" data-logo-ready={useUploadedLogo ? 'true' : 'false'} aria-label="Tanda logo">
      {useUploadedLogo
        ? <img className="tanda-stored-logo" src={logoUrl!} alt="Tanda" onError={() => setImageFailed(true)} />
        : <><span className="tanda-logo-fallback" aria-hidden="true">tanda</span><svg className="tanda-logo-spark" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 12 8 10M8 4l2 4m5-5-1 5" /></svg></>}
    </span>
  </a>;
}

function PhonePreview({ en, text }: { en: boolean; text: Copy }) {
  return <div className="phone-stage" aria-label={en ? 'Illustrative preview of the future Tanda app' : 'Vista ilustrativa de la futura app Tanda'}>
    <div className="phone-orbit orbit-one" aria-hidden="true" />
    <div className="phone-orbit orbit-two" aria-hidden="true" />
    <div className="phone phone-back" aria-hidden="true">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>● ● ●</span></div>
        <div className="phone-photo" style={{ backgroundImage: `linear-gradient(0deg, rgba(37, 27, 25, .2), transparent 40%), url("${import.meta.env.BASE_URL}images/tanda-cafe-editorial.jpg")` }}><span className="photo-tag">{en ? 'A neighborhood pause' : 'Una pausa de barrio'}</span></div>
        <div className="phone-back-copy"><span className="phone-label">{text.cafeType}</span><strong>{text.cafe}</strong><span className="mock-badge">{text.sampleValue}</span></div>
        <div className="mock-disclaimer-mini">{text.samplePerk} · {en ? 'not live' : 'no activo'}</div>
      </div>
    </div>
    <div className="phone phone-front">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>● ● ●</span></div>
        <div className="phone-wordmark">tanda<span>·</span></div>
        <h3>{text.phoneGreeting}</h3>
        <p className="phone-subline">{text.phoneSub}</p>
        <div className="phone-search"><Compass size={13} />{text.search}</div>
        <div className="phone-section-label"><strong>{text.nearby}</strong><span>{text.viewAll}</span></div>
        <div className="phone-listing">
          <span className="listing-thumb thumb-cafe"><MapPin size={14} /></span>
          <span className="listing-copy"><strong>{text.cafe}</strong><small>{text.cafeType}</small></span>
          <span className="listing-chevron"><ArrowRight size={12} /></span>
        </div>
        <div className="phone-listing">
          <span className="listing-thumb thumb-bakery"><Compass size={14} /></span>
          <span className="listing-copy"><strong>{text.bakery}</strong><small>{text.bakeryType}</small></span>
          <span className="listing-chevron"><ArrowRight size={12} /></span>
        </div>
        <div className="phone-tabbar"><span className="tab-active"><Compass size={14} />{en ? 'Explore' : 'Explora'}</span><span><GraduationCap size={14} />{en ? 'Student' : 'Estudiante'}</span></div>
      </div>
    </div>
    <div className="phone-sticker sticker-offer sticker-offer-a" aria-hidden="true">{text.stickerOfferA}</div>
    <div className="phone-sticker sticker-offer sticker-offer-b" aria-hidden="true">{text.stickerOfferB}</div>
    <div className="phone-sticker sticker-category sticker-food" aria-hidden="true"><Store size={15} />{text.stickerFood}</div>
    <div className="phone-sticker sticker-category sticker-fashion" aria-hidden="true"><Tag size={15} />{text.stickerFashion}</div>
    <div className="phone-sticker sticker-category sticker-coffee" aria-hidden="true"><Coffee size={15} />{text.stickerCoffee}</div>
    <div className="phone-caption"><span className="caption-dot" />{text.mockDisclaimer}</div>
  </div>;
}

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('tanda-language') === 'en' ? 'en' : 'es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const en = language === 'en';
  const t = copy[language];

  useEffect(() => { localStorage.setItem('tanda-language', language); }, [language]);
  useEffect(() => {
    if (!dialogOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setDialogOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dialogOpen]);

  const nav = <>{t.nav.map((label, i) => <a href={['#como-funciona', '#beneficios', '#comercios'][i]} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}</>;
  return <div className="tanda-page" id="inicio">
    <header className="tanda-header">
      <div className="tanda-header-inner">
        <Brand />
        <nav className="tanda-nav" aria-label={en ? 'Main navigation' : 'Navegación principal'}>{nav}</nav>
        <div className="tanda-header-actions">
          <button className="tanda-language" onClick={() => setLanguage(en ? 'es' : 'en')} aria-label={en ? 'Cambiar idioma a español' : 'Switch language to English'}>{en ? 'ES' : 'EN'}</button>
          <button className="tanda-button button-coral header-download" onClick={() => setDialogOpen(true)}><Download size={15} />{t.app}</button>
          <button className="tanda-menu-toggle" onClick={() => setMenuOpen(open => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? (en ? 'Close menu' : 'Cerrar menú') : t.menu}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {menuOpen && <nav className="tanda-mobile-nav">{nav}<button className="tanda-button button-coral" onClick={() => { setMenuOpen(false); setDialogOpen(true); }}>{t.app}</button></nav>}
    </header>

    <main>
      <section className="tanda-hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="tanda-eyebrow"><span className="eyebrow-dot" />{t.heroEyebrow}</p>
            <h1>{t.titleA}<br /><span>{t.titleB}</span></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-buttons">
              <button className="tanda-button button-coral" onClick={() => setDialogOpen(true)}>{t.download}<ArrowRight size={17} /></button>
              <a className="tanda-button button-quiet" href="#como-funciona"><Play size={14} />{t.how}</a>
            </div>
            <div className="hero-location"><MapPin size={14} /><span>{t.city}</span></div>
          </div>
          <PhonePreview en={en} text={t} />
        </div>
        <div className="panorama-section" aria-label={en ? 'Medellín illustration' : 'Ilustración de Medellín'}>
          <div className="panorama-frame"><AnimatedPanorama en={en} /><span className="panorama-caption">{t.panoramaNote}</span></div>
        </div>
      </section>

      <section id="beneficios" className="perks-section">
        <div className="perks-inner">
          <div className="section-heading">
            <span className="section-index">01 / {en ? 'THE IDEA' : 'LA IDEA'}</span>
            <h2>{t.benefitsTitle}</h2>
            <p>{t.benefitsSub}</p>
          </div>
          <div className="perks-grid">
            {t.cards.map(([title, body], i) => <article className={`perk-card perk-${i}`} key={title}>
              <span className="perk-icon">{i === 0 ? <Store /> : i === 1 ? <Tag /> : <UsersRound />}</span>
              <span className="perk-number">0{i + 1}</span>
              <div className="perk-copy"><h3>{title}</h3><p>{body}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="comercios" className="brand-strip" aria-labelledby="brand-strip-title">
        <div className="brand-strip-inner">
          <h2 id="brand-strip-title">{t.brandsTitle}</h2>
          <div className="brand-names" aria-label={en ? 'Illustrative brand names' : 'Nombres de marcas ilustrativos'}>
            <span className="brand-wordmark brand-script">Juan Valdez</span>
            <span className="brand-wordmark brand-circle">éxito</span>
            <span className="brand-wordmark brand-serif">Crepes<br />&amp; Waffles</span>
            <span className="brand-wordmark brand-italic">falabella</span>
            <span className="brand-wordmark brand-bold">adidas</span>
            <span className="brand-wordmark brand-cinema">CINE<br />COLOMBIA</span>
            <span className="brand-wordmark brand-rappi">Rappi</span>
          </div>
          <p className="brand-disclaimer"><strong>{en ? 'Illustrative only · no partnerships' : 'Solo ilustrativo · sin alianzas'}</strong>{t.brandsDisclaimer}</p>
        </div>
      </section>

      <section id="como-funciona" className="how-section">
        <div className="how-inner">
          <div className="how-heading">
            <p className="tanda-eyebrow"><span className="eyebrow-dot" />{t.howEyebrow}</p>
            <h2>{t.howTitle}</h2>
          </div>
          <div className="how-steps">
            {t.steps.map(([number, title, body]) => <article className="how-step" key={number}>
              <span className="how-number">{number}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowRight className="how-arrow" size={17} />
            </article>)}
          </div>
          <p className="honesty-note"><span />{t.note}</p>
        </div>
      </section>

    </main>
    <footer className="tanda-footer">
      <div className="footer-main"><Brand footer /><p>{t.footer}</p><span>{t.footerNote}</span></div>
      <div className="footer-bottom"><span>TANDA</span><Link className="footer-admin-link" href="/admin">{t.admin}</Link><a href="#inicio">{en ? 'Back to top' : 'Volver arriba'} ↑</a></div>
    </footer>
    {dialogOpen && <div className="tanda-dialog-backdrop" onClick={() => setDialogOpen(false)}>
      <section className="tanda-dialog" role="dialog" aria-modal="true" aria-labelledby="tanda-dialog-title" onClick={event => event.stopPropagation()}>
        <button className="dialog-close" onClick={() => setDialogOpen(false)} aria-label={t.close} autoFocus><X size={18} /></button>
        <span className="dialog-status"><span />{t.status}</span><h2 id="tanda-dialog-title">{t.dialogTitle}</h2><p>{t.dialogBody}</p>
        <button className="tanda-button button-coral" onClick={() => setDialogOpen(false)}>{t.close}<Check size={16} /></button>
      </section>
    </div>}
  </div>;
}
