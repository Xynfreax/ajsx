$$.require(['str'],function() {
  Object.assign($j.ajinput,{
    // tag:'ajinput_e'
    // ,id:'ajinput'
    // ,subtype:'33'
    customProps:{
        subtype:{set:function(v){
          this._subtype=v;
        },get:function(v){
          return this._subtype;
        },configurable:true}
        ,decimal:{set:function(v){
          this._decimal=v;
        },get:function(v){
          return this._decimal;
        },configurable:true}
        ,uppercase:{set:function(v){
          this._uppercase=v;
        },get:function(v){
          return this._uppercase;
        },configurable:true}
    }
    // ,load_r:function() {
    //   // this.dom.focus();
    //   // if(this.autofocus){
    //   //   // alert('msg');
    //   //   this.dom.autofocus=true;
    //   //   this.dom.focus();
    //   // }
    // }
    ,load_r:function() {
      var th=this;
      th.events=[
        ['keydown',function(e) {
          // alert(th.subtype);
          if(th.subtype=='ajnumber' || th.type=='number'){
            console.log(e.keyCode);
            // Allow: backspace, delete, tab, escape, enter and .

            if(
              (e.keyCode>=48 && e.keyCode<=57) ||
              (e.keyCode>=96 && e.keyCode<=105) ||
              //     // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
              //      // Allow: Ctrl+C
              (e.keyCode == 67 && e.ctrlKey === true) ||
              // Allow: Ctrl+X
              (e.keyCode == 88 && e.ctrlKey === true) ||
              // Allow: Ctrl+v
              (e.keyCode == 86 && e.ctrlKey === true) ||
              [46, 8, 9, 27, 13, 110, 37,38,39,40,116,109,35,36].indexOf(e.keyCode) !== -1 ||
              (e.keyCode== 190 && th.decimal==true)
            ){
          // if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          //
          //     (e.keyCode == 116) ||
          //     // Allow: Ctrl+A
          //     (e.keyCode == 65 && e.ctrlKey === true) ||
          //      // Allow: Ctrl+C
          //     (e.keyCode == 67 && e.ctrlKey === true) ||
          //      // Allow: Ctrl+X
          //     (e.keyCode == 88 && e.ctrlKey === true) ||
          //      // Allow: home, end, left, right
          //     (e.keyCode >= 35 && e.keyCode <= 39)) {
                   // let it happen, don't do anything
                  //  return;
                  console.log('aqui');
          }else{
            console.log('else');
            e.preventDefault();
          }
          // // Ensure that it is a number and stop the keypress
          if (e.shiftKey && ( (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <=105) ) ) {
               e.preventDefault();
           }
          }

        }]
        ,['change',function() {
          // alert(th.value);
          // // if(th.subtype=='money'){
          // //   alert('msg');
          //   th.value=th.value.replace(',','_')
          // }
          if(th.uppercase==true){
            th.value=th.value.toUpperCase();
          }
        }]
        ,['focus',function() {
          // alert('focus');
          // if(this.type=='password'){
          //   this.readOnly=false;
          // }
        }]
      ]
    }
  })
})
