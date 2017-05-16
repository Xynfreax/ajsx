$$.require(['ajinputlabel_e'],function() {
  $.add={
    tag:'ajinputlabel_e'
    ,id:'ajinputlabel'
    ,load_r:function() {
      if(this.myinput.type=='checkbox'){
        this.tabIndex=0;
      }
      // this.myinput.dom.focus();
      // if(this.myinput.autofocus){
      //
      //   // alert('msg');
      //   this.myinput.dom.autofocus=true;
      //   this.myinput.dom.focus();
      // }
    }
  }
})
