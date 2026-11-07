import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Download, Menu, Play, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
type Language = 'es' | 'en';

function Landing() {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('tanda-language') === 'en' ? 'en' : 'es');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tanda-language', language);
  }, [language]);

  const en = language === 'en';
  const content = en ? {
    links: ['How it works', 'Benefits', 'For local spots'],
    heroKicker: 'A NEW WAY TO FIND YOUR PLACE IN THE CITY',
    heroTitle: <>Student life<br /><em>comes with its perks.</em></>,
    heroBody: 'Tanda is an upcoming app in the making, bringing student perks and neighborhood favorites together. We’re starting in Medellín.',
    explore: 'See how it could work',
    partnerCta: 'For local places',
    locale: 'Medellín, Colombia · starting close to home',
    story1: 'Your city, one neighborhood at a time.',
    story2: 'Made with Medellín in mind.',
    sectionOverline: 'THE IDEA, IN THREE PARTS',
    sectionTitle: <>More close-by<br />things to look forward to.</>,
    sectionBody: 'Tanda is in early development. We’re imagining a simpler way for students to discover independent places, find future savings and keep local neighborhoods thriving.',
    card1: 'Discover nearby',
    card1copy: 'A future guide to cafés, shops and small favorites around your campus and neighborhood.',
    card2: 'Student savings, ahead',
    card2copy: 'We’re working toward useful student perks for everyday plans. Offers are not live yet.',
    card3: 'Keep it local',
    card3copy: 'A future way to help more student spending find its way to neighborhood businesses.',
    stepsEyebrow: 'A GOOD THING, MADE SIMPLE',
    stepsTitle: 'A little closer to your next favorite.',
    step1: 'Discover nearby',
    step1copy: 'The planned app will help students explore local places by neighborhood and find a new favorite around the corner.',
    step2: 'Student eligibility',
    step2copy: 'A student verification flow is being considered for the future app. No verification happens on this site.',
    step3: 'Use a future perk',
    step3copy: 'If local partners join, eligible students may be able to use their perks through the future app, subject to each partner’s terms.',
    verificationNote: 'Student verification is part of the planned app experience. This website does not collect or verify student information.',
    partnerEyebrow: 'GOOD FOR THE NEIGHBORHOOD',
    partnerTitle: <>Local spots.<br /><em>Student energy.</em></>,
    partnerBody: 'Tanda is being built around independent cafés, shops and experiences that make a city feel like yours. We want student spending to support the people and places close by.',
    partnerLink: 'How it could work',
    featured: 'A neighborhood pause',
    sampleOffer: 'Independent places, at the heart of it',
    sampleNote: 'Editorial photograph · no offer is currently available',
    benefitKicker: 'A STUDENT-PERKS APP IN THE MAKING',
    benefitTitle: 'Little savings, rooted here.',
    benefitBody: 'Tanda is being developed as a future place to discover student perks while staying connected to the local character that makes a neighborhood special.',
    comingSoon: 'THE TANDA MOBILE APP IS IN DEVELOPMENT',
    notLive: 'Tanda is in the making. This site is an introduction, not an enrollment or offer redemption service.',
    footerLine: 'A closer way to live your city.',
    footerNote: 'Tanda is an upcoming mobile app. No offers are live on this site.',
  } : {
    links: ['Cómo funciona', 'Beneficios', 'Negocios locales'],
    heroKicker: 'UNA NUEVA FORMA DE ENCONTRAR TU LUGAR EN LA CIUDAD',
    heroTitle: <>Ser estudiante<br /><em>tiene sus beneficios.</em></>,
    heroBody: 'Tanda será una app que conecte beneficios estudiantiles con favoritos de barrio. Estamos empezando en Medellín.',
    explore: 'Así podría funcionar',
    partnerCta: 'Para negocios locales',
    locale: 'Medellín, Colombia · empezamos cerca de casa',
    story1: 'Tu ciudad, barrio a barrio.',
    story2: 'Pensado desde Medellín.',
    sectionOverline: 'LA IDEA, EN TRES PARTES',
    sectionTitle: <>Más planes cerca<br />para imaginar.</>,
    sectionBody: 'Tanda está en una etapa temprana de desarrollo. Imaginamos una forma sencilla para que estudiantes descubran lugares independientes, encuentren ahorros a futuro y mantengan vivos los barrios.',
    card1: 'Descubre cerca',
    card1copy: 'Una guía futura de cafés, tiendas y pequeños favoritos cerca de tu campus y tu barrio.',
    card2: 'Ahorros estudiantiles, pronto',
    card2copy: 'Trabajamos para ofrecer beneficios útiles para los planes de todos los días. Aún no hay ofertas activas.',
    card3: 'Que siga lo local',
    card3copy: 'Una forma futura de ayudar a que más compras estudiantiles lleguen a los negocios del barrio.',
    stepsEyebrow: 'LO BUENO, SIN VUELTAS',
    stepsTitle: 'Un poco más cerca de tu próximo favorito.',
    step1: 'Descubre cerca',
    step1copy: 'La app planeada ayudará a explorar lugares locales por barrio y a encontrar un nuevo favorito a la vuelta.',
    step2: 'Elegibilidad estudiantil',
    step2copy: 'Estamos considerando un proceso de verificación estudiantil para la app futura. Este sitio no verifica a nadie.',
    step3: 'Usa un beneficio futuro',
    step3copy: 'Si se suman comercios locales, estudiantes elegibles podrían usar beneficios desde la app futura, según las condiciones de cada negocio.',
    verificationNote: 'La verificación estudiantil hará parte de la app futura. Este sitio no recopila ni verifica información de estudiantes.',
    partnerEyebrow: 'BUENO PARA EL BARRIO',
    partnerTitle: <>Comercios locales.<br /><em>Energía estudiante.</em></>,
    partnerBody: 'Tanda se está construyendo alrededor de cafés independientes, tiendas y experiencias que hacen que una ciudad se sienta tuya. Queremos que el gasto estudiantil apoye a las personas y lugares cercanos.',
    partnerLink: 'Así podría funcionar',
    featured: 'Una pausa de barrio',
    sampleOffer: 'Comercios independientes, en el centro',
    sampleNote: 'Fotografía editorial · aún no hay ofertas disponibles',
    benefitKicker: 'UNA APP DE BENEFICIOS ESTUDIANTILES EN DESARROLLO',
    benefitTitle: 'Pequeños ahorros, con raíces aquí.',
    benefitBody: 'Tanda se está desarrollando como un espacio futuro para descubrir beneficios estudiantiles y seguir conectados con el carácter local de cada barrio.',
    comingSoon: 'LA APP MÓVIL DE TANDA ESTÁ EN DESARROLLO',
    notLive: 'Tanda está en desarrollo. Este sitio es una presentación, no un registro ni un servicio para canjear ofertas.',
    footerLine: 'Una forma más cercana de vivir tu ciudad.',
    footerNote: 'Tanda será una app móvil. Este sitio no tiene ofertas activas.',
  };

  const [soonOpen, setSoonOpen] = useState(false);
  useEffect(() => {
    if (!soonOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSoonOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [soonOpen]);
  const t = en ? {
    links: ['How it works', 'Benefits', 'For businesses'], download: 'Get the app', downloadMain: 'Download Tanda', see: 'See how it works',
    title: <>Student life comes with <span className="ink-underline">perks</span>.</>, sub: 'Student discounts at your favorite places across Colombia, coming soon.',
    benefitsTitle: 'Everything you need to save more.',
    cards: [['Discover', 'Find student discounts at restaurants, shops and services near you.'], ['Save', 'Enjoy perks made just for being a student.'], ['Share', 'Invite your friends, plan together and save together.']],
    soonTitle: 'Tanda is on its way', soonBody: 'Our mobile app is still in development, so it is not in the app stores yet. We are building it with students and local businesses in Colombia. Thanks for your patience.', close: 'Close',
  } : {
    links: ['Cómo funciona', 'Beneficios', 'Para comercios'], download: 'Descarga la app', downloadMain: 'Descargar Tanda', see: 'Ver cómo funciona',
    title: <>Ser estudiante tiene sus <span className="ink-underline">beneficios</span>.</>, sub: 'Descuentos exclusivos en tus lugares favoritos de Colombia, muy pronto.',
    benefitsTitle: 'Todo lo que necesitas para ahorrar más.',
    cards: [['Descubre', 'Encuentra descuentos en restaurantes, tiendas, servicios y más.'], ['Ahorra', 'Disfruta beneficios pensados por ser estudiante.'], ['Comparte', 'Invita a tus amigos, planeen juntos y multipliquen el ahorro.']],
    soonTitle: 'Tanda viene en camino', soonBody: 'Nuestra app móvil todavía está en desarrollo, así que aún no está en las tiendas de apps. La estamos construyendo con estudiantes y comercios locales de Colombia. Gracias por la paciencia.', close: 'Cerrar',
  };
  const nav = <>{t.links.map((label, index) => (
    <a key={label} href={['#como-funciona', '#beneficios', '#comercios'][index]} onClick={() => setMenuOpen(false)} data-testid={`link-nav-${index}`}>{label}</a>
  ))}</>;
  const icons = [
    <svg viewBox="0 0 64 64" key="d"><path d="M10 26h40v28H10z" fill="#FFE3D6"/><path d="M8 26l5-12h34l5 12z" fill="#F4513B"/><path d="M8 26q5 6 11 0q5 6 11 0q5 6 11 0q5 6 11 0" fill="#FFFCFB"/><path d="M17 54V38h12v16" fill="#FDD6A8"/><path d="M48 32c-6 0-10 4-10 9 0 7 10 15 10 15s10-8 10-15c0-5-4-9-10-9z" fill="#F4513B"/><circle cx="48" cy="41" r="3.5" fill="#FFFCFB"/></svg>,
    <svg viewBox="0 0 64 64" key="a"><path d="M30 8h20l6 6v20L30 60 6 36z" fill="#F4513B" transform="rotate(8 32 32)"/><circle cx="45" cy="18" r="4" fill="#FFFCFB"/><path d="M24 42l14-14" /><circle cx="25" cy="31" r="3" fill="none"/><circle cx="37" cy="41" r="3" fill="none"/></svg>,
    <svg viewBox="0 0 64 64" key="c"><circle cx="16" cy="26" r="7" fill="#C9C3EA"/><path d="M4 52c0-10 6-15 12-15s12 5 12 15z" fill="#C9C3EA"/><circle cx="48" cy="26" r="7" fill="#FDD6A8"/><path d="M36 52c0-10 6-15 12-15s12 5 12 15z" fill="#FDD6A8"/><circle cx="32" cy="22" r="8" fill="#F4513B"/><path d="M18 56c0-12 7-18 14-18s14 6 14 18z" fill="#F4513B"/></svg>,
  ];

  return <div className="landing-shell">
    <header className="landing-header">
      <div className="landing-wrap header-inner">
        <a className="landing-brand" href="#inicio" aria-label="Tanda" data-testid="link-home">tanda<svg className="brand-rays" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14l5-2M8 7l3 3M15 3l-1 5"/></svg></a>
        <nav className="landing-nav" aria-label={en ? 'Main navigation' : 'Navegación principal'}>{nav}</nav>
        <div className="header-actions">
          <button className="landing-language" aria-label={en ? 'Cambiar idioma a español' : 'Switch language to English'} onClick={() => setLanguage(en ? 'es' : 'en')} data-testid="button-language">{en ? 'ES' : 'EN'}</button>
          <button className="pill pill-coral header-cta" onClick={() => setSoonOpen(true)} data-testid="button-download-header">{t.download}</button>
          <button className="landing-menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)} data-testid="button-menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="landing-mobile-nav" aria-label={en ? 'Mobile navigation' : 'Navegación móvil'}>{nav}<button className="pill pill-coral" onClick={() => { setMenuOpen(false); setSoonOpen(true); }}>{t.download}</button></nav>}
    </header>

    <main id="inicio">
      <section className="hero">
        <div className="landing-wrap hero-copy">
          <h1>{t.title}<svg className="title-rays" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18l6-3M8 10l5 3M15 4l-1 6"/></svg></h1>
          <p className="hero-sub">{t.sub}</p>
          <div className="hero-ctas">
            <button className="pill pill-coral" onClick={() => setSoonOpen(true)} data-testid="button-download-hero"><Download size={17} />{t.downloadMain}</button>
            <a className="pill pill-outline" href="#como-funciona" data-testid="link-how"><Play size={15} />{t.see}</a>
          </div>
        </div>
        <figure className="panorama" aria-label={en ? 'Hand-drawn Colombian street with students, a cable car and local shops' : 'Calle colombiana ilustrada con estudiantes, metrocable y comercios locales'}>
          <img
            className="reference-panorama"
            src={`${import.meta.env.BASE_URL}images/tanda-panorama-crisp.svg`}
            width={1220}
            height={292}
            fetchPriority="high"
            alt={en ? 'Colombian students sharing a phone, surrounded by coffee, hillside neighborhoods, cable cars, a taxi and a cyclist. Discount stickers are illustrative, not live offers.' : 'Estudiantes colombianos con un celular, rodeados de café, barrios en la montaña, metrocable, un taxi y una ciclista. Los descuentos ilustrados son ejemplos, no ofertas activas.'}
          />
        </figure>
      </section>

      <section id="beneficios" className="benefits landing-wrap">
        <h2><span className="rays-l" aria-hidden="true" />{t.benefitsTitle}<span className="rays-r" aria-hidden="true" /></h2>
        <div className="benefit-cards">
          {t.cards.map(([title, body], i) => <article key={title} className={`benefit-card tone-${i}`} data-testid={`card-benefit-${i}`}>
            <span className="benefit-icon" aria-hidden="true">{icons[i]}</span>
            <div><h3>{title}</h3><p>{body}</p></div>
          </article>)}
        </div>
      </section>

      <section id="como-funciona" className="how-section">
        <div className="landing-wrap">
          <div className="section-intro"><p className="landing-kicker"><span />{content.stepsEyebrow}</p><h2>{content.stepsTitle}</h2></div>
          <div className="steps-list">
            {[content.step1, content.step2, content.step3].map((title, index) => {
              const body = [content.step1copy, content.step2copy, content.step3copy][index];
              return <article className="step-row" key={title}><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p><ArrowRight className="step-arrow" size={18} aria-hidden="true" /></article>;
            })}
          </div>
          <p className="verification-note"><span className="note-rule" />{content.verificationNote}</p>
        </div>
      </section>

      <section id="comercios" className="partner-section landing-wrap">
        <div className="partner-panel">
          <div className="partner-copy">
            <div className="partner-meta"><span>02</span><span>{en ? 'LOCAL PARTNERS' : 'COMERCIOS LOCALES'}</span></div>
            <p className="landing-kicker"><span />{content.partnerEyebrow}</p>
            <h2>{content.partnerTitle}</h2>
            <p>{content.partnerBody}</p>
            <a className="text-link partner-link" href="#como-funciona">{content.partnerLink}<ArrowRight size={15} /></a>
          </div>
          <figure className="partner-visual">
            <img src="/images/tanda-cafe-editorial.jpg" alt={en ? 'Coffee at a neighborhood café table' : 'Un café en la mesa de un café de barrio'} />
            <figcaption><span>{content.featured}</span><span>{content.sampleOffer}</span><small>{content.sampleNote}</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="closing-section">
        <div className="landing-wrap closing-inner">
          <p className="landing-kicker"><span />{content.benefitKicker}</p>
          <h2>{content.benefitTitle}</h2>
          <p>{content.benefitBody}</p>
          <span className="coming-soon">{content.comingSoon}</span>
          <p className="not-live-note">{content.notLive}</p>
        </div>
      </section>
    </main>
    <footer className="landing-footer">
      <div className="landing-wrap footer-inner">
        <a className="landing-brand" href="#inicio">tanda</a>
        <p>{content.footerLine}</p><span>{content.footerNote}</span>
      </div>
    </footer>
    {soonOpen && <div className="soon-backdrop" onClick={() => setSoonOpen(false)} data-testid="dialog-backdrop">
      <div className="soon-dialog" role="dialog" aria-modal="true" aria-labelledby="soon-title" onClick={e => e.stopPropagation()}>
        <button className="soon-close" onClick={() => setSoonOpen(false)} aria-label={t.close} autoFocus data-testid="button-close-dialog"><X size={18} /></button>
        <span className="soon-tag">{en ? 'In development' : 'En desarrollo'}</span>
        <h2 id="soon-title">{t.soonTitle}</h2>
        <p>{t.soonBody}</p>
        <button className="pill pill-coral" onClick={() => setSoonOpen(false)} data-testid="button-dialog-ok">{t.close}</button>
      </div>
    </div>}
  </div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Landing} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
