---
title: Polyfill condizionali in Angular v7
description: Come abilitare il caricamento condizionale dei Polyfill in un progetto Angular v7
tags: ['angular', 'performance', 'cli', 'codice', 'guida']
keywords: ['angular', 'polyfills condizionali', 'performance', 'cli', 'codice', 'guida']
cover_image: https://images.unsplash.com/photo-1511715282680-fbf93a50e721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
date: "2019-05-18T09:27:10.759Z"
id: "it/conditional-polyfills"
lang: "it"
---

Se hai un progetto Angular v7 e non hai l'occasione di fare l'upgrade a quella che sarà l'ottava versione o vuoi semplicemente testare una delle piccole funzionalità che saranno molto utili quando la nuova versione verrà rilasciata, qui troverai una semplice guida su come fare.

![Danza delle anime](https://images.unsplash.com/photo-1511715282680-fbf93a50e721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
> Foto di [Ahmad Odeh](https://unsplash.com/photos/JhqhGfX_Wd8) su [Unsplash](https://unsplash.com)

## Il trucco

Nello sviluppo di Angular, usiamo **Typescript** con un sacco di feature **Javascript** moderne. Di queste, però, non tutte sono compatibili con i browser degli utenti indi per cui quando generiamo la distribuzione di un'app Angular usando il comando `ng build` viene caricato anche un file chiamato `polyfills.js`

Negli ultimi anni, i browser hanno iniziato a implementare molte di queste nuove funzionalità. La probabilità che ad un utente che sta navigando con l'ultima versione di Chrome, ad esempio, non serviranno a nulla i polyfill ES2015 contenuti nel file detto prima. Il loro browser li supporta già nativamente. Questo rende la maggior parte dei contenuti del file `polyfills.js` obsoleti e non più necessari.

Per questo, iniziando dalla versione della Angular CLI 7.3.0, è stato introdotto il caricamento condizionale dei polyfill! Quindi, già nel normale processo di **build**, la CLI creerà due bundle di polyfill: `polyfills.js` e `es2015-polyfills.js`. Il primo include solo i polyfill richiesti dai browser più aggiornati, e che quindi supportano ES2015 nativamente. Mentre, il secondo file contiene tutti i polyfills inclusi nel file precendente con l'aggiunta di quelli che servono ai browser più datati (funzionalità come Map, Set, ecc.).

Alla fine della `build` il tuo file `index.html` dovrebbe assomigliare a questo:

```html
<body>
  <app-root></app-root>
  <script type="text/javascript" src="runtime.***.js"></script>
  <script type="text/javascript" src="es2015-polyfills.***.js" nomodule></script>
  <script type="text/javascript" src="polyfills.***.js"></script>
  <script type="text/javascript" src="main.***.js"></script>
</body>
```

Nello snippet riportato sopra, puoi vedere che la CLI di Angular ha aggiunto l'attributo `nomodule` al tag del polyfill ES2015. Questo attributo permette di far capire ai browser di scaricare ed eseguire lo script solo se il browser non riconosce l'[API del module script web](https://html.spec.whatwg.org/multipage/webappapis.html#module-script), questo significa che il browser è vecchio. 👌

## E se i miei utenti non usano browser datati? 🤯

Potresti chiederti: e se i miei utenti non usano browser datati? è una domanda legittima, perché dovresti aspettare che la CLI faccia la build anche dei polyfill datati che non verranno mai usati? Se stai pensando davvero a questo, sei uno sviluppatore felice! 😁
Se vuoi ignorare i vecchi polyfill completamente, puoi farlo usando il comando:

`ng build --es5BrowserSupport=false`

Settando l'opzione `--es5BrowserSupport` a `false`, la CLI di Angular produrrà solo il file `polyfills.js` che contiene solo le funzionalità più recenti, ma la tua app non funzionerà più molto bene sui browser più vecchi.

Se non vuoi settare la nuova opzione tutte le volte che usi il comando `build`, puoi modificare direttamente il file `angular.json`:

```json
"projects": {
    "project-name": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "es5BrowserSupport": false,
```

Questo piccolo trucchetto ti permetterà di evitare l'esecuzione di circa 60Kb di Javascript 😎
