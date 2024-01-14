# Testen-Connect

https://www.testen-connect.com

This app is a test playground for Connect Embedded Components - https://stripe.com/docs/connect/get-started-connect-embedded-components

## Pre-requisites

Install/run the following tools/commands:

- Install homebrew `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- `brew install overmind`
- `brew install rbenv`
- `brew install ruby-build`
- `brew install nvm`
- `nvm install`
- `rbenv install 3.3.0`
- `gem install bundler`

## ENV

You'll need to create a `.env` file in the root directory, you can copy the existing `.env.sample` file and then fill them in.

## Running locally

Assuming you have installed all pre-requisites you should be able to start the application locally by running:

```bash
bin/dev
```

This will start a number of processes, but you should eventually see a `web` process with the following output:

```bash
web    | * Listening on http://[::1]:3001
web    | Use Ctrl-C to stop
```

At that time you should be able to load `http://localhost:5100` in your browser and see the app.

## Linting

### Linting Ruby

```bash
yarn lint:ruby
```

### Linting Typescript

```bash
yarn lint:ts
```
