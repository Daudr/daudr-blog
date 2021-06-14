---
title: 'How to earn money the crypto way: Pancakeswap farming'
description: "Today we'll look into the most famous DeFi on the Binance Smart Chain: Pancakeswap"
tags: ['crypto', 'pancakeswap', 'cake', 'bnb', 'bsc', 'blockchain']
keywords: ['crypto', 'pancakeswap', 'cake', 'bnb', 'bsc', 'blockchain']
cover_image: https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3098&q=80
date: '2021-06-15T00:00:00.000Z'
id: 'pancakeswap-farming'
---

Today we'll look into the most famous **DeFi** on the **Binance Smart Chain**: **Pancakeswap**.

![Pancakes for all](https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3098&q=80)

> Pancakes for all

## Intro

This article is not for beginners, so some knowledge in the blockchain area would be required to fully understand this article, but let me give you a quick headstart from what you read in the first paragraph:

- **DeFi**: A DeFi os a **decentralized app** that works in the finance area.
- **Binance Smart Chain**: the binance smart chain is a **blockchain** developed by [Binance](https://www.binance.com/it/register?ref=19515970) as a separate chain from the **Ethereum** one, offering the same functionality basically but with much more affordable transaction fees.
- **Panckakeswap**: so we said that pancakeswap is a decentralized application that lives in the BSC (short for Binance Smart Chain), we'll dig deep into it in just a moment.

## Clone the Libra Core GitHub repository

To install locally the `testnet` just run this command on your terminal

`git clone https://github.com/libra/libra.git`

## Setup

To setup Libra Core, go into the `libra` directory and run the setup script to install the dependencies, run these commands on your `terminal`

```bash
cd libra
./scripts/dev_setup.sh
```

The script simply does these things:

- Installs `rustup` -  `rustup` is an installer for the Rust programming language, which `Libra Core` is implemented in.
- Installs the required versions of the `rust-toolchain`.
- Installs `CMake`  - to manage the build process.
- Installs `protoc` - a compiler for protocol buffers.
- Installs `Go` - for building protocol buffers.

## Troubleshoot

If the setup fails, try to run these others commands:

- Update `Rust`:

Run `rustup` update from your libra directory.

- Re-run setup script from your libra directory:

  `./scripts/dev_setup.sh`

## Build Libra CLI Client and Connect to the Testnet

To connect to a validator node running on the Libra `testnet` run the command:

`./scripts/cli/start_cli_testnet.sh`

This command builds and runs the client utilizing `cargo` (`Rust`'s package manager) and connects the client to a validator node on the `testnet`.

Once the client connects to a node on the `testnet`, you will see the following output. To quit the client at any time, use the `quit` command.

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

If you are experiencing build failures, try to remove the `cargo lock` file from the libra directory:

`rm Cargo.lock`

If your client did not connect to the testnet:

- Check your internet connection.
- Ensure that you are using the latest version of the client. Pull the latest Libra Core and rerun the client:

`./scripts/cli/start_cli_testnet.sh`

## Create new accounts

Once your client is connected to the `testnet`, you can run CLI commands to create new accounts. I'll walk you through creating accounts for two users.

### Step 1: Check if the client is running

A libra% command line prompt indicates that your Libra CLI client is running. To see the help information for the `account` command enter "account" as shown below:

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

### Step 2: create the first account

Note that creating an account using the CLI does not update the `blockchain`, it just creates a local key-pair.
To create the first account, enter this command:

`libra% account create`

This command will generate an output like this:

```bash
>> Creating/retrieving next account from wallet
Created/retrieved account #0 address 1h3n34fafae4147b2a105a0be2f91238adcfaaadf93fc0868e7a0253c4a8
```

\#0 is the index of the account, and the hex string is the address of the account. The index is just a way to refer to the account. The account index is a local CLI index that can be used in other CLI commands for users to conveniently refer to the accounts they have created. The index is meaningless to the blockchain. The account will be created on the blockchain only when either money is added to the account via minting, or money is transferred to the account via a transfer from another user. Note that you may also use the hex address in CLI commands. The account index is just a convenience wrapper around the account address.

### Step 3: create the second account

To create the second account, repeat the account creation command:

`libra% account create`

### [Optional] Step 4: list accounts

To list the accounts you have created, enter this command:

`libra% account list`

This is what you'll see:

```bash
User account index: 0, address: 3ed8e5fafae4147b2a105a0be2f81972883441cfaaadf93fc0868e7a0253c4a8, sequence number: 0
User account index: 1, address: 8337aac709a41fe6be03cad8878a0d4209740b1608f8a81566c9a7d4b95a2ec7, sequence number: 0
```

The sequence number for an account indicates the number of transactions that have been sent from that account. It is incremented every time a transaction sent from that account is executed and stored in the blockchain.

## Add Libra Coins to the accounts

Minting and adding coins to accounts on `testnet` is done via `faucet`. `Faucet` is a service that runs along with the `testnet`. This service only exists to facilitate minting coins for `testnet` and will not exist for `mainnet`. It creates Libra with no real-world value. Assuming you have created two accounts, with index 0 and index 1 respectively, you can follow the steps below to add Libra to both accounts.

### Step 1: Add Libra Coins to the accounts

To mint Libra and add to the first account, enter this command:

`libra% account mint 0 100`

- 0 is the index of the account.
- 100 is the amount of Libra to be added to the account.

A successful `account mint` command will also create the account on the `blockchain`.

Sample output on success:

```bash
>> Minting coins
Mint request submitted
```

Note that when the request is submitted, it means that it has been added to the `mempool` (of a validator node on `testnet`) successfully. It does not necessarily imply that it will be successfully completed. Later, we will query the account balance to confirm if minting was successful.

To mint Libra and add to the second account, enter this command:

`libra% account mint 1 50`

- 1 is the index of the account.
- 50 is the amount of Libra to be added to the account.
- A successful account mint command will also create the account on the blockchain. Another way to create an account on the blockchain is to transfer money from the any other account.

### Step 3: Check an accounts' balance

To check the balance in the first account, enter this command:

`libra% query balance 0`

Sample output on success:

`Balance is 100`

## Submit a transaction

```bash
libra% query sequence 0
>> Getting current sequence number Sequence number is: 0
libra% query sequence 1
>> Getting current sequence number Sequence number is: 0
```

In `query sequence 0`, 0 is the index of the first account. A sequence number of 0 for both the accounts indicates that no transactions from either one of the accounts have been executed so far.

## Transfer money

To submit a transaction to transfer 10 Libra from the first account to the second, enter this command:

`libra% transfer 0 1 10`

- 0 is the index of the first account.
- 1 is the index of the second account.
- 10 is the number of Libra to transfer from the first account to the other account.

This will generate:

```bash
>> Transferring
Transaction submitted to validator
To query for transaction status, run: query txn_acc_seq 0 0 <fetch_events=true|false>
```

You can use the command `query txn_acc_seq 0 0 true` (transaction by account and sequence number) to retrieve the information about the transaction you just submitted. The first parameter is the local index of the sender account, and the second parameter is the sequence number of the account.

You just submitted your transaction to a validator node on `testnet`, and it was included in the `mempool` of the validator. This doesn't necessarily mean your transaction has been executed. In theory, if the system were slow or overloaded, it would take some time to see the results, and you may have to check multiple times by querying the accounts. To query an account with index 0, you can use the command `query account_state 0`.

**The Blocking Transfer Command**: You can use the `transferb` command (as shown below), instead of the `transfer` command. `transferb` will submit the transaction and return to the client prompt only after the transaction has been committed to the blockchain.

`libra% transferb 0 1 10`

## Query sequence number after transfer

```bash
libra% query sequence 0
>> Getting current sequence number Sequence number is: 1
libra% query sequence 1
>> Getting current sequence number Sequence number is: 0
```

The sequence number of 1 for the first account (index 0) indicates that one transaction has been sent from that account so far. The sequence number of 0 for the second account (index 1) indicates that no transaction has been sent from that account so far. Every time a transaction is sent from an account, the sequence number is incremented by 1.

## Check the accounts' balance after the transfer

To check the final balance in both accounts, query the balance again for each account as you did in this step. If your transaction (`transfer`) executed successfully, you should see 90 Libra in the first account and 60 Libra in the second account.

```bash
libra% query balance 0
Balance is: 90
libra% query balance 1
Balance is: 60
```

## Congratulations! 🎉🎉🎉

You have successfully executed your transaction on the Libra `testnet` and transferred 10 **Libra Coins**!
