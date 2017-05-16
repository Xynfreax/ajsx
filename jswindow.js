$$.require(function(){
  $.add=
  {
    tag:'div'
    ,id:'jswindow'
    ,display:'inline-flex'
    ,flexDirection:'column'
    ,alignItems:'stretch'
    ,fontFamily:'Verdana'
    ,opacity:0
    ,close:function(){
      var this_=this;
      if(this.parent.identif=='modal'){
        this.parent.close();
      }else{
        this.opacity=0;
        window.setTimeout( function() {
            //document.getElementById( 'fade3' ).className += ' fade-in';
            //--$.ERPPrincipal.dom.style.opacity=1;
            this_.delete();
            window.location.hash='';
        }, 200);
        //--this.delete();
        //--window.location.hash='';
      }
    }
    ,customProps:{
      wtipo:{set:function(v){
        if(v=='modal'){
          this.position='fixed';
          this.width='100%';
          this.height='100%';
          this.backgroundColor='rgba(0,0,0,0.8)';
          this.display='flex';
          this.justifyContent='center';
          this.alignItems='center';
          this.zIndex='99999';
          this.wcontentProps=
          {
            position:'relative'
          };
        }
      }}
    }
    ,wAddChild:function(element){
      //alert('llego aqui');
      this.jswindow_content.addChild_r(element);
    }
    ,aliases:[
      ['wcontent',function(){return this.children[1]},'children']
      ,['wcontentProps',function(){return this.children[1]},'assignProps']
      ,['titleBar',function(){return this.children[0]},'assignProps']
    ]
    ,children:[
      {
        tag:'div'
        ,id:'jswindow_title'
        ,position:'relative'
        ,display:'inline-flex'
        ,justifyContent:'center'
        ,alignItems:'center'
        ,backgroundColor:'#31363B'
        ,height:'25px'
        ,children:[
          {
            tag:'jsbutton'
            ,id:'jswindow_title_iconwindow'
            ,display:'inline-flex'
            ,position:'relative'
            ,text:''

            ,height:'90%'
          }
          ,{
            tag:'span'
            ,id:'jswindow_title_text'
            ,flexGrow:1
            ,backgroundColor:'transparent'
            ,color:'white'
            ,display:'inline-flex'
            ,padding:'0px 5px'
            ,textContent:'Title'
          }
          /*
          ,{
            tag:'img'
            ,id:'jswindow_title_iconmin'
            ,display:'inline-flex'

          },{
            tag:'img'
            ,id:'jswindow_title_iconres'
            ,display:'inline-flex'

          },{
            tag:'img'
            ,id:'jswindow_title_iconmax'
            ,display:'inline-flex'

          }
          */
        ]
      }
      ,{
        tag:'div'
        ,id:'jswindow_content'
        ,backgroundColor:'#bbbbbb'
        //--,border:'solid 5px green'
        ,width:'100%'
        //,textContent:'contenido'
        ,position:'relative'
        //--,backgroundColor:'#EDEDED'
        ,flexGrow:'1'
        //,textContent:'asdfsaf'
      }
    ]
    ,load_r:function(){
      var this_=this;
      window.setTimeout( function() {
          //document.getElementById( 'fade3' ).className += ' fade-in';
          //--$.ERPPrincipal.dom.style.opacity=1;
          this_.opacity=1;
      }, 50);

      //this.opacity=1;
    }
  }

})
