import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {ASSETS, Brand, CUE, G, STAGE_LEN} from './theme';
import {AllCategoriesScreen, ConfirmScreen, DetailsScreen, DoneScreen, GetStartedScreen, HomeScreen, PaywallScreen, PermissionDialog, ScanningScreen} from './screens';
import {Comment, FONT, GradText, Logo, Photo, PhoneShell, Rays, Screen, Shock, Sparkles, StatusBar, col, lerp, rw, sp, K} from './ui';

/* ───────── 1. Storage full → photo flood → suck into logo ───────── */
const Notification: React.FC = () => {
  const f = useCurrentFrame();
  const p = sp(f - 12, {damping: 11, stiffness: 150});
  const out = lerp(f, 58, 74, 0, -520, Easing.in(Easing.cubic));
  const shake = f > 14 && f < 34 ? Math.sin((f - 14) * 2.2) * 10 * (1 - (f - 14) / 20) : 0;
  if (ASSETS.storageFull) {
    return <Img src={staticFile(ASSETS.storageFull)} style={{position: 'absolute', left: 60, top: 520, width: 960, height: 'auto', borderRadius: 40, transform: `translate(${shake}px, ${(1 - p) * -900 + out}px)`, boxShadow: '0 30px 80px rgba(0,0,0,.55)'}} />;
  }
  return (
    <div style={{position: 'absolute', left: 60, width: 960, top: 560, transform: `translate(${shake}px, ${(1 - p) * -700 + out}px)`, background: 'rgba(70,70,82,.82)', borderRadius: 48, padding: 30, ...rw, gap: 26, alignItems: 'center', fontFamily: FONT, boxShadow: '0 30px 80px rgba(0,0,0,.5)'}}>
      <div style={{width: 110, height: 110, borderRadius: 26, background: 'linear-gradient(160deg,#8e8e93,#5a5a60)', ...col, alignItems: 'center', justifyContent: 'center', fontSize: 64}}>⚙️</div>
      <div style={{...col, flex: 1}}>
        <div style={{...rw, justifyContent: 'space-between', fontSize: 40, fontWeight: 700}}><span>iPhone Storage Full</span><span style={{fontSize: 30, color: '#c7c7cc', fontWeight: 500}}>now</span></div>
        <div style={{fontSize: 34, color: '#e5e5ea', marginTop: 6, lineHeight: 1.25}}>You can manage your storage in Settings.</div>
      </div>
    </div>
  );
};

