
function Snake(){
    
    this.defaultLength = 5;

    this.length = this.defaultLength;

   
    this.snakeData = [];

   
    this.lastDirection = 'right';
    
    this.direction = 'right';
   
    this.colors = ["lightpink","hotpink","indigo","blue","deepskyblue","springgreen","lime","olive","gold","red","coral","green","pink","fuchsia","purple"];
};

Snake.prototype.init = function(){
    
    this.snakeData = [
        {x:5,y:1,c:"hotpink"},
        {x:4,y:1,c:"hotpink"},
        {x:3,y:1,c:"hotpink"},
        {x:2,y:1,c:"hotpink"},
        {x:1,y:1,c:"hotpink"}
    ];

    this.draw();
};


Snake.prototype.draw = function(){
    var that = this;
    
    var blocks = document.querySelectorAll(".b");
    
    for(var i = 0;i<blocks.length;i++){
        if(blocks[i].classList.contains('snake')){
           
            blocks[i].classList.remove('snake');
           
            blocks[i].classList.remove('snake_head_top');
            blocks[i].classList.remove('snake_head_bottom');
            blocks[i].classList.remove('snake_head_left');
            blocks[i].classList.remove('snake_head_right');
         
            blocks[i].style.background = "";
          
            blocks[i].innerHTML = "";
        }
    }

 
    var index = 0;
    this.snakeData.forEach(function(item,index,arr){
       
        for(var i = 0;i<blocks.length;i++){
          
            if(blocks[i].getAttribute("x") == item.x && blocks[i].getAttribute("y") == item.y){
               
                if(index == 0){
                    blocks[i].innerHTML = "●";
                    
                    blocks[i].classList.add('snake_head_'+that.direction);
                }
                blocks[i].classList.add('snake');
                blocks[i].style.background = item.c;
                index++;
            }
        }
    });
};


Snake.prototype.preMove = function(){
    
    if(
        (this.lastDirection == 'right' && this.direction =='left') ||
        (this.lastDirection == 'left' && this.direction =='right') ||
        (this.lastDirection == 'top' && this.direction =='bottom') ||
        (this.lastDirection == 'bottom' && this.direction =='top') ){

        this.direction = this.lastDirection;
    }

    
    var addx = 0,addy = 0;
    if(this.direction=='right'){
        addx = 1;
    }else if(this.direction=='left'){
        addx = - 1;
    }else if(this.direction=='top'){
        addy = - 1;
    }else{
        addy = 1;
    }

   
    var tempData = [];

 
    for(var i =0;i<this.snakeData.length;i++){
        var item = this.snakeData[i];
        
        if(i==0){
            tempData.push({
                x:item.x + addx,
                y:item.y + addy,
                c:item.c
            });
        }
       
        else{
            
            tempData.push({
                x:this.snakeData[i-1].x,
                y:this.snakeData[i-1].y,
                c:this.snakeData[i].c
            });
        }
    }

    return tempData;
};


Snake.prototype.move = function(dots){
    
    var tempData = this.preMove();

    this.snakeData = tempData;

    this.lastDirection = this.direction;
};


Snake.prototype.checkGameOver = function(max_x,max_y){
    var tempSnakeData = this.preMove();
  
    var snakeHead = tempSnakeData[0];

    if(snakeHead.x<0 || snakeHead.x >= max_x || snakeHead.y<0 || snakeHead.y>=max_y ){
        return true;
    }


 
    for(var i = 0 ;i<this.snakeData.length;i++){
        var item = this.snakeData[i];
        if(item.x == snakeHead.x && item.y == snakeHead.y){
            return true;
        }
        console.log(1)
    }

    return false;
};


Snake.prototype.checkEat = function(dots){
    var tempData = this.preMove();
  
    var snakeHead = tempData[0];
    
    for(var i = 0;i<dots.length;i++){
        if(dots[i].x == snakeHead.x && dots[i].y == snakeHead.y){
            return dots[i];
        }
    }
    return false;
};
