import { useEffect, useState } from "react";
import OptionsPage from "./OptionsPage/OptionsPage.tsx"
import ReroutePage from "./ReroutePage/ReroutePage.tsx"
import './App.css'

function App() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if (tabs[0] && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });
  }, []);


  if (currentUrl.includes('robinhood.com/options/chains/')) {
    return <OptionsPage />;
  } else {
    return <ReroutePage />;
  } 
}

export default App
