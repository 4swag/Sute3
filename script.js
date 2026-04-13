const MODULES = {
  info: {
    label: 'INFO MODULE',
    title: '4swag / personal signal',
    copy: 'CS2-focused identity with an old-web heartbeat. Clean pressure, quiet confidence, and a dashboard built like a late-night lobby with purpose.',
    chips: ['CS2', 'HvH mindset', 'Underground web', 'Forum-era nostalgia']
  },
  links: {
    label: 'LINKS MODULE',
    title: 'tap in / direct channels',
    copy: 'Primary spots to find me and the community. Fast access, no clutter.',
    links: [
      { text: 'Discord // refunded', href: 'https://discord.gg/refunded' },
      { text: 'Steam // 4swag', href: 'https://steamcommunity.com/id/4swag/' }
    ]
  },
  music: {
    label: 'MUSIC MODULE',
    title: 'rotation / 90s–00s energy',
    copy: 'Memphis darkness, Wu-Tang focus, chrome-at-midnight mood. Soundtrack for queue hours and afterglow sessions.',
    chips: ['Memphis rap influence', 'Wu-Tang atmosphere', 'Tape grit', 'Night-drive loops']
  },
  presence: {
    label: 'PRESENCE MODULE',
    title: 'scene presence / active nodes',
    copy: 'Known in the CS2 underground lanes. You will usually find me in Discord, Steam, or in private lobbies where everyone already knows the meta.',
    chips: ['discord.gg/refunded', 'steamcommunity.com/id/4swag', 'Alias: 4swag']
  },
  favorites: {
    label: 'FAVORITES MODULE',
    title: 'favorites / constants',
    copy: 'What stays on repeat: sharp visuals, steel palettes, minimal words, hard beats, and settings tuned for composure.',
    chips: ['CS2', 'Gunmetal / icy blue', 'Late sessions', 'Rare-tag language']
  },
  underground: {
    label: 'SCENE MODULE',
    title: 'underground / coded language',
    copy: 'No loud lists. Just scene-aware tone, clean movement, and that familiar "you know if you know" atmosphere from older internet circles.',
    chips: ['lowkey loud', 'signal not noise', 'private lobby energy', 'legacy board feel']
  }
};

const tiles = Array.from(document.querySelectorAll('.tile'));
const detailLabel = document.getElementById('detailLabel');
const detailTitle = document.getElementById('detailTitle');
const detailCopy = document.getElementById('detailCopy');
const detailItems = document.getElementById('detailItems');
const footerStamp = document.getElementById('footerStamp');

let activeIndex = 0;

function renderDetails(key) {
  const module = MODULES[key];
  if (!module) return;

  detailLabel.textContent = module.label;
  detailTitle.textContent = module.title;
  detailCopy.textContent = module.copy;
  detailItems.innerHTML = '';

  if (module.links) {
    module.links.forEach((item) => {
      const a = document.createElement('a');
      a.className = 'detail-link';
      a.href = item.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = item.text;
      detailItems.appendChild(a);
    });
  }

  if (module.chips) {
    module.chips.forEach((chip) => {
      const span = document.createElement('span');
      span.className = 'detail-chip';
      span.textContent = chip;
      detailItems.appendChild(span);
    });
  }

  document.body.dataset.theme = key;
}

function setActive(index) {
  activeIndex = (index + tiles.length) % tiles.length;

  tiles.forEach((tile, i) => {
    const isActive = i === activeIndex;
    tile.classList.toggle('is-active', isActive);
    tile.setAttribute('aria-selected', String(isActive));
    if (isActive) {
      tile.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      renderDetails(tile.dataset.key);
    }
  });
}

function openPrimaryLink() {
  const activeTile = tiles[activeIndex];
  const key = activeTile?.dataset.key;
  const firstLink = MODULES[key]?.links?.[0];
  if (firstLink) {
    window.open(firstLink.href, '_blank', 'noopener,noreferrer');
  }
}

tiles.forEach((tile, index) => {
  tile.addEventListener('mouseenter', () => setActive(index));
  tile.addEventListener('focus', () => setActive(index));
  tile.addEventListener('click', () => setActive(index));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    setActive(activeIndex + 1);
  } else if (event.key === 'ArrowLeft') {
    setActive(activeIndex - 1);
  } else if (event.key === 'Enter') {
    openPrimaryLink();
  } else if (event.key === 'Escape') {
    setActive(0);
  }
});

setActive(0);
footerStamp.textContent = `swagbot.dev // custom dashboard // ${new Date().getFullYear()}`;
