function(element, rowType){

	var rows = document.getElementsByTagName("tr");
	for (var row of rows) {
		if(Array.from(row.children).some(cell => cell.innerText == rowType))
		{
			row.style.background = '#FCF69C';
		}
    }
	return true;
}
