$$.require(['ajcheckoptiongroup_e','../globalFunciones','../../vista/gfunctions'],function() {
  $.add={
    tag:'ajcheckoptiongroup_e'
    ,id:'ajcheckoptiongroup'
    ,type:'checkbox'
    ,model:[
      {id:1,nombre:'asdfasdf'}
    ]
    ,addEvents:function() {
      let th=this;
      th.events=[
        ['dblclick',function(e) {
          th.seleccionartodo();
        }]
      ]
    }
    ,seleccionartodo:function() {
      let th=this;
      if(!th.allselected){
        for (var i = 0; i < th.model.length; i++) {
          th.model[i].seleccionado=true;
        }
        th.allselected=true;
      }else{
        for (var i = 0; i < th.model.length; i++) {
          th.model[i].seleccionado=false;
        }
        th.allselected=false;
      }

    }
    ,amodel:function(model_) {
      let th=this;
      let model=model_;
      if(model==undefined){
        model=th.model;
      }
      if(model==undefined){
        model=[];
      }
      th.emptyChildren();
      for (var i = 0; i < model.length; i++) {
        let actItem=model[i];
        //--actItem.seleccionado=false;
        let keys=Object.keys(actItem);
        let inpAo=$f.instanciar({
          tag:'ajinputlabel',
          value:actItem[keys[0]],
          text:actItem[keys[1]],
          checked:actItem[th.field||false],
          classN:(th.alone?'alone':''),
          iprops:{
            type:th.type
          }
          ,load_r:function() {
            let thl=this;
            Object.defineProperty(actItem, fieldToUse, {
              get: function() { return /*this.checked;*/thl.checked; },
              set: function(v) { thl.checked = v; },
              enumerable: true,
              configurable: true
            });
          }
        });
        let fieldToUse='seleccionado';

        // if(th.alone){
        //   inpAo.classList.add('alone');
        // }
        th.addChild_r(inpAo)
      }
      th.model=model;
    }
    ,aqmodel:async function(query_,queryparams_) {
      let th=this;
      let model=th.model;
      if(query_!==undefined){
        let resp=await $_.query(query_,queryparams_||{});
        model=resp.data;
      }

      th.amodel(model);
    }
    ,load_r:function() {
      // this.aqmodel('listaRequisitosxmodalidadingreso',{fk_modalidadingreso:1});
      this.addEvents();
      this.aqmodel();
    }
  }
})
