import { useEffect, useState } from "react";
import OptionsPage from "./OptionsPage/OptionsPage.tsx"
import ReroutePage from "./ReroutePage/ReroutePage.tsx"
import './App.css'

function App() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs[0] && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });

    // Set listener for messages from the content script
    chrome.storage.local.get(['isToggled'], (result) => {
      console.log("isToggled: " + result.isToggled)
      setToggled(result.isToggled);
    });

    // // Cleanup listener on unmount
    // return () => {
    //     chrome.runtime.onMessage.removeListener(handleMessage);
    // };
  }, []);


  if (currentUrl.includes('robinhood.com/options/chains/')) {
    return <OptionsPage toggle={toggled}/>;
  } else {
    return <ReroutePage />;
  } 
}

export default App
