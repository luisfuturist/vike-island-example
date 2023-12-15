declare global {
  namespace Vike {
    interface PageContext {
      Page: Page;
      pageProps?: PageProps;
      urlPathname: string;
      exports: {
        documentProps?: {
          title?: string;
          description?: string;
        };
      };
    }
  }
}

export type Page = (pageProps: PageProps) => React.ReactElement;
export type PageProps = Record<string, unknown>;
