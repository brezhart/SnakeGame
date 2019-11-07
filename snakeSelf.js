class SnakeSelf{
    constructor(arrInp,field,color) {
        this.stept = false;
        this.poss = arrInp;
        this.dead = false;
        this.color = color;
        this.dirObj = {dir:"WEST"};
        this.dir = this.dirObj.dir;
        for (let i = 0; i <  this.poss.length; i++){
            field.area[this.poss[i].y][this.poss[i].x] = "W"
        }

        this.pos = this.poss[0];
    }
    makeStep(field) {
        if (!this.dead) {
            console.log("THIS DIR: ", this.dir);
            field.area[this.poss[0].y][this.poss[0].x] = "W";
            let newHead = {x: this.pos.x, y: this.pos.y};
            switch (this.dir) {
                case "EAST":
                    newHead.x += 1;
                    break;
                case "SOUTH":
                    newHead.y += 1;
                    break;
                case "WEST":
                    newHead.x -= 1;
                    break;
                case "NORTH":
                    newHead.y -= 1;
            }
            this.poss.unshift(newHead);
            this.pos = this.poss[0];
            if (field.area[this.pos.y][this.pos.x] == "F") {
                let f = new Food(field);
                field.area[this.poss[0].y][this.poss[0].x] = "W"

            } else if (field.area[this.pos.y][this.pos.x] == "W") {
                this.dead = true
                field.area[this.poss[0].y][this.poss[0].x] = "W";
                field.area[this.poss[this.poss.length - 1].y][this.poss[this.poss.length - 1].x] = "A";
                this.poss.splice(this.poss.length - 1);
            } else {
                field.area[this.poss[0].y][this.poss[0].x] = "W";
                field.area[this.poss[this.poss.length - 1].y][this.poss[this.poss.length - 1].x] = "A";
                this.poss.splice(this.poss.length - 1);


            }


        }
        this.stept = false;
    }
    setEventListener(){
        let thisContext = this;

        let NorthBtn = document.getElementById("NorthBtn");
        console.log(NorthBtn);
        NorthBtn.addEventListener("click", function () {
            console.log(thisContext);
            if (!thisContext.stept && thisContext.dir !== "SOUTH"){
                console.log("YEEEEEEEEES");
                thisContext.dir = "NORTH";
                console.log(thisContext.dirObj.dir);
                thisContext.stept = true;
            }
        });
        let EastBtn = document.getElementById("EastBtn");
        EastBtn.addEventListener("click", function(){
            if (!thisContext.stept && thisContext.dir !== "WEST"){
                thisContext.dir = "EAST";
                thisContext.stept = true;
            }
        });
        let SouthBtn = document.getElementById("SouthBtn");
        SouthBtn.addEventListener("click", function(){
            if (!thisContext.stept && thisContext.dir !== "NORTH"){
                thisContext.dir = "SOUTH";
                thisContext.stept = true;
            }
        });
        let WestBtn = document.getElementById("WestBtn");
        WestBtn.addEventListener("click",  function(){
            if (!thisContext.stept && thisContext.dir !== "EAST"){
                thisContext.dir = "WEST";
                thisContext.stept = true;
            }
        });

    }

    draw(ctx,w,h,field){
        for (let i = 0; i < this.poss.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.dead ? "gray" : (i == 0 ? LightenColor(this.color,-70) : this.color);
            let s = Math.min(w, h);
            ctx.fillRect(this.poss[i].x * (s / field.w), this.poss[i].y * (s / field.h), s / field.w, s / field.h);
            ctx.closePath();
        }
    }
}