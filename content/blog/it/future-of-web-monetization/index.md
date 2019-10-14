---
title: "Il Futuro della Monetizzazione sul Web: Web Monetization"
description: C'è un nuovo standard (proposto) per quanto riguarda la pubblicità nel web e la monetizzazione in generale. Si chiama Web Monetization, capiamo insieme di cosa si tratta.
tags: ["web monetization", "xrp", "crypto", "ilp", "futuro"]
keywords: ["web monetization", "xrp", "crypto", "ilp", "futuro"]
cover_image: https://images.unsplash.com/photo-1560152214-4e76ac668a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
date: "2019-10-12T10:00:00.000Z"
id: "it/future-of-web-monetization"
lang: "it"
---

C'è un nuovo standard (proposto) per quanto riguarda **la pubblicità nel web e la monetizzazione in generale**. Si chiama **Web Monetization**, capiamo insieme di cosa si tratta.

![La luce alla fine del tunnel](https://images.unsplash.com/photo-1560152214-4e76ac668a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
> Foto di [Wendong Yao](https://unsplash.com/@atlasyao) su [Unsplash](https://unsplash.com/)

## Cos'è la Web Monetization

La **Web Monetization** è una
> **API browser** proposta che usa i micropagamenti **ILP** (**Protocollo Interledger**, ndr) per monetizzare un sito. **Può essere fornito attraverso l'uso di polyfill o estensioni**, ma l'obiettivo è, eventualmente, di implementarlo direttamente nel browser dell'utente.

## Motivazione

> La possibilità di trasferire denato è stata una mancanza di lunga durata nelle piattaforme web. Come risultato, il web soffre di ondate di pubblicità e business model corrotti. **Web Monetization offre un modo aperto, nativo, efficiente e automatico per compensare i creatori di contenuti, pagare le chiamate alle API e per supportare infrastrutture web**.

## Come la Web Monetization può incrementare la soddisfazione degli utenti

La Web Monetization può incrementare la soddisfazione degli utenti che visitano i tuoi contenuti perché, semplicemente, non verranno più perseguitati da tutte le pubblicità ma tu continuerai a guadagnare dalle visualizzazioni.

Infatti, la Web Monetization offre agli utenti dove i soldi della loro web monetization devono andare quando navigano nel web.

## Web Monetization Wallet

Al momento della scrittura di questo articolo, i **Wallet** che accettano **pagamenti ILP** sono:

[![XRP Tipbot](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Ftipbot_logo.png?alt=media&token=8aab0f55-43fd-40c5-86bc-737b269dae4a)](https://www.xrptipbot.com/)

> XRP Tipbot

<!-- **XRP Tipbot** is a bot that lets users use the principles of web monetization platforms like Twitter, Discord and also your website. It's used also by **Coil** as we'll soon see. -->

[![GateHub](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Fgatehub_logo.png?alt=media&token=39082cb3-4d96-4971-b0c2-ed094931823f)](https://gatehub.net/)

> GateHub

[![Stronghold](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Fstronghold_logo.png?alt=media&token=da4d34a1-d874-4a6e-ae5b-ec156bd6f82e)](https://stronghold.co/)

> Stronghold

## Web Monetization Provider

[![Coil](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/future-of-web-monetization%2Fcoil.png?alt=media&token=d95f3a51-0700-430a-8c6d-fef703182a6a)](https://coil.com)

Sempre al momento di scrittura, l'unico **Provider** conosciuto è **Coil**.

**Coil**, come [**Medium**](https://medium.com), è una piattaforma dove chiunque può condividere articoli )e link che usano la Web Monetization) e offre la possibilità (facoltativa) di sottoscrivere un abbonamento mensile (dal costo di 4,99$) per vedere gli articoli disponibili solo alle persone che decidono di sottoscrivere questo abbonamento e per pagare i siti monetizzati che si decide di visualizzare. Una sorta di "abbonamento pro", insomma.

## Come posso monetizzare i miei contenuti? 💰

**Implementare la Web Monetization** è relativamente semplice, la procedura consiste solo nell'**aggiungere un tag nel codice delle pagine HTML** che si decide di monetizzare. Questo tag viene chiamato **Web Monetization Meta Tag**.

### Setup del Wallet

Per ricevere pagamenti bisogna prima aprire un Wallet come uno di quelli elencati in precedenza. Coil offre un wallet all'apertura di un nuovo account, automaticamente.

### Ricevi il tuo payment pointer

Quando hai finito con la registrazione del nuoov account, riceverai un **Payment Pointer**. Un Payment Pointer assomiglia a questo:

```$coil.xrptipbot.com/C3adA1B9Q5qMu4Z3i4Bfhw```

### Crea il tuo Meta Tag

Il **Meta Tag** che andremo ad aggiungere al nostro codice HTML dovrà essere come questo:

```html
<meta
  name="monetization"
  content="$coil.xrptipbot.com/C3adA1B9Q5qMu4Z3i4Bfhw">
```

> L'attributo `name` del tag deve essere **obbligatoriamente** `monetization`

### Aggiungi il Meta Tag creato nelle tue pagine

Per aggiungere la Web Monetization alle tue pagine web, copia il codice nella sezione `<head>` del tuo codice HTML. Il risultato finale dovrebbe essere:

```html
<!doctype html>
<html>
  <head>
    <title>Sito che usa la Web Monetization</title>
    <meta
        name="monetization"
        content="$coil.xrptipbot.com/C3adA1B9Q5qMu4Z3i4Bfhw">
  </head>
  <!-- Codice HTML della pagina -->
</html>
```

**Congratulazioni! Il tuo sito ora è monetizzato con la Web Monetization.** 😎😎😎
