$$.require(function(){
  $.add={

    tag:'tr'
    ,id:'jsdatarow'
    ,height:'30px'
    ,cursor:'pointer'
    ,selected:0
    ,index:0
    ,customProps:{
      addCell:{
        configurable:true,writable:true,enumerable:false,value:function(content,props){
          var tdId=this.id+'_'+this.children.length;
          var nuev_celda=$f.instanciar({
            tag:'td',id:tdId,textContent:content,border:'solid 1px #E1E1E1',padding:'0px 5px'
          ,textOverflow:'ellipsis'
          ,overflow:'hidden'
          ,whiteSpace:'nowrap'
          ,customProps:{
            strictWidth:{set:function(v){
              this.width=v;
              this.minWidth=v;
              this.maxWidth=v;
            },configurable:true}
          }
        });
          nuev_celda.assignProps=props;
          this.addChild_r(nuev_celda);
        }
      }
    }
    ,events:[
      /*['click',function(){
        //alert('click en row');
        for(var i=0;i<this.parent.children.length;i++){
          this.parent.children[i].backgroundColor='transparent';
          this.parent.children[i].selected=0;
        }

        this.backgroundColor="#00aacc";
        this.selected=1;
      },false]*/
    ]
  }

})
