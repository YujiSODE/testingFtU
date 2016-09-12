#Change Log

## [3.0] - 2016-09-12
##Changed
- [subStatDist.js] line 20: `var B,tDiv,fm,fmR,lbA,ipA,lbB,ipB,Btn,TxtALb,txtA,br01,restB,adrsLbl,adrs,sbmtB,t,D=[],lk,lk2;`
- [testingFtU.html] line 24: ` <h3>F-test, t-test, and U-test with two numerical arrays</h3>`
- [testingFtU2.html] line 2: `<title>testingFtU@bootstrap_simulation</title>`

##Added
- [testingFtU2.html] line 26: ` <h3>F-test, t-test, and U-test with bootstrap simulation</h3>`

## [3.0] - 2016-09-10
##Changed
- [statDist3.js]  line 45-47 in statDist2.js: `  X/=N;`
  `  slf.postMessage({t:X,p:P});`
  `  c=dBts=P=null;`
- [statDist3.js]  line 43 in statDist2.js: `    X+=P[I]<d4?1:0;`

##Removed
- [statDist3.js]  line 44-46 in statDist2.js
- [statDist3.js]  line 43 in statDist2.js

##Changed
- [statDist3.js]  line 36-39 in statDist2.js: `I=0;while(I<d3){`
  `    dBts=bootstrap(d0,d2),c=t_1spl(dBts,d1);`
  `    //P=[p-value for t]`
  `    P[I]=tprob(c[1],c[0]);`

##Added
- [statDist3.js]  line 25 in statDist2.js: `  //=== <t value for 1-sample t-test> ===`
  `  t_1spl=function(A,m){`
  `    //A and m are numerical array and given mean value respectively.`
  `    var v=0,I=0,av=0,s2=0,n=A.length;`
  `    while(I<n){v+=A[I],I+=1;}`
  `    av=v/n,I=0,v=0;`
  `    while(I<n){v+=(A[I]-av)*(A[I]-av),I+=1;}`
  `    s2=v/(n-1);`
  `    return [(av-m)/Math.sqrt(s2/n),n-1];};`
  `  //=== <t value for 1-sample t-test> ===`

##Removed
- [statDist3.js]  line 24 in statDist2.js

##Changed
- [statDist3.js]  line 23 in statDist2.js: `  var t_1spl,c,d=e.data.split('@'),d0=d[0].split(','),d1=+d[1],d2=+d[2],d3=+d[3],d4=+d[4],I=0,N=0,dBts,P=[],X=0;`
- [statDist3.js]  line 2 in statDist2.js: `* statDist3.js`
- [statDist3.js]  line 19-20 in statDist2.js: `//the available data format is csv formatted numerical arrays, given mean value, time of simulation and significance level (0 to 1), separated with '@' as follows:`
  `// e.g., '0,1,2@1@10@0.025'`
- [statDist3.js]  line 17 in statDist2.js: `//{t:[(t<crit)/T],p:[p(t), ..., p(t)]}`
- [statDist3.js]  line 15 in statDist2.js: `//this is Web Worker interface for statistical test (1-sample t-test) with bootstrap method.`

##Removed
- [statDist3.js]  line 53-60 in statDist2.js

##Added
- added files: statDist3.js modified from statDist2.js (Yuji SODE,2016), subStatDist3.js, and testingFtU3.html

## [2.0] - 2016-08-31
##Changed
- [README.md]: updated README.md

##Added
- [subStatDist.js] line 52-53: `  lk=f('a','link'+r9,tDiv.id),lk.innerHTML='<br>Test with bootstrap method',lk.href='./testingFtU2.html';`

##Changed
- [subStatDist.js] line 20: `var B,tDiv,fm,fmR,lbA,ipA,lbB,ipB,Btn,TxtALb,txtA,br01,restB,adrsLbl,adrs,sbmtB,t,D=[],lk;`

## [2.0] - 2016-08-30
##Changed
- [statDist2.js] line 17-22 in statDist.js:`  var c,d=e.data.split('@'),d0=d[0].split(','),d1=d[1].split(','),d2=+d[2],d3=+d[3],I=0,N=0,dBts,P=[],p,X=[0,0,0],pJn=[];`  
  `  I=0,N=d1.length;while(I<N){d1[I]=+d1[I],I+=1;}`  
  `  I=0,N=d0.length;while(I<N){d0[I]=+d0[I],I+=1;}`  
  `  //=== <resampling> ===`  
  `  I=0;while(I<d2){`  
  `    dBts=bootstrap(d1,N),c=_FtU(d0,dBts);`  
  `    //P=[p-value for F,p-value for t,p-value for U]`  
  `    P[I]=[fprob(c.f[1],c.f[2],c.f[0]),tprob(c.t[1],c.t[0]),uprob(c.u[1])];`  
  `    I+=1;}`  
  `  //=== </resampling> ===`  
  `  I=0,N=P.length;while(I<N){`  
  `    p=P[I];`  
  `    X[0]+=p[0]<d3?1:0;`  
  `    X[1]+=p[1]<d3?1:0;`  
  `    X[2]+=p[2]<d3?1:0;`  
  `    pJn[I]=p.join();`  
  `    I+=1;}`  
  `  X=[X[0]/N,X[1]/N,X[2]/N];`  
  `  slf.postMessage({FtU:X,p:pJn});`  
  `  c=dBts=P=pJn=null;`  
  `},true);`
