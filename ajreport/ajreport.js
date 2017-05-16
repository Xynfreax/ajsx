$$.require(['ajreport_e'],function() {
  Object.assign($j.ajreport,{
    // tag:'ajreport'
    // ,id:'ajreport'
    readyPrint:function() {
      window.JSREPORT_READY_TO_START=true
    }
    // ,load_r:function() {
    //   // this.readyPrint();
    // }
  })
})
