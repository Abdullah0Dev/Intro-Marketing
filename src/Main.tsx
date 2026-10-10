import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {AUDIO, Brand, G, SFX, ST, STAGE_LEN, TL, TOTAL, VO} from './theme';
import {Bg, FONT, GradText, col, lerp, rw, sp} from './ui';
import {CtaScene, S1, S2, S3, S4, StageScene} from './scenes';

const FadeWrap: React.FC<{d: number; children: React.ReactNode}> = ({d, children}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{opacity: Math.min(lerp(f, 0, 8, 0, 1), lerp(f, d - 8, d, 1, 0))}}>{children}</AbsoluteFill>;
};
const Scene: React.FC<{r: readonly [number, number]; children: React.ReactNode}> = ({r, children}) => (
  <Sequence from={r[0]} durationInFrames={r[1] - r[0]}><FadeWrap d={r[1] - r[0]}>{children}</FadeWrap></Sequence>
);

const Cap: React.FC<{who: 'me' | 'unpile'; text: string; d: number}> = ({who, text, d}) => {
  const f = useCurrentFrame();
  const words = text.split(' ');
  return (
    <div style={{position: 'absolute', top: 120, left: 60, right: 60, ...col, alignItems: 'center', gap: 22, fontFamily: FONT, opacity: lerp(f, d - 6, d, 1, 0), zIndex: 100}}>
      <div style={{fontSize: 34, fontWeight: 800, letterSpacing: 4, padding: '8px 26px', borderRadius: 999, background: who === 'unpile' ? G.tile : 'rgba(255,255,255,.14)', border: who === 'me' ? '2px solid rgba(255,255,255,.4)' : 'none'}}>{who === 'unpile' ? 'UNPILE' : 'ME'}</div>
      <div style={{...rw, flexWrap: 'wrap', justifyContent: 'center', gap: '0 22px', fontSize: 74, fontWeight: 900, lineHeight: 1.1, textAlign: 'center', textShadow: '0 6px 30px rgba(0,0,0,.7)'}}>
        {words.map((w, i) => {
          const p = sp(f - i * 3, {damping: 14, stiffness: 150});
          return <span key={i} style={{display: 'inline-block', opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + 0.1 * Math.min(1, p)})`, color: who === 'unpile' && i === words.length - 1 ? Brand.glow : '#fff'}}>{w}</span>;
        })}
      </div>
    </div>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: Brand.appBackground}}>
    <Bg />
    <Scene r={TL.s1}><S1 /></Scene>
    <Scene r={TL.s2}><S2 /></Scene>
    <Scene r={TL.s3}><S3 /></Scene>
    <Scene r={TL.s4}><S4 /></Scene>
    <Sequence from={ST} durationInFrames={STAGE_LEN}><StageScene /></Sequence>
    <Scene r={TL.cta}><CtaScene /></Scene>

    {VO.filter((l) => l.cap !== false).map((l, i) => (
      <Sequence key={i} from={l.from} durationInFrames={l.to - l.from}><Cap who={l.who} text={l.text} d={l.to - l.from} /></Sequence>
    ))}

    {AUDIO.sfx ? SFX.map((e, i) => <Sequence key={i} from={e.f}><Audio src={staticFile(`sfx/${e.file}`)} volume={e.vol} /></Sequence>) : null}
    {AUDIO.voiceover ? <Audio src={staticFile('voiceover.mp3')} /> : null}
    {AUDIO.music ? <Audio src={staticFile('music.mp3')} volume={(f) => interpolate(f, [0, 30, TOTAL - 60, TOTAL], [0, 0.2, 0.2, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} /> : null}
  </AbsoluteFill>
);
