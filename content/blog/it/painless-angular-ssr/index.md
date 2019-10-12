---
title: "Rilascio indolore di Angular SSR con Nginx/Apache/Firebase & Angular CLI"
description: Quindi stai sviluppando un nuovo, fantastico sito (magari un e-commerce per quei libri sconosciuti ma che a te piacciono tanto) e hai bisogno che i tuoi futuri clienti trovino questo sito nella prima pagina di ricerca dei motori di ricerca, leggi questo articolo per sapere come fare
tags: ["angular", "ssr", "firebase", "nginx", "apache"]
keywords: ["angular", "ssr", "firebase", "nginx", "apache"]
cover_image: https://images.unsplash.com/photo-1544986581-efac024faf62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
date: "2019-08-12T10:00:00.000Z"
id: "it/painless-angular-ssr"
lang: "it"
---

Quindi stai sviluppando un nuovo, fantastico sito (magari un e-commerce per quei libri sconosciuti ma che a te piacciono tanto) e hai bisogno che i tuoi futuri clienti trovino questo sito nella prima pagina dei motori di ricerca.

![Servi bene la tua app Angular](https://images.unsplash.com/photo-1544986581-efac024faf62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
> Foto di [Alev Takil](https://unsplash.com/@alevtakil) su [Unsplash](https://unsplash.com)

Dopo una ricerca estenuante, hai finalmente deciso di usare Angular per il frontend della tua nuova applicazione perché credi sia la scelta migliore per il nuovo e-commerce che vuoi sviluppare. Ma quando, finalmente, arrivi a rilasciare in produzione l'App e provi a cercalo nei vari motori di ricerca non riesci a trovarlo anche se è già passato un po' di tempo dalla pubblicazione, cosa sta succedendo?

Google ha recentemente aggiornato il suo crawler per eseguire il pre-rendering delle **Applicazioni Single Page** scritte in **javascript**, proprio come la tua nuova App Angular, ma questa tecnologia non funziona sempre bene (e devi tener conto che non tutti usano Google per effettuare le proprie ricerche nel web).

## Angular Universal al salvataggio

Fortunamente, il team di Angular ha sviluppato un utile (dopo qualche problema tecnico) strumento che ci può aiutare, uno strumento chiamato [**Angular Universal**](https://angular.io/guide/universal).

### Settiamo alcune cose

Impostare Angular Universal è relativamente semplice, devi solo eseguire un comando nel tuo terminale:

```bash
ng add @nguniversal/express-engine --clientProject "nome dell'applicazione Angular"`
```

Questo piccolo comando crea dei file nella tua cartella `src`:

- `main.server.ts` - Inizializza l'applicazione lato server
- `app/app.server.module.ts` - App module lato serve
- `server.ts` - Web server Express
- `ts.config.server.json` - Configurazione Typescript per l'App server
- `webpack.server.config.js` - Configurazione webpack del server

### Verifica che l'App server funzioni

Per verificare che l'App Server funzioni correttamente, esegui i comandi

```bash
npm run build:ssr
npm run serve:ssr
```

Se tutto è andato a buon fine (sarebbe una vera fortuna) dovresti vedere l'applicazione funzionante all'URL `localhost:4000`, altrimenti nel prossimo paragrafo ci saranno delle dritte per correggere degli errori.

## Risolvere errori del Server

Ci sono molti errori che possono succedere quando provi a compilare un'applicazione SSR, cerchiamo di capirne i più comuni.

### Usare namespace del browser

Quando l'applicazione è in funzione nel nostro server ci sono alcuni oggetti standard che non possiamo usare, per esempio `window`, così possiamo fare alcune cose:

1. Iniettiamo un oggetto fittizio per ingannare il server e far funzionare la nostra app anche lato server, per farlo basta aggiungere queste righe prima dell'inizializzazione di `express()` nel file `server.ts`:

  ```typescript
    ...
    const domino = require('domino');
    const fs = require('fs');
    const path = require('path');
    const templateA = fs.readFileSync(path.join('dist/browser', 'index.html')).toString();
    const win = domino.createWindow(templateA);
    win.Object = Object;
    win.Math = Math;
    global['window'] = win;
    global['document'] = win.document;
    global['branch'] = null;
    global['object'] = win.object;
    const app = express();
    ...
    ```

2. Capire le parti dove stiamo usando questi oggetti ed eseguiamoli solo se stiamo usando il browser.
  In questo caso Angular ci mette a disposizione due metodi: `isPlatformBrowser` e `isPlatformServer`, entrambi esposti da `@angular/common`.
  Di seguito un piccolo esempio:

  ```typescript
  import { Component, Inject, PLATFORM_ID } from '@angular/core';
  import { isPlatformBrowser } from '@angular/common';

  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  })
  export class AppComponent {
    constructor(@Inject(PLATFORM_ID) private platformId: any) {}

    onActivate(event: any) {
      if (isPlatformBrowser(this.platformId)) {
          const scrollToTop = window.setInterval(() => {
          const pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 50);
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 16);
      }
    }
  }
  ```

  Questa porzione di codice esegue la funzione `scrollTop` solo se il codice viene eseguito nel `browser`.

## E alla fine arriva il rilascio in produzione

La parte migliore è arrivata, la parte in cui ti guiderò nella configurazione dei vari server, non è bellissimo?

### Configurazione Apache

Se stai usando **Apache** come webserver devi creare o modificare il tuo file `.htaccess`:

```htaccess
<IfModule mod_rewrite.c>
 RewriteEngine On
 # If an existing asset or directory is requested go to it as it is
 RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
 RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
 RewriteRule ^ - [L]

 RewriteRule ^ /dist/browser/index.html
</IfModule>
<VirtualHost *:80>
 ServerName example.com # <-- modify here
 ServerAlias www.example.com # <-- modiy here
 <Proxy *>
  Order allow,deny
  Allow from all
 </Proxy>
 ProxyPreserveHost On
 ProxyRequests Off
 ProxyPass / http://localhost:4000/
 ProxyPassReverse / http://localhost:4000/
</VirtualHost>

<VirtualHost *:443>
 ServerName example.com # <-- modify here
 ServerAlias www.example.com # <-- modify here
 <Proxy *>
  Order allow,deny
  Allow from all
 </Proxy>
 ProxyPreserveHost On
 ProxyRequests Off
 ProxyPass / https://localhost:4000/
 ProxyPassReverse / https://localhost:4000/
</VirtualHost>
```

### Configurazione Nginx

Nel caso tu stia usando nginx, invece, dovrai creare la configurazione nel file in `/etc/nginx/sites-available/www.example.com` (dove `www.example.com` è il nome del tuo sito):

```nginx
upstream your_upstream_config {
 server 127.0.0.1:4000;
}

server {
 listen 443 ssl http2;
 server_name www.example.com; # <--- modify here
 root /home/"your user"/path/to/dist/browser;
 location / {
  try_files $uri $uri @backend;
 }

 location @backend {
  proxy_pass http://your_upstream_config;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $http_host;
  proxy_http_version 1.1;
  proxy_set_header X-NginX-Proxy true;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_cache_bypass $http_upgrade;
  proxy_redirect off;
  proxy_set_header X-Forwarded-Proto $scheme;
 }
}

server {
 listen 80;
 server_name www.example.com # <-- modify here
 return 301 https://$server_name$request_uri?;
}
```

## Bonus - Configurazione Firebase/Google Cloud

Se stai usando **Firebase Hosting** ci sono alcune cose che devi prima modificare e ci sono due modi per fare quello che hai appena imparato a fare con Apache o Nginx: Google Cloud AppEnngine o Cloud Functions.

### Aggiungi i polyfills al progetto Firebase

Firebase usa i WebSocket e XHR, che non sono inclusi con Angular e che dobbiamo inserire come polyfill. Per questo eseguiamo nel terminale:

```bash
npm install ws xhr2 bufferutil utf-8-vakudate -D
```

e aggiungiamo le seguenti righe al file `server.ts`:

```typescript
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');
...
```

### Rilascio tramite AppEngine

Aggiungi un file `app.yaml` nella cartella root del tuo progetto con questa riga:

```yaml
runtime: nodejs10
```

Poi, dopo aver installato la CLI di Google Cloud, esegui nel terminale:

`gcloud app deploy`

Dobbiamo anche modificare lo script `start` all'interno del nostro `package.json`:

```json
// ...
"scripts": {
  "start": "npm run serve:ssr",
  // ...
},
// ...
```

E questo è tutto, dovresti vedere la tua app Server in esecuzione su Google Cloud! 👌

### Rilascio con Cloud Funcionts

Per rilasciare usando le Cloud Functions di Firebase dobbiamo prima modificare alcuni file

Per inizializzare Firebase nel progetto esegui

`firebase init`

e seleziona `hosting` e `functions`.

Poi modifica il tuo file `functions/package.json`

```json
{
  "hosting": {
    // ...
    "rewrites": [
      { "source": "**", "function": "ssr" }
    ]
  },
    // ...
}
```

Esporta la costante `app` e rimuovi il listener dal file `server.ts`

```typescript
export const app = express();

// Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// })
```

Aggiorna il file `webpack.server.config.js`:

```javascript
output: {
  // Puts the output at the root of the dist folder
  path: path.join(__dirname, 'dist'),
  library: 'app',
  libraryTarget: 'umd',
  filename: '[name].js',
},
```

Assicurati di effettuare la compilazione di nuovo con il comando `npm run build:ssr`.

Poi ci muoviamo nella cartella `functions` per installare `fs-extra`

```bash
cd functions
npm install fs-extra --save
```

La Function di Firebase deve poter accedere alla nosta app compilata, quindi creiamo un piccolo script node, chiamato `cp-angular.js` che copia la nostra app nella cartella `functions`:

```javascript
const fs = require('fs-extra');

(async() => {

    const src = '../dist';
    const copy = './dist';

    await fs.remove(copy);
    await fs.copy(src, copy);

})();
```

Poi, nel tuo file `functions/package.json` aggiungi uno script `build`:

```json
{
  "name": "functions",
  "engines": {
    "node": "10"
  },
  "scripts": {
    "build": "node cp-angular && tsc"
  }
}
```

Poi possiamo finalmente creare la nostra funzione, quindi modifichiamo il nostro file `functions/index.ts` che assomiglierà a qualcosa del genere:

```javascript
import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/server`).app;

export const ssr = functions.https.onRequest(universal);
```

Per verificare che tutto funzioni correttamente esegui i sequenti comandi:

```bash
cd functions
npm run build
firebase serve
```

E se tutto sembra a posto esegui il rilascio:

```bash
firebase deploy
```

## Fatto! 😎

Questo è tutto, adesso sei un maestro di Angular Universal!
