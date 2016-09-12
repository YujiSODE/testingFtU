/*testingFtU
* statDist3.js
*
* Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>
* https://github.com/YujiSODE/testingFtU
*
* This is modified from statDist (Yuji SODE,2016): the Artistic License;
* https://github.com/YujiSODE/statDist
*
* This is released under the Artistic License.
* See http://dev.perl.org/licenses/ and http://dev.perl.org/licenses/artistic.html
* or LICENSE.
*/
//============================================================================
//this is Web Worker interface for statistical test (1-sample t-test) with bootstrap method.
//the Web Worker returns an object with upper probabilities as follows:
//{t:[(t<crit)/T],p:[p(t), ..., p(t)]}
//where T and crit are time of simulation and significance level respectively.
//the available data format is csv formatted numerical arrays, given mean value, given sample size, time of simulation and significance level (0 to 1), separated with '@' as follows:
// e.g., '0,1,2@1@20@10@0.025'
var slf=this;
slf.addEventListener('message',function(e){
  var t_1spl,c,d=e.data.split('@'),d0=d[0].split(','),d1=+d[1],d2=+d[2],d3=+d[3],d4=+d[4],I=0,N=0,dBts,P=[],X=0;
  I=0,N=d0.length;while(I<N){d0[I]=+d0[I],I+=1;}
  //=== <t value for 1-sample t-test> ===
  t_1spl=function(A,m){
    //A and m are numerical array and given mean value respectively.
    var v=0,I=0,av=0,s2=0,n=A.length;
    while(I<n){v+=A[I],I+=1;}
    av=v/n,I=0,v=0;
    while(I<n){v+=(A[I]-av)*(A[I]-av),I+=1;}
    s2=v/(n-1);
    return [(av-m)/Math.sqrt(s2/n),n-1];};
  //=== </t value for 1-sample t-test> ===
  //=== <resampling> ===
  I=0;while(I<d3){
    dBts=bootstrap(d0,d2),c=t_1spl(dBts,d1);
    //P=[p-value for t]
    P[I]=tprob(c[1],c[0]);
    I+=1;}
  //=== </resampling> ===
  I=0,N=P.length;while(I<N){
    X+=P[I]<d4?1:0;
    I+=1;}
  X/=N;
  slf.postMessage({t:X,p:P});
  c=dBts=P=null;
},true);
//============================================================================
/*statistics-distributions-js_Ymdf.js (Ben Tilly,2008; modified by Yuji SODE, 2016)
* https://github.com/YujiSODE/statistics-distributions-js_Ymdf
* The original version: https://code.google.com/archive/p/statistics-distributions-js/
* This is released under either the Perl Artistic License or the GPL v1 or later.
* See http://dev.perl.org/licenses/ and http://dev.perl.org/licenses/artistic.html or http://dev.perl.org/licenses/gpl1.html
*/
var SIGNIFICANT = 5;function chisqrdistr($n,$p){if($n<=0||Math.abs($n)-Math.abs(integer($n))!=0){throw("Invalid n: $n\n");}if($p<=0||$p>1){throw("Invalid p: $p\n");}return precision_string(_subchisqr($n-0,$p-0));}function udistr($p){if($p>1||$p<=0){throw("Invalid p: $p\n");}return precision_string(_subu($p-0));}function tdistr($n,$p){if($n<=0||Math.abs($n)-Math.abs(integer($n))!=0){throw("Invalid n: $n\n");}if($p<=0||$p>=1){throw("Invalid p: $p\n");}return precision_string(_subt($n-0, $p-0));}function fdistr($n,$m,$p){if(($n<=0)||((Math.abs($n)-(Math.abs(integer($n))))!=0)){throw("Invalid n: $n\n");}if(($m<=0)||((Math.abs($m)-(Math.abs(integer($m))))!=0)){throw("Invalid m: $m\n");}if(($p<=0)||($p>1)){throw("Invalid p: $p\n");}return precision_string(_subf($n-0, $m-0, $p-0));}function uprob($x){return precision_string(_subuprob($x-0));}function chisqrprob($n,$x){if(($n<=0)||((Math.abs($n)-(Math.abs(integer($n))))!=0)){throw("Invalid n: $n\n");}return precision_string(_subchisqrprob($n-0, $x-0));}function tprob($n,$x){if(($n<=0)||((Math.abs($n)-Math.abs(integer($n)))!=0)){throw("Invalid n: $n\n");}return precision_string(_subtprob($n-0,$x-0));}function fprob($n,$m,$x){if(($n<=0)||((Math.abs($n)-(Math.abs(integer($n))))!=0)){throw("Invalid n: $n\n");}if(($m<=0)||((Math.abs($m)-(Math.abs(integer($m))))!=0)){throw("Invalid m: $m\n");}return precision_string(_subfprob($n-0,$m-0,$x-0));}function _subfprob($n,$m,$x){var $p;if($x<=0){$p=1;}else if($m%2==0){var $z=$m/($m+$n*$x),$a=1;for(var $i=$m-2;$i>=2;$i-=2){$a=1+($n+$i-2)/$i*$z*$a;}$p=1-(Math.pow((1-$z),($n/2))*$a);}else if($n%2==0){var $z=$n*$x/($m+$n*$x),$a=1;for(var $i=$n-2;$i>=2;$i-=2){$a=1+($m+$i-2)/$i*$z*$a;}$p=Math.pow((1-$z),($m/2))*$a;}else{var $y=Math.atan2(Math.sqrt($n*$x/$m),1),$z=Math.pow(Math.sin($y),2),$a=($n==1)?0:1;for(var $i=$n-2;$i>=3;$i-=2){$a=1+($m+$i-2)/$i*$z*$a;}var $b=Math.PI;for(var $i=2;$i<=$m-1;$i+=2){$b*=($i-1)/$i;}var $p1=2/$b*Math.sin($y)*Math.pow(Math.cos($y),$m)*$a;$z=Math.pow(Math.cos($y),2);$a=($m==1)?0:1;for(var $i=$m-2;$i>=3;$i-=2){$a=1+($i-1)/$i*$z*$a;}$p=max(0,$p1+1-2*$y/Math.PI-2/Math.PI*Math.sin($y)*Math.cos($y)*$a);}return $p;}function _subchisqrprob($n,$x){var $p;if($x<=0){$p=1;}else if($n>100){$p=_subuprob((Math.pow(($x / $n),1/3)-(1-2/9/$n))/Math.sqrt(2/9/$n));}else if($x>400){$p=0;}else{var $a,$i,$i1;if(($n%2)!=0){$p=2*_subuprob(Math.sqrt($x));$a=Math.sqrt(2/Math.PI)*Math.exp(-$x/2)/Math.sqrt($x);$i1=1;}else{$p=$a=Math.exp(-$x/2);$i1=2;}for($i=$i1;$i<=($n-2);$i+= 2){$a*=$x/$i;$p+=$a;}}return $p;}function _subu($p){var $y=-Math.log(4*$p*(1-$p)),$x=Math.sqrt($y*(1.570796288+$y*(.03706987906+$y*(-.8364353589E-3+$y*(-.2250947176E-3+$y*(.6841218299E-5+$y*(0.5824238515E-5+$y*(-.104527497E-5+$y*(.8360937017E-7+$y*(-.3231081277E-8+$y*(.3657763036E-10+$y*.6936233982E-12)))))))))));if($p>.5)$x = -$x;return $x;}function _subuprob($x){var $p = 0,$absx = Math.abs($x);if($absx<1.9){$p=Math.pow((1+$absx*(.049867347+$absx*(.0211410061+$absx*(.0032776263+$absx*(.0000380036+$absx*(.0000488906+$absx*.000005383)))))),-16)/2;}else if($absx<=100){for(var $i=18;$i>=1;$i--){$p=$i/($absx+$p);}$p=Math.exp(-.5*$absx*$absx)/Math.sqrt(2*Math.PI)/($absx+$p);}if($x<0)$p=1-$p;return $p;}function _subt($n,$p){if($p>=1||$p<=0){throw("Invalid p: $p\n");}if($p==0.5){return 0;}else if($p<0.5){return -_subt($n,1-$p);}var $u=_subu($p),$u2=Math.pow($u,2),$a=($u2+1)/4,$b=((5*$u2+16)*$u2+3)/96,$c=(((3*$u2+19)*$u2+17)*$u2-15)/384,$d=((((79*$u2+776)*$u2+1482)*$u2-1920)*$u2-945)/92160,$e=(((((27*$u2+339)*$u2+930)*$u2-1782)*$u2-765)*$u2+17955)/368640,$x=$u*(1 +($a+($b+($c+($d+$e/$n)/$n)/$n)/$n)/$n);if($n<=Math.pow(log10($p),2)+3){var $round;do{var $p1=_subtprob($n,$x),$n1=$n+1,$delta=($p1-$p)/Math.exp(($n1*Math.log($n1/($n+$x*$x))+Math.log($n/$n1/2/Math.PI)-1+(1/$n1-1/$n)/6)/2);$x+=$delta;$round=round_to_precision($delta,Math.abs(integer(log10(Math.abs($x))-4)));}while(($x)&&($round!=0));}return $x;}function _subtprob($n,$x){var $a,$b,$w=Math.atan2($x/Math.sqrt($n),1),$z=Math.pow(Math.cos($w),2),$y=1;for(var $i=$n-2;$i>=2;$i-=2){$y=1+($i-1)/$i*$z*$y;}if($n%2==0){$a=Math.sin($w)/2;$b=.5;}else{$a=($n==1)?0:Math.sin($w)*Math.cos($w)/Math.PI;$b=.5+$w/Math.PI;}return max(0,1-$b-$a*$y);}function _subf ($n,$m,$p){var $x;if($p>=1||$p<=0){throw("Invalid p: $p\n");}if ($p==1){$x=0;}else if($m==1){$x=1/Math.pow(_subt($n,0.5-$p/2),2);}else if($n==1){$x=Math.pow(_subt($m, $p/2),2);}else if($m==2){var $u=_subchisqr($m,1-$p),$a=$m-2;$x=1/($u/$m*(1+(($u-$a)/2+(((4*$u-11*$a)*$u+$a*(7*$m-10))/24+(((2*$u-10*$a)*$u+$a*(17*$m-26))*$u-$a*$a*(9*$m-6))/48/$n)/$n)/$n));}else if($n>$m){$x=1/_subf2($m,$n,1-$p)}else{$x=_subf2($n,$m,$p)}return $x;}function _subf2($n,$m,$p){var $u=_subchisqr($n,$p),$n2=$n-2,$x=$u/$n*(1+(($u-$n2)/2+(((4*$u-11*$n2)*$u+$n2*(7*$n-10))/24+(((2*$u-10*$n2)*$u+$n2*(17*$n-26))*$u-$n2*$n2*(9*$n-6))/48/$m)/$m)/$m),$delta;do{var $z=Math.exp((($n+$m)*Math.log(($n+$m)/($n*$x+$m))+($n-2)*Math.log($x)+ Math.log($n*$m/($n+$m))-Math.log(4*Math.PI)-(1/$n+1/$m-1/($n+$m))/6)/2);$delta=(_subfprob($n,$m,$x)-$p)/$z;$x+=$delta;}while(Math.abs($delta)>3e-4);return $x;}function _subchisqr($n,$p){var $x;if(($p>1)||($p<=0)){throw("Invalid p: $p\n");}else if($p==1){$x=0;}else if($n==1){$x=Math.pow(_subu($p/2),2);}else if($n==2){$x=-2*Math.log($p);}else{var $u=_subu($p),$u2=$u*$u;$x=max(0,$n+Math.sqrt(2*$n)*$u+2/3*($u2-1)+$u*($u2-7)/9/Math.sqrt(2*$n)-2/405/$n*($u2*(3*$u2+7)-16));if($n<=100){var $x0,$p1,$z;do{$x0=$x;if($x<0){$p1=1;}else if($n>100){$p1=_subuprob((Math.pow(($x/$n),(1/3))-(1-2/9/$n))/Math.sqrt(2/9/$n));}else if($x>400){$p1=0;}else{var $i0,$a;if(($n%2)!=0){$p1=2*_subuprob(Math.sqrt($x));$a=Math.sqrt(2/Math.PI)*Math.exp(-$x/2)/Math.sqrt($x);$i0=1;}else{$p1=$a=Math.exp(-$x/2);$i0=2;}for(var $i=$i0;$i<=$n-2;$i+=2){$a*=$x/$i;$p1+=$a;}}$z=Math.exp((($n-1)*Math.log($x/$n)-Math.log(4*Math.PI*$x)+$n-$x-1/$n/6)/2);$x+=($p1-$p)/$z;$x=round_to_precision($x,5);}while(($n<31)&&(Math.abs($x0-$x)>1e-4));}}return $x;}function log10($n){return Math.log($n)/Math.log(10);}function max(){var $max=arguments[0];for(var $i=0;$i<arguments.length;$i++){if($max<arguments[$i])$max=arguments[$i];}return $max;}function min(){var $min=arguments[0];for(var $i=0;$i<arguments.length;$i++){if($min>arguments[$i])$min=arguments[$i];}return $min;}function precision($x){return Math.abs(integer(log10(Math.abs($x))-SIGNIFICANT));}function precision_string($x){if($x){return round_to_precision($x,precision($x));}else{return "0";}}function round_to_precision($x,$p){$x=$x*Math.pow(10,$p);$x=Math.round($x);return $x/Math.pow(10,$p);}function integer($i){if($i>0){return Math.floor($i);}else{return Math.ceil($i);}}
/*statistics-distributions-js_Ymdf.js (Ben Tilly,2008; modified by Yuji SODE, 2016)*/
/*bootstrapEst-2.1/bootstrapMdl.js (Yuji SODE,2016)
* This software is released under the MIT License. See http://opensource.org/licenses/mit-license.php
* the simple interface for estimation of a value of statistic, with bootstrap Method (Efron,1979).
* reference: Efron, B. 1979. Bootstrap Methods: Another Look at the Jackknife. Ann. Statist. vol. 7, no. 1, p. 1-26.
*/
function bootstrap(A,n){var r=[],rdInt=0;for(var i=0;i<n;i+=1){rdInt=Math.floor(A.length*Math.random());r.push(A[rdInt]);}return r;}
/*bootstrapEst-2.1/bootstrapMdl.js (Yuji SODE,2016)*/