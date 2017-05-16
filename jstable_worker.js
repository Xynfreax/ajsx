function filteredModel(model,filters,filterVal){
  var filteredData=[];
  //alert(model.length);
  for(var i=0;i<model.length;i++){
    var actRow=model[i];
    for(var k in actRow){
      console.log(actRow[k]);
      // if(filterVal.trim().length==0 || filters.indexOf(k)>-1 && actRow[k].includes(filterVal)){
      if(filterVal.trim().length==0 || filters.indexOf(k)>-1 && (actRow[k]+'').includes(filterVal)){
        filteredData.push(actRow);
        break;
        //--i=i+1;
      }
    }
  }
  //+--alert(filteredData.length);
  return filteredData;
}
self.onmessage = function(event) {
    var req = event.data;
    var resp={};
    if(req.action='filter'){
      var params=req.params;
      resp.action=req.action;
      resp.data=filteredModel(params.data,params.filterBy,params.filterVal)
    }
    self.postMessage(resp);
};
