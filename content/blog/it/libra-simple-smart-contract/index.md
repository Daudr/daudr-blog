---
title: "Scrivi la tua prima transazione nel Network di Libra"
description: Dopo il rilascio della testnet del network di Libra, andiamo a capire meglio come scrivere una transazione su di esso
tags: ['facebook', 'libra', 'blockchain', 'cryptomoneta', 'codice', 'guida']
keywords: ['facebook', 'libra', 'blockchain', 'cryptomoneta', 'codice', 'guida']
cover_image: https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/libra_logo.jpg?alt=media&token=5939a2fc-ccbd-4adb-a06f-54e6af6419d0
date: "2019-06-24T09:27:10.759Z"
id: "it/libra-simple-smart-contract"
lang: "it"
---

L'altro giorno ho pubblicato [un articolo](https://blog.daudr.me/it/facebook-libra) che parlava del network di **Libra**, oggi vediamo come sviluppare una transazione.

![Logo Libra](https://firebasestorage.googleapis.com/v0/b/daudr-blog.appspot.com/o/libra_logo.jpg?alt=media&token=5939a2fc-ccbd-4adb-a06f-54e6af6419d0)
> Logo Libra

## Installare la testnet in locale

Oggi non useremo [**Move**](https://blog.daudr.me/it/facebook-libra), il nuovo linguaggio di programmazione creato per sviluppare moduli nel network di Libra, ma solo il terminale (al momento della scrittura dell'articolo gli unici sistemi operativi supportati sono **Linux** e **macOS**).
Per installare la `testnet` in locale hai bisogno di un paio di cose:

- `git` installato nel tuo computer;
- `Homebrew` installato se usi macOS.

## Clona la repository di LIbra Core

Per installare la `testnet` in loale basta usare il comando

`git clone https://github.com/libra/libra.git`

## Setup

Per fare il setup di Libra, spostati nella cartella `libra` appena creata ed esegui lo script di setup per installare le dipendenze necessarie, esegui i seguenti comandi nel terminale

```bash
cd libra
./scripts/dev_setup.sh
```

Lo script farà le seguenti operazioni:

- Installa `rustup` - `rustup` è un installer per Rust, un linguaggio di programmazione, usato per sviluppare `Libra Core`;
- Installa la versione richiesta di `rust-toolchain`;
- Installa `CMake` - per fare il processo di build;
- Installa `protoc` - un compilatore per buffer di protocolli;
- Installa `Go` - per sviluppare i buffer di protocolli.

## Troubleshoot

Se il setup fallisce, prova ad eseguire i seguenti comandi:

- Aggiorna `Rust`:
  Esegui `rustup update` dalla cartella `libra`.

- Esegui di nuovo lo script di setup:
  `./scripts/dev_setup.sh`

## Eseguiamo la build della CLI Client di Libra e connettiamoci alla Testnet

Per connetterci a un nodo validatore in esecuzione nella `testnet` di libra, esegui il comando:

`./scripts/cli/start_cli_testnet.sh`

Questo comando esegue la build ed esegue il client usando `cargo` (il package manager di `Rust`) e connette il client a un nodo validatore in esecuzione nella `testnet`.

Una volta che il client si è connesso ad un nodo, vedrai il seguente output.
Per uscire dal client in qualunque momento, usa il comando `quit`.

```bash
usage: <command> <args>
Use the following commands:
account | a   Account operations
query | q   Query operations
transfer | transferb | t | tb
  <sender_account_address>|<sender_account_ref_id>
  <receiver_account_address>|<receiver_account_ref_id>
  <number_of_coins> [gas_unit_price (default=0)]
  [max_gas_amount (default 10000)] Suffix 'b' is for blocking.  
  Transfer coins from account to another.
help | h   Prints this help
quit | q!   Exit this client
Please, input commands:
libra%
```

## Troubleshoot Build

Se in questo passaggio la build fallisce, prova ad elimare il file di lock di cargo dalla cartella `libra`:

`rm Cargo.lock`

Se il tuo client non si è  connesso alla testnet:

- Verifica la tua connessione ad Internet;
- Assicurati di usare l'ultima versione disponibile del client. Esegui un pull dalla repository di git e riesegui il client:
  `./scripts/cli/start_cli_testnet.sh`

## Creiamo nuovi account

Una volta che il tuo client si è connesso alla `testnet` puoi usare i comandi della CLI per creare nuovi utenti. Ti mostrerò i passi da eseguire per creare due nuovi utenti.

### Step 1: Verifica che il client stia andando

Un prompt sulla linea di comando `libra%` indica che il client è in funzione sul terminale. Per vedere le informazioni di aiuto per i comandi degli utenti esegui il comando `user` come sotto:

```bash
libra% account
usage: account <arg>
Use the following args for this command:
create | c   Create an account. Returns reference ID to use in other operations
list | la   Print all accounts that were created or loaded
recover | r <file path>   Recover Libra wallet from the file path
write | w <file name>   Save Libra wallet mnemonic recovery seed to disk
mint | mintb | m | mb <receiver account> <number of coins>   Mint coins to the account. Suffix 'b' is for blocking
```

### Step 2: Creiamo il primo account

Nota bene: creare un account usando la CLI non aggiorna la `blockchain`, aggiunge solo un oggetto chiave-valore in locale.
Per creare il primo account, esegui questo comando:

`libra% account create`

Questo comando creerà un output del genere:

```bash
>> Creating/retrieving next account from wallet
Created/retrieved account #0 address 1h3n34fafae4147b2a105a0be2f91238adcfaaadf93fc0868e7a0253c4a8
```

\#0 è l'indice dell'account, e la stringa esadecimale è l'indirizzo dell'account. L'indice è solo un modo per riferirsi all'account. L'indice dell'account è un indice locale della CLI che può essere usato in altri comandi della CLI con cui gli sviluppatori possono riferirsi agli account creati. Alla blockchain l'indice non serve a nulla. L'account verrà creato anche nella blockchain solo quando verrano aggiunti dei soldi all'account tramite un'operazione chiamata `minting`, o se dei soldi vengono trasferiti sull'account da una transazione da un altro account.
Nota: puoi anche usare l'indirizzo esadecimale per riferirti agli account nei comandi della CLI.

### Step 3: Creiamo il secondo account

Per creare il secondo account, ripeti il comando eseguito in precedenza:

`libra% account create`

### [Opzionale] Step 4: lista account

Per vedere la lista degli account creati, esegui il comando:

`libra% account list`

Questo è quello che vedrai:

```bash
User account index: 0, address: 3ed8e5fafae4147b2a105a0be2f81972883441cfaaadf93fc0868e7a0253c4a8, sequence number: 0
User account index: 1, address: 8337aac709a41fe6be03cad8878a0d4209740b1608f8a81566c9a7d4b95a2ec7, sequence number: 0
```

Il `sequence number` di un account indica il numero di transazioni che sono state inviate da quell'account. Il numero viene incrementato ogni volta che una transazione inviata da un account viene eseguita e memorizzata nella blockchain.

## Aggiungere monete Libra agli account

Abbiamo già visto come chiama il metodo per aggiungere monete direttamente ad un account: il `minting`, questo processo, nella `testnet` viene eseguito da `faucet`. `Faucet` è un servizio che viene eseguito insieme alla `testnet`. Questo servizio esiste solo per facilitare il processo di `minting` nella `testnet` e non esisterà nella `mainnet`. Faucet crea monete senza un vero valore.
Se hai creato due account, con indice 0 e 1 rispettivamente, puoi seguire i seguenti passi per aggiungere monete ad entrambi gli account.

### Step 1: Aggiungi monete Libra agli account

Per eseguire il mint di monete Libra e aggiungerle al primo account esegui il comando:

`libra% account mint 0 100`

- 0 è l'indice dell'account
- 100 è il valore delle monete di Libra che verrà aggiunto all'account

Un `mint` avvenuto in maniera corretta creerà anche l'account nella `blockchain`. Un altro modo per creare un account nella blockchain è trasferire monete da un altro account.

Esempio di un `mint` eseguito correttamente:

```bash
>> Minting coins
Mint request submitted
```

Nota bene: quando la richiesta di mint viene registrata (`submitted`), significa che è stata aggiunta alla `mempool` (del nodo sulla `testnet`) correttamente. Non significa necessariamente che sarà completata correttamente. Più tardi, vedremo come eseguire una query sull'importo disponibile nell'account per vedere se l'operazione ha avuto esito positivo.

Per eseguire il mint per il secondo account, esegui il comando:

`libra% account mint 1 50`

- 1 è l'indice dell'account;
- 50 è il valore delle monete di Libra da aggiungere all'account;

### Verificare l'importo disponibile sugli account

Per verificare il saldo del primo account, esegui il seguente comando:

`libra% query balance 0`

Esempio di output:

`Balance is 100`

## Inviare una transazione

```bash
libra% query sequence 0
>> Getting current sequence number Sequence number is: 0
libra% query sequence 1
>> Getting current sequence number Sequence number is: 0
```

Nel comando `query sequence 0`, 0 è l'indice del primo account. Un sequence number di 0 per entrambi gli account significa che nessuna transazione è stata effettuata dagli stessi.

## Trasferire monete

Per eseguire una transazione per trasferire 10 monete di Libra dal primo account al secondo, esegui il comando:

`libra% transfer 0 1 10`

- 0 è l'indice del primo account
- 1 è l'indice del secondo account
- 10 è l'importo in monete di Libra da traferire dal primo al secondo account

Questo genererà un output simile a questo:

```bash
>> Transferring
Transaction submitted to validator
To query for transaction status, run: query txn_acc_seq 0 0 <fetch_events=true|false>
```

Puoi eseguire il comando `query txn_acc_seq 0 0 true` (transazione per account e sequence number) per avere le informazioni circa la transazione che hai appena inviato. Il primo parametro è l'indice locale dell'account che invia, e il secondo parametro è il sequence number dell'account.

Hai appena inviato una transazione ad un validatore della `testnet`, ed è stato incluso nella `mempool` del validatore. Questo non vuol dire che la transazione è stata già eseguita. In teoria, se il sistema è lento o sovraccarico, ci metterebbe un po' più tempo per eseguire la transazione, e potresti dover verificare più volte eseguendo query sugli account. Per eseguire la query con l'account di indice 0, puoi usare il comando `query account_state 0`.

**Il comando per bloccare l'esecuzione di un trasferimento**: puoi usare il comando `transferb` (come vedi sotto) invece del comando `transfer`. `transferb` invierà la transazione al validatore e ritornerà al prompt solo quando la transazione verrà eseguita dalla blockchain.

`libra% transferb 0 1 10`

## Eseguire la query al sequence number dopo il trasferimento

```bash
libra% query sequence 0
>> Getting current sequence number Sequence number is: 1
libra% query sequence 1
>> Getting current sequence number Sequence number is: 0
```

Il sequence number uguale a 1 per il primo account, indica che una transazione è stata inviata da quell'account. Il sequence number uguale a 0 per il secondo account indica che nessuna transazione è stata inviata da questo account. Ogni volta che una transazione viene inviata da un account, il sequence number viene incrementato di 1.

## Verifica il saldo degli account dopo il trasferimento

Per verificare il saldo in entrambi gli account, esegui la query sul saldo di nuovo per ogni account come abbiamo fatto precedentemente. Se la tua transazione (`transfer`) è stata eseguita correttamente, dovresti vedere 90 monete disponibili nel primo account e 60 monete disponibili nel secondo account.

```bash
libra% query balance 0
Balance is: 90
libra% query balance 1
Balance is: 60
```

## Congratulazioni! 🎉🎉🎉

Hai officialmente eseguito la tua prima transazione nella `testnet` di **Libra** e hai trasferito 10 monete!
