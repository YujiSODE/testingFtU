# testingFtU
Statistical test(F-test, t-test, and U-test) with two numerical arrays.  
https://github.com/YujiSODE/testingFtU

>Copyright (c) 2016 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the Artistic License  
>See LICENSE or http://dev.perl.org/licenses/ and http://dev.perl.org/licenses/artistic.html
______

##Script
###[2 sample test: v1.0+]
* testingFtU.html
* statDist.js
* subStatDist.js

###[Test with bootstrap method: v2.0+]
* testingFtU2.html
* statDist2.js
* subStatDist2.js

###[1-sample t-test: v3.0+]
* testingFtU3.html
* statDist3.js
* subStatDist3.js

##How to use
###[2 sample test]
* **"Sample A" and "Sample B":** sample inputs (available data is csv formatted numerical array).
* **"Run" button;** it runs three statistical tests(F-test, t-test, and U-test) with two given sample(Sample A and Sample B),  
  and outputs the test results as the upper probabilities.
* **"Clear" button;** it clears the test results by "Run" button.
* **"Output as email" button;** it saves the test results by "Run" button as email to given address.

###[Test with bootstrap method]
* **"Sample":** sample input (available data is csv formatted numerical array).
* **"Resampling from":** sample input to be resampled in bootstrap method (available data is csv formatted numerical array).
* **"Time of simulation";** it sets how many times the sample and resampled data are tested.
* **"Significance level";** it sets a statistical significance level (0-1) in order to test if the null hypothesis (no difference) is rejected.
* **"Run" button;** it runs three statistical tests(F-test, t-test, and U-test) with the given sample and resampled data,  
  and outputs the test results: three rates of the null hypothesis rejection, and details expressed with the upper probabilities.
* **"Clear" button;** it clears the test results by "Run" button.
* **"Output as email" button;** it saves the test results by "Run" button as email to given address.

###[1-sample t-test]
* **"Resampling from"** sample input to be resampled in bootstrap method (available data is csv formatted numerical array).
* **"Given mean"** it is used as predetermined value of mean in the 1-sample t-test.
* **"Resampling size"** sample size to be resampled in bootstrap method.
* 

##Library list
* statDist.js (Yuji SODE,2016): the Artistic License or the GPL v1 or later; https://github.com/YujiSODE/statDist

>* statistics-distributions-js_Ymdf.js (Ben Tilly,2008; modified by Yuji SODE, 2016):  
>  the Artistic License or the GPL v1 or later; https://github.com/YujiSODE/statistics-distributions-js_Ymdf
>* calcStat_FtU.js (Yuji SODE, 2016): the MIT License; https://github.com/YujiSODE/calcStat_FtU

* bootstrapEst-2.1/bootstrapMdl.js (Yuji SODE,2016): the MIT License; https://github.com/YujiSODE/bootstrapEst
