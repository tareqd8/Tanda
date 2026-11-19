import { useEffect, useState } from 'react';
import { ArrowRight, Check, Compass, Coffee, Download, GraduationCap, Grid2X2, Heart, MapPin, Menu, Percent, Play, Shirt, Store, Tag, UtensilsCrossed, X } from 'lucide-react';
import AnimatedPanorama from './AnimatedPanorama';
import ReferencePanorama from './ReferencePanorama';
import './_group.css';
import './landing.css';
import './landing-reference.css';
import './landing-scale.css';

type Language = 'es' | 'en';

const copy = {
  es: {
    nav: ['Cómo funciona', 'Beneficios', 'Para comercios'],
    app: 'Descarga la app',
    heroEyebrow: 'Una nueva forma de vivir Medellín',
    titleA: 'Estudia mucho.', titleB: 'Paga menos.',
    intro: 'Descuentos exclusivos para estudiantes en tus lugares favoritos de Colombia.',
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
      ['Descubre', 'Encuentra descuentos en restaurantes, tiendas, servicios y más.'],
      ['Ahorra', 'Disfruta beneficios pensados por ser estudiante.'],
      ['Comparte', 'Invita a tus amigos y multipliquen el ahorro.'],
    ],
    howEyebrow: 'La idea, paso a paso',
    howTitle: 'Cómo funciona',
    steps: [
      ['01', 'Descarga', 'Instala Tanda en tu celular.'],
      ['02', 'Verifica', 'Confirma que eres estudiante de una institución en Colombia.'],
      ['03', 'Ahorra', 'Explora beneficios y disfruta de descuentos exclusivos.'],
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
    intro: 'Exclusive student discounts at your favorite places in Colombia.',
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
      ['Discover', 'Find discounts at restaurants, shops, services and more.'],
      ['Save', 'Enjoy benefits designed for your student life.'],
      ['Share', 'Invite your friends and make your savings go further.'],
    ],
    howEyebrow: 'The idea, step by step',
    howTitle: 'How it works',
    steps: [
      ['01', 'Download', 'Install Tanda on your phone.'],
      ['02', 'Verify', 'Confirm you study at an institution in Colombia.'],
      ['03', 'Save', 'Explore benefits and enjoy exclusive discounts.'],
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
  return <a className={`tanda-brand${footer ? ' tanda-brand-footer' : ''}`} href="#inicio" aria-label="Tanda">
    <span className="tanda-logo-slot" data-logo-slot="replaceable-brand-mark" data-logo-ready="false" aria-label="Tanda logo">
      <span className="tanda-logo-fallback" aria-hidden="true">tanda</span>
    </span>
  </a>;
}

function PhonePreview({ en, text }: { en: boolean; text: Copy }) {
  const imageBase = `${import.meta.env.BASE_URL}images/`;
  return <div className="phone-stage" aria-label={en ? 'Illustrative preview of the future Tanda app' : 'Vista ilustrativa de la futura app Tanda'}>
    <div className="phone-orbit orbit-one" aria-hidden="true" />
    <div className="phone-orbit orbit-two" aria-hidden="true" />
    <div className="phone phone-back" aria-hidden="true">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>● ● ●</span></div>
        <div className="phone-back-heading"><span>‹</span><Heart size={10} /></div>
        <div className="app-photo-card">
          <img src={`${imageBase}reference-assets/tanda-latte-closeup.jpg`} alt="" />
          <div><strong>{en ? 'Neighborhood café' : 'Café de barrio'}</strong><span className="app-discount">30% OFF</span><p>{en ? 'A pause, just for you' : 'Una pausa para ti'}</p></div>
        </div>
        <div className="app-photo-card">
          <img src={`${imageBase}reference-assets/tanda-fashion.jpg`} alt="" />
          <div><strong>{en ? 'Urban style' : 'Moda urbana'}</strong><span className="app-discount">20% OFF</span><p>{en ? 'Find your next favorite' : 'Encuentra tu próximo favorito'}</p></div>
        </div>
      </div>
    </div>
    <div className="phone phone-front">
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span>● ● ●</span></div>
        <div className="phone-wordmark">tanda<span>·</span></div>
        <h3>{text.phoneGreeting}<span className="greeting-spark">✦</span></h3>
        <p className="phone-subline">{en ? 'Discover discounts made for you.' : 'Descubre descuentos solo para ti.'}</p>
        <div className="phone-search"><Compass size={10} />{en ? 'Search brands, places or benefits' : 'Busca marcas, lugares o beneficios'}</div>
        <div className="app-categories">
          {[UtensilsCrossed, Shirt, Coffee, Grid2X2].map((Icon, i) => <div key={i}><span><Icon size={15} /></span><small>{(en ? ['Food', 'Style', 'Cafés', 'More'] : ['Restaurantes', 'Moda', 'Cafés', 'Más'])[i]}</small></div>)}
        </div>
        <div className="phone-section-label"><strong>{en ? 'Offers for you' : 'Ofertas para ti'} <span>✦</span></strong><span>{en ? 'See all' : 'Ver todas'}</span></div>
        <div className="app-food-card">
          <div className="app-food-photo"><img src={`${imageBase}reference-assets/tanda-burger.jpg`} alt="" /><span>20% OFF</span><Heart size={12} /></div>
          <div className="app-food-copy"><strong>{en ? 'Burgers in the park' : 'Hamburguesas El Parque'}</strong><p>{en ? 'Student benefits, delicious plans.' : 'Beneficios de estudiante para tus planes.'}</p></div>
        </div>
        <p className="app-concept-note">{en ? 'Concept preview · not live' : 'Vista conceptual · no activa'}</p>
      </div>
    </div>
    {[text.stickerOfferA, text.stickerOfferB].map((offer, i) => <div className={`phone-sticker sticker-offer sticker-offer-${i === 0 ? 'a' : 'b'}`} aria-hidden="true" key={offer}>
      <svg className="badge-shape" viewBox="0 0 80 80"><path d="m39 3 9 5 10-2 5 10 10 4-1 11 5 9-7 9v12l-12 4-7 9-11-3-11 5-7-9-12-2-1-11-7-8 5-11-3-11 10-6 4-10 11 1Z" fill={i === 0 ? '#ff927c' : '#ffcf8f'} stroke="#272326" strokeWidth="2.5" strokeLinejoin="round" /></svg>
      <span>{offer.split(' ')[0]}<br />OFF</span>
    </div>)}
    <div className="phone-sticker sticker-benefit" aria-hidden="true">{en ? <>STUDENT<br />BENEFITS</> : <>BENEFICIOS<br />ESTUDIANTILES</>}</div>
    <div className="phone-sticker sticker-category sticker-food" aria-hidden="true"><Store size={15} />{text.stickerFood}</div>
    <div className="phone-sticker sticker-category sticker-fashion" aria-hidden="true"><Tag size={15} />{text.stickerFashion}</div>
    <div className="phone-sticker sticker-category sticker-coffee" aria-hidden="true"><Coffee size={15} />{text.stickerCoffee}</div>
    <div className="phone-caption"><span className="caption-dot" />{text.mockDisclaimer}</div>
  </div>;
}

function BenefitIcon({ kind }: { kind: number }) {
  return <svg viewBox="0 0 80 80" fill="none" stroke="#272326" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 14 5 8m15 1-1-7M7 25l-6-2" />
    {kind === 0 ? <>
      <path d="M20 29h48v39H20z" fill="#fff4d4" /><path d="M17 29 25 15h37l9 14" fill="#ff785f" />
      <path d="M17 29q0 10 9 6 7 8 15 0 8 8 15 0 10 5 15-6" fill="#ff785f" />
      <path d="M28 46h13v22H28zm21-2h12v12H49z" fill="#f8bc73" />
      <path d="M69 47c-10 0-15 9-12 16l12 14 12-14c3-7-2-16-12-16Z" fill="#ff6654" /><circle cx="69" cy="58" r="4" fill="#fff3db" />
    </> : kind === 1 ? <>
      <path d="m18 40 27-25 24 5 5 25-29 29Z" fill="#ff7c62" /><circle cx="59" cy="31" r="4" fill="#fff4d4" />
      <path d="m35 58 19-21" /><circle cx="36" cy="40" r="4" fill="#fff4d4" /><circle cx="54" cy="57" r="4" fill="#fff4d4" />
    </> : <>
      <circle cx="23" cy="32" r="10" fill="#c9b9f1" /><circle cx="58" cy="33" r="10" fill="#ffd080" /><circle cx="41" cy="23" r="11" fill="#ff8975" />
      <path d="M7 65v-5c0-19 32-19 32 0v5Z" fill="#d0bdf1" /><path d="M43 65v-5c0-19 32-19 32 0v5Z" fill="#ffd183" />
      <path d="M23 70v-7c0-24 37-24 37 0v7Z" fill="#ff8975" />
    </>}
  </svg>;
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
            <svg className="hero-scribble hero-scribble-left" viewBox="0 0 32 36" aria-hidden="true"><path d="m5 28-5-4m13-3L5 8m18 9L20 1" /></svg>
            <svg className="hero-scribble hero-scribble-right" viewBox="0 0 32 36" aria-hidden="true"><path d="m4 10 8-8m-5 18 18-7M9 28l20 3" /></svg>
            <p className="tanda-eyebrow"><span className="eyebrow-dot" />{t.heroEyebrow}</p>
            <h1>{t.titleA}<br /><span>{t.titleB}</span></h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-buttons">
               <button className="tanda-button button-coral" onClick={() => setDialogOpen(true)}><Download size={16} />{t.download}</button>
              <a className="tanda-button button-quiet" href="#como-funciona"><Play size={14} />{t.how}</a>
            </div>
            <div className="hero-location"><MapPin size={14} /><span>{t.city}</span></div>
          </div>
          <PhonePreview en={en} text={t} />
        </div>
        <div className="panorama-section" aria-label={en ? 'Medellín illustration' : 'Ilustración de Medellín'}>
          <div className="panorama-frame"><div className="reference-scene-desktop"><ReferencePanorama en={en} /></div><div className="reference-scene-mobile"><AnimatedPanorama en={en} /></div><span className="panorama-caption">{t.panoramaNote}</span></div>
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
              <span className="perk-icon"><BenefitIcon kind={i} /></span>
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
            <span className="brand-wordmark brand-juan">Juan Valdez<span>CAFÉ DE COLOMBIA</span></span>
            <span className="brand-wordmark"><span className="brand-exito">éxito</span></span>
            <span className="brand-wordmark brand-crepes">Crepes<br />&amp; Waffles</span>
            <span className="brand-wordmark brand-falabella">falabella.</span>
            <span className="brand-wordmark brand-adidas"><svg viewBox="0 0 70 45" aria-label="adidas" role="img"><g fill="#171717"><path d="m12 23 7-4 8 14H17Zm15-9 7-4 14 23H36Zm15-9 7-4 19 32H56Z" /><text x="35" y="44" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="16">adidas</text></g></svg></span>
            <span className="brand-wordmark brand-cine"><svg viewBox="0 0 80 42" role="img" aria-label="Cine Colombia"><g fill="none" stroke="#16388b" strokeWidth="3"><circle cx="32" cy="16" r="13" /><circle cx="32" cy="16" r="8" /><path d="M42 7a13 13 0 1 1 0 18m2-14a8 8 0 1 1 0 10" /></g><text x="40" y="40" textAnchor="middle" fill="#16388b" fontSize="7" fontWeight="900" fontFamily="Arial,sans-serif">CINE COLOMBIA</text></svg></span>
            <span className="brand-wordmark"><img src={`${import.meta.env.BASE_URL}images/reference-assets/rappi.png`} alt="Rappi" /></span>
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
            {t.steps.map(([number, title, body], i) => <article className="how-step" key={number}>
              <span className={`how-number how-icon-${i}`}>{i === 0 ? <Download /> : i === 1 ? <GraduationCap /> : <Percent />}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowRight className="how-arrow" size={17} />
            </article>)}
          </div>
          <p className="honesty-note"><span />{t.note}</p>
        </div>
      </section>

    </main>
    <footer className="tanda-footer">
      <div className="footer-main"><Brand footer /><p>{t.footer}</p><span>{t.footerNote}</span></div>
      <div className="footer-bottom"><span>TANDA</span><a className="footer-admin-link" href="/admin">{t.admin}</a><a href="#inicio">{en ? 'Back to top' : 'Volver arriba'} ↑</a></div>
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
