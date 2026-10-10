import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, random, spring, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';
import {ASSETS, Brand, FPS, G} from './theme';

const {fontFamily} = loadFont('normal', {weights: ['400', '500', '600', '700', '800', '900']});
export const FONT = fontFamily;

export const col: React.CSSProperties = {display: 'flex', flexDirection: 'column'};
export const rw: React.CSSProperties = {display: 'flex', flexDirection: 'row'};
const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const lerp = (f: number, a: number, b: number, x: number, y: number, easing?: (t: number) => number) =>
  interpolate(f, [a, b], [x, y], {...CL, easing});
export const sp = (frame: number, cfg: {damping: number; stiffness?: number} = {damping: 14, stiffness: 120}) => spring({frame, fps: FPS, config: cfg});

/** RN `useEntrance(delayMs)` replica: fade + rise */
export const ent = (f: number, ms: number, dist = 14): React.CSSProperties => {
  const p = sp(f - ms * 0.03);
  return {opacity: Math.min(1, Math.max(0, p)), transform: `translateY(${(1 - p) * dist}px)`};
};

/* ───────── backgrounds / text ───────── */
export const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: Brand.appBackground}}>
      <div style={{position: 'absolute', width: 1500, height: 1500, left: -650 + Math.sin(f / 70) * 120, top: -200 + Math.cos(f / 80) * 120, background: `radial-gradient(circle, ${Brand.primary}70 0%, transparent 62%)`}} />
      <div style={{position: 'absolute', width: 1300, height: 1300, right: -560 + Math.cos(f / 75) * 100, bottom: -400 + Math.sin(f / 65) * 120, background: `radial-gradient(circle, ${Brand.primaryLight}44 0%, transparent 62%)`}} />
    </AbsoluteFill>
  );
};

export const GradText: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <span style={{background: G.text, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent', ...style}}>{children}</span>
);

export const Logo: React.FC<{size?: number}> = ({size = 240}) =>
  ASSETS.logo ? (
    <Img src={staticFile(ASSETS.logo)} style={{width: size, height: size, objectFit: 'contain'}} />
  ) : (
    <div style={{position: 'relative', width: size, height: size, borderRadius: size * 0.24, background: G.tile, boxShadow: `0 ${size * 0.12}px ${size * 0.35}px ${Brand.primary}99`}}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: size * (0.2 + i * 0.045), top: size * (0.2 + i * 0.07), width: size * 0.58, height: size * 0.46, borderRadius: size * 0.08, background: `rgba(255,255,255,${0.3 + i * 0.3})`, transform: `rotate(${(i - 1) * 8}deg)`}} />
      ))}
    </div>
  );

export const CatIcon: React.FC<{k: string; emoji: string; size: number}> = ({k, emoji, size}) =>
  ASSETS.icons[k] ? (
    <Img src={staticFile(ASSETS.icons[k])} style={{width: size, height: size}} />
  ) : (
    <div style={{width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.72, lineHeight: 1}}>{emoji}</div>
  );

/* ───────── procedural "photos" (swap for real ones via <Img>) ───────── */
export const Photo: React.FC<{seed: number; size?: number; kind?: 'photo' | 'blur' | 'shot'; style?: React.CSSProperties}> = ({seed, size, kind = 'photo', style}) => {
  const r = (k: string) => random(`p${seed}${k}`);
  const hue = Math.round(r('h') * 360);
  const base: React.CSSProperties = {width: size ?? '100%', height: size ?? '100%', position: 'relative', overflow: 'hidden', ...style};
  if (kind === 'shot') {
    return (
      <div style={{...base, background: '#1c1c1e'}}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{display: 'block'}}>
          <rect width="100" height="12" fill="#2c2c2e" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={i % 2 ? 100 - 12 - (35 + r('w' + i) * 40) : 12} y={20 + i * 15} width={35 + r('w' + i) * 40} height={10} rx={5} fill={i % 2 ? `hsl(${hue} 70% 55%)` : '#3a3a3c'} />
          ))}
          <rect x="10" y="90" width="80" height="6" rx="3" fill="#3a3a3c" />
        </svg>
      </div>
    );
  }
  const svg = (
    <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{display: 'block'}}>
      <defs>
        <linearGradient id={`sky${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 70% 62%)`} />
          <stop offset="1" stopColor={`hsl(${hue + 35} 85% 82%)`} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#sky${seed})`} />
      <circle cx={15 + r('x') * 70} cy={22 + r('y') * 10} r={8 + r('r') * 5} fill="hsl(48 100% 80%)" />
      <polygon points={`0,70 ${20 + r('a') * 20},${40 + r('b') * 12} ${50 + r('c') * 10},68 ${70 + r('d') * 10},${45 + r('e') * 10} 100,72 100,100 0,100`} fill={`hsl(${hue + 140} 30% 35%)`} />
      <polygon points={`0,85 30,${68 + r('f') * 8} 60,86 100,${70 + r('g') * 8} 100,100 0,100`} fill={`hsl(${hue + 160} 35% 22%)`} />
    </svg>
  );
  return <div style={base}>{kind === 'blur' ? <div style={{width: '100%', height: '100%', filter: 'blur(5px)', transform: 'scale(1.2)'}}>{svg}</div> : svg}</div>;
};

