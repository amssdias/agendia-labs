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

/** Sticky "book a call" bar on phones: shown after the hero, hidden near the contact section. */
function initMobileBar() {
  const bar = document.querySelector<HTMLElement>('[data-mobile-bar]');
  const hero = document.getElementById('hero');
  const contact = document.getElementById('contact');
  if (!bar || !hero || !contact) return (_menuOpen: boolean) => {};

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
  }).observe(contact);
  media.mobile.addEventListener('change', update);

  return (menuOpen: boolean) => {
    state.menuOpen = menuOpen;
    update();
  };
}

export function initHeader() {
  const setMenuOpen = initMobileBar();
  initActiveLink();
  initMenu(setMenuOpen);
}
