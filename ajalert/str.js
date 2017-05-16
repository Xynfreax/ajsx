$$.require(['../ajwindow/idx','../ajbutton/idx','../ajspacer/idx','stl.s'],function() {
  $c.add={
    tag:'ajwindow',
    id:'ajalert',
    title:'Alert',
    showTitleBar:false
    // modal:true,
    ,customProps:{
      message:{set:function(v){
        this.mymessage.textContent=v;

      },configurable:true}
    },
    // aliases:[
    //   // ['message',function() {return this.mymessage},'textContent'],
    //   ['message',function() {return this.mycontent.mymessage},'textContent'],//se tiene que uasr la version larga, toda la direccion
    //   //solo funciona si en ajwindow.loadcontent no se esta usando.
    // ],
    content:[
      {
        tag:'div',
        idf:'mymessage',
        innerId:'mymessage'
      }
    ],
    bcontent:[
      {
        tag:'ajspacer'
      }
      ,{
        tag:'ajbutton'
        ,idf:'btnaceptar'
        ,text:'Aceptar'
        ,autofocus:true
      }
    ]
  }
})
