$$.require(['str'],function() {
  Object.assign($j.ajinputlabel,{
    // tag:'ajinputlabel_e'
    // ,id:'ajinputlabel'
    load_r:function() {
      // console.log(this.children.length);
      // alert('msg');
      let th=this;
      // setTimeout(function() {
      //   console.log(th);
        if(th.myinput.type=='checkbox'){
          th.tabIndex=0;
        }
      // },1000);

      // this.myinput.dom.focus();
      // if(this.myinput.autofocus){
      //
      //   // alert('msg');
      //   this.myinput.dom.autofocus=true;
      //   this.myinput.dom.focus();
      // }
    }
    ,preload:function() {
      let th=this;
      th.events=[
        ['blur',function() {
          // if()
        }]
      ]
    }

  })
})
