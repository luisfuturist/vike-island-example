// https://vike.dev/onRenderHtml
export { onRenderHtml }

import { dangerouslySkipEscape, escapeInject } from 'vike/server'
import type { OnRenderHtmlAsync } from 'vike/types'
import renderIslandsToString from "../island/core/renderIslandsToString"
import agnosticRenderPageToString from './agnosticRenderPageToString'
import factories from './factories'
import logoUrl from './logo.svg'

// This onRenderHtml() hook only supports SSR, see https://vike.dev/render-modes for how to modify
// onRenderHtml() to support SPA

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  if (!factories) throw new Error('My render() hook expects pageContext.factories to be defined');

  let pageHtml = await agnosticRenderPageToString(pageContext);
  pageHtml = await renderIslandsToString(pageHtml, factories);

  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + Vike'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    }
  }
}