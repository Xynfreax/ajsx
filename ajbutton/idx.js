$$.require(['str'],function() {
  Object.assign($j.ajbutton,{

    // ,id:'ajbutton'
    init:function() {
      this.myimg.display='none';
    }
    ,load_r:function() {
      // alert(this.dom.offsetHeight);
      // alert(this.dom.offsetWidth);
      // alert(this.getCS('width'));
      //-- this.myimg.height=this.dom.offsetHeight+'px';
      this.iconPosition='left'
      // alert('msg');
    }
    ,events:[
      ['click',function(e) {
        // alert('msg');
        // e.preventDefault();
        // let allPass=this.getParentBy('real_tag','form').dom.querySelectorAll("input[type='password']");
        // if(allPass){
        //   for (var i = 0; i < allPass.length; i++) {
        //     allPass[i].type='text';
        //   }
        // }
        // alert('antes de submit');
        // alert(this.dom.offsetHeight);
      }]
    ]
  })
})
