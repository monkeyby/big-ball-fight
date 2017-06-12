/**
 * 浮游物精灵，可实例化为浮游生物
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Algea = (function (_super) {
    __extends(Algea, _super);
    function Algea(r, kindName) {
        var _this = _super.call(this) || this;
        //浮游物生命
        _this.isLive = false;
        //public bulk : number;
        //浮游物颜色列表
        _this.colorList = [13408665, 16777113, 6710937, 6710937, 16750848, 16776960, 39372, 13421721, 13382553, 10079232, 16737894, 16776960, 3381708, 13395456];
        _this.init(r, kindName);
        return _this;
    }
    //浮游物数据初始化
    Algea.prototype.init = function (r, kindName) {
        this.shape = new egret.Shape();
        this.distance = r;
        //this.bulk = 3.14 * this.radius * this.radius;
        this.algeaName = kindName;
        this.color = this.colorList[Math.floor(Math.random() * this.colorList.length)];
        this.shape.graphics.beginFill(this.color);
        if (kindName == "circle")
            this.shape.graphics.drawCircle(0, 0, r);
        else if (kindName == "rect")
            this.shape.graphics.drawRect(0, 0, 2 * r, 2 * r);
        this.shape.graphics.endFill();
        //this.shape.x = px;
        //this.shape.y = py;
        this.isLive = true;
        this.addChild(this.shape);
    };
    //浮游物生产
    Algea.produce = function (r, kindName) {
        if (Algea.cacheAlgea[kindName] == null)
            Algea.cacheAlgea[kindName] = [];
        var tempAlgeaArr = Algea.cacheAlgea[kindName];
        var algea;
        if (tempAlgeaArr.length > 0) {
            algea = tempAlgeaArr.pop();
            algea.isLive = true;
        }
        else
            algea = new Algea(r, kindName);
        return algea;
    };
    //浮游物回收
    Algea.reclaim = function (algea, kindName) {
        if (Algea.cacheAlgea[kindName] == null)
            Algea.cacheAlgea[kindName] = [];
        var tempAlgeaArr = Algea.cacheAlgea[kindName];
        if (tempAlgeaArr.indexOf(algea) == -1)
            tempAlgeaArr.push(algea);
    };
    return Algea;
}(egret.Sprite));
/**
 * 浮游物对象池
 */
Algea.cacheAlgea = {};
__reflect(Algea.prototype, "Algea");
//# sourceMappingURL=Algea.js.map