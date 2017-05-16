$_skins=
[
  'default','jsmenu','jscheckselect','jstable','jsoptiongroup','jstitlebar','jsinput','erp/erp-normalwindow','erp/erp-jsreporter','erp/index','erp/principal','erp/reportes/comprobante','erp/reportes/ad-ficha','erp/reportes/ad-solicitud','erp/reportes/ad-constanciaingreso'
  ,'erp/login'
]
$$='algo'
for(var i=0;i<$_skins.length;i++){
  var resource = document.createElement('link');
  resource.setAttribute("rel", "stylesheet");
  resource.setAttribute("href","framework/skins/"+$_skins[i]+".css");
  resource.setAttribute("type","text/css");
  //--resource.setAttribute("async",false);
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(resource);
}

//----je je jeeee
globalenlibrerias='globalito';

/*
//|Importa scripts--------------------------------------------------------------------
function importScripts(ar_scripts,callback,callback2){
  var filesloaded=0;
  function checkLoadedS(){

    name_script=this['src'];
    me=name_script.substring(0,name_script.length-3);
    var first=me.lastIndexOf('/');
    var last=me.indexOf('.',first+1);
    ruta_relativa=me.substring(0,first+1);
    me=me.substring(0,last)+'.js';
    if(depOrderFunc.hasOwnProperty(me)){

      var actDep=depOrderFunc[me];
      if(isDepEmpty(actDep.deps)==true){
        actDep.active=false;
        depsExecuted.push(me);
        counterExecuted++;
        actDep.func()
        //--alert(me);
        for(var k in actDep.callrs){

          var actCallr=actDep.callrs[k];
          var actCallrScript=document.querySelector('script[src^="'+k+'"]');
          if(actCallrScript!==null){
            actCallrScript.onload();
          }else{
            if(actCallr.order==0){
              actCallr.active=false;
              depsExecuted.push(k);
              counterExecuted++;
              actCallr.func();

            }

          }
        }


      }
    }else{

    }

    if(filesloaded===ar_scripts.length){
    }

  }
  for(var i=0;i<ar_scripts.length;i++){
    importScript(ar_scripts[i],checkLoadedS);
    filesloaded++;
  }



}
function importScriptNormal(script_url,callback){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = false;
  script.src = script_url+'.js?q='+Date.now();
  script.onload = callback;
  document.head.appendChild(script);
}
function importScript(script_url,checkloaded){
  var path_temp=script_url;//+'.js';
    if($$_dependencias[script_url]!==undefined){
      $$_dependencias[script_url][1]=1;
    }

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = false;
      script.addEventListener('error',function(e){alert('El script '+e.target.src+' no existe');},false);
      script.src = script_url+'?q='+Date.now();
      script.onload = checkloaded;
      document.head.appendChild(script);
      return script;

}

function get_name_dependencias(ar){
  var returned_ar=[];
  for (var i=0;i<ar.length;i++){
    var me=ar[i];
    var first=me.lastIndexOf('/');
    var last=me.length;
    me=me.substring(first+1,last);
    returned_ar.push(me);
  }

  return returned_ar;
}
function clonarDependenciasConRuta(depe,ruta){
  var returned=[];
  for(var i=0;i<depe.length;i++){
    returned.push(fixPath(ruta+depe[i]+'.js'));
  }
  return returned;
}
function isDepEmpty(objDep){
  var isEmpty=true;
  for(var k in objDep){
    if(objDep.hasOwnProperty(k)){
      if( objDep[k].active!==false){
        isEmpty=false;
        break;
      }

    }
  }
  return isEmpty;
}
function wrapper_callback(callback_in,yo){

  callback_in();

  if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]<2){
    cl.lg.req('->__>_>_>->_>_>>_Ya estoy ejecutado: '+yo);
    $$_dependencias[yo][1]=2;//Significa que ya me importé

}else if($$_dependencias.hasOwnProperty(yo) && $$_dependencias[yo][1]>=2){
    $$_dependencias[yo][1]=9;//Significa que ya me recontra importé

  }


  if($$_dependencias.hasOwnProperty(yo)){

    var dependiente_macro=$$_dependencias[yo][0];


    for(var k in dependiente_macro){
      var dependiente=dependiente_macro[k];
      dependiente[2][0]++;//|cantidad de dependeicas que falta cargar

      if(dependiente[1][0]===dependiente[2][0]){

        wrapper_callback(dependiente[0],dependiente[3]);//La funcion que debe cargar: el wrapper

      }else if(dependiente[1][0]<dependiente[2][0]){

      }
    }
  }
}

//\Funcion para convertir path a version correcta (eliminar los ..)
//Solo sirve para rutas relativas
function fixPath(path){

  var arPath=path.split('/');
  var returnedPath='';
  for(var i=0;i<arPath.length;i++){

    if(arPath[i]=='..'){

      arPath.splice(i,1);
      if(i>0){

        arPath.splice(i-1,1);
        i--;
      }
      i--;

    }
  }
  returnedPath=arPath.join('/');
  return returnedPath;
}
function getCS(dom,prop){
  return window.getComputedStyle(dom,null)[prop];
}
function getSelectedRadio(obj,name){

  return obj.dom.querySelector('input[name="'+name+'"]:checked');

}
function openWIn(obj,dest){
  dest.emptyChildren();
  if(dest.dom==undefined){
    dest.addChild(obj);
  }else{
    dest.addChild_r(obj);
  }

}

function convertToAbs(obj){
  var objReturned=null;
  var left_=obj.dom.offsetLeft;
  var right_=obj.dom.offsetRight;
  var top_=obj.dom.offsetTop;
  var bottom_=obj.dom.offsetBottom;
  var width=obj.dom.offsetWidth;
  var height=obj.dom.offsetHeight;

  objReturned=$f.instanciar({tag:obj.id});
  return objReturnedM;
}


$$={
  require:function(dependencias_0,callback0,level){//|dependencias_, callback
    var dependencias_=[], callback=function(){};
    if(arguments.length==1){
      if(get_type(arguments[0])==4){//|es funcion
        callback=arguments[0];
      }else{
        alert('No pasó una funcion como parametro, y ademas solo hay un parámetro');
        callback=null;
      }

    }else if(arguments.length>=2){//|Por ahora suponemos que es un array y una funcion
      dependencias_=arguments[0];
      callback=arguments[1];
    }

    var actLevel=0;
    if(level==undefined){
      actLevel=0;
    }else{
      actLevel=level;
    }
    if(depByLevel[actLevel]==undefined){
      depByLevel.push([]);

    }
    depByLevel[actLevel].push(callback);


    var name_script='';
    var ruta_relativa='';
    var me='';

    name_script=document.currentScript['src'];
    me=name_script.substring(0,name_script.length-3);
    var first=me.lastIndexOf('/');
    var last=me.indexOf('.',first+1);
    ruta_relativa=me.substring(0,first+1);
    me=me.substring(first+1,last);
    me=fixPath(ruta_relativa+me+'.js');


var actOrder=0;
var actDepObj={};
if(Object.keys(depObj).length==0){
  depObj[me]={};
  depObj[me].func=callback;
  depObj[me].deps={};
  actDepObj=depObj[me];
}else{

}

if(Object.keys(depOrderFunc).length==0){

  actOrder=0;
  depOrderFunc[me]={};
  depOrderFunc[me].order=0;//---actLevel;
  depOrderFunc[me].func=callback;
  depOrderFunc[me].deps={};
  depOrderFunc[me].active=true;

}else{

  if(depOrderFunc[me]!==undefined){
    actOrder=depOrderFunc[me].order;
    depOrderFunc[me].func=callback;
    depOrderFunc[me].deps={};
    depOrderFunc[me].active=true;

  }
}


    var dependencias_for_import=clonarDependenciasConRuta(dependencias_,ruta_relativa);

    for(var a=0;a<dependencias_for_import.length;a++){
      var actDepName=dependencias_for_import[a];
      if(depOrderFunc[actDepName]==undefined){
        depOrderFunc[actDepName]={};
        depOrderFunc[actDepName].order=actOrder+1;
        depOrderFunc[actDepName].callrs={};
        depOrderFunc[actDepName].callrs[me]=depOrderFunc[me]

        depOrderFunc[me].deps[actDepName]=depOrderFunc[actDepName];
      }else{
        var newOrder=actOrder+1;
        if(actDepName=='file:///D:/dev/ERPUniversidad/cliente/vista/erpjswindow.js'){

        }
          depOrderFunc[actDepName].callrs[me]=depOrderFunc[me];
          depOrderFunc[me].deps[actDepName]=depOrderFunc[actDepName];

      }
    }

    var meAgregue=false;
    if(dependencias_.length>0){
      var contador1=[0];
      var contador2=[dependencias_.length];
      for(var i=0;i<dependencias_.length;i++){

        var path_=fixPath(ruta_relativa+dependencias_[i]+'.js');

        if($$_dependencias.hasOwnProperty(path_)){

          if($$_dependencias[path_][1]==1 || $$_dependencias[path_][1]==0){

            $$_dependencias[path_][0][me]=[callback, contador2, contador1, me, 0];//0 significa que aun no se ha importado
            meAgregue=true;
          }else{

          }
          dependencias_for_import.splice(i,1);
          dependencias_.splice(i,1);
          i--;
        }else{

          $$_dependencias[path_]=[{},0];
          contador2[0]=dependencias_.length;//-IMPORTANTE: aQUI ACTUALIZAMOS a contador2, porque sino... estariamos ref
          $$_dependencias[path_][0][me]=[callback, contador2, contador1, me, 0];//0 significa que aun no se ha importado
        }
      }
    }
    $$_dependientes[me]=dependencias_for_import;

    if(meAgregue==false && dependencias_.length==0){

    }
    importScripts($$_dependientes[me]);//--,wrapper_callback)

  }
}
*/
