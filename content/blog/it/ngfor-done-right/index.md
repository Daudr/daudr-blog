---
title: "ngFor Fatto Bene"
description: Quando stiamo sviluppando dei template che usano liste, ngFor ci salva un sacco di tempo, ma potrebbe aver effetti disastrosi se usato male. Leggi questo articolo per avere delle dritte su come usarlo al meglio 🤩
tags: ["angular", "codice", "guida", "frontend", "performance"]
keywords: ["angular", "codice", "guida", "frontend", "performance", "ngFor", "trackBy"]
cover_image: https://images.unsplash.com/photo-1489976908522-aabacf277f49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
date: "2019-07-04T09:27:10.759Z"
id: "it/ngfor-done-right"
lang: "it"
---

Quando stiamo sviluppando dei template che usano liste, ngFor ci salva un sacco di tempo, ma potrebbe aver effetti disastrosi se usato male. Leggi questo articolo per avere delle dritte su come usarlo al meglio 🤩

![Arriva primo usando ngFor](https://images.unsplash.com/photo-1489976908522-aabacf277f49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)
> Foto di [Kolleen Gladden](https://unsplash.com/photos/ij5_qCBpIVY) su [Unsplash](https://unsplash.com)

Tutte le informazioni contenute in questo articolo si possono trovare anche nella [documentazione ufficiale](https://angular.io/api/common/NgForOf)

## Prerequisiti

Durante questa guida, useremo un'interfaccia che rappresenta gli oggetti delle nostre liste, chiamiamola `Item` e dichiariamola:

```typescript
export interface Item {
  _id: string
  name: string
}
```

poi aggiungiamo un po' di funzioni di utilità che ci aiuteranno più avanti:

```typescript
export const items: Item[] = [{ _id: "a2fHdS8P", name: "Mike" }]

export const makeRandomId = (): string => {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength: number = characters.length
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const makeRandomName = (): string => {
  const names = [
    "Sara",
    "Mattia",
    ...
  ]

  return names[Math.floor(Math.random() * names.length)]
}

export const getItems = (length): Item[] => {
    const items = new Array(length);
    return items.map(item => {
        return {
            _id: makeRandomId(),
            name: makeRandomName()
        };
    });
}
```

## Prima di tutto: trackBy

`trackBy` è una funzione che definisce come verificare i cambiamenti degli oggetti presenti nelle liste che andremo ad iterare. Questo significa che che possiamo usarla per sapere esattamente quali oggetti in una lista sono cambiati, dopo una chiamata di rete o per altri motivi, ad esempio.
Implementiamo questa funzione nel nostro file `.ts`:

```typescript
trackByFunction (index, item) {
  return item._id;
}
```

Poi nel nostro `.html` aggiungiamo la nuova funzione:

```html
<div *ngFor="let item of items; trackBy: trackByFunction"></div>
```

Facendo questo la nostra app sarà molto più performante perché non dovrà ricaricare tutta la lista ogni volta, ma ricaricherà solo gli elementi cambiati

## even e odd vengono poi

Le variabili `even` e `odd` sono usate principalmente per aggiungere lo stile ai componenti.
Per esempio, quando abbiamo una tabella e vogliamo renderla più leggibile possiamo usare queste variabili per cambiare i colori di sfondo delle righe.

Nel vostro `html`:

```html
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr
      *ngFor="let item of items; trackBy: trackBy; odd as odd; even as even"
      [ngClass]="{ 'odd': odd, 'even': even }"
    >
      <td>{{ item._id }}</td>
      <td>{{ item.name }}</td>
    </tr>
  </tbody>
</table>
```

E nel vostro file `css`/`scss`:

```scss
.odd {
  background-color: rgba(255, 0, 255, 0.45);
}

.even {
  background-color: rgba(0, 0, 0, 0.45);
}
```

Il risultato sarà qualcosa del genere
![Esempio even e odd](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/even-odd.png?alt=media&token=bd193e7b-6424-4e71-b9ae-e82b736198b6)

## Parlami di first e last

Esattamente come `even` e `odd`, le variabili `first` e `last` sono anch'esse usate per aggiungere stile ai componenti.
Usiamo la tabella di prima e settiamo le classi solo per le righe `first` e `last`:

```html
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr
      *ngFor="let item of items; trackBy: trackBy; first as first; last as last"
      [ngClass]="{ 'first': first, 'last': last }"
    >
      <td>{{ item._id }}</td>
      <td>{{ item.name }}</td>
    </tr>
  </tbody>
</table>
```

```scss
.first {
  background-color: rgba(0, 0, 255, 0.45);
}

.last {
  background-color: rgba(0, 255, 0, 0.45);
}
```

Ecco cosa ne uscirà
![Esempio first e last](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/first-last.png?alt=media&token=921a3562-4b6a-4124-ac94-37aa0a502b9f)

## Non dimentichiamo di index

La variabile `index` fa proprio quello che pensi faccia, indica l'indice dell'elemento in una lista.
Forse è la variabile che più viene usata quando usiamo le liste, pensa solo se vorresti posizionare gli elementi in base al loro indice usando il `css`.

```html
<mat-list>
  <mat-list-item *ngFor="let item of items; trackBy: trackByFunction; index as index">{{ item.name }} index is {{ index }}</mat-list-item>
</mat-list>
```

![Esempio index](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/index.png?alt=media&token=1456c0fc-48b9-4064-8403-ed706c178151)

## Questo è tutto 😍

In questa piccola semplice guida abbiamo visto com'è possibile ottenere il meglio da **ngFor** con il minimo sforzo.

Tutto il codice utilizzato nella guida è disponibile su [Stackblitz](https://stackblitz.com/edit/ngfor-done-right) e su [GitHub](https://github.com/Daudr/ngfor-done-right), vai pure a giocarci ✌
