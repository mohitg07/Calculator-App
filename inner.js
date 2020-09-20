// these are 9 variables
let count = 0, compute = 0, signCount=0, dotCount=0;
let pre_operation = "none";

let val1, val2, ans, sign;

function myFunction() {
    // if we click on any number just after 1 computation then it will clear all the previous data and start our new calculation
    if(pre_operation == "equalTo"){
        allClear();
    }

    // in the very beginning, if we click on any number then I want that initially displayed 0 value get vanished so this check is applied here
    if (count == 0) {
        document.getElementById("line2").innerHTML = "";
    }
    count++;
};

function checkComputationNumber(value) {
    //if we are doing our first computation then we have to add characters in the line2 of white space
    if (compute == 0) {
        document.getElementById("line2").innerHTML += value;
    }
    //if this is our not first computation then we have to add characters in the line1 of white space
    else {
        document.getElementById("line1").innerHTML += value;
    }

    //set value of pre_operation here
    pre_operation = "addDigit";
}

function checkValueOfSignCount(){
    if(compute == 0){
        let str = document.getElementById("line2").textContent;

        // in order to get last character of string
        let char = str.charAt(str.length-1);
    
        // to over-write operator one over the other
        if(char=="+" || char=="-" || char=="*" || char=="/" || char=="%"){
            signCount--;
            deleteLastCharacter();
        }
    }
    else{
        let str = document.getElementById("line1").textContent;
        let char = str.charAt(str.length-1);
        
        if(char=="+" || char=="-" || char=="*" || char=="/" || char=="%"){
            signCount--;
            deleteLastCharacter();
        }
    }

    signCount++;
    
    // if in single string, 2nd operator is coming then firstly we will solve value corresponding to first operator. After that, 2nd sign is taken into consideration 
    if(signCount > 1){
        findAnswer();
    }
}

function appendSignToString(operator) {
    if (compute == 0) {
        document.getElementById("line2").innerHTML += operator;
    }
    else {
        document.getElementById("line1").innerHTML = ans + operator;
    }

    //set value of dotCount to 0 so that we can use dot in our 2nd operator too(if required)
    dotCount = 0;

    //set value of pre-operation here
    pre_operation = "addSign";
}


// for every click on number, I am calling 2 functions here
document.getElementById("num1").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(1);
});
document.getElementById("num2").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(2);
});
document.getElementById("num3").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(3);
});
document.getElementById("num4").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(4);
});
document.getElementById("num5").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(5);
});
document.getElementById("num6").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(6);
});
document.getElementById("num7").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(7);
});
document.getElementById("num8").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(8);
});
document.getElementById("num9").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(9);
    
});
document.getElementById("num0").addEventListener("click", function () {
    myFunction();

    checkComputationNumber(0);
});

// for this, I am calling only 1 function
document.getElementById("dot").addEventListener("click", function () {
    if(pre_operation == "equalTo"){
        allClear();
    }

    count++;

    // if user try to use 2 dots in single operand then I will not allow him to do so
    if(dotCount >= 1){
        return;
    }

    checkComputationNumber(".");
    dotCount++;
});

document.getElementById("delete").addEventListener("click", deleteLastCharacter) 

function deleteLastCharacter(){
    let str;

    if (compute == 0) {
        str = document.getElementById("line2").textContent;

        // in order to get full string except the last character
        str = str.substring(0, str.length - 1);

        // if string becomes empty then call allClear() function otherwise simply display this new string 
        if (str == "") {
            allClear();
        }
        else {
            document.getElementById("line2").innerHTML = str;
        }
    }
    else {
        str = document.getElementById("line1").textContent;

        // in order to get full string except the last character
        str = str.substring(0, str.length - 1);

        // if string becomes empty then call allClear() function otherwise simply display this new string      
        if (str == "") {
            allClear();
        }
        else {
            document.getElementById("line1").innerHTML = str;
        }

    }
};

document.getElementById("all_clear").addEventListener("click", allClear);

// implement all the default settings
function allClear() {
    document.getElementById("line1").innerHTML = "";
    document.getElementById("line2").innerHTML = "0";
    count = 0;
    compute = 0;
    signCount = 0;
    dotCount = 0;
};

// for every click on operator, I am calling 2 functions here and assign that operator to sign variable
document.getElementById("percentage").addEventListener("click", function () {
    checkValueOfSignCount();
    sign = "%";
    appendSignToString(sign);
});

document.getElementById("division").addEventListener("click", function () {
    checkValueOfSignCount();
    sign = "/";
    appendSignToString(sign);
});

document.getElementById("multiply").addEventListener("click", function () {
    checkValueOfSignCount();
    sign = "*";
    appendSignToString(sign);
});

document.getElementById("subtract").addEventListener("click", function () {
    checkValueOfSignCount();
    sign = "-";
    appendSignToString(sign);
});

document.getElementById("add").addEventListener("click", function () {
    checkValueOfSignCount();
    sign = "+";
    appendSignToString(sign);
});

document.getElementById("equal_to").addEventListener("click", function(){
    findAnswer();

    //assign value to pre_operation variable
    pre_operation = "equalTo";
});

function findAnswer() {
    let str;
    if (compute == 0) {
        // with this, whatever text is written in line2 id gets stored in str variable
        str = document.getElementById("line2").textContent;
    }
    else {
        str = document.getElementById("line1").textContent;
    }

    // store that portion of string which is written before operator
    val1 = str.substring(0, str.indexOf(sign));

    // store that portion of string which is written after operator
    val2 = str.substring(str.indexOf(sign) + 1);

    // with this, string gets converted to int or float data type on which we can apply our operations
    val1 = Number(val1);
    val2 = Number(val2);

    if (sign == "+") {
        ans = val1 + val2;
    }
    else if (sign == "-") {
        ans = val1 - val2;
    }
    else if (sign == "*") {
        ans = val1 * val2;
    }
    else if (sign == "/") {
        ans = val1 / val2;
    }
    else {
        ans = val1 / 100;
    }

    document.getElementById("line1").innerHTML = str;

    //Now, whatever answer is coming will be displayed on line2 of white space
    document.getElementById("line2").innerHTML = "= " + ans;

    compute++; // increment compute value
    signCount = 1; // set value of signCount to 1
    dotCount = 0; // set value of dotCount to 0
};

