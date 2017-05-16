$$.require(['ajbutton.s'],function() {
  $.add={
    tag:'button'
    ,id:'ajbutton_e'
    ,type:'button'
    ,aliases:[
      ['text',function(){return this.mytext},'textContent']
      ,['icon',function(){return this.myimg},'src']
    ]
    ,customProps:{
      iconPosition:{set:function(v){
        this._iconPosition=v;
        if(v=='left'){
          // alert('en set');
          this.myimg.display='inline';
          this.mytext.display='inline';
        }
      },configurable:true}
    }

    ,children:[
      {
        tag:'img'
        ,innerId:'myimg'
      }
      ,{
        tag:'div'
        ,innerId:'mytext'
        ,textContent:'button'
      }
    ]
  }
})
