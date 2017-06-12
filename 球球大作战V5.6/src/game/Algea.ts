/**
 * 浮游物精灵，可实例化为浮游生物
 */

class Algea extends egret.Sprite{
    public constructor(r:number,kindName:string){
        super();
        this.init(r,kindName);
    }

    //private speed : number;
    //浮游物颜色
    public color : number ;
    //浮游物生命
    public isLive : Boolean = false;
    //浮游物形状
    public shape : egret.Shape;
    //浮游物半径
    public distance : number;
    //浮游物名字
    public algeaName : string;
    //浮游物坐标
    public algeaX : number;
    //浮游物坐标
    public algeaY : number;

    //public bulk : number;

    //浮游物颜色列表
    private colorList: number[] = [13408665,16777113,6710937,6710937,16750848,16776960,39372,13421721,13382553,10079232,16737894,16776960,3381708,13395456];

    //浮游物数据初始化
    private init(r:number,kindName:string){
        this.shape = new egret.Shape();
        this.distance = r;
        //this.bulk = 3.14 * this.radius * this.radius;
        this.algeaName = kindName;
        this.color = this.colorList[Math.floor(Math.random()*this.colorList.length)];

        this.shape.graphics.beginFill(this.color);

        if(kindName == "circle")
            this.shape.graphics.drawCircle(0,0,r);
        else if(kindName == "rect")
            this.shape.graphics.drawRect(0,0,2*r,2*r);
        
        this.shape.graphics.endFill();
        //this.shape.x = px;
        //this.shape.y = py;
        this.isLive = true;
        this.addChild(this.shape);
    }

    /**
     * 浮游物对象池
     */
    private static cacheAlgea : Object = {};
    //浮游物生产
    public static produce(r:number,kindName:string):Algea{
        if(Algea.cacheAlgea[kindName] == null)
             Algea.cacheAlgea[kindName] = [];
        var tempAlgeaArr : Algea[] = Algea.cacheAlgea[kindName];
        var algea : Algea;
        if(tempAlgeaArr.length > 0){
            algea = tempAlgeaArr.pop();
            algea.isLive = true;
        }
        else 
            algea = new Algea(r,kindName);
        return algea;
    }
    //浮游物回收
    public static reclaim(algea:Algea,kindName:string):void{
        if(Algea.cacheAlgea[kindName] == null)
             Algea.cacheAlgea[kindName] = [];
        var tempAlgeaArr : Algea[] = Algea.cacheAlgea[kindName];
        if(tempAlgeaArr.indexOf(algea) == -1)
            tempAlgeaArr.push(algea);
    }
}