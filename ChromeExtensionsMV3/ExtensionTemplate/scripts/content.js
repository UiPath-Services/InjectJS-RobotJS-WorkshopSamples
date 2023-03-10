// Call start
let processes;

//This is an anonymous function; The (function(){...})(); syntax ensures it will execute as soon as the script is loaded
(async() => {
  //get available processes
  processes = await UiPathRobot.getProcesses();
  alert("Number of processes found: " + processes.length);

  //start process - will require GetWorkItemDueDate process available in your UiPath Assistant
  StartProcess('GetWorkItemDueDate', {in_WIID: "12345"}, processResults => alert("Due Date: " + processResults.out_DueDate));

})();

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
