import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, MapPin, Menu, X } from 'lucide-react';
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
    links: ['How it works', 'For students', 'For local spots'],
    heroKicker: 'YOUR CITY, WITH A LITTLE MORE ROOM',
    heroTitle: <>Student life,<br /><em>with more to it.</em></>,
    heroBody: 'Tanda brings student perks and neighborhood favorites together—so your budget can go a little further, every day.',
    explore: 'See how it works',
    partnerCta: 'Meet Tanda',
    locale: 'Medellín, Colombia · starting close to home',
    story1: 'Your student days, a little lighter.',
    story2: 'Built for Medellín. Made to feel close.',
    sectionOverline: 'MADE FOR THE IN-BETWEEN',
    sectionTitle: <>Good things happen<br />between classes.</>,
    sectionBody: 'The quick coffee before a lecture. A new place to meet a friend. Tanda is being designed to make those everyday plans feel more affordable.',
    stepsEyebrow: 'A GOOD THING, MADE SIMPLE',
    stepsTitle: 'A little closer to your next favorite.',
    step1: 'Discover nearby',
    step1copy: 'Browse local offers by neighborhood and find a new favorite around the corner.',
    step2: 'Verify your student status',
    step2copy: 'A future verification flow will help participating partners recognize eligible students. No verification happens on this site.',
    step3: 'Enjoy the student perk',
    step3copy: 'Show the offer in the Tanda app at a participating local spot, subject to its terms.',
    verificationNote: 'Student verification is part of the planned app experience. This website does not collect or verify student information.',
    partnerEyebrow: 'GOOD FOR THE NEIGHBORHOOD',
    partnerTitle: <>Local spots.<br /><em>Student energy.</em></>,
    partnerBody: 'Tanda is being built around independent cafés, shops and experiences that make a city feel like yours. We want student spending to support the people and places close by.',
    partnerLink: 'Explore the idea',
    featured: 'A pause in Laureles',
    sampleOffer: '20% off coffee + pandebono',
    sampleNote: 'Illustrative sample offer · fictional business',
    benefitKicker: 'COMING TO YOUR POCKET',
    benefitTitle: 'Little savings add up.',
    benefitBody: 'A simple place to find useful student benefits—without losing the local character that makes a neighborhood special.',
    comingSoon: 'THE TANDA MOBILE APP IS IN DEVELOPMENT',
    notLive: 'Tanda is in the making. This site is an introduction, not an enrollment or offer redemption service.',
    footerLine: 'A closer way to live your city.',
    footerNote: 'Tanda is an upcoming mobile app. Offers shown are fictional examples.',
  } : {
    links: ['Cómo funciona', 'Para estudiantes', 'Negocios locales'],
    heroKicker: 'TU CIUDAD, CON UN POCO MÁS DE AIRE',
    heroTitle: <>La vida de estudiante<br /><em>rinde más.</em></>,
    heroBody: 'Tanda reúne beneficios estudiantiles y favoritos de barrio para que tu presupuesto alcance un poco más, todos los días.',
    explore: 'Así funcionará',
    partnerCta: 'Conoce Tanda',
    locale: 'Medellín, Colombia · empezamos cerca de casa',
    story1: 'Tus días de estudiante, un poco más ligeros.',
    story2: 'Hecho para Medellín. Pensado para sentirse cerca.',
    sectionOverline: 'PENSADO PARA LOS RATOS ENTRE CLASES',
    sectionTitle: <>Entre clase y clase<br />pasan cosas buenas.</>,
    sectionBody: 'Un café rápido antes de entrar. Un lugar nuevo para encontrarte con alguien. Tanda nace para que esos planes cotidianos sean un poco más amables con tu bolsillo.',
    stepsEyebrow: 'LO BUENO, SIN VUELTAS',
    stepsTitle: 'Un poco más cerca de tu próximo favorito.',
    step1: 'Descubre cerca',
    step1copy: 'Explora ofertas locales por barrio y encuentra un nuevo favorito a la vuelta.',
    step2: 'Verifica tu condición de estudiante',
    step2copy: 'Un futuro proceso de verificación ayudará a los comercios participantes a reconocer estudiantes elegibles. Este sitio no verifica a nadie.',
    step3: 'Disfruta el beneficio',
    step3copy: 'Presenta la oferta en la app de Tanda en un comercio participante, según sus condiciones.',
    verificationNote: 'La verificación estudiantil hará parte de la app futura. Este sitio no recopila ni verifica información de estudiantes.',
    partnerEyebrow: 'BUENO PARA EL BARRIO',
    partnerTitle: <>Comercios locales.<br /><em>Energía estudiante.</em></>,
    partnerBody: 'Tanda se está construyendo alrededor de cafés independientes, tiendas y experiencias que hacen que una ciudad se sienta tuya. Queremos que el gasto estudiantil apoye a las personas y lugares cercanos.',
    partnerLink: 'Descubre la idea',
    featured: 'Una pausa en Laureles',
    sampleOffer: '20% en café + pandebono',
    sampleNote: 'Oferta ilustrativa · comercio ficticio',
    benefitKicker: 'PRONTO, EN TU BOLSILLO',
    benefitTitle: 'Los pequeños ahorros suman.',
    benefitBody: 'Un lugar sencillo para encontrar beneficios estudiantiles útiles, sin perder el carácter local que hace especial a cada barrio.',
    comingSoon: 'LA APP MÓVIL DE TANDA ESTÁ EN DESARROLLO',
    notLive: 'Tanda está en desarrollo. Este sitio es una presentación, no un registro ni un servicio para canjear ofertas.',
    footerLine: 'Una forma más cercana de vivir tu ciudad.',
    footerNote: 'Tanda será una app móvil. Las ofertas aquí son ejemplos ficticios.',
  };

  const nav = <>{content.links.map((label, index) => (
    <a key={label} href={['#como-funciona', '#estudiantes', '#comercios'][index]} onClick={() => setMenuOpen(false)}>{label}</a>
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
        <figure className="panorama-banner" aria-label={en ? 'Illustrated Medellín neighborhood panorama' : 'Panorama ilustrado de un barrio de Medellín'}>
          <img src="/images/tanda-medellin-panorama.jpg" alt={en ? 'A hand-drawn Medellín street with neighborhood cafés, students, the Metrocable and green mountain ridges' : 'Una calle ilustrada de Medellín con cafés de barrio, estudiantes, el metro y montañas verdes'} />
          <span className="panorama-cloud cloud-one" aria-hidden="true" />
          <span className="panorama-cloud cloud-two" aria-hidden="true" />
        </figure>
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
        <div className="hero-bottom">
          <div className="landing-wrap hero-bottom-inner">
            <span>{content.story1}</span>
            <span className="hero-orbit-word">{en ? 'TANDA · MEDELLÍN · NEARBY' : 'TANDA · MEDELLÍN · CERCA'}</span>
            <span>{content.story2}</span>
          </div>
        </div>
      </section>

      <section id="estudiantes" className="student-section landing-wrap">
        <div className="student-index"><span>01</span><span className="index-rule" /><span>{en ? 'STUDENT LIFE' : 'VIDA ESTUDIANTIL'}</span></div>
        <div className="student-copy"><p className="landing-kicker"><span />{content.sectionOverline}</p><h2>{content.sectionTitle}</h2><p>{content.sectionBody}</p><a className="text-link" href="#como-funciona">{en ? 'See the steps' : 'Mira cómo funciona'}<ArrowRight size={15} /></a></div>
        <aside className="student-aside"><span className="aside-mark">“</span><p>{content.story1}</p><span className="aside-location">{content.story2}</span></aside>
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
