import { prefersReducedMotion, type ClientStrings } from './env.ts';

const TICK_MS = 1200;
// Ticks the finished state stays on screen before the animation restarts.
const HOLD_TICKS = 4;

type NodeState = 'done' | 'active' | 'pending';

/** Hero "new lead to meeting" animation. The server renders the finished state; this replays it. */
export function initFlow(m: ClientStrings) {
  const root = document.querySelector<HTMLElement>('[data-flow]');
  if (!root || prefersReducedMotion()) return;

  const nodes = [...root.querySelectorAll<HTMLElement>('[data-flow-node]')];
  const status = root.querySelector<HTMLElement>('.flow__status')!;
  const statusLabel = root.querySelector<HTMLElement>('[data-flow-status]')!;
  const nodeLabel: Record<NodeState, string> = { done: m.flow.done, active: m.flow.running, pending: m.flow.waiting };
  const cycle = nodes.length + HOLD_TICKS;

  let tick = 0;
  let timer: number | undefined;

  const render = () => {
    const step = Math.min(tick, nodes.length);
    nodes.forEach((node, i) => {
      const state: NodeState = i < step ? 'done' : i === step ? 'active' : 'pending';
      node.dataset.state = state;
      node.querySelector('[data-flow-node-status]')!.textContent = nodeLabel[state];
    });
    const finished = step >= nodes.length;
    status.dataset.state = finished ? 'done' : 'running';
    statusLabel.textContent = finished ? m.flow.statusCompleted : m.flow.statusRunning;
  };

  const start = () => {
    timer ??= window.setInterval(() => {
      tick = (tick + 1) % cycle;
      render();
    }, TICK_MS);
  };
  const stop = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  render();
  // Only animate while the hero is on screen.
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(root);
}
