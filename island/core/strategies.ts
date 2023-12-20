export function listenMediaOnce(query: string, fn: () => void) {
  const mediaQuery = window.matchMedia(query);

  const queryHandler = (event: MediaQueryList | MediaQueryListEvent) => {
    if (event.matches) {
      fn();
    }
  };

  queryHandler(mediaQuery);

  mediaQuery.addEventListener("change", queryHandler, { once: true });
}

export function observeOnce(element: Element, fn: () => void) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback: IntersectionObserverCallback = async (entries) => {
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(element);

      await fn();
    });
  };

  const observer = new IntersectionObserver(callback, options);

  if (element) {
    observer.observe(element);
  }
}

export function idle(fn: () => void) {
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(fn);
  } else {
    setTimeout(fn, 200);
  }
}
