---
title: "Come sviluppare il tuo primo Plugin per GatsbyJS"
description: There's a new (proposed) web standard about advertising on the web. It's called Web Monetization, let's see what's all about.
tags: ["gatsbyjs", "plugin", "web monetization", "guida", "code"]
keywords: ["gatsbyjs", "plugin", "web monetization", "guida", "code"]
cover_image: https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80
date: "2019-10-14T10:00:00.000Z"
id: "it/create-gatsby-plugin"
lang: "it"
---

Nell'[ultimo articolo](https://blog.daudr.me/future-of-web-moentizetion), ho introddotto il nuovo standard per la **Web Monetization**. In questo articolo andreamo a vedere com'è facile creare un **Plugin per GatsbyJS** che aggiunge il **Web Monetization Meta Tag** all'interno delle pagine della nostra applicazione, utilizzando le **API SSR** fornite da Gatsby.

![Aggiungi un pezzo al puzzle](https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80)

> Foto di [Hans-Peter Gauster](https://unsplash.com/@sloppyperfectionist) su [Unsplash](https://unsplash.com)

## Creiamo i file per il plugin

Possiamo leggere dalla [documentazione ufficiale](https://www.gatsbyjs.org/docs/creating-plugins/) che il progetto del plugin deve avere alcuni file:

- `package.json` - **obbligatorio** può anche essere un oggetto vuoto (`{}`) per i plugin locali.
  Inoltre, il tuo file `package.json` dovrebbe avere le seguenti proprietà valorizzate:
  - `name` è utilizzato per identificare il plugin quando modifica la struttura dati del GraphQL di Gatsby
    se il campo `name` non è settato, verrà usato il nome della cartella
  - `main` è il [nome del file che verrà caricato quando il tuo pacchetto viene richiesto da un'altra applicazione](https://docs.npmjs.com/creating-node-js-modules#create-the-file-that-will-be-loaded-when-your-module-is-required-by-another-application)  
    se il campo `main` non è settato, verrà usato un nome `index.js` di default  
    se il campo `main` non è settato, è consigliato creare un file `index.js` vuoto, con il solo contenuto `// no-op` (abbreviazione di no-operation, nessuna operazione), così come si può vedere in [questo plugin d'esempio](https://github.com/gatsbyjs/gatsby/tree/817a6c14543c73ea8f56c9f93d401b03adb44e9d/packages/gatsby-source-wikipedia)
  - `version` viene usato per gestire la cache - se il campo cambia, la cache viene cancellata  
    se il campo `version` non è settata, verrà usato un hash MD5 del contenuto dei file `gatsby-*` per invalidare la cache  
    omettere il campo `version` è raccomandato per i plugin locali
  - `keywords` viene usato per far sì che il plugin venga trovato  
    i plugin pubblicati nel registro NPM dovrebbero avere `gatsby` e `gatsby-plugin` all'interno del campo `keywords` per essere aggiunti alla [libreria dei Plugin di Gatsby](https://www.gatsbyjs.org/packages/)
- `gatsby-browser.js` — Il suo utilizzo specifico viene spiegato nel [`browser API reference`](https://www.gatsbyjs.org/docs/browser-apis/)
- `gatsby-node.js` — Il suo utilizzo specifico viene spiegato nel [`Node API reference`](https://www.gatsbyjs.org/docs/node-apis/)
- `gatsby-ssr.js` — Il suo utilizzo specifico viene spiegato nel [`SSR API reference`](https://www.gatsbyjs.org/docs/ssr-apis/)

Per lo scopo di questo plugin useremo solo le API SSR, quindi andremo a creare solo il file `gatsby-ssr.js`.

## Usare le API SSR

Come già detto, in questo articolo creeremo un plugin che usa solo le API SSR, che nello specifico sono:

- [`onPreRenderHTML`](https://www.gatsbyjs.org/docs/ssr-apis/#onPreRenderHTML)
- [`onRenderBody`](https://www.gatsbyjs.org/docs/ssr-apis/#onRenderBody)
- [`replaceRenderer`](https://www.gatsbyjs.org/docs/ssr-apis/#replaceRenderer)
- [`wrapPageElement`](https://www.gatsbyjs.org/docs/ssr-apis/#wrapPageElement)
- [`wrapRootElement`](https://www.gatsbyjs.org/docs/ssr-apis/#wrapRootElement)

Nel nostro plugin useremo solo il `onPrerenderHTML` per aggiungere il nostro **Web Monetization Meta Tag** nell'`<head>` delle nostre pagine HTML.
Questa API, a sua volta, ci fornisce un Oggetto contenente alcune funzioni e una stringa che possiamo usare per raggiungere il nostro scopo.

- `getHeadComponents` - Ritorna l'array `headComponents`, che contiene oggetti di tipo `ReactNode`
- `replaceHeadComponents` - Accetta un array di `ReactNode` come primo argomento, che andrà a sovrascrivere l'array `headComponents` che verrà passato al componente `html.js`
- `pathname` - è il path della pagina corrente, cioè l'`URL` dove poi potremo vedere la nostra pagina nel browser.

Puoi leggere di queste e di tutte le altre funzioni nella [documentazione ufficiale](https://www.gatsbyjs.org/docs/ssr-apis/)

## Creiamo il nostro file SSR

Il risultato finale del nostro file `gatsby-ssr.js` dovrebbe essre simile a questo:

```javascript
const React = require("react");

export const onPreRenderHTML = (
  { reporter, getHeadComponents, replaceHeadComponents, pathname },
  pluginOptions
) => {
  if (process.env.NODE_ENV !== `production`) {
    reporter.warn("non production environment");
    return null;
  }

  if (!pluginOptions.paymentPointer) {
    reporter.warn(
      `Payment Pointer is not defined, add it to your gatsby-config.js file.`
    );
    return null;
  }

  if (pluginOptions.excludedPaths && pluginOptions.excludedPaths.length > 0) {
    const excludedPaths = pluginOptions.excludedPaths;
    let isExcluded = excludedPaths.filter(path => pathname.match(path)).length > 0;
  
    if (isExcluded) {
      return null;
    }
  }

  const headComponents = getHeadComponents();

  const webMonetizationTag = (
    <meta name="monetization" content={pluginOptions.paymentPointer} />
  );

  headComponents.push(webMonetizationTag);

  replaceHeadComponents(headComponents);
};
```

Nella pratica, questo plugin aggiunge il **Web Monetization Meta Tag** solo quando ci troviamo in un ambiente di produzione (eseguendo `gatsby build`, per esempio) e accetta un array di stringhe, nella configurazione, che rappresentano le pagine a cui non vogliamo aggiungere il nostro tag.

## Usa il plugin nel tuo progetto Gatsby

Per usare il tuo nuovo plugin devi prima installarlo tramite `npm`:

```bash
npm i gatsby-plugin-web-monetization
```

Poi devi aggiungerlo nel tuo file `gatsby-config.js`, così come già fai per tutti gli altri plugin.

Questo plugin, in particolare, accetta la seguente configurazione:

```javascript
module.exports = {
  // Other content ...
  plugins: [
    // Other plugins ...
    {
      resolve: `gatsby-plugin-web-monetization`,
      options: {
        paymentPointer: `IL_TUO_PAYMENT_POINTER`,
        excludedPaths: ['exclude', 'path'] // Optional
      }
    }
  ]
};
```

## Pubblica il tuo nuovo plugin su NPM

Per poter pubblicare il tuo plugin su `NPM` e renderlo utilizzabile da tutti, dovresti prima accertarti di aver aggiunto tutti i campi di cui abbiamo parlato sopra nel file `package.json` e poi puoi eseguire il comando `npm publish` dalla root del tuo progetto (dopo aver esguito l'accesso, ovviamente), e il comando farà tutto per te.

## Questo è tutto 😎😎😎

Congratulazioni! Hai creato il tuo primo plugin per Gatsby e l'hai pubblicato su NPM!

Il plugin può essere visto nella sua interezza anche su [GitHub](https://github.com/Daudr/gatsby-plugin-web-monetization), (ricordati di lasciare una ⭐ se lo trovi utile). 😻
