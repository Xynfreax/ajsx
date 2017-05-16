$$.require(['../globalFunciones','../../vista/gfunctions','str','../ajinputlabel/idx'],function() {
  // $.jstable_e.events=
  // $f.jstable_events=
  // [
  //   ['click',function(e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //
  //   },true]
  // ]
  // $.jstable_e.middle.events=[
    // ['click',function(e) {
    //   alert('click en middle');
    // },false]

    // ['scroll',function() {
    //   var tableheader=this.tableheader;
    //   alert(this.o);
    //   // if(tableheader.dom.offsetTop){
    //   //
    //   // }
    // }]
  // ];

  Object.assign($j.ajtable,{
    // tag:'ajtable_e',id:'ajtable'
    // ,qmodel:''
    // ,qparams:{}

    afterReload:async function() {
      // body...
    }
    ,afterSelectRow:function(rsel) {

    }
    ,setSelectedRow:function(ind,resel) {//resel=false para que no seleccione el input, true para que is s
      let th=this;
      let rows=th.box.middle.tablebody.mytbody.children;
      if(get_type(ind)==3){//numero
        ind=[ind];//lo metemos en un array porque setselectedrow usa un array para seleccionar(varios filas)
      }
      let rt=null;
      for (let i = 0; i < rows.length; i++) {
        let actRowAo=rows[i];
        if(th.options.selectMode!=='multiple'){
          actRowAo.classList.remove('selected')
          actRowAo.selected=false;
        }

        if(ind.indexOf(actRowAo.ind)>-1){
          actRowAo.classList.add('selected');
          actRowAo.selected=true;
          rt=actRowAo;
          // actRowAo.children[0].dom.focus();
          // th.box.middle.dom.scrollTo(0,(actRowAo.dom.offsetTop-actRowAo.dom.offsetHeight)+'px');
            // th.box.middle.dom.scrollTo(0,(actRowAo.dom.offsetTop+30)+'px');
            // actRowAo.dom.scrollIntoView(false);
          // alert(JSON.stringify(th.model[i][th.mytop.myfilterfields.myselect.value]));
          if(resel!==false){//para que ponga en el input el valor de la fila seleccionada
            //desactivado por ahora
            //--th.mytop.myfilterfields.myinput.value=th.model[i][th.mytop.myfilterfields.myselect.value]

          }

        }
      }

      if(rt && rt.dom.offsetTop+rt.dom.offsetHeight-30>th.box.middle.dom.scrollTop+th.box.middle.dom.offsetHeight){
        // alert(rt.dom.offsetTop+rt.dom.offsetHeight);
        // alert(th.box.middle.dom.scrollTop+th.box.middle.dom.offsetHeight);
        // th.box.middle.dom.scrollTo(0,rt.dom.offsetTop+rt.dom.offsetHeight);
        rt.dom.scrollIntoView(false);
      }
      // alert(rt.dom.offsetTop);
      // alert(th.box.middle.dom.scrollTop+30);
        // let nextrt=rt.dom.nextSibling;
        // alert(th.box.middle.getCS('overflow-y'));
        let overf=th.box.middle.getCS('overflow-y');
       if(rt && rt.dom.offsetTop<th.box.middle.dom.scrollTop+30 && (overf=='auto' || overf=='scroll')){
        // alert(rt.dom.offsetTop);
        // alert(th.box.middle.dom.scrollTop);
        th.box.middle.dom.scrollTo(0,rt.dom.offsetTop-30);
        // rt.dom.scrollIntoView(true);
      }else{
        // console.log('');
      }
      th.afterSelectRow();
      return rt;
    }
    ,getSelectedRow:function(inmodel) {

      var th=this;
      var rows=th.box.middle.tablebody.mytbody.children;
      var rt=[];

      for (var i = 0; i < rows.length; i++) {
        var actRowAo=rows[i];
        if(actRowAo.selected==true){
          // alert(inmodel);
          if(inmodel==true){
            rt.push(th.model[i]);
          }else if(inmodel==2){//para que devuelva el indice
            // alert(i);
            rt.push(i);
          }else{
            rt.push(actRowAo);
          }
          // rt.push(actRowAo);
        }
      }
      if(rt.length==1){
        return rt[0];
      }else if (rt.length>1){
        return rt;
      }else{
        return undefined;
      }

    }

    ,generateCell:function(mask,field,row) {//mask=fieldmask
      var rt={tag:'td',tabIndex:0};
      rt.field=mask.field;


      if(mask.val==undefined){//undefined
        rt.textContent=row[field];
      }else if(get_type(mask.val)==2){//cadena

        if(row[field]==undefined || row[field]==null){
          rt.textContent=mask.val;
        }else{
          rt.textContent=row[field];
        }


      }else if(get_type(mask.val)==0 && get_type(mask.val.obj)==0 && mask.val.obj.tag!==undefined){//aoobj

        var cellAo=mask.val.obj;
        var fields=[];
        if(get_type(mask.val.fields)==0){//objeto
          // alert('msg');
          fields=mask.val.fields;
        }
        // alert(JSON.stringify(mask.val));
        var count=0;
        var tama=Object.keys(fields).length;

        let fieldToUse=null;
        let fieldToUse2=null;
        for(var k in fields){

          var actFieldReferred=fields[k];
          let actFieldProp=k;
          // alert(row[field]);



          cellAo[actFieldProp]=(actFieldReferred=='own'?row[field]:row[actFieldReferred]);
          // cellAo[actFieldProp]=actFieldReferred;
          count++;
          if(tama==count){
            fieldToUse2=actFieldProp;

            if(actFieldReferred=='own'){


              row[field]=cellAo[actFieldProp];

              //--algoo=cellAo
              fieldToUse=field;
              // alert(row[field]);
              // alert(cellAo[actFieldProp]);
            }else{
              fieldToUse=actFieldReferred;
              row[actFieldReferred]=cellAo[actFieldProp];
            }

          }
        }
        cellAo.load_r=function() {
          let th=this;
          Object.defineProperty(row, fieldToUse, {
            get: function() { return /*this.checked;*/th[fieldToUse2]; },
            set: function(v) {th[fieldToUse2]=v;},
            enumerable: true,
            configurable: true
          });
        }



        rt.children=[cellAo];
        // alert('msg');


      }
      return rt;
    }
    // ,qmodel:'listaAlumnosInscritos'

    ,aqmodel:async function(query_,params_){


      var th=this;
      var params=params_;
      let query=query_;
      if(query==undefined){
        query=th.qmodel;
      }

      if(params==undefined){
         params=(th.qparams?extenderObj(th.qparams):{});
      }

      // alert('asdfasdf');
      // th.arowsxpage();
      // th.setFilterFields();
      th.setOrderby();
      // alert('afterenaqmodel');

      // th.setLimit();
      th.orderTable();
      // alert('after order table');
      // var params=(th.qparams?extendObj(th.qparams):{});
      params.orderby=th.orderby;//th.getOrderby()
      // console.log('--filterFields',th.getFilterFields());
      Object.assign(params.filterFields,th.getFilterFields());
      params.limit=th.limit;
      params.offset=th.offset;


      console.log('params a senviar:', params);
      let resp={};
      if(query!==undefined){
        th.startwaiting();
        th.qmodel=query;
        resp=await $_.query(query,params);
        // th.model=resp.data;
        th.amodel(resp.data);
        th.stopwaiting();
      }

      //if(resp.data.length>0 && Object.keys(resp.data[0]).length>=2){
        // console.log(resp.data);

        // th.amodel();
      // s}
      // --th.reloadModel();

      return resp.data;

    }
    ,amodel:function(model_) {

      var th=this;
      var model=model_;
      if(model==undefined){
        model=this.model;
      }
      if(model==undefined){
        model=[];
      }
      // alert(th.offset);
      // alert(th.limit);


      th.box.middle.tablebody.mytbody.emptyChildren();

      var limitSup=(model.length>th.offset+th.limit?th.offset+th.limit:model.length);
      // alert(limitSup);
      // alert(model.length);

      //---

      if(model.length>0){
        totalrows=model[0].c;
      }else{
        totalrows=0;
      }
      //----

      for (let i = 0; i < model.length; i++) {
        var actItemRow=model[i];
        var rowJson={tag:'ajrow',ind:i};
        var newRowAo=$f.instanciar(rowJson);

        th.box.middle.tablebody.mytbody.addChild_r(newRowAo);
        for (var ii = 0; ii < th.mask.length; ii++) {
          var actFieldMask=th.mask[ii];
          //if(actItemRow[actFieldMask.field]){
          // console.log(i);
            var actFieldVal=actItemRow[actFieldMask.field];
            var newCellAo=$f.instanciar(th.generateCell(actFieldMask,actFieldMask.field,actItemRow));
            newRowAo.addChild_r(newCellAo);
            newCellAo.dom.dataset.field=actFieldMask.field;
            if(actFieldMask.hidden==true){
              newCellAo.dom.dataset.hidden=true;
            }
            if(actFieldMask.type){//es es para cuando sea numero por ejemplo
              newCellAo.dom.dataset.type=actFieldMask.type;
              if(actFieldMask.type=='money'){//se asume que no tendra children el td
                if(actFieldVal){
                  newCellAo.textContent=parseFloat(actFieldVal).toFixed(2);
                }

              }
            }

            if(get_type(actFieldMask.after)==4){
              actFieldMask.after(actFieldMask.field,actFieldVal,newCellAo,newRowAo);
            }

          //}
        }


      }
      th.model=model;
      // th.updateHeader();//ojojo
      // alert(th.mytop.myfilterfields.myinput.value.toString().trim().length);

      // if(model.length>0 && th.mytop.myfilterfields.myinput.value.toString().trim().length==0){
      //   alert('here');
      //   th.box.classList.add('closed');
      //   th.box.classList.remove('open');
      // }
      // if(model.length>0 && th.mytop.myfilterfields.myinput.dom===document.activeElement){
      if(model.length>0 && th.mode!=='popup'){

        th.setPagination(totalrows);
      }
      if(model.length>0 && th.mode=='popup' && th.dom.contains(document.activeElement)){

        th.setPagination(totalrows);
        th.box.classList.add('open');
        th.box.classList.remove('closed');
        // alert(model[0].c);
      }else if (th.mode!=='popup'){
        th.box.classList.add('closed');
        th.box.classList.remove('open');
      }
      // alert(JSON.stringify(model));
      th.updateHeader();
      if(th.model.length>0){
        th.setSelectedRow(0,false);
      }
      th.afterReload();


    }
    ,reloadModel:async function(ind/*conserva la seleccion*/,isamodel) {
      //--alert('msg');
      var th=this;
      let lastselected=0;
      if (ind==true){//seleccionara el
        lastselected=th.getSelectedRow(2)||0;
      }else if(get_type(ind)==3){//numero
        lastselected=ind;
      }else if(get_type(ind)==0){
        // alert('en object');
        lastselected=0;
        let ffield=Object.keys(ind)[0];
        let ffval=ind[ffield];
        for (let i = 0; i < th.model.length; i++) {

          if(th.model[i][ffield]==ffval){
            lastselected=i;
            break;
          }
        }
      }
      let aqm=null;
      if(isamodel==true){
        let aqm=th.amodel();//no await
      }else{
        let aqm=await th.aqmodel();
      }
      th.setSelectedRow(lastselected);
      //solo en caso que se especifique un indice
      if(get_type(ind)==3){//numero
        let lastrow=th.getSelectedRow();
        let lastrowtop=lastrow.dom.offsetTop;
        // alert(lastrow.dom.offsetTop);
        th.box.middle.dom.scrollTo(0,lastrowtop);
      }
      return aqm;
    }
    ,getFilterFields:function() {
      var th=this;
      var rt={};
      console.log(th.mytop.myfilterfields.myselect.value);
      var field_=th.mytop.myfilterfields.myselect.value;
      //var field='id';
      console.log('---obteniendo selectedrow de ajselect: ',th.mytop.myfilterfields.myselect.getSelectedRow());
      if(field_){
        rt[field_]={
          val:th.mytop.myfilterfields.myinput.value
          ,type:th.mytop.myfilterfields.myselect.getSelectedRow().type
        };
      }
      return rt;

    }

    ,startwaiting:function() {
      // this.classList.remove('waiting');
      this.classList.add('waiting');
    }
    ,stopwaiting:function() {
      this.classList.remove('waiting');
    }
    ,setOffset:function(offset_) {
      var th=this;
      var offset=offset_;
      if(offset==undefined){
        offset=0;
      }
      th.offset=offset;
    }
    ,setLimit:function(limit_) {
      var th=this;
      var limit=limit_;if(limit==undefined){
        limit=th.mytop.myrowsxpage.value;
      }
      th.limit=limit;
      th.setOffset();//el offset se vuelve 0

    }
    ,setFilterFields:function() {

      var th=this;
      var model=[];
      if(th.mask){
        var selectedVal;
        for (var i = 0; i < th.mask.length; i++) {
          var actField=th.mask[i];

          if(actField.filterable!==undefined){
            console.log('--asignado filter fields: ',(actField.type||'string'));
            model.push({field:actField.field,val:actField.header,type:(actField.type||'string')});
            if(actField.filterable==true){
              selectedVal=actField.field;
            }
          }
        }
        th.mytop.myfilterfields.myselect.amodel(model);
        // alert();
        th.mytop.myfilterfields.myselect.value=selectedVal;
      }

    }
    ,setOrderby:function(field_,direction_) {
      // alert(field_+'-'+direction_);
      let th=this;
      let field=field_;
      let direction=direction_;
      if(field==undefined){
        field=th.orderby.field;
        direction=th.orderby.direction;
      }

      if(field==undefined || direction==undefined){
        // alert('hr');
        // alert(th.orderby.field);
        if(th.mask){
          for (let i = 0; i < th.mask.length; i++) {
            let actField=th.mask[i];
            if(actField.orderby){
              th.orderby.field=actField.field;
              th.orderby.direction=actField.orderby;
            }
          }
        }
        if(!th.orderby.field){
          th.orderby.field=th.mask[0].field;
          th.orderby.direction='asc';
        }
      }else{
        th.orderby.field=field;
        th.orderby.direction=direction;
      }
      //actualizamos al ao
      // th.orderby.field=field;
      // th.orderby.direction=direction;
      // alert(th.orderby.field);
    }
    ,setPagination:function(total_) {
      // alert('HERE');
      var th=this;
      var total=total_;
      // if(total==undefined){
      //   total=(th.offset+1)*th.limit;
      // }
      //manipulamos ui
      // var offset=
      var limitsup=th.limit;
      if(limitsup==0){
        limitsup=total_;
      }
      var totalPages=Math.ceil(total/(limitsup));

      var actPage=Math.ceil((th.offset+1)/limitsup);

      th.box.mynav.mypagebuttons.emptyChildren();
      th.box.mynav.mydirbuttons.emptyChildren();
      for (var i = 0; i < totalPages; i++) {

        // var actPageItem=totalPages[i];

        var isselectedclass='';
        if((i+1)==actPage){
          isselectedclass=' actpage'
          if(i==0){
            th.box.mynav.mydirbuttons.addChild_r($f.instanciar({tag:'ajbutton',classN:'mybutton',page:totalPages,text:'Ultimo'}))
          }else if(i==totalPages-1){//el ultimo
            th.box.mynav.mydirbuttons.addChild_r($f.instanciar({tag:'ajbutton',classN:'mybutton',page:1,text:'Primero'}))
          }else{
            th.box.mynav.mydirbuttons.addChild_r($f.instanciar({tag:'ajbutton',classN:'mybutton',page:1,text:'Primero'}))
            th.box.mynav.mydirbuttons.addChild_r($f.instanciar({tag:'ajbutton',classN:'mybutton',page:totalPages,text:'Ultimo'}))
          }
        }

          var actPageBtnAo=$f.instanciar({tag:'ajbutton',classN:'mybutton'+isselectedclass,text:i+1,page:i+1})
          let showback=actPage-3;
          let shownext=actPage+1;

          if(i<showback || i>shownext){
            actPageBtnAo.display='none';
          }
          th.box.mynav.mypagebuttons.addChild_r(actPageBtnAo);




      }

    }
    ,arowsxpage:function(model_) {
      var th=this;
      var model=model_;

      if(model==undefined){
        model=th.options.rowsxpageList;
      }

      var selectModel=[];
      var selectedVal=null;
      for (var i = 0; i < model.length; i++) {

        var actItem=model[i];
        var okeys=Object.keys(actItem);
        console.log(actItem[okeys[0]]);
        selectModel.push({ cod:+okeys[0],val:okeys[0] });
        if(actItem[okeys[0]]==true){
          selectedVal=okeys[0]
        }
      }
      th.mytop.myrowsxpage.amodel(selectModel);
      if(selectedVal!==null){
        th.mytop.myrowsxpage.value=selectedVal;
      }


    }
    ,preload:function() {
      // alert('msg');
      let th=this;
      th.assignProps={
        qparams:{filterFields:{}}
        ,orderby:{}
        ,options:{
          maxpagesshown:5
          ,rowsxpageList:[
            {0:false},
            {5:false},
            {10:true},
            {50:false}
          ]
          ,showRowsxpage:true
          ,selectMode:'simple'//simple=default

        }
        // ,mask:[
        //   {name:'cod',default:0,type:'number',editable:false,filter:true}
        //   ,{name:'val',default:'',type:'string',editable:true,filter:true}
        // ]
        ,model:[
          // {cod:'1',val:'nombre'}
          // ,{cod:'1',val:'nombre'}
          // ,{cod:'1',val:'nombre'}
          // ,{cod:'1',val:'nombre'}
          // ,{cod:'1',val:'nombre'}
        ]
        ,mask:[
          // {field:'id',header:'id',filterable:true,hidden:false,type:'number'}//si fields=undefined => textContent
          // ,{field:'apellidos',header:'Apellidos asdfas dfas gsg dafggfa ga g',val:{obj:{tag:'b'},fields:{textContent:'own'}},filterable:true,orderby:'desc'}//si fields=undefined => textContent
          //Ojo: se debe bindear los objetos con su respectivo modelo-columna
          // ,{field:'val',val:{tag:'div',fieldVal:'textContent'}}
          // ,{field:'val',val:{tag:'div',fieldVal:'textContent'}}
        ]
        ,customProps:{
          showPagination:{set:function(v){
            if(v==false){
              this.options.rowsxpageList=[
                  {0:true}
                ]
              this.mytop.myrowsxpage.display='none';
              this.box.mynav.display='none'
            }

          },configurable:true}
          ,showSearch:{set:function(v){
            if(v==false){
              // this.options.rowsxpageList=[
              //     {0:true}
              //   ]
              this.mytop.myfilterfields.display='none';
              // this.mynav.display='none'
            }

          },configurable:true}
          ,showTop:{set:function(v){
            if(v==false){
              // this.options.rowsxpageList=[
              //     {0:true}
              //   ]
              this.showPagination=false;
              this.showSearch=false

              // this.mynav.display='none'
            }

          },configurable:true}
          // ,showCloseIcon:{set:function(v){
          //   if(v==false){
          //     this.mytitlebar.myiconclose.display='none'
          //   }
          // },configurable:true}

        }
      }
    }
    ,myinit:function() {
      var th=this;

      setTimeout(function() {

        let parent2=th.getParentBy('wmark','tabcontent');
        //Tiene que ser agregado en load_r porque en chrome funciona si todavia
        let als=new ResizeSensor(th.box.middle.dom, function() {
            //console.log('Changed to ');

            // let parent2=th.parent;
            // let parent2=th.getParentBy('wmark','tabcontent');
            // alert(parent2.dom.offsetWidth);

            // alert('asdfasdfasdf')
            // if(parent2){// && parent2.parent && parent2.parent.parent){
            //   // parent2=parent2.parent.parent;
            //   alert(parent2.dom.offsetWidth);
            //   // th.maxWidth=(parent2.dom.offsetWidth-100)+'px';
            //   th.width=(parent2.dom.offsetWidth-100)+'px';
            // }
            // th.width='auto';
            // alert(parent2.dom.offsetWidth);
            // th.maxWidth=parent2.dom.offsetWidth+'px';

            // th.maxWidth=738+'px';
            // th.maxWidth=300+'px';
            th.updateHeader();
        });
      },0);


      th.mytop.events=[
        ['focus',function() {
          // alert('msg');
          if(th.mode=='popup'){
              th.reloadModel();
          }
        },true]
        ,['blur',function() {
          // alert('msg');
          // th.reloadModel();
        },true]
      ]
      th.events=[
        ['blur',function() {
          if(th.mode=='popup'){
            setTimeout(function() {
              if(th.dom.contains(document.activeElement)==false){
                th.box.classList.add('closed');
                th.box.classList.remove('open');
              }
            },50);
          }
            // th.reloadModel();
          },true]

      ]


      th.box.tableheader.events=[
        ['click',function(e) {
          if(e.target.tagName=='DIV'){
            if(!th.orderdisabled){
              // alert('msg');
              let actTh=$[e.target.id];
              // alert('HEE');
              th.orderTable(actTh);
              // th.setOrderby();
              th.aqmodel();
            }

          }else{

          }
        },false]
      ]
      th.mytop.myrowsxpage.events=[
        ['change',function(e) {
          // alert(this.value);
          th.setLimit(this.value);
          // alert(th.limit);
           th.aqmodel();
        }]
      ]
      th.box.mynav.mypagebuttons.events=[
        ['click',function(e) {
          let tmbutton=$[e.target.id].getParentBy('real_tag','button')
          let mybutton=(get_type(tmbutton)!==1?tmbutton:(e.target.tagName=='BUTTON'?$[e.target.id]:null));
          if(mybutton){
            console.log(mybutton);
            let actBtn=mybutton;

            th.setOffset((actBtn.page-1)*th.limit);
            actBtn.dom.classList.add('preactpage');

            th.aqmodel().then(function(resolve) {
              // actBtn.dom.focus();
            });
          }else{
            // console.log(e.target);
            // alert(e.target.textContent);
          }
        },false]
      ]
      th.box.mynav.mydirbuttons.events=[
        ['click',function(e) {
          // let mybutton=$[e.target.id].getParentBy('real_tag','button') || (e.target.tagName=='BUTTON'?$[e.target.id]:null);
          let tmbutton=$[e.target.id].getParentBy('real_tag','button')
          let mybutton=(get_type(tmbutton)!==1?tmbutton:(e.target.tagName=='BUTTON'?$[e.target.id]:null));
          if(mybutton){
            var actBtn=mybutton;
              th.setOffset((actBtn.page-1)*th.limit);
              actBtn.dom.classList.add('preactpage');

            th.aqmodel().then(function(resolve) {
              // actBtn.dom.focus();
            });
          }else{

          }
        },false]
      ]
      th.mytop.myfilterfields.myselect.events=[
        ['change',function(e) {
          // th.reloadinput(actAo);
          // th.reloadinput();
          th.aqmodel();
        }]
      ]
      th.mytop.myfilterfields.myinput.events=[
        ['input',function(e) {
          // body...
          clearTimeout(th.typingTimer);
          th.typingTimer = setTimeout(th.doneTyping.bind(th), th.doneTypingInterval);
        }]
        ,['keyup',function(e) {
          if(e.keyCode==40){console.log('DOWN');
            // triggerEvent(th.box.middle,'focus')
            // console.log(th.box.middle.dom);
            let sele=th.getSelectedRow();
            console.log(sele.dom);
            if(sele!==undefined){
              console.log(sele.children[0].dom);
              let i=0;
              let first=sele.children[i];
              while(first.getCS('display')=='none'){
                i++;
                first=sele.children[i];
              }
              first.dom.focus();

            }
            // this.dom.blur();
          }
        }]
      ]
      th.box.middle.tablebody.mytbody.events=[
        ['focus',function(e) {
          // let mybutton=$[e.target.id].getParentBy('real_tag','td') || (e.target.tagName=='TD'?$[e.target.id]:null);
          let tmbutton=$[e.target.id].getParentBy('real_tag','td')
          let mybutton=(get_type(tmbutton)!==1?tmbutton:(e.target.tagName=='TD'?$[e.target.id]:null));
          if(mybutton){
            var actBtn=mybutton;
            var actTd=actBtn//$[e.target.id];
            // alert(actTd.parent.ind);
            th.setSelectedRow(actTd.parent.ind,true);

          }else{

          }
          // if(e.target.tagName=='TD'){
          //   var actTd=$[e.target.id];
          //   alert(actTd.parent.ind);
          //   th.setSelectedRow(actTd.parent.ind,true);
          //
          // }
        },true]
      ]
      th.box.middle.events=[
        ['keydown',function(e) {
          // alert(e.keyCode);
          if([38,40].indexOf(e.keyCode)>-1){
            let sele=th.getSelectedRow(2);
            // let seletr=th.box.middle.tablebody.mytbody.dom.children[sele];
            // alert(seletr.activeElement);
            // let focusedtd=$[seletr.activeElement.id];
            // let indx=focusedtd.indice;
            // alert(indx);
            let sele2;
            if(e.keyCode==40 && sele!==undefined && th.model[sele+1]!==undefined){
              sele2=th.setSelectedRow(sele+1);
              e.preventDefault();
            }else if(e.keyCode==38 && sele!==undefined && th.model[sele-1]!==undefined){
              sele2=th.setSelectedRow(sele-1);
              e.preventDefault();
            }

            if(e.keyCode==38 && (sele-1)<0){
              th.mytop.myfilterfields.myinput.dom.focus();
            }
            // alert(sele2);
            // alert(th.box.middle.dom.scrollTop);
          }
          if([36].indexOf(e.keyCode)>-1 && th.model[0]!==undefined){//inicio
            th.setSelectedRow(0);
          }
          if([35].indexOf(e.keyCode)>-1 && th.model[th.model.length-1]!==undefined){//inicio
            th.setSelectedRow(th.model.length-1);
          }

        },true]
      ]
      th.box.middle.events=[
        ['scroll',function(e) {
          th.box.tableheader.left=((-1)*th.box.middle.dom.scrollLeft)+'px';
        }]
      ]
    }
    ,typingTimer:null                //timer identifier
    ,doneTypingInterval:250//lo ideal
    ,doneTyping:function(){
      var th=this;
      console.log('termine tipear');
      // th.arowsxpage();
      //---th.setOffset((actBtn.page-1)*th.limit);
      th.setOffset();
      th.aqmodel();
    }
    ,reloadinput:function(actAo_) {
      var th=this;
      var actAo=actAo_;
      if(actAo==undefined){
        actAo=th.mytop.myfilterfields.myselect;
      }
      var myinput=th.mytop.myfilterfields.myinput;


      var type=actAo.getSelectedRow().type;
      if(type=='number'){
        myinput.type='number';
      }
      if(type=='string'){
        myinput.type='text';
      }
      if(type=='date'){
        myinput.type='date';
      }

    }
    ,orderTable:function(fieldObj_) {
// alert('order');
      var th=this;
      var fieldObj=fieldObj_
      if(fieldObj==undefined){
        var trHeader=th.box.tableheader.children[0];
        // alert(trHeader);
        for (var i = 0; i < trHeader.children.length; i++) {
          let actTh=trHeader.children[i];
          // alert('ALGUNA VEZ LLEGO AQUI: '+actTh._order);
          // alert(actTh.order);
          if(actTh._order=='asc' || actTh._order=='desc'){
            // alert('ALGUNA VEZ LLEGO AQUI');
            // alert(actTh.order);
            fieldObj=actTh;
            fieldObj._order=(fieldObj._order=='asc'?'desc':'asc');
          }
        }
      }
      if(fieldObj==undefined){
        fieldObj=th.box.tableheader.children[0].children[0];
      }

      // fieldObj.backgroundColor='red';
      function cleanTds(){
        var allTds=fieldObj.parent.dom.querySelectorAll('div');
        allTds.forEach(function(elementt,index,array) {
          elementt.classList.remove('sorting_desc');
          elementt.classList.remove('sorting_asc');
          if($[elementt.id]){
            $[elementt.id]._order=undefined;
          }

        })
      }
      // alert('direction: '+direction);
      let direction='desc'

      if(fieldObj._order=='asc'){
        // alert('en asc');
        cleanTds();
        fieldObj._order='desc';
        fieldObj.classList.add('sorting_desc')
        // th.orderby.direction='desc';
        // fieldObj.classList.add('redback')
        direction='desc';
      }else{
        // alert('en desc');
        cleanTds();
        fieldObj._order='asc';
        fieldObj.classList.add('sorting_asc')
        // th.orderby.direction='asc';
        direction='asc';
        // fieldObj.classList.add('redback')
      }
      th.orderby.field=fieldObj.field;
      // alert('direction: '+direction);
      // alert('_>>'+th.orderby.field);
      th.setOrderby(fieldObj.field,direction);

      // th.reloadModel();
      //---th.aqmodel();

    }
    ,setHeaders:function() {
      var th=this;
      var rowHeaderAo=th.box.tableheader.mydiv;//.children[0];
      let rowHeaderAo2=th.box.middle.tablebody.mytheader.mytr;

      rowHeaderAo.emptyChildren();
      rowHeaderAo2.emptyChildren();
      // let newJson={children}
      // alert('SETHEADR');
      for (var i = 0; i < th.mask.length; i++) {
        var actFieldHeader=th.mask[i];
        let newJson={tag:'div',textContent:actFieldHeader.header,field:actFieldHeader.field,_order:actFieldHeader.orderby,load_r:function() {
          this.dom.unselectable="on";
          let elm = this.dom;
          let thh=this;
          let realth=thh.parent.parent.parent.children[1].children[0].children[0].children[0].children[0];
          let startX=0;
          let startWidth=elm.offsetWidth;
//create box in bottom-left
let resizer = document.createElement('div');
resizer.style.width = '4px';
resizer.style.height = '100%';
resizer.style.background = 'transparent';
resizer.style.position = 'absolute';
resizer.style.right = 0;
resizer.style.borderRight='solid 1px rgb(143, 143, 143)';
resizer.style.bottom = 0;
resizer.style.cursor = 'e-resize';
//Append Child to Element
elm.appendChild(resizer);
//box function onmousemove
resizer.addEventListener('mousedown', initResize, false);

//Window funtion mousemove & mouseup
function initResize(e) {
  startX=e.clientX;
  startWidth=elm.offsetWidth;
  // startWidth=parseInt(document.defaultView.getComputedStyle(elm).width, 10)
  console.log(startX);
  console.log(startWidth);
   window.addEventListener('mousemove', Resize, false);
   window.addEventListener('mouseup', stopResize, false);
}
//resize the element
function Resize(e) {
  // let newWidth=e.clientX - elm.offsetLeft+'px';
  console.log(startX);
  console.log(e.clientX);
  console.log(e.clientX-startX);
  let newWidth=(e.clientX -startX)+ startWidth+'px';
  // console.log(e.clientX);
  // console.log(newWidth);
  let realth=thh.parent.parent.parent.children[1].children[0].children[0].children[0].children[thh.indice];
  // elm.style.width='0px';
   elm.style.width = newWidth;
   elm.style.maxWidth = newWidth;
   elm.style.minWidth = newWidth;
   realth.width = newWidth;
   realth.maxWidth = newWidth;
   realth.minWidth = newWidth;
  //  thh.parent.children[thh.parent.children.length-1]
  //  element.style.height = (e.clientY - element.offsetTop) + 'px';
}
//on mouseup remove windows functions mousemove & mouseup
function stopResize(e) {

    let realth=thh.parent.parent.parent.children[1].children[0].children[0].children[0].children[thh.indice];
    if(elm.offsetWidth<realth.dom.offsetWidth){
      console.log('--->>>>IF');
      console.log(elm.offsetWidth);
      console.log(realth.dom.offsetWidth);
      elm.style.width=realth.dom.offsetWidth+'px';
      elm.style.minWidth=realth.dom.offsetWidth+'px';
      elm.style.maxWidth=realth.dom.offsetWidth+'px';

    }else{
      console.log('--->>>>ELSE');
      console.log(elm.offsetWidth);
      console.log(realth.dom.offsetWidth);

    }
    window.removeEventListener('mousemove', Resize, false);
    window.removeEventListener('mouseup', stopResize, false);
    th.updateHeader();//basicamente lo hacemos para que el ultimo div se actualize su ancho

}
        }};
        let newJson2={tag:'th',textContent:actFieldHeader.header,field:actFieldHeader.field,_order:actFieldHeader.orderby};
        let newCell1=$f.instanciar(newJson);
        let newCell2=$f.instanciar(newJson2);
        // alert('====');
        // alert('order..-.: '+newJson2._order);
        // alert('order..-.: '+newCell2._order);
        // alert('====');
        if(actFieldHeader.hidden==true){
          newCell1.classN='hidden';//era +=
          newCell2.classN='hidden';// era +=

        }

        //--let newRow2=$f.instanciar(newJson);
        // newRow2
        rowHeaderAo.addChild_r(newCell1);
        rowHeaderAo2.addChild_r(newCell2);
        newCell2.dom.dataset.field=actFieldHeader.field;
      }

      // th.box.middle.tablebody.mytheader.addChild_r({tag:rowHeaderAo.id});
      //---th.box.middle.tablebody.mytheader.mytr.dom.appendChild(rowHeaderAo.dom.cloneNode());
    }
    ,updateHeader:function() {
      var th=this;
      var middle=th.box.middle;
      var tableheader=th.box.tableheader.mydiv;
      var tablebody=middle.tablebody.mytbody;
      var tableheaderrow=tableheader;

      // var firstRow=tablebody.children[0];
      var firstRow=th.box.middle.tablebody.mytheader.children[0];

      var tablebodyWidth=tablebody.dom.offsetWidth;
      // tableheader.width=tablebodyWidth+'px';
      // tableheader.maxWidth=tablebodyWidth+'px';
      // tableheader.minWidth=tablebodyWidth+'px';

      if(firstRow){
        var firstRowWidth=firstRow.offsetWidth;

        if(firstRow!==undefined){

          for (var i = 0; i < firstRow.children.length; i++) {

            var actTd=firstRow.children[i];
            if(tableheaderrow.children[i]!==undefined){
              var actTh=tableheaderrow.children[i];
              //--- if(actTh.dom.offsetWidth>actTd.dom.offsetWidth){
              //---   actTd.minWidth=actTh.dom.offsetWidth+'px';
              //---   actTd.width=actTh.dom.offsetWidth+'px';
              //---   actTd.width=actTh.dom.offsetWidth+'px';
              //---}else{
                let width_=(actTd.dom.offsetWidth);
                actTh.width=(width_+0)+'px';
                actTh.minWidth=(width_+0)+'px';
                actTh.maxWidth=(width_+0)+'px';
                // if(i==0){
                //   actTh.width=(width_+4)+'px';
                //   actTh.minWidth=(width_+4)+'px';
                //   actTh.maxWidth=(width_+4)+'px';
                // }

              //---}

              // actTh.textContent=th.mask[actTd.field].offsetWidth+'px';
            }
          }
        }
      }else{
        // alert('ekse');
      }

    }
    ,setpopup:function() {
      let th=this;
      if(th.mode=='popup'){
        th.classList.add('popup');

        th.box.classList.add('popup');
        th.box.classList.add('closed');
      }
    }
    ,load_r:function() {
      var th=this;
      th.myinit();
      //---th.box.middle.tablebody.addChild_r($f.instanciar({tag:'td',textContent:actFieldHeader.header,field:actFieldHeader.field,order:actFieldHeader.orderby}));
      this.arowsxpage();
      th.setLimit();
      //-- th.setOffset();
      th.setHeaders();
      th.setFilterFields();
      //---th.reloadinput();
      // th.setOrderby();
      // alert('ENLOAD');
      //---th.orderTable();
      th.setpopup();
      this.aqmodel();

      // setTimeout(function() {
      //   //Tiene que ser agregado en load_r porque en chrome funciona si todavia
      //   let als=new ResizeSensor(th.box.middle.dom, function() {
      //       //console.log('Changed to ');
      //       alert('resixze');
      //       th.updateHeader();
      //   });
      // },0);


      // alert('here');
      // if(th.qmodel){
      //   this.reloadModel();
      // }else{
      //   this.amodel();
      // }

      // this.updateHeader();

    }
  })
})
