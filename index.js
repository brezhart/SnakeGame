btnFirst = document.getElementById("btnFirst");
secondCont = document.getElementById("secondCont");
btnSecond = document.getElementById("btnSecond");
buttonAndBlur = document.getElementById("buttonAndBlur");
btnFirst.onclick = function(){
    btnFirst.style.display = 'none';
    secondCont.style.display = 'block';
};
btnSecond.onclick = function(){
    buttonAndBlur.style.display = 'none';
    isStoped = true
};



// OUTS:
let youOut = document.getElementById('you');
let stepsOut = document.getElementById('steps');
let aiOut = document.getElementById('ai');


canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;
canvas.setAttribute('width', w);
canvas.setAttribute('height', h);
isStoped = false;
function newGame(whoPlays) {
    isStoped = false
    aiOut.style.animation = "";
    youOut.style.animation = "";

    field = new Field(41, 41);
    field.makeWall((field.w + 1) / 2 - 5, (field.h + 1) / 2 - 12, (field.w  + 1)/ 2  + 5, (field.h + 1) / 2 - 12); //
    field.makeWall((field.w + 1) / 2 - 5, (field.h + 1) / 2 + 12, (field.w  + 1)/ 2  + 5, (field.h + 1) / 2 + 12);// horizontal walls
    field.makeWall((field.w + 1) / 2 - 12, (field.h + 1) / 2 - 5, (field.w  + 1)/ 2  - 12, (field.h + 1) / 2 + 5); //
    field.makeWall((field.w + 1) / 2 + 12, (field.h + 1) / 2 - 5, (field.w  + 1)/ 2  + 12, (field.h + 1) / 2 + 5);//vertical walls
    snakes = [];

    for (let i = 0; i < 50; i++) {
        food = new Food(field);
    }

    var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


    snakes.push(new Snake(11, 11, [{x: (field.w + 1) / 2 - 5, y: (field.h + 1) / 2 - 10}, {x: (field.w + 1) / 2 - 5, y: (field.h + 1) / 2 - 11}], field, colors[1]));
    let youArrPos = [{x: (field.w + 1) / 2 + 5, y: (field.h + 1) / 2 + 10}, {x: (field.w + 1) / 2 + 5, y: (field.h + 1) / 2 + 11}];
    if (whoPlays === "AI"){
        snakes.push(new Snake(11, 11, youArrPos, field, colors[2]));
    } else {
        var self = new SnakeSelf(youArrPos, field, colors[2]);
        console.log("SELFACTIVATE");
        self.setEventListener(self.dirObj);
        snakes.push(self);
    }
    // to fix: Idk why, but when i set same x and diffirent y, its works exactly opposite way, same y and different x;


    let counter = 0;

    function loop() {
        youOut.textContent = snakes[1].poss.length;
        aiOut.textContent = snakes[0].poss.length;
        counter++;
        stepsOut.textContent = counter;

        for (let i = snakes.length - 1; i >=0; i--) {
            snakes[i].makeStep(field);
        }

        ctx.clearRect(0, 0, 9999, 9999);
        w = Math.ceil((window.innerWidth) / this.field.w) * this.field.w;
        h = Math.ceil((window.innerHeight) / this.field.h) * this.field.h;
        canvas.setAttribute('width', Math.min(w, h));
        canvas.setAttribute('height', Math.min(w, h));
        field.draw(ctx, w, h);




        for (let i = 0; i < snakes.length; i++) {
            snakes[i].draw(ctx, w, h, field);
        }
        // field.drawCells(ctx, w, h);
        if (snakes[0].dead || snakes[1].dead || isStoped){
            if (snakes[0].dead){
                aiOut.style.animation = "blink-animation 0.8s steps(5, start) 5"
                window.setTimeout(function () {
                    newGame(whoPlays)
                },4000);
            } else if (isStoped){
                aiOut.style.animation = "blink-animation 0.8s steps(5, start) 3";
                youOut.style.animation = "blink-animation 0.8s steps(5, start) 3";
                window.setTimeout(function () {
                    newGame("SELF")
                },2400);
            }
            else if (snakes[1]){
                youOut.style.animation = "blink-animation 0.8s steps(5, start) 5"
                window.setTimeout(function () {
                    newGame(whoPlays)
                },4000);
            }



        }else{
            window.setTimeout(function () {
                window.requestAnimationFrame(loop);
            }, 75);
        }


    }

    loop();


}
newGame("AI");
canvasCont = document.getElementById("canvasCont");
if (window.innerHeight < window.innerWidth){
    canvasCont.style.width = window.innerHeight/window.innerWidth*100 - 5 + "%";
    canvasCont.style.height = "100%"
}else {
    canvasCont.style.width = "100%";
    canvasCont.style.height = "auto"
}
document.getElementsByTagName("body")[0].onresize = function () {
    if (window.innerHeight < window.innerWidth){
        canvasCont.style.width = window.innerHeight/window.innerWidth*100 - 5 + "%";
        canvasCont.style.height = "100%"
    }else {
        canvasCont.style.width = "100%";
        canvasCont.style.height = "auto"
    }
};