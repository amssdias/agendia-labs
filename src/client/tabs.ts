/** WAI-ARIA tabs: click or arrow keys switch the industry use case in #solutions. */
export function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach(list => {
    const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role="tab"]')];

    const select = (tab: HTMLButtonElement, focus = false) => {
      tabs.forEach(t => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')!)!.hidden = !selected;
      });
      if (focus) tab.focus();
    };

    list.addEventListener('click', e => {
      const tab = (e.target as Element).closest<HTMLButtonElement>('[role="tab"]');
      if (tab) select(tab);
    });

    list.addEventListener('keydown', e => {
      const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (index === -1) return;
      const next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(tabs[(next + tabs.length) % tabs.length], true);
    });
  });
}
