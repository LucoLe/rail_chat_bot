## About

This is a chat bot application that uses the Berlin public transportation system (BVG) public API. You can find more
information about the API [here](https://v5.bvg.transport.rest/). The chat bot has very rudimentary capabilities. It can
print 10 stations matching a search term or print the next two departures for a selected station. The chat bot can also
print a help message to output all the available commands.

## Running the application locally

First, fetch the dependencies:

```bash
npm install
# or
yarn
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing the application

The application uses both `jest` and `react-testing-library`. To run the test suit:

```bash
npm run test
# or
yarn test
```

## Production

The application is deployed using `vercel`. You can find the production application [here](https://rail-chat-bot.vercel.app/)
