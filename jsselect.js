$$.require(function(){
  $.add={
    tag:'select'
    ,id:'jsselect'
    ,value:'input'
    ,height:'25px'
    ,width:'100%'
    ,margin:'5px 0px'
    ,fontSize:'13px'
    ,border:'solid 1px #bbb'
    ,backgroundColor:'#ffffff'
    ,js_over:function(){this.border='solid 1px #2B579A'}
    ,js_out:function(){this.border='solid 1px #bbb'}
    ,events:[
      ['mouseover',function(){this.js_over()},false]
      ,['focus',function(){this.js_over()},false]
      ,['mouseout',function(){this.js_out()},false]
      ,['blur',function(){this.js_out()},false]
      ,['change',function(){
        console.log(this.dom.selectedIndex);
        console.log(this.selectedValue);
      },false]
    ]
    ,flexGrow:1
    ,model:[
      {
        cod_usuario:'1'
        ,usuario:'admin'
      },
      {
        cod_usuario:'2'
        ,usuario:'user'
      }
    ]
    ,customProps:{
      addOption:{configurable:true,enumerable:true,writable:true,
        value:function(){
        }
      }
      ,selectedValue:{configurable:true,
        set:function(v){
          console.log('-en set selectvalue: '+""+v+"");
          //alert(v);
          var mydom=this.dom;
          mydom.value=""+v+"";
        },
        get:function(){
          var mydom=this.dom;
          console.log(mydom.selectedIndex);
          return mydom.value

          // return mydom.options[mydom.selectedIndex].value;
        }
      }
      ,selectedText:{configurable:true,get:function(){
          var mydom=this.dom;
          console.log(mydom.selectedIndex);
          if(mydom.selectedIndex>-1){
            return mydom.options[mydom.selectedIndex].textContent;
          }else{
            return '';
          }

        }
      }
      /*,assignModel:{configurable:true,enumerable:true,writable:true,
        value:function(v,valueTag,displayTag,callback){
          for(var i=this.children.length-1;i>-1;i--){
            this.children[i].delete();
          }
          this._model=v;
          //------
          var rows=this._model;
          for(var i=0;i<rows.length;i++){
            var hijoJson={
              tag:'option'
            }
            //--hijoJson.id='hijo'+i;
            hijoJson.value=rows[i][valueTag];
            hijoJson.textContent=rows[i][displayTag];

            var hijo=crear_objeto_js(hijoJson);
            this.addChild_r(hijo);
          }
          if(callback!==undefined){
            callback();
          }

          //---------

        }
      }*/
    }
    ,assignModel:function(model,valueTag,displayTag,callback){
      var this_=this;
      /*for(var i=this.children.length-1;i>-1;i--){
        this.children[i].delete();
      }*/
      this_.emptyChildren();
      this_._model=model;
      //------
      for(var i=0;i<model.length;i++){
        var hijoJson={
          tag:'option'
        }
        //--hijoJson.id='hijo'+i;
        hijoJson.value=model[i][valueTag];
        hijoJson.textContent=model[i][displayTag];

        var hijo=$f.instanciar(hijoJson);

        this_.addChild_r(hijo);
      }
      //--alert(JSON.stringify(this_._model));
      if(callback!==undefined){
        callback();
      }

      //---------

    }
    ,load_r:function(){

    }

  }
  $.add={
    tag:'label'
  }
})
