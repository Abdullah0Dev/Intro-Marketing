# UnPile story video (Remotion) — 1080x1920, ~59.7s

Setup:
  npx create-video@latest --blank        (TypeScript)
  cd <project> && npx remotion add @remotion/transitions @remotion/google-fonts
  replace src/ with this src/ ; npm run dev ; composition id: UnpileStory
  npx remotion render UnpileStory out/unpile.mp4

Linux render machines need emoji fonts:  sudo apt install fonts-noto-color-emoji

Real assets (optional): put PNGs in /public and set them in src/theme.ts -> ASSETS (logo + 5 category icons).
Audio: put voiceover.mp3, music.mp3, sfx/*.mp3 in /public, then set AUDIO flags in src/theme.ts.
SFX names: notify haptic pop tick suck impact sparkle toggle success whoosh tap scan trash
Everything (timings, captions, SFX cues) is in src/theme.ts.
