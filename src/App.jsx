import { useState, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  Categories: icon, colors, and query pool                          */
/* ------------------------------------------------------------------ */

const CATEGORIES = {
  animal: {
    label: 'Wild Animal',
    icon: '🦁',
    color: '#b85c2a',
    lightBg: '#fff3ec',
    pool: [
      'panda', 'lion', 'tiger', 'leopard', 'cheetah', 'jaguar', 'snow leopard', 'wolf',
      'fox', 'polar bear', 'grizzly bear', 'elephant', 'giraffe', 'hippo', 'rhino', 'zebra',
      'gorilla', 'chimpanzee', 'orangutan', 'baboon', 'mandrill', 'lemur', 'whale', 'dolphin',
      'great white shark', 'octopus', 'jellyfish', 'sea turtle', 'walrus', 'seal', 'narwhal',
      'orca', 'manatee', 'beluga whale', 'manta ray', 'cuttlefish', 'seahorse', 'eagle', 'owl',
      'flamingo', 'toucan', 'peacock', 'parrot', 'puffin', 'pelican', 'macaw', 'cockatoo',
      'hummingbird', 'kingfisher', 'hornbill', 'shoebill stork', 'crocodile', 'iguana',
      'chameleon', 'komodo dragon', 'gecko', 'cobra', 'python', 'frog', 'axolotl', 'tortoise',
      'butterfly', 'dragonfly', 'ladybug', 'mantis', 'morpho butterfly', 'tarantula', 'scorpion',
      'snail', 'bee', 'deer', 'moose', 'elk', 'gazelle', 'impala', 'mountain goat', 'ibex',
      'kangaroo', 'koala', 'wombat', 'quokka', 'platypus', 'echidna', 'hedgehog', 'porcupine',
      'beaver', 'otter', 'meerkat', 'raccoon', 'armadillo', 'anteater', 'pangolin', 'capybara',
      'red panda', 'chipmunk', 'prairie dog', 'lynx', 'wolverine',
    ],
  },
  place: {
    label: 'Place',
    icon: '🏔️',
    color: '#2a6b8a',
    lightBg: '#ecf4f9',
    pool: [
      'Eiffel Tower Paris', 'Colosseum Rome', 'Taj Mahal India', 'Great Wall China',
      'Machu Picchu Peru', 'Angkor Wat Cambodia', 'Petra Jordan', 'Stonehenge England',
      'Pyramids of Giza Egypt', 'Acropolis Athens Greece', 'Chichen Itza Mexico',
      'Borobudur Indonesia', 'Hagia Sophia Istanbul', 'Saint Basil Cathedral Moscow',
      'Sagrada Familia Barcelona', 'Neuschwanstein Castle Germany', 'Mont Saint Michel France',
      'Alhambra Granada Spain', 'Leaning Tower of Pisa Italy', 'Big Ben London',
      'Tower Bridge London', 'Trevi Fountain Rome', 'Piazza del Duomo Milan',
      'Piazza San Marco Venice', 'Brandenburg Gate Berlin', 'Charles Bridge Prague',
      'Buda Castle Budapest', 'Niagara Falls', 'Victoria Falls Africa', 'Iguazu Falls Brazil',
      'Angel Falls Venezuela', 'Aurora Borealis Iceland', 'Grand Canyon Arizona',
      'Antelope Canyon Arizona', 'Horseshoe Bend Arizona', 'Monument Valley Arizona',
      'Bryce Canyon Utah', 'Yosemite Valley California', 'Mount Fuji Japan', 'Mount Everest Nepal',
      'Matterhorn Switzerland', 'Norwegian Fjord', 'Milford Sound New Zealand',
      'Banff Lake Louise Canada', 'Plitvice Lakes Croatia', 'Lake Bled Slovenia',
      'Hallstatt Austria lake', 'Dolomites Italy', 'Tuscany hills vineyard Italy',
      'Amalfi Coast Italy', 'Cinque Terre Italy', 'Santorini Greece sunset',
      'Cappadocia balloons Turkey', 'Wadi Rum Jordan desert', 'Sossusvlei Namibia dunes',
      'Salar de Uyuni Bolivia', 'Rainbow Mountain Peru', 'Zhangjiajie mountains China',
      'Ha Long Bay Vietnam', 'Bali rice terraces Indonesia', 'Cherry blossom Japan',
      'Lavender field Provence France', 'Tulip fields Netherlands', 'Isle of Skye Scotland',
      'Cliffs of Moher Ireland', 'Scottish Highlands lake', 'Patagonia Torres del Paine Chile',
      'Atacama Desert Chile', 'Sahara Desert dunes', 'Maldives turquoise water',
      'Faroe Islands cliffs', 'Lofoten Islands Norway', 'Swiss Alps snow',
      'Meteora Greece monasteries', 'Dead Sea Jordan', 'Yellowstone geyser',
      'Serengeti Africa plain', 'Table Mountain South Africa',
    ],
  },
  object: {
    label: 'Daily Life Object',
    icon: '☕',
    color: '#5a7a3a',
    lightBg: '#f2f7ec',
    pool: [
      'fork', 'spoon', 'knife', 'plate', 'glass', 'cup', 'mug', 'bowl', 'pot', 'frying pan',
      'cutting board', 'toaster', 'kettle', 'blender', 'coffee maker', 'espresso machine',
      'whisk', 'spatula', 'ladle', 'peeler', 'grater', 'rolling pin', 'corkscrew',
      'bottle opener', 'pepper mill', 'mortar and pestle', 'colander', 'toothbrush', 'razor',
      'hairdryer', 'hairbrush', 'comb', 'mirror', 'towel', 'bathtub', 'soap bar',
      'shampoo bottle', 'perfume bottle', 'nail clippers', 'tweezers', 'lipstick',
      'hair straightener', 'wooden chair', 'armchair', 'lamp', 'floor lamp', 'candle',
      'alarm clock', 'wall clock', 'vase', 'watering can', 'umbrella', 'hat', 'sunglasses',
      'watch', 'ring', 'necklace', 'bracelet', 'shoes', 'boots', 'sneakers', 'hammer',
      'screwdriver', 'wrench', 'drill', 'saw', 'tape measure', 'pliers', 'flashlight', 'ladder',
      'pen', 'pencil', 'fountain pen', 'notebook', 'scissors', 'stapler', 'eraser', 'calculator',
      'magnifying glass', 'compass', 'envelope', 'smartphone', 'laptop', 'headphones', 'camera',
      'remote control', 'battery', 'backpack', 'wallet', 'keys', 'suitcase', 'thermometer',
      'first aid kit', 'medicine bottle', 'playing cards', 'dice', 'chess pieces', 'yoga mat',
      'dumbbell', 'paintbrush', 'knitting needles', 'thermos', 'wine glass', 'teapot',
      'hourglass', 'globe', 'binoculars', 'typewriter',
    ],
  },
}

/* Fisher-Yates: returns a new shuffled array, leaves the source untouched. */
function shuffle(source) {
  const a = source.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Bias the Wikipedia search so ambiguous animal names (python, seal, cobra…)
// resolve to the creature rather than the programming language / Navy unit / car.
function buildSearch(categoryKey, query) {
  return categoryKey === 'animal' ? `${query} animal` : query
}

// Keyless image source: the Wikipedia (MediaWiki) API. `origin=*` enables
// anonymous CORS so this works straight from the browser, no API key.
// We search the query and return the best-matching page's lead image.
async function fetchImageUrl(categoryKey, query) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrsearch: buildSearch(categoryKey, query),
    gsrlimit: '4',
    gsrnamespace: '0',
    prop: 'pageimages',
    piprop: 'original|thumbnail',
    pithumbsize: '1000',
  })
  const res = await fetch(`https://en.wikipedia.org/w/api.php?${params}`)
  if (!res.ok) throw new Error(`Wikipedia ${res.status}`)
  const data = await res.json()
  const pages = data && data.query && data.query.pages
  if (!pages) return null
  // Walk results in search-rank order; take the first page that has an image.
  const ranked = Object.values(pages).sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
  for (const page of ranked) {
    const url = (page.original && page.original.source) || (page.thumbnail && page.thumbnail.source)
    if (url) return url
  }
  return null
}

