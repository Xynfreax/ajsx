$$.require(['globalFunciones'],function(){
  var jscheckselect_chk_inner_json={
    tag:'input'
    ,type:'checkbox'
    ,innerId:'mycheck'
    ,events:[
      ['click',function(e){
        function findInModel(model,field,value){
          var returnedRow=null;
          for(var i=0;i<model.length;i++){
            var actRow=model[i];
            if(actRow[field]==value){
              returnedRow=actRow;
              break;
            }
          }
          return returnedRow;
        }
        var jscheckselect_=this.parent.parent.parent;
        model_=jscheckselect_.model;

        if(this.dom.checked==true){
          findInModel(model_,'val',this.dom.value)['checked']=true;
        }else{
          findInModel(model_,'val',this.dom.value)['checked']=false;
        }
      },false]
    ]
  }
  var jscheckselect_chk_json={
    tag:'label'
    ,id:'jscheckselect_chk'
    ,width:'auto'
    ,aliases:[
      ['jstext',function(){return this.mytext},'textContent']
    ]
    ,events:[
      ['mousedown',function(e){
        e.stopPropagation();
      },false]
    ]
    ,children:[
      jscheckselect_chk_inner_json
      ,{
        tag:'div'
        ,innerId:'mytext'
        ,textContent:''
      }
    ]
  }
  var jscheckselect_opt_json=Object.assign({},jscheckselect_chk_json);
  jscheckselect_opt_json.id='jscheckselect_opt';
  jscheckselect_opt_inner_json=Object.assign({},jscheckselect_chk_inner_json);
  jscheckselect_opt_inner_json.tag='radio'
  //jscheckselect_opt_json.children[0]=jscheckselect_opt_inner_json;
  $.add=jscheckselect_chk_json;
  $.add=jscheckselect_opt_json;
  $.add=
  {
    tag:'div'
    ,id:'jscheckselect'
    ,jstype:'checkbox'
    ,selectAll:function(){
      for (var i=0;i<this.mybox.children.length;i++){
        var actCheckBox=this.mybox.children[i];
        if(actCheckBox.dom.checked!==true){
          actCheckBox.dom.click();
        }
      }

    }
    ,aliases:[
      ['jstext',function(){
        return this.myhead.mytext
      },'textContent']
    ]
    ,model:[
      {val:'colA',text:'columna a'}
      ,{val:'colB',text:'cola b'}
    ]
    ,children:[
      {
        tag:'div'
        ,innerId:'myhead'
        ,minWidth:'100%'
        ,width:'100%'
        ,position:'relative'
        ,display:'flex'
        ,children:[
          {
            tag:'div'
            ,innerId:'mytext'
            ,flexGrow:1
            ,padding:'0px 5px'
            ,textContent:'filtrar por'
          }
          ,{
            tag:'div'
            ,innerId:'myimg'
            ,color:'transparent'
            ,minHeight:'100%'
            ,width:'15px'
            ,position:'relative'
            ,top:'0px'
            ,height:'100%'
            //,right:'1px'
            ,backgroundPosition:'center'
            ,backgroundSize:'60%'
            ,backgroundImage:'url(vista/icons/arrow-down-black.png)'
            ,backgroundRepeat:'no-repeat'
            //,border:'solid 1px grey'
            ,textContent:'_'

          }
        ]
      }
      ,{
        tag:'div'
        ,innerId:'mybox'
        ,display:'none'
        ,children:[

        ]
      }

    ]
    ,tabIndex:-1
    ,inprocessBlur:false
    ,events:[
      ['click',function(e){
        //alert('msg');

        var this_=this;
        var mybox_=this_.mybox;

        if(this_.myhead.dom.contains(e.target)){
          if(mybox_.display=='none'){
            mybox_.display='block'
          }else {
            mybox_.display='none'
          }
          console.log(e.target.id);
          console.log('click in blue');
        }


      },false]

    ]
    ,load_r:function(){
      var this_=this;

      this.assignModel(this.model);
      document.body.addEventListener('click',function(e){
        var isClickInside = this_.dom.contains(e.target);
        if (!isClickInside) {
          this_.mybox.display='none';
        }

      },false);


    }
    ,assignModel:function(model){
      this.model=model;
      console.log(model);
      var mybox_=this.mybox;
      mybox_.emptyChildren();
      for(var i=0;i<model.length;i++){
        var actItem=model[i];
        if(actItem.checked==undefined){
          actItem.checked=false;
        }
        if(this.jstype=='checkbox'){
          var newCheckB=$f.instanciar({tag:'jscheckselect_chk'});
          newCheckB.mycheck.value=actItem.val;
          newCheckB.mytext.textContent=actItem.text;
          mybox_.addChild_r(newCheckB);
        }else if(this.jstype=='radio'){
          var newCheckB=$f.instanciar({tag:'jscheckselect_opt'});
          newCheckB.mycheck.value=actItem.val;
          newCheckB.mytext.textContent=actItem.text;
          mybox_.addChild_r(newCheckB);
        }

      }
    }
  }
})
