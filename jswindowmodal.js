$$.require(function(){
  var widget=null;
  $.add={
    tag:'div'
    ,id:'jswindowmodal'
    ,identif:'modal'
    ,display:'flex'
    ,justifyContent:'center'
    ,alignItems:'center'
    ,position:'fixed'
    ,width:'100%'
    ,height:'100%'
    ,transition:'0.5s'
    ,opacity:0
    //--,overflow:'auto'
    ,backgroundColor:'rgba(0,0,0,0.8)'
    ,top:'0px'
    ,left:'0px'
    ,padding:'15px'
    ,zIndex:9998
    ,init:function(){
      widget=this;
    }

    //,textContent:'asdfafdsf'
    ,customProps:{

      addCloseButton:{configurable:true,enumerable:true,writable:true,value:function(child){
        var this_=this;
        var child=this_.jswindowmodal_child;
        this_.myclose.left=child.dom.offsetLeft+child.dom.offsetWidth-15+'px';
        this_.myclose.top=child.dom.offsetTop-15+'px';
        this_.myclose.dom.title='Cerrar'
      }}
      ,resizeListener:{configurable:true,enumerable:true,writable:true,value:function(child){
        this.addCloseButton();
      }}
      ,show:{configurable:true,enumerable:true,writable:true,value:function(child){
        //--this.getParentBy('id','ERPPrincipal').addChild_r(this);

        if(child!==undefined){
          child.innerId='jswindowmodal_child';
          child.boxShadow=' 0px 0px 5px 0px rgba(0,0,0,0.75)';
          this.addChild(child);


          /*this.children[0].maxHeight='100%';
          this.children[0].overflow='auto';*/
          //this.children[0].flexGrow=1;
        }
        $[document.getElementById('body_').children[0].id].addChild_r(this);

        var this_=this;
        window.setTimeout( function() {
            //document.getElementById( 'fade3' ).className += ' fade-in';
            //--$.ERPPrincipal.dom.style.opacity=1;

            console.log(this_.addCloseButton);
            window.addEventListener('resize',this_.resizeListener.bind(this_),false);
            this_.addCloseButton();
            this_.opacity=1;
        }, 50);
        //addChild_r(this);

      }}
      ,close:{configurable:true,enumerable:true,writable:true,value:function(){
        var this_=this;
        this_.opacity=0;
        window.setTimeout( function() {
            //document.getElementById( 'fade3' ).className += ' fade-in';
            //--$.ERPPrincipal.dom.style.opacity=1;
            window.removeEventListener('resize',this_.resizeListener.bind(this_),false);
            this_.delete();
            /*history.replaceState(undefined, undefined, '#'+e.oldURL.split('#')[1]);
            window.history.back(1)*/
            //--window.history.back(1);
        }, 200);
//--        this.delete();
      }}

    }
    ,events:[
      ['click',function(e){
        if(this.id === e.target.id) {
            this.close();
        }
      },true]
    ]
    ,load_r:function(){

    }
    ,children:[
      {
        tag:'div'
        ,innerId:'myclose'
        ,backgroundColor:'#eee'
        ,borderRadius:'15px'
        ,display:'flex'
        ,position:'absolute'
        ,width:'30px'
        ,height:'30px'
        ,border:'solid black 2px'
        ,fontSize:'20px'
        ,textContent:'x'
        ,justifyContent:'center'
        ,alignItems:'center'
        ,zIndex:9999
        ,cursor:'pointer'
        ,title:'Cerrar'
        ,events:[
          ['click',function(){
            widget.close();
          }]
          ,['mouseover',function(){
            this.backgroundColor='white'
          },false]
          ,['mouseout',function(){
            this.backgroundColor='#eee'
          },false]
        ]
      }
    ]
    /*,aliases:[
      ['jswindowProps',function(){return this.children[0]},'assignProps']
    ]
    ,children:[
      {
        tag:'jswindow'
        ,innerId:'jswindowmodal_jswindow'
      }
    ]*/
  }
})
