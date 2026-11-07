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

function CityPanorama() {
  return <svg className="city-panorama" viewBox="0 0 1200 560" role="img" aria-labelledby="panorama-title panorama-description" preserveAspectRatio="xMidYMid slice">
    <title id="panorama-title">Medellín neighborhood panorama</title>
    <desc id="panorama-description">A hand-drawn city scene with a café, students and the green hills of Medellín.</desc>
    <defs>
      <linearGradient id="sky-wash" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#E9F0E7" /><stop offset="1" stopColor="#F7E9D8" /></linearGradient>
      <linearGradient id="hill-wash" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#748A70" /><stop offset="1" stopColor="#A6AE85" /></linearGradient>
      <pattern id="paper-grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".65" fill="#423B38" opacity=".11" /><circle cx="5" cy="5" r=".5" fill="#423B38" opacity=".08" /></pattern>
    </defs>
    <rect width="1200" height="560" fill="url(#sky-wash)" />
    <circle cx="934" cy="110" r="56" fill="#E7A28E" opacity=".83" />
    <g className="panorama-cloud" fill="none" stroke="#687468" strokeWidth="2" opacity=".45" strokeLinecap="round">
      <path d="M784 102h80m-57-9 8-7 9 7m19 4 8-7 9 7" />
    </g>
    <path d="M0 257 88 220l63 22 93-86 81 45 69-76 83 48 87-54 63 35 82-46 69 44 84-61 89 51 65-25 103 48v186H0Z" fill="url(#hill-wash)" />
    <path d="m0 280 107-37 91 25 83-45 98 22 75-45 73 36 76-22 84 39 70-30 94 43 97-30 92 47 60-20v142H0Z" fill="#81917A" />
    <g className="hill-homes" fill="#F0D8BD" stroke="#504943" strokeWidth="2">
      <path d="m90 226 28-20 31 19v24H90Zm70-20 25-19 31 19v27h-56Zm745-12 28-21 31 19v27h-59Zm67 24 27-20 31 18v26h-58Zm69-37 25-18 27 17v27h-52Z" />
      <path d="M101 230h9v12h-9m21-12h9v12h-9m65-8h8v13h-8m743-24h9v13h-9m26-12h8v13h-8m72 7h8v13h-8m43-47h8v13h-8" fill="#687A6A" />
    </g>
    <path d="M0 332c115-35 204-2 310-21 114-20 185-55 294-35 106 20 194-7 300 2 95 8 179 46 296 20v262H0Z" fill="#E7D4BC" />
    <path d="M0 380c184-30 293-15 447-25 180-12 376-27 753 4v201H0Z" fill="#F4E9DA" />
    <g className="cafe-buildings" stroke="#493F39" strokeWidth="3" strokeLinejoin="round">
      <path d="M92 310h331v250H92z" fill="#E9B9A0" />
      <path d="m75 313 26-49h315l26 49Z" fill="#F7E6D3" />
      <path d="M101 313h331" fill="none" />
      <path d="M120 338h111v124H120z" fill="#8FA79A" />
      <path d="M133 350h84v97h-84z" fill="#DCE3D7" />
      <path d="M286 338h104v222H286z" fill="#B57660" />
      <path d="M301 354h74v105h-74z" fill="#8B9C8B" />
      <path d="M339 354v105m-38-51h74" fill="none" strokeWidth="2" />
      <path d="M88 310h341v24H88z" fill="#C85F4B" />
      <path d="M104 310v24m46-24v24m46-24v24m46-24v24m46-24v24m46-24v24m46-24v24m46-24v24" stroke="#F3D8C1" strokeWidth="2" />
      <path d="M228 282h58v28h-58z" fill="#F6E8D6" />
      <text x="257" y="301" fill="#493F39" stroke="none" textAnchor="middle" fontFamily="Work Sans, sans-serif" fontWeight="700" fontSize="13" letterSpacing="2">CAFÉ</text>
    </g>
    <g className="street-details" fill="none" stroke="#4C4940" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M520 406h83m-66-5v-44h48v44m-57-44h67l-8-15h-50Zm8 45v-17h18v17" />
      <path d="M1041 389v-87m-23 19 23-24 21 24m-21-24v-21" />
      <path d="m1005 390 10-29h51l10 29Zm-6 0h78" />
      <path d="M1104 447h52m-42 0v-30h28v30m-35-30h42" />
      <path d="M69 491h126m-97-5-10-54m16 54 30-55m-35 31 42 24m-58-17 45-19" />
    </g>
    <g className="students" stroke="#473D39" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(620 320)">
        <path d="M22 65c0-21 12-34 31-34s31 13 31 34l7 89H14Z" fill="#C85F4B" />
        <circle cx="53" cy="18" r="17" fill="#A96F53" />
        <path d="M37 17c1-20 33-26 39-2-10-5-23-9-39 2Z" fill="#433B36" />
        <path d="m37 76-31 34m80-36 30 23" fill="none" />
        <path d="M25 151v44m53-44v44" />
        <path d="m25 194-11 7m64-7 10 7" fill="none" />
        <path d="M87 92h34v41H87z" fill="#D6B989" />
      </g>
      <g transform="translate(746 340)">
        <path d="M18 61c4-22 15-33 32-33 20 0 31 14 33 38l8 77H10Z" fill="#718674" />
        <circle cx="49" cy="15" r="16" fill="#C28B68" />
        <path d="M33 15c0-21 31-25 36-3-11-7-25-6-36 3Z" fill="#473D39" />
        <path d="m31 77-22 35m74-32 29 28" fill="none" />
        <path d="M23 139v48m49-48v48m-49 0-12 8m61-8 11 8" fill="none" />
        <path d="m38 50 18 8-7 24-18-8Z" fill="#D9C5A6" />
      </g>
    </g>
    <g className="cafe-steam" fill="none" stroke="#F4E9DA" strokeWidth="3" strokeLinecap="round">
      <path d="M329 255c-12-13 11-17 0-30m14 30c-11-12 11-17 1-29" />
    </g>
    <rect width="1200" height="560" fill="url(#paper-grain)" opacity=".45" />
    <path d="M0 557c248-6 411 5 615 0s401-4 585 1" fill="none" stroke="#C85F4B" strokeWidth="4" />
  </svg>;
}

