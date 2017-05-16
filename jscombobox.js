$$.require(['globalFunciones'],function(){
  var widget=null
  $.add=
  {
    tag:'div'
    ,id:'jscombobox'
    ,border:'solid 1px blue'
    ,width:'300px'
    ,height:'30px'
    ,margin:'5px'
    ,position:'relative'
    ,change:function(){}
    ,init:function(){
      widget=this;
    }
    ,events:[
      //--['click',function(){alert(JSON.stringify(this.getSelectedRow()));},false]
    ]
    ,aliases:[
      ['jsvalue',function(){
        return this.myinput.dom;
      },'value']
    ]
    ,customProps:{
      addOption:{configurable:true,enumerable:true,writable:true,
        value:function(){
        }
      }
      ,getSelectedRow:{configurable:true,enumerable:true,writable:true,
        value:function(){
          var returned=null;
          var mydom=this.mybox.myselect.dom;
          if(mydom.selectedIndex>-1){
            returned=this.temp_model[mydom.selectedIndex];
          }
          return returned;
        }
      }
      ,selectedValue:{configurable:true,
        get:function(){
          var mydom=this.mybox.myselect.dom;
          return mydom.options[mydom.selectedIndex].value;
        }
      }
      ,selectedText:{configurable:true,get:function(){
          var mydom=this.mybox.myselect.dom;
          return mydom.options[mydom.selectedIndex].textContent;
        }
      }

    }
    ,model:[
      {cod:1,val:'cliente1'}
      ,{cod:2,val:'cliente2'}
      ,{cod:3,val:'cliente3'}

    ]
    ,children:[
      {
        tag:'input'
        ,type:'text'
        ,innerId:'myinput'
        ,position:'relative'
        ,border:'solid 1px green'
        ,width:'100%'
        ,height:'100%'
        ,focused:false
        ,readOnly:'true'
        ,openbox:function(e){
          console.log(e.type);
          var box=this.parent.mybox;
          if(box.opened!==true){
            this.parent.mybox.display='block';
            this.parent.mybox.top=this.parent.myinput.dom.offsetHeight+'px';
            this.parent.mybox.myinput.value='';
            this.parent.mybox.myinput.dom.focus();
            box.opened=true;
          }else{
            this.parent.mybox.display='none';
            box.opened=false;
            console.log('en el false');
            console.log('____________-');
          }
        }
        ,events:[
          ['input',function(e){

            //e.preventDefault();


          },true]
          ,['focus',function(e){
            this.focused=true;
            this.openbox(e);
          },false]
          ,['blur',function(e){
            this.focused=false;
          },false]
          ,['mousedown',function(e){
            if(this.focused==true){
              this.openbox(e);
              e.preventDefault();
            }
          },false]
          ,['keypress',function(e){
            if(e.keyCode==40){
              if(this.focused==true){
                this.openbox(e);
                e.preventDefault();
              }
            }

          },false]

        ]

      }
      ,{
        tag:'div'
        ,innerId:'mybox'
        ,position:'absolute'
        //,top:'30px'
        ,width:'auto'
        ,display:'none'
        ,border:'solid 3px yellow'
        ,backgroundColor:'white'
        ,padding:'5px'
        ,zIndex:'999'
        ,opened:false
        ,events:[
           //--['blur',function(){alert('blur')},false]
           //--,['focus',function(){console.log('focus')},false]
        ]
        ,children:[
          {
            tag:'input'
            ,type:'text'
            ,innerId:'myinput'
            ,border:'solid 1px blue'
            ,width:'100%'
            ,customProps:{
              input:{configurable:true,enumerable:true,writable:true,value:function(){
                //alert('inputtt');
                //this.parent.mybox.display='block';
                //this.value='';
                var str=this.dom.value;
                var newModel=this.parent.parent.find.bind(this.parent.parent)(this.parent.parent.model,str);
                this.parent.parent.assignModelTemp(newModel);
                //--this.parent.parent.temp_model=newModel;

                }
              }
            }
            ,events:[
              ['input',function(e){
                this.dom.value=this.dom.value.toUpperCase();
                this.input();
              },false]
              ,['keypress',function(e){
                  var sele=this.parent.myselect;
                  var modelLength=sele.children.length;
                  if(modelLength>1){
                    if(e.keyCode==40){
                      console.log('down');
                      if(sele.selectedIndex<modelLength-1){
                        sele.selectedIndex=sele.dom.selectedIndex+1;
                      }

                    }
                    if(e.keyCode==38){
                      console.log('up');
                      if(sele.selectedIndex>0){
                        sele.selectedIndex=sele.dom.selectedIndex-1;
                      }

                    }

                  }else{
                    console.log(modelLength);
                  }
                  if(e.keyCode==13){
                    this.dom.blur();
                  }


                },false
              ]
              ,['focus',function(){
                this.input();
                this.parent.myselect.selectedIndex=this.parent.myselect.selectedI;
              },false]
              ,['blur',function(){
                //alert('blur');
                //--this.parent.parent.mybox.display='none';
                var inpu=this.parent.parent.myinput;
                inpu.dom.focus();
                var sele=this.parent.myselect;
                if(sele.selectedIndex>-1){
                  //--->inpu.value=sele.children[sele.selectedIndex].textContent;
                  inpu.value=sele.dom.options[sele.selectedIndex].textContent;
                  sele.selectedI=sele.selectedIndex;
                }
              },false]
            ]
          }
          ,{
            tag:'select'
            ,innerId:'myselect'
            ,width:'auto'
            ,minWidth:'100%'
            ,multiple:'true'
            ,border:'solid 1px blue'
            ,selectedI:0
            ,events:[
              ['mousedown',function(e){
                var inpu=this.parent.myinput;
                //-inpu.value=e.target.textContent;
                var actsele=e.target;
                this.selectedIndex=$[e.target.id].indice;
                this.selectedI=this.selectedIndex;
                inpu.dom.blur();
                e.preventDefault();

              },false]
              ,['mousedown',function(e){
                widget.change();
              },false]
            ]

            ,load_r:function(){

            }
          }
        ]
      }


    ]
    ,find:function(model,str){
      var newModel=[];
      for(var i=0;i<model.length;i++){
        var actMItem=model[i];
        if(actMItem[Object.keys(actMItem)[1]].includes(str)){
          console.log('INCLUYE');
          newModel.push(actMItem);
        }
      }
      return newModel;
    }
    ,assignModelTemp:function(model){
      this.temp_model=model;

      var sele=this.mybox.myselect;
      sele.emptyChildren();
      var this_=this;
      for(var i=0;i<model.length;i++){
        var actMItem=model[i];
        var newOpt=$f.instanciar({tag:'option',value:actMItem[Object.keys(actMItem)[0]],textContent:actMItem[Object.keys(actMItem)[1]]});
        sele.addChild_r(newOpt);
      }
      if(model.length>0){
        sele.selectedIndex=0;
      }
    }
    ,assignModel:function(model){
      this.model=model;
      this.assignModelTemp(model)
    }
    ,load_r:function(){
      //alert('combo box antes');
      console.log('------ANTES');
      console.log(this);
      console.log(this.classN);
      this.assignModel(this.model);
    }
  }
})
