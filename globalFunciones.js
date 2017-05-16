$$.require([],function(){

  // alert('en global');

  if(undefined==window.$f){window.$f={}}
  $f.isLogged=function(fyes,fno){
    //vemos si esta logueado en el server:
    var req={
      type:'query'
      ,content:'isLoged'
      ,params:{
        nickname:localStorage.actual_user
      }
    };

    $f.xhrPost(req,function(res){
    //alert('ENVIANDO: '+res);
    if(res!==null){
      //console.log(res);
      var res_json=JSON.parse(res);


      //----console.log(res_json);
      if(res_json.cod==0  && res_json.isLoged==true){
        fyes();
      }else{
        fno();
      }

    }else{
      alert("Hubo un error: NULL");
    }
  });


    var inicioErp=function(){
      /*var islogged=false;
      if(islogged==true){
        fyes();
      }else{
        fno();
      }
      */

    }
    //-$$.isLogged(inicioErp.bind(this)());
    //---inicioErp.bind(this)();
  }
  $f.xhrPost=function (data,callbackExito,callbackError) {
          var xhr = new XMLHttpRequest();
          var xResponse=null;
          xhr.withCredentials = true;
          /*--xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {


              //--console.log(this.responseText);
              //--alert('LA RESPUESTA: '+this.responseText);
              if(data.content=='getReporte'){
                xResponse=this.response;
              }else{
                xResponse=this.responseText;
              }
                              callback(xResponse);

            }
          });
*/
      serverIP='localhost';
          xhr.addEventListener("load", function () {

            var state = this.readyState;
            var responseCode = xhr.status;
            console.log("request.onload called. readyState: " + state + "; status: " + responseCode);

            if (state == this.DONE && responseCode == 200) {
                ///---var responseData = this.responseText;
                //console.log("Success: " + responseData.length  + " chars received.");
                console.log('si entro');
                //--alert('LA RESPUESTA: '+this.responseText);
                var xResponse='';
                if(data.content=='getReporte'){
                  xResponse=this.response;
                }else{
                  xResponse=this.responseText;
                }
                callbackExito(JSON.parse(xResponse));


            }else{
              //console.log('--Respuesta xhr: '+this.);
            }

          });
          xhr.addEventListener('error',function(e){
            console.log('--Error en xhr');
            if(callbackError!==undefined){
              callbackError(e);
            }else{
              alert('No se pudo conectar con el servidor: '+serverIP);
            }
          })
          serverIP='localhost';
          xhr.open("POST", "http://"+serverIP+":3000");
          if(data.content=='getReporte'){
            xhr.responseType='blob';
          }
          //--xhr.setRequestHeader("cache-control", "no-cache");
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.send(JSON.stringify(data));
  }
  $f.xhrPost2= function (data) {
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      var xResponse=null;

      xhr.withCredentials = true;
      // -->var serverIP='localhost';
      var serverIP=location.hostname;
      xhr.addEventListener("load",
      function (){
          var state = this.readyState;
          var responseCode = xhr.status;
          console.log("request.onload called. readyState: " + state + "; status: " + responseCode);
          if (state == this.DONE && responseCode == 200) {
              xResponse=this.responseText;
              resolve(JSON.parse(xResponse));
          }else{
              reject(responseCode);
              //console.log('--Respuesta xhr: '+this.);
          }

          });
          xhr.addEventListener('error',function(e){
            console.log('--Error en xhr');
            // if(callbackError!==undefined){
            //   reject(e);
            // }else{
            //   //--alert('No se pudo conectar con el servidor: '+serverIP);
            //   reject('No se pudo conectar con el servidor: '+serverIP);
            // }
            reject('No se pudo conectar con el servidor: '+serverIP);
          })
          xhr.open("POST", "http://"+serverIP+":"+(parseInt(location.port)-1));
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.send(JSON.stringify(data));
    })

  }
  // $f.instanciar=function(json){
  //
  //   return crear_objeto_js(json);
  //
  //   //para ajs_mainx
  //   //  return json;//para ajs_mainx
  // }
  $f.consultar=function(nomb,parametros,exito,fracaso){
    //--this_=this;
    var req={
      type:'query'
      ,content:nomb
      ,params:parametros
      //,content:'obtCategoriasDeuda'
    };
    $f.xhrPost(req,function(res){
      if(res!==null){
        var res_json=JSON.parse(res);
        if(res_json.tipo!=='error'){
          exito(res_json.respuesta);
          //--res_json.respuesta
          //console.log(res_json.respuesta);
        }

      }else{
        if(fracaso==undefined){
          alert("Hubo un error: NULL");
        }else{
          fracaso();
        }

      }
    });
  }
  $f.openWindowIn=function(hash,/*sender_,*/callback_){
    //alert('sheerreessssssdsds');
    var pri_principal_=$.ERPPrincipal.children[1];//.pri_principal;
    //console.log($.ERPPrincipal);

      var hashAr=JSON.parse(decodeURIComponent(hash));
      //console.log(hashAr);

      if(hashAr.length>0){
        for(var i=0;i<hashAr.length;i++){


          var actHashArItem=hashAr[i];
          var winPath=actHashArItem.url;
          var winTarget=actHashArItem.target;
          var winParams=actHashArItem.params;
          //console.log(winTarget);

          if(winTarget=='modal'){
            //--alert('here');
            var wmodal=$f.instanciar({tag:'jswindowmodal'});
            var wmodalInner=$f.instanciar({tag:winPath,minHeight:'90%' });
            if(winParams!==undefined){
              //console.log(winParams);
              //console.log(JSON.parse(decodeURIComponent(winParams)));
              //--alert(decodeURIComponent(winParams));
              //--wmodalInner.sende='algo';
              //-alert(wmodalInner.sende);
              wmodalInner.assignProps=JSON.parse(decodeURIComponent(winParams));

            }

            //---var wmodalInner=$f.instanciar({tag:winPath,minHeight:'90%',params:{sender:sender_,callback:callback_} });            console.log();

            wmodal.show(wmodalInner);
            //console.log(wmodalInner);
        }
        else if(winTarget=='priTabs'){
          var newWindow=$f.instanciar({tag:winPath});
          pri_principal_.children[0].jscprinc.addin(newWindow);
          //++console.log(fi_cargarpagos_);
        }
        else if(winTarget==undefined){//asumimos que se cargará en la pagina pri_principal


          var newWindow=$f.instanciar({tag:winPath,innerId:'jscprinc'});//--{tag:'pri_principal',id:'pri_principal_i'/*,innerId:'pri_principal'*/}


          //console.log(newWindow);
          //alert(winPath);
          pri_principal_.emptyChildren();
          pri_principal_.addChild_r(newWindow);

          //---$.ERPPrincipal.addChild_r(newWindow);
        }
      }

        /*--}else if(winTarget=='priTabs'){
          var newWindow=$f.instanciar({tag:winPath});

          //++console.log(fi_cargarpagos_);
        }
        */
      }
    //--var this_=this;

    //---return accion;
  }
  $f.openWindowIn_=function(hash,/*sender_,*/callback_){
    //console.log($.ERPPrincipal);
    var accion='normal';
    var pri_principal_=$.ERPPrincipal.pri_principal;
    //--evaluamos el hash, si esta separado por "|", entonces...

      var hashAr=hash.split('|');
      //console.log(hashAr);
      if(hashAr.length>1){
        var winPath=hashAr[0]
        var winTarget=hashAr[1];
        var winParams=hashAr[2];

        if(winTarget=='modal'){
          //--alert('here');
          var wmodal=$f.instanciar({tag:'jswindowmodal'});
          var wmodalInner=$f.instanciar({tag:winPath,minHeight:'90%' });
          if(winParams!==undefined){
            //console.log(winParams);
            //console.log(JSON.parse(decodeURIComponent(winParams)));
            //--alert(decodeURIComponent(winParams));
            //--wmodalInner.sende='algo';
            //-alert(wmodalInner.sende);
            wmodalInner.assignProps=JSON.parse(decodeURIComponent(winParams));

          }

          //---var wmodalInner=$f.instanciar({tag:winPath,minHeight:'90%',params:{sender:sender_,callback:callback_} });            console.log();

          wmodal.show(wmodalInner);
          //console.log(wmodalInner);
          //console.log(wmodalInner.params.sender);
          accion='none';
        }else if(winTarget=='priTabs'){
          var newWindow=$f.instanciar({tag:winPath});
          pri_principal_.jscprinc.addin(newWindow);
          //++console.log(fi_cargarpagos_);
        }
      }
    //--var this_=this;

    return accion;
  }
  $f.getperiodoactivo=function(){
    var periodo={cod:'20',nom:'2016-I',anio:'2016',semestre:'1'}
    return periodo;
  }
  $f.getUniversity=function(){
    //--var university={nom:'Universidad Peruana Santo Tomás de Aquino de Ciencia e Integración'};
    var university={nom:'Universidad Peruana del Centro'};
    return university;
  }
  $f.evalrequired=function(){
    var passed=true;
    for(var i=0;i<arguments.length-1;i++){
      var actObj=arguments[i];
      if(actObj.value!==undefined){
        if(actObj.value.toString().trim()===''){
          alert('Elemento "'+actObj.label+'" vacío');
          actObj.dom.focus();
          passed=false;
          break;
          return false;
        }
      }
    }
    if(passed==true){
      arguments[arguments.length-1]();
    }

  }
  $f.generarForm=function(json,target){
    probando=$f.instanciar({tag:'div',position:'absolute',width:'100%',backgroundColor:'white',textContent:'asdfasdf'});
    target.addChild_r($f.instanciar($f.getObj(json)));


    //--target.children=

  }
  $f.getObj=function(json){
    var returned={

    };
    if(json.length<2){//solo cuando es una fila, caso contrario generara una tabla con rows
      returned={
        tag:'div'
        ,children:[]
      }
    }else{
      //un tabla
    }
    var typAr={
      'group':'jsgroupbox'
      ,'string':'jsinputh'
      ,'string-password':'jsinputh'
      ,'string-hidden':'jsinputh'
      ,'string-date':'jsinputh'
      ,'date':'jsinputh'
      ,'button':'jsbutton'
      ,'button-submit':'jsbutton'
      ,'titlebar':'jstitlebar'
      ,'boolean':'jsinputcheck'
    }

    for(var i=0;i<json.length;i++){
      var actRow=json[i];
      var actRowContainer={
        tag:'div'
        ,children:[]
      }
      if(json.length<2){//solo cuando es una fila, caso contrario generara una tabla con rows
        actRowContainer={
          tag:'div'
          ,children:[]
        }
      }

      for(var k in actRow){
        var actObj=actRow[k];
        var typ=actObj.typ;
        var jsonObj={
          tag:typAr[typ]
        }

        if(typAr[typ]=='jstitlebar'){
          jsonObj.text=actObj.sName;
          jsonObj.innerId=k;

        }
        if(typAr[typ]=='jsgroupbox'){
          jsonObj.jstitle=actObj.sName;
          jsonObj.innerId=k;

        }
        if(typAr[typ]=='jsinputcheck'){
          jsonObj.label=actObj.sName;
          jsonObj.innerId=k;
          jsonObj.inputProps={};
          jsonObj.inputProps.value=actObj.val;
          jsonObj.inputProps.checked=actObj.val;
          //Bindeamos
          jsonObj.binded=actObj;
          jsonObj.inputProps.events=[
            ['change',function(){
              this.value=this.dom.checked;
              console.log('--',this.parent.binded.sName);
              this.parent.binded.val=this.dom.value;
              console.log('--',this.parent.binded.val);
            },false]
          ]
        }
        if(typAr[typ]=='jsinputh'){
          jsonObj.label=actObj.sName;
          //actObj.val='algooo';


          jsonObj.inputProps={};
          jsonObj.inputProps.value=actObj.val;
          if(actObj.req!==undefined){
            jsonObj.inputProps.required=true;
          }

          //si es hidden
          if(typ=='string-hidden'){
            jsonObj.display='none';
            jsonObj.inputProps.type='hidden';
          }
          if(typ=='string-date'){
            jsonObj.inputProps.type='date';
          }
          //Bindeamos
          jsonObj.binded=actObj;
          jsonObj.inputProps.events=[
            ['change',function(){
              console.log('--',this.parent.binded.sName);
              this.parent.binded.val=this.dom.value;
            },false]
          ]
        }
        if(typAr[typ]=='jsbutton'){
          jsonObj.text=actObj.sName;
          if(typ=='button-submit'){
            jsonObj.jstype='submit'
          }
          if(/*actObj.action=='submit' && */actObj.subAction!==undefined){//asumimos que es un query

            if(get_type(actObj.subAction.params)==1 && actObj.subAction.params[0]=='middleware'){

              //---actObj.subAction.params=$f[actObj.subAction.params[2]](actObj.subAction.params[1])
              jsonObj.action=actObj.action;
              jsonObj.subAction=actObj.subAction;
              jsonObj.actionAft=actObj.actionAft;
              jsonObj.parser=actObj.subAction.params[2];
              //---jsonObj.subAction.params=$f[actObj.subAction.params[2]](json);
              console.log(actObj.subAction.params);
            }

            jsonObj.events=[
              ['click',function(e){
                var this_=this;
                var func=function(){
                  alert(this_.action);
                  //acion submit
                  if(this_.action=='submit'){
                    var req=this_.subAction;
                    req.params=$f[this_.parser](json);
                    console.log(this_.subAction);
                    $f.xhrPost(req,function(res){
                      //alert('ENVIANDO: '+res);
                      var resJson=JSON.parse(res);
                      if(resJson.cod==0){
                        //--console.log(res);
                        console.log(resJson);
                        alert(resJson.mess);
                        $f[this_.actionAft](json,resJson);

                      }else if(resJson.cod>0){
                        alert(resJson.mess);
                      }else{
                        alert('Error Fatal');
                        console.log("Hubo un error: NULL");
                      }
                    });
                  }else if(this_.action=='openModal'){//acion openModal
                    alert('ACCION DE OPENMODAL');
                  }

                }
                if(this_.jstype=='submit'){
                  var formulario=this_.getParentBy('amark','form');//OJO, puede que no funcione luego
                  //var formulario=$['vfEditUsuario'];
                  formulario.enviar=func;
                  formulario.dom.submit();
                  //-func();
                }else{
                  func();
                }

              },false]
            ]
          }

        }
        //---
        if(actObj.alias!==undefined){
          jsonObj.innerId=actObj.alias;
        }
        console.log('--',actObj);
        console.log('--',actObj.val);
        //--console.log('--',get_type(actObj.val));
        if(get_type(actObj.val)==1){//solo aplica en agrupadores
          //--jsonObj.children=[];

          var actObjChil=actObj.val;
          if(typAr[typ]=='jsgroupbox'){
            jsonObj.jscontent=[];
            jsonObj.jscontent.push($f.getObj(actObjChil));
          }else{
            jsonObj.children=[];
            jsonObj.children.push($f.getObj(actObjChil));
          }
        }else if(get_type(actObj.val)==undefined){

        }

        actRowContainer.children.push(jsonObj);
        /**/
        //
        //--if(json.length<2){//solo cuando es una fila, caso contrario generara una tabla con rows

        //--}
      }
      returned.children.push(actRowContainer);
    }
    return returned;
  }
  $f.parseLoginForm=function(json){
    var returned={
      nickname:json[0].login.val[0].nickname.val
      ,password:json[0].login.val[0].password.val
    }
    return returned;

  }
  $f.parseEditUsuario=function(json){
    var returned={//esto enviara como params
      //id:json[0].usuario.val[0].id.val
      usuario:{
        id:json[0].usuario.val[0].id.val//cuando edit sera diferente de 0
        ,nickname:json[0].usuario.val[0].nickname.val
        ,password:json[0].usuario.val[0].password.val
        ,activo:json[0].usuario.val[0].activo.val
      }
      ,persona:{
        nombres:json[0].persona.val[0].nombres.val
        ,apellidos:json[0].persona.val[0].apellidos.val
        ,fnacimiento:json[0].persona.val[0].fnacimiento.val
      }

    }
    return returned;

  }
  $f.parseLoginFormAft=function(json,resp){
    localStorage['actual_user']=resp.nickname;
    alert('Esto es after');//tambien se ejecutará algo en funcion del historial
    //enviamos a login page
    window.location='http://localhost:3000'

  }
  $f.parseEditUsuarioAft=function(json,resp){
    if(resp.cod==0){
      alert('Datos Guardados Correctamente');
    }else{
      alert('Hubo un error: "'+resp.mess+'"');
    }
        //alert('Esto es after');//tambien se ejecutará algo en funcion del historial


  }

}
)
