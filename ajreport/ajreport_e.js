$$.require(['ajreport.s','../../vista/gfunctions'],function() {
  $c.add={
    tag:'div'
    ,ajmark:'ajreport'
    ,id:'ajreport'
    ,position:'absolute'
    ,border:'solid 1px black'
    ,backgroundColor:'white'
    ,width:'21.0cm'
    ,maxWidth:'21.0cm'
    ,format:'A5'
    // ,width:'100%'
    // ,maxWidth:'100%'
    ,height:'29.7cm'
    ,display:'flex'
    ,flexDirection:'column'
    ,padding:'0cm'
    ,hasFooter:false
    ,hasHeader:false
    ,children:[
      {
        tag:'div'
        ,textContent:'header'
        ,height:'2cm'
        ,innerId:'myheader'
        ,border:'solid 1px black'
        ,display:'none'
      }
      ,{
        tag:'div'
        ,position:'relative'
        ,display:'inline-block'
        // ,textContent:'body'
        ,innerId:'mycontent'
        ,classN:'rcontent'
        ,border:'solid 1px black'
        //--,width:'10cm'
        ,width:'100%'
        //,margin:'1cm'
        //,maxWidth:'10cm'
        ,flexGrow:1
        // ,textContent:'un pdf'
      }
      ,{
        tag:'div'
        ,textContent:'footer'
        ,innerId:'myfooter'
        ,border:'solid 1px black'
        ,display:'none'
      }
      // ,{
      //   tag:'div'
      //   ,position:'absolute'
      //   ,textContent:'asdf'
      //   ,backgroundColor:'black'
      //   ,border:'solid 1px black'
      //   ,top:'-10px'
      // }
    ]
    ,aliases:[
      ['content',function(){return this.mycontent},'children']
      //,['jscontent_',function(){return this},'mycontent']
      ,['header',function(){return this.myheader},'textContent']
      //,['jsheader_',function(){return this},'myheader']
      ,['footer',function(){return this.myfooter},'textContent']
      //,['jsfooter_',function(){return this},'myfooter']
    ]
    ,init:function(){
      /*var wParams=$_.getHashParams();
      if(wParams.printing==true){
        this.myheader.display='none';
        this.myfooter.display='none';
      }*/
    }
    ,load_r:function(){
      // alert(this.children.length);

      var wParams=$_.getHashParams();
      //console.log('DEMO: '+wParams.demo);
      if(wParams.print=='true' && wParams.demo!=='true'){
        //alert('en demooo');
        //alert('msg');
        this.border='none';
        this.mycontent.border='initial';
        this.myheader.display='none';
        this.myfooter.display='none';
      }
    }

  }
})
