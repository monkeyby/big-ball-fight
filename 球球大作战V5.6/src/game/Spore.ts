/**
 * 孢子精灵，可实例化为孢子
 * 
 */

class Spore extends egret.Sprite{
    public constructor (r : number , color : number ){
        super();
        this.init(r , color);
    }

    //孢子颜色
    public color : number ;
    //孢子生命
    public isLive : Boolean = false;
    //孢子形状
    public shape : egret.Shape;
    //孢子半径
    public radius : number;
    //孢子名字
    //public spornName : string;

    private init (r : number , color : number ){
        this.color = color ;
        this.radius = r ;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawCircle(0,0,this.radius);
        this.shape.graphics.endFill();

        this.isLive = true;
        this.addChild(this.shape);


    }

    private static cacheSpore : Object = {};

    public static produce(r : number , color : number): Spore{
    if(Spore.cacheSpore[color.toString()] == null){}
        Spore.cacheSpore[color.toString()] = [];
    var tempSporeArr : Spore[] = Spore.cacheSpore[color.toString()];
    if(tempSporeArr.length > 0){
        var spore : Spore = tempSporeArr.pop();    
        spore.isLive = true;
    }

    else
        var spore : Spore =  new Spore(r , color);

    return spore;
    }

    public static reclaim(spore : Spore , color : number)　: void{
    if(Spore.cacheSpore[color.toString()] == null){}
        Spore.cacheSpore[color.toString()] = [];
    var tempSporeArr : Spore[] = Spore.cacheSpore[color.toString()];
    if(tempSporeArr.indexOf(spore) == -1)
        tempSporeArr.push(spore);    
    }


}