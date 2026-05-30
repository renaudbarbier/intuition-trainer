// One-off: rasterize the envelope motif to PWA PNG icons.
// Run with:  node scripts/gen-icons.mjs
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

mkdirSync('public/icons', { recursive: true })

// Envelope artwork, centered within the 80% maskable safe zone (≈51–461).
const envelope = `
  <rect x="106" y="166" width="300" height="200" rx="14" fill="#fdf8f0" stroke="#c4aa85" stroke-width="6"/>
  <polygon points="109,169 256,276 109,363" fill="#f4e8d2"/>
  <polygon points="403,169 256,276 403,363" fill="#efe0c4"/>
  <polygon points="109,363 256,276 403,363" fill="#ecdcbd"/>
  <polygon points="109,169 256,276 403,169" fill="#faf2e2" stroke="#c4aa85" stroke-width="6" stroke-linejoin="round"/>
  <circle cx="256" cy="276" r="30" fill="#b85c2a" stroke="rgba(0,0,0,0.18)" stroke-width="3"/>
  <line x1="256" y1="255" x2="256" y2="297" stroke="rgba(255,255,255,0.6)" stroke-width="4" stroke-linecap="round"/>
  <line x1="235" y1="276" x2="277" y2="276" stroke="rgba(255,255,255,0.6)" stroke-width="4" stroke-linecap="round"/>
`

// Rounded background for the regular ("any") icon.
const standard = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#f0e6d6"/>
  ${envelope}
</svg>`

// Full-bleed background for the maskable icon (the platform applies the mask).
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#f0e6d6"/>
  ${envelope}
</svg>`

await sharp(Buffer.from(standard)).resize(512, 512).png().toFile('public/icons/icon-512.png')
await sharp(Buffer.from(standard)).resize(192, 192).png().toFile('public/icons/icon-192.png')
await sharp(Buffer.from(maskable)).resize(512, 512).png().toFile('public/icons/icon-maskable-512.png')

console.log('Icons written to public/icons/')
