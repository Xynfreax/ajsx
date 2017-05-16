$$.require(function(){
  $.add=
  {
    tag:'div'
    ,id:'jssimplecontainer'
    ,display:'flex'
    ,flexDirection:'column'
    ,flexGrow:1
    ,position:'relative'
    ,width:'100%'
    ,addin:function(obj){
      for(var i=this.children.length-1;i>-1;i--){
        this.children[i].delete();
      }
      this.addChild_r(obj);
    }
    /*
    ,customProps:{
      addin:{configurable:true,writable:true,enumerable:true,value:function(obj){
        for(var i=this.children.length-1;i>-1;i--){
          this.children[i].delete();
        }
        this.addChild_r(obj);
      }}
    }*/
    //,height:100
  }
})
