$$.require(
  function(){
    $.add={
      tag:'div'
      ,id:'jsboton'
      ,border:'solid 1px black'
      ,display:'inline-flex'
      ,flexDirection:'column'
      ,justifyContent:'center'
      //--,alignItems:'base-line'
      //,alignContent:'center'
      //-,flexWrap:'wrap'
      ,aliases:[
        ['text',function(){return this.children[1].children[0]},'textContent']
      ]
      ,children:[
        {
          tag:'div'
          ,id:'jsboton_icon'
          ,border:'solid 1px black'
          //--,position:'absolute'
          ,width:'100%'
          //,paddingBottom:'100%'
          ,background:'url(framework/photo2.jpg)'
          ,backgroundPosition:'center'
          ,backgroundSize:'auto 100%'
          ,backgroundRepeat:'no-repeat'
          ,children:[
            {
              tag:'div'
              ,display:'block'
              ,paddingTop:'100%'
            }
          ]
          /*,children:[
            {
              tag:'img'
              ,id:'jsboton_icon_inner'
              ,src:'framework/photo2.jpg'
              //--,height:'100%'
              //-,width:'30px'
              ,border:'solid 1px green'
              ,events:[
                ['load',function(){
                  //-alert('click');
                  var thisHeight=this.dom.naturalHeight;
                  //-this.width=thisHeight+'px';
                  //-this.width='100%';
                  //alert(thisHeight);
                  //alert(this.parent);
                  //--this.parent.width=thisHeight;
                },true]
              ]
            }
          ]*/
        }
        ,{
          tag:'div'
          ,position:'relative'
          //-,display:'inline-block'
          ,id:'jsboton_text'
          ,border:'solid 1px black'

          ,backgroundColor:'green'
          //,transform: 'rotate(90deg)'
          //--,writingMode:'vertical-rl'
          //,writingMode:'tb-rl'
          //--,textOrientation:'sideways-right'
          ,flexGrow:'1'
          //--,display:'flex'
          //--,justifyContent:'center'
          //--,alignItems:'center'
          //--,alignContent:'center'
          ,textAlign:'center'
          //--,flexDirection:'column'
          //,margin:'auto'
          //--,textAlign:'left'
          //,paddingTop:'5px'
          //,display:'none'
          //,paddingLeft:'-50%'
          ,paddingTop:'50%'
          ,children:[
            {
              tag:'div'
              ,display:'inline-block'
              ,id:'jsboton_innertext'
              ,position:'relative'
              ,marginTop:'-100%'
              //--,left:'-50%'
            //  ,paddingTop:'-10px  '

              //,paddingLeft:'150%'
              //--,textAlign:'center'
              ,fontSize:'15px'

              //,display:'table-cell'
              //,justifyContent:'center'
              //,verticalAlign:'middle'
              //,flexDirection:'column'
              ,writingMode:'vertical-rl'
              //--,transform:'translateX(-50%);'
              //,margin:'auto'
              ,backgroundColor:'yellow'
              //,flexGrow:'1'
              ,textContent:'Boton'
            }
          ]
        }
      ]
    }
})
