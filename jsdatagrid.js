$$.require(['jsdatarow'], function(){
  $.add={
    tag:'div'
    ,id:'jsdatagrid'
    ,position:'relative'
    /*,display:'flex'
    ,flexDirection:'column'*/
    ,border:'solid 1px #bbb'
    ,margin:'10px 0px'
    ,overflow:'auto'
    ,model:{}
    ,selectedRowIndex:0
    ,aliases:[
      ['innerTable',function(){return this.innerContainer},'innerTable_']
    ]
    ,getSelectedRow:function(fromModel){
      var row=null;
      if(this.innerTable.children.length>0){
        if(fromModel==true){
          row=this.model.data[this.selectedRowIndex];
        }else{
          row=this.getRow(this.selectedRowIndex);
        }
      }


      return row;
    }
    ,customProps:{
        getRow:{
        configurable:true,writable:true,enumerable:true,value:function(index){
          return this.innerTable.children[index];
          }
        }
        ,
        addRow:{
          configurable:true,writable:true,enumerable:true,value:function(id,index_){
            var trId=this.id+'_'+this.innerTable.children.length;
            if(id!==undefined){
              trId=id;
            }
          //alert('agregando row');
          //--console.log(this.innerTable.dom);
          /***console.log('marginBottom_Ant: ' +getCS(this.innerTable.dom,'marginBottom'));
          this.innerTable.marginBottom=(parseInt(getCS(this.innerTable.dom,'marginBottom'))-30)+'px';
          console.log('marginBottom_Desp: ' +this.innerTable.marginBottom);*/
          this.innerTable.addChild_r(crear_objeto_js({tag:'jsdatarow',id:trId,overflow:'hidden',whiteSpace:'nowrap',index:index_}));
          return $[trId];
        }
      }
      ,agregarFilas:{
        configurable:true,writable:true,enumerable:true,value:function(data,headerAr,filaInicio,filaFin,esMas){


          if(esMas!==undefined){
            console.log('===ES MAS=======');
            //this.clear();
            for(var i=this.innerTable.children.length-1;i>-1;i--){
              this.innerTable.children[i].delete();
            }
            /*while(this.innerTable.children.length>0){
              this.innerTable.children[0].delete();
            }*/

            //---this.innerTable.marginTop=(this.dom.scrollTop+30)+'px';//this.dom.offsetHeight;
            this.innerTable.marginTop=(filaInicio*30+30)+'px';//this.dom.offsetHeight;

          }else{
            this.innerTable.marginTop=(30)+'px';//this.dom.offsetHeight;
          }


                    console.log('===MarginBottom: '+(data.length*30-filaFin*30));
                    this.innerTable.marginBottom=(data.length*30-filaFin*30)+'px';//this.dom.offsetHeight;
          //--console.log('Estoy ena gregar filas en scroll');
          for(var r=filaInicio;r<filaFin;r++){

              var row=data[r];
              //if($[]
              var idFila=this.id+'_'+r;
              if(!$.hasOwnProperty(idFila)){

                this.addRow(idFila,r);
                for(var k in row){

                  if(headerAr[k]!==undefined/* && r<1*/){
                    //---this.getRow(data.length-1).addCell(row[k]);//automaticamente obtiene el tipo de valor de celda.
                    //-----this.getRow(r).addCell(row[k]);//automaticamente obtiene el tipo de valor de celda.
                    $[idFila].addCell(row[k],headerAr[k].props);//automaticamente obtiene el tipo de valor de celda.
                  }

              }
              }

          }

          //---------------------------------------------------------------------------
          var firstRow=this.innerTable.children[0].dom;
          var ii=0;
          for(var i=this.innerContainer.jsdatagrid_header.children.length-1;i>-1;i--){
            this.innerContainer.jsdatagrid_header.children[i].delete();
          }


          for(k in headerAr){
            var column=headerAr[k];
            var colName=k;
            var colSName=column.showName;
            var isV=column.isVisible;
            var jsdheader={
              tag:'div'
              ,display:'inline-flex'
              ,alignItems:'center'
              ,textContent:colSName
              ,height:'30px'
              ,padding :'0px 5px'
              ,borderRight:'solid 1px #E1E1E1'
              ,textOverflow:'ellipsis'
              ,overflow:'hidden'
              ,whiteSpace:'nowrap'
            };

            var actChild=firstRow.children[ii];
            actHeader=crear_objeto_js(jsdheader);

            if(ii==Object.keys(headerAr).length-1){
              //--alert('aqui: '+headerAr.keys().length);
              actHeader.flexGrow=1;
              actHeader.borderRight='0px';
              /*actHeader.width='1000px';
              actHeader.minWidth='1000px';*/

            }else{
              //--alert('no aqui: '+headerAr.keys().length);
              //--actHeader.width=actChild.getCS('width');
              //console.log(getCS(actChild,'width'));
              actHeader.minWidth=getCS(actChild,'width');
              actHeader.width=getCS(actChild,'width');
              actHeader.maxWidth=getCS(actChild,'width');
            }
            //DETERMINANDO VISIBILIDAD
            console.log('.,,,,,,,,,,,,,,,,,,display :'+actChild.display+' ,,,,,,,,,,,,,,,,');
            console.log(actChild);
            if(actChild.style.display=='none'){
              console.log('.,,,,,,,,,,,,,,,,,,display none ,,,,,,,,,,,,,,,,');
              actHeader.display='none';
            }

            //alert('estiy aqui');

            this.innerContainer.jsdatagrid_header.addChild_r(actHeader);
            ii++;
          }
          //---------------------------------------------------------------------------

      }
    }
      ,assignModel:{configurable:true,writable:true,enumerable:false,value:function(model){

//----------------------------------------------------------------------
console.log(this.innerTable);
var target = this.innerTable.dom;

// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {

    if(mutation.type=='attributes' && mutation.attributeName=='style'){
      console.log(mutation);
      console.log('CAMBIO ESTILO');
    }
    //--console.log(mutation.type);
  });
});

// configuration of the observer:
var config = { attributes: true, /*childList: true,*/ characterData: true };

// pass in the target node, as well as the observer options
//-----observer.observe(target, config);

// later, you can stop observing
//--observer.disconnect();
//-----------------------------------------------------------------------

        this.clear();
        this.model=model;

        function isInHeader(k,headerAr){

          var retorno=false;
          for(var i=0;i<headerAr.length;i++){
            var head=headerAr[i];
            if(head['inModelName']==k){
              retorno =true;
              break;
            }
          }
          return retorno;
        }

        var headerAr=this.model.header;
        var data=this.model.data;
        //--this.innerTable.display='none';
        //alert('antes');
        console.log('----------------------ANTES----------------------');

        var prealto=getCS(this.dom,'height');
        //--var alto=parseFloat(prealto);
        var alto=parseFloat(this.dom.offsetHeight);
        console.log(this.dom);
        //alert(this.dom.offsetHeight);
        var cantMaxFilas=parseInt(alto/30)-1;


        this.agregarFilas(data,headerAr,0,cantMaxFilas);
        this.innerTable.marginBottom=30*(data.length-cantMaxFilas+1)+'px';

        console.log('----------------------DESPUES----------------------');


        //--this.innerTable.display='flex';

        /*
        var firstRow=this.innerTable.children[0].dom;
        var ii=0;
        for(k in headerAr){
          var column=headerAr[k];
          var colName=k;
          var colSName=column.showName;
          var isV=column.isVisible;
          var jsdheader={
            tag:'div'
            ,display:'inline-block'
            ,textContent:colSName
            ,height:'30px'
            ,border:'solid 1px black'
            ,backgroundColor:'#ccc'
          };

          var actChild=firstRow.children[ii];
          actHeader=crear_objeto_js(jsdheader);
          //--actHeader.width=actChild.getCS('width');
          //console.log(getCS(actChild,'width'));
          actHeader.minWidth=getCS(actChild,'width');
          actHeader.width=getCS(actChild,'width');
          actHeader.maxWidth=getCS(actChild,'width');
          this.jsdatagrid_header.addChild_r(actHeader);
          ii++;
        }
        */

      }
      ,assignModel:function(){
        this.model=model;
        this.recargar();

      }
    }
