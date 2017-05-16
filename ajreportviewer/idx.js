$$.require(['str','../../vista/gfunctions'],function() {
  Object.assign($j.ajreportviewer,{
    // tag:'ajreportviewer_e'
    // ,id:'ajreportviewer'
    load_r:function() {
      var th=this;
      // this.loadReport('vista/login')
      async function fornow(){
        let resp=await $_.query('reporteFichainscripcion',{typedoc:'pdf',id:1});
        // await $_.query('logout');
        console.log(resp.data);
        th.loadReport(resp.data);

        // th._loadReport('')
      }
      // fornow();

      // this.loadReport('framework/ajreport/ajreport')
      // th.loadReport('')
    }
    ,loadReport:async function(doc) {//siempre es pdf
      let th=this;

        let downloadUrl =doc// URL.createObjectURL(doc);
        // alert(th.myiframe);
        ////--var downloadUrl = URL.createObjectURL(resp);
        th.myiframe.src=downloadUrl;
        let myresolve,myreject;
        let myprom=new Promise(function(resolve,reject) {
          // myresolve=resolve;
          th.myiframe.dom.onload=function() {
            resolve()
          }
          th.myiframe.dom.onerror=function(e) {
            reject('EEERRROOO: '+e);
          }
        })
        await myprom;
        // th.myiframe.src="http://www.ca7.uscourts.gov/forms/type.pdf"//downloadUrl;
        return true;

    }
    ,print:function() {
      //debe usarse despues de que loadReport haya cargado
      // this.myiframe.dom.focus();
      this.myiframe.display='block';
      // window.frames.pdfFrame.print();
      this.myiframe.dom.contentWindow.print();
      // this.myiframe.dom.print();
    }
    ,_loadReport:function(urlPrint){
      var th=this;
      //http://localhost:5488/
      var dataSend={
        "template": { "name" : "invoice-template" },
        "data" : { "to": "Pavel Sladek",     "from": "Jan Blaha",  "price": 800 }
      }
      dataSend={
      //-- "template": { "content" : "Hello world", "recipe" : "phantom-pdf" },
        template: {
          content:"Hello world"
          ,recipe:"electron-pdf"
        }
      }
      dataSend={
        template: {
          // content : "CONTENIDO",
          //--name : "urls",
          // name : "Sample report",
          name : "electron",//nombre del template que se crea usando el playground web
          // url: 'http://localhost:3000/unittest.html#framework/ajreport/ajreport&printing=true',//tambien enviar usuario y password
          // recipe : "electron-pdf",
          //----"recipe" : "jsreport-phantom-pdf",

          //"engine" : "jsrender"
          //"engine" : "handlebars",
          electron: {
            // margin: "0cm",
            // headerHeight:"0cm"
            //-->header: "<div style=\"height:100%;border: solid 1px black\"><script>window.print('asdfasdf');<\/script></div>"
            //--"footer": "a footer"
            //----,"url": "http://localhost:3000/#form=login"
            //--url: 'http://localhost:3000/unittest.html#'+urlPrint+'&printing=true'//tambien enviar usuario y password
            // url: 'http://localhost:3000/unittest.html#'+urlPrint//tambien enviar usuario y password
            //url: 'http://localhost:3000/unittest.html#framework/ajreport/ajreport'//&printing=true'//tambien enviar usuario y password
            // url: 'http://www.muylinux.com/'//&printing=true'//tambien enviar usuario y password
            url: 'http://www.muylinux.com/'//&printing=true'//tambien enviar usuario y password
            // ,printDelay:3000//time in ms to wait before printing into pdf
            ,allowLocalFilesAccess: true
            ,waitForJS: false
            //--va en browser:{}
            ,width:'1366px'//tamaño de la ventana del browser en electron
            ,height:'1080px'
            //--va en pdf:{}
            ,format: 'A4'//pageSize//es el tamaño del reporte
            ,marginsType: 0
            ,printBackground: true,
            landscape: false
            //---

            // ,footer: '<span id="pageNumber">{#pageNum}</span>'+
            //             "<script>"+
            //                 "var elem = document.getElementById('pageNumber');"+
            //                 "if (parseInt(elem.innerHTML) > 3) {"+
            //                     "elem.style.display = 'none';"+
            //                 "}"+
            //                 "elem.textContent=$.caja.dom.textContent"+
            //             "<\/script>"

            /*,"footerHeight": "...",
            "orientation": "...",
            "format": "...",
            "width": "...",
            "height": "...",
            "printDelay": 1000,
            "resourceTimeout": 1000,
            "customPhantomJS": true,
            "blockJavaScript": false,
            "waitForJS": false*/
          }
        }
        /*--,"options": {
          "reports": { "save": true }
        }*/
      }
      // if(th.hasFooter==true){
      //   dataSend.template.phantom.footer=th.myfooter.textContent
      // }else{
      //   dataSend.template.phantom.footer=undefined;
      //   dataSend.template.phantom.footerHeight="0cm";
      // }
      // if(th.hasHeader==true){
      //   dataSend.template.phantom.header=th.myheader.textContent
      // }else{
      //   dataSend.template.phantom.header=undefined;
      //   dataSend.template.phantom.headerHeight="0cm"
      // }



      function mycallback(resp){
        console.log('--Respuesta de jsreport:',resp);
        console.log(resp);
        //--var byteString = atob(resp);
        var byteString = resp;

        // Convert that text into a byte array.
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // Blob for saving.
        //-->var blob = new Blob([ia], { type: "application/pdf" });

        // Tell the browser to save as report.pdf.
        var downloadUrl = URL.createObjectURL(resp);
        ////--var downloadUrl = URL.createObjectURL(resp);
        th.myiframe.src=downloadUrl;
        /*
        //--guardar de frente
        var a = document.createElement('a');
        a.style = "display: none";
        a.href = downloadUrl;
        a.download = 'borrar.pdf';
        document.body.appendChild(a);
        a.click();
        setTimeout(function(){
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        }, 0);
        //--
        */

        //--document.location = downloadUrl;
        //--saveAs(blob, "comprobante.xml");
      }
      var myxhr=function (data,callbackExito,callbackError) {
              var xhr = new XMLHttpRequest();
              var xResponse=null;
              //--xhr.withCredentials = true;

          var serverIP=location.hostname;
              xhr.addEventListener("load", function () {

                var state = this.readyState;
                var responseCode = xhr.status;
                console.log("request.onload called. readyState: " + state + "; status: " + responseCode);
                //--console.log('--respuesta: ',this.response);

                if (state == this.DONE && responseCode == 200) {
                    ///---var responseData = this.responseText;
                    //console.log("Success: " + responseData.length  + " chars received.");
                    console.log('si entro');
                    //--alert('LA RESPUESTA: '+this.responseText);
                    var xResponse='';
                    if(data.content=='getReporte'){
                      xResponse=this.response;
                    }else{
                      //--xResponse=this.responseText;
                      xResponse=this.response;
                    }
                    callbackExito(xResponse);


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
              xhr.open("POST", "http://"+serverIP+":5488/api/report");
              //--xhr.open("POST", "https://test.jsreportonline.net/api/report");
              if(data.content=='getReporte'){

              }
              xhr.responseType='blob';
              xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              xhr.send(JSON.stringify(data));
      }

      myxhr(dataSend,mycallback)
    }
  })
})
