import { useEffect, useState } from "react";
import OptionsPage from "./OptionsPage/OptionsPage.tsx"
import ReroutePage from "./ReroutePage/ReroutePage.tsx"
import './App.css'

import { Option } from './types/Option.tsx'

function App() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [toggled, setToggled] = useState(false);
  const [option, setOption] = useState<Option | null>(null)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs[0] && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });

    // Set listener for messages from the content script
    chrome.storage.local.get(['isToggled'], (result) => {
      setToggled(result.isToggled);
    });

    chrome.storage.local.get(['data'], (result) => {
      const tokenArr = result.data.split(" ")

      // Expirations this year don't have the year
      const date = tokenArr[3].split("/").length == 2 
      ? tokenArr[3].concat("/" + new Date().getFullYear())
      : tokenArr[3];

      setOption({
        ticker: tokenArr[0],
        strike: tokenArr[1],
        contract: tokenArr[2] == 'Call' ? 'call' : 'put',
        expiration: new Date(date)
      })
    });

  }, []);


  if (currentUrl.includes('robinhood.com/options/chains/')) {
    return <OptionsPage toggle={toggled} option={option}/>;
  } else {
    return <ReroutePage />;
  } 
}

export default App
