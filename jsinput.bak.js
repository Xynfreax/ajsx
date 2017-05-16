$$.require(/*['jsselect'],*/ function(){
  $.add=
  {
    tag:'input'
    ,id:'jsradio'
    ,type:'radio'
    ,display:'inline-block'
    ,position:'relative'
  }

  $.add={
    tag:'label'
    ,id:'jsinput'
    //,border:'solid 1px red'
    ,position:'relative'
    //--,display:'flex'
    ,justifyContent:'flex-end'
    ,alignItems:'top'
    /*,marginTop: '5px'
    ,marginBottom: '5px'
    ,marginLeft: '5px'
    ,marginRight: '5px'*/
    ,customProps:{
      tipo:{configurable:true,writable:true,enumerable:false,value:''}
      ,value:{set:function(v){
        this.children[1].dom.value=v;
      },get:function(){
        return this.children[1].dom.value;
      },configurable:true}
    }
    ,aliases:[
      //['input',function(){return this.children[1]},'assignProps'],
      ['label',function(){return this.children[0]},'textContent']
      //----,['value',function(){return this.children[1].dom},'value']
      //--,['jstype',function(){return this.children[1].dom},'type']
      //--,['inputProps',function(){return this.children[1]},'assignProps']
      ,['labelProps',function(){return this.jslabel_},'assignProps']
    ]
    ,events:[
      ['click',function(e){
        if($[e.target.id]!==undefined && $[e.target.id].tag=='jsradiossdf'){
          var actRadio=$[e.target.id];
          var parent_=this.parent;
          for(var i=0;i<parent_.children.length;i++){
            var actChild=parent_.children[i];
            if(actChild.tag=='jsinput' && actChild.tipo=='radio'){
              actChild.children[1].dom.checked=false;
            }
          }
          actRadio.checked=true;
        }


      },false]
    ]
    //--,anteInit:function(){
    ,init:function(){
      //----init jsinput_lg
      console.log('---------------------------------INIT JSINPUT');


      var jsinput_={
        tag:'input'
        ,type:'text'
        ,value:''
        ,height:'25px'
        ,fontSize:'13px'
        ,border:'solid 1px #bbb'
        ,borderRadius:'3px'
        ,display:'block'
        ,width:'100%'
        ,margin:'5px 0px'
        //,width:'200px'//---
        ,flexGrow:1
        ,js_over:function(){this.border='solid 1px #2B579A'}
        ,js_out:function(){this.border='solid 1px #bbb'}
        ,events:[
          ['mouseover',function(){this.js_over()},false]
          ,['focus',function(){this.focus=true;this.js_over()},false]
          ,['mouseout',function(){if(this.focus!==true){this.js_out()}},false]
          ,['blur',function(){this.focus=false;this.js_out()},false]
        ]
        /*,aliases:[
          ['inputProps',function(){return this.children[1]},'assignProps']
          ,['labelProps',function(){return this.children[0]},'assignProps']
        ]*/
      }
      //alert(this.tipo);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log(this.dom);
      if(this.tipo=='select'){
        console.log('=====SELECT');
///--        this.addChild_r(heredar_de($.jsselect,{}),1);
        this.addChild_r($f.instanciar({tag:'jsselect'}));
        console.log('here');
        console.log(this.children[1].dom);
      }else if(this.tipo=='input'){
console.log('=====SELECT');
        this.addChild_r(crear_objeto_js(jsinput_),1);
        console.log('here');
        console.log(this.children[1].dom);
      }else if(this.tipo=='radio'){
        console.log('=====SELECT');
        this.jslabel_.display='inline-block';
        this.addChild_r($f.instanciar({tag:'jsradio'}));
        console.log('here');
        console.log(this.children[1].dom);
      }else{
        console.log('=====otro');
        console.log(this.tipo);
          this.addChild_r(crear_objeto_js(jsinput_),1);
      }

      var aliases=[
        ['inputProps',function(){return this.children[1]},'assignProps']
        //-----,['labelProps',function(){return this.children[0]},'assignProps']
      ];
      console.log('here');
      console.log(this.children[1].dom);
      /*--Object.defineProperties(this,{
        inputProps:{set:function(v){
          if(this._inputProps!==undefined){
            this._inputProps==Object.assign(Object.create(this._inputProps),v);
          }else{
            this._inputProps=v;
          }
        },get:function(){
          return this._inputProps;
        },configurable:true}
      });
      */
      definirAliases(aliases,this);
      console.log('here');
      console.log(this.children[1].dom);
      if(this.json_l.inputProps!==undefined){
        //console.log('_____');
        //console.log(this.json_l.inputProps);
        //console.log('_____');
        //-----this.inputProps=this.json_l.inputProps;
      }


      /*---if(this.json_l.labelProps!==undefined){
        this.children[0].assignProps=this.json_l.labelProps;
      }*/
      console.log('here');
      console.log(this.children[1].dom);
      console.log(this);
      console.log(this.dom);
      console.log(this.children[0].dom);
      console.log(this.children[1]);
      console.log(this.children[1].dom);
      console.log('---------------------------------FIN INIT JSINPUT');

    }
    ,load_r:function(){
      if(this.jstype!==undefined){
        this.children[1].dom.type=this.jstype;
      }
      if(this.jsvalue!==undefined){
        this.children[1].dom.value=this.jsvalue;
      }
      if(this.jstabindex!==undefined){
        this.children[1].tabIndex=this.jstabindex;
      }
    }
    ,children:[
      {
        tag:'span'
        ,textContent:'adfasdfvvvaaaaaaasdsd asdf ad asdf '
        //,maxWidth:'100px'
        ,display:'block'
        ,margin:'auto 0px'
        ,wordWrap:'break-word'
        ,innerId:'jslabel_'
        //,border:'solid 1px green'
        ,textAlign:'left'
        //--,marginRight:'5px'
      }

    ]

  }
  $.add={
    tag:'jsinput'
    ,id:'jsinputh'
    //--,label:''
    ,display:'flex'
    //--,flexDirection:'row'
    ,labelProps:{
      display:'inline-flex'
      ,textAlign:'right'
      ,justifyContent:'flex-end'
      ,paddingRight:'10px'
      //,border:'solid 1px green'
      ,width:'160px'
    }
    ,inputProps:{

      display:'inline-block'
      ,width:'auto'
      ,maxWidth:'100%'
      ,flexGrow:1
      //--,backgroundColor:'green'
      //,border:'solid 1px green'
    }
    ,tipo:'input'
  }


})
