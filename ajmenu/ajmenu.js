$$.require(['../globalFunciones','ajmenu_e'],function() {

  $.add={
    tag:'ajmenu_e'
    ,id:'ajmenu'
    ,amodel:function(model_) {
      var th=this;
      var mcontainer=th;
      //limpiamos el menu
      th.emptyChildren();
      th.model=model_;
      function recursiveCreation(container,model){
        for (var i = 0; i < model.length; i++) {
          var actItem=model[i];
          var forInstance=extenderObj(th.subelements.ajitem);
          forInstance.idf=actItem.idf;
          var newAoItem=$f.instanciar(forInstance);
          // newAoItem.idf=actItem.idf;

          container.addChild_r(newAoItem);
          newAoItem.mybutton.text=actItem.sname;


          if(get_type(actItem.model)==1){//array

            var newContainer=$f.instanciar({tag:'ul',innerId:'mycontainer'});
            newAoItem.opened=false;
            newAoItem.classList.add('closed');
            newAoItem.addChild_r(newContainer);
            // alert(newContainer.getCS('display'));
            recursiveCreation(newContainer,actItem.model);
          }
        }
      }
      recursiveCreation(mcontainer,model_);

    }
    ,model:[
      {
        sname:'Item'
      }
      ,{
        sname:'Item'
      }
      ,{
        sname:'Item'
        ,model:[
          {
            sname:'subitem'
          }
        ]
      }
    ]
    ,addEvents:function() {
      var th=this;
      th.subelements.ajitem.children[0].events=[
        ['click',function(e) {

          this.parent.open();
        }]

      ]
    }
    ,init:function() {
      this.subelements.ajitem.open=function() {
        // alert('msg');

          if(this.opened==false){
            this.opened=true;
            // this.mycontainer.display='block'
            this.classList.remove('closed');
            this.classList.add('opened');
          }else if(this.opened==true){
            this.opened=false;
            // this.mycontainer.display='none'
            this.classList.remove('opened');
            this.classList.add('closed');
          }

      }
      this.addEvents();

    }
    ,load_r:function() {
      if(__isUnitTest !==''){
        this.amodel(this.model);
      }
    }
  }
})
