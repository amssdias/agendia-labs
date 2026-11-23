import '../styles/main.css';
import { SECTIONS } from '../content/catalog.ts';
import { initContact } from './contact.ts';
import { readMessages } from './env.ts';
import { initHeader } from './header.ts';
import { initReveal } from './reveal.ts';
import { initTabs } from './tabs.ts';

initHeader(SECTIONS.booking);
initTabs();
initContact(readMessages());
initReveal();