//alert('en assign');

    }
    ,load_r:function(){

      //alert('EN LOAD DE JSDATAGRIDS');

      /*this.assignModel({
        header:[
          {
            inModelName:'c1'
            ,showName:'Columna 1'
            ,isVisible:true
          }
          ,{
            inModelName:'c2'
            ,showName:'Columna 2'
            ,isVisible:true
          }
        ]
        ,data:[
          {c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}
          ,{c1:'valor1',c2:'valor2'}

        ]
      });*/
    }
    ,clear:function(callback){
      for(var i=this.innerTable.children.length-1;i>-1;i--){
        this.innerTable.children[i].delete();
      }
      /*
      while(this.innerTable.children.length>0){
        this.innerTable.children[0].delete();
      }
      */
      if(callback!==undefined){
        callback();
      }

    }
    ,loads:function(){
      alert('en init de jsdatagrid');
      this.addRow();

    }
    ,load_rs:function(){
      //alert('en jst');
      var firstRow=this.innerTable.children[0].dom;
      //alert(firstRow.children.length);

      for(var i=0;i<firstRow.children.length;i++){

        var jsdheader={
          tag:'div'
          ,display:'inline-block'
          ,textContent:'heasaddff'
          ,border:'solid 1px black'
          ,backgroundColor:'#ccc'
        };

        var actChild=firstRow.children[i];
        actHeader=crear_objeto_js(jsdheader);
        //--actHeader.width=actChild.getCS('width');
        console.log(getCS(actChild,'width'));
        actHeader.minWidth=getCS(actChild,'width');
        actHeader.width=getCS(actChild,'width');
        actHeader.maxWidth=getCS(actChild,'width');
        this.innerContainer.jsdatagrid_header.addChild_r(actHeader);
      }
    }
    ,recargar:function(firstone){

        //--this.innerTable.marginTop=this.innerTable.marginTop+parseInt(this.dom.scrollTop);
        //--this.innerTable.marginBottom=this.innerTable.marginBottom-parseInt(this.dom.scrollTop);
        //---console.log('--scroll--: '+this.dom.scrollTop);
        var alto=this.innerContainer.dom.offsetHeight-30;
        //----var alto=this.dom.offsetHeight+30-30;
        var esMas=undefined;
        /*console.log(this.dom.offsetHeight);
        console.log(this.dom.scrollTop);*/
        var fromF=0,toF=0;
        //--if(this.dom.scrollTop<alto){
          /**console.log('ES MAS');
          fromF=alto/30-1;
          toF=parseInt((this.dom.scrollTop+alto)/30)-1;
          console.log('Es necesario agregar rows');
          */
        //--}else{
          //---fromF=(parseInt(parseInt(this.dom.scrollTop)/30)-1);
          //---toF=(parseInt((parseInt(this.dom.scrollTop)+alto)/30)-1);
          fromF=(parseInt(parseInt(this.innerContainer.dom.scrollTop)/30));
          toF=(parseInt((parseInt(this.innerContainer.dom.scrollTop)+alto)/30));
          esMas=1;

        //--}
        console.log('Alto: '+(parseInt(alto/30)-1));
        console.log('fromF: '+fromF);
        console.log('toF: '+toF);
        console.log('Data.length: '+this.model.data.length);
        this.agregarFilas(this.model.data,this.model.header,fromF,toF,esMas);
        if(this.selectedRowIndex==0){
          this.selectRow(0);
        }


    }
    ,selectRow:function(index){
      var actRow=null;
      var retRow=null;
      for(var i=0;i<this.innerTable.children.length;i++){
        actRow=this.innerTable.children[i];
        actRow.backgroundColor='transparent';
        actRow.selected=0;
        if(actRow.index==index){
          retRow=actRow;
          actRow.backgroundColor="#00aacc";
          actRow.selected=1;
          this.selectedRowIndex=index;

        }
      }
      return retRow;

      /*for(var i=0;i<rowClicked.parent.children.length;i++){
        rowClicked.parent.children[i].
        rowClicked.parent.children[i].selected=0;
      }*/


    }
    ,events:[
      ['click',function(e){
        console.log(e.target);
        if($[e.target.id].parent.tag=='jsdatarow'){
          var rowClicked=$[e.target.id].parent;
          console.log(rowClicked.index);
          this.selectRow(rowClicked.index);

        }

      },true]

    ]
    ,children:[

      /*,{
        tag:'div'
        ,innerId:'topTable'
        //,textContent:'sadfsdaf'
        ,height:'0px'
        ,marginBottom:'30px'
        //,border:'solid 1px green'
      }
      ,*/
      {
        tag:'div'
        ,innerId:'innerContainer'
        ,position:'absolute'
        ,overflow:'auto'
        ,backgroundColor:'#fff'
        //--,border:'solid 2px brown'
        ,top:'0px'
        ,width:'100%'
        //--,display:'flex'
        ,bottom:'0px'
        ,zIndex:'1'
        ,tabIndex:0
        ,lastScroll:0
        ,deltaPerScroll:30
        ,events:[
          ['scroll',function(e){
            var node = this.dom;
             /*-----if (node.scrollTop != this.lastScroll) {
                 var delta = node.scrollTop < this.lastScroll ? -this.deltaPerScroll : this.deltaPerScroll;
                 node.scrollTop = this.lastScroll + delta;
             }
             this.lastScroll = node.scrollTop;*/
            //---e.preventDefault();
            //---this.dom.scrollTop=this.dom.scrollTop+30;
            this.jsdatagrid_header.top=this.dom.scrollTop+'px';
            this.jsdatagrid_header.width=this.parent.innerTable.dom.offsetWidth+'px';
            this.parent.recargar();
            this.parent.selectRow(this.parent.selectedRowIndex);
    //alert('HICE SCROLL SIN QUERER');
          },'false']
          ,['click',function(e){
            ///alert('asdfasfd');
            //--this.innerTable.marginTop='90px';
    //alert('LOAD');
          },'true']
          ,['keydown',function(e){

            if(e.keyCode==38){
              e.preventDefault();
              //--this.dom.scrollTop=this.dom.scrollTop-30;
              var actRow='';
              if(this.parent.selectedRowIndex>0){
                actRow=this.parent.selectRow(this.parent.selectedRowIndex-1);
                if(actRow!==null && actRow!==undefined){
                  console.log(actRow.dom.nextSibling);
                  if(actRow.dom.previousSibling==null){
                    this.dom.scrollTop=this.dom.scrollTop-30;
                  }

                }
              }


            }
            if(e.keyCode==40){
              e.preventDefault();
              var actRow='';
              if(this.parent.selectedRowIndex<this.parent.model.data.length-1){
                actRow=this.parent.selectRow(this.parent.selectedRowIndex+1);

                if(actRow!==null && actRow!==undefined){
                  console.log(actRow.dom.nextSibling);
                  if(actRow.dom.nextSibling==null){
                    this.dom.scrollTop=this.dom.scrollTop+30;
                  }

                }
              }



              //---console.log(this.parent.selectRow());

              /*---if(this.getSelectedRow(false).dom.scropp){

              }*/
              //--this.dom.scrollTop=this.dom.scrollTop+30;

            }

          },false]
        ]
        ,children:[
          {
            tag:'div'
            ,id:'jsdatagrid_header'
            //,minWidth:'100%'
            //,flexGrow:1
            ,display:'flex'
            ,position:'absolute'
            ,backgroundColor:'#F1F1F1'
            ,top:'0px'
            ,minWidth: '100%'
            ,width:'auto'
            ,left:'0px'
            ,right:'0px'
            //,right:'0px'
            //,marginTop:'0px'
            ,height:'30px'
            ,maxHeight:'30px'
            ,borderBottom:'solid 1px #E1E1E1'
            ,borderCollapse: 'collapse'
            ,overflow:'hidden'
            ,whiteSpace:'nowrap'
            ,zIndex:2
          }
          ,{

            tag:'table'
            ,backgroundColor:'white'
            ,marginTop:'30px'
            ,border:'solid 1px #E1E1E1'
            ,innerId:'innerTable_'
            //--,innerIdTo:[]
            ,minWidth:'100%'
            ,borderCollapse: 'collapse'
            ,marginBottom:'0px'

          }
        ]
      }
      ,{
        tag:'div'
        ,innerId:'botTable'
        //,textContent:'sadfsdaf'
        ,height:'0px'
        ,marginTop:'0px'
        ,textContent:'asdfasdf'
        ,fontSize:'1px'
        //,border:'solid 1px green'
      }
    ]
  }
})
