export const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function findFocusableElements(container: Element): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('aria-hidden') && !el.closest('[aria-hidden="true"]')
  );
}

export function simulateKey(
  target: Element,
  key: string,
  options: KeyboardEventInit = {}
): boolean {
  const eventInit: KeyboardEventInit = {
    key,
    code: key,
    bubbles: true,
    cancelable: true,
    ...options,
  };

  const down = new KeyboardEvent('keydown', eventInit);
  const up = new KeyboardEvent('keyup', eventInit);

  const notPrevented = target.dispatchEvent(down);
  target.dispatchEvent(up);
  return notPrevented;
}

export class FocusTracker {
  private history: HTMLElement[] = [];
  private onFocus = (e: FocusEvent) => {
    if (e.target instanceof HTMLElement) {
      this.history.push(e.target);
    }
  };

  start(): void {
    this.history = [];
    if (document.activeElement instanceof HTMLElement) {
      this.history.push(document.activeElement);
    }
    window.addEventListener('focusin', this.onFocus);
  }

  stop(): HTMLElement[] {
    window.removeEventListener('focusin', this.onFocus);
    return [...this.history];
  }

  getHistory(): HTMLElement[] {
    return [...this.history];
  }

  getCurrent(): Element | null {
    return document.activeElement;
  }
}

export function verifyFocusRestoration(
  trigger: HTMLElement,
  openAction: () => void,
  closeAction: () => void
): boolean {
  trigger.focus();
  const initialFocused = document.activeElement;

  openAction();
  closeAction();

  return document.activeElement === initialFocused;
}