- [statDist2.js] line 12-14 in statDist.js: `//{FtU:[(F<crit)/T,(t<crit)/T,(U<crit)/T],p:['p(F),p(t),p(U)', ..., 'p(F),p(t),p(U)']}`  
  `//where T and crit are time of simulation and significance level respectively.`  
  `//the available data format is two csv formatted numerical arrays, and time of simulation and significance level (0 to 1), separated with '@' as follows:`  
  `// e.g., '3,4,5@0,1,2@10@0.025'`
- [statDist2.js] line 10 in statDist.js: `//this is Web Worker interface for statistical test (F-test, t-test, and U-test) with bootstrap method.`
- [statDist2.js] line 1-8 in statDist.js:`/*testingFtU`  
  `* statDist2.js`  
  `*`  
  `* Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>`  
  `* https://github.com/YujiSODE/testingFtU`  
  `*`  
  `* This is modified from statDist (Yuji SODE,2016): the Artistic License;`  
  `* https://github.com/YujiSODE/statDist`  
  `*`  
  `* This is released under the Artistic License.`  
  `* See http://dev.perl.org/licenses/ and http://dev.perl.org/licenses/artistic.html`  
  `* or LICENSE.`  
  `*/`

##Added
- [statDist2.js] line 41 in statDist.js: added modified version of bootstrapEst-2.1/bootstrapMdl.js
- added files: statDist2.js modified from statDist (Yuji SODE,2016), subStatDist2.js, and testingFtU2.html

##Removed
- [bootstrapEst-2.1/bootstrapMdl.js] line 6-13: removed removable white space

##Changed
- [bootstrapEst-2.1/bootstrapMdl.js] line 13: `}`
- [bootstrapEst-2.1/bootstrapMdl.js] line 6: `function bootstrap(A,n){`
- [bootstrapEst-2.1/bootstrapMdl.js] line 14: `/*bootstrapEst-2.1/bootstrapMdl.js (Yuji SODE,2016)*/`
- [bootstrapEst-2.1/bootstrapMdl.js] line 1-10: `/*bootstrapEst-2.1/bootstrapMdl.js (Yuji SODE,2016)`  
  `* This software is released under the MIT License. See http://opensource.org/licenses/mit-license.php`  
  `* the simple interface for estimation of a value of statistic, with bootstrap Method (Efron,1979).`  
  `* reference: Efron, B. 1979. Bootstrap Methods: Another Look at the Jackknife. Ann. Statist. vol. 7, no. 1, p. 1-26.`  
`*/`
- [subStatDist.js] line 44: `restB=f('input','resetB'+r9,fmR.id),restB.type='button',restB.value='Clear';`

## [1.1] - 2016-08-28
##Changed
- [subStatDist.js] line 43: `br01=f('br','br01_'+r9,fmR.id);`  
  `restB=f('input','resetB'+r9,fmR.id),restB.type='button',restB.value='Reset';`
- [subStatDist.js] line 41: `TxtALb=f('label','labelTxtArea'+r9,fmR.id),TxtALb.innerHTML='<br>Result:';`   
  `txtA=f('textarea','result'+r9,TxtALb.id),txtA.name='Result';`
- [subStatDist.js] line 20: `var B,tDiv,fm,fmR,lbA,ipA,lbB,ipB,Btn,TxtALb,txtA,br01,restB,adrsLbl,adrs,sbmtB,t,D=[];`

## [1.0] - 2016-08-24
##Changed
- [calcStat_FtU.js] line 8: `/*calcStat_FtU.js (Yuji SODE, 2016)*/`
- [calcStat_FtU.js] line 8-44: changed the way declare variables

##Removed
- [calcStat_FtU.js] line 7-65: removed removable white space and comments

##Changed
- [calcStat_FtU.js] line 5-6: `*    https://github.com/YujiSODE/calcStat_FtU`  
  `*/`
- [calcStat_FtU.js] line 1-7: `/* calcStat_FtU.js`  
  `*    Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>`  
  `*    This software is released under the MIT License.`  
  `*    See http://opensource.org/licenses/mit-license.php`  
  `*/`

## [1.0] - 2016-08-04
##Changed
- [statistics-distributions_Ymdf.js] line 500: `/*statistics-distributions-js_Ymdf.js (Ben Tilly,2008; modified by Yuji SODE, 2016)*/`
- [statistics-distributions_Ymdf.js] line 498: `{return Math.ceil($i);}`
- [statistics-distributions_Ymdf.js] line 496: `{return Math.floor($i);}`
- [statistics-distributions_Ymdf.js] line 428-429: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 415-417: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 406-407: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 371-379: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 352-353: changed the way declare variables

##Removed
- [statistics-distributions_Ymdf.js] line 337-499: removed removable white space and comments

## [1.0] - 2016-08-03
##Changed
- [statistics-distributions_Ymdf.js] line 318-322: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 318-322: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 303-308: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 287-298: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 250-251: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 231-243: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 210-212: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 175-177: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 168-169: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 161-162: changed the way declare variables
- [statistics-distributions_Ymdf.js] line 1-6: `/*statistics-distributions-js_Ymdf.js (Ben Tilly,2008; modified by Yuji SODE, 2016)`  
  `* https://github.com/YujiSODE/statistics-distributions-js_Ymdf`  
  `* The original version: https://code.google.com/archive/p/statistics-distributions-js/`  
  `* This is released under either the Perl Artistic License or the GPL v1 or later.`  
  `* See http://dev.perl.org/licenses/ and http://dev.perl.org/licenses/artistic.html or http://dev.perl.org/licenses/gpl1.html`  
  `*/`

##Removed
- [statistics-distributions_Ymdf.js] line 83-336: removed removable white space and comments
- [statistics-distributions_Ymdf.js] line 1-82: removed comments
- [statistics-distributions_Ymdf.js] line 500-530: removed comments
