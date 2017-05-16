$$.require(['str','../globalFunciones'],function() {
  Object.assign($j.ajtab,{
    // tag:'ajtab_e'
    // ,id:'ajtab'
    addEvents:function() {
      var th=this;
      var thp=th.parent;
      th.mytitle.events=[
        ['click',function(e) {
          // alert(this.textContent);
          thp.setSelected(this.ind)
        }]
      ]
    }
    ,load_r:function() {
      this.addEvents();
    }
  })
  Object.assign($j.ajmultitab,{
    // tag:'ajmultitab_e'
    // ,id:'ajmultitab'
    model:[
      {
        title:'tab1sadf',// asdf asdf asdf asdfasdf asdf asdf asdf tab1sadf asdf asdf asdf asdfasdf asdf asdf asdf'
        // ,selected:true
        content:[
          {
            tag:'div'
            ,textContent:'sdf'
          }
        ]
      }
      ,{
        title:'tab1sadf',// asdf asdf asdf asdfasdf asdf asdf asdf tab1sadf asdf asdf asdf asdfasdf asdf asdf asdf'
        content:[
          {
            tag:'button'
            ,textContent:'asd'
            ,tabIndex:0
          }
        ]
      }
      ,{
        title:'tab1sadf',// asdf asdf asdf asdfasdf asdf asdf asdf tab1sadf asdf asdf asdf asdfasdf asdf asdf asdf'
        content:[
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
      th.mybar.events=[
        ['click',function(e) {

            // console.log($[e.target.id])
            //   alert($[e.target.id])
            let mybutton=(e.target.tagName=='BUTTON'?$[e.target.id]:$[e.target.id].getParentBy('real_tag','button'));
            if(mybutton){

              // console.log(mybutton);
              let actBtn=mybutton;
              // alert(actBtn.indice);
              th.setSelectedTab(actBtn.indice-1);//es -1 porque el primer indice es de la linea myline
              actBtn.classList.add('selected');
              // th.amodel();
            }else{
              // console.log(e.target);
              // alert(e.target.textContent);
            }
        }]
      ]
      // th.mycontent.overflowX='auto';
      th.mycontent.events=[
        ['focus',function(e) {
          // th.mycontent.overflowX='auto';
          console.log(e.target);
          // alert(e.target.id);

          let tab=$[e.target.id].getParentBy('wmark','tabcontent');//widget mark
          console.log(th.mycontent.dom);
          th.mycontent.dom.scrollLeft=0;
          // th.mycontent.dom.scrollTo(0,0);
          if(tab){
            // alert(tab.indice);
            th.setSelectedTab(tab.indice);
          }
          // th.setSelectedTab(1);
          // th.mycontent.overflowX='hidden';
          // alert(e.target.id);
        },true]
      ]
    }
    ,amodel:function(model_) {
      let th=this;
      let model=model_;
      if(model==undefined){
        model=th.model||[];
      }
      let mybar=th.mybar;
      let mycontent=th.mycontent;
      for (let i = 0; i < model.length; i++) {
        let actItem=model[i]
        let newtabbuttonao=$f.instanciar({
          tag:'ajbutton',
          classN:'tabbutton',
          text:actItem.title,
        });
        let newtabcontentao=$f.instanciar({
          tag:'div',
          tabIndex:-1,
          wmark:'tabcontent',
          classN:'tabcontent',
          // position:/
          children:actItem.content,
        });
        mybar.addChild_r(newtabbuttonao);
        mycontent.addChild_r(newtabcontentao);


      }
      // alert(mycontent.children.length);
      th.setSelectedTab(0);

    }
    ,setSelectedTab:function(ind_) {

      let th=this;
      let mybar=th.mybar;
      let mycontent=th.mycontent;
      let firstchild=mycontent.children[0];

      if(firstchild){
        // alert(firstchild);
        // mycontent.paddingLeft='-100px'//+(100*ind_)+'%';

        let af=function(e) {
          if(e.propertyName=='margin-left'){
            // this.dom.height=='0px'
            // this.dom.tabIndex=-1
            // this.dom.classList.add('disabled')

            // firs
            for (let ii = 0; ii < mycontent.children.length; ii++) {
              let actChild_=mycontent.children[ii];
              if(ii==ind_){
                // mycontent.children[ind_].tabIndex=0;
                // mycontent.children[ind_].classList.remove('disabled');
                // actChild.tabIndex=0;
                // actChild.classList.remove('disabled');
                // actChild.maxHeight='0px';
                // actChild.border='solid 2px yellow';
                //-- actChild_.height='auto';
              }else{
                // actChild.maxHeight='0px';
                //-- actChild_.height='0px';
                actChild_.classList.add('ceroheight');
                // actChild_.border='solid 2px red';
              }


            }
            firstchild.dom.removeEventListener('transitionend',af,true);
          }
          e.stopPropagation();
        }

        //  mycontent.children[ind_].tabIndex=0;
        //  mycontent.children[ind_].classList.remove('disabled');
        firstchild.dom.addEventListener('transitionend',af,true);
        let selectedchild=mycontent.children[ind_];
        selectedchild.tabIndex=0;
        selectedchild.height='auto';
        selectedchild.classList.remove('disabled');
        let selheight=selectedchild.dom.offsetHeight;
        // alert(selheight);
         for (let i = 0; i < mycontent.children.length; i++) {
           let actChild=mycontent.children[i];
           let actTabbutton=mybar.children[i+1];//+1 por la sublinea
           if(i==ind_){

            //  actChild.tabIndex=0;
            //  actChild.classList.remove('disabled');
            actChild.height='auto';
            actTabbutton.classList.add('selected');
           }else{
            //  /alert(ind_+'-'+i);

             actTabbutton.classList.remove('selected');
             actChild.height=selheight+'px';
             actChild.tabIndex=-1;
             actChild.classList.add('disabled');


           }
           actChild.transform='translate(-'+(100*ind_)+'%,0)';


         }

        //---> firstchild.marginLeft='-'+(100*ind_)+'%';


        //--animacion de sublinea
        // let myline=mybar.myline;
        // console.log(myline.dom);
        // // myline.left=mybar.children[ind_].dom.offsetLeft;
        // myline.left=mybar.children[ind_+1].dom.offsetLeft+'px';
        // myline.width=mybar.children[ind_+1].dom.offsetWidth+'px';
        //----
        // mycontent.chil

        // firstchild.marginLeft='-'+(100*ind_)+'%';

      }

    }
    // ,init:function() {
    //   var th=this;
    // }
    ,load_r:function() {
      this.addEvents();
      this.amodel();
      console.log($);
      // console.log(this.my);
      // alert('msg');

    }
  })
})
