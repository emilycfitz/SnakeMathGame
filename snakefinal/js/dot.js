function Dot(){
   
    this.count = 4;

    this.dots = [];

    this.colors = ["lightpink","hotpink","indigo","blue","deepskyblue","springgreen","lime","olive","gold","red","coral","green","pink","fuchsia","purple"];
};


Dot.prototype.generate = function(x,y,snakeData,answer){

    this.dots = [];
    while(this.dots.length<this.count){
        var gx = parseInt(Math.random()*x);
        var gy = parseInt(Math.random()*y);
        var an = answer + parseInt(Math.random()*50) - 25;

        var isInDots = false;
        for(var i = 0;i<this.dots.length;i++){
            if(this.dots[i].x == gx && this.dots[i].y == gy){
                isInDots = true;
            }
        }
        for(var i = 0;i<snakeData.length;i++){
            if(snakeData[i].x == gx && snakeData[i].y == gy){
                isInDots = true;
            }
        }


       
        if(isInDots){
            continue;
        }else{
            this.dots.push({
                x:gx,
                y:gy,
                a:an,
         
                c:this.colors[parseInt(Math.random()*this.colors.length)]
            });
        }
    }

    this.dots[0].a = answer;


    this.draw();
};



Dot.prototype.draw = function(){
    var that = this;
   
    var blocks = document.querySelectorAll(".b");

    for(var i = 0;i<blocks.length;i++){
        if(blocks[i].classList.contains('dot')){
            blocks[i].classList.remove('dot');
            blocks[i].innerHTML = "";
            blocks[i].style.background = "";
        }
    }

  
    this.dots.forEach(function(item,index,arr){
 
        for(var i = 0;i<blocks.length;i++){
       
            if(blocks[i].getAttribute("x") == item.x && blocks[i].getAttribute("y") == item.y){
                blocks[i].classList.add('dot');
                blocks[i].innerHTML = item.a;
                blocks[i].style.background = item.c;
            }
        }
    });
};