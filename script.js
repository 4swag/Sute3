const CHANNELS = {
  info: {
    eyebrow: 'INFO CHANNEL',
    title: '4swag / identity stream',
    text: 'Personal console hub for CS2, underground community energy, and old-internet nostalgia done in a cleaner modern style.',
    chips: ['CS2', 'HvH', 'Underground mood', 'Late-night sessions']
  },
  music: {
    eyebrow: 'MUSIC CHANNEL',
    title: 'influences / now playing mood',
    text: 'Memphis grit, Wu-Tang aura, and early 2000s atmosphere. This is the soundtrack behind queue hours and scene nights.',
    chips: ['Three 6 influence', 'Wu-Tang energy', 'Tape-era texture', 'Dark chrome mood']
  },
  links: {
    eyebrow: 'LINKS CHANNEL',
    title: 'connect / direct routes',
    text: 'Main contact points and places where the profile is active.',
    links: [
      { label: 'Discord // refunded', href: 'https://discord.gg/refunded' },
      { label: 'Steam // 4swag', href: 'https://steamcommunity.com/id/4swag/' }
    ]
  },
  presence: {
    eyebrow: 'PRESENCE CHANNEL',
    title: 'where you can find me',
    text: 'Mostly active in Discord and Steam circles. Profile tone is scene-aware: no forced noise, only signal.',
    chips: ['Alias: 4swag', 'discord.gg/refunded', 'steamcommunity.com/id/4swag']
  },
  cheats: {
    eyebrow: 'CHEATS CHANNEL',
    title: 'what cheats',
    text: 'Current list in rotation.',
    chips: ['refunded.vip', 'Fatality', 'Hardline', 'Neverlose', 'Memesense']
  },
  favorites: {
    eyebrow: 'FAVORITES CHANNEL',
    title: 'favorites / constants',
    text: 'Visuals, phrases, and habits that stay consistent across sessions.',
    chips: ['Icy blue + gunmetal', 'Forum-era rare tags', 'Night queue windows', 'Minimal words']
  },
  scene: {
    eyebrow: 'SCENE CHANNEL',
    title: 'underground language',
    text: 'Private-lobby tone, coded references, and that old board-culture confidence without turning the page into a generic template.',
    chips: ['lowkey loud', 'ifykyk', 'legacy board feel', 'rare not loud']
  }
};

const icons = Array.from(document.querySelectorAll('.xmb-icon'));
const panelEyebrow = document.getElementById('panelEyebrow');
const panelTitle = document.getElementById('panelTitle');
const panelText = document.getElementById('panelText');
const panelMeta = document.getElementById('panelMeta');
const stamp = document.getElementById('stamp');

let activeIndex = 0;

function renderPanel(key) {
  const channel = CHANNELS[key];
  if (!channel) return;

  panelEyebrow.textContent = channel.eyebrow;
  panelTitle.textContent = channel.title;
  panelText.textContent = channel.text;
  panelMeta.innerHTML = '';

  if (channel.links) {
    channel.links.forEach((link) => {
      const anchor = document.createElement('a');
      anchor.className = 'meta-link';
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.textContent = link.label;
      panelMeta.append(anchor);
    });
  }

  if (channel.chips) {
    channel.chips.forEach((chip) => {
      const span = document.createElement('span');
      span.className = 'meta-chip';
      span.textContent = chip;
      panelMeta.append(span);
    });
  }

  document.body.dataset.theme = key;
}

function setActive(nextIndex) {
  activeIndex = (nextIndex + icons.length) % icons.length;

  icons.forEach((icon, index) => {
    const isActive = index === activeIndex;
    icon.classList.toggle('is-active', isActive);
    icon.setAttribute('aria-selected', String(isActive));

    if (isActive) {
      icon.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      renderPanel(icon.dataset.key);
    }
  });
}

function openSelectedLink() {
  const key = icons[activeIndex]?.dataset.key;
  const firstLink = CHANNELS[key]?.links?.[0];
  if (firstLink) {
    window.open(firstLink.href, '_blank', 'noopener,noreferrer');
  }
}

icons.forEach((icon, index) => {
  icon.addEventListener('mouseenter', () => setActive(index));
  icon.addEventListener('focus', () => setActive(index));
  icon.addEventListener('click', () => setActive(index));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    setActive(activeIndex + 1);
  } else if (event.key === 'ArrowLeft') {
    setActive(activeIndex - 1);
  } else if (event.key === 'Enter') {
    openSelectedLink();
  } else if (event.key === 'Escape') {
    setActive(0);
  }
});

setActive(0);
stamp.textContent = `swagbot.dev // xmb profile // ${new Date().getFullYear()}`;