/* ------------------------------------------------------------------ */
/*  Envelope SVG (340 x 230)                                          */
/* ------------------------------------------------------------------ */

function EnvelopeBody({ color }) {
  return (
    <svg
      width="340"
      height="230"
      viewBox="0 0 340 230"
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    >
      {/* parchment body + golden border */}
      <rect x="1.5" y="1.5" width="337" height="227" rx="6" fill="#fdf8f0" stroke="#c4aa85" strokeWidth="3" />
      {/* triangular folds, slightly different cream tones */}
      <polygon points="2,2 170,116 2,228" fill="#f6ecd9" />
      <polygon points="338,2 170,116 338,228" fill="#f1e5cd" />
      <polygon points="2,228 170,116 338,228" fill="#efe0c4" />
      {/* fold seams */}
      <polygon points="2,2 170,116 338,2 338,228 2,228" fill="none" stroke="#e3d3b3" strokeWidth="1" />
      {/* dashed stamp, top-right */}
      <rect x="276" y="16" width="48" height="40" rx="3" fill="none" stroke="#c4aa85" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* three address lines, bottom-left */}
      <rect x="20" y="184" width="124" height="5" rx="2.5" fill="#d8c6a3" />
      <rect x="20" y="197" width="94" height="5" rx="2.5" fill="#ddccab" />
      <rect x="20" y="210" width="70" height="5" rx="2.5" fill="#e2d3b6" />
      {/* wax seal, centered on the body */}
      <circle cx="170" cy="116" r="23" fill={color} stroke="rgba(0,0,0,0.18)" strokeWidth="2" />
      <line x1="170" y1="100" x2="170" y2="132" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="154" y1="116" x2="186" y2="116" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function EnvelopeFlap({ open }) {
  return (
    <svg
      width="340"
      height="120"
      viewBox="0 0 340 120"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 3,
        transformOrigin: '50% 0%',
        transform: open ? 'rotateX(-178deg)' : 'rotateX(0deg)',
        transition: 'transform 0.6s ease',
        backfaceVisibility: 'visible',
      }}
    >
      <polygon points="2,2 170,116 338,2" fill="#faf2e2" stroke="#c4aa85" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [active, setActive] = useState(null) // category key or null
  const [open, setOpen] = useState(false) // flap open
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const [query, setQuery] = useState('')
  const [errored, setErrored] = useState(false)

  // Shuffled order + pointer per category, kept across renders.
  const orderRef = useRef({})
  const ptrRef = useRef({})

  function nextQuery(key) {
    const order = orderRef.current
    const ptr = ptrRef.current
    if (!order[key] || ptr[key] >= order[key].length) {
      order[key] = shuffle(CATEGORIES[key].pool)
      ptr[key] = 0
    }
    const q = order[key][ptr[key]]
    ptr[key] += 1
    return q
  }

  function pickCategory(key) {
    setActive(key)
    setOpen(false)
    setLoading(false)
    setImgUrl(null)
    setErrored(false)
    setQuery('')
  }

  async function load(key) {
    const q = nextQuery(key)
    setQuery(q)
    setImgUrl(null)
    setErrored(false)
    setLoading(true)
    try {
      const url = await fetchImageUrl(key, q)
      if (!url) {
        setErrored(true)
      } else {
        setImgUrl(url)
      }
    } catch {
      setErrored(true)
    } finally {
      setLoading(false)
    }
  }

  function reveal() {
    if (!active || open || loading) return
    setOpen(true)
    load(active)
  }

  // The error link retries immediately, keeping the envelope open.
  function retry() {
    if (!active || loading) return
    load(active)
  }

  // "Next" re-seals the envelope; the next image is revealed on the following click.
  function reseal() {
    setOpen(false)
    setImgUrl(null)
    setErrored(false)
    setLoading(false)
    setQuery('')
  }

  const cat = active ? CATEGORIES[active] : null
  const pageBg = cat ? cat.lightBg : '#f7f3ee'
  const showNext = open && !loading && !errored && !!imgUrl

  return (
    <div
      style={{
        minHeight: '100%',
        boxSizing: 'border-box',
        background: pageBg,
        transition: 'background 0.5s ease',
        fontFamily: 'Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 16px 64px',
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* Title */}
      <h1
        style={{
          margin: 0,
          // Scales with viewport width so it never overflows on mobile.
          fontSize: 'clamp(22px, 7vw, 44px)',
          fontWeight: 400,
          letterSpacing: 'clamp(0.15em, 3vw, 0.5em)',
          textIndent: 'clamp(0.15em, 3vw, 0.5em)',
          color: '#3a2e22',
          textAlign: 'center',
          maxWidth: '100%',
        }}
      >
        INTUITION
      </h1>
      <div
        style={{
          width: 140,
          height: 2,
          margin: '10px 0 40px',
          background: 'linear-gradient(90deg, transparent, #c4aa85, transparent)',
        }}
      />

      {/* Category buttons */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
        {Object.entries(CATEGORIES).map(([key, c]) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => pickCategory(key)}
              style={{
                fontFamily: 'inherit',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontSize: 14,
                padding: '12px 22px',
                borderRadius: 30,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                border: `2px solid ${c.color}`,
                background: isActive ? c.color : 'transparent',
                color: isActive ? '#fff' : c.color,
                transition: 'background 0.25s ease, color 0.25s ease',
              }}
            >
              <span style={{ fontSize: 19, lineHeight: 1 }}>{c.icon}</span>
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Envelope */}
      {cat && (
        <div
          onClick={reveal}
          style={{
            position: 'relative',
            width: 340,
            height: 230,
            perspective: '1100px',
            cursor: !open && !loading ? 'pointer' : 'default',
            filter: 'drop-shadow(0 12px 22px rgba(60,46,34,0.18))',
          }}
        >
          <EnvelopeBody color={cat.color} />

          {/* revealed photo fills the interior */}
          {imgUrl && !errored && (
            <img
              src={imgUrl}
              alt={query}
              onError={() => {
                setErrored(true)
                setImgUrl(null)
              }}
              style={{
                position: 'absolute',
                inset: 8,
                width: 'calc(100% - 16px)',
                height: 'calc(100% - 16px)',
                objectFit: 'cover',
                borderRadius: 4,
                zIndex: 2,
                animation: 'fadeIn 0.5s ease',
              }}
            />
          )}

          {/* loading spinner */}
          {loading && open && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  border: '4px solid rgba(60,46,34,0.15)',
                  borderTopColor: cat.color,
                  animation: 'spin 0.8s linear infinite',
                }}
              />
            </div>
          )}

          <EnvelopeFlap open={open} />
        </div>
      )}

      {/* Controls below the envelope */}
      {cat && (
        <div style={{ marginTop: 36, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading && (
            <div style={{ fontStyle: 'italic', color: '#7a6a55', fontSize: 15 }}>
              Searching for: {query}…
            </div>
          )}

          {!loading && errored && (
            <span
              onClick={retry}
              style={{
                cursor: 'pointer',
                color: '#a8542a',
                fontStyle: 'italic',
                fontSize: 15,
                borderBottom: '1px solid #a8542a',
              }}
            >
              Couldn&apos;t load image. Try another →
            </span>
          )}

          {showNext && (
            <button
              onClick={reseal}
              style={{
                fontFamily: 'inherit',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: 13,
                padding: '10px 28px',
                background: 'transparent',
                border: '1.5px solid #3a2e22',
                color: '#3a2e22',
                borderRadius: 30,
                cursor: 'pointer',
              }}
            >
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const KEYFRAMES = `
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`
