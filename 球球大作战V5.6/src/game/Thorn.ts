/**
 * 球刺精灵，可以实例化地图的球刺
 */

class Thorn extends egret.Sprite{
    public constructor(r:number,kindName:string){              //KindName 一共有俩种，circle和rect，一般用circle
        super();
        this.init(r,kindName);
    }

    //球刺颜色
    public color : number ;
    //球刺生命
    public isLive : Boolean = false;
    //球刺形状
    public shape : egret.Shape;
    //球刺半径
    public distance : number;
    //球刺名字
    public thornName : string;
    //球刺坐标
    public thornX : number;
    //球刺坐标
    public thornY : number;

    public radius : number;

    public skin : egret.Bitmap;

    public weight : number = 0;

    //球刺颜色列表
    private colorList: number[] = [13408665,16777113,6710937,6710937,16750848,16776960,39372,13421721,13382553,10079232,16737894,16776960,3381708,13395456];

    //球刺数据初始化
    private init(r:number,kindName:string){
        this.radius = r;
        this.shape = new egret.Shape();
        this.weight = this.radius ^3;
        this.distance = r;
        //this.bulk = 3.14 * this.radius * this.radius;
        this.thornName = kindName;
        this.color = this.colorList[Math.floor(Math.random()*this.colorList.length)];

        this.shape.graphics.beginFill(this.color);

        if(kindName == "circle")
            this.shape.graphics.drawCircle(0,0,r);
        else if(kindName == "rect")
            this.shape.graphics.drawRect(0,0,2*r,2*r);
        
            this.shape.graphics.endFill();
            this.isLive = true;
            this.addChild(this.shape);


            this.skin = new egret.Bitmap(RES.getRes("ci_png"));
            this.skin.width = this.skin.height = r*2;
            this.skin.anchorOffsetX =  r;
            this.skin.anchorOffsetY =  r;
            this.addChild(this.skin);

        //this.shape.x = px;
        //this.shape.y = py;
    }

    /**
     * 球刺对象池
     */
    private static cacheThorn : Object = {};
    //球刺生产
    public static produce(r:number,kindName:string):Thorn{
        if(Thorn.cacheThorn[kindName] == null)
             Thorn.cacheThorn[kindName] = [];
        var tempThornArr : Thorn[] = Thorn.cacheThorn[kindName];
        var thorn : Thorn;
        if(tempThornArr.length > 0){
            thorn = tempThornArr.pop();
            thorn.isLive = true;
        }

        else 
            thorn = new Thorn(r,kindName);
        return thorn;
    }
    //球刺回收
    public static reclaim(thorn:Thorn,kindName:string):void{
        if(Thorn.cacheThorn[kindName] == null)
             Thorn.cacheThorn[kindName] = [];
        var tempThornArr : Thorn[] = Thorn.cacheThorn[kindName];
        if(tempThornArr.indexOf(thorn) == -1)
            tempThornArr.push(thorn);
    }
}