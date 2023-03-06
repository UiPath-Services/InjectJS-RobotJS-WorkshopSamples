function(element, rowType){

	var rows = document.getElementsByTagName("tr");
	for (var row of rows) {
		if(Array.from(row.children).some(cell => cell.innerText == rowType))
		{
			row.style.background = '#FCF69C';
		}
    }

	//inject a custom class in one of the elements, this makes it easier to detect when the page refreshes
	var table = document.querySelector("table.table");
	table.classList.add("achy-breaky-class");
	
	return true;
}