/* ───────── dream FX ───────── */
export const Sparkles: React.FC<{cx: number; cy: number; start?: number; n?: number; radius?: number; size?: number; duration?: number; color?: string}> = ({cx, cy, start = 0, n = 22, radius = 150, size = 18, duration = 40, color = Brand.sparkle}) => {
  const f = useCurrentFrame();
  const dt = f - start;
  if (dt < 0 || dt > duration) return null;
  const p = Easing.out(Easing.cubic)(dt / duration);
  const o = Math.sin(Math.PI * Math.min(1, dt / duration));
  return (
    <>
      {Array.from({length: n}).map((_, i) => {
        const a = random(`a${i}${cx}`) * Math.PI * 2;
        const d = radius * (0.35 + random(`d${i}${cx}`) * 0.65);
        const sz = size * (0.6 + random(`s${i}${cx}`));
        return (
          <div key={i} style={{position: 'absolute', left: cx + Math.cos(a) * d * p - sz / 2, top: cy + Math.sin(a) * d * p - sz / 2, fontSize: sz, color, opacity: o, lineHeight: 1, textShadow: `0 0 12px ${Brand.glow}`, transform: `rotate(${dt * 6 * (i % 2 ? 1 : -1)}deg)`}}>✦</div>
        );
      })}
    </>
  );
};

export const Rays: React.FC<{cx: number; cy: number; size?: number; start?: number; opacity?: number}> = ({cx, cy, size = 700, start = 0, opacity = 1}) => {
  const f = useCurrentFrame();
  const mask = 'radial-gradient(circle, #000 0%, transparent 68%)';
  return (
    <div style={{position: 'absolute', left: cx - size / 2, top: cy - size / 2, width: size, height: size, borderRadius: '50%', background: `repeating-conic-gradient(from ${f * 0.8}deg, rgba(185,140,255,0.3) 0deg 5deg, rgba(185,140,255,0) 5deg 20deg)`, WebkitMaskImage: mask, maskImage: mask, opacity: lerp(f, start, start + 12, 0, 1) * opacity}} />
  );
};

export const Shock: React.FC<{cx: number; cy: number; start?: number; max?: number; duration?: number; color?: string}> = ({cx, cy, start = 0, max = 420, duration = 30, color = Brand.glow}) => {
  const f = useCurrentFrame();
  const dt = f - start;
  if (dt < 0 || dt > duration) return null;
  const p = Easing.out(Easing.cubic)(dt / duration);
  return <div style={{position: 'absolute', left: cx - max * p, top: cy - max * p, width: max * 2 * p, height: max * 2 * p, borderRadius: '50%', border: `4px solid ${color}`, opacity: 1 - p, boxShadow: `0 0 40px ${color}`}} />;
};

/* ───────── phone shell + logical 390×844 screen ───────── */
export const K = 592 / 390;

export const PhoneShell: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{width: 620, height: 1309, borderRadius: 96, padding: 14, boxSizing: 'border-box', background: '#1b1a33', boxShadow: `0 60px 140px rgba(0,0,0,.65), 0 0 120px ${Brand.primary}44, inset 0 0 0 2px #3a3e60`}}>
    <div style={{position: 'relative', width: 592, height: 1281, borderRadius: 84, overflow: 'hidden', background: Brand.appBackground}}>{children}</div>
  </div>
);

export const Screen: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 390, height: 844, transform: `scale(${K})`, transformOrigin: 'top left', fontFamily: FONT, color: '#fff', overflow: 'hidden', background: Brand.appBackground}}>{children}</div>
);

export const StatusBar: React.FC = () => (
  <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 54, zIndex: 60, pointerEvents: 'none'}}>
    <div style={{position: 'absolute', left: 44, top: 18, fontSize: 16, fontWeight: 700}}>9:41</div>
    <div style={{position: 'absolute', left: 132, top: 11, width: 126, height: 37, borderRadius: 20, background: '#000'}} />
    <div style={{position: 'absolute', right: 28, top: 21, ...rw, alignItems: 'flex-end', gap: 2}}>
      {[5, 8, 11, 14].map((h) => <div key={h} style={{width: 3, height: h, borderRadius: 1, background: '#fff'}} />)}
      <div style={{marginLeft: 8, width: 25, height: 13, borderRadius: 4, border: '1.5px solid rgba(255,255,255,.6)', padding: 1.5, boxSizing: 'border-box'}}><div style={{width: '100%', height: '100%', borderRadius: 2, background: '#fff'}} /></div>
    </div>
  </div>
);

export const Page: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg = Brand.appBackground}) => (
  <div style={{position: 'absolute', inset: 0, background: bg, overflow: 'hidden'}}>{children}</div>
);

