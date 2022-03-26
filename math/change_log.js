/*
MEASURES OF CENTRAL TENDECY V0.32


=> PREVIOUS CHANGES AREN'T DOCUMENTED

CHANGE_LOG 0.3:
    *REMOVE VARIABLES IN (LIBRARY.JS:9-13):
        let z = 0;
        let nValues, min, max, avrg, median, trend = 0;
        getValues();
        console.log(trend)
        let indexMed = Math.floor(nValues/2);
    *CLASS ANSWER (UNAVAILABLE):
        class answer {
            constructor(type, arrayAvg, arrayMed, ArrayTrd){
                this.TYPE = type;
                this.AVERAGE = arrayAvg;
                this.MEDIAN = arrayMed;
                this.TREND = ArrayTrd;
                this.ANSWER = [];
                this.INDEX = 4;
            }
            fillArray = function(type){
                if(indexTypeOfAsk.MULTISELECT == true){
                    if(type == 1){
                        this.ANSWER.push(answerStatement[0]);
                        for(let i = 0; i < this.INDEX;i++){
                            // this.ANSWER.push(answersToAverage[0][i]);
                            this.ANSWER.push(i);
                        }
                    }
                    if(type == 2){
                        this.ANSWER.push(answerStatement[1]);
                            
                        for(let i = 0; i < this.INDEX;i++){
                            this.ANSWER.push(i);
                        }
                    }
                    if(type == 3){
                        this.ANSWER.push(answerStatement[2]);
                            
                        if(indexTypeOfAsk.TRENDTYPE == true){
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
            }
            showAnswer = function(){
                console.log(this.ANSWER);
                console.log(`Respuestas: ${z}`);
                for(let i = 1; i < this.ANSWER.length; i++){
                    console.log(`${OPTIONS[i-1]}: ${this.ANSWER[i]}`);
                }
            }
        }
    *ADD FUNCTION createQuestion IN CLASS EXERCISE
    *ADD FUNCTION getUserSelection TO USE IN INDEX.HTML
    *CODE DOCUMENTED
    *CREATE ARRAYS IN CONSTRUCTOR:EXERCISE
    *CREATE NEW GLOBAL VARIABLES IN (LIBRARY.JS:29)

CHANGE_LOG 0.32:
        *REMOVE SOME FUNCTIONS:
            function getValues(minR, maxR, n, avg, med){
                nValues = n;
                min = minR;
                max = maxR;
                avrg = avg;
                median = med; 
            }
            function getSum(elements){
                for(let i = 0; i < elements.length; i++){
                    z += elements[i];
                }
            }
            function getTrend(elements){
                trend = elements;
            }
        *CREATE FUNCTION validateInputs TO VALIDATE DATA FROM HTML
        *CREATE METHOD createProblem IN CLASS EXERCISE TO CREATE DIFERENTS PROBLEMS
        *REMOVE METHOD showValues 
*/