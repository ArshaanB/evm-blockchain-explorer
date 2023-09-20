# EVM Blockchain Explorer

There are 2 major routes in this application.

## /address/[address]

Example: `/address/0x53b603BE58cae7e614394c429f0616b9Fed107Be`

Here you can see the last 100 transactions performed by this address.

## /transactionDetails/[transactionHash]

Example: `/transactionDetails/0x539443f3337f1d5521f514bb4d27e9b9ef28826a89b0c8fc28be8a53e5a7a6bc`

Here you can see a variety of details on this transaction.

The website is hosted on Vercel, feel free to visit the website here: https://frontend-blockchain-assessment.vercel.app/

## Getting Started for Developers

To get started set up the following 2 variables in your .env file:
`NEXT_PUBLIC_ETHERSCAN_API_KEY` and `NEXT_PUBLIC_POLYGONSCAN_API_KEY`

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
