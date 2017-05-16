var myurl=document.currentScript.src;
$$.require(['globalFunciones','jsimg','jsinput','jscheckselect'],function(){

  $.add=
  {
    tag:'th'
    ,id:'jstable_th'
    ,position:'relative'
    ,cursor:'pointer'
    ,aqmodel:undefined
    ,aliases:[
      ['jstext',function(){return this.mytext},'textContent']
      //['jsimg',function(){return this.myimg},'backgroundImage']
    ]
    ,children:[
      {
        tag:'div'
        ,innerId:'mytext'
        ,flexGrow:1
      }
      ,{
        tag:'div'
        ,innerId:'myimg'
        //,color:'transparent'
        ,minHeight:'1px'
        ,width:'15px'
        ,position:'absolute'
        ,top:'0px'
        ,height:'100%'
        ,right:'1px'
        ,backgroundPosition:'center'
        ,backgroundSize:'60%'
        ,backgroundImage:'url(vista/icons/arrow-down-black.png)'
        ,backgroundRepeat:'no-repeat'
        //,border:'solid 1px grey'
        //,textContent:'sdf'
        ,visibility:'hidden'

      }
    ]
    ,events:[
      ['click',function(){
        var jstable_=this.parent.parent.parent.parent;
        var orderDir_=jstable_.opts.orderDir;
        //alert(this.rName);
        if(this.rName==jstable_.opts.orderBy){
          if(orderDir_=='asc'){
            jstable_.opts.orderDir='desc';
          }else{
            jstable_.opts.orderDir='asc';
          }
        }else{
          jstable_.opts.orderBy=this.rName;
          jstable_.opts.orderDir='asc';
        }



        jstable_.assignModel(jstable_.model);

      },false]
    ]
  }
  $.add=
  {
    tag:'div'
    ,id:'jstable'
    ,overflowY:'auto'
    ,fontFamily:'Sansation'
    ,firstCharge:true
    //--,myqmodel:'qTipoComprobante'
    ,online:true
    ,showTop:true
    ,init:function(){

    }
    ,getFilterCheckedFields:function(){//retorna los campos por los cuales se filtra
      var returned={};
      var this_=this;
      var plantilla=this.plantilla;
      for(var i=0;i<plantilla.length;i++){
        var actItemPlan=plantilla[i];
        if(actItemPlan.filter!==undefined && actItemPlan.filter==true){
          returned[actItemPlan.name]=get_type(actItemPlan.val);
        }
      }
      console.log('--CHECKED FIELDS: ',returned);
      return returned;
    }
    ,asignarFilterCheckBox:function(){
      var this_=this;
      var plantilla=this_.plantilla;
      var model=[];

      /*for(var a=0;a<head_.length;a++){
          modelForJscheckSelect.push(
            {val:head_[a].rName,text:head_[a].sName}
        )
      }*/
      for(var i=0;i<plantilla.length;i++){
        var actItemPlan=plantilla[i];
        if(actItemPlan.filter!==undefined){
          model.push({val:actItemPlan.name,text:actItemPlan.sName,checked:actItemPlan.filter});
        }
      }
      console.log('--MODEL CHECKED: ');
      console.log(model);
      this_.mytop.myjscheckselect.assignModel(model);
      //console.log('--MYSELECT:',this_.mytop.myjscheckselect);
    }
    ,plantilla:[
      {sName:'Codigo',val:0,name:'cod',filter:true,foot:'Total:'}//foot puede ser un valor o una funcion
      ,{sName:'Nombre',val:'',name:'val',filter:true,foot:function(jsgt,model){return jsgt.sumarMonto(model,'monto')}}
      ,{sName:'--',obj:{tag:'jsbutton',text:'Cambiar',foot:''}}
      ,{sName:'--',obj:{tag:'jsbutton',text:'Eliminar',foot:''}}
    ]
    ,data:[
      {cod:'10',val:'val2'}
      ,{cod:'12',val:'val0'}
      ,{cod:'11',val:'val3'}
      ,{cod:'9',val:'val1'}
      ,{cod:'5',val:'val4'}
      ,{cod:'1',val:'val5'}
      ,{cod:'7',val:'val6'}
      ,{cod:'13',val:'val7'}
      ,{cod:'12',val:'val0'}
      ,{cod:'11',val:'val3'}

    ]
    ,opts:{
      filterBy:['cod','val']
      ,lfilterVal:''
      /*,orderBy:'val'*/
      ,orderDir:'asc'
      ,maxPerPage:10
      ,startPerPage:0
      ,endPerPage:9
      ,actPage:1
    }
    ,model:{
      head:[
        {sName:'column a',rName:'cod'}
        ,{sName:'column b',rName:'val'}
        /*--,{
          sName:'column c'
          ,rName:'colC'
          ,default:{obj:
            {
              tag:'jsimg'
              ,src:'probando'
            }
          }
        }
        ,{sName:'column d',rName:'colD',default:'sd'}*/
      ]


    }

    ,children:[
      {
        tag:'div'
        ,innerId:'mytop'
        ,display:'flex'
        //,border:'solid 1px green'
        ,overflowY:'visible'
        //--,alignItems:'flex-start'
        ,children:[
          {
            tag:'select'
            ,innerId:'myselect'
            ,children:[
              {tag:'option',textContent:'10',value:10}
              ,{tag:'option',textContent:'25',value:25}
              ,{tag:'option',textContent:'50',value:50}
              ,{tag:'option',textContent:'100',value:100}
            ]
            ,events:[
              ['change',function(){
                var jstable_=this.parent.parent;
                //alert(this.dom.value);
                jstable_.opts.maxPerPage=this.dom.value;

                jstable_.selePage(1);
              },false]
            ]
          }
          ,{
            tag:'div'
            ,display:'none'
            ,children:[
              {
                tag:'div'
                ,children:[
                  {
                    tag:'jsbutton'
                  }
                  ,{
                    tag:'jsbutton'
                  }
                ]
              }
            ]
          }
          ,{
            tag:'jscheckselect'
            ,innerId:'myjscheckselect'
            ,events:[
              ['click',function(e){
                var jstable_=this.parent.parent;
                var this_=this;
                if(jstable_.firstCharge==false){
                  if($[e.target.id]!==undefined && $[e.target.id].real_tag=='input' && $[e.target.id].type=='checkbox'){
                    //buscar plantilla de jstable y activar desactivar
                    var me=$[e.target.id];
                    console.log(e.target);

                    var actVal=e.target.value;
                    //--alert(actVal);
                    var plantilla=jstable_.plantilla;
                    for(var i=0;i<plantilla.length;i++){
                      actItemPlan=plantilla[i];
                      //console.log('--actItemPlan: ',actItemPlan);
                      //console.log('--actVal: ',$[e.target.id].dom);

                      if(actItemPlan.name==actVal && actItemPlan.filter!==undefined){
                        actItemPlan.filter=me.dom.checked;
                        console.log('--checked - '+actVal+' ='+me.dom.checked);
                      }
                    }
                    console.log('--plantilla en click checked: ',plantilla);
                    //entonces le estamos agregando un evento al checkbox click;
                    //--alert('clic, en checkbox');
                    //---jstable_.assignModel(jstable_.model);
                    jstable_.assingModelDataOnline();
                  }
                }

              },false]
              ,['change',function(e) {
                this.parent.mysearch.doneTyping();
              }]
            ]


          }
          ,{
            tag:'div'
            ,innerId:'myspace'
            ,flexGrow:1
            ,display:'none'
          }
          ,{
            tag:'input'
            ,innerId:'mysearch'
            ,type:'search'
            ,flexGrow:1
            ,autofocus:true
            ,placeholder:'Ingrese término a buscar...'
            /*,events:[
              ['input',function(){
                //aqui buscamos
                var jstable_=this.parent.parent;
                //--jstable_.assignModel(jstable_.model);
                jstable_.assingModelDataOnline();
              },false]
            ]*/
            ,typingTimer:null                //timer identifier
            ,doneTypingInterval:250//lo ideal
            ,events:[
              ['input',function(e){
                var this_=this;
                var inp=this;
                var val=this.dom.value;


                clearTimeout(this_.typingTimer);
                 /*if (val) {*/
                     this_.typingTimer = setTimeout(this_.doneTyping.bind(this_), this_.doneTypingInterval);
                 /*}else{
                   console.log('su else');
                 }*/

              },false]
            ]
            ,doneTyping:function(){
              console.log('termine tipear');
              //aqui buscamos
              var jstable_=this.parent.parent;
              //--jstable_.assignModel(jstable_.model);
              if(jstable_.online==true){
                jstable_.aqmodel(jstable_.qmodel);
              }else{
                jstable_.data=jstable_.data;
                jstable_.assignModel(jstable_.model);
              }


            }

          }

        ]
      }
      ,{
        tag:'table'
        ,innerId:'mytable'
        ,children:[
           {
             tag:'thead'
             ,innerId:'mythead'
             ,children:[
               {
                 tag:'tr'
                 ,innerId:'inner'
               }
             ]
           }
           ,{
             tag:'tbody'
             ,innerId:'mytbody'
             ,events:[
               ['click',function(e){
                 var parent_=this.parent.parent;
                //  if($[e.target.id].real_tag=='td'){
                   //alert(widget.id);
                   var yo=$[e.target.id];
                   var myparent=yo.getParentBy('tag','tr');
                   if(myparent!==null){
                     var actRow=myparent;
                     var ind=actRow.dom.dataset.ind;
                     parent_.selectRow(ind);
                   }


                   //alert(JSON.stringify(widget.getSelectedRow()));
                //  }

               },true]
             ]
           }
        ]
      }
      ,{
        tag:'div'
        ,innerId:'nav'
        ,children:[
          {
            tag:'div'
            ,innerId:'left'
            ,textContent:'<'
            ,events:[
              ['click',function(){
                var jstable_=this.parent.parent;
                var lastNum=Math.ceil(jstable_.data.length/jstable_.opts.maxPerPage);
                //**alert(jstable_.model.opts.actPage);
                if(jstable_.opts.actPage!==1 /*&& jstable_.model.opts.actPage!==lastNum*/){
                  //--alert('asdf');
                  jstable_.selePage(jstable_.opts.actPage-1);
                }
              },false]
            ]
          }
          ,{
            tag:'div'
            ,innerId:'num'
          }
          ,{
            tag:'div'
            ,innerId:'right'
            ,textContent:'>'
            ,events:[
              ['click',function(){
                var jstable_=this.parent.parent;
                var lastNum=Math.ceil(jstable_.data.length/jstable_.opts.maxPerPage);
                if(/*jstable_.model.opts.actPage!==1 && */jstable_.opts.actPage!==lastNum){
                  jstable_.selePage(jstable_.opts.actPage+1);
                }
              },false]
            ]
          }
        ]
      }
    ]
    ,assignModel:function(model){
      this.model=model;

      function orderModel(model,field,dir){
        function isNumberYN(num){
          var returned=num;
          if(isNaN(num)==false){
            returned=parseFloat(num);
          }
          return returned;
        }
        function anexRowToNewModel(newModel,row,field){
          if(/*newModel.length>0 && */[2,3].indexOf(get_type(row[field]))>-1){//aqui tambien comprobamos que el tipo sea cadena o numero, sino lo mandamos al final simplemente en el orden en que viene

            var posicionado=false;
            var i=0;
            var actVal=null;
            console.log(newModel.length);
            while (newModel.length>0 && i<newModel.length && isNumberYN(row[field])>isNumberYN(newModel[i][field])){
              i++;
            }
            newModel.splice(i,0,row);
          }else{
            newModel.push(row);
            //--alert('HERE');
          }


        }

        var newModel=[];

        for(var i=0;i<model.length;i++){
          var actRow=model[i];
          for(var k in actRow){
            if(k==field){
              var actField=actRow[k];


                anexRowToNewModel(newModel,actRow,k);

            }

          }
        }
        console.log(newModel);
        console.log(dir);
        console.log(newModel.reverse());
        if(dir==undefined || dir=='asc'){
          //--newModel=newModel.reverse();
          newModel.reverse();
        }
        return newModel;
      }
      function getFilterBy(model){
        var arReturned=[];
        for(var i=0;i<model.length;i++){
          var actItem=model[i];
          if(actItem.checked==true){
            arReturned.push(actItem.val);
          }
        }
        return arReturned;
      }
      function filteredModel(model,filters,filterVal){
        var filteredData=[];
        //alert(model.length);
        for(var i=0;i<model.length;i++){
          var actRow=model[i];
          for(var k in actRow){
            console.log(actRow[k]);
            // if(filterVal.trim().length==0 || filters.indexOf(k)>-1 && actRow[k].includes(filterVal)){
            if(filterVal.trim().length==0 || filters.indexOf(k)>-1 && (actRow[k]+'').includes(filterVal)){
              filteredData.push(actRow);
              break;
              //--i=i+1;
            }
          }
        }
        //+--alert(filteredData.length);
        return filteredData;
      }
      var this_= this;
      var table_=this_.mytable;
      var tbody_=table_.mytbody;
      var thead_=table_.mythead.inner;
      var hasthead=false;
      var orderBy_=this_.opts.orderBy;
      var orderDir_=this_.opts.orderDir;
      var data_=this_.data;
      var filterBy_=[];
      var head_=model.head;
      var plantilla=this_.plantilla;
      if(this_.opts.filterBy.length==0){
        this_.opts.filterBy=filterBy_;
      }else{
          filterBy_=this_.opts.filterBy;
      }

      //--console.log(this_.mytop.myjscheckselect.model);
      var filterVal_=this_.mytop.mysearch.dom.value;
      this_.opts.filterVal=filterVal_;


      //asignamos el modelo al jscheckselect

      if(this_.firstCharge==true){
        //-this_.mytop.myjscheckselect.assignModel(modelForJscheckSelect);
        this_.asignarFilterCheckBox();
      }


      if(this_.firstCharge==true){
        if(this_.opts.filterBy.length==0){
          this_.mytop.myjscheckselect.selectAll();
        }else{
          var mjs=this_.mytop.myjscheckselect.mybox;
          for(var ii=0;ii<mjs.children.length;ii++){
            var actC=mjs.children[ii];
            if(actC.dom.checked==true){
              actC.dom.click();
            }
            if(actC.dom.checked==false && filterBy_.indexOf(actC.dom.value)>-1){
              actC.dom.click();
            }

          }
        }

      }
      console.log(this_.mytop.myjscheckselect.model);
      filterBy_=getFilterBy(this_.mytop.myjscheckselect.model);
      console.log(filterBy_);
      if(this_.online==false){
        //---data_=filteredModel(data_,filterBy_,filterVal_);
        var sendParams={data:data_,filterBy:filterBy_,filterVal:filterVal_}

        this.worker.postMessage({action:'filter',params:sendParams});
        //--this_.cursor='wait';
        //this_.dom.style.setProperty('cursor', 'wait', 'important');
        document.body.style.cursor='wait';

        this.worker.onmessage = function(respW) {
            var resp=respW.data;
            data_=resp.data;
            document.body.style.cursor='initial';
            afterFilter();
            //---this_.dom.style.setProperty('cursor', 'initial', 'important');
            //--this_.cursor='initial';
            /*console.log(respW);
            alert('data from worker: '+resp);*/
        };

      }else{
        afterFilter();
      }

      console.log(data_);
      function afterFilter(){




      if(orderBy_!==undefined){
        data_=orderModel(data_,orderBy_,orderDir_);
      }
      var startPerPage_=this_.opts.startPerPage;
      var endPerPage_=this_.opts.endPerPage;
      var maxPerPage_=this_.opts.maxPerPage;
      var actPage_=this_.opts.actPage;
      if(endPerPage_>=data_.length){
        endPerPage_=data_.length-1;
      }
      var numOfNums=1;
      if(data_.length>0){
        numOfNums=Math.ceil(data_.length/maxPerPage_);
      }
      //creamos los nums of nav
      this_.nav.num.emptyChildren();

      for(var b=0;b<numOfNums;b++){
        /*if(b+1=actPage_){

        }*/
        var newNum=$f.instanciar({tag:'div',textContent:b+1
        ,events:[
          ['click',function(){
            var jstable_=this.parent.parent.parent;
            var navnum_=this.parent;
            if(jstable_.opts.actPage!==this.indice+1){
              jstable_.selePage(this.indice+1);
            }

          },false]
        ]

        });
        this_.nav.num.addChild_r(newNum);
      }
      //fin-creamos los nums of nav


      thead_.emptyChildren();
      tbody_.emptyChildren();

      var mytable=this_.mytable
      var mythead=this_.mytable.mythead;
      var mytbody=this_.mytable.mytbody;
      var mytfoot=this_.mytable.mytfoot;
      var plantilla=this_.plantilla;
      //'agregamos el thead'
      mythead.emptyChildren();
      var newTrH=$f.instanciar({tag:'tr'});
      for(var i=0;i<plantilla.length;i++){
        var actItem=plantilla[i];
        var newTh=$f.instanciar({tag:'jstable_th',border:'solid 1px black'});
        newTrH.addChild_r(newTh);
        newTh.jstext=actItem.sName;
        newTh.rName=actItem.name;
        newTh.activeOrder=actItem.order;
        newTh.direOrder=actItem.orderDire;
        if(actItem.hidden==true){
          newTh.display='none'
        }
      }
      mythead.addChild_r(newTrH);


//--alert('startPerPage_: '+startPerPage_+', endPerPage_: '+endPerPage_);

      for(var i=startPerPage_;i<=endPerPage_;i++){

        var actRow=data_[i];
        var newDRow=$f.instanciar({tag:'tr'});
        tbody_.addChild_r(newDRow);
        newDRow.dom.dataset.ind=i;
        //-console.log(head_.length);
        for(var a=0;a<plantilla.length;a++){

          //--if(actRow[ head_[a].rName ]!==undefined){
            /*
            if(hasthead==false){
              var newDCellT=$f.instanciar({tag:'jstable_th'});
              newDCellT.jstext=head_[a].sName;
              newDCellT.rName=head_[a].rName;
              thead_.addChild_r(newDCellT);
              if(orderBy_==head_[a].rName){
                newDCellT.myimg.visibility='visible';
                if(orderDir_=='desc'){
                  newDCellT.myimg.transform='rotate(180deg)'
                }
              }
              //modelForJscheckSelect.push(
                //{val:head_[a].rName,text:head_[a].sName}
              //);

            }

            */
            var actRegCol=actRow[ plantilla[a].name ];
            var newDCell=$f.instanciar({tag:'td'});
            if(plantilla[a].hidden==true){
              newDCell.display='none'
            }

            newDRow.addChild_r(newDCell);
            if(get_type(plantilla[a].val)==0 && plantilla[a].val.tag!==undefined){
              //bindeamos:
////              var newWidget=$f.instanciar(plantilla[a].val);
              var myjson=extenderObj(plantilla[a].val);

              if(actRegCol!==undefined){
                //>
                var objetoa=actRow;
                var nomPropiedad=plantilla[a].name;
                //----bindear(objeto,nomPropiedad,newWidget);
                //newWidget.completed=function(){alert(objeto[nomPropiedad]);/*this.selectValue(actRegCol)*/};
                //alert(JSON.stringify(objetoa));

                //------newWidget.objBinded=objetoa;//<--esto es importante, porque asi queda referenciado al objeto
                //---myjson.objBinded=actRow;//<--esto es importante, porque asi queda referenciado al objeto
                //cuando se ejecuta completed, el objetoa ya podria ser otro, por eso es mejor referenciarlo en el propio widget
                //------newWidget.completed=function(){/*alert(objetoa);*/var this__=this;bindear(this__.objBinded,nomPropiedad,this__);};
                myjson.completed=function(){/*alert(objetoa);*/var this__=this;bindear(this__.objBinded,nomPropiedad,this__);};
              }else{
                //-alert(newWidget);
              }
              var newWidget=$f.instanciar(myjson);
              newWidget.objBinded=actRow;//<--esto es importante, porque asi queda referenciado al objeto
              newDCell.addChild_r(newWidget)




            }else{
                //alert(JSON.stringify(plantilla[a]));
              if(actRegCol!==undefined){
                newDCell.textContent=actRegCol;
              }else{
                newDCell.textContent=plantilla[a].val;
              }

            }



          //--}
        }
        hasthead=true;



      }
      if(data_.length>0 && data_.length>=endPerPage_){
        if(this_.selectedInd>-1){
          this_.selectRow(this_.selectedInd);
        }else{
          this_.selectRow(startPerPage_);
        }

      }
    }


      this.firstCharge=false;
    }
    ,assingModelDataOnline:function(myqmodel_,params_){
      var params__={};
      var this_=this;

      var myqmodel=undefined;
      if(myqmodel_!==undefined){
        myqmodel=myqmodel_;
        this.myqmodel=myqmodel;

      }else if(this.myqmodel!==undefined){
        myqmodel=this.myqmodel;

      }else{

      }

        if(myqmodel!==undefined){


          if(params_!==undefined){
            //---params__=this_.opts.filterBy;
            params__=params_;
            this.myparams=params__;
          }else  if(this.myparams!==undefined){
            params__=this.myparams
          }

          var dataSend={
            type:'query',content:myqmodel
            ,params:Object.assign(params__,{
              filterBy:this_.getFilterCheckedFields()
              ,filterVal:this_.mytop.mysearch.dom.value
            })
          }

          // alert(JSON.stringify(dataSend.params));

          var cExi=function(resp){
            console.log(resp);

            if(resp.cod==0 /*&& resp.data.length>0*/){

              var cod='';
              var val='';
              var cont=0;
              for(var k in resp.data[1]){

                if(cont==0){cod=k}
                if(cont==1){val=k}
                cont++;
              }
              this_.data=resp.data;
              this_.assignModel(this_.model);
              this_.evalCompleted();
              if(this_.data.length>0){
                this_.selectRow(0);
              }
              //--jstable_.assignModel(jstable_.model);
            }else{
              alert(resp.mess)
            }
          }
          $f.xhrPost(dataSend, cExi)

        }
    }
    /*,set qmodel(v){
      var vv=v;
      if(get_type(v)==1){
        this.aqmodel.apply(this,vv);
      }else if(get_type(v)==2){
        this.aqmodel(v);
      }

    }*/

    // ,customProps:{
    //   qmodel:{set:function(v) {
    //     alias('en setter')
    //     var vv=v;
    //     if(get_type(v)==1){
    //       this.aqmodel.apply(this,vv);
    //     }else if(get_type(v)==2){
    //       this.aqmodel(v);
    //     }
    //   },configurable:true}
    // }

    ,aqmodel:async function(myqmodel_,params_){
      var this_=this;
      try{
        var params=params_;
        var myqmodel=myqmodel_;

        if(params==undefined){
          params=this.myparams
        }
        if(params==undefined){
          params={}
        }

        if(myqmodel==undefined){
          myqmodel=this.myqmodel;
        }

        if(myqmodel!==undefined){

            var dataSend={
              type:'query',content:myqmodel
              ,params:Object.assign(params,{
                filterBy:this_.getFilterCheckedFields()
                ,filterVal:this_.mytop.mysearch.dom.value
              })
            }

            // alert(JSON.stringify(dataSend.params));
            var resp=await $f.xhrPost2(dataSend);
            if(resp.cod==0 /*&& resp.data.length>0*/){
              var cod='';
              var val='';
              var cont=0;
              console.log(resp.data);
              for(var k in resp.data[1]){
                if(cont==0){cod=k}
                if(cont==1){val=k}
                cont++;
              }
              this_.data=resp.data;
              this_.assignModel(this_.model);
              this_.evalCompleted();
              if(this_.data.length>0){
                this_.selectRow(0);
              }
              //--jstable_.assignModel(jstable_.model);
            }else{
              //---alert(resp.mess)
              alert(resp.mess)
            }

          }
      }catch(err){
        console.log(err);
        alert(err);
      }

    }
    ,onSelectedRow:function() {
    }
    ,selectRow:function(ind){
      var this_=this;
      var mytbody=this_.mytable.mytbody;
      if(mytbody.children.length>0){
        this_.selectedInd=ind;
        //mytbody.children[ind].className+=' rowSelected';
        var i_dedom=-1;
        for(var i=0;i<mytbody.children.length;i++){
          mytbody.children[i].dom.classList.remove('rowSelected');
          if(mytbody.children[i].dom.dataset.ind==ind){
            i_dedom=i;
          }
        }
        //mytbody.children[ind].dom.classList.add('rowSelected');
        console.log(i_dedom);
        if(i_dedom>-1){
          mytbody.children[i_dedom].dom.classList.add('rowSelected');
          this_.onSelectedRow();
        }

      }else{
        this_.selectedInd=-1
      }

      //alert('seleccionado: '+mytbody);
    }
    ,getSelectedRow:function(){
      var this_=this;
      var returned=null;
      if(this_.selectedInd!==undefined && this_.selectedInd>-1){
        returned=this_.data[this_.selectedInd];
      }
      return returned;
    }
    ,onDelete:function(){

      if(this.worker!==undefined){
        this.worker.terminate();
      }
      // console.log(this.worker);
      // alert('borrando worker');
    }

    ,load_r:function(){
      if(this.showSearch==false){
        this.mytop.display='none';
      }

      if(this.online==false){

        var me=myurl;
        var first=me.lastIndexOf('/');
        var last=me.indexOf('.',first+1);//deberia ser lastIndexOf
        ruta_relativa=me.substring(0,first+1);
        /*me=me.substring(first+1,last);
        me=fixPath(ruta_relativa+me+'.js');*/

        var worker = new Worker(ruta_relativa+'jstable_worker.js?q='+Date.now());
        this.worker=worker;
        // worker.onmessage = function(respW) {
        //     var resp=respW.data;
        //     var index = event.data;
        //     alert('data from worker: '+event.data);
        // };
        //--worker.postMessage('empieza worker'); // start the worker.
      }

      if(this.model!==undefined){
        this.assignModel(this.model);
      }


      function getModelForJscheckselect(){

      }

      //--this.mytop.myjscheckselect.assignModel()
      /*---if(__TESMODE__==true){
        this.selePage(1);
        //--this.firstCharge=false;
      }*/
      // ----->this.assingModelDataOnline();
      if(this.qmodel!==undefined){

        this.aqmodel(this.qmodel);
      }


    }
    ,selePage:function(index){
      var navnum_=this.nav.num;
      this.opts.actPage=index;
      console.log(navnum_.children);



      //la parte de model
      this.opts.startPerPage=this.opts.maxPerPage*(index-1);
      this.opts.endPerPage=this.opts.maxPerPage*(index)-1;
      this.assignModel(this.model);

      for(var i=0;i<navnum_.children.length;i++){
        navnum_.children[i].dom.classList.remove('sele');
      }
      console.log(index-1);
      navnum_.children[index-1].dom.classList.add('sele');
      //--this.firstCharge=false;
    }

  }
})
