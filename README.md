# testingFtU
Statistical test(F-test, t-test, and U-test) with two numerical arrays.  
https://github.com/YujiSODE/testingFtU

>Copyright (c) 2016 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the Artistic License  
>See LICENSE or http://dev.perl.org/licenses/ and http://dev.perl.org/licenses/artistic.html
______

##Script
###[2 sample test]
* testingFtU.html
* statDist.js
* subStatDist.js

###[Test with bootstrap method]
* testingFtU2.html
* statDist2.js
* subStatDist2.js

##How to use
###[2 sample test]
* The "Sample A" and "Sample B": sample inputs (available data is csv formatted numerical array).
* "Run" button; it runs three statistical tests(F-test, t-test, and U-test) with two given sample(Sample A and Sample B),  
  and outputs the test result.
* "Clear" button; it clears the test results by "Run" button.
* "Output as email" button; it saves the test results by "Run" button as email to given address.

###[Test with bootstrap method]
* "Sample": sample input (available data is csv formatted numerical array).
* "Resampling from": sample input to be resampled in bootstrap method (available data is csv formatted numerical array).
* "Time of simulation"; it sets how many times the sample and resampled data are tested.
* 

##Library list
* statDist.js (Yuji SODE,2016): the Artistic License or the GPL v1 or later; https://github.com/YujiSODE/statDist

>* statistics-distributions-js_Ymdf.js (Ben Tilly,2008; modified by Yuji SODE, 2016):  
>  the Artistic License or the GPL v1 or later; https://github.com/YujiSODE/statistics-distributions-js_Ymdf
>* calcStat_FtU.js (Yuji SODE, 2016): the MIT License; https://github.com/YujiSODE/calcStat_FtU

* bootstrapEst-2.1/bootstrapMdl.js (Yuji SODE,2016): the MIT License; https://github.com/YujiSODE/bootstrapEst
