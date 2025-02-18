# Options Chrome Extension for Robinhood

Retail brokeraging apps have starting adding "return simulators" on options contracts in order for people to visualize future profits or losses.
Some apps like Robinhood have very simplified models that only factor in the underlying's price and not other factors like volatility.

This simple Chrome extension is to follow a similar model to this [Options Profit Calculator](https://www.optionsprofitcalculator.com/), which can factor in changes in IV and also provide a good heatmap for profitability.

![rh-ex2](https://github.com/user-attachments/assets/db24f2e9-f8e0-42a5-84ee-a70ab301396f)


To run this extension locally, you can clone the repository and run the application via `npm run dev` after building the project.
You can then load it onto your Chrome browser by visiting chrome://extensions -> Load Unpacked Extension and load the `manifest.json` file from the dist directory.

TODO:
  - Change CSS query selectors -- the current selectors only work in Robinhood Dark mode
