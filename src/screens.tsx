import React from 'react';
import {Easing, spring, useCurrentFrame} from 'remotion';
import {Brand, FPS, G} from './theme';
import {Back, CatIcon, GBtn, GradText, Logo, Page, Photo, Rays, Shock, Sparkles, Tap, col, ent, lerp, rw, sp} from './ui';

export const CATS = [
  {k: 'shots', label: 'Screenshots', n: 412, gb: '0.9 GB', e: '📱'},
  {k: 'dups', label: 'Duplicates', n: 286, gb: '1.1 GB', e: '👯'},
  {k: 'clutter', label: 'Clutter', n: 173, gb: '0.5 GB', e: '🗂️'},
  {k: 'blur', label: 'Blurry Photos', n: 129, gb: '0.3 GB', e: '🌫️'},
  {k: 'live', label: 'Live Photos', n: 64, gb: '0.4 GB', e: '🎞️'},
];
const TOTAL_ITEMS = 1064;

const Row: React.FC<{c: (typeof CATS)[number]; f: number; delay: number; hl?: number}> = ({c, f, delay, hl = -999}) => {
  const p = lerp(f, hl, hl + 6, 0, 1) * lerp(f, hl + 12, hl + 22, 1, 0);
  return (
  <div style={{...rw, alignItems: 'center', padding: '12px 16px', background: '#12112860', border: `1px solid ${p > 0.05 ? Brand.glow : Brand.cardBorder}`, borderRadius: 20, boxShadow: `0 0 ${26 * p}px ${Brand.glow}`, ...ent(f, delay, 10), transform: `${ent(f, delay, 10).transform} scale(${1 + 0.035 * p})`}}>
    <div style={{width: 36, height: 36, borderRadius: 14, background: Brand.tileBackgroundAlt, ...col, alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
      <CatIcon k={c.k} emoji={c.e} size={32} />
    </div>
    <div style={{...col, flex: 1}}>
      <span style={{fontSize: 15, fontWeight: 500, marginBottom: 2}}>{c.label}</span>
      <span style={{fontSize: 13, color: Brand.textSecondary}}>{c.n} items</span>
    </div>
    <span style={{fontSize: 15, fontWeight: 500}}>{c.gb}</span>
  </div>
  );
};

const StatGlow = () => (
  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(128deg, rgba(108,60,224,0) 0%, rgba(108,60,224,.08) 30%, rgba(108,60,224,.25) 50%, rgba(108,60,224,.08) 70%, rgba(108,60,224,0) 100%)', opacity: 0.9}} />
);

/* ───────────── GetStarted ───────────── */
export const GetStartedScreen: React.FC<{tapAt: number}> = ({tapAt}) => {
  const f = useCurrentFrame();
  const hero = sp(f, {damping: 11, stiffness: 100});
  return (
    <Page>
      <div style={{...col, position: 'absolute', inset: 0, padding: '59px 18px 59px'}}>
        <div style={{...col, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: `scale(${0.6 + hero * 0.4})`, opacity: Math.min(1, hero)}}><Logo size={230} /></div>
          <div style={{...rw, fontSize: 52, fontWeight: 800, ...ent(f, 160)}}>
            <span>Un</span>
            <GradText>Pile</GradText>
          </div>
          <div style={{...col, alignItems: 'center', gap: 4, marginTop: 10, ...ent(f, 240)}}>
            <span style={{fontSize: 18, opacity: 0.8}}>Clean your camera roll.</span>
            <span style={{fontSize: 18, opacity: 0.8}}>Free up space in seconds.</span>
          </div>
        </div>
        <div style={ent(f, 360)}><GBtn title="Start Scanning" f={f} pressAt={tapAt} /></div>
      </div>
      <Tap x={195} y={755} at={tapAt} />
    </Page>
  );
};

/* ───────────── iOS photo permission dialog ───────────── */
export const PermissionDialog: React.FC<{from: number; allowAt: number}> = ({from, allowAt}) => {
  const f = useCurrentFrame();
  const p = sp(f - from, {damping: 13, stiffness: 160});
  const gone = lerp(f, allowAt + 4, allowAt + 12, 1, 0);
  if (f < from || gone <= 0) return null;
  return (
    <div style={{position: 'absolute', inset: 0, zIndex: 70, ...col, alignItems: 'center', justifyContent: 'center', background: `rgba(0,0,0,${0.45 * Math.min(1, p) * gone})`, opacity: gone}}>
      <div style={{width: 280, borderRadius: 16, background: 'rgba(44,44,48,.96)', transform: `scale(${0.85 + 0.15 * Math.min(1.04, p)})`, overflow: 'hidden', textAlign: 'center'}}>
        <div style={{padding: '20px 18px 16px'}}>
          <div style={{fontSize: 17, fontWeight: 600, lineHeight: 1.25}}>“UnPile” Would Like to Access Your Photos</div>
          <div style={{fontSize: 13, color: '#d8d8dc', marginTop: 6, lineHeight: 1.3}}>Scan your library on-device. Your photos never leave your iPhone.</div>
        </div>
        <div style={{borderTop: '0.5px solid #555', padding: 13, fontSize: 17, color: '#0A84FF'}}>Select Photos…</div>
        <div style={{borderTop: '0.5px solid #555', padding: 13, fontSize: 17, fontWeight: 600, color: '#0A84FF', background: f >= allowAt ? 'rgba(10,132,255,.25)' : 'transparent'}}>Allow Full Access</div>
        <div style={{borderTop: '0.5px solid #555', padding: 13, fontSize: 17, color: '#0A84FF'}}>Don’t Allow</div>
      </div>
      <Tap x={195} y={487} at={allowAt} />
    </div>
  );
};

/* ───────────── ScanningProgress ───────────── */
export const ScanningScreen: React.FC<{start: number; end: number}> = ({start, end}) => {
  const f = useCurrentFrame();
  const SIZE = 210, STROKE = 10, R = (SIZE - STROKE) / 2, C = 2 * Math.PI * R;
  const prog = lerp(f, start, end, 0, 100, Easing.inOut(Easing.quad));
  const sweep = (f % 54) / 54;
  const items = Math.round((prog / 100) * 8420);
  return (
    <Page>
      <div style={{...col, position: 'absolute', inset: 0, padding: '59px 16px 34px', alignItems: 'center'}}>
        <div style={{width: '100%', ...rw, marginBottom: 32, ...ent(f, 0)}}><Back /></div>
        <div style={{fontSize: 20, fontWeight: 600, marginBottom: 64, ...ent(f, 60)}}>Scanning Library</div>
        <div style={{position: 'relative', width: SIZE, height: SIZE, ...col, alignItems: 'center', justifyContent: 'center', marginBottom: 32, ...ent(f, 140, 20)}}>
          <div style={{position: 'absolute', width: SIZE * 1.05, height: SIZE * 1.05, borderRadius: 999, background: Brand.primary, opacity: 0.16, boxShadow: `0 0 36px ${Brand.glow}`}} />
          <svg width={SIZE} height={SIZE} style={{position: 'absolute', inset: 0}}>
            <defs>
              <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={Brand.primaryLight} /><stop offset="100%" stopColor={Brand.primaryDark} /></linearGradient>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={Brand.primary} stopOpacity={0} /><stop offset="75%" stopColor={Brand.glow} stopOpacity={0.95} /><stop offset="100%" stopColor="#fff" stopOpacity={1} /></linearGradient>
            </defs>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke={Brand.cardBorder} strokeWidth={STROKE} fill="none" opacity={0.45} />
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke="url(#pg)" strokeWidth={STROKE} strokeLinecap="round" fill="none" strokeDasharray={`${C}, ${C}`} strokeDashoffset={C - (C * prog) / 100} transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`} />
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke="url(#sg)" strokeWidth={STROKE} strokeLinecap="round" fill="none" strokeDasharray={`${C * 0.12}, ${C}`} strokeDashoffset={-sweep * C} transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`} />
          </svg>
          <span style={{fontSize: 40, fontWeight: 700, letterSpacing: -0.5}}>{Math.round(prog)}%</span>
        </div>
        <div style={{fontSize: 15, fontWeight: 500, marginBottom: 4, ...ent(f, 360)}}>Scanning {items.toLocaleString()} items...</div>
        <div style={{fontSize: 13, color: Brand.textSecondary, ...ent(f, 420)}}>This may take a few moments.</div>
        <div style={{width: '100%', ...rw, alignItems: 'center', background: Brand.cardBackground + '20', border: `1px solid ${Brand.cardBorder}`, borderRadius: 28, padding: 16, marginTop: 'auto', ...ent(f, 500)}}>
          <div style={{width: 40, height: 40, borderRadius: 14, background: Brand.tileBackground, ...col, alignItems: 'center', justifyContent: 'center', marginRight: 16}}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={Brand.glow} strokeWidth={2} strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" strokeLinecap="round" /></svg>
          </div>
          <div style={{...col, flex: 1}}>
            <span style={{fontSize: 15, fontWeight: 600, marginBottom: 2}}>100% On-Device</span>
            <span style={{fontSize: 13, color: Brand.textSecondary}}>Your photos never leave your iPhone.</span>
          </div>
        </div>
      </div>
    </Page>
  );
};

/* ───────────── Home (Scan Complete) ───────────── */
export const HomeScreen: React.FC<{count?: boolean; tapSeeAll?: number; tapReview?: number}> = ({count, tapSeeAll = -999, tapReview = -999}) => {
  const f = useCurrentFrame();
  const t = count ? lerp(f, 12, 62, 0, 1, Easing.out(Easing.cubic)) : 1;
  const pop = count ? 1 + 0.16 * Math.sin(Math.PI * lerp(f, 56, 76, 0, 1)) : 1;
  return (
    <Page>
      <div style={{...col, position: 'absolute', inset: 0, padding: '59px 16px 34px'}}>
        <div style={{...rw, alignItems: 'center', marginBottom: 24, ...ent(f, 0)}}><Back /></div>
        <div style={{alignSelf: 'center', fontSize: 20, fontWeight: 600, marginBottom: 24, ...ent(f, 60)}}>Scan Complete ✨</div>
        <div style={{position: 'relative', overflow: 'hidden', ...col, alignItems: 'center', border: `1px solid ${Brand.cardBorder}`, borderRadius: 28, padding: '24px 0', marginBottom: 24, ...ent(f, 140)}}>
          <StatGlow />
          <span style={{fontSize: 13, color: Brand.textSecondary, marginBottom: 4, zIndex: 1}}>You can free up</span>
          <span style={{fontSize: 40, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4, zIndex: 1, transform: `scale(${pop})`, textShadow: count && f > 12 ? `0 0 ${24 * Math.sin(Math.PI * Math.min(1, (f - 12) / 70)) + 4}px ${Brand.glow}` : 'none'}}>{(3.2 * t).toFixed(1)} GB</span>
          <span style={{fontSize: 13, color: Brand.textSecondary, zIndex: 1}}>{Math.round(TOTAL_ITEMS * t).toLocaleString()} items</span>
        </div>
        <div style={{...rw, justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', margin: '16px 0', ...ent(f, 220)}}>
          <span style={{fontSize: 20, fontWeight: 600}}>Categories</span>
          <span style={{fontSize: 15, fontWeight: 500, color: Brand.primary, padding: '4px 8px', background: f >= tapSeeAll && f < tapSeeAll + 14 ? Brand.tileBackground : 'transparent', borderRadius: 10}}>See All</span>
        </div>
        <div style={{...col, gap: 6, flex: 1, overflow: 'hidden'}}>{CATS.map((c, i) => <Row key={c.k} c={c} f={f} delay={220 + i * 70} hl={count ? 90 + i * 13 : undefined} />)}</div>
        <div style={{marginTop: 'auto', paddingTop: 12, ...ent(f, 600)}}><GBtn title="Review Items" f={f} pressAt={tapReview} /></div>
      </div>
      {count ? (
        <>
          <Rays cx={195} cy={229} size={620} start={10} opacity={lerp(f, 10, 20, 0, 1) * lerp(f, 70, 110, 1, 0.25)} />
          <Shock cx={195} cy={229} start={12} max={300} />
          <Shock cx={195} cy={229} start={20} max={220} color={Brand.sparkle} />
          <Sparkles cx={195} cy={229} start={14} n={30} radius={190} size={20} duration={50} />
        </>
      ) : null}
      <Tap x={338} y={353} at={tapSeeAll} />
      <Tap x={195} y={756} at={tapReview} />
    </Page>
  );
};

/* ───────────── All Categories ───────────── */
const ALL_ORDER = ['shots', 'clutter', 'dups', 'blur', 'live'];
export const AllCategoriesScreen: React.FC<{hl: number[]}> = ({hl}) => {
  const f = useCurrentFrame();
  return (
    <Page>
      <div style={{...col, position: 'absolute', inset: 0, paddingTop: 59}}>
        <div style={{padding: '0 16px'}}>
          <div style={{...rw, alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, ...ent(f, 0)}}>
            <Back /><span style={{fontSize: 17, fontWeight: 600}}>All Categories</span><span style={{width: 28}} />
          </div>
          <div style={{...rw, flexWrap: 'wrap', gap: 10, marginBottom: 24}}>
            {ALL_ORDER.map((k, i) => {
              const c = CATS.find((x) => x.k === k)!;
              const h = hl[i] ?? -999;
              const p = lerp(f, h, h + 8, 0, 1) * lerp(f, h + 16, h + 28, 1, 0);
              return (
                <div key={k} style={{flexBasis: '48%', flexGrow: 1, ...ent(f, 140 + i * 80, 12)}}>
                  <div style={{...col, alignItems: 'center', padding: 16, borderRadius: 20, background: `linear-gradient(180deg, #120E38, ${Brand.appBackground})`, border: `1px solid ${p > 0.05 ? Brand.glow : Brand.cardBorder}`, transform: `scale(${1 + 0.07 * p})`, boxShadow: `0 0 ${34 * p}px ${Brand.glow}`}}>
                    <div style={{width: 50, height: 50, borderRadius: 20, background: Brand.tileBackgroundAlt, ...col, alignItems: 'center', justifyContent: 'center', marginBottom: 16}}><CatIcon k={c.k} emoji={c.e} size={46} /></div>
                    <span style={{fontSize: 15, fontWeight: 600, marginBottom: 2}}>{c.label}</span>
                    <span style={{fontSize: 13, color: Brand.textSecondary, marginBottom: 8}}>{c.n} items</span>
                    <span style={{fontSize: 15, fontWeight: 500}}>{c.gb}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{position: 'relative', marginTop: 'auto', overflow: 'hidden', border: `1px solid ${Brand.cardBorder}`, borderRadius: '28px 28px 0 0', padding: '24px 16px 40px', ...col, alignItems: 'center', ...ent(f, 600, 30)}}>
          <StatGlow />
          <span style={{fontSize: 17, fontWeight: 600, marginBottom: 2, zIndex: 1}}>3.2 GB can be freed up</span>
          <span style={{fontSize: 13, color: Brand.textSecondary, marginBottom: 24, zIndex: 1}}>{TOTAL_ITEMS.toLocaleString()} items</span>
          <div style={{width: '100%', zIndex: 1}}><GBtn title="Smart Delete" icon="✦" f={f} /></div>
        </div>
      </div>
    </Page>
  );
};

/* ───────────── Category details (Duplicates) ───────────── */
const Badge: React.FC<{on: boolean; p: number}> = ({on, p}) => (
  <div style={{width: 18, height: 18, borderRadius: 999, boxSizing: 'border-box', background: on ? Brand.primary : 'rgba(0,0,0,.25)', border: `1.5px solid ${on ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.7)'}`, ...col, alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? 0.8 + 0.2 * Math.min(1.3, p) : 1})`, fontSize: 11, fontWeight: 900, lineHeight: 1}}>{on ? '✓' : ''}</div>
);
export const DetailsScreen: React.FC<{selAt: number}> = ({selAt}) => {
  const f = useCurrentFrame();
  const T = 114;
  const sel = f >= selAt;
  const total = 286;
  const cnt = sel ? Math.round(total * lerp(f, selAt, selAt + 24, 0, 1, Easing.out(Easing.cubic))) : 0;
  const crown = lerp(f, 92, 100, 0, 1) * lerp(f, 116, 128, 1, 0);
  return (
    <Page>
      <div style={{...col, position: 'absolute', inset: 0, padding: '59px 16px 0'}}>
        <div style={{...rw, alignItems: 'center', justifyContent: 'space-between', marginBottom: 2, ...ent(f, 0)}}>
          <Back /><span style={{fontSize: 17, fontWeight: 600}}>Duplicates</span>
          <span style={{fontSize: 15, fontWeight: 500, color: Brand.primaryLight}}>{sel ? 'Deselect All' : 'Select All'}</span>
        </div>
        <div style={{fontSize: 13, color: Brand.textSecondary, textAlign: 'center', marginBottom: 16, ...ent(f, 100)}}>{total} items · {cnt} selected · {(1.1 * (cnt / total)).toFixed(1)} GB</div>
        {[0, 1, 2, 3].map((g) => (
          <div key={g} style={{marginBottom: 16, ...ent(f, 260 + g * 90, 12)}}>
            <div style={{...rw, alignItems: 'center', gap: 4, marginBottom: 8}}>
              <span style={{fontSize: 11}}>👑</span><span style={{fontSize: 13, fontWeight: 500, color: '#E8B84B'}}>Best photo kept</span>
            </div>
            <div style={{...rw, gap: 8}}>
              {[0, 1, 2].map((i) => {
                const best = i === 0;
                const on = sel && !best && f >= selAt + 4 + (g * 2 + i) * 2;
                return (
                  <div key={i} style={{position: 'relative', width: T, height: T, borderRadius: 8, overflow: 'hidden', boxShadow: best ? `0 0 ${24 * crown}px #E8B84B, inset 0 0 0 ${3 * crown}px #E8B84B` : 'none', transform: best ? `scale(${1 + 0.05 * crown})` : 'none', zIndex: best ? 2 : 0}}>
                    <Photo seed={g * 7 + 3} />
                    {best ? <div style={{position: 'absolute', top: 4, left: 4, background: 'rgba(0,0,0,.6)', borderRadius: 8, padding: '2px 4px', fontSize: 12}}>👑</div> : null}
                    <div style={{position: 'absolute', bottom: 4, right: 4}}><Badge on={on} p={sp(f - (selAt + 4 + (g * 2 + i) * 2), {damping: 8, stiffness: 220})} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 10, right: 10, bottom: 54, borderRadius: 28, overflow: 'hidden', background: 'rgba(8,7,26,.92)', border: '1px solid rgba(58,46,110,.6)', padding: '16px 24px', ...rw, alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 -4px 12px rgba(0,0,0,.2)', ...ent(f, 320, 30)}}>
        <StatGlow />
        <div style={{...col, flex: 1, zIndex: 1}}>
          <span style={{fontSize: 15, fontWeight: 600}}>{cnt} Selected</span>
          <span style={{fontSize: 13, color: Brand.textSecondary, marginTop: 2}}>{(1.1 * (cnt / total)).toFixed(1)} GB</span>
        </div>
        <div style={{width: '50%', zIndex: 1}}><GBtn title="Delete" f={f} dim={sel ? 1 : 0.5} /></div>
      </div>
      <Tap x={337} y={73} at={selAt - 4} />
    </Page>
  );
};

/* ───────────── Delete confirmation ───────────── */
export const ConfirmScreen: React.FC<{tapAt: number}> = ({tapAt}) => {
  const f = useCurrentFrame();
  const hero = sp(f, {damping: 10, stiffness: 120});
  return (
    <Page>
      <div style={{...col, position: 'absolute', inset: 0, padding: '59px 24px 34px'}}>
        <div style={{...col, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 130, height: 130, borderRadius: 999, background: G.tile, ...col, alignItems: 'center', justifyContent: 'center', fontSize: 66, boxShadow: `0 0 50px ${Brand.primary}99`, transform: `scale(${hero})`, opacity: Math.min(1, hero)}}>🗑️</div>
          <div style={{fontSize: 20, fontWeight: 800, marginTop: 8, ...ent(f, 160)}}>Delete {TOTAL_ITEMS.toLocaleString()} items?</div>
          <div style={{maxWidth: 260, textAlign: 'center', fontSize: 15, opacity: 0.8, marginTop: 10, ...ent(f, 220)}}>Photos will be moved to Trash and can be restored for 30 days.</div>
          <div style={{...col, gap: 6, width: '100%', marginTop: 16}}>{CATS.map((c, i) => <Row key={c.k} c={c} f={f} delay={320 + i * 70} />)}</div>
        </div>
        <div style={{...col, gap: 10.5, marginBottom: 8, ...ent(f, 700)}}>
          <GBtn title="Delete Everything" f={f} pressAt={tapAt} />
          <GBtn title="Cancel" secondary f={f} />
        </div>
      </div>
      <Tap x={195} y={700} at={tapAt} />
    </Page>
  );
};

/* ───────────── Done ───────────── */
export const DoneScreen: React.FC = () => {
  const f = useCurrentFrame();
  const badge = f < 10 ? lerp(f, 0, 10, 0.4, 1.12) : 1 + (0.12 * (1 - spring({frame: f - 10, fps: FPS, config: {damping: 8, stiffness: 160}})));
  const t = lerp(f, 14, 56, 0, 1, Easing.out(Easing.cubic));
  return (
    <Page>
      <div style={{...col, position: 'absolute', inset: 0, padding: '59px 32px 34px'}}>
        <div style={{...col, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'relative', width: 240, height: 240, ...col, alignItems: 'center', justifyContent: 'center', marginBottom: 24}}>
            <div style={{position: 'absolute', width: 250, height: 250, borderRadius: 999, background: Brand.primary, opacity: 0.18 + 0.05 * Math.sin(f / 10), boxShadow: `0 0 70px ${Brand.glow}`}} />
            <div style={{width: 190, height: 190, borderRadius: 999, background: G.tile, ...col, alignItems: 'center', justifyContent: 'center', fontSize: 100, fontWeight: 900, transform: `scale(${badge})`, opacity: lerp(f, 0, 8, 0, 1), boxShadow: `0 0 40px ${Brand.glow}`}}>✓</div>
          </div>
          <div style={{fontSize: 20, fontWeight: 600, marginBottom: 24, ...ent(f, 220)}}>All Done! 🎉</div>
          <div style={{fontSize: 15, color: Brand.textSecondary, marginBottom: 4, ...ent(f, 300)}}>You freed up</div>
          <div style={{fontSize: 40, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4, textShadow: `0 0 ${18 * Math.sin(Math.PI * t) + 2}px ${Brand.glow}`, ...ent(f, 360)}}>{(3.2 * t).toFixed(1)} GB</div>
          <div style={{fontSize: 15, color: Brand.textSecondary, ...ent(f, 420)}}>{Math.round(TOTAL_ITEMS * t).toLocaleString()} Items deleted</div>
        </div>
        <div style={{...col, gap: 10.5, marginBottom: 8, ...ent(f, 520)}}>
          <GBtn title="View Library" f={f} />
          <GBtn title="Done" secondary f={f} />
        </div>
      </div>
      <Rays cx={195} cy={300} size={760} start={2} opacity={lerp(f, 40, 110, 1, 0.3)} />
      <Shock cx={195} cy={300} start={4} max={340} />
      <Sparkles cx={195} cy={300} start={6} n={34} radius={230} size={22} duration={60} />
    </Page>
  );
};

/* ───────────── Paywall ───────────── */
const FeatureIcon: React.FC<{d: string}> = ({d}) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={Brand.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const FEATS = [
  ['Unlimited Deletion', 'M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14'],
  ['AI Smart Select', 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z'],
  ['One-Tap Clean Up', 'M13 2 3 14h8l-1 8 10-12h-8z'],
  ['Seamless Experience', 'M6 3h12l4 6-10 12L2 9z'],
];
export const PaywallScreen: React.FC<{trialAt: number; tapAt: number}> = ({trialAt, tapAt}) => {
  const f = useCurrentFrame();
  const trial = f >= trialAt;
  const shake = f > 20 ? ((f - 20) % 45 < 12 ? Math.sin((f - 20) * 1.6) * 6 : 0) : 0;
  const Opt: React.FC<{sel: boolean; name: string; sub: React.ReactNode; right: React.ReactNode; delay: number}> = ({sel, name, sub, right, delay}) => (
    <div style={{...rw, alignItems: 'center', padding: '16px 18px', borderRadius: 20, background: sel ? 'rgba(123,79,224,.18)' : 'rgba(255,255,255,.04)', border: `2px solid ${sel ? Brand.primary : 'rgba(255,255,255,.15)'}`, boxShadow: sel ? `0 0 24px ${Brand.primary}66` : 'none', ...ent(f, delay)}}>
      <div style={{...col, flex: 1}}>
        <span style={{fontSize: 17, fontWeight: 700}}>{name}</span>
        <span style={{fontSize: 13, color: Brand.textSecondary, marginTop: 3}}>{sub}</span>
      </div>
      {right}
      <div style={{width: 24, height: 24, borderRadius: 999, marginLeft: 12, border: `2px solid ${sel ? Brand.primary : 'rgba(255,255,255,.4)'}`, ...col, alignItems: 'center', justifyContent: 'center'}}>
        {sel ? <div style={{width: 24, height: 24, borderRadius: 999, background: Brand.primary, fontSize: 13, fontWeight: 900, ...col, alignItems: 'center', justifyContent: 'center'}}>✓</div> : null}
      </div>
    </div>
  );
  return (
    <Page bg="#08071A">
      <div style={{...col, position: 'absolute', inset: 0, padding: '70px 20px 34px', alignItems: 'center'}}>
        <div style={{transform: `rotate(${shake}deg) scale(${0.9 + 0.05 * Math.sin(f / 8)})`, marginTop: 4}}><Logo size={108} /></div>
        <div style={{fontSize: 28, fontWeight: 800, margin: '14px 0 14px', ...ent(f, 100)}}>Premium Access</div>
        <div style={{...col, gap: 10, alignSelf: 'flex-start', paddingLeft: 40}}>
          {FEATS.map(([t, d], i) => (
            <div key={t} style={{...rw, alignItems: 'center', gap: 12, ...ent(f, 160 + i * 70, 10)}}><FeatureIcon d={d} /><span style={{fontSize: 17, fontWeight: 500}}>{t}</span></div>
          ))}
        </div>
        <div style={{...col, gap: 12, width: '100%', marginTop: 'auto', marginBottom: 14}}>
          <Opt delay={400} sel={!trial} name="Lifetime Plan" sub={<><s style={{opacity: 0.7}}>$155.48</s>{'  '}$19.99</>} right={<span style={{fontSize: 11, fontWeight: 800, background: Brand.primary, padding: '5px 9px', borderRadius: 8}}>BEST VALUE</span>} />
          <Opt delay={470} sel={trial} name="3-Day Trial" sub="then $2.99 per week" right={<span style={{fontSize: 20, fontWeight: 800}}>Short Term</span>} />
        </div>
        <div style={{...rw, alignItems: 'center', gap: 10, marginBottom: 14, fontSize: 15, ...ent(f, 540)}}>
          <span>Free Trial Enabled</span>
          <div style={{width: 46, height: 28, borderRadius: 999, background: trial ? '#34C759' : '#3a3a3c', position: 'relative'}}><div style={{position: 'absolute', top: 2, left: trial ? 20 : 2, width: 24, height: 24, borderRadius: 999, background: '#fff'}} /></div>
        </div>
        <div style={{width: '100%', ...ent(f, 600)}}><GBtn title={trial ? 'Try 3 Days Free  ›' : 'Unlock Now  ›'} f={f} pressAt={tapAt} /></div>
      </div>
      {/* video annotations */}
      {[{at: 18, until: trialAt - 2, y: 585, t: 'ONE-TIME · NO SUBSCRIPTION'}, {at: trialAt + 2, until: 999, y: 585, t: '3 DAYS FREE'}].map((c, i) => {
        const p = sp(f - c.at, {damping: 12, stiffness: 160});
        const o = lerp(f, c.until - 6, c.until, 1, 0);
        return f >= c.at ? <div key={i} style={{position: 'absolute', left: 0, right: 0, top: c.y, ...col, alignItems: 'center', opacity: Math.min(1, p) * o, transform: `scale(${0.7 + 0.3 * Math.min(1.1, p)})`, zIndex: 40}}><span style={{background: G.tile, borderRadius: 999, padding: '8px 18px', fontSize: 15, fontWeight: 800, boxShadow: `0 0 30px ${Brand.glow}`}}>{c.t}</span></div> : null;
      })}
      <Tap x={195} y={756} at={tapAt} />
      <Shock cx={195} cy={756} start={tapAt + 2} max={320} />
      <Sparkles cx={195} cy={560} start={tapAt + 2} n={32} radius={230} size={22} duration={50} />
      {f >= tapAt + 6 ? (() => { const ok = sp(f - (tapAt + 6), {damping: 11, stiffness: 150}); return <div style={{position: 'absolute', left: 0, right: 0, top: 330, ...col, alignItems: 'center', zIndex: 50, opacity: Math.min(1, ok), transform: `scale(${0.7 + 0.3 * Math.min(1.1, ok)})`}}><span style={{background: G.tile, borderRadius: 999, padding: '12px 26px', fontSize: 20, fontWeight: 800, boxShadow: `0 0 40px ${Brand.glow}`}}>✓ Premium Unlocked</span></div>; })() : null}
    </Page>
  );
};
