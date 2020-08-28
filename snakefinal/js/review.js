
window.addEventListener('load', function() {
   
    var titles = document.querySelectorAll(".rtitle");
   
    for (var i = 0; i < titles.length; i++) {
        var title = titles[i];
        var parent = title.parentNode;
        
        var content = parent.querySelector(".rcontent");
       
        var style = window.getComputedStyle(content, 'null');
       
        var height = style.height;
       
        content.setAttribute("data-height", height);
      
        content.style.height = '0px';
    
        content.classList.add('rcontenta');

    
        title.addEventListener("click", titleClick);
    }
});


function titleClick() {

    var parent = this.parentNode;
   
    var content = parent.querySelector(".rcontent");
   
    var style = window.getComputedStyle(content, 'null');

    var height = style.height;

  
    if (height == '0' || height=='0px') {
        var h = parseInt(content.getAttribute("data-height"));
        content.style.height = h+"px";
    } else {
        content.style.height = '0px';
    }
}