/**
 * 球球精灵对象，可实例化为我方球球、NPC球球
 */
class Circle extends egret.Sprite{

    public constructor(r:number,kindName:string,color : number,name : string){
        super();
        this.init(r,kindName,color,name);

    }

    //小球移动速度
    public speed : number;
    //小球颜色
    public color : number;
    //小球生命
    public isLive : Boolean = false;
    //小球形状
    public shape : egret.Shape;
    //小球半径
    public radius : number;
    //小球名字
    public cirName : string;
    //小球皮肤
    public skin : egret.Bitmap;
    //皮肤名字
    public skinName  : string;
    //小球体积
    public bulk : number;
    //球球步长
    public stance : number;
    //球球缓存半径
    public cacheRadius : number = 0;

    public cacheWeight : number = 0;
    public weight : number = 0;

    //外发光效果
    public isFilter : boolean ;

    //球球名字
    public name : string;

    private nameText : egret.TextField;

    public swallowed : number ; 


    //可选颜色列表
    private colorList: number[] = [13408665,16777113,6710937,6710937,16750848,16776960,39372,13421721,13382553,10079232,16737894,16776960,3381708,13395456];

    /**
     * 小球数据初始化
     */
    private init(weight:number,kindName:string,color : number ,name : string){
        this.isFilter = false;
        this.shape = new egret.Shape();
        this.weight = weight;
        this.radius = Math.pow(this.weight,1/3);
        this.bulk = this.radius;
        this.speed = 3;
        this.cirName = kindName;
        this.stance = 0.8 * (15 / this.radius)
        this.name = name;
        this.swallowed  = 0;
            this.color = color;
        if(color == 16776960  )
            this.color = this.colorList[Math.floor(Math.random()*this.colorList.length)]

        this.isLive = true;

        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawCircle(0,0,this.radius);
        this.shape.graphics.endFill();
        //this.shape.x = px;
        //this.shape.y = py;
        //this.isLive = true;
        this.addChild(this.shape);


        //我方球球添加皮肤
        // if(this.cirName == "myCirclr"){
        //     this.skin = new egret.Bitmap(RES.getRes("form1_png"));
        //     this.skin.width = this.skin.height = this.radius*2;
        //     this.skin.anchorOffsetX =  this.radius;
        //     this.skin.anchorOffsetY =  this.radius;
        //     this.addChild(this.skin);
        //     this.skinName = "form1_png";
        // }

        //我方球球添加名字
        this.nameText = new egret.TextField();
        this.nameText.text = this.name;
        this.nameText.textColor = 0xffffff;
        this.nameText.size = 12;
        // this.nameText.x = GameManager.stage.stageWidth /2 - 200;
        // this.nameText.y = GameManager.stage.stageHeight /2 - 230; 
        this.nameText.x = - this.nameText.width/2;
        this.nameText.y = - this.nameText.height/2;
        this.addChild(this.nameText);
    }

    /**
     * 球球对象池
     */
    private static cacheCircle : Object = {};
    //生产对象
    public static produce(weight:number,kindName:string, color : number,name: string):Circle{
        if(Circle.cacheCircle[kindName] == null)
            Circle.cacheCircle[kindName] = [];
        var tempCirArr : Circle[] = Circle.cacheCircle[kindName];
        var circle : Circle;
        if(tempCirArr.length > 0){
            circle = tempCirArr.pop();

            if(kindName == "myCirclr"){
                circle.weight = weight;
                circle.radius = Math.pow(circle.weight,1/3);
                circle.color = color;
                circle.name = name;
                // circle.skin.width = circle.skin.height = circle.radius*2;
                // circle.skin.anchorOffsetX =  circle.radius;
                // circle.skin.anchorOffsetY =  circle.radius;
                
                circle.shape.graphics.clear();
                circle.shape.graphics.beginFill(circle.color);
                circle.shape.graphics.drawCircle(0,0,Math.pow(circle.weight,1/3));
                circle.shape.graphics.endFill();
            }
            circle.isLive = true;

        }
        else 
            circle = new Circle(weight,kindName,color,name);
        return circle;
    }

    //回收对象
    public static reclaim(circle:Circle,kindName:string):void{
        if(Circle.cacheCircle[kindName] == null)
            Circle.cacheCircle[kindName] = [];
        var tempCirArr : Circle[] = Circle.cacheCircle[kindName];
        if(tempCirArr.indexOf(circle) == -1)
        {
            tempCirArr.push(circle);
        }
    }
}