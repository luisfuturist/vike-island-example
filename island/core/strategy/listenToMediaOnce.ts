export function listenMediaOnce(query: string, fn: () => void) {
  const mediaQuery = window.matchMedia(query);

  const queryHandler = (event: MediaQueryList | MediaQueryListEvent) => {
    if (event.matches) {
      mediaQuery.removeEventListener("change", queryHandler);
      fn();
    }
  };

  queryHandler(mediaQuery);

  mediaQuery.addEventListener("change", queryHandler);
}
