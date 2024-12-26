// content.js -- will run in web context to interact with DOM
console.log('Content script loaded');

function handleClick(event) {
    if (event.target.getAttribute('data-testid').includes('OptionChain')) {
        const parent = event.target.parentNode.parentNode
        const dropdown = parent.querySelector('.css-5a07nz')

        // .hasChildNodes() means it previously had child nodes 
        // AKA it was previously selected and is no longer
        if (!dropdown.hasChildNodes()) {
            console.log('toggled!');
        } else {
            console.log('not toggled!');
        }
    }
}

if (document.URL.includes("robinhood.com/options/chains/")) {
    document.addEventListener('click', handleClick);
}

// ReactVirtualized__Grid__innerScrollContainer