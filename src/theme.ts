export const W = 1080;
export const H = 1920;
export const FPS = 30;

/* ── Your real brand tokens (from constants/theme.ts) ── */
export const Brand = {
  appBackground: '#060423',
  cardBackground: '#15131F',
  cardBorder: '#3A2E6E',
  primary: '#7B4FE0',
  primaryLight: '#9B6FF5',
  primaryDark: '#5A34B8',
  glow: '#B98CFF',
  sparkle: '#D6BBFF',
  tileBackground: 'rgba(123, 79, 224, 0.15)',
  tileBackgroundAlt: 'rgba(123, 79, 224, 0.08)',
  textPrimary: '#FFFFFF',
  textSecondary: '#A8A6B8',
  textTertiary: '#7A7890',
} as const;

export const G = {
  text: 'linear-gradient(180deg, #9B6FF5, #6C3CE0)', // Gradients.primaryButton
  button: 'linear-gradient(128deg, #5C28C6, #7733E8, #5D29C7)', // Gradients.buttonGradient
  buttonOff: 'linear-gradient(128deg, #12112890, #121128, #12112880)',
  tile: 'linear-gradient(135deg, #8A5CF0, #5A34B8)', // Gradients.iconTile
};

/* ── Real assets (files live in /public) ── */
export const ASSETS: {logo: string | null; storageFull: string | null; icons: Record<string, string>} = {
  logo: 'logo.png',
  storageFull: 'storage-full.png',
  icons: {}, // e.g. { shots: 'icons/screenshots.png', dups: 'icons/duplicates.png', clutter: '...', blur: '...', live: '...' }
};

export const AUDIO = {sfx: true, voiceover: true, music: false};

/* ── Timeline (absolute frames @30fps) — matched to your 59.6s voiceover ── */
export const ST = 540; // phone-stage start (18.0s)
export const STAGE_LEN = 1150;
export const TL = {
  s1: [0, 180],
  s2: [180, 270],
  s3: [270, 420],
  s4: [420, 540],
  cta: [ST + STAGE_LEN, ST + STAGE_LEN + 100],
} as const;
export const TOTAL = ST + STAGE_LEN + 100; // 1790 = 59.7s

/* ── Stage cues (frames relative to ST) ── */
export const CUE = {
  tapStart: 70, // "Tap Start Scanning"
  permFrom: 130, // "Allow access to your photos"
  permAllow: 182,
  scan: [204, 328] as const, // "It scans for clutter…"
  home1: 320, // "Look — save up to 3 GB!"
  tapSeeAll: 478, // "Tap See All…"
  all: 490,
  details: 600, // "Select what you want…"
  home2: 710, // "But I wanna delete ALL of them!"
  tapReview: 772, // "Tap Review Items…"
  confirm: 790,
  tapDelete: 838, // "…then Delete"
  done: 880, // "WOOHOO!"
  pay: 1010, // "I'm getting this NOW!"
  tapBuy: 1086,
};

/* ── Voiceover / captions (single source of truth, from your recorded timings) ── */
export type Line = {from: number; to: number; who: 'me' | 'unpile'; text: string; cap?: boolean};
export const VO: Line[] = [
  {from: 12, to: 63, who: 'me', text: 'Storage full… again?!'},
  {from: 63, to: 123, who: 'me', text: 'Which photos do I even delete?'},
  {from: 126, to: 177, who: 'me', text: 'This? This? This…?'},
  {from: 186, to: 267, who: 'unpile', text: 'Just use UnPile.'},
  {from: 279, to: 339, who: 'me', text: 'Wait… it finds my bad photos?', cap: false},
  {from: 345, to: 417, who: 'unpile', text: 'Blurry shots, duplicates, and forgotten photos.', cap: false},
  {from: 426, to: 477, who: 'me', text: 'But my privacy, mate?', cap: false},
  {from: 480, to: 537, who: 'unpile', text: 'It’s 100% local. Works offline, too.', cap: false},
  {from: 540, to: 597, who: 'me', text: 'Ohh, perfect! How does it work?'},
  {from: 603, to: 672, who: 'unpile', text: 'Super simple. Tap “Start Scanning”.'},
  {from: 675, to: 747, who: 'unpile', text: 'Allow access to your photos.'},
  {from: 753, to: 858, who: 'unpile', text: 'It scans for clutter, duplicates, blurry photos, and screenshots.'},
  {from: 861, to: 939, who: 'unpile', text: 'Look — save up to 3 GB!'},
  {from: 945, to: 1008, who: 'unpile', text: 'Bad screenshots, duplicates, blur — caught.'},
  {from: 1011, to: 1137, who: 'unpile', text: 'Tap “See All” to browse every category.'},
  {from: 1143, to: 1251, who: 'unpile', text: 'Select what you want. Delete. Only the best duplicate stays.'},
  {from: 1254, to: 1308, who: 'me', text: 'But I wanna delete ALL of them!'},
  {from: 1311, to: 1425, who: 'unpile', text: 'Sure! Tap “Review Items”, then “Delete”. Everything goes to Trash.'},
  {from: 1431, to: 1545, who: 'me', text: 'WOOHOO! Thanks so much!'},
  {from: 1551, to: 1635, who: 'me', text: 'Oh mate, I’m getting this NOW!'},
  {from: 1695, to: 1788, who: 'unpile', text: 'Let’s go! Download UnPile now.'},
];

