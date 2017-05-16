$$.require(['str'],function() {
  Object.assign($j.ajwindow,{
    customProps:{
      __content:{set:function(v){
        // alert('asdf');
        this.mycontent.children=v;
      },configurable:true}
      ,showTitleBar:{set:function(v){
        if(v==false){
          // alert('msg');
          this.mytitlebar.display='none'
        }
      },
      get:function(){
        // alert('getttitlebar');
        return this.mytitlebar.display
      }
      ,configurable:true}
      ,showCloseIcon:{set:function(v){
        if(v==false){
          this.mytitlebar.myclose.display='none'
        }
      },configurable:true}
    }

  });
  // Object.assign($.ajwindow.json_l,{
  //   init:function() {
  //     this.
  //   }
  // })
  Object.assign($j.ajwindow,{
    // tag:'ajwindow_e'
    // ,id:'ajwindow',

    opened:false
    // ,width:'100%'
    // ,height:'100%'
    // ,customProps:{
    //   __content:{set:function(v){
    //     // alert('asdf');
    //     this.mycontent.children=v;
    //   },configurable:true}
    //   ,showTitleBar:{set:function(v){
    //     if(v==false){
    //       alert('msg');
    //       this.mytitlebar.display='none'
    //     }
    //   },
    //   get:function(){
    //     alert('getttitlebar');
    //     return this.mytitlebar.display
    //   }
    //   ,configurable:true}
    //   ,showCloseIcon:{set:function(v){
    //     if(v==false){
    //       this.mytitlebar.myclose.display='none'
    //     }
    //   },configurable:true}
    //
    // }
    ,afterShow:async function() {
      return true;
    }
    ,submit:function(params) {
      let newButton=$f.instanciar({
        tag:'button'
        ,type:'submit'
        ,visibility:'hidden'
        ,position:'absolute'
        ,width:'0px'
        ,height:'0px'
      });
      this.mycontent.addChild_r(newButton);
      let allPass=this.mycontent.dom.querySelectorAll("input[type='password']");
      if(params && params.askforsavepassword===false){
        if(allPass){
          for (var i = 0; i < allPass.length; i++) {
            allPass[i].type='text';
            allPass[i].style.opacity=0;
          }
        }
        // alert('antes de submit');
        // alert(this.dom.offsetHeight);
      }
      newButton.dom.click();
      for (var i = 0; i < allPass.length; i++) {
        allPass[i].type='password';
        allPass[i].style.opacity=1;
      }
      newButton.delete();
    }
    ,addEventsOwn:function() {
      var th=this;
      // th.events=[
      //   ['click',function() {
      //     alert(th.dom.nextSibling);
      //   }]
      // ]
      console.log(this);
      alert('sdfsdf');
      th.mytitlebar.myclose.events=[
        ['click',function() {
          // alert(th.id_perfil);
          th.close();
        }]
      ]
      th.mytitlebar.events=[
        ['mousedown',function(e) {
          // alert('mousedown');
          // console.log('Y: '+e.clientY);
          // console.log('rect: '+this.dom.getBoundingClientRect().top);
          // console.log('Y+rect: '+(parseInt(e.clientY)-parseInt(this.dom.getBoundingClientRect().top)));
          console.log('Y: '+e.clientY);
          console.log('rectTop: '+th.dom.getBoundingClientRect().top);
          console.log('offsettop: '+th.dom.offsetTop);
          console.log('Y+rect: '+(parseInt(e.clientY)-parseInt(th.dom.getBoundingClientRect().top)+th.dom.offsetTop));
          var leftDist=(parseInt(e.clientX)-parseInt(th.dom.getBoundingClientRect().left)+th.dom.offsetLeft);
          //-- console.log(e.clientX+this.dom.getBoundingClientRect().left);
          // var leftDist=e.clientX//+this.dom.getBoundingClientRect().left;
          var topDist=(parseInt(e.clientY)-parseInt(th.dom.getBoundingClientRect().top)+th.dom.offsetTop);
          //-- var topDist=e.clientY;//+this.dom.getBoundingClientRect().top;;
          if((th.parent!==undefined && th.parent.real_tag=='form')  && (th.parent.parent!==undefined && th.parent.parent.real_tag=='dialog') && (th.position=='absolute' || th.position=='fixed') && th.parent.parent.onDown==true){
            // alert(th.position);
            th.parent.parent.startMoving(th,leftDist,topDist);
          }else{
            //--->alert(th.parent.parent.onDown)
            // alert(onDown)
          }

        },true]
      ]
      th.mycontent.events=[
        ['mousedown',function(e) {
          // alert('antes');
          th.onDown=true;
          // onDown==true;
        },true]
        ,['mouseup',function(e) {
          if(get_type(th.listenerMoving)==4){
            // alert('si existe listener');
            th.mycontent.dom.removeEventListener('mousemove',th.listenerMoving,false);
            th.onDown=false;
          }else{
            // alert('NO si existe listener');
          }

        },true]
        ,['mouseleave',function(e) {

          // if(get_type(th.listenerMoving)==4){
          //   th.mycontent.dom.removeEventListener('mousemove',th.listenerMoving,false);
          //   th.onDown=false;
          // }

        },true]
      ]
      th.events=[
        ['submit',function(e) {
          e.preventDefault();
          e.stopPropagation();
        },false]
        ,['close',function(e) {
          e.preventDefault();
          e.stopPropagation();
          th.close();
          // th.dom.parentNode.removeChild(th.dom);
          //th.delete();

          //alert(th.dom);

        }]
      ]

    }
    // ,listenerMoving:
    ,startMoving:function(Ao,leftDist,topDist) {
      // alert('en estartmoving');
      var th=this;
      // th.mycontent.events=[
      //   ['mousemove',listenerMoving.bind(th.mycontent),false]
      // ]
      this.listenerMoving=function(e) {
        //alert('moving');
        // console.log(e.clientX);
        console.log(e.clientY-this.dom.offsetTop);
        console.log(topDist);
        // Ao.transform='initial';
        // Ao.left=e.clientX+'px';
        // Ao.top=e.clientY+'px';
        //---Ao.transform="translate("+(e.clientX/*-Ao.dom.offsetLeft*/-leftDist)+"px,"+(e.clientY/*-Ao.dom.offsetTop*/-topDist)+"px)";

        Ao.transform='none';
        //-- Ao.transform="translate("+(e.clientX/*-Ao.dom.offsetLeft*/)+"px,"+(e.clientY/*-Ao.dom.offsetTop*/)+"px)";
        Ao.transform="translate("+(e.clientX/*-Ao.dom.offsetLeft*/-leftDist-this.dom.offsetLeft)+"px,"+(e.clientY/*-Ao.dom.offsetTop*/-topDist-this.dom.offsetTop)+"px)";
        // Ao.transform="translate("+0+"px,"+0+"px)";
        // Ao.top=e.clientY+'px';
      }
      this.listenerMoving=this.listenerMoving.bind(this.mycontent);
      this.mycontent.dom.addEventListener(
        // 'mousemove',th.listenerMoving.bind(th.mycontent),false

        'mousemove',this.listenerMoving,false
      )
    }
    // ,close:function(par) {
    //   let th=this;
    //   th.dom.close();
    // }
    ,close: function() {
      console.log('====CLOSING');
      // alert('en el close');
      let th=this;

      // th.opened=false;
      // alert(th.resDialog);

      //--Lo que se hace es forzar a que haga rerendering para que se reactive el scroll, es un bug de chrome
      let majorcontainer=$[document.body.children[0].children[0].id];
      // alert(majorcontainer.id);
      let tempoverflow=majorcontainer.dom.style.overflowX;
      let tempprop=majorcontainer.getCS('borderBottomWidth');
      // alert(parseInt(tempprop));

      // majorcontainer.color='rgb(0,0,200)';
      let propiedad='borderBottomWidth';
      majorcontainer.dom.style[propiedad]=(parseInt(tempprop)+1)+'px';
      // alert(majorcontainer.dom.style.color);
      setTimeout(function() {
        // majorcontainer.overflowX=tempoverflow;
        majorcontainer.dom[propiedad]=tempprop;
      },0)
      //-------

      // majorcontainer.color=tempprop;
      // majorcontainer.overflowX='auto';
      // majorcontainer.overflowY='auto';
      // majorcontainer.overflowX='hidden';
      // majorcontainer.overflowY='hidden';
      // setTimeout(function() {
      //   // majorcontainer.overflowX=tempoverflow;
      //   th.delete();
      // },0)
      // $.index.overflowX='';

      // th.display='none';
      // if(th.dom.open){
      //   th.dom.close();
      // }

      let backdrop_=th.dom.nextSibling;//para firefox
      if(backdrop_ && backdrop_.classList.contains('backdrop')){
        // backdrop_.remove();
        th.dom.close();
        // alert('remuevo');
      }
      // console.log(th.dom.nextSibling);
      // console.log(backdrop_);
      // alert('msg');
      th.delete();

      if(th.resDialog){//resolve promise del open en showmodal
        // alert('en resDialog');
        th.resDialog();
      }
      // th.delete();
      if(th.afterClose){//puede que deba ir mejor antes de th.delete
        th.afterClose.bind(th)();
        // th.afterClose();
      }
      // alert(th.dom.open);

      return true;
    }
    ,loadContent:function() {//por ahora desactivado
      alert('LOADCONTENT');
      GLOBLI=1;
      if(get_type(this.content)==1){
        // alert('yo syoy loadcontent');
        this.mycontent.emptyChildren();
        // for (var i = 0; i < this.content.length; i++) {
        //   this.mycontent.addChild_r($f.instanciar(this.content[i]));
        // }
        this.mycontent.children=this.content;
      }
    }
    ,preinit:function() {
      // alert('PRE-INIT');
      let th=this;
      this.classList.remove('unseen');
      dialogPolyfill.registerDialog(this.dom);
      if(__isUnitTest !==''){
        if(this.modal==true){
          //--this.showModal();
        }else{
          this.show().catch(function(rej) {
            // body...
          });
        }

      }else{
        if(this.modal!==true){
          console.log(this);
          this.show();
        }
      }
    }
    ,init:function() {
      alert('INIT');

      let th=this;
      // th.mycontent.opacity=0;


      //-----
      /*
      var observer = new MutationObserver(function(mutations) {
        	// For the sake of...observation...let's output the mutation to console to see how this all works
        	mutations.forEach(function(mutation) {

            // alert(mutation.type);
            // alert(th.dom.open);
            if(th.dom.open==false){
              observer.disconnect();
              th.close();
            }
        	});
        });

        // Notify me of everything!
        var observerConfig = { attributes: true, attributeFilter: ['open'] };

        // Node, config
        // In this case we'll listen to all changes to body and child nodes
        var targetNode = document.body;
        observer.observe(th.dom, observerConfig);
        */
      //------
      // mo.observe(dialog, { attributes: true, attributeFilter: ['open'] });



    }
    ,load_r:function() {
console.log(this.mytitlebar);
      // alert('LOAD');
        let elm = this.dom;
        let thh=this;
        // let realth=thh.parent.parent.parent.children[1].children[0].children[0].children[0].children[0];
        let startX=0;
        let startY=0;
        let startWidth=0;//elm.offsetWidth;
        let startHeight=0;//elm.offsetWidth;
        let totaltransX=0;
        let totaltransY=0;
        // let inidesf=thh.dom.offsetTop-thh.dom.getBoundingClientRect().top;
        let inidesf=-1;
        console.log('>>>>>>>>>>>>>>>>>>>');
        console.log(thh.dom.offsetTop);
        console.log(thh.dom.getBoundingClientRect().top);
        console.log('>>>>>>>>>>>>>>>>>>>');

//create box in bottom-left
let resizer = thh.mytitlebar.dom;//--document.createElement('div');
// resizer.style.width = '4px';
// resizer.style.height = '100%';
// resizer.style.background = 'grey';
// resizer.style.position = 'absolute';
// resizer.style.right = 0;
// resizer.style.borderRight='solid 1px rgb(143, 143, 143)';
// resizer.style.bottom = 0;
resizer.style.cursor = 'e-resize';
//Append Child to Element
// elm.appendChild(resizer);
//box function onmousemove
resizer.addEventListener('mousedown', initResize, false);

//Window funtion mousemove & mouseup
function initResize(e) {
  if(inidesf==-1){
    inidesf=thh.dom.offsetTop-thh.dom.getBoundingClientRect().top;
  }
startX=e.clientX-totaltransX;
startY=e.clientY-totaltransY;
// startWidth=thh.getCS('transform');
startWidth=thh.dom.getBoundingClientRect().left;
startHeight=thh.dom.getBoundingClientRect().top;
// let tra=new CSSMatrix(startWidth);
let tra=startWidth.left;
console.log('==');
// console.log(getComputedTranslate(elm,'X'));
// console.log(thh.getCS('transform'));
console.log(startHeight);
console.log(thh.dom.offsetTop-startHeight);
console.log('>>>>>>>>>>>>>>>>>>>');
console.log(thh.dom.offsetTop);
console.log(thh.dom.getBoundingClientRect().top);
console.log('>>>>>>>>>>>>>>>>>>>');
console.log('==');
// alert(tra);
// startWidth=parseInt(document.defaultView.getComputedStyle(elm).width, 10)
console.log(startX);
console.log(startWidth);
 window.addEventListener('mousemove', Resize, false);
 window.addEventListener('mouseup', stopResize, false);
}
//resize the element
function Resize(e) {
// let newWidth=e.clientX - elm.offsetLeft+'px';
console.log('______________');
console.log(startX);
console.log(e.clientX);
console.log(e.clientX-startX);
let newWidth=(e.clientX-startX)+'px';
// alert(inidesf);
let newHeight=(e.clientY-startY-inidesf)+'px';
totaltransX=(e.clientX-startX);
totaltransY=(e.clientY-startY);
// console.log(e.clientX);
// console.log(newWidth);
// let realth=thh.parent.parent.parent.children[1].children[0].children[0].children[0].children[thh.indice];
// elm.style.width='0px';
elm.style.transform= 'translate('+newWidth+', '+newHeight+')';
 // elm.style.width = newWidth;
 // elm.style.maxWidth = newWidth;
 // elm.style.minWidth = newWidth;
 // realth.width = newWidth;
 // realth.maxWidth = newWidth;
 // realth.minWidth = newWidth;
//  element.style.height = (e.clientY - element.offsetTop) + 'px';
}
//on mouseup remove windows functions mousemove & mouseup
function stopResize(e) {
  window.removeEventListener('mousemove', Resize, false);
  // let realth=thh.parent.parent.parent.children[1].children[0].children[0].children[0].children[thh.indice];
  // if(elm.offsetWidth<realth.dom.offsetWidth){
  //   console.log('--->>>>IF');
  //   console.log(elm.offsetWidth);
  //   // console.log(realth.dom.offsetWidth);
  //   // elm.style.width=realth.dom.offsetWidth+'px';
  //   // elm.style.minWidth=realth.dom.offsetWidth+'px';
  //   // elm.style.maxWidth=realth.dom.offsetWidth+'px';
  //
  // }else{
  //   console.log('--->>>>ELSE');
  //   console.log(elm.offsetWidth);
  //   // console.log(realth.dom.offsetWidth);
  //
  // }
  inidesf=0
  window.removeEventListener('mouseup', stopResize, false);

}

    }
    ,setAutofocus:function() {
      let th=this;
      let dautofocus=th.dom.querySelector("input[autofocus]");
      if(!dautofocus){
        dautofocus=th.dom.querySelector("button[autofocus]");
      }
      if(dautofocus){
        dautofocus.focus();
      }
    }
    ,odps:{}
    ,settearPermisos:async function(data) {
      let th=this;
      if(data){
        let processes=data.processes;
        // alert('msg');

        // alert(JSON.stringify(resp))
        for (var k in th.odps) {
          var actItem=th.odps[k];
          if(processes[k]==undefined){
            for (var i = 0; i < actItem.length; i++) {
              actItem[i].display='none'
            }

          }
        }

        // try{
          // let resp=await $_.query('listaPermisosxusuario');
          if(get_type(th.settear)==4 || get_type(th.settear)==10){
            th.settear(resp);
          }
          return true;
        // }catch(e){
        //   if(e.co='nosession'){
        //
        //   }
        // }


      }

    }
    ,show:async function() {
      // alert('SHOW');
      this.opacity=1;
      // alert('show');
      this.dom.show();
      let th=this;
      let resp={};
      this.visibility='visible';
      if(!this.inlogin){
        // alert('no en login: '+this.id);
        resp=await $_.query('listaPermisosxusuario');
        // $_.USUARIO_ACTUAL=resp.data;
        th.USUARIO_ACTUAL=resp;
        // alert(JSON.stringify(resp.data));
        resp=resp;
      }
      // alert('here');

      // alert(JSON.stringify(resp));
      this.opened=true;
      //--->
      // alert('loadContent');
      this.loadContent();

      this.opacity=1;

      if(get_type(this.afterShow)==4 || get_type(this.afterShow)==10){

        // alert('final');
        this.settearPermisos(resp);
        th.mycontent.opacity=1;
        this.setAutofocus();
        await this.afterShow();



      }
    }
    ,init:function() {
      // Object.defineProperties(this,{
      //   __content:{set:function(v){
      //     // alert('asdf');
      //     this.mycontent.children=v;
      //   },configurable:true}
      //   ,showTitleBar:{set:function(v){
      //     if(v==false){
      //       // alert('msg');
      //       this.mytitlebar.display='none'
      //     }
      //   },
      //   get:function(){
      //     alert('getttitlebar');
      //     return this.mytitlebar.display
      //   }
      //   ,configurable:true}
      //   ,showCloseIcon:{set:function(v){
      //     if(v==false){
      //       this.mytitlebar.myclose.display='none'
      //     }
      //   },configurable:true}
      //
      // });

      this.addEventsOwn();
      // alert('INIT');
    }
    // ,opacity:0
    ,showModal:async function(dest_) {

      let th=this;
      th.classList.add('modal');
      // alert(th.dom.className);
      this.position='fixed';
      this.top='50%';
      //--this.transform= 'translate3d(0, -50%,0)';
      //--this.transform= 'translate(0, -50%)';
      this.dom.showModal();
      this.visibility='visible';
      this.opacity=1;

      // this.height='50px';
      // this.height='auto';

      this.opened=true;




      //-----
      // let dest=dest_
      // if(dest==undefined){
      //   dest=$[document.body.children[0].children[0].id];
      // }
      // if(!th.parent){
      //   dest.addChild_r(obj);
      // }
      //-----

      // console.log(this.dom.nextSibling);
      // let cover=this.dom.nextSibling;
      // cover.addEventListener('keypress',function(event) {
      //   alert('escape');
      //   if (event.keyCode == 27) {
      //
      //     event.preventDefault();
      //     event.stopPropagation();
      //     th.close();
      //   }
      // },true)
      // alert(this.dom.nextSibling);
      // alert('antes');



      // alert('despues');




      // th.transition='none';
      this.loadContent();
      th.mycontent.opacity=1;
      th.classList.add('afters');
      // th.transition="max-height 0.125s cubic-bezier(0.03, 0.125, 0.04, 0.125) 0ms";
      this.maxHeight='95%';

      let resp={};
      if(!this.inlogin){
        resp=await $_.query('listaPermisosxusuario');
        //--resp=resp;

        th.USUARIO_ACTUAL=resp.data;
        // alert(JSON.stringify(resp));
      }

      // this.maxHeight='0%';

      // this.maxHeight='90%';


      if(get_type(this.afterShow)==4 || get_type(this.afterShow)==10){
        this.setAutofocus();
        this.settearPermisos(resp);
        await this.afterShow();

        // th.mycontent.opacity=1;
      }
      await new Promise(function(res,rej) {
        th.resDialog=res;//esel resolve de la promesa
      })
      return true;
    }
    ,visibility:'hidden'

  }
)
})
