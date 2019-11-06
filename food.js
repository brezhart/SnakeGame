class Food{
    constructor(field){
        this.field = {x:field.w,y:field.h};
        this.x = gRI(0,field.w-1);
        this.y = gRI(0,field.h-1);
        while (field.area[this.y][this.x] != "A"){
            this.x = gRI(1,field.w -1);
            this.y = gRI(1,field.h - 1);
        }
        field.area[this.y][this.x] = "F";
    }

}