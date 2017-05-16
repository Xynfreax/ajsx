$$.require(['str','../../globalFunciones'],function() {
  $.add={
    tag:'ajtab_e'
    ,id:'ajtab'
    ,addEvents:function() {
      var th=this;
      var thp=th.parent;
      th.mytitle.events=[
        ['click',function(e) {
          // alert(this.textContent);
          thp.setSelected(this.ind)
        }]
      ]
    }
    ,init:function() {
      this.addEvents();
    }
  }
  $.add={
    tag:'ajmultitab_e'
    ,id:'ajmultitab'
    ,model:[
      {
        title:'tab1'
        // ,selected:true
        ,content:[
          {
            tag:'div'
            ,textContent:'sdf'
          }
        ]
      }
      ,{
        title:'tab2'
        ,content:[
          {
            tag:'button'
            ,textContent:'asd'
            ,tabIndex:0
          }
        ]
      }
      ,{
        title:'tab3'
        ,content:[
          {
            tag:'button'
            ,textContent:'asd'
            ,tabIndex:0
          }
        ]
      }
    ]
    ,addEvents:function() {

      var th=this;
      // function myclicklistener(e) {
      //   if(e.target.tagName==''){
      //     var actTh=$[e.target.id];
      //     th.orderTable(actTh);
      //   }
      // }
      // th.children.forEach(function(item,i,myarray) {
      //   item.events=[
      //     ['click',myclicklistener.bind(item)]
      //   ]
      // })

    }
    ,amodel:function(model_) {
      var th=this;
      var model=model_
      if(model==undefined){
        model=th.model;
      }
      if(model!==undefined){
        var lastTab=null;
        for (var i = 0; i < model.length; i++) {
          var actItem=model[i];
          var newTabAo=$f.instanciar({tag:'ajtab',title:actItem.title,content:actItem.content,ind:i});
          th.addChild_r(newTabAo);
          // console.log('zIndex--> '+newTabAo.mytitle.getCS('zIndex'));
          newTabAo.mycontent.zIndex=newTabAo.mytitle.getCS('zIndex')-1;
          newTabAo.mytitle.ind=i;
          if(lastTab!==null){
            // console.log(lastTab.mytitle.dom.offsetWidth+'px');
            newTabAo.mytitle.marginLeft=lastTab.mytitle.dom.offsetWidth+lastTab.mytitle.dom.offsetLeft-1+'px'
            newTabAo.mycontent.mytopline.left=lastTab.mytitle.dom.offsetWidth-1+'px'
            // newTabAo.marginLeft=(lastTab.dom.offsetWidth*(-1)) + (lastTab.dom.offsetLeft*(-1)) +'px'
            console.log(newTabAo.dom.clientWidth);
            console.log(newTabAo.dom.offsetWidth);
            console.log(newTabAo.dom.offsetLeft);
            console.log(newTabAo.dom.getBoundingClientRect().width);

            //console.log(newTabAo.dom.clientLeft);

            // newTabAo.left=(newTabAo.dom.clientWidth)*(-1)+'px';
            // newTabAo.left=(newTabAo.dom.offsetWidth)*(-1)+'px';
            //--- newTabAo.left=(newTabAo.dom.offsetLeft)*(-1)+'px';



            //newTabAo.marginLeft=(newTabAo.dom.clientWidth)*(-1)+'px';
            //newTabAo.marginLeft=(th.dom.offsetWidth-20)*(-1)*i+'px';
            //-- newTabAo.transform='translateX(-'+1212*i+'px)';
            // alert(th.getCS('paddingLeft').replace('px',''));
            //- newTabAo.marginTop=lastTab.dom.offsetTop+i+'px'

          }
          newTabAo.mycontent.mytopline.width=newTabAo.mytitle.dom.offsetWidth-2+'px'
          lastTab=newTabAo;
          // console.log(th.dom.offsetHeight);
          // console.log(newTabAo.dom.offsetHeight);
          // if(th.dom.offsetHeight<newTabAo.dom.offsetHeight){
          //   th.height=newTabAo.dom.offsetHeight+22+'px';
          // }
        }
      }
      th.setSelected();
    }
    ,setSelected:function(ind_) {
      var th=this;
      var model=th.model;
      var ind=ind_;
      if(ind==undefined){
        ind=0;
      }

      // alert(th.model);
      for (var i = 0; i < model.length; i++) {
        var actItem=model[i];
        if(actItem.selected==true){
          ind=i;

        }

      }

      // alert(th.children[th.children.length-1].getCS('zIndex'));
      for (var i = 0; i < th.children.length; i++) {
        th.children[i].classList.remove('selected');
        th.children[i].zIndex=i+1;
      }
      th.children[ind].selected=true;
      th.children[ind].classList.add('selected');
      // th.children[ind].border='solid 3px yellow';
      // th.children[ind].height=th.children[ind].;
      th.children[ind].zIndex=th.children.length+1;
    }
    ,init:function() {
      var th=this;

    }
    ,load_r:function() {
      this.amodel();
    }
  }
})
