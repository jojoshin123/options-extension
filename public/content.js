// content.js -- will run in web context to interact with DOM
console.log('Content script loaded');

// function handleClick(event) {
//     if (event.target.getAttribute('data-testid').includes('OptionChain')) {
//         const parent = event.target.parentNode.parentNode
//         const dropdown = parent.querySelector('.css-5a07nz') //class for dropdown component

//         // .hasChildNodes() means it previously had child nodes 
//         // AKA it was previously selected and is no longer
//         if (!dropdown.hasChildNodes()) {
//             console.log('toggled!');
//             const spandata = dropdown.querySelector('.css-bp1p2y')
//             console.log(spandata)
//             chrome.runtime.sendMessage({ type: 'TOGGLED', data: spandata.textContent });
//         } else {
//             console.log('not toggled!');
//             const spandata = dropdown.querySelector('.css-bp1p2y')
//             console.log(spandata)
//             chrome.runtime.sendMessage({ type: 'UNTOGGLED' });
//         }
//     }
// }

const documentObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Check if the parent element or its ancestors have the target class
        const isTargetParent = mutation.target.classList.contains('css-5a07nz') ||
            mutation.target.closest('.css-5a07nz');

        if (isTargetParent && mutation.type === 'childList') {
            if (mutation.addedNodes.length > 0) {
                console.log('Children added to .css-5a07nz element:', {
                    parent: mutation.target,
                    addedNodes: mutation.addedNodes
                });
                const optionsData = mutation.target.querySelector('.css-bp1p2y')

                // Send message to App.tsx
                chrome.runtime.sendMessage({ type: 'TOGGLED', data: optionsData.textContent });

            } else if (mutation.removedNodes.length > 0) {
                console.log('Children removed from .css-5a07nz element:', {
                    parent: mutation.target,
                    removedNodes: mutation.removedNodes
                });
                chrome.runtime.sendMessage({ type: 'UNTOGGLED', data: null });
            }
        }
    });
});

// const targetElementArray = document.querySelectorAll('.css-5a07nz');
// console.log(targetElementArray)

if (document.URL.includes("robinhood.com/options/chains/")) {
    // document.addEventListener('click', handleClick);
    documentObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}