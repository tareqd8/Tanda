import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const scene = `${import.meta.env.BASE_URL}images/reference-assets/tanda-reference-city-scene.png`;
const cabins = [
  'M394 279H415L420 289 415 299H394L389 289Z',
  'M480 245H502L506 256 501 264H480L475 255Z',
  'M530 222H550L555 235 549 244H529L525 234Z',
];

function SceneImage() {
  return <image href={scene} x="0" y="-72" width="768" height="768" />;
}

function Wheel({ x, y, radius }: { x: number; y: number; radius: number }) {
  return <g className="scene-mover reference-wheel" style={{ transformOrigin: `${x}px ${y}px` }} stroke="#34322e" strokeWidth=".7" opacity=".45">
    {[0, 1, 2, 3, 4, 5].map(i => {
      const angle = i * Math.PI / 6;
      return <line key={i} x1={x - Math.cos(angle) * radius} y1={y - Math.sin(angle) * radius} x2={x + Math.cos(angle) * radius} y2={y + Math.sin(angle) * radius} />;
    })}
  </g>;
}

/** The foreground is assembled from preserved-ratio illustration layers.
 *  The left hill and right coast are independently placed, like the reference,
 *  rather than cutting off their tops to make room for the headline. */
export default function ReferencePanorama({ en }: { en: boolean }) {
  const [paused, setPaused] = useState(false);
  const id = `reference-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const label = paused ? (en ? 'Resume illustration animation' : 'Reanudar animación') : (en ? 'Pause illustration animation' : 'Pausar animación');
  return <div className={`reference-city${paused ? ' motion-is-paused' : ''}`}>
    <svg viewBox="0 0 1024 400" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{en ? 'Colombian student life, with moving cable cars and bicycle wheels' : 'La vida estudiantil en Colombia, con metrocable y ruedas en movimiento'}</title>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="180" x2="0" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="#000" /><stop offset="1" stopColor="#fff" /></linearGradient>
        <linearGradient id={`${id}-hill-blend`} x1="0" y1="275" x2="0" y2="305" gradientUnits="userSpaceOnUse"><stop stopColor="#000" /><stop offset="1" stopColor="#fff" /></linearGradient>
        <mask id={`${id}-left`}>
          <rect width="620" height="400" fill={`url(#${id}-fade)`} />
          <rect width="135" height="275" fill="#000" />
          <rect y="275" width="135" height="30" fill={`url(#${id}-hill-blend)`} />
        </mask>
        <linearGradient id={`${id}-left-edge`} x1="580" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#000" /></linearGradient>
        <mask id={`${id}-left-edge-mask`}><rect width="580" height="400" fill="#fff" /><rect x="580" width="20" height="400" fill={`url(#${id}-left-edge)`} /></mask>
        <clipPath id={`${id}-hill`}><path d="M0 240Q65 218 145 238V355H0Z" /></clipPath>
        <clipPath id={`${id}-coast`}><path d="M770 225H1024V400H770Z" /></clipPath>
        <linearGradient id={`${id}-coast-fade`} x1="0" y1="225" x2="0" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="#000" /><stop offset="1" stopColor="#fff" /></linearGradient>
        <mask id={`${id}-coast-mask`}><rect x="770" y="225" width="254" height="175" fill={`url(#${id}-coast-fade)`} /></mask>
        <filter id={`${id}-coast-soft-edge`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id={`${id}-detail-edge`}><feGaussianBlur stdDeviation="2" /></filter>
        <mask id={`${id}-coast-edge-mask`} x="760" y="205" width="280" height="215" maskUnits="userSpaceOnUse"><path d="M790 205Q830 260 800 305Q825 345 795 420H1040V205Z" fill="#fff" filter={`url(#${id}-coast-soft-edge)`} /><ellipse cx="810" cy="372" rx="25" ry="28" fill="#000" filter={`url(#${id}-detail-edge)`} /></mask>
        <linearGradient id={`${id}-cabin-sky`} x1="0" y1="220" x2="0" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#f4d6e8" /><stop offset="1" stopColor="#f8c8d5" /></linearGradient>
        {cabins.map((path, i) => <clipPath id={`${id}-cabin-${i}`} key={i}><path d={path} /></clipPath>)}
      </defs>
      <path d="M565 326Q645 292 710 330T852 319V400H565Z" fill="#f4d9e7" />
      <path d="M580 379Q650 337 724 365T852 367V400H580Z" fill="#ffe3bf" />
      <path d="M570 388Q650 371 725 391T852 388V400H570Z" fill="#eee0f1" />
      <ellipse cx="695" cy="380" rx="126" ry="9" fill="#94738d" opacity=".12" />
      <g clipPath={`url(#${id}-hill)`}><image href={scene} x="0" y="61" width="614.4" height="614.4" /></g>
      <g mask={`url(#${id}-left)`}><g mask={`url(#${id}-left-edge-mask)`}><SceneImage /></g></g>
      <g clipPath={`url(#${id}-coast)`} mask={`url(#${id}-coast-mask)`}><g mask={`url(#${id}-coast-edge-mask)`}><image href={scene} x="204.8" y="-96" width="819.2" height="819.2" /></g></g>
      {cabins.map((path, i) => <g key={i}>
        <path d={path} fill={`url(#${id}-cabin-sky)`} stroke={`url(#${id}-cabin-sky)`} strokeWidth="1.5" />
        <g className={`scene-mover reference-cabin reference-cabin-${i}`}><g clipPath={`url(#${id}-cabin-${i})`}><SceneImage /></g></g>
      </g>)}
      <Wheel x={411} y={363} radius={8} /><Wheel x={463} y={363} radius={8} />
      <Wheel x={517.5} y={366} radius={15} /><Wheel x={563.25} y={366} radius={15} />
    </svg>
    <button className="panorama-motion-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={label} title={label} aria-pressed={paused}>
      <span>{paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}</span>
    </button>
  </div>;
}