/* ── Sound effects (files in /public/sfx) ── */
const s = (f: number, file: string, vol = 0.6) => ({f, file, vol});
export const SFX = [
  // S1: notification, photo flood, "this? this? this?", suck-in
  s(12, 'notify.mp3'), s(14, 'haptic.mp3', 0.8),
  ...[66, 70, 74, 78, 82, 86, 90, 94].map((f) => s(f, 'pop.mp3', 0.25)),
  s(130, 'tick.mp3'), s(146, 'tick.mp3'), s(162, 'tick.mp3'), s(160, 'suck.mp3', 0.7),
  // S2: logo
  s(184, 'impact.mp3', 0.9), s(188, 'sparkle.mp3'),
  // S3 / S4: comments
  s(276, 'pop.mp3'), s(342, 'pop.mp3'), s(372, 'tick.mp3'), s(386, 'tick.mp3'), s(400, 'tick.mp3'),
  s(424, 'pop.mp3'), s(478, 'pop.mp3'), s(490, 'pop.mp3', 0.4), s(508, 'toggle.mp3'), s(522, 'success.mp3', 0.5),
  // Stage
  s(ST + 2, 'whoosh.mp3', 0.5),
  s(ST + CUE.tapStart, 'tap.mp3'),
  s(ST + CUE.permFrom, 'pop.mp3'), s(ST + CUE.permAllow, 'tap.mp3'),
  s(ST + CUE.scan[0], 'scan.mp3', 0.5),
  s(ST + CUE.home1, 'whoosh.mp3', 0.5), s(ST + CUE.home1 + 12, 'impact.mp3', 0.9), s(ST + CUE.home1 + 14, 'sparkle.mp3'),
  ...[0, 1, 2, 3, 4].map((i) => s(ST + CUE.home1 + 90 + i * 13, 'tick.mp3', 0.45)),
  s(ST + CUE.tapSeeAll, 'tap.mp3'), s(ST + CUE.all, 'whoosh.mp3', 0.5),
  ...[18, 40, 62, 84, 106].map((f) => s(ST + CUE.all + f, 'tick.mp3', 0.5)),
  s(ST + CUE.details, 'whoosh.mp3', 0.5), s(ST + CUE.details + 42, 'tap.mp3'),
  ...[0, 1, 2, 3, 4, 5].map((i) => s(ST + CUE.details + 48 + i * 4, 'pop.mp3', 0.3)),
  s(ST + CUE.details + 92, 'sparkle.mp3', 0.5),
  s(ST + CUE.home2, 'whoosh.mp3', 0.4), s(ST + CUE.tapReview, 'tap.mp3'),
  s(ST + CUE.confirm, 'whoosh.mp3', 0.5), s(ST + CUE.tapDelete, 'tap.mp3'), s(ST + CUE.tapDelete + 4, 'trash.mp3', 0.8),
  s(ST + CUE.done, 'success.mp3', 0.8), s(ST + CUE.done + 4, 'sparkle.mp3'),
  s(ST + CUE.pay, 'whoosh.mp3', 0.5), s(ST + CUE.pay + 18, 'pop.mp3'), s(ST + CUE.pay + 50, 'toggle.mp3'),
  s(ST + CUE.tapBuy, 'tap.mp3'), s(ST + CUE.tapBuy + 4, 'success.mp3', 0.7), s(ST + CUE.tapBuy + 6, 'sparkle.mp3'),
  // CTA
  s(ST + STAGE_LEN + 2, 'impact.mp3', 0.9), s(ST + STAGE_LEN + 6, 'sparkle.mp3'),
];