function Landing() {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('tanda-language') === 'en' ? 'en' : 'es');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { localStorage.setItem('tanda-language', language); }, [language]);
  const en = language === 'en';
  const content = en ? {
    links: ['How it works', 'For students', 'For local spots'],
    heroKicker: 'YOUR CITY, WITH A LITTLE MORE ROOM',
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
    locale: 'Starting with Medellín, Colombia', stepsEyebrow: 'A GOOD THING, MADE SIMPLE',
    stepsTitle: 'A little closer to your next favorite.',
    verificationNote: 'Student verification is part of the planned app experience. This website does not collect or verify student information.',
    comingSoon: 'THE TANDA MOBILE APP IS IN DEVELOPMENT',
  } : {
    links: ['Cómo funciona', 'Para estudiantes', 'Negocios locales'],
    heroKicker: 'TU CIUDAD, CON UN POCO MÁS DE AIRE',
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
    locale: 'Empezamos por Medellín, Colombia', stepsEyebrow: 'LO BUENO, SIN VUELTAS',
    stepsTitle: 'Un poco más cerca de tu próximo favorito.',
    verificationNote: 'La verificación estudiantil hará parte de la app futura. Este sitio no recopila ni verifica información de estudiantes.',
    comingSoon: 'LA APP MÓVIL DE TANDA ESTÁ EN DESARROLLO',
  };

  const nav = <>{content.links.map((label, index) => <a key={label} href={['#como-funciona', '#estudiantes', '#comercios'][index]} onClick={() => setMenuOpen(false)}>{label}</a>)}</>;

  return <div className="landing-shell">
    <header className="landing-header">
      <div className="landing-wrap header-inner">
        <a className="landing-brand" href="#inicio" aria-label="Tanda, inicio"><span className="brand-mark">t</span><span>tanda</span></a>
        <nav className="landing-nav" aria-label={en ? 'Main navigation' : 'Navegación principal'}>{nav}</nav>
        <div className="header-actions">
          <button className="landing-language" aria-label={en ? 'Cambiar idioma a español' : 'Switch language to English'} onClick={() => setLanguage(en ? 'es' : 'en')} data-testid="button-language">{en ? 'ES' : 'EN'}<span aria-hidden="true">↗</span></button>
          <a href="#como-funciona" className="header-cta">{content.explore}<ArrowRight size={15} /></a>
          <button className="landing-menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="landing-mobile-nav" aria-label={en ? 'Mobile navigation' : 'Navegación móvil'}>{nav}<a href="#como-funciona" onClick={() => setMenuOpen(false)}>{content.explore}<ArrowRight size={15} /></a></nav>}
    </header>
    <main id="inicio">
      <section className="landing-hero">
        <div className="landing-wrap hero-layout">
          <div className="hero-message">
            <p className="landing-kicker"><span />{content.heroKicker}</p>
            <h1>{content.heroTitle}</h1>
            <p className="hero-lede">{content.heroBody}</p>
            <div className="hero-ctas"><a className="coral-button" href="#como-funciona">{content.explore}<ArrowRight size={17} /></a><a href="#comercios" className="text-link">{content.partnerCta}<ArrowRight size={15} /></a></div>
            <p className="hero-footnote"><MapPin size={14} />{content.locale}</p>
          </div>
          <figure className="hero-visual">
            <CityPanorama />
            <figcaption className="panorama-caption">
              <span className="caption-index">01 / MEDELLÍN</span>
              <span className="caption-title">{content.previewLabel}</span>
              <span className="photo-location">{content.phoneSub}</span>
            </figcaption>
          </figure>
        </div>
        <div className="hero-bottom"><div className="landing-wrap hero-bottom-inner"><span>{content.story1}</span><span className="hero-orbit-word">{en ? 'TANDA · MEDELLÍN · NEARBY' : 'TANDA · MEDELLÍN · CERCA'}</span><span>{content.story2}</span></div></div>
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
          <div className="partner-copy"><div className="partner-meta"><span>02</span><span>{en ? 'LOCAL PARTNERS' : 'COMERCIOS LOCALES'}</span></div><p className="landing-kicker"><span />{content.partnerEyebrow}</p><h2>{content.partnerTitle}</h2><p>{content.partnerBody}</p><a className="text-link partner-link" href="#como-funciona">{content.partnerButton}<ArrowRight size={15} /></a></div>
          <figure className="partner-visual">
            <img src="/images/tanda-cafe-editorial.jpg" alt={en ? 'Coffee at a neighborhood café table' : 'Un café en la mesa de un café de barrio'} />
            <figcaption><span>{content.featured}</span><span>{content.mockDeal}</span><small>{content.example}</small></figcaption>
          </figure>
        </div>
      </section>
      <section className="closing-section">
        <div className="landing-wrap closing-inner"><p className="landing-kicker"><span />{en ? 'COMING TO YOUR POCKET' : 'PRONTO, EN TU BOLSILLO'}</p><h2>{content.benefitTitle}</h2><p>{content.benefitBody}</p><span className="coming-soon">{content.comingSoon}</span><p className="not-live-note">{content.notLive}</p></div>
      </section>
    </main>
    <footer className="landing-footer"><div className="landing-wrap footer-inner"><a className="landing-brand" href="#inicio"><span className="brand-mark">t</span><span>tanda</span></a><p>{content.footerLine}</p><span>{content.footerNote}</span></div></footer>
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
