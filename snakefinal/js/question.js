
function Question(){
    
    this.op = ["+","-","*"];
   
    this.question = null;
  
    this.answer = null;

    this.leval = 1;
};
Question.prototype.generate = function(){
   
    var op = this.op[parseInt(Math.random()*this.op.length)];
   
    if(op=='+'){
        this.add();
    }else if(op=="-"){
        this.sub();
    }else if(op=='*'){
        this.mul();
    }
  
    document.getElementById("question").innerHTML = this.question;
};

Question.prototype.add = function(){
 
    var one = parseInt(Math.random()*this.leval*20);
    var two = parseInt(Math.random()*this.leval*20);
    this.question = one+" + "+two +" = ? ";
    this.answer = one + two;
};

Question.prototype.sub = function(){

    var one = parseInt(Math.random()*this.leval*20);
    var two = parseInt(Math.random()*this.leval*20);

  
    this.question = one+" - "+two +" = ? ";
    this.answer = one - two;
};

Question.prototype.mul = function(){

    var one = parseInt(Math.random()*(this.leval+4));
    var two = parseInt(Math.random()*(this.leval+4));
    this.question = one+" x "+two +" = ? ";
    this.answer = one * two;
};


Question.prototype.getQuestion = function(){
 
    var list = [
        {"q":"1,2,3,4,(),6","a":"5"},
        {"q":"2,4,6,(),10","a":"8"},
        {"q":"1,4,7,10,(),16","a":"13"},
        {"q":"1,6,11,16,(),26","a":"21"},
        {"q":"2,4,8,(),32,64","a":"16"},
        {"q":"1,4,9,(),25","a":"16"},
        {"q":"15,17,19,(),23","a":"21"},
        {"q":"8,12,16,(),24","a":"20"},
        {"q":"12,11,(),9,8,7","a":"10"},
        {"q":"16,12,8,(),0","a":"4"},
        {"q":"25,(),15,10,5","a":"20"},
        {"q":"16,13,(),7,4","a":"10"},
        {"q":"13,10,(),4,1","a":"7"},
        {"q":"5,7,5,9,5,11,5,()","a":"13"},
        {"q":"3,6,9,12,15,()","a":"18"},
        {"q":"5,10,15,25,()","a":"30"},
        {"q":"1,2,4,7,()","a":"11"},
        {"q":"2,5,8,11,()","a":"14"},
        {"q":"80,40,20,()","a":"10"},
        {"q":"3,4,5,6,7,()","a":"8"},
        {"q":"7,9,13,19,27,()","a":"37"},
        {"q":"1234,2345,3456,()","a":"4567"},
        {"q":"1/2,3/4,3/4,()","a":"4/5"},
        {"q":"0,7,14,21,28,()","a":"35"},
        {"q":"1,3,3,5,5,7,()","a":"7"},
        {"q":"125,64,27,8,()","a":"1"},
        {"q":"15+16*2=()","a":"47"},
        {"q":"35+3*2=()","a":"41"},
    ];
    return list;
}

