/*testingFtU
* subStatDist.js
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
var B,tDiv,fm,fmR,lbA,ipA,lbB,ipB,Btn,TxtALb,txtA,br01,restB,adrsLbl,adrs,sbmtB,t,D=[],lk;
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
  //<sample A>
  lbA=f('label','labelA'+r9,fm.id),lbA.innerHTML='<br>Sample A:';
  ipA=f('input','inputA'+r9,lbA.id),ipA.type='text',ipA.value='3,4,5';
  //</sample A>
  //<sample B>
  lbB=f('label','labelB'+r9,fm.id),lbB.innerHTML='<br>Sample B:';
  ipB=f('input','inputB'+r9,lbB.id),ipB.type='text',ipB.value='0,1,2';
  //</sample B>
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
  lk=f('a','link'+r9,tDiv.id),lk.innerHTML='<br>Test with bootstrap method',lk.href='./testingFtU2.html';
//============ web worker ============
  W=new Worker('./statDist.js');
  W.addEventListener('error',function(e){console.log(e.message),W.terminate();},true);
  W.addEventListener('message',function(e){
    var output='',d=e.data;
    t=slf.document.getElementById(txtA.id);
    output+='F-test:'+d.f+'\n';
    output+='t-test:'+d.t+'\n';
    output+='U-test:'+d.u+'\n';
    t.value+=output;
  },true);
  Btn.addEventListener('click',function(){
    t=slf.document.getElementById(txtA.id);
    D[0]=slf.document.getElementById(ipA.id).value;
    D[1]=slf.document.getElementById(ipB.id).value;
    W.postMessage(D.join('@'));
    t.value+='<sample size:'+D[0].split(',').length+'x'+D[1].split(',').length+'>\n'
  },true);
  restB.addEventListener('click',function(){
    slf.document.getElementById(txtA.id).value='';
  },true);
}());
