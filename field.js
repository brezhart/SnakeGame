class Field{
    constructor(w,h){
        /*
        A - air (free space)
        W - wall (wall )
        H - head (Same as )
         */
        this.w = w;
        this.h = h;
        this.area = [];
        for (let i = 0; i < this.h; i++){
            let row = [];
            for (let g = 0; g < this.w; g++){
                row.push((i === 0 || g === 0 || g === this.w - 1 || i === this.h - 1) ? "W" : "A");

            }
            this.area.push(row)
        }
    }
    draw(ctx,w,h){

        for (var i = 0; i < this.h; i++){
            for (var g = 0; g < this.w; g++){
                let color = 'white';
                switch (this.area[i][g]) {
                    case "A":
                        color =  "#E0E0E0";
                        break;
                    case "W":
                        color = "black";
                        break;
                    case "F":
                        color = "yellow";
                        break;

                }
                ctx.beginPath();
                ctx.fillStyle = color;
                let s = Math.min(w,h);
                ctx.fillRect(g*(s/this.h), i*(s/this.w),s/this.h,s/this.w);
                ctx.closePath();
            }
        }



    }
    drawCells(ctx,w,h){
        for (let g = 0; g < this.h; g++) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            let s = Math.min(w, h);
            ctx.moveTo( s/this.h * g, 0);
            ctx.lineTo(s/this.h * g, s );
            ctx.stroke();
            ctx.closePath();
        }
        for (let g = 0; g < this.w; g++) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            let s = Math.min(w, h);
            ctx.moveTo(0, s/this.w * g);
            ctx.lineTo(s,s/this.w * g);
            ctx.stroke();
            ctx.closePath();
        }

    }
    makeWall(x1,y1,x2,y2){
        for (let i = 0; i < y2-y1+1; i++){
            for (let g = 0; g < x2-x1+1; g++){
                this.area[y1+i][x1+g] = "W";

            }
        }
    }
}