/*CLASS EXERCISE CONTAINS ALL VALUES AND OPERATIONS*/ 
class Exercise {

    constructor(min, max, nvalue, nask, measure, shuffle, questype, typeselect){
        /*INPUT SETS THIS VALUES*/
        this.rangeMin = min;
        this.rangeMax = max;
        this.amountOfValues = nvalue;
        this.amountOfQuestions = nask;
        this.measure = measure;
        this.shuffle = shuffle;
        this.typeOfQuestion = questype;
        this.context = typeselect;

        /*OPERATOR VARIABLES */
        this.arrayLength = 4;
        this.indexQuestion = 1;
        this.initialValues = [];
        this.values = [];
        this.sum = 0;
        this.mean = 0;
        this.median = 0;
        this.arrayOfMode = [];
        this.mode = [];
        this.defMode = "";
        this.indexOfMode = 1;

        /*STATEMENTS AND PROBLEMS - ARRAY */
        this.form = [];
        this.problem = [];
        this.meanAnswers = [];
        this.medianAnswers = [];
        this.modeAnswers = [];
    };  


    /*
    RANDOM GENERATOR SETS A "N" VARIABLE TO PUSH IN ARRAY
    VALUES FOR "N" ARE GENERATED RANDOMLY
    */
    getValues = function(){
        while(this.values.length < this.amountOfValues){
            let n = Math.floor( Math.random()*(this.rangeMax+1) );
            /*VALIDATE IF "N" IS LESS THAN RANGE-MIN TO DISCARD IT*/
            if(n >= this.rangeMin){
                this.values.push(n);
            }else{
                console.log("NO");
            }
        }
        this.initialValues = this.values;
        console.log(`Iniciales : ${this.initialValues}`);
        this.values.sort();
    };
    /*
    SHUFFLE VALUES IN ARRAY "INITIAL VALUES" AFTER SORT METHOD IS LAUNCHED
    IT DEPENDS IF USER WANTS THE VALUES IN SHUFFLE MODE (NOT READY)
    */
    shuffleData = function(){
        let currentIndex = this.amountOfValues;
        let randomIndex = 0;
        let tempValue = 0;

        while (0 !== currentIndex){
            randomIndex = Math.floor(Math.random()*currentIndex);
            currentIndex -= 1;

            tempValue = this.initialValues[currentIndex];
            this.initialValues[currentIndex] = this.initialValues[randomIndex];
            this.initialValues[randomIndex] = tempValue;

        }
    }
    /*CONSOLE ONLY: SHOWS VALUES IN ARRAY VALUES[]*/


    /*MEAN CALCULATOR*/
    calcMean = function() {
        for(let i = 0; i < this.values.length; i++){
            this.mean += this.values[i];
        }
        this.sum = this.mean;
        this.mean /= this.amountOfValues;
    };

    calcMedian = function(){
        /*AMOUNT OF VALUES IS PAIR */
        let iMedianPosition = 0;
        let fMedianPosition = 0;
        let medianPosition = 0;
        if(this.amountOfValues % 2 == 0){
            fMedianPosition = this.amountOfValues/2;
            console.log(` init position : ${fMedianPosition}`);
            iMedianPosition = fMedianPosition-1;
            console.log(` final position : ${fMedianPosition}`);
            this.median = (this.values[iMedianPosition] + this.values[fMedianPosition])/2;
        }
        /*AMOUNT OF VALUES IS ODD */
        if(this.amountOfValues % 2 != 0){
            medianPosition = Math.floor(this.amountOfValues/2);
            this.median = this.values[medianPosition];
            console.log(` final position : ${fMedianPosition}`);
        }
    };

    calcMode = function(){
        let arrayMode = {};
        this.values.map(
            function(e){
                if(arrayMode[e]){
                    arrayMode[e] += 1;
                }else{
                    arrayMode[e] = 1;
                }
            }
        );
        console.log(arrayMode);
        this.arrayOfMode = Object.entries(arrayMode).sort(
            function(a,b){
                return b[1]-a[1];
            }
        );
        console.log(this.arrayOfMode);
        this.mode[0] = this.arrayOfMode[0][0];
        console.log(this.mode);
    };
    calcMultiMode = function(){
        for(let i = 1; i <= this.arrayOfMode.length ; i++){
            if(this.arrayOfMode[this.indexOfMode][1] == this.arrayOfMode[0][1]){
                this.mode[this.indexOfMode] = this.arrayOfMode[this.indexOfMode][0];
                this.indexOfMode += 1;
            }
        }
        if(this.mode.length > 2){
            this.defMode = "Multimodal.";
            console.log("más de dos");
        }else if(this.mode.length == 2){
            this.defMode = "Bimodal.";
            console.log("dos");
        }else if(this.mode.length == 1){
            this.defMode = "Unimodal.";
            console.log("una");
        }
    };


    createProblem = function(){
        this.problem = [];
        this.getValues();
        this.shuffleData();
        this.problem.push(this.initialValues);
        this.calcMean();
        this.problem.push(this.mean);
        this.calcMedian()
        this.problem.push(this.median);
        this.calcMode();
        this.calcMultiMode();
        this.problem.push(this.mode);
        this.problem.push(this.defMode);
        this.form.push(this.problem);
    };
    createQuestion = function(){
        while(this.indexQuestion <= this.amountOfQuestions){
            let select = selectStatements(this.amountOfValues, this.rangeMin, this.rangeMax, this.initialValues, this.indexQuestion);
            this.meanAnswers = [];
            this.createProblem();

            this.problem.push(select);
            this.problem.push(taskStatements[0]);

            if(indexTypeOfAsk.MULTISELECT == true){
                if(this.measure == indexTypeOfAsk.MEAN){
                    this.problem.push(answerStatement[0]);
                    calcMultiselectAnswers(this.amountOfValues, this.rangeMin, this.rangeMax, this.sum, this.meanAnswers, this.measure,this.context); 
                    this.problem.push(this.meanAnswers);
                 }
                 if(this.measure == indexTypeOfAsk.MEDIAN){
                     this.ANSWER.push(answerStatement[1]);
                     
                     for(let i = 0; i < this.INDEX;i++){
                         this.ANSWER.push(i);
                     }
                 }
                 if(this.measure == indexTypeOfAsk.MODE){
                     this.ANSWER.push(answerStatement[2]);
                     
                     if(indexTypeOfAsk.ModeTYPE == true){
                         for(let i = 0; i < this.INDEX;i++){
                             this.ANSWER.push(i);
                         }
                     }else{
                         let newIndex = calcRandom(1, this.ANSWER.length);
                         for(let i = 0; i < this.INDEX;i++){
                             this.ANSWER.push(i);
                         }
                     }
                 }
             }
            this.indexQuestion++;
        }
        


    }

    /*CONSOLE ONLY: SHOWS OPERATION VALUES*/
    showResults = function(){
        console.log(`Promedio: ${this.mean}`);
        console.log(`Mediana: ${this.median}`);
        
        for(let i = 0; i < this.mode.length; i++){
            
            console.log(`Moda ${i}: ${this.mode[i]}`);
        }
        console.log(`La moda es: ${this.defMode}`);
        this.shuffleData();
        /*
        getValues(this.rangeMin, this.rangeMax, this.amountOfValues, this.mean, this.median, this.mode);
        getSum(this.values);
        getmode(this.mode);
        console.log(`Enunciado: `);
        showStatements(this.amountOfValues, this.rangeMin, this.rangeMax, this.initialValues, 1);*/
        
    };
};