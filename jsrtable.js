$$.require(function(){
  $f.generateRowsF=function(v,tagRow,modelLength){
    var thisName=this.id;
    var thisNameParent=this.parent.id;
    var this_=this;

    var cadDom='';
    this.display='none';
    alert('EMPEZÉ')
    for(var aa=0;aa<modelLength;aa++){
      for(var i=0;i<v.length;i++){

        var actRow=v[i];
        cadDom+='<tr>';
        //---var nuevRow=$f.instanciar({tag:tagRow,id:tagRow+'_'+thisName+aa+'__'+i});

        //---this.addChild_r(nuevRow);
        //---nuevRow.model=this.parent.model[aa];
        for(var ii=0;ii<actRow.length;ii++){
          var actCell=actRow[ii];
          var cellJson={tag:'jsrtable_td',id:thisName+'_'+tagRow+'_cell_'+aa+'_'+i+'_'+ii};
          //--cadDom+='<td style="border:solid 1px black">'+aa+'-'+i+'-'+ii+'<td>'
          cadDom+='<td>'+aa+'-'+i+'-'+ii+'<td>'
          //---var nuevCell=$f.instanciar(cellJson);
          //---nuevRow.addChild_r(nuevCell);
          //---nuevCell.assignProps=actCell;
        }
        cadDom+=' </tr>';
      }
    }
    alert('antes de innerhtml');
    this.dom.innerHTML=cadDom;
    alert('FINALIZÉ');
    this.display='block';

  }
  $.add=
  {
    tag:'tbody'
    ,id:'jsrtablegroupbody'
  }
  $.add=
  {
    tag:'tr'
    ,id:'jsrtable_trow'
    ,identif:'jsrtable_trow'
    ,backgroundColor:'#eeeeee'
    ,model:{}

  }
  $.add=
  {
    tag:'tr'
    ,id:'jsrtable_trowb'
    ,identif:'jsrtable_trowb'
    ,model:{}

  }
  $.add=
  {
    tag:'td'
    ,id:'jsrtable_td'
    ,border:'solid 1px black'
    //--,val:''
    //--,cm:null
    ,customProps:{
      val:{set:function(v){
        console.log('SETEANDO V: '+v);
        console.log('CM : '+this.cm);
        if(v=='' && this.cm!==null && this.cm!==undefined){
          console.log('PORQUE LLEGO AQUI CAR');
          this.textContent=this.cm;
        }
        this.textContent=v;
        this._val=v;
      },get:function(){
        return this._val;
      },configurable:true}
      ,cm:{set:function(v){
        this._cm=v;
        console.log('-----');
        console.log(this.parent);
        console.log(this.parent.model);
        if(this._val==undefined){
          this.textContent=this.parent.model[v];
        }

      },get:function(){
        if(this._cm!==null){
          return this.parent.model[this._cm];
        }else{
          return null;
        }

      },configurable:true}
      ,colex:{set:function(v){
        console.log('colspannnnnn: '+v);
        this.colSpan=v;
        //console.log(this.dom.colspan);
      },get:function(){
        return this.colSpan;
      },configurable:true}
      ,strictWidth:{set:function(v){
        this.width=v;
        this.minWidth=v;
        this.maxWidth=v;
      },configurable:true}
    }
  }

  $.add=
  {
    tag:'jsrtablegroupbody'
    ,id:'jsrtablegroup'
    ,groupedBy:null
    ,groupedByVal:null
    ,headerAr:{}
    ,model:[]
    ,identif:null
    ,showHeader:false
    ,addBodyRow:function(){
      console.log('agregando row');
      var ident_=this.groupedBy;
      var newBodyRow=$f.instanciar({tag:'tr',identif:ident_+'_tbody'});
      this.addChild_r(newBodyRow);
      return newBodyRow;
    }
    ,customProps:{
      header:{set:function(v){
        console.log('---AQUI');
        console.log(v);
        console.log(v.length);
        //-var indexModelR=0;
        var modelLength=1;
        var tagRow='jsrtable_trow';
        $f.generateRowsF.bind(this)(v,'jsrtable_trow',1);


      },configurable:true}
      ,bodyr:{set:function(v){
        var modelLength=this.model.length;
        var tagRow='jsrtable_trow';
        $f.generateRowsF.bind(this)(v,'jsrtable_trowb',modelLength);


      },configurable:true}
    }

    ,assignModel:function(model){
      this.model=model;

    }
    ,loadd_r:function(){

      var model_=this.model;
      var headerAr_=this.headerAr;
      console.log('en load_r de tablegroup');
      console.log(this.headerAr);
      console.log(this.model);
      console.log(this);
      alert('rcien llego adfa')
      for (var i = 0; i < model_.length; i++) {
        var actRow=model_[i];
        var newRowAdded=this.addBodyRow();
        console.log('despues de agregar row');

        for (var k  in actRow) {
          if (headerAr_[k]!==undefined ) {
            console.log(' en k :'+k);

            var nuevJsonCell=headerAr_[k].props;
            nuevJsonCell.tag='td';
            nuevJsonCell.textContent=actRow[k];
            console.log(nuevJsonCell);
            var newCell=$f.instanciar(nuevJsonCell);
            console.log(newCell);
            newRowAdded.addChild_r(newCell);
          }
        }
        //this.getRow(i)

      };

    }
  }
  $.add=
  {
    tag:'table'
    ,id:'jsrtable'
    ,borderCollapse:'collapse'
    ,model:[]
    ,headerAr:{}
    ,tableLayout:'fixed'
    ,customProps:{
      groupBy:{set:function(v){
        this._groupBy=v;
      },get:function(){
        return this._groupBy;
      },configurable:true}
      ,colsWidth:{
        set:function(v){
          for(var i=0;i<v.length;i++){
            this.ttheader.addChild_r($f.instanciar({tag:'td',width:v[i],minWidth:v[i],maxWidth:v[i]}));
          }
        }
        ,configurable:true
      }
      /*,header:{set:function(v){
        var modelLength=1;
        $f.generateRowsF.bind(this)(v,'jsrtable_trow',1);

      },configurable:true}
      ,bodyr:{set:function(v){
        var modelLength=this.model.length;
        $f.generateRowsF.bind(this)(v,'jsrtable_trowb',modelLength);
      },configurable:true}*/
    }
    ,aliases:[
      //---['groupProps',function(){return this.}]
      ['theader',function(){return this.ttheader},'children']
      //,['theader_',function(){return this.ttheader},'children']
      ,['tfooter',function(){return this.ttfooter},'children']
    ]
    ,groupProps:{}
    ,children:[
      {
        tag:'thead'
        ,innerId:'ttheader'
        /*,position:'absolute'
        ,visibility:'hidden'*/
      }
      /*---,{
        tag:'tbody'
        ,innerId:'ttbody'
      }
      ,{
        tag:'tfoot'
        ,innerId:'ttfooter'
      }*/
    ]
    ,assignModel:function(v){

      function getObjArByColumn(ar,col){
        var returnedObjAr={};
        var returnedAr=[[],[],[]];
        for(var i=0;i<ar.length;i++){
          var actRow=ar[i];
          for(var k in actRow){
            if(k==col){
              if(!returnedObjAr.hasOwnProperty(actRow[k])){
                returnedObjAr[actRow[k]]=[];
                returnedAr[0].push(k);//los dos apuntan al mismo array
                returnedAr[1].push(actRow[k]);//los dos apuntan al mismo array
                returnedAr[2].push(returnedObjAr[actRow[k]]);//los dos apuntan al mismo array
              }
              returnedObjAr[actRow[k]].push(actRow);
              //--returnedAr[1].push(actRow);
              break;
            }
          }
        }
        return returnedAr;
      }
      this.model=v;
      if(this.groupBy!==undefined && this.groupBy!==''){
        var groupBy_=this.groupBy;
        var submodels_=getObjArByColumn(this.model,groupBy_);

        for(var i=0;i<submodels_[2].length;i++){
          var tablegroupProps=Object.assign({},{tag:'jsrtablegroup',model:submodels_[2][i]});//--Object.create(this.groupProps);
          tablegroupProps.groupedBy=submodels_[0][i];
          tablegroupProps.groupedByVal=submodels_[1][i];
          var newTGroup=$f.instanciar(tablegroupProps);
          this.addChild_r(newTGroup);
          newTGroup.assignProps=this.groupProps;
        }

        //aqui creamos un megamodelo ordenado por el groupby, y hacemos una
      }else{
        //-alert('llego aqui')
        //-console.log(this.json_l);
         var model_=this.model;

         var tbg=$f.instanciar({tag:'jsrtablegroup'});
         this.addChild_r(tbg);
         //--this.assignProps=this.json_l;
         var this_=this;
         tbg.assignProps={model:this_.model,header:this_.header,bodyr:this_.bodyr};
      }
    }
    ,load_r:function(){
      this.model=[
        {c1:'c1v',c2:'c2v',c3:'c3v'}
        ,{c1:'c1v',c2:'c2v',c3:'c3v'}
      ]

    }
  }
})
//
