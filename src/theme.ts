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

/* ── Optional real assets: drop PNGs in /public and put the file names here ── */
export const ASSETS: {logo: string | null; icons: Record<string, string>} = {
  logo: "logo.png", // e.g. 'logo3.png'
  icons: {}, // e.g. { shots: 'icons/screenshots.png', dups: 'icons/duplicates.png', clutter: '...', blur: '...', live: '...' }
};

export const AUDIO = {sfx: true, voiceover: false, music: false};

/* ── Timeline (absolute frames @30fps) ── */
export const ST = 540; // phone-stage start
export const STAGE_LEN = 1150;
export const TL = {
  s1: [0, 180],
  s2: [180, 270],
  s3: [270, 420],
  s4: [420, 540],
  cta: [ST + STAGE_LEN, ST + STAGE_LEN + 100],
} as const;
export const TOTAL = ST + STAGE_LEN + 100; // 1790 = ~59.7s

/* ── Stage cues (frames relative to ST) ── */
export const CUE = {
  tapStart: 70,
  permFrom: 104,
  permAllow: 168,
  scan: [188, 332] as const,
  home1: 320,
  all: 470,
  details: 590,
  home2: 710,
  confirm: 770,
  done: 880,
  pay: 1010,
};

/* ── Voiceover / captions (single source of truth) ── */
export type Line = {from: number; to: number; who: 'me' | 'unpile'; text: string; cap?: boolean};
export const VO: Line[] = [
  {from: 12, to: 62, who: 'me', text: 'Storage full… again?!'},
  {from: 64, to: 124, who: 'me', text: 'Which photos do I even delete?'},
  {from: 126, to: 178, who: 'me', text: 'This? This? This…?'},
  {from: 186, to: 268, who: 'unpile', text: 'Just use UnPile.'},
  {from: 278, to: 340, who: 'me', text: 'Wait… it finds my bad photos?', cap: false},
  {from: 344, to: 418, who: 'unpile', text: 'Blurry shots, duplicates, even old photos you haven’t opened in ages.', cap: false},
  {from: 426, to: 476, who: 'me', text: 'But my privacy, mate?', cap: false},
  {from: 480, to: 538, who: 'unpile', text: 'UnPile is 100% local. It even works offline.', cap: false},
  {from: 540, to: 598, who: 'me', text: 'Ohh, that’s what I need! How does it work?'},
  {from: 602, to: 672, who: 'unpile', text: 'Super simple. Tap “Start Scanning”.'},
  {from: 676, to: 748, who: 'unpile', text: 'Allow access to your photos.'},
  {from: 752, to: 858, who: 'unpile', text: 'It scans for clutter, duplicates, blurry photos and screenshots.'},
  {from: 862, to: 940, who: 'unpile', text: 'Look — save up to 3 GB!'},
  {from: 944, to: 1008, who: 'unpile', text: 'Every bad screenshot, duplicate and blurry shot. Caught.'},
  {from: 1012, to: 1138, who: 'unpile', text: 'Tap “See All” to browse every category.'},
  {from: 1142, to: 1250, who: 'unpile', text: 'Pick what you want, delete, done. Duplicates? Only the best one stays.'},
  {from: 1254, to: 1308, who: 'me', text: 'But I wanna delete ALL of them!'},
  {from: 1312, to: 1424, who: 'unpile', text: 'Sure! Tap “Review Items”, then “Delete”. Everything goes to Trash.'},
  {from: 1430, to: 1545, who: 'me', text: 'WOOHOO! Thanks so much!'},
  {from: 1552, to: 1688, who: 'unpile', text: 'One-time fee of $20. Or try it free for 3 days.'},
  {from: 1696, to: 1788, who: 'unpile', text: 'Let’s go! Download UnPile now.'},
];

/* ── Sound effects (files go in /public/sfx) ── */
const s = (f: number, file: string, vol = 0.6) => ({f, file, vol});
export const SFX = [
  s(12, 'notify.mp3'), s(14, 'haptic.mp3', 0.8),
  ...[66, 70, 74, 78, 82, 86, 90, 94].map((f) => s(f, 'pop.mp3', 0.25)),
  s(128, 'tick.mp3'), s(142, 'tick.mp3'), s(156, 'tick.mp3'), s(156, 'suck.mp3', 0.7),
  s(184, 'impact.mp3', 0.9), s(188, 'sparkle.mp3'),
  s(276, 'pop.mp3'), s(334, 'pop.mp3'), s(372, 'tick.mp3'), s(384, 'tick.mp3'), s(396, 'tick.mp3'),
  s(432, 'pop.mp3'), s(466, 'pop.mp3'), s(498, 'toggle.mp3'), s(520, 'success.mp3', 0.5),
  s(ST + 2, 'whoosh.mp3', 0.5),
  s(ST + CUE.tapStart, 'tap.mp3'),
  s(ST + CUE.permFrom, 'pop.mp3'), s(ST + CUE.permAllow, 'tap.mp3'),
  s(ST + CUE.scan[0], 'scan.mp3', 0.5),
  s(ST + CUE.home1, 'whoosh.mp3', 0.5), s(ST + CUE.home1 + 12, 'impact.mp3', 0.9), s(ST + CUE.home1 + 14, 'sparkle.mp3'),
  ...[0, 1, 2, 3, 4].map((i) => s(ST + CUE.home1 + 60 + i * 8, 'tick.mp3', 0.4)),
  s(ST + 452, 'tap.mp3'), s(ST + CUE.all, 'whoosh.mp3', 0.5),
  ...[490, 510, 530, 550, 570].map((f) => s(ST + f, 'tick.mp3', 0.5)),
  s(ST + CUE.details, 'whoosh.mp3', 0.5), s(ST + 636, 'tap.mp3'),
  ...[0, 1, 2, 3, 4, 5].map((i) => s(ST + 640 + i * 4, 'pop.mp3', 0.3)),
  s(ST + CUE.home2, 'whoosh.mp3', 0.4), s(ST + 748, 'tap.mp3'),
  s(ST + CUE.confirm, 'whoosh.mp3', 0.5), s(ST + 862, 'tap.mp3'), s(ST + 866, 'trash.mp3', 0.8),
  s(ST + CUE.done, 'success.mp3', 0.8), s(ST + CUE.done + 4, 'sparkle.mp3'),
  s(ST + CUE.pay, 'whoosh.mp3', 0.5), s(ST + CUE.pay + 30, 'pop.mp3'), s(ST + CUE.pay + 80, 'toggle.mp3'),
  s(ST + 1110, 'tap.mp3'),
  s(ST + STAGE_LEN + 2, 'impact.mp3', 0.9), s(ST + STAGE_LEN + 6, 'sparkle.mp3'),
];
