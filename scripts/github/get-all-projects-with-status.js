function scrollToElement(element, scrollAmount, delay) {
    return new Promise((resolve, reject) => {
        // Check if the element exists
        if (!element) {
            resolve();
            return;
        }

        element.scrollTop += scrollAmount; // Scroll the element

        // Wait for the specified delay, then scroll
        setTimeout(() => {
           
            resolve(); // Resolve the promise
        }, delay);
    });
}

async function scrollKanbanColumn(cardElement,kanbanStatus){
    const cardHeight = cardElement.offsetHeight;
    console.log(cardHeight)
    const scrollContainer="drop-zone-"+kanbanStatus;

    const query = `[data-test-id="${scrollContainer}"]`
    const element = document.querySelector(query)
    console.log(element)
   await scrollToElement(element, cardHeight, 10); // Adjust scrollAmount and delay as needed
   console.log("Scrolled")
    
}
async function scrollKanbanColumnToTop(kanbanStatus){

    // const kanbanStatus="Backlog"
    const scrollContainer="drop-zone-"+kanbanStatus;

    const query = `[data-test-id="${scrollContainer}"]`
    const element = document.querySelector(query)
    console.log(element)
   await scrollToElement(element, -20000, 1000); // Adjust scrollAmount and delay as needed
   console.log("Scrolled")
    
}






async function  handleCardForStatuses(status, allElements){

    let results = [];

    for (const cardElement of allElements) {


        await scrollKanbanColumn(cardElement,status)
        console.log(cardElement);


        const textElement = cardElement.querySelector("a[role='button']").querySelector('span[class*="Text"]');
        const text = textElement ? textElement.innerText : '';
        console.log(text); // Logs the text of the card
        results.push({status, text});
    }


return results;
}

async function initialize(){



    const statuses = ["Backlog", "Todo", "In Progress", "Done"]
    
    
    let results = [];
    
    for (const status of statuses) {
        await scrollKanbanColumnToTop(status)
        const query = `[data-board-column="${status}"]`
        const allElements = document.querySelector(query).querySelectorAll('[data-test-id="board-view-column-card"]')
        
        console.log(query)
        console.log(allElements)
    
        result = await handleCardForStatuses(status, allElements)
        results = results.concat(result);
        
    }
    return results;
    
    
    
    
    }

initialize().then((results) => {
    console.log(results);
    // Do something with the results
})
