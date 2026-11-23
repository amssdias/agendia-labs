import { media } from './env.ts';

function initMenu(onChange: (open: boolean) => void) {
  const header = document.querySelector<HTMLElement>('[data-header]')!;
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]')!;
  const menu = header.querySelector<HTMLElement>('[data-mobile-menu]')!;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    header.dataset.menuOpen = String(open);
    onChange(open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', e => {
    if ((e.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  media.desktopNav.addEventListener('change', e => {
    if (e.matches) setOpen(false);
  });
}

/** Highlights the nav link of the section in the middle of the viewport. */
function initActiveLink() {
  const links = new Map(
    [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')].map(link => [link.dataset.navLink!, link]),
  );
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach((link, id) => {
          if (id === entry.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}

/** Sticky booking bar on phones: shown after the hero, hidden near the booking section. */
function initMobileBar(endId: string) {
  const bar = document.querySelector<HTMLElement>('[data-mobile-bar]');
  const hero = document.getElementById('hero');
  const end = document.getElementById(endId);
  if (!bar || !hero || !end) return (_menuOpen: boolean) => {};

  const state = { pastHero: false, nearEnd: false, menuOpen: false };
  const update = () => {
    const visible = media.mobile.matches && state.pastHero && !state.nearEnd && !state.menuOpen;
    bar.dataset.visible = String(visible);
    bar.inert = !visible;
  };

  new IntersectionObserver(([entry]) => {
    state.pastHero = !entry.isIntersecting;
    update();
  }).observe(hero);
  new IntersectionObserver(([entry]) => {
    state.nearEnd = entry.isIntersecting || entry.boundingClientRect.top < 0;
    update();
  }).observe(end);
  media.mobile.addEventListener('change', update);

  return (menuOpen: boolean) => {
    state.menuOpen = menuOpen;
    update();
  };
}

/** `endId` is the section near which the mobile booking bar hides. */
export function initHeader(endId: string) {
  const setMenuOpen = initMobileBar(endId);
  initActiveLink();
  initMenu(setMenuOpen);
}