export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const COLS = 4, SZ = 241, GAP = 12;
  const hops = [{i: 5, at: 130}, {i: 10, at: 146}, {i: 14, at: 162}];
  return (
    <AbsoluteFill>
      <Notification />
      {Array.from({length: 20}).map((_, i) => {
        const c = i % COLS, r = Math.floor(i / COLS);
        const x = 40 + c * (SZ + GAP), y = 560 + r * (SZ + GAP);
        const p = sp(f - (62 + i * 2), {damping: 12, stiffness: 100});
        const jig = f > 96 ? Math.sin((f + i * 7) * 0.9) * 1.8 : 0;
        const suck = Easing.in(Easing.cubic)(lerp(f, 160 + (i % 5) * 2, 180, 0, 1));
        const cx = 540 - (x + SZ / 2), cy = 1060 - (y + SZ / 2);
        const kind = i % 7 === 3 ? 'blur' : i % 5 === 1 ? 'shot' : 'photo';
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: SZ, height: SZ, borderRadius: 26, overflow: 'hidden', opacity: Math.min(1, p) * (1 - suck), transform: `translate(${suck * cx}px, ${(1 - Math.min(1, p)) * -1400 + suck * cy}px) rotate(${jig + suck * 360}deg) scale(${1 - suck * 0.9})`, boxShadow: '0 12px 30px rgba(0,0,0,.45)'}}>
            <Photo seed={i + 1} kind={kind} />
          </div>
        );
      })}
      {hops.map((h) => {
        const c = h.i % COLS, r = Math.floor(h.i / COLS);
        const x = 40 + c * (SZ + GAP), y = 560 + r * (SZ + GAP);
        const p = lerp(f, h.at, h.at + 4, 0, 1) * lerp(f, h.at + 11, h.at + 14, 1, 0);
        return (
          <div key={h.i} style={{position: 'absolute', left: x - 8, top: y - 8, width: SZ + 16, height: SZ + 16, borderRadius: 32, border: `6px solid ${Brand.glow}`, boxShadow: `0 0 40px ${Brand.glow}`, opacity: p, transform: `scale(${0.9 + 0.1 * p})`}}>
            <div style={{position: 'absolute', right: -14, top: -34, background: '#fff', color: '#111', borderRadius: 30, padding: '8px 22px', fontFamily: FONT, fontWeight: 800, fontSize: 40}}>this?</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ───────── 2. Logo reveal ───────── */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const lp = sp(f - 4, {damping: 9, stiffness: 100});
  const tp = sp(f - 18);
  return (
    <AbsoluteFill>
      <Rays cx={540} cy={900} size={1300} start={2} opacity={0.9} />
      <Shock cx={540} cy={900} start={4} max={620} />
      <Shock cx={540} cy={900} start={12} max={420} color={Brand.sparkle} />
      <Sparkles cx={540} cy={900} start={6} n={36} radius={420} size={34} duration={60} />
      <div style={{position: 'absolute', top: 640, left: 0, right: 0, ...col, alignItems: 'center', transform: `scale(${lp}) rotate(${(1 - lp) * -25}deg)`}}><Logo size={340} /></div>
      <div style={{position: 'absolute', top: 1060, left: 0, right: 0, ...col, alignItems: 'center', fontFamily: FONT, opacity: Math.min(1, tp), transform: `translateY(${(1 - tp) * 50}px)`}}>
        <div style={{...rw, fontSize: 190, fontWeight: 900, letterSpacing: -6}}><span>Un</span><GradText>Pile</GradText></div>
        <div style={{fontSize: 52, color: Brand.textSecondary, marginTop: 6}}>Clean your camera roll.</div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── 3. "It finds my bad photos?" ───────── */
const Chip: React.FC<{e: string; t: string; at: number}> = ({e, t, at}) => {
  const f = useCurrentFrame();
  const p = sp(f - at, {damping: 11, stiffness: 170});
  return <div style={{...rw, alignItems: 'center', gap: 20, background: 'rgba(21,19,31,.92)', border: `2px solid ${Brand.cardBorder}`, borderRadius: 40, padding: '22px 34px', fontFamily: FONT, fontSize: 46, fontWeight: 700, opacity: Math.min(1, p), transform: `scale(${0.6 + 0.4 * Math.min(1.1, p)})`}}><span style={{fontSize: 56}}>{e}</span>{t}<span style={{color: Brand.glow, marginLeft: 8}}>✓</span></div>;
};
export const S3: React.FC = () => (
  <AbsoluteFill>
    <Comment name="@mike_tho" text="Wait… it finds my bad photos?! 👀" at={6} top={420} />
    <Comment name="UnPile" reply text="Yep! Blurry shots, duplicates, and forgotten photos." at={72} top={780} likes="9.8K" />
    <div style={{position: 'absolute', top: 1260, left: 0, right: 0, ...col, alignItems: 'center', gap: 26}}>
      <Chip e="🌫️" t="Bad quality" at={100} />
      <Chip e="👯" t="Duplicates" at={114} />
      <Chip e="🕰️" t="Forgotten photos" at={128} />
    </div>
  </AbsoluteFill>
);

/* ───────── 4. Privacy ───────── */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const card = sp(f - 70, {damping: 13});
  const on = f >= 88;
  const tg = lerp(f, 88, 96, 0, 1);
  return (
    <AbsoluteFill>
      <Comment name="@sara.codes" text="But my privacy tho? 😅" at={4} top={400} likes="1.4K" />
      <Comment name="UnPile" reply text="It’s 100% local. Works offline, too." at={58} top={690} likes="7.2K" />
      <div style={{position: 'absolute', left: 60, right: 60, top: 1090, ...rw, alignItems: 'center', gap: 28, background: 'rgba(21,19,31,.5)', border: `2px solid ${Brand.cardBorder}`, borderRadius: 56, padding: 36, fontFamily: FONT, opacity: Math.min(1, card), transform: `translateY(${(1 - card) * 60}px)`}}>
        <div style={{width: 120, height: 120, borderRadius: 40, background: Brand.tileBackground, ...col, alignItems: 'center', justifyContent: 'center'}}>
          <svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke={Brand.glow} strokeWidth={2} strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" strokeLinecap="round" /></svg>
        </div>
        <div style={{...col}}><span style={{fontSize: 52, fontWeight: 700}}>100% On-Device</span><span style={{fontSize: 36, color: Brand.textSecondary, marginTop: 4}}>Your photos never leave your iPhone.</span></div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 1400, ...rw, alignItems: 'center', justifyContent: 'space-between', background: 'rgba(21,19,31,.92)', border: `2px solid ${on ? '#FF9F0A' : Brand.cardBorder}`, borderRadius: 56, padding: '34px 44px', fontFamily: FONT, opacity: Math.min(1, sp(f - 78)), boxShadow: on ? '0 0 50px rgba(255,159,10,.35)' : 'none'}}>
        <div style={{...rw, alignItems: 'center', gap: 22, fontSize: 52, fontWeight: 700}}><span style={{width: 84, height: 84, borderRadius: 24, background: '#FF9F0A', ...col, alignItems: 'center', justifyContent: 'center', fontSize: 50}}>✈︎</span>Airplane Mode</div>
        <div style={{width: 130, height: 76, borderRadius: 999, background: on ? '#34C759' : '#3a3a3c', position: 'relative'}}><div style={{position: 'absolute', top: 5, left: 5 + tg * 54, width: 66, height: 66, borderRadius: 999, background: '#fff'}} /></div>
      </div>
      <div style={{position: 'absolute', top: 1610, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontSize: 54, fontWeight: 800, opacity: lerp(f, 100, 108, 0, 1)}}><GradText>Still works. Offline ✓</GradText></div>
    </AbsoluteFill>
  );
};

/* ───────── Phone stage (camera + screens) ───────── */
const CAM = [
  [0, 195, 430, 1.02], [62, 195, 700, 1.3], [118, 195, 430, 1.05], [150, 195, 420, 1.2], [196, 195, 330, 1.18],
  [318, 195, 330, 1.2], [334, 195, 260, 1.45], [398, 195, 260, 1.5], [420, 195, 500, 1.2], [462, 340, 360, 1.3],
  [492, 195, 430, 1.05], [506, 195, 290, 1.3], [594, 195, 430, 1.1], [640, 195, 420, 1.15], [706, 195, 430, 1.0],
  [760, 195, 700, 1.3], [788, 195, 430, 1.0], [830, 195, 690, 1.3], [878, 195, 330, 1.25], [1000, 195, 430, 1.0],
  [1040, 195, 560, 1.2], [1100, 195, 500, 1.1], [1150, 195, 430, 1.0],
];
const SlideIn: React.FC<{first?: boolean; children: React.ReactNode}> = ({first, children}) => {
  const f = useCurrentFrame();
  const p = first ? 1 : Easing.out(Easing.cubic)(lerp(f, 0, 14, 0, 1));
  return <div style={{position: 'absolute', inset: 0, transform: `translateX(${(1 - p) * 390}px)`, boxShadow: first ? 'none' : '-20px 0 40px rgba(0,0,0,.5)'}}>{children}</div>;
};
const Slot: React.FC<{from: number; to: number; first?: boolean; children: React.ReactNode}> = ({from, to, first, children}) => (
  <Sequence from={from} durationInFrames={to - from}><SlideIn first={first}>{children}</SlideIn></Sequence>
);

export const StageScene: React.FC = () => {
  const f = useCurrentFrame();
  const fr = CAM.map((c) => c[0]);
  const ip = (i: 1 | 2 | 3) => interpolate(f, fr, CAM.map((c) => c[i]), {easing: Easing.inOut(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = ip(3);
  const px = ip(1) * K + 14 - 310, py = ip(2) * K + 14 - 654.5;
  const enter = sp(f, {damping: 16, stiffness: 80});
  const tx = -s * px, ty = -s * py - 60 + (1 - enter) * 900;
  const C = CUE;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 230, top: 490, width: 620, height: 1309, transformOrigin: '50% 50%', transform: `translate(${tx}px, ${ty}px) scale(${s}) rotate(${Math.sin(f / 40) * 0.4}deg)`}}>
        <PhoneShell>
          <Screen>
            <Slot from={0} to={C.scan[0] + 10} first><GetStartedScreen tapAt={C.tapStart} /></Slot>
            <Slot from={C.scan[0] - 6} to={C.home1 + 14}><ScanningScreen start={14} end={C.scan[1] - C.scan[0] - 2} /></Slot>
            <Slot from={C.home1} to={C.all + 14}><HomeScreen count tapSeeAll={C.tapSeeAll - C.home1} /></Slot>
            <Slot from={C.all} to={C.details + 14}><AllCategoriesScreen hl={[18, 40, 62, 84, 106]} /></Slot>
            <Slot from={C.details} to={C.home2 + 14}><DetailsScreen selAt={46} /></Slot>
            <Slot from={C.home2} to={C.confirm + 14}><HomeScreen tapReview={C.tapReview - C.home2} /></Slot>
            <Slot from={C.confirm} to={C.done + 14}><ConfirmScreen tapAt={C.tapDelete - C.confirm} /></Slot>
            <Slot from={C.done} to={C.pay + 14}><DoneScreen /></Slot>
            <Slot from={C.pay} to={STAGE_LEN}><PaywallScreen trialAt={50} tapAt={C.tapBuy - C.pay} /></Slot>
            <Sequence from={C.permFrom} durationInFrames={C.permAllow - C.permFrom + 16}><PermissionDialog from={0} allowAt={C.permAllow - C.permFrom} /></Sequence>
            <StatusBar />
          </Screen>
        </PhoneShell>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── CTA ───────── */
export const CtaScene: React.FC = () => {
  const f = useCurrentFrame();
  const lp = sp(f, {damping: 9, stiffness: 100});
  const bp = sp(f - 34, {damping: 12, stiffness: 130});
  return (
    <AbsoluteFill>
      <Rays cx={540} cy={760} size={1400} opacity={0.9} />
      <Shock cx={540} cy={760} start={2} max={560} />
      <Sparkles cx={540} cy={760} start={4} n={40} radius={460} size={34} duration={70} />
      <div style={{position: 'absolute', top: 520, left: 0, right: 0, ...col, alignItems: 'center', transform: `scale(${lp})`}}><Logo size={300} /></div>
      <div style={{position: 'absolute', top: 880, left: 0, right: 0, ...col, alignItems: 'center', fontFamily: FONT, opacity: Math.min(1, sp(f - 12))}}>
        <div style={{...rw, fontSize: 160, fontWeight: 900, letterSpacing: -5}}><span>Un</span><GradText>Pile</GradText></div>
        <div style={{fontSize: 56, fontWeight: 600, marginTop: 8}}>One-time <GradText>$19.99</GradText> · or 3 days free</div>
      </div>
      <div style={{position: 'absolute', top: 1260, left: 0, right: 0, ...rw, justifyContent: 'center', opacity: Math.min(1, bp), transform: `translateY(${(1 - bp) * 80}px) scale(${1 + 0.02 * Math.sin(f / 6)})`}}>
        {/* Replace with Apple's official “Download on the App Store” badge */}
        <div style={{...rw, alignItems: 'center', gap: 26, padding: '34px 70px', borderRadius: 50, background: '#000', border: '3px solid #666', fontFamily: FONT, color: '#fff', boxShadow: `0 0 80px ${Brand.primary}88`}}>
          <span style={{fontSize: 96}}></span>
          <div style={{...col}}><span style={{fontSize: 32}}>Download on the</span><span style={{fontSize: 78, fontWeight: 700, lineHeight: 1}}>App Store</span></div>
        </div>
      </div>
      <div style={{position: 'absolute', top: 1560, width: '100%', textAlign: 'center', fontFamily: FONT, fontSize: 42, color: Brand.textSecondary, opacity: lerp(f, 50, 62, 0, 1)}}>Private · Offline · No account</div>
    </AbsoluteFill>
  );
};
