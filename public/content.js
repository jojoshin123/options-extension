// content.js -- will run in web context to interact with DOM
console.log('Content script loaded');

function handleClick(event) {
    if (event.target.getAttribute('data-testid').includes('OptionChain')) {
        const parent = event.target.parentNode.parentNode
        const dropdown = parent.querySelector('.css-5a07nz') //class for dropdown component

        // .hasChildNodes() means it previously had child nodes 
        // AKA it was previously selected and is no longer
        if (!dropdown.hasChildNodes()) {
            console.log('toggled!');
            chrome.runtime.sendMessage({ type: 'TOGGLED' });
        } else {
            console.log('not toggled!');
            chrome.runtime.sendMessage({ type: 'UNTOGGLED' });
        }
    }
}

if (document.URL.includes("robinhood.com/options/chains/")) {
    document.addEventListener('click', handleClick);
}