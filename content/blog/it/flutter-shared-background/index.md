---
title: 'Impostare uno sfondo comune nella tua App scritta in Flutter'
description: Negli ultimi mesi ho iniziato a sviluppare delle app in Flutter e devo dire che per il momento mi sto trovando davvero bene con questa libreria che Google ha costruito e ci ha messo a disposizione. Ma per alcune cose ho avuto non pochi problemi, per esempio come settare un'immagine di sfondo comune a più pagine di una applicazione
tags: ['flutter', 'app', 'android', 'ios', 'scaffold']
keywords: ['flutter', 'app', 'android', 'ios', 'scaffold']
cover_image: https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1950&q=80
date: '2020-09-10T10:00:00.000Z'
id: 'flutter-shared-background'
lang: 'it'
---

Negli ultimi mesi ho iniziato a sviluppare delle app in **[Flutter](https://flutter.dev)** e devo dire che per il momento mi sto trovando davvero bene con questa libreria che **Google** ha costruito e ci ha messo a disposizione. Ma per alcune cose ho avuto non pochi problemi, per esempio come settare un'immagine di sfondo comune a più pagine di una applicazione.  
Continua a leggere questo articolo per capire come l'ho sviluppato nelle mie ultime applicazioni.

![Imposta il giusto sfondo nella tua applicazione](https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1950&q=80)

> Foto di [Efe Kurnaz](https://unsplash.com/@efekurnaz) su [Unsplash](https://unsplash.com)

## Capire Flutter: Widgets

Flutter è fatto di **`Widget`**, questi sono esattamente come dei **mattoncini Lego**, ne metti uno sopra all'altro per costruire la **`UI` della tua App**.  
Il punto di inizio di tutte le App sviluppate in Flutter è il `MaterialApp`, **questo Widget serve a far capire al compilatore dove inizia tutta la parte scritta in Flutter e a quali pagine puoi navigare se usi il `Navigator` con i parametri `named`, scelta molto consigliata**.

## Scaffold widget al salvataggio

Un altro widget che si trova in tutte le App scritte in Flutter è lo `Scaffold`, lo Scaffold ti permette di gestire tutta la visualizzazione dei tuoi widget sullo schermo, implementa nativamente la gestione di **`AppBar`, `BottomNavigationBar` e `Drawers`**. Solo questo è davvero utilissimo.  
Quindi, continuando, tutti gli `Scaffold` hanno un campo obbligatorio: `body`, questo campo richiede un `Widget` generico, può essere qualsiasi Wdiget tu voglia, e se non specifichi altrimenti verrà posizionato nella parte più in alto a sinistra, appena sotto all'AppBar se ne esiste una o all'inizio dello schermo altrimenti.

Ecco un esempio:

```dart
import 'package:flutter/material.dart';

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(),
        body: Container(
          child: Text('Hi world!'),
        ));
  }
}
```

Questo snippet non fa altro che mostrare un widget `Text` sotto all'AppBar. Ecco uno screenshot di esempio:

![A scaffold con il testo Hi world!](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/flutter-shared-background%2Fscaffold.png?alt=media&token=b0263e1a-298b-475e-a843-1da6773ca07f)

Detto questo, è ora di passare all'argomento principale di questo articolo, come possiamo usare le nuove informazioni in nostro possesso per impostare un'immagine di sfondo che verrà condivisa da tutta l'applicazione?  
La risposta, a dire la verità, è abbastanza semplice, tutto quello che dobbiamo fare è usare un altro Widget: **`Stack`**.

## Un altro Widget: Stack

Lo Stack ci permette di mettere un widget sopra ad un altro.  
Ci sono diversi modi di renderizzare i nostri Widget in flutter, la maggior parte dei Widget (come Scaffold), ci permettono di avere un solo Widget come figlio, ma esistono altri tre Widet che ci consentono di avere più figli per un solo Widget, questi sono: **`Row`, `Column` e `Stack`**, però la spiegazioni di questi ultimi Widget non è argomento di questo articolo, quindi vi invito a leggere la documentazione di Flutter per capire come funzionano, sono davvero semplici.

## Come possiamo usare lo Stack per il nostro scopo

Quello che possiamo fare ora è **usare lo Scaffold per visualizzare un body che contiene uno Stack di default, lo Stack a sua volta avrà due figli: un `Image` per visualizza la nostra immagine di sfondo e un `Container` che prende tutto lo schermo per visulizzare tutto il resto.**  
Adesso che vedrai il codice capirai tutto:

```dart
import 'package:flutter/material.dart';

class MyScaffold extends StatelessWidget {
  final Widget child;
  final String image;

  ModelToysScaffold(
      {@required this.child,
      this.image = 'assets/images/background.png',});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(), =>
      body: Stack(
        children: [
          Positioned(
            top: 0,
            child: Image.asset(
              image,
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              fit: BoxFit.cover,
            ),
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: child,
          ),
        ],
      ),
    );
  }
}
```

Questo è il risultato:

![Il nostro testo ha uno sfondo](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/flutter-shared-background%2Fscaffold-background.png?alt=media&token=6846a0fd-e091-442a-8689-f17289875978)

Cosa ne pensi di questo approccio al problema?  
**Fammelo sapere nei commenti!** 😉
