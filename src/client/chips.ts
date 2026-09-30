export interface Chips {
  /** Label of the selected manual task, used to prefill the contact form. */
  activeLabel(): string;
}

/** Task picker in #automate. Service cards can preselect a task through `data-select-chip`. */
export function initChips(): Chips {
  const group = document.querySelector<HTMLElement>('[data-chips]');
  const chips = group ? [...group.querySelectorAll<HTMLButtonElement>('[data-chip]')] : [];

  const select = (key: string) => {
    chips.forEach(chip => {
      const active = chip.dataset.chip === key;
      chip.setAttribute('aria-pressed', String(active));
      document.getElementById(chip.getAttribute('aria-controls')!)!.hidden = !active;
    });
  };

  group?.addEventListener('click', e => {
    const chip = (e.target as Element).closest<HTMLButtonElement>('[data-chip]');
    if (chip) select(chip.dataset.chip!);
  });

  document.querySelectorAll<HTMLElement>('[data-select-chip]').forEach(link => {
    link.addEventListener('click', () => select(link.dataset.selectChip!));
  });

  return {
    activeLabel: () => {
      const active = chips.find(chip => chip.getAttribute('aria-pressed') === 'true');
      return active?.querySelector('[data-chip-label]')?.textContent ?? '';
    },
  };
}
