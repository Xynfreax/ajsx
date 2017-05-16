$$.require(function(){
  $.add=
  {
    tag:'div'
    ,id:'jstabstitle'
    ,position:'relative'
    ,display:'inline-flex'
    ,alignItems:'center'
    ,height:'100%'
    ,padding:'0px 10px'
    ,cursor:'pointer'
    ,tabIndex:0
    ,events:[
      ['mouseover',function(){
        this.color='#2B579A'
      },false]
      ,['mouseout',function(){
        this.color='#222'
      },false]
    ]
    //,backgroundColor:'green'
  }
  $.add=
  {
    tag:'div'
    ,id:'jstabscontent'
    ,position:'absolute'
    ,padding:'10px'
    ,display:'inline-block'
    /*,top:'0px'
    ,left:'0px'*/
    ,width:'100%'
    /*,minWidth:'100%'
    ,minHeight:'100%'*/
    ,height:'auto'
    // ,transition:'0.3s'
    //,flexGrow:'1'
        //--,backgroundColor:'#F1F1F1'
    ,backgroundColor:'#FAFAFA'
    //--,border:'solid 2px green'
    //---,display:'none'
    // ,visibility:'hidden'
  }
  $.add=
  {
    tag:'div'
    ,id:'jstabs'
    ,border:'solid 1px gray'
    ,borderRadius:'5px'
    ,position:'relative'
    ,display:'inline-flex'
    ,flexDirection:'column'
    ,width:'100%'
    ,height:'auto'
    // ,border:'solid 3px brown'
    ,backgroundColor:'#E1E1E1'
    ,color:'#222'
    ,fontSize:'13px'
    // ,borderBottom:'solid 1px red'
    // ,transition:'0.5s'
    ,mytimer:function() {

    }
    ,focusIn:function(){
      //console.log('EN INTERVAL');
      var this_=this;

      for(var i=0;i<this_.jstabsbody.children.length;i++){
        var actTab=this.jstabsbody.children[i];
        if(actTab.dom.contains(document.activeElement)){
          this_.selectTab(i+1);

          break;
        }
      }

    }
    ,myenterclick:function(e){
      if($[e.target.id]!==undefined && $[e.target.id].tag=='jstabstitle'){

        var act_tab_title=$[e.target.id];
        var indexSelected=act_tab_title.zIndex;
        //--var identif=$[e.target.id]+'_jstabscontent_';
        this.selectTab(indexSelected);

      }
    }
    ,events:[
      ['click',function(e){
        this.myenterclick(e);
      },false]
      ,['keypress',function(e){
        if(e.keyCode==13){
          this.myenterclick(e);
        }

      },false]
      ,['focus',function(e) {
        alert('focus');
      },false]

    ]
    ,selectedTab:0
    ,selectTab:function(index){
      var this_=this;

      if(this.selectedTab!==index){
        this.selectedTab=index;
        //--alert('seleccionado tab');
        //|Funciona
        for(var i=0;i<this.jstabsheader.children.length;i++){
          this.jstabsheader.children[i].backgroundColor='transparent';
          this.jstabsheader.children[i].borderTop='solid 2px transparent';
        }
        var act_tab_title=this.jstabsheader.children[index-1];
        act_tab_title.backgroundColor='#F1F1F1';
        act_tab_title.borderTop='solid 2px #428bca';
        for(var i=0;i<this.jstabsbody.children.length;i++){
          //-----this.jstabsbody.children[i].display='none';
          //this.jstabsbody.children[i].visibility='hidden';
          this.jstabsbody.children[i].zIndex=i+1;//cuando position asolute
          this.jstabsbody.children[i].position='absolute';//cuando position asolute
          //this.jstabsbody[cad].position='absolute';
          console.log();
        }

        var cad=this.id+'_jstabscontent_'+index
        console.log(cad);
         this.jstabsbody[cad].zIndex=i+2;//cuando position absolute
         this.jstabsbody[cad].position='relative';
         this.jstabsbody[cad].marginLeft='0px';
         this.jstabsbody[cad].left='0px';

        //  var x, y;
        //  // More sources for scroll x, y offset.
        //  if (typeof(window.pageXOffset) !== 'undefined') {
        //      x = window.pageXOffset;
        //      y = window.pageYOffset;
        //  } else if (typeof(window.scrollX) !== 'undefined') {
        //      x = window.scrollX;
        //      y = window.scrollY;
        //  } else if (document.documentElement && typeof(document.documentElement.scrollLeft) !== 'undefined') {
        //      x = document.documentElement.scrollLeft;
        //      y = document.documentElement.scrollTop;
        //  } else {
        //      x = document.body.scrollLeft;
        //      y = document.body.scrollTop;
        //  }
        //
        //
        //  if (typeof x !== 'undefined') {
        //      // In some cases IE9 does not seem to catch instant scrollTo request.
        //      setTimeout(function() { window.scrollTo(x, y); }, 100);
        //  }

        this_.jstabsbody.overflow='auto';
        this_.jstabsbody.dom.scrollTop='0px'
        this_.jstabsbody.dom.scrollLeft='0px'
        this_.jstabsbody.overflow='hidden';

        //this.jstabsbody[cad].zIndex=;
        console.log(this.jstabsbody[cad].zIndex);
         //----------this.jstabsbody[cad].display='block';
        // this.jstabsbody[cadvar this_=this;var this_=this;].visibility='visible';
        // ---this.jstabsbody.children[0].marginLeft='-'+100*(index-1)+'%'
      }


    }
    ,onDelete:function() {
      var this_=this;
      clearInterval(this_.mytimer);
    }
    ,load_r:function(){
      var this_=this;
      this.mytimer=setInterval(this_.focusIn.bind(this_),50);

      var mytabs=this.tabs;
      for(var i=0;i<mytabs.length;i++){
        var temp_json0={tag:'jstabstitle'};
        temp_json0.innerId=this.id+'_jstabstitle_'+(i+1)
        var temp_json1={tag:'jstabscontent'};
        temp_json1.innerId=this.id+'_jstabscontent_'+(i+1)

        var tabtitle=$f.instanciar(temp_json0);
        var tabcontent=$f.instanciar(temp_json1);
        //--tabcontent;
        //--tabcontent.innerId=this.id+'_jstabscontent_'+(i+1);

        tabtitle.textContent=mytabs[i].showName;
        tabtitle.zIndex=i+1;

        tabcontent.children=mytabs[i].content;
        tabcontent.zIndex=i+1;
        this.jstabsheader.addChild_r(tabtitle);
        this.jstabsbody.addChild_r(tabcontent);
      }
      this.selectTab(1);
    }
    ,children:[
      {
        tag:'div'
        ,innerId:'jstabsheader'
        ,position:'relative'
        ,height:'30px'
        // ,border:'solid 1px black'
        ,width:'100%'
      }
      ,{
        tag:'div'
        ,innerId:'jstabsbody'
        ,position:'relative'
        ,width:'100%'
        ,height:'auto'
        // ,border:'solid 3px yellow'
        ,flexGrow:1
        ,display:'flex'
        ,flexDirection:'row'
        ,backgroundColor:'#F1F1F1'
        ,overflow:'hidden'
        //--,backgroundColor:'#6688ff'
      }
    ]
  }
})
