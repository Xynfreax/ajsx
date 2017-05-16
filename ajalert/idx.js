$$.require(['str'],function() {
  Object.assign($j.ajalert,{
    addEvents:async function() {
      let th=this;
      // alert('msg');
      th.btnaceptar.events=[
        ['click',function() {
          // alert('msg');
          th.close();
        }]
      ]
    }
    ,afterShow:async function() {
      let th=this;
      // alert('msg');
      th.passparameters();

      th.addEvents();
      return true;
    }
  })
})
