$$.require(function(){
  $.add={
    tag:'div'
    ,id:'jsgroupboxtitle'
    ,innerId:'jsgroupbox_title'
    ,position:'relative'
    ,height:'30px'
    ,fontWeight:'bold'
    ,backgroundColor:'#EEEEEE'
    ,display:'flex'
    ,alignItems:'center'
    ,padding:'0px 5px'
    ,borderBottom:'solid 1px grey'
    ,overflow:'hidden'
    ,width:'100%'
    ,minWidth:'100%'
    /*,top:'-10px'
    ,left:'-5px'*/
    ,textContent:''
  }
  $.add=
  {
    tag:'div'
    ,id:'jsgroupbox'
    //--,border:'solid 1px #BBB'
    ,position:'relative'
    ,maxWidth:'100%'
    ,width:'100%'
    //--,padding:'10px'
    ,margin:'5px 0px'
    ,marginTop:'10px'
    ,flexDirection:'column'
    ,backgroundColor:'#EEEEEE'
    ,border:'solid 1px gray'
    ,borderRadius:'3px'
    ,display:'flex'
    ,height:'auto'
    ,overflow:'hidden'

    //--,alignItems:'stretch'
    ,aliases:[
      ['jstitle',function(){return this.jsgroupbox_title},'textContent']
      ,['content',function(){return this.jsgroupbox_content},'children']
      ,['jscontent',function(){return this.jsgroupbox_content},'children']
      ,['content_',function(){return this},'jsgroupbox_content']
      ,['contentProps',function(){return this.jsgroupbox_content},'assignProps']
    ]
    ,children:[
      {
        tag:'jsgroupboxtitle'
        ,innerId:'jsgroupbox_title'
        ,position:'relative'
        ,height:'30px'
        ,fontWeight:'bold'
        ,backgroundColor:'#EEEEEE'
        ,display:'flex'
        ,alignItems:'center'
        ,padding:'0px 5px'
        ,borderBottom:'solid 1px grey'
        ,overflow:'hidden'
        ,width:'100%'
        ,minWidth:'100%'
        /*,top:'-10px'
        ,left:'-5px'*/
        ,textContent:''
      }
      ,{
        tag:'div'
        ,innerId:'jsgroupbox_content'
        ,display:'block'
        ,position:'relative'
        //--,flexGrow:1
        ,maxWidth:'100%'
        ,padding:'10px'
        ,backgroundColor:'rgb(250,250,250)'

        //,textContent:'sfasd'
      }
    ]
  }
})
