var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 球球精灵对象，可实例化为我方球球、NPC球球
 */
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(r, kindName, color, name) {
        var _this = _super.call(this) || this;
        //小球生命
        _this.isLive = false;
        //球球缓存半径
        _this.cacheRadius = 0;
        _this.cacheWeight = 0;
        _this.weight = 0;
        //可选颜色列表
        _this.colorList = [13408665, 16777113, 6710937, 6710937, 16750848, 16776960, 39372, 13421721, 13382553, 10079232, 16737894, 16776960, 3381708, 13395456];
        _this.init(r, kindName, color, name);
        return _this;
    }
    /**
     * 小球数据初始化
     */
    Circle.prototype.init = function (weight, kindName, color, name) {
        this.isFilter = false;
        this.shape = new egret.Shape();
        this.weight = weight;
        this.radius = Math.pow(this.weight, 1 / 3);
        this.bulk = this.radius;
        this.speed = 3;
        this.cirName = kindName;
        this.stance = 0.8 * (15 / this.radius);
        this.name = name;
        this.swallowed = 0;
        this.color = color;
        if (color == 16776960)
            this.color = this.colorList[Math.floor(Math.random() * this.colorList.length)];
        this.isLive = true;
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawCircle(0, 0, this.radius);
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
        this.nameText.x = -this.nameText.width / 2;
        this.nameText.y = -this.nameText.height / 2;
        this.addChild(this.nameText);
    };
    //生产对象
    Circle.produce = function (weight, kindName, color, name) {
        if (Circle.cacheCircle[kindName] == null)
            Circle.cacheCircle[kindName] = [];
        var tempCirArr = Circle.cacheCircle[kindName];
        var circle;
        if (tempCirArr.length > 0) {
            circle = tempCirArr.pop();
            if (kindName == "myCirclr") {
                circle.weight = weight;
                circle.radius = Math.pow(circle.weight, 1 / 3);
                circle.color = color;
                circle.name = name;
                // circle.skin.width = circle.skin.height = circle.radius*2;
                // circle.skin.anchorOffsetX =  circle.radius;
                // circle.skin.anchorOffsetY =  circle.radius;
                circle.shape.graphics.clear();
                circle.shape.graphics.beginFill(circle.color);
                circle.shape.graphics.drawCircle(0, 0, Math.pow(circle.weight, 1 / 3));
                circle.shape.graphics.endFill();
            }
            circle.isLive = true;
        }
        else
            circle = new Circle(weight, kindName, color, name);
        return circle;
    };
    //回收对象
    Circle.reclaim = function (circle, kindName) {
        if (Circle.cacheCircle[kindName] == null)
            Circle.cacheCircle[kindName] = [];
        var tempCirArr = Circle.cacheCircle[kindName];
        if (tempCirArr.indexOf(circle) == -1) {
            tempCirArr.push(circle);
        }
    };
    return Circle;
}(egret.Sprite));
/**
 * 球球对象池
 */
Circle.cacheCircle = {};
__reflect(Circle.prototype, "Circle");
//# sourceMappingURL=Circle.js.map