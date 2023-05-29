function displayPaginationList(data, listElementId, listElementColumnId, functionNameEveryOnClick) {
    
    const total = data.pageTotal;
    const pData = [];
    for (let i = 0; i < total; i++) {
      pData.push(i + 1);
    }

    // const pData = getPageList(data.itemsTotal, data.itemsReceived);
    const pList = document.getElementById(listElementId);
    const pColumn = document.getElementById(listElementColumnId)
    const emptyDiv = [];


    pData.forEach(number => {
        const clonePColumn = pColumn.cloneNode(false)
        clonePColumn.innerHTML = number;

        clonePColumn.addEventListener('click', function(event) {
            // Get the current page number from the pagination element
            const currentPage = parseInt(event.target.textContent);
            //getProductList(currentPage)
            // Use the variable to call the function
            functionNameEveryOnClick(currentPage);
            //window[functionNameEveryOnClick](currentPage);
        });
        //emptyDiv.appendChild(clonePaginationColumn);
        emptyDiv.push(clonePColumn)
    });

    // Remove all old child nodes 
    while (pList.firstChild) {
        pList.removeChild(pList.firstChild);
    }

    emptyDiv.forEach(item => {
        pList.appendChild(item);
    });
}



function savePaginationData(currentPage, totalPage, tableName) {

    // Set the data to save
    const data = {
        tableName: tableName,
        currentPage: currentPage,
        totalPage: totalPage
    };
    // Use the saveData() function to save the data
    saveData(tableName, data);

}
