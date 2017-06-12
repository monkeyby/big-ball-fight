/**
 * 球刺精灵，可以实例化地图的球刺
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Thorn = (function (_super) {
    __extends(Thorn, _super);
    function Thorn(r, kindName) {
        var _this = _super.call(this) || this;
        //球刺生命
        _this.isLive = false;
        _this.weight = 0;
        //球刺颜色列表
        _this.colorList = [13408665, 16777113, 6710937, 6710937, 16750848, 16776960, 39372, 13421721, 13382553, 10079232, 16737894, 16776960, 3381708, 13395456];
        _this.init(r, kindName);
        return _this;
    }
    //球刺数据初始化
    Thorn.prototype.init = function (r, kindName) {
        this.radius = r;
        this.shape = new egret.Shape();
        this.weight = this.radius ^ 3;
        this.distance = r;
        //this.bulk = 3.14 * this.radius * this.radius;
        this.thornName = kindName;
        this.color = this.colorList[Math.floor(Math.random() * this.colorList.length)];
        this.shape.graphics.beginFill(this.color);
        if (kindName == "circle")
            this.shape.graphics.drawCircle(0, 0, r);
        else if (kindName == "rect")
            this.shape.graphics.drawRect(0, 0, 2 * r, 2 * r);
        this.shape.graphics.endFill();
        this.isLive = true;
        this.addChild(this.shape);
        this.skin = new egret.Bitmap(RES.getRes("ci_png"));
        this.skin.width = this.skin.height = r * 2;
        this.skin.anchorOffsetX = r;
        this.skin.anchorOffsetY = r;
        this.addChild(this.skin);
        //this.shape.x = px;
        //this.shape.y = py;
    };
    //球刺生产
    Thorn.produce = function (r, kindName) {
        if (Thorn.cacheThorn[kindName] == null)
            Thorn.cacheThorn[kindName] = [];
        var tempThornArr = Thorn.cacheThorn[kindName];
        var thorn;
        if (tempThornArr.length > 0) {
            thorn = tempThornArr.pop();
            thorn.isLive = true;
        }
        else
            thorn = new Thorn(r, kindName);
        return thorn;
    };
    //球刺回收
    Thorn.reclaim = function (thorn, kindName) {
        if (Thorn.cacheThorn[kindName] == null)
            Thorn.cacheThorn[kindName] = [];
        var tempThornArr = Thorn.cacheThorn[kindName];
        if (tempThornArr.indexOf(thorn) == -1)
            tempThornArr.push(thorn);
    };
    return Thorn;
}(egret.Sprite));
/**
 * 球刺对象池
 */
Thorn.cacheThorn = {};
__reflect(Thorn.prototype, "Thorn");
//# sourceMappingURL=Thorn.js.map