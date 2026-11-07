import { useId, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import './animated-panorama.css';

const artwork = `${import.meta.env.BASE_URL}images/tanda-approved-panorama.png`;
const height = 1024 / 3;

// These small silhouettes isolate the two cabins from the approved artwork.
// All other illustration pixels stay stationary and unmodified.
const cabinOne = 'M583 102 Q590 100 597 103 L599 119 L603 126 L608 127 L615 144 L608 164 L577 164 L569 145 L576 127 L585 126 L589 119 L587 112 L583 112 Z';
const cabinTwo = 'M634 90 Q640 87 645 91 L646 101 L650 107 L654 108 L660 122 L654 139 L628 139 L621 123 L627 108 L635 107 L638 102 L636 97 L634 97 Z';

function Spokes({ x, y, radius, taxi = false }: { x: number; y: number; radius: number; taxi?: boolean }) {
  return <g
    className={`scene-mover wheel-spokes ${taxi ? 'taxi-spokes' : 'bicycle-spokes'}`}
    style={{ transformOrigin: `${x}px ${y}px` }}
    stroke={taxi ? '#cec5cd' : '#323332'}
    strokeWidth={taxi ? 1 : .65}
    opacity={taxi ? .85 : .45}
    strokeLinecap="round"
  >
    {Array.from({ length: taxi ? 3 : 6 }, (_, i) => {
      const angle = i * Math.PI / (taxi ? 3 : 6);
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;
      return <line key={i} x1={x - dx} y1={y - dy} x2={x + dx} y2={y + dy} />;
    })}
    <circle cx={x} cy={y} r={taxi ? 2.4 : 1.8} fill={taxi ? '#e9e4e6' : '#64754f'} stroke="none" />
  </g>;
}

export default function AnimatedPanorama({ en }: { en: boolean }) {
  const [paused, setPaused] = useState(false);
  const prefix = `tanda-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const label = paused
    ? (en ? 'Resume illustration animation' : 'Reanudar animación')
    : (en ? 'Pause illustration animation' : 'Pausar animación');

  return <div className={`reference-panorama motion-panorama-container${paused ? ' motion-is-paused' : ''}`}>
    <svg className="motion-panorama-svg" viewBox={`0 0 1024 ${height}`}
      role="img" aria-labelledby={`${prefix}-title ${prefix}-description`}>
      <title id={`${prefix}-title`}>{en ? 'Student life with Tanda' : 'La vida estudiantil con Tanda'}</title>
      <desc id={`${prefix}-description`}>{en
        ? 'The original Colombian city illustration, with gently moving cable cars and turning bicycle and taxi wheels. Students, buildings and the rest of the artwork stay still. Discount stickers are illustrative, not live offers.'
        : 'La ilustración original de la ciudad colombiana, con cabinas de metrocable en movimiento suave y ruedas de bicicleta y taxi girando. Los estudiantes, edificios y el resto del dibujo permanecen quietos. Los descuentos son ilustrativos, no ofertas activas.'}</desc>
      <defs>
        <clipPath id={`${prefix}-cabin-1`}><path d={cabinOne} /></clipPath>
        <clipPath id={`${prefix}-cabin-2`}><path d={cabinTwo} /></clipPath>
        <linearGradient id={`${prefix}-sky-1`} gradientUnits="userSpaceOnUse" x1="570" y1="105" x2="615" y2="165">
          <stop stopColor="#f9dcb1" /><stop offset="1" stopColor="#fbdfbd" />
        </linearGradient>
        <linearGradient id={`${prefix}-sky-2`} gradientUnits="userSpaceOnUse" x1="620" y1="90" x2="660" y2="141">
          <stop stopColor="#f9dbbd" /><stop offset="1" stopColor="#f9ddc2" />
        </linearGradient>
        <filter id={`${prefix}-soft-edge`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation=".45" />
        </filter>
      </defs>

      <image href={artwork} width="1024" height={height} />

      {/* Only the sky directly behind the original cabins is reconstructed.
          No masks or edits touch the students, vehicles or architecture. */}
      <g filter={`url(#${prefix}-soft-edge)`}>
        <path d={cabinOne} fill={`url(#${prefix}-sky-1)`} stroke={`url(#${prefix}-sky-1)`} strokeWidth="3" />
        <path d={cabinTwo} fill={`url(#${prefix}-sky-2)`} stroke={`url(#${prefix}-sky-2)`} strokeWidth="3" />
      </g>
      <g fill="none" stroke="#20201e" strokeWidth="2.6" strokeLinecap="round">
        <path d="M580 112 L602 102 M580 120 L602 110" />
        <path d="M631 90 L649 82 M631 98 L649 90" />
      </g>

      <g className="scene-mover moving-cabin cabin-one" data-animation="cable-car">
        <g className="scene-mover cabin-sway" style={{ transformOrigin: '591px 108px' }}>
          <g clipPath={`url(#${prefix}-cabin-1)`}><image href={artwork} width="1024" height={height} /></g>
        </g>
      </g>
      <g className="scene-mover moving-cabin cabin-two" data-animation="cable-car">
        <g className="scene-mover cabin-sway second-sway" style={{ transformOrigin: '640px 94px' }}>
          <g clipPath={`url(#${prefix}-cabin-2)`}><image href={artwork} width="1024" height={height} /></g>
        </g>
      </g>

      {/* Keep the original tires and frames. Only fine spokes/rim highlights
          rotate inside them, avoiding cutout seams or duplicated vehicles. */}
      <Spokes x={667.5} y={281.5} radius={16.5} />
      <Spokes x={747.5} y={281.5} radius={16.5} />
      <Spokes x={539} y={276} radius={5.5} taxi />
      <Spokes x={590} y={276} radius={5.5} taxi />
    </svg>
    <button className="panorama-motion-toggle" type="button" onClick={() => setPaused(value => !value)}
      aria-label={label} title={label} aria-pressed={paused} data-testid="button-panorama-motion">
      <span>{paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}</span>
    </button>
  </div>;
}
