import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Compass, MapPin, Menu, Store, Tag, X } from 'lucide-react';
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

  const nav = <>{content.links.map((label, index) => (
    <a key={label} href={['#como-funciona', '#beneficios', '#comercios'][index]} onClick={() => setMenuOpen(false)}>{label}</a>
  ))}</>;

  return <div className="landing-shell">
    <header className="landing-header">
      <div className="landing-wrap header-inner">
        <a className="landing-brand" href="#inicio" aria-label="Tanda, inicio"><span className="brand-mark">t</span><span>tanda</span></a>
        <nav className="landing-nav" aria-label={en ? 'Main navigation' : 'Navegación principal'}>{nav}</nav>
        <div className="header-actions">
          <button className="landing-language" aria-label={en ? 'Cambiar idioma a español' : 'Switch language to English'} onClick={() => setLanguage(en ? 'es' : 'en')} data-testid="button-language">{en ? 'ES' : 'EN'}<span aria-hidden="true">↗</span></button>
          <a href="#como-funciona" className="header-cta">{content.explore}<ArrowRight size={15} /></a>
          <button className="landing-menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="landing-mobile-nav" aria-label={en ? 'Mobile navigation' : 'Navegación móvil'}>{nav}<a href="#como-funciona" onClick={() => setMenuOpen(false)}>{content.explore}<ArrowRight size={15} /></a></nav>}
    </header>

    <main id="inicio">
      <section className="landing-hero">
        <div className="landing-wrap hero-layout">
          <div className="hero-copy">
            <p className="landing-kicker"><span />{content.heroKicker}</p>
            <h1>{content.heroTitle}</h1>
          </div>
          <div className="hero-details">
            <p className="hero-lede">{content.heroBody}</p>
            <div className="hero-ctas">
              <a className="coral-button" href="#como-funciona">{content.explore}<ArrowRight size={17} /></a>
              <a href="#comercios" className="text-link">{content.partnerCta}<ArrowRight size={15} /></a>
            </div>
            <p className="hero-footnote"><MapPin size={14} />{content.locale}</p>
          </div>
        </div>
        <figure className="panorama-banner landing-wrap" aria-label={en ? 'Illustrated Medellín neighborhood panorama' : 'Panorama ilustrado de un barrio de Medellín'}>
          <img src="/images/tanda-medellin-panorama.jpg" alt={en ? 'A hand-drawn Medellín street with neighborhood cafés, students, the Metrocable and green mountain ridges' : 'Una calle ilustrada de Medellín con cafés de barrio, estudiantes, el metro y montañas verdes'} />
          <svg className="metrocable-overlay" viewBox="0 0 1440 455" preserveAspectRatio="none" aria-hidden="true">
            <path className="cable-halo" d="M82 172 Q700 70 1358 142" />
            <path className="cable-line" d="M82 172 Q700 70 1358 142" />
            <g className="cable-tower" transform="translate(335 119) rotate(-8)">
              <path d="M0 9h44M7 9l8 77m22-77-8 77M3 37h38M9 66h27" />
              <path d="M-7 8h58" />
            </g>
            <g className="cable-tower" transform="translate(1036 105) rotate(5)">
              <path d="M0 9h44M7 9l8 77m22-77-8 77M3 37h38M9 66h27" />
              <path d="M-7 8h58" />
            </g>
            <g className="gondola gondola-secondary" transform="translate(852 97)">
              <path className="hanger" d="M0 0v15" />
              <path className="car-outline" d="M-18 15h36l-3 27q-15 9-30 0z" />
              <path className="car-window" d="M-11 20h22l-2 12h-18z" />
              <path className="car-base" d="M-13 44h26" />
            </g>
            <g className="gondola gondola-moving">
              <path className="hanger" d="M0 0v15" />
              <path className="car-outline" d="M-18 15h36l-3 27q-15 9-30 0z" />
              <path className="car-window" d="M-11 20h22l-2 12h-18z" />
              <path className="car-base" d="M-13 44h26" />
            </g>
          </svg>
          <span className="panorama-cloud cloud-one" aria-hidden="true" />
          <span className="panorama-cloud cloud-two" aria-hidden="true" />
        </figure>
        <div className="hero-bottom">
          <div className="landing-wrap hero-bottom-inner">
            <span>{content.story1}</span>
            <span className="hero-orbit-word">{en ? 'TANDA · MEDELLÍN · NEARBY' : 'TANDA · MEDELLÍN · CERCA'}</span>
            <span>{content.story2}</span>
          </div>
        </div>
      </section>

      <section id="beneficios" className="benefits-section landing-wrap">
        <div className="benefits-intro">
          <div className="student-index"><span>01</span><span className="index-rule" /><span>{en ? 'STUDENT LIFE' : 'VIDA ESTUDIANTIL'}</span></div>
          <div className="student-copy"><p className="landing-kicker"><span />{content.sectionOverline}</p><h2>{content.sectionTitle}</h2><p>{content.sectionBody}</p></div>
          <aside className="student-aside"><span className="aside-mark">“</span><p>{content.story1}</p><span className="aside-location">{content.story2}</span></aside>
        </div>
        <div className="benefit-cards">
          {[
            { icon: <Compass size={23} strokeWidth={1.7} />, title: content.card1, body: content.card1copy, tone: 'coral' },
            { icon: <Tag size={23} strokeWidth={1.7} />, title: content.card2, body: content.card2copy, tone: 'apricot' },
            { icon: <Store size={23} strokeWidth={1.7} />, title: content.card3, body: content.card3copy, tone: 'sky' },
          ].map((card, index) => <article key={card.title} className={`benefit-card benefit-${card.tone}`}>
            <span className="benefit-number">0{index + 1}</span>
            <span className="benefit-icon" aria-hidden="true">{card.icon}</span>
            <h3>{card.title}</h3><p>{card.body}</p>
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
        <a className="landing-brand" href="#inicio"><span className="brand-mark">t</span><span>tanda</span></a>
        <p>{content.footerLine}</p><span>{content.footerNote}</span>
      </div>
    </footer>
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