export const Back: React.FC = () => (
  <svg width={28} height={28} viewBox="0 0 28 28"><path d="M17 6 L9 14 L17 22" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ───────── RN GradientButton replica (press scale + ripple) ───────── */
export const GBtn: React.FC<{title: string; f: number; pressAt?: number; secondary?: boolean; icon?: string; dim?: number}> = ({title, f, pressAt = -999, secondary, icon, dim = 1}) => {
  const dt = f - pressAt;
  const scale = dt < 0 ? 1 : dt < 3 ? lerp(dt, 0, 3, 1, 0.94) : 0.94 + 0.06 * spring({frame: dt - 3, fps: FPS, config: {damping: 8, stiffness: 180}});
  const rScale = dt < 0 ? 0 : lerp(dt, 0, 17, 0, 5);
  const rOp = dt < 0 ? 0 : dt < 4 ? lerp(dt, 0, 4, 0, 0.35) : lerp(dt, 4, 19, 0.35, 0);
  return (
    <div style={{borderRadius: 20, overflow: 'hidden', boxShadow: '0 14px 26px rgba(0,0,0,.4)', transform: `scale(${scale})`, opacity: dim}}>
      <div style={{position: 'relative', background: secondary ? G.buttonOff : G.button, padding: '20px 24px', border: `1px solid ${Brand.cardBorder}80`, borderRadius: 20, overflow: 'hidden', ...rw, alignItems: 'center', justifyContent: 'center', gap: 6}}>
        <div style={{position: 'absolute', left: '50%', top: '50%', width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: 10, background: '#fff', transform: `scale(${rScale})`, opacity: rOp}} />
        {icon ? <span style={{fontSize: 16, zIndex: 2}}>{icon}</span> : null}
        <span style={{fontSize: 17, fontWeight: 600, zIndex: 2}}>{title}</span>
      </div>
    </div>
  );
};

/* ───────── finger tap (logical coords, rendered inside the screen) ───────── */
export const Tap: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => {
  const f = useCurrentFrame();
  const dt = f - at;
  if (dt < -18 || dt > 20) return null;
  const a = Easing.out(Easing.cubic)(lerp(dt, -18, 0, 0, 1));
  const o = lerp(dt, -18, -12, 0, 1) * lerp(dt, 8, 20, 1, 0);
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 80, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: x - 30, top: y - 30, width: 60, height: 60, borderRadius: '50%', border: `3px solid ${Brand.glow}`, opacity: dt >= 0 ? lerp(dt, 0, 16, 0.9, 0) : 0, transform: `scale(${lerp(dt, 0, 16, 0.4, 1.8)})`}} />
      <div style={{position: 'absolute', left: x + (1 - a) * 50 - 22, top: y + (1 - a) * 90 - 22, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.35)', border: '2px solid rgba(255,255,255,.85)', boxShadow: '0 4px 16px rgba(0,0,0,.45)', opacity: o, transform: `scale(${dt >= 0 && dt < 6 ? 0.8 : 1})`}} />
    </div>
  );
};

/* ───────── social comment bubbles (canvas coords) ───────── */
export const Comment: React.FC<{name: string; text: string; at: number; reply?: boolean; top: number; likes?: string}> = ({name, text, at, reply, top, likes = '2.1K'}) => {
  const f = useCurrentFrame();
  const p = sp(f - at, {damping: 13, stiffness: 140});
  const x = reply ? 110 : 40;
  return (
    <div style={{position: 'absolute', left: x, top, width: 1080 - x - 40, opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 60}px) scale(${0.92 + 0.08 * Math.min(1.05, p)})`, ...rw, gap: 22, fontFamily: FONT}}>
      <div style={{width: reply ? 84 : 96, height: reply ? 84 : 96, borderRadius: '50%', flexShrink: 0, background: reply ? G.tile : `linear-gradient(135deg, hsl(${(name.length * 53) % 360} 70% 60%), hsl(${(name.length * 53 + 60) % 360} 60% 40%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800}}>
        {reply ? '✦' : name[1].toUpperCase()}
      </div>
      <div style={{flex: 1, background: reply ? 'rgba(123,79,224,.22)' : 'rgba(21,19,31,.92)', border: `2px solid ${reply ? Brand.primaryLight : Brand.cardBorder}`, borderRadius: 40, padding: '26px 34px', boxShadow: reply ? `0 0 50px ${Brand.primary}66` : 'none'}}>
        <div style={{...rw, alignItems: 'center', gap: 14, fontSize: 32, fontWeight: 700, color: reply ? Brand.glow : Brand.textSecondary}}>
          {name}
          {reply ? <span style={{fontSize: 24, background: G.tile, color: '#fff', padding: '4px 14px', borderRadius: 20}}>Creator ✓</span> : null}
        </div>
        <div style={{fontSize: 50, fontWeight: 600, lineHeight: 1.2, marginTop: 8}}>{text}</div>
        <div style={{fontSize: 28, color: Brand.textTertiary, marginTop: 12}}>♡ {likes}   ·   Reply</div>
      </div>
    </div>
  );
};
