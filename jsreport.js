$$.require(function(){
  $.add={
    tag:'div'
    ,id:'jsrheader'
    ,position:'relative'
    ,width:'100%'

  }
  $.add={
    tag:'div'
    ,id:'jsrbody'
    ,position:'relative'
    ,width:'100%'
    ,flexGrow:1

  }
  $.add={
    tag:'div'
    ,id:'jsrfooter'
    ,position:'relative'
    ,width:'100%'
  }
  $.add=
  {
    tag:'div'
    ,id:'jsrpageheader'
    ,position:'relative'
    ,border:'solid 1px grey'
  }
  $.add=
  {
    tag:'div'
    ,id:'jsrpagebody'
    ,flexGrow:1
    ,position:'relative'
    ,border:'solid 1px grey'
  }
  $.add=
  {
    tag:'div'
    ,id:'jsrpagefooter'
    ,position:'relative'
    ,border:'solid 1px grey'
  }
  $.add={
    tag:'div'
    ,id:'jsrprintable'
    ,position:'relative'
  }
  $.add={
    tag:'div'
    ,id:'jsrnoprintable'
    ,position:'relative'
  }
  $.add={
    tag:'div'
    ,id:'jsrpage'
    ,backgroundColor:'white'
    ,margin:'1cm 1cm'
    ,width:'21cm'
    ,height:'15cm'
    ,border:'solid 1px #333'
    ,display:'flex'
    ,flexDirection:'column'
    ,alignItems:'stretch'
    ,children:[
      {
        tag:'jsrpageheader'
        ,innerId:'jsrp_header'
        ,height:'2cm'
        ,minHeight:'2cm'
        ,maxHeight:'2cm'
      }
      ,{
        tag:'jsrpagebody'
        ,innerId:'jsrp_body'
      }
      ,{
        tag:'jsrpagefooter'
        ,innerId:'jsrp_footer'
        ,height:'2cm'
        ,minHeight:'2cm'
        ,maxHeight:'2cm'
      }
    ]
  }
  $.add=
  {
      tag:'div'
      ,id:'jsrcontrols'
      ,position:'relative'
      ,width:'100%'
      ,backgroundColor:'rgb(250,250,250)'
      ,borderBottom:'solid 1px grey'
      ,children:[
        {
          tag:'jsbutton'
          ,text:'Imprimir'
          ,events:[
            ['click',function(){
              var noPrintableArea=document.getElementById('body_');
              var printableArea=document.getElementById('printable');
              var this_=this.getParentBy('tag','jsreport');
              var impri=this_.jsr_jsrprintable.dom.cloneNode(true);
              impri.style.overflow='visible';
              impri.style.height='auto';
              impri.style.width='auto';
              impri.style.margin='0px';
              //Cambiamos el css de impresion
              var cssPagedMedia = (function () {
                  var style = document.createElement('style');
                  style.id='pagee'
                  document.head.appendChild(style);
                  return function (rule) {
                      style.innerHTML = rule;
                  };
              }());

              cssPagedMedia.size = function (size) {
                  cssPagedMedia('@page {size: ' + size + '}');
              };

              //--cssPagedMedia.size('landscape');
              //--cssPagedMedia.size(this_.pageProps.width+' '+this_.pageProps.height+ '');



              var esti_sheet=document.getElementById('principal_style').sheet;
              console.log(esti_sheet.cssRules.length);
              esti_sheet.insertRule('@page {size: ' + this_.pageProps.width+' '+this_.pageProps.height+ ' '+this_.pageProps.orientation+';margin:  0cm 0cm 0cm 0cm;}', 0);
              //--esti_sheet.insertRule('@page {size: A4 landscape;margin:  0cm 0cm 0cm 0cm;}', 0);
              console.log(esti_sheet.cssRules.length);
              console.log(esti_sheet.cssRules);

              /*@page {

                size:landscape;
                size: 15cm 15cm;
                margin:  0cm 0cm 0cm 0cm;
              }*/



              alert('asdfasfd');
              //-----------------

              for(var i=0;i<impri.children.length;i++){
                var actPage=impri.children[i];
                actPage.style.margin='0px';
              }
              printableArea.appendChild(impri);
              noPrintableArea.style.display='none';

              printableArea.style.display='block';
              window.print();

              /*function printPage(htmlPage)
               {
                   window.frames["PrintFrame"].document.write(htmlPage);
                   window.frames["PrintFrame"].print();

               }
               printPage('<html><head><title></title></head><body><table border="1"><tr><td>row 1, cell 1</td><td>row 1, cell 2</td></tr><tr><td>row 2, cell 1</td><td>row 2, cell 2</td></tr></table></body></html>');
               */

            },false]
          ]
        }
      ]
  }

  $.add=
  {
    tag:'div'
    ,id:'jsreport'
    ,backgroundColor:'#ccc'
    ,width:'100%'
    ,height:'100%'
    ,display:'flex'
    /*,customProps:{
      pageProps:{set:function(v){

      }

      ,configurable:true}
    }*/
    ,pageProps:{
      width:'21cm'
      ,height:'26cm'
    }
    ,flexDirection:'column'
    ,alignItems:'stretch'
    ,position:'relative'
    //--,overflow:'scroll'
    ,border:'solid 1px grey'
    ,borderRadius:'3px'
    //--,model:[]
    ,children:[
      {
        tag:'jsrcontrols'
        ,
      }
      ,{
        tag:'jsrnoprintable'
        ,innerId:'jsr_jsrnoprintable'
        ,children:[
          {
            tag:'jsrheader'
            ,innerId:'jsr_jsrheader'
          }
          ,{
            tag:'jsrbody'
            ,innerId:'jsr_jsrbody'
            ,flexGrow:1
            ,overflow:'hidden'
            ,minHeight:'0'
            ,width:'21cm'
            ,minWidth:'21cm'
            ,maxWidth:'21cm'
            ,border:'solid 1px black'
          }
          ,{
            tag:'jsrfooter'
            ,innerId:'jsr_jsrfooter'
          }
        ]
      }
      ,{
        tag:'jsrprintable'
        ,innerId:'jsr_jsrprintable'
        ,flexGrow:1
        ,height:0
        ,overflow:'auto'
        //--,padding:'2cm'
      }
    ]
    ,aliases:[
      ['header',function(){return this.jsr_jsrnoprintable.jsr_jsrheader},'children']
      ,['body',function(){return this.jsr_jsrnoprintable.jsr_jsrbody},'children']
      ,['footer',function(){return this.jsr_jsrnoprintable.jsr_jsrfooter},'children']
      ,['body_',function(){return this.jsr_jsrnoprintable},'jsr_jsrbody']
    ]
    ,createReport:function(){
      this.createPages();
    }
    ,createPages:function(){

      var page0=$f.instanciar({tag:'jsrpage'});
      page0.assignProps=this.pageProps;


      this.jsr_jsrprintable.addChild_r(page0);

      //copiamos en absolute a la page
      //clonamos el header
      /*---for (var i = 0; i < this.header.length; i++) {//Recorremos cada elemento existente en el jsr_jsrnoprintable
        var actChild=this.header[i];
        //Obtenemos sus dimensiones y posicion en cm?
        var top_=actChild.dom.offsetTop;
        var left_=actChild.dom.offsetLeft;
        var right_=actChild.dom.offsetRight;
        var bottom_=actChild.dom.offsetBottom;

        var width_=actChild.dom.offsetWidth;
        var height_=actChild.dom.offsetHeight;

        var clon_=actChild.dom.cloneNode(true);
        clon_.id='';
        clon_.style.margin='0px';
        clon_.style.position='absolute';
        clon_.style.top=top_+'px';
        clon_.style.left=left_+'px';
        clon_.style.width=width_+'px';
        clon_.style.height=height_+'px';
        page0.jsrp_header.dom.appendChild(clon_);

      }
      //clonamos el body
      for (var i = 0; i < this.body.length; i++) {//Recorremos cada elemento existente en el jsr_jsrnoprintable
        var actChild=this.body[i];
        //Obtenemos sus dimensiones y posicion en cm?
        var top_=actChild.dom.offsetTop;
        var left_=actChild.dom.offsetLeft;
        var right_=actChild.dom.offsetRight;
        var bottom_=actChild.dom.offsetBottom;

        var width_=actChild.dom.offsetWidth;
        var height_=actChild.dom.offsetHeight;

        var clon_=actChild.dom.cloneNode(true);
        clon_.id='';
        clon_.style.margin='0px';
        clon_.style.position='absolute';
        clon_.style.top=top_+'px';
        clon_.style.left=left_+'px';
        clon_.style.width=width_+'px';
        clon_.style.height=height_+'px';
        page0.jsrp_body.dom.appendChild(clon_);

      }--*/
      function partirTableUp(objDom){
        var delt=false;
        for(var a=0;a<objDom.children.length;a++){
          var actG=objDom.children[a];
          if(delt==true){
            objDom.removeChild(actG);
            a--;
          }
          if(actG!==undefined){
            for(var b=0;b<actG.children.length;b++){
               var actR=actG.children[b];
               console.log('tamaño_: '+actG.children.length);
               if(actR.dataset.marked!==undefined /*|| actR.dataset.marked!==null || actR.dataset.marked!==''*/){
                 console.log(actR);
                 console.log(actR.dataset.marked);
                 console.log('encuentro marked en original')
                 //--alert('encuentro marked en original')
                 actR.dataset.marked==undefined;

                 delt=true;
               }
               if(delt==true){
                 console.log('>>>>>>>>>>>>elimino fila');
                 objDom.style.height=objDom.offsetHeight-actG.offsetHeight+'px';
                 actG.removeChild(actR);
                 b--;
               }
            }
          }

        }
        return objDom;
      }
      function partirTableDown(objDom){

        var delt=true;
        console.log('llego aqui');
        var firstRow=[];
        for(var a=0;a<objDom.children.length;a++){
          var actG=objDom.children[a];
          /*if(delt==true){
            objDom.removeChild(actG);
          }*/
          if(actG!==undefined){
            var controler=0;
            for(var b=0;b<actG.children.length;b++){

              var actR=actG.children[b];
              if(b==0 && controler==0){
                /**var firstRowR=actR;
                for(var c=0;c<firstRowR.children.length;c++){
                  var width_=firstRowR.children[c].offsetWidth+'px';
                  firstRow.push(firstRowR.children[c].style.width);
                  console.log('== LLEGO AQUI =='+firstRowR.children[c].style.width);
                  //console.log('== width =='+firstRow.children[c].style.width);
                }*/
                controler++;
                //--alert('firstrow en clon');
              }
               if(actR.dataset.marked=='breakHere' /*|| actR.dataset.marked!==null || actR.dataset.marked!==''*/){

                 delt=false;
                 actR.dataset.marked==undefined;
                 //----
                 /****for(var c=0;c<firstRow.length;c++){
                   //--var width_=firstRow.children[c].offsetWidth+'px';
                   var width_=firstRow[c];
                   console.log('== LLEGO AQUI =='+width_);
                   actR.children[c].style.width=width_;
                   actR.children[c].style.minWidth=width_;
                   actR.children[c].style.maxWidth=width_;
                 }
                 alert('encuentro marked en clon');*/
                 //---
//--                 console.log(actG);
               }else{
                 if(delt==true && actG.localName!=='thead'){

                   objDom.style.height=objDom.offsetHeight-actG.offsetHeight+'px';
                   actG.removeChild(actR);
                   b--;
                 }
               }
            }

          }
          if(actG.children.length==0 && actG.localName!=='thead'){
            objDom.removeChild(actG);
            a--;
          }

        }
        return objDom;
        //--console.log('&&&&& &&&&&&&& &&&&&&&&&&& salgo de partir table down')
      }

      function verif(page_){
        //Esta pagina se eliminará al final
        var nuevPage=$f.instanciar({tag:'jsrpage'});
        nuevPage.assignProps=this.pageProps;
        this.jsr_jsrprintable.addChild_r(nuevPage);
        //clonamos el header
        for(var a_=0;a_<page_.jsrp_header.dom.children.length;a_++){

          var actHeaderChild=page_.jsrp_header.dom.children[a_];
          nuevPage.jsrp_header.dom.appendChild(actHeaderChild.cloneNode(true));
        }

        //|Aqui verificamos si hay algun elemento del printable boduy page que pase los limites, entonces lo continuamos hacia abajo
        console.log(page_.jsrp_body.dom.children.length);

        for(var i=0;i<page_.jsrp_body.dom.children.length;i++){
          var actDomChild=page_.jsrp_body.dom.children[i];
          console.log(actDomChild);
          if(actDomChild.offsetTop+actDomChild.offsetHeight>actDomChild.parentNode.offsetHeight){
            console.log(actDomChild.offsetBottom);
            //aqui partimos el objeto
            if(actDomChild.localName=='table'){//Por ahora solo cuando es table
              //primero detectamos en que parte colisiona con el limite

              for(var a=0;a<actDomChild.children.length;a++){
                var actTGroup=actDomChild.children[a];
                for(var b=0;b<actTGroup.children.length;b++){
                  var actRow=actTGroup.children[b];
                  if(actDomChild.offsetTop+actTGroup.offsetTop+actRow.offsetTop+actRow.offsetHeight>actDomChild.parentNode.offsetHeight){
                    actRow.dataset.marked='breakHere';
                    console.log(actRow);
                    //--console.log(actDomChild.);
                    var clonCPase=actDomChild.cloneNode(true);
                    //---actDomChild.parentNode.nextSibling.appendChild(clonCPase);//la siguiente pagina
                    actDomChild.height='auto';
                    partirTableUp(actDomChild);
                    var clonCPase_=partirTableDown(clonCPase);
                    console.log(clonCPase_);
                    console.log(clonCPase);
                    clonCPase_.style.top='0px';

                    nuevPage.jsrp_body.dom.appendChild(clonCPase_);//la siguiente pagina

                    alert('en esta fila paso el limite')
                    //aqui generamos un clon de este elemento y lo agregamos a la ventana siguiente

                    break;
                  }
                }
              }

            }

          }
        }
        var this_=this;
        if(nuevPage.jsrp_body.dom.children.length>0){
          console.log(nuevPage.jsrp_body.dom);
          console.log(nuevPage.jsrp_body.dom.children);
          console.log(nuevPage.jsrp_body.dom.children.length);
          alert('tengo mas elementos que cero: '+nuevPage.jsrp_body.dom.children.length)
          verif.bind(this_)(nuevPage);
        }
      }
      //----verif.bind(this)(page0);


      //this.jsr_jsrprintable
      //---this.jsr_jsrnoprintable.display='none';
      //this.jsr_jsrprintable.display
    }
    ,load_r:function(){
      this.createPages();
    }
  }
})


/*function moveElementsToNext(obj){

  for (var i=0;i<obj.children.length;i++){
    var actChild=obj.children[i];
    if(actChild.dom.scrollBottom>obj.dom.offset){
      move(actChild);


    }
  }
}
*/
