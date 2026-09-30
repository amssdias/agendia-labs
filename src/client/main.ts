import '../styles/main.css';
import { initChips } from './chips.ts';
import { initContact } from './contact.ts';
import { readMessages } from './env.ts';
import { initFlow } from './flow.ts';
import { initHeader } from './header.ts';
import { initReveal } from './reveal.ts';
import { initRoi } from './roi.ts';
import { initTabs } from './tabs.ts';

const messages = readMessages();

initHeader();
initFlow(messages);
initTabs();
initRoi(messages);
initContact(messages, initChips());
initReveal();
