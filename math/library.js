/*GLOBAL VARIABLES*/

/*ANSWERS INDEX*/
const OPTIONS = ["A","B","C","D"];
let arrayIndex = OPTIONS.length;

/*
EQUIVALENCE (VARIABLES IN indexTypeOfAsk):
    RANGE 0 = NONE 
    RANGE 1 = NONE
    AMOUNT V = NONE
    AMOUNT Q = NONE
    MEASURE = USER SELECTION (MEAN-MEDIAN-MODE)
    SHUFFLE = TURN ON/OFF SHUFFLE
        (ANSWERS GENERATE RANDOMLY)
    TYPE Q = USER SELECTION (MULTISELECT TURN ON/OFF)
    TYPE SELECT = USER SELECTION (CONTEXT SELECT TURN ON/OFF)

THIS VARIABLES ARE USED IN getUserSelection
CONTROL VARIABLES
*/
let range0=10, range1=36, amountV=50, amountQ=10, measure=1, shuffle=false, typeQ=true, typeSelect=true;

/*GLOBAL OBJECTS AND ARRAYS */

/*INDEX TYPE OF ASK : CONTAINS QUESTION CONTEXT*/
let indexTypeOfAsk = {
    MEAN : 1,
    MEDIAN : 2,
    MODE : 3,
    SHUFFLE : true,
    MULTISELECT : true,
    CONTEXTSELECT : true,
}

/*IN THIS ARRAY, YOU PUT ASKS TO CREATE PROBLEMS*/
let answerStatement = [
    `De acuerdo a lo anterior, es correcto afirmar que el promedio es: `,
    `De acuerdo a lo anterior, es correcto afirmar que la mediana es: `,
    `De acuerdo a lo anterior, es correcto afirmar que la moda es: `
];

/*IN THIS ARRAY, YOU PUT WHAT THE USER MUST CALCULATE*/
let taskStatements = [
    `Calcular: Media aritmética, la mediana y la moda`,
];

/*FUNCTION RECIEVES DATA FROM FORM IN HTML*/
function getUserSelection(){
    range0 = document.getElementById("rangemin");
    range1 = document.getElementById("rangemax");
    amountV = document.getElementById("amountValues");
    amountQ = document.getElementById("amountQuestions");
    measure = document.getElementById("measureSelect");
    shuffle = document.getElementById("isShuffle");
    typeQ = document.getElementById("needMultiselect");
    typeSelect = document.getElementById("needContext");

    range0 = range0.value;
    range1 = range1.value;
    amountV = amountV.value;
    amountQ = amountQ.value;
    measure = measure.value;
    shuffle = shuffle.value;
    typeQ = typeQ.value;
    typeSelect = typeQ.value;

}

function validateInputs(){
    /*VALIDATE IF USER SELECTED SHUFFLE */
    if(shuffle != true){
        indexTypeOfAsk.SHUFFLE = false;
    }else{
        indexTypeOfAsk.SHUFFLE = true;
    }
    /*VALIDATE IF USER SELECTED CONTEXT*/
    if(typeSelect != true){
        indexTypeOfAsk.CONTEXTSELECT = false;
    }else{
        indexTypeOfAsk.CONTEXTSELECT = true;
    }
    /*VALIDATE IF USER SELECTED MULTISELECT */
    if(typeQ != true){
        indexTypeOfAsk.MULTISELECT = false;
    }else{
        indexTypeOfAsk.MULTISELECT = true;
    }
}

