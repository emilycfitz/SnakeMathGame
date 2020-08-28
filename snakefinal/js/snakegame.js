
function Game(container){
    
    this.status = 0;
   
    this.rownum = 12;
   
    this.rowgird = 25;
   
    this.container = document.querySelector("#"+container);
 
    this.snake = new Snake();
  
    this.dot = new Dot();
 
    this.question = new Question();
   
    this.timer = null;
  
    this.tip = document.getElementById("tips");
  
    this.leval = 1;

    this.allLeval = 10;
  
    this.speeds = [500,450,400,350,300,250,200,100,50,20];

    this.score = 0;
 
    this.levalscore = [0,1000,2000,3000,4000,5000,6000,7500,9000,11000,14000];
};


Game.prototype.init = function(){
  
    var that = this;
 
    var index = 0;
    for(var i = 0;i<this.rownum;i++){
      
        for(var j = 0;j<this.rowgird;j++){
           
            var div = document.createElement("div");
            
            div.classList.add('d');
           
            var subdiv = document.createElement("div");
            
            subdiv.setAttribute("id",index);
            
            subdiv.setAttribute("x",j);
          
            subdiv.setAttribute("y",i);
          
            subdiv.classList.add('b');
           
            div.appendChild(subdiv);
           
            this.container.appendChild(div);

         
            index = index + 1;
        }
    };


    document.addEventListener("keydown",function(ev){
        
        switch(ev.keyCode){
            case 38:
                
                if(that.snake.direction == "bottom"){
                    return;
                }
                that.snake.direction = "top";
                ev.preventDefault();
                break;
            case 40:
                if(that.snake.direction == "top"){
                    return;
                }
                that.snake.direction = "bottom";
                ev.preventDefault();
                break;
            case 37:
                if(that.snake.direction == "right"){
                    return;
                }
                that.snake.direction = "left";
                ev.preventDefault();
                break;
            case 39:
                if(that.snake.direction == "left"){
                    return;
                }
                that.snake.direction = "right";
                ev.preventDefault();
                break;
            
            case 32:
            case 13:
                that.changeStatus(1);
                ev.preventDefault();
                break;
            default:break;
        }
    });


 
    this.snake.init();
 
    this.question.generate();

    this.dot.generate(this.rowgird,this.rownum,this.snake.snakeData,this.question.answer);
};


Game.prototype.start = function(){
    
    var that = this;
    this.timer = window.setInterval(function(){
        
        that.loop.call(that);
    },
   
    this.speeds[that.leval]-1);
};


Game.prototype.startCountdown = function(){
    var that = this;
    var time = 3;
    that.tip.innerHTML = "Waitting for game start:"+time;
    var t = window.setInterval(function(){
        time = time - 1;
        that.tip.innerHTML = "Game is coming soon:"+time;
        if(time<=0){
            window.clearInterval(t);
            that.tip.innerHTML = "Game Start!";
            that.start();
        }
    },1000);
};


Game.prototype.loop = function(){

 
    if(this.snake.checkGameOver(this.rowgird,this.rownum)){
        this.gameOver("GAME OVER!");
        return;
    }

 
    var eat = this.snake.checkEat(this.dot.dots);
    
    if(eat){
        
        if(eat.a == this.question.answer){
           
            this.snake.snakeData.unshift({
                x:eat.x,
                y:eat.y,
                c:eat.c
            });
           
            this.question.generate();
           
            this.dot.generate(this.rowgird,this.rownum,this.snake.snakeData,this.question.answer);

            this.score += 100;

            this.tip.innerHTML = "Great, your answer is right!";
        }
       
        else{
          
            this.question.generate();
           
            this.dot.generate(this.rowgird,this.rownum,this.snake.snakeData,this.question.answer);
          
            this.snake.move(this.dot.dots);
          
            this.snake.snakeData.pop();

            this.score -= 50;

            this.tip.innerHTML = "Sorry, You answer is wrong!";
        }

    }
    
    else{
      
        this.snake.move(this.dot.dots);
    }

  
    if(this.snake.snakeData.length<=2){
        this.gameOver("There are too much wrong answers,please go to review page","review.html");
        return;
    }

    
    this.processScore();

    
    this.snake.draw();
};


Game.prototype.processScore = function(){
   
    if(this.score >= this.levalscore[this.leval]){
        this.leval += 1;
        this.tip.innerHTML = "You are in"+ this.leval +"level!Press<span class='red'>Space</span>or<span class='red'>Enter</span>key to start new game!";

      
        this.changeStatus(0);
       
        this.snake = new Snake();
        this.snake.init();
     
        this.dot.generate(this.rowgird,this.rownum,this.snake.snakeData,this.question.answer);
    }
    document.getElementById('score').innerHTML = this.score;
    document.getElementById('leval').innerHTML = this.leval;
};


Game.prototype.changeStatus = function(status){
    if(status == 0){
       
        if(this.status!=0){
            window.clearInterval(this.timer);
            this.status = 0;
        }
    }else if(status==1){
        if(this.status!=1){
            this.startCountdown();
            this.status = 1;
        }
    }
}


Game.prototype.gameOver = function(msg,url){
   
    this.changeStatus(0);

    alert(msg);

    location = url || location;
};



window.addEventListener("load",function(){
   
    var game = new Game("snake");
 
    game.init();
});
