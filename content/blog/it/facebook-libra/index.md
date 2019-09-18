---
title: "La nuova cryptomoneta di Facebook: Libra"
description: Facebook rilascerà la sua nuova cryptomoneta nella prima metà del 2020. Ma cos'è Libra?
tags: ['facebook', 'libra', 'blockchain', 'stablecoin', 'cryptocurrency']
keywords: ['facebook', 'libra', 'blockchain', 'stablecoin', 'cryptocurrency']
cover_image: https://images.unsplash.com/photo-1555020368-9e1b4cf78a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=1136&q=80
date: "2019-06-19T09:27:10.759Z"
id: "it/facebook-libra"
lang: "it"
---

Recentemente, **Mark Zuckerberg** ha annunciato la nuova cryptomoneta di **Facebook**, chiamata **Libra**. Vediamo insieme cos'è.

![A cosa stai pensando?](https://images.unsplash.com/photo-1555020368-9e1b4cf78a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=1136&q=80)
> Foto di [Joshua Hoehne](https://unsplash.com/photos/Uo2ZXh4XOLY) su [Unsplash](https://unsplash.com)

## Libra, la nuova cryptomoneta di Facebook

La missione di Libra è semplice e chiara:
> Una semplice moneta globale e un'infrastruttura finanziaria che rafforzi miliardi di persone.

Libra è una **stablecoin**, questo significa, a differenza del **Bitcoin**, non ha volatilità ma il suo valore è mantenuto stabile mediante una riserva di asset reali.
Con Libra, Facebook creerà anche una nuova associazione, la **Libra Association**, con lo scopo di regolare la crescita della stessa Libra. Questi sono i 27 membri fondatori:

> Pagamenti: **Mastercard**, **PayPal**, **PayU (Naspers' fintech arm)**, **Stripe**, **Visa**  
> Tecnologia e negozi: **Booking Holdings**, **eBay**, **Facebook/Calibra**, **Farfetch**, **Lyft**, **MercadoPago**, **Spotify AB**, **Uber Technologies, Inc.**  
> Telecomunicazioni: **Iliad**, **Vodafone Group**  
> Blockchain: **Anchorage**, **Bison Trails**, **Coinbase, Inc.**, **Xapo Holdings Limited**  
> Capitale di rischio: **Andreessen Horowitz**, **Breakthrough Initiatives**, **Ribbit Capital**, **Thrive Capital**, **Union Square Ventures**  
> Organizzazione senza scopo di lucro e istituzioni accademiche: **Creative Destruction Lab**, **Kiva**, **Mercy Corps**, **Women's World Banking**  

Facebook proverà a estendere questa lista fino ad un totale di 100 membri prima del rilascio ufficiale, pianificato per la prima metà del 2020.

## Come iniziare con il network di Libra

Il network di Libra è basato su **smart contracts**, come **Ethereum** e usano la metodologia **proof of stake** chiamata **Byzantine Fault Tolerant** (BFT), la stessa che [usa](https://docs.neo.org/it-it/node/whitepaper.html) **NEO**.
Ho scritto anche un [articolo](https://blog.daudr.me/it/libra-simple-smart-contract) con una piccola guida per sviluppare una testnet in locale sul tuo computer e a familiarizzare con il network di Libra.

## Il linguaggio di programmazione Move

Insieme a Libra, Facebook rilascerà anche un nuovo linguaggio di programmazione: **Move**.
> Questo linguaggio di programmazione permetterà agli sviluppatori di implementare smart contracts personalizzati per questo nuovo ecosistema.
> Ci sono due importanti parti fondamentali che appariranno in quasi tutti gli script transazionali: i tipi di risorsa **LibraAccount.T** e **LibraCoin.T**. **LibraAccount** è il nome del modulo, mentre **T** è il nome della risorsa dichiarata da quel modulo. Questa è una classica naming convention in Move; la risorsa principale dichiarata da un modulo è tipicamente chiamata **T**.

Riporto un esempio preso dal [sito di Move](https://developers.libra.org/docs/move-overview#writing-transaction-scripts):

```javascript
// Semplice esempio di un pagamento peer-to-peer

// Usa il modulo LibraAccount pubblicato nella blockchain all'indirizzo dell'utente
// 0x0...0 (con 64 zeri). 0x0 è un'abbreviazione a cui l'IR si riferisce
// 256 bits (64 cifre) aggiungendo gli zeri meno significativi
import 0x0.LibraAccount;
import 0x0.LibraCoin;
main(payee: address, amount: u64) {
  /*
    Il bytecode (e di conseguenza l'IR) hanno tipi locali. Lo scope di
    ogni locale è l'intera procedura. Tutte le dichiarazioni delle variabili locali devono
    trovarsi all'inizio della procedura. Dichiarazioni e inizializzazioni delle
    variabili sono operzioni separate, ma il verificatore del bytecode impedirà
    tutti i tentativi di usare una variabile non inizializzata.
  */

  let coin: R#LibraCoin.T;
  /*
    La parte R# sopra è una delle due annotazioni disponibili: R# e V#
    (abbreviazioni per "Resource" e "unrestricted Value"). Queste annotazioni
    devono essere uguali al tipo dichiarato (per esempio, il modulo LibraCoin
    dichiara `resource T` o `struct T`?).
  */

  /*
    Acquisci una risora LibraCoin.T con un valore `amount` dall'account
    pagante. Questo fallirà se l'account ha meno Libra del valore richiesto.
  */
  coin = LibraAccount.withdraw_from_sender(move(amount));
  /*
    Sposta la risorsa LibraCoin.T nell'account `payee`. Se l'indirizzo `payee`
    non esiste, questo step fallirà.
  */
  LibraAccount.deposit(move(payee), move(coin));

  /*
    Ogni transazione deve finire con un `return`. Il compilatore non aggiungerà niente di strano, com `return` mancanti, ad esempio.
  */

  return;
}
```

## La Libra Association

La Libra Association avrà la sua sede a Ginevra, in Svizzera (considerata dai membri fondatori uno stato neutrale, ideale per questa nuova moneta "neutrale").

> La Libra Association è un'organizzazione svizzera senza scopo di lucro ed indipendente con la missione di dare forza a miliardi di persone tramite la creazione di una semplice moneta globale e un'infrastruttura finanziaria. L'Associazione è formata da nodi di validazione del network di Libra. Inizialmente, questi saranno: compagnie globali, enti ad impatto sociale e istituzioni accademiche - i membri fondatori dell'Associazione. Eventualmente, l'Associzione includerà tutti gli enti che operano come un nodo di validazione e possiedono abbastanza quote di Libra.

## Calibra: il portafoglio per Libra

Facebook creerà anche un portafoglio per Libra, chiamato **Calibra**.

![Calibra](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/calibra.png?alt=media&token=80651125-e8f8-4d22-95d7-c36e99f5d986)

Calibra è
> una sussidiaria di Facebook che ha lo scopo di offrire servizi finanziari che aiuteranno le persone ad accedere e a partecipare al network di Libra.

Calibra è ancora alle prime fasi di sviluppo, il suo rilascio è pianificato per il 2020, per questo l'esperienza d'uso potrebbe cambiare significativamente da qui al rilascio, ma come possiamo leggere dal [comunicato ufficiale](https://newsroom.fb.com/news/2019/06/coming-in-2020-calibra/):
> Fin dall'inizio, Calibra permetterà ai propri utenti di inviare Libra a qualsiasi persona che sia dotata di uno smartphone, semplice e veloce come inviare un SMS ad un prezzo che si avvicina a zero. E, nel tempo, speriamo di offrire servizi addizionali per le persone e le aziende, come pagare bollette premendo un tasto, comprare un caffè fotografando un codice o prendere un mezzo pubblico senza il bisogno di portarti dietro contanti o abbonamento.