function selectStatements(n, min, max, elements, index){
    /*
    IN THIS ARRAY YOU PUT STATEMENTS TO CREATE CONTEXTS TO THE PROBLEM
    AMOUNT OF ELEMENTS: console.log(statements.length);
    */
    let statements = [
        `${index}. En un grupo de ${n} estudiantes, se obtuvieron las siguientes calificaciones: ${elements}. Siendo ${min} la calificación más baja y ${max} la calificación más alta.`,
        `${index}. ${n} personas fueron encuestadas para saber la edad de las mismas. La encuesta arrojó los siguientes resultados: ${elements}.`,
        `${index}. En un hotel se quería conocer la cantidad de clientes que recibían diariamente durante ${n} días. Al final de los ${n} días se obtuvieron los siguientes resultados: ${elements}.`,
        `${index}. Eres un vendedor de playeras y deseas conocer cuántas playeras llevan tus clientes si su compra está entre ${min} unidades y ${max} unidades. Haces el registro a ${n} clientes y consigues estos resultados: ${elements}.`,
        `${index}. En la Av 17A se quería conocer la velocidad con la que transitaban los vehículos por la carretera. Para eso se instaló un sensor que capturaba las velocidades de los vehículos. Se realizó el experimento con ${n} vehículos. Se obtuvieron los siguientes datos: ${elements}.`,
        `${index}. La alcaldía de la ciudad ha decidido realizar un estudio de la temperatura en la ciudad. Para ello, ha medido la temperatura durante ${n} días. Obtuvieron los siguientes resultados: ${elements}.`,
        `${index}. Una tienda de venta de frutas quiere conocer cuántas libras de frutas venden en ${n} semanas. Durante cada semana llevan registro de las ventas realizadas y al final de la semana número ${n}, deciden revisar los resultados. Obtuvieron las siguientes ventas por semana: ${elements}.`,
        `${index}. Para determinar cuántos dólares gastaba una persona en promedio al mes se realizó una encuesta a ${n} personas. Estos fueron los resultados obtenidos: ${elements}.`,
        `${index}. Trabajas para el equipo de marketing de una empresa de software y debes realizar una investigación para determinar si será un exito la nueva aplicación de música en la que se encuentran trabajando. Para ello, decides encuestar a ${n} personas en tu ciudad preguntándoles cuántas canciones escuchan normalmente en un día. Tras realizar la encuesta, obtienes los siguientes resultados: ${elements}.`,
        `${index}. EMBUS-CN es una empresa que se dedica a analizar el tráfico en las principales vías del país. Este mes, analizaron el tráfico en la transversal 16N en la ciudad donde resides. Durante ${n} días, monitorearon la cantidad de vehículos que pasaban por la transversal entre las 06:00 y las 18:00 hrs. Determinaron que el tráfico es moderado y publicaron los siguientes resultados por día en su página web: ${elements}.`

    ];

    let selectStatement = Math.floor(Math.random()*statements.length);

    return statements[selectStatement];
}

function calcMultiselectAnswers(n, min, max, sum, array, measure, context){
    let selection = [];
    let ansToMean = [
        [sum/n, sum/(min+max+1), sum/(n+1), sum/(min*max+1)],
        [sum/n, sum/(2*max+1), sum/(n-1), sum/(max-min+1)],
        [sum/n, sum/(max+1), sum/(2*n), sum/min+1,],
        [sum/n, sum/(min+max+n), sum/(n+1), sum/max+1,],
    ]; 
    let ansToMeanTxt = [
        [`Es menor a ${min*2} y mayor que ${max/4}.`,`Es mayor que ${max-min} y  ${n-1}.`,`Es exactamente ${sum/n}.`, `Es exactamente ${sum/(min+max)}.`],
        [`Es menor a ${min*3}.`,`Es mayor que ${max+1}.`,`Es exactamente ${sum/n}.`, `Es exactamente ${sum/(n+1)}.`],
        [`Es menor a ${max}.`,`Es mayor que ${min}.`,`Es exactamente ${sum/n}.`, `TODAS LAS DEMÁS SON CORRECTAS.`],
        [`Si le sumamos ${min} unidades nos da ${(sum/n)+max}.`,`Si le restamos el dato más grande en la lista nos queda ${sum/(n+min)}.`,`Su doble es ${sum}.`, `Si le restamos el doble de la cantidad de datos nos queda ${(sum/n)-(2*n)+(2*sum)}`]
    ];
    let ansToMed = [
        [],[],[],[]
    ]; 
    let ansToMedTxt = [
        [],[],[],[]
    ];
    let ansToMode = [
        [],[],[],[]
    ]; 
    let ansToModeTxt = [
        [],[],[],[]
    ];
    console.log(ansToMean);
    console.log(ansToMeanTxt);
    for(let i = 0; i < 4; i++){
        shuffleValues(ansToMean);
        shuffleValues(ansToMean[i]);
        shuffleValues(ansToMeanTxt);
        shuffleValues(ansToMeanTxt[i]);
    }

    if(measure == indexTypeOfAsk.MEAN){
        if(context == true){
            for(let i= 0; i < 4; i++){
                // selection = [];
                // selection.push(OPTIONS[i]);
                // selection.push(ansToMeanTxt[0][i]);
                array.push(`${OPTIONS[i]}: ${ansToMeanTxt[0][i]}`);
            }
            
        }else{
            array.push(ansToMean[0]);
        }
    }
}
function shuffleValues(array){
    let currentIndex = array.length;
    let randomIndex = 0;
    let tempValue = 0;

    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;

    }
}
function calcRandom(min, max){
    let n = Math.floor( Math.random()*(max+1) ); 
        /*VALIDATE IF "N" IS LESS THAN RANGE-MIN TO DISCARD IT*/
        if(n >= min){
            return n;
        }else{
            console.log("NO");
        }
}

