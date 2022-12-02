# web3-login

> a starter for fullstack passwordless web3 profiles with Next.js, Postgres & [SIWE](https://eips.ethereum.org/EIPS/eip-4361)

## requirements

- a postgres database connection URL
- an [infura](https://infura.io) or [alchemy](https://www.alchemy.com) API key

## to run

1. install dependencies:
   ```
   npm install
   ```
1. make a copy of `.env.example` named `.env` and add credentials
1. run database setup migration:
   ```
   npm run migrate:up
   ```
1. run local development server:
   ```
   npm run dev
   ```
1. check out `localhost:3000` in the browser!

**_power tip:_** revert and clear the database if required:
```
npm run migrate:down
```
