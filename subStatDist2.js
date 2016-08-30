/*testingFtU
* subStatDist2.js
*
* Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>
* https://github.com/YujiSODE/testingFtU
*
* This is released under the Artistic License.
* See http://dev.perl.org/licenses/ and http://dev.perl.org/licenses/artistic.html
* or LICENSE.
*/
(function(){
var slf=this.window,W,r9=slf.Math.random().toFixed(9).replace(/\./g,''),cObj;
  //=== element generator ===
  var f=function(elName,elId,targetId){
    var t=slf.document.getElementById(targetId),E=slf.document.createElement(elName);
    E.id=elId;
    return t.appendChild(E);
  };
  //=========================
var B,tDiv,fm,fmR,lbA,ipA,lbB,ipB,lbTSm,ipTSm,lbAlpha,ipAlpha,Btn,TxtALb,txtA,br01,restB,adrsLbl,adrs,sbmtB,t,D=[],lk;
  B=slf.document.getElementsByTagName('body')[0];B.id='B'+r9;
  tDiv=f('div','div'+r9,B.id),B.removeAttribute('id');
  //<form>
  fm=f('form','fm'+r9,tDiv.id);
  fmR=f('form','fmR'+r9,tDiv.id);
  fmR.name='statistical test';
  fmR.action='mailto:123.example@qwerty.com?subject='+slf.document.getElementsByTagName('title')[0].innerHTML;
  fmR.method='post';
  fmR.enctype='text/plain';
  //</form>
  //<sample>
  lbA=f('label','labelA'+r9,fm.id),lbA.innerHTML='<br>Sample:';
  ipA=f('input','inputA'+r9,lbA.id),ipA.type='text',ipA.value='3,4,5';
  //</sample>
  //<resampling from>
  lbB=f('label','labelB'+r9,fm.id),lbB.innerHTML='<br>Resampling from:';
  ipB=f('input','inputB'+r9,lbB.id),ipB.type='text',ipB.value='0,1,2';
  //</resampling from>
  //<time of simulation>
  lbTSm=f('label','labelTSm'+r9,fm.id),lbTSm.innerHTML='<br>Time of simulation:';
  ipTSm=f('input','inputTSm'+r9,lbTSm.id),ipTSm.type='number',ipTSm.min=1,ipTSm.step=1,ipTSm.value=10;
  //</time of simulation>
  //<significance level>
  lbAlpha=f('label','labelAlpha'+r9,fm.id),lbAlpha.innerHTML='<br>Significance level:';
  ipAlpha=f('input','inputAlpha'+r9,lbAlpha.id),ipAlpha.type='number',ipAlpha.min=0,ipAlpha.max=1,ipAlpha.step=0.001,ipAlpha.value=0.025;
  //</significance level>
  Btn=f('input','Btn'+r9,fm.id),Btn.type='button',Btn.value='Run';
  //<output as email>
  TxtALb=f('label','labelTxtArea'+r9,fmR.id),TxtALb.innerHTML='<br>Result:';
  txtA=f('textarea','result'+r9,TxtALb.id),txtA.name='Result';
  br01=f('br','br01_'+r9,fmR.id);
  restB=f('input','resetB'+r9,fmR.id),restB.type='button',restB.value='Clear';
  adrsLbl=f('label','adrsLbl'+r9,fmR.id),adrsLbl.innerHTML='<br>Email address:';
  adrs=f('input','adrs'+r9,adrsLbl.id),adrs.type='email',adrs.value='123.example@qwerty.com';
  sbmtB=f('input','submitB'+r9,fmR.id),sbmtB.type='submit',sbmtB.value='Output as email';
  adrs.addEventListener('change',function(){
    var F=slf.document.getElementById(fmR.id);
    F.action='mailto:'+this.value+'?subject='+slf.document.getElementsByTagName('title')[0].innerHTML+': '+slf.Date().replace(/\s/g,'_');
  },true);
  //</output as email>
  lk=f('a','link'+r9,tDiv.id),lk.innerHTML='<br>2 sample test',lk.href='./testingFtU.html';
  restB.addEventListener('click',function(){
    slf.document.getElementById(txtA.id).value='';
  },true);
//============ web worker ============
  W=new Worker('./statDist2.js');
  W.addEventListener('error',function(e){console.log(e.message),W.terminate();},true);
  W.addEventListener('message',function(e){
    var output='F-test,t-test,U-test\n',d=e.data,n=d.p.length;
    t=slf.document.getElementById(txtA.id);
    output+=d.FtU+'\n<Details: p value>\n';
    for(var i=0;i<n;i+=1){output+=d.p[i]+'\n';}
    t.value+=output;
  },true);
  Btn.addEventListener('click',function(){
    t=slf.document.getElementById(txtA.id);
    //e.g, D=['3,4,5', '0,1,2', 10, 0.025]
    D[0]=slf.document.getElementById(ipA.id).value;
    D[1]=slf.document.getElementById(ipB.id).value;
    D[2]=slf.document.getElementById(ipTSm.id).value;
    D[3]=slf.document.getElementById(ipAlpha.id).value;
    W.postMessage(D.join('@'));
    t.value+='<sample size:'+D[0].split(',').length+'; Simulation:'+D[2]+'times; Significance level:'+D[3]+'>\n'
  },true);
}());
