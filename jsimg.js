$$.require(function(){
    $.add=
    {
      tag:'div'
      ,id:'jsimg'
      ,overflow:'hidden'
      ,backgroundImage:'url(vista/icons/loading.gif)'
      ,backgroundPosition:'center'
      ,backgroundRepeat:'no-repeat'
      ,border:"solid 1px grey"
      ,aliases:[
        //['src',function(){return this.innerimg;},'src']
        ['innerimgsize',function(){return this.innerimg;},'backgroundSize']

      ]
      ,completable:true
      ,completed:function(){
        //--alert('image loading completed: '+this.id);

      }

      ,customProps:{
        assignImg:{enumerable:true,configurable:true,writable:true,value:function(url){
            //--this.src=url;
          var this_=this;

          var image = this.innerimg;
          var downloadingImage = new Image();

          downloadingImage.onload = function(){
            //alert('asdf')
            //----this_.completed();
            //--image.src = this_._src;


            //--image.opacity=1;
            image.backgroundImage = 'url('+url+')';
              window.setTimeout( function() {
                  //document.getElementById( 'fade3' ).className += ' fade-in';
                  //--$.ERPPrincipal.dom.style.opacity=1;

                  image.opacity=1;
                  this_.backgroundImage='none';
                  this_.evalCompleted();
              }, 50);
          };
          downloadingImage.onerror=function(){
            //--alert('Error al cargar imagen')
            //--this_.evalCompleted();
          }

          //alert('kkegi aqyu');
          downloadingImage.src =url;

  //        ima
          //--alert(this.src);
          }
        }
        ,src:{set:function(v){
          //alert('en set src: '+this.id+' - '+v);
          //--var this_=this;
          this._src=v;
          if(v!==''){
            this.assignImg(v);
          }


        },get:function(){
          return this.innerimg.src;
        },configurable:true}
      }
      ,events:[
        ['mouseover',function(e){
          //--e.preventDefault();

        },false]
      ]

      ,load_r:function(){
        //alert('load en jsimg: '+this.id);
        //--alert(this.id);
        //--alert('en load_r src: '+this.id+' - '+this.src);
        //--this.assignImg(url);
      }
      ,children:[
        {
          tag:'div'
          ,innerId:'innerimg'
          ,opacity:0
          ,backgroundSize:'cover'
          ,backgroundRepeat:'no-repeat'
          ,backgroundPosition:'center center'
          ,transition:'opacity 0.3s ease-out'
          //,border:'solid 2px green'
          ,width:'100%'
          ,maxWidth:'100%'
          ,height:'100%'
          ,maxHeight:'100%'
        }
      ]
    }
})
