$$.require(function(){
  $.add={
    tag:'a'
    ,id:'jsbutton'
    ,tabIndex:0
    //--,href:'#b'
    ,textDecoration:'none'
    ,cursor:'pointer'
    ,position:'relative'
    ,overflow:'hidden'
    ,margin:'5px'
    //,padding:'0px'
    //,backgroundColor:'yellow'
    ,cursor:'pointer'
    ,backgroundColor:'#FAFAFA'
    ,hoverBackgroundColor:'#F3F4F5'
    ,textAlign:'center'
    ,display:'inline-flex'
    ,justifyContent:'center'
    ,alignItems:'center'
    ,width:'auto'
    ,padding:'5px'
    ,color:'black'
    ,borderRadius:'3px'
    ,border:'solid 1px rgba(0,0,0,0.3)'
    //-,height:'100px'
    ,aliases:[
      ['text',function(){return this.children[0].children[1]},'textContent'],
      ['jstext',function(){return this.children[0].children[1]},'textContent'],
      ['iconUrl',function(){return this.children[0].children[0]},'src'],
      ['iconSize',function(){return this.children[0].children[0]},'width']
      ,['iconDirection',function(){return this.children[0]},'flexDirection']
      ,['jstype',function(){return this.children[0]},'flexDirection']
    ]
    ,events:[
      ['mouseover',function(){
        //--this.backgroundColor='#C3D6F2'
        this.ant_backgroundColor=this.dom.style.backgroundColor;
        this.backgroundColor=this.hoverBackgroundColor;
      },false]
      ,['mouseout',function(){
        this.backgroundColor=this.ant_backgroundColor;
        /*if(this.states.initial.backgroundColor!==undefined){
          var color_inicial=this.states.initial.backgroundColor;
          console.log('|'+color_inicial+'|');
          this.backgroundColor=color_inicial;
        }
        */

      },false]
      ,['click',function(e){
        var this_=this;
        if(this.enterclick!==undefined){
          this.enterclick(e);
        }
        if(this_.jstype=='submit'){
          //this_.dom.submit();
          /*-----console.log('submit');
          var parentform=this.getParentBy('real_tag','form');
          console.log(parentform.id);
          parentform.dom.submit()*/
          /*this_.hiddenSubmit.disabled=false;
          this_.hiddenSubmit.dom.click();
          this_.hiddenSubmit.disabled=true;*/
        }else if(this.jstype=='close'){
          var parentform=this.getParentBy('real_tag','form');
          parentform.close()
        }
        //e.preventDefault();
        //this.children[0].dom.click();
      },false]
      ,['keypress',function(e){

        if(e.keyCode==13){
          if(this.enterclick!==undefined){
            this.enterclick(e);
          }
          this.hiddenSubmit.dom.click();
          if(this.jstype=='close'){
            var parentform=this.getParentBy('real_tag','form');
            parentform.close()
          }
        }

      },false]
    ]
    ,children:[
      {
        tag:'span'
        ,id:'jsbutton_inner'
        ,position:'relative'
        //,margin:'auto'
        ,display:'flex'

        //,maxWidth:'100%'
        ,alignItems:'center'
        ,justifyContent:'center'

        ,flexDirection:'row'
        //,position:'absolute'
        ,width:'100%'
        ,height:'100%'

        ,overflow:'hidden'

        //,textContent:'asfdasf'
        ,children:[
          {
            tag:'img'
            ,id:'jsbutton_icon'
            ,position:'relative'
            ,display:'inline-block'
            //--,src:'framework/photo3.jpg'
            //,width:'20px'
            ,height:'100%'
            ,flexGrow:'1'
            //,paddingRight:'0px'
          }
          ,
          {
            tag:'span'
            ,id:'jsbutton_text'

            ,position:'relative'
            //--,overflow:'hidden'
            //--,border:'solid 1px yellow'
            ,wordWrap:'break-word'
            //,margin:'auto'
            ,flexGrow:'1'
            ,textContent:'button'
          }
        ]
      }
      ,{
        tag:'input'
        ,innerId:'hiddenSubmit'
        ,position:'absolute'
        ,top:'0px'
        ,left:'0px'
        ,width:'100%'
        ,height:'100%'
        ,type:'submit'
        ,backgroundColor:'green'
        ,display:'none'
        ,opacity:0
        ,disabled:true
        ,tabIndex:-1
        ,events:[
          ['click',function(e){
            /*var parentform=this.getParentBy('real_tag','form');
            console.log(parentform.id);*/
            //alert(this.dom.form.id);
            //---alert('enviando');
            //e.preventDefault();
            console.log('--submiteando--');
          },false]

        ]
      }

    ]
    ,load_r:function(){
      var this_=this;
      var parentform=this.getParentBy('real_tag','form');
      if(this.jstype=='submit'){

        /*if(parentform!==undefined && parentform!==null){
          parentform.dom.addEventListener('submit',function(e){

          },false)
        }*/
        this_.hiddenSubmit.disabled=false;
        this_.hiddenSubmit.display='block';
        //--this_.hiddenSubmit.dom.click();
        //--this_.hiddenSubmit.disabled=true;
        /*--this.dom.addEventListener('click',function(e){
          if(this_.jstype=='submit'){
            parentform.dom.submit();
            console.log('submit');
            //this_.hiddenSubmit.disabled=false;
            //this_.hiddenSubmit.dom.click();
            //this_.hiddenSubmit.disabled=true;
          }
        },false)*/

      }
    }

  }
  $.add=
  {
    tag:'jsbutton'
    ,id:'jsbuttongrey'
    ,backgroundColor:'#555'
    ,hoverBackgroundColor:'#222'
    ,color:'white'
  }
})
