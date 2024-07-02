import { useEffect, type RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: EventListener,
): void => {
  useEffect(() => {
    const handleEvent = (event: Event): void => {
      if (event.target instanceof HTMLElement && !ref.current?.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('click', handleEvent);

    return () => {
      document.removeEventListener('click', handleEvent);
    };
  }, [handler, ref]);
}
