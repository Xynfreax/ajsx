$$.require(['jsbutton','jsinput','globalFunciones'],function(){
  var me=null;
  $.add={
    tag:'div'
    ,id:'jsgridtable'
    ,backgroundColor:'white'
    ,modo:'supercombo'//normal
    ,plantilla:[
      {sName:'Descripcion',val:'--',name:'descripcion',foot:'Total:'}//foot puede ser un valor o una funcion
      ,{sName:'Monto',val:0.00,name:'monto',foot:function(jsgt,model){return jsgt.sumarMonto(model,'monto')}}
      ,{sName:'--',obj:{tag:'jsbutton',text:'Cambiar',foot:''}}
      ,{sName:'--',obj:{tag:'jsbutton',text:'Eliminar',foot:''}}
    ]
    ,model:[
      {id:1,descripcion:'Cuota 1',monto:12.00}
      ,{id:1,descripcion:'Cuota 2',monto:14.00}
    ]
    ,load_r:function(){
      me=this;
      if(this.model.length>0){

        this.assignModel(this.model);
      }
    }
    ,assignModel:function(model){
      var this_=this;
      var mytable=this.mytable
      var mythead=this.mytable.mythead;
      var mytbody=this.mytable.mytbody;
      var mytfoot=this.mytable.mytfoot;
      var plantilla=this.plantilla;
      //'agregamos el thead'
      var newTrH=$f.instanciar({tag:'tr'});
      for(var i=0;i<plantilla.length;i++){
        var actItem=plantilla[i];
        var newTh=$f.instanciar({tag:'th',border:'solid 1px black'});
        newTrH.addChild_r(newTh);
        newTh.textContent=actItem.sName;
      }
      mythead.addChild_r(newTrH);

      //rellenamos el tbody
      for(var i=0;i<model.length;i++){
        var newTrB=$f.instanciar({tag:'tr'});
        var actReg=model[i];
        for(var ii =0;ii<plantilla.length;ii++){
          var actItemPlan=plantilla[ii];
          var newTd=$f.instanciar({tag:'td',border:'solid 1px black'});
          newTrB.addChild_r(newTd);
          if(actItemPlan.obj!==undefined){
            newTd.addChild_r($f.instanciar(actItemPlan.obj));
          }else if(actReg[actItemPlan.name]!==undefined){
            var fReturn=function(){return actReg[actItemPlan.name];}
            newTd.addChild_r($f.instanciar({tag:'input',type:(actItemPlan.typ!==undefined?actItemPlan.typ:'text'),value:fReturn()}) );
          }else{
            newTd.addChild_r($f.instanciar({tag:'input',type:(actItemPlan.typ!==undefined?actItemPlan.typ:'text'),value:actItemPlan.val}) );
          }
        }
        mytbody.addChild_r(newTrB);
      }

      //rellenamos el tfoot
      var newTrF=$f.instanciar({tag:'tr'});
      for(var i=0;i<plantilla.length;i++){
        var actItem=plantilla[i];
        var newTf=$f.instanciar({tag:'td',border:'solid 1px black'});
        newTrF.addChild_r(newTf);
        if(get_type(actItem.foot)==4){
          newTf.textContent=actItem.foot(this_,model);
        }else{
          newTf.textContent=actItem.foot;
        }

      }
      mytfoot.addChild_r(newTrF);



    }
    ,sumarMonto:function(model,field){
      var returned=0.00;
      for(var i=0;i<model.length;i++){
        var actReg=model[i];
        returned+=actReg[field];
      }
      return returned;
    }
    ,children:[
      {
        tag:'jsinputh'
        ,label:'Seleccionado'
      }
      ,{
        tag:'jsinputh'
        ,label:'Buscar'
        ,typingTimer:null                //timer identifier
        ,doneTypingInterval:1000
        ,events:[
          ['keydown',function(e){
            var this_=this;
            var inp=this.children[0];
            var val=this.value;

            clearTimeout(this_.typingTimer);
             if (val) {
                 this_.typingTimer = setTimeout(this_.doneTyping, this_.doneTypingInterval);
             }

          },false]
        ]
        ,doneTyping:function(){
          //aqui buscamos
          console.log('termine tipear');
        }
      }
      ,{
        tag:'table'
        ,innerId:'mytable'
        ,children:[
          {
            tag:'thead'
            ,innerId:'mythead'
          }
          ,{
            tag:'tbody'
            ,innerId:'mytbody'
          }
          ,{
            tag:'tfoot'
            ,innerId:'mytfoot'
          }
        ]
      }
    ]
    //,myqmodel:'qTipoComprobante'
  }
})
