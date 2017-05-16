$$.require(['../globalFunciones','str'],function() {
  Object.assign($j.ajselect,{
    // tag:'ajselect_e'
    // ,id:'ajselect'
    // ,model:[
    //   {a:'a',aa:'aa'}
    //   ,{a:'b',aa:'bb'}
    // ]
    // ,load_r:function() {
    //   this.amodel();
    // }
    customProps:{
      textvalue:{set:function(v){
        this.dom.options[this.dom.selectedIndex].text=v;
      },
      get:function() {
        return this.dom.options[this.dom.selectedIndex].text;
      }
      ,configurable:true}
    }
    ,getSelectedRow:function() {
      var th=this;
      var rt={};
      if(th.model){
        for (var i = 0; i < th.model.length; i++) {
          var actRow=th.model[i];
          // alert(JSON.stringify(actRow));
          // alert(th.value);
          //alert(actRow[th.value]);
          if(actRow[ Object.keys(actRow)[0] ]==[th.value]){
            rt=actRow;
            break;
          }
          // for(var k in actRow){
          //   if(actRow[k]==th.value){
          //     rt=actRow;
          //     // alert('heres')
          //   }
          // }

        }

      }

      // console.log('EN AJ SELECT: ',rt);
      // console.log('th.model: ',th.model);
      // console.log('th.value: ',th.value);
      return rt

    }
    ,aqmodel:async function(query_,params_){
      // alert('asdfasdf');
      var th=this;
      var params=params_;

      if(params==undefined){
        params=th.qparams
      }
      if(params==undefined){
        params={}
      }
      let resp=null;
      let query=query_;
      if(query==undefined){
        query=th.qmodel;
      }
      if(query!==undefined){
        resp=await $_.query(query,params);
        if(resp.data.length>0 && Object.keys(resp.data[0]).length>=2){
          th.model=resp.data;
          // th.amodel();
          // return th.value;
        }else{
          throw null;
        }
      }
      // setTimeout(function() {
      //   th.amodel();
      // },0)
      th.amodel();
      return th.value;




    }
    ,amodel:function(model_) {
      // alert(JSON.stringify(model_));
      var th=this;
      var model=model_;
      if(model==undefined){
        model=th.model;
      }
      if(model!==undefined){
        th.model=model;
        th.emptyChildren();
        // alert('msg');
        if(th.firstValue){
          model.unshift({id:null,nombre:th.firstValue});
        }
        for (var i = 0; i < model.length; i++) {
          var actItem=model[i];
          var actItem_keys=Object.keys(actItem);
          var optionAo=$f.instanciar({tag:'option',value:actItem[actItem_keys[0]] ,textContent:actItem[actItem_keys[1]]});
          th.addChild_r(optionAo);
        }
      }else{
        // alert('asdf');
      }
      if(th.changeonreload!==false){
        // alert('msg');
        // triggerEvent(th,'change');
      }

    }
    ,load_r:function() {
      var th=this;
      th.aqmodel();
    }
  })
})
