import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, BadgeCheck, ChevronDown, Compass, Heart, House, MapPin, Menu, Search, ShieldCheck, Sparkles, Store, Ticket, UserRound, Wallet, X } from 'lucide-react';
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
  useEffect(() => { localStorage.setItem('tanda-language', language); }, [language]);
  const en = language === 'en';
  const content = en ? {
    links: ['How it works', 'For students', 'For local spots'], heroKicker: 'YOUR CITY, WITH A LITTLE MORE ROOM',
    heroTitle: <>Student life,<br /><em>with more to it.</em></>,
    heroBody: 'Tanda brings student perks and neighborhood favorites together—so your budget can go a little further, every day.',
    explore: 'See how it works', partnerCta: 'Meet Tanda',
    previewLabel: 'A little preview of what’s ahead', phoneSub: 'Medellín · Laureles',
    featured: 'A pause in Laureles', offerName: 'Café Ladera', mockDeal: '20% off coffee + pandebono',
    offerPrice: 'COP $12,000', example: 'Illustrative sample offer · fictional business',
    sectionOverline: 'MADE FOR THE IN-BETWEEN', sectionTitle: <>Good things happen<br />between classes.</>,
    sectionBody: 'The quick coffee before a lecture. A new place to meet a friend. Tanda is being designed to make those everyday plans feel more affordable.',
    step1: 'Discover nearby', step1copy: 'Browse local offers by neighborhood and find a new favorite around the corner.',
    step2: 'Verify your student status', step2copy: 'A future verification flow will help participating partners recognize eligible students. No verification happens on this site.',
    step3: 'Enjoy the student perk', step3copy: 'Show the offer in the Tanda app at a participating local spot, subject to its terms.',
    partnerEyebrow: 'GOOD FOR THE NEIGHBORHOOD', partnerTitle: <>Local spots.<br /><em>Student energy.</em></>,
    partnerBody: 'Tanda is being built around independent cafés, shops and experiences that make a city feel like yours. We want student spending to support the people and places close by.',
    partnerButton: 'Explore the idea', mockTerms: 'Example only · fictional offer',
    benefitTitle: 'Little savings add up.', benefitBody: 'A simple place to find useful student benefits—without losing the local character that makes a neighborhood special.',
    footerLine: 'A closer way to live your city.', footerNote: 'Tanda is an upcoming mobile app. Offers shown are fictional examples.',
    story1: 'Your student days, a little lighter.', story2: 'Built for Medellín. Made to feel close.',
    notLive: 'Tanda is in the making. This site is an introduction, not an enrollment or offer redemption service.',
  } : {
    links: ['Cómo funciona', 'Para estudiantes', 'Negocios locales'], heroKicker: 'TU CIUDAD, CON UN POCO MÁS DE AIRE',
    heroTitle: <>La vida de estudiante<br /><em>rinde más.</em></>,
    heroBody: 'Tanda reúne beneficios estudiantiles y favoritos de barrio para que tu presupuesto alcance un poco más, todos los días.',
    explore: 'Así funcionará', partnerCta: 'Conoce Tanda',
    previewLabel: 'Un pequeño vistazo a lo que viene', phoneSub: 'Medellín · Laureles',
    featured: 'Una pausa en Laureles', offerName: 'Café Ladera', mockDeal: '20% en café + pandebono',
    offerPrice: '$12.000 COP', example: 'Oferta ilustrativa · comercio ficticio',
    sectionOverline: 'PENSADO PARA LOS RATOS ENTRE CLASES', sectionTitle: <>Entre clase y clase<br />pasan cosas buenas.</>,
    sectionBody: 'Un café rápido antes de entrar. Un lugar nuevo para encontrarte con alguien. Tanda nace para que esos planes cotidianos sean un poco más amables con tu bolsillo.',
    step1: 'Descubre cerca', step1copy: 'Explora ofertas locales por barrio y encuentra un nuevo favorito a la vuelta.',
    step2: 'Verifica tu condición de estudiante', step2copy: 'Un futuro proceso de verificación ayudará a los comercios participantes a reconocer estudiantes elegibles. Este sitio no verifica a nadie.',
    step3: 'Disfruta el beneficio', step3copy: 'Presenta la oferta en la app de Tanda en un comercio participante, según sus condiciones.',
    partnerEyebrow: 'BUENO PARA EL BARRIO', partnerTitle: <>Comercios locales.<br /><em>Energía estudiante.</em></>,
    partnerBody: 'Tanda se está construyendo alrededor de cafés independientes, tiendas y experiencias que hacen que una ciudad se sienta tuya. Queremos que el gasto estudiantil apoye a las personas y lugares cercanos.',
    partnerButton: 'Descubre la idea', mockTerms: 'Solo ejemplo · oferta ficticia',
    benefitTitle: 'Los pequeños ahorros suman.', benefitBody: 'Un lugar sencillo para encontrar beneficios estudiantiles útiles, sin perder el carácter local que hace especial a cada barrio.',
    footerLine: 'Una forma más cercana de vivir tu ciudad.', footerNote: 'Tanda será una app móvil. Las ofertas aquí son ejemplos ficticios.',
    story1: 'Tus días de estudiante, un poco más ligeros.', story2: 'Hecho para Medellín. Pensado para sentirse cerca.',
    notLive: 'Tanda está en desarrollo. Este sitio es una presentación, no un registro ni un servicio para canjear ofertas.',
  };
  const nav = <>{content.links.map((label, index) => <a key={label} href={['#como-funciona', '#estudiantes', '#comercios'][index]} onClick={() => setMenuOpen(false)}>{label}</a>)}</>;
  return <div className="landing-shell">
    <header className="landing-header">
      <div className="landing-wrap header-inner">
        <a className="landing-brand" href="#inicio" aria-label="Tanda, inicio"><span className="brand-symbol"><Sparkles size={17} /></span>tanda</a>
        <nav className="landing-nav">{nav}</nav>
        <div className="header-actions">
          <button className="landing-language" aria-label={en ? 'Cambiar idioma a español' : 'Switch language to English'} onClick={() => setLanguage(en ? 'es' : 'en')} data-testid="button-language">{en ? 'ES' : 'EN'} <span>↗</span></button>
          <a href="#como-funciona" className="header-cta">{content.explore}<ArrowRight size={15} /></a>
          <button className="landing-menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="landing-mobile-nav">{nav}<a href="#como-funciona" onClick={() => setMenuOpen(false)}>{content.explore}<ArrowRight size={15} /></a></nav>}
    </header>
    <main id="inicio">
      <section className="landing-hero">
        <div className="landing-wrap hero-layout">
          <div className="hero-message">
            <p className="landing-kicker"><span />{content.heroKicker}</p>
            <h1>{content.heroTitle}</h1>
            <p className="hero-lede">{content.heroBody}</p>
            <div className="hero-ctas"><a className="coral-button" href="#como-funciona">{content.explore}<ArrowRight size={17} /></a><a href="#comercios" className="text-link">{content.partnerCta}<ArrowRight size={15} /></a></div>
            <p className="hero-footnote"><MapPin size={14} />{en ? 'Starting with Medellín, Colombia' : 'Empezamos por Medellín, Colombia'}</p>
          </div>
          <div className="phone-stage" aria-label={content.previewLabel}>
            <div className="float-note note-top"><span className="mini-dot" />{content.previewLabel}</div>
            <div className="phone-frame" aria-hidden="true">
              <div className="phone-top"><span>9:41</span><span className="phone-signals">••• ▰</span></div>
              <div className="phone-brand-row"><div><b>tanda</b><small>{en ? 'Tanda gives you perks' : 'Tanda te da descuentos'}</small></div><span className="mini-verified"><BadgeCheck size={12} />{en ? 'Demo · not verified' : 'Demo · no verificado'}</span></div>
              <div className="phone-location"><MapPin size={14} /><span><b>Medellín</b><small>Laureles</small></span><ChevronDown size={14} /></div>
              <div className="phone-search"><Search size={14} />{en ? 'Find a place or a perk' : 'Busca comercios o descuentos'}</div>
              <div className="phone-chips"><span>{en ? 'All' : 'Todo'}</span><span>{en ? 'Coffee' : 'Cafés'}</span><span>{en ? 'Food' : 'Comida'}</span></div>
              <h3>{content.featured}<ArrowRight size={14} /></h3>
              <div className="phone-offer-art"><div className="steam-mark">〰</div><div className="demo-cup"><i /></div><div className="demo-saucer" /><div className="demo-bread" /></div>
              <div className="phone-card-copy"><div className="phone-card-title"><b>{content.offerName}</b><Heart size={15} /></div><small>{content.example}</small><strong>{content.mockDeal}</strong><div className="price-line"><del>$15.000</del><b>{content.offerPrice}</b></div></div>
              <div className="phone-tabbar"><span><House size={14} />{en ? 'Home' : 'Inicio'}</span><span><Ticket size={14} />{en ? 'Perks' : 'Ofertas'}</span><span><MapPin size={14} />{en ? 'Map' : 'Mapa'}</span><span><UserRound size={14} />{en ? 'You' : 'Tú'}</span></div>
            </div>
            <div className="float-note note-bottom"><span className="preview-spark"><Sparkles size={15} /></span>{content.phoneSub}</div>
          </div>
        </div>
        <div className="hero-bottom wash-band"><div className="landing-wrap hero-bottom-inner"><span>{content.story1}</span><span className="hero-orbit-word">{en ? 'TANDA · MEDELLÍN · NEARBY' : 'TANDA · MEDELLÍN · CERCA'}</span><span>{content.story2}</span></div></div>
      </section>
      <section id="estudiantes" className="student-section landing-wrap">
        <div className="student-copy"><p className="landing-kicker"><span />{content.sectionOverline}</p><h2>{content.sectionTitle}</h2><p>{content.sectionBody}</p><a className="text-link" href="#como-funciona">{en ? 'See the steps' : 'Mira cómo funciona'}<ArrowRight size={15} /></a></div>
        <div className="benefit-stamp"><div className="stamp-inner"><span>{en ? 'FOR THE' : 'PARA LA'}</span><b>{en ? 'student' : 'vida'}</b><em>{en ? 'days' : 'estudiante'}</em><Sparkles size={20} /></div></div>
      </section>
      <section id="como-funciona" className="how-section">
        <div className="landing-wrap">
          <div className="section-intro"><p className="landing-kicker"><span />{en ? 'A GOOD THING, MADE SIMPLE' : 'LO BUENO, SIN VUELTAS'}</p><h2>{en ? 'A little closer to your next favorite.' : 'Un poco más cerca de tu próximo favorito.'}</h2></div>
          <div className="steps-list">
            {[{ icon: Compass, n: '01', title: content.step1, body: content.step1copy }, { icon: ShieldCheck, n: '02', title: content.step2, body: content.step2copy }, { icon: Wallet, n: '03', title: content.step3, body: content.step3copy }].map(({ icon: Icon, n, title, body }) => <article className="step-card" key={n}><div className="step-card-top"><span>{n}</span><Icon size={22} strokeWidth={1.6} /></div><h3>{title}</h3><p>{body}</p></article>)}
          </div>
          <p className="verification-note"><ShieldCheck size={16} />{en ? 'Student verification is part of the planned app experience. This website does not collect or verify student information.' : 'La verificación estudiantil hará parte de la app futura. Este sitio no recopila ni verifica información de estudiantes.'}</p>
        </div>
      </section>
      <section id="comercios" className="partner-section landing-wrap">
        <div className="partner-panel">
          <div className="partner-copy"><p className="landing-kicker"><span />{content.partnerEyebrow}</p><h2>{content.partnerTitle}</h2><p>{content.partnerBody}</p><a className="coral-button" href="#como-funciona">{content.partnerButton}<ArrowRight size={16} /></a></div>
          <div className="partner-art" aria-hidden="true"><span className="partner-sun" /><div className="shop-sign"><Store size={23} /><span>{en ? 'LOCAL' : 'DE AQUÍ'}</span></div><div className="shop-awning"><i /><i /><i /><i /><i /></div><div className="shop-front"><div className="shop-window" /><div className="shop-door" /></div><div className="partner-offer-note"><Sparkles size={15} /><span><b>{content.mockDeal}</b><small>{content.mockTerms}</small></span></div></div>
        </div>
      </section>
      <section className="closing-section">
        <div className="landing-wrap closing-inner"><p className="landing-kicker"><span />{en ? 'COMING TO YOUR POCKET' : 'PRONTO, EN TU BOLSILLO'}</p><h2>{content.benefitTitle}</h2><p>{content.benefitBody}</p><span className="coming-soon">{en ? 'THE TANDA MOBILE APP IS IN DEVELOPMENT' : 'LA APP MÓVIL DE TANDA ESTÁ EN DESARROLLO'}</span><p className="not-live-note">{content.notLive}</p></div>
      </section>
    </main>
    <footer className="landing-footer"><div className="landing-wrap footer-inner"><a className="landing-brand" href="#inicio"><span className="brand-symbol"><Sparkles size={16} /></span>tanda</a><p>{content.footerLine}</p><span>{content.footerNote}</span></div></footer>
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
