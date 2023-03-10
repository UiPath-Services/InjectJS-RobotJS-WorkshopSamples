function(element, rowType){

	var rows = document.getElementsByTagName("tr");
	for (var row of rows) {
		//if any of the cells in the current row has the inner text equal to rowType
		if(Array.from(row.children).some(cell => cell.innerText == rowType))
		{
			//change row color
			row.style.background = '#FCF69C';
		}
    }
	return true;
}
