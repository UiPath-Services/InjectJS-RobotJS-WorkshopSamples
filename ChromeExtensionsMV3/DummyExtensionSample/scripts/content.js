// Call start
let processes;
(async() => {
  processes = await UiPathRobot.getProcesses();
  const table = document.querySelector("table.table");
  AppendTableColumn(table,"Due Date","dueDate-container");
  ExtendWorkItemsWithDueDate("WI5");
})();

function AppendTableColumn(table, headerName, contentCellClass)
{
  const headerCell = document.createElement("th");
  headerCell.append(headerName);

  const tableBody = table.querySelector("tbody");
  tableBody.firstElementChild.appendChild(headerCell);

  const contentRows = tableBody.querySelectorAll("tr:not(:first-child)");
  contentRows.forEach((row) =>{
    let cell = document.createElement("td");
    cell.classList.add(contentCellClass);
    row.appendChild(cell);
  });
}

function ExtendWorkItemsWithDueDate(rowType)
{
  var rows = document.querySelectorAll("tr");
  rows.forEach((row) => {
    if(Array.from(row.children).some(cell => cell.innerText == rowType))
    {
      row.classList.add("highlight-row");
      //add some styling + event that will fire off the UiPath Robot on second Column
      row.children[1].classList.add("wiid-container");
      row.children[1].addEventListener("click", StartDueDateProcess);
    }     
  });
}

//will require GetWorkItemDueDate process available in your UiPath Assistant
function StartDueDateProcess(event)
{
  const wiidCell = event.currentTarget;
  StartProcess('GetWorkItemDueDate', {in_WIID: wiidCell.innerText},
    //display Job Results
    processResults =>
    { 
      const dueDate = new Date(processResults.out_DueDate);
      wiidCell.closest("tr").querySelector("td.dueDate-container").innerText = dueDate.toLocaleString();
    });
}

function StartProcess(processName, arguments, successCallBack)
{
	const processToInvoke = processes.find(e => e.name.includes(processName));
	if(processToInvoke)
	  processToInvoke.start(arguments).then(
      successCallBack,
      err => {
          //handle error
          if(err.ClassName && err.ClassName.startsWith("UiPath."))
            //this is a UiPath Specific Exception
            alert((err.InnerException && err.InnerException.Message)?err.InnerException.Message:err.Message);
          else
            alert(`Start Job failed with the following error message: ${err.toString()}`);
      });
	else
		alert("Process " + processName + " was not found");
}
