/**
 * 孢子精灵，可实例化为孢子
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Spore = (function (_super) {
    __extends(Spore, _super);
    function Spore(r, color) {
        var _this = _super.call(this) || this;
        //孢子生命
        _this.isLive = false;
        _this.init(r, color);
        return _this;
    }
    //孢子名字
    //public spornName : string;
    Spore.prototype.init = function (r, color) {
        this.color = color;
        this.radius = r;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(this.color);
        this.shape.graphics.drawCircle(0, 0, this.radius);
        this.shape.graphics.endFill();
        this.isLive = true;
        this.addChild(this.shape);
    };
    Spore.produce = function (r, color) {
        if (Spore.cacheSpore[color.toString()] == null) { }
        Spore.cacheSpore[color.toString()] = [];
        var tempSporeArr = Spore.cacheSpore[color.toString()];
        if (tempSporeArr.length > 0) {
            var spore = tempSporeArr.pop();
            spore.isLive = true;
        }
        else
            var spore = new Spore(r, color);
        return spore;
    };
    Spore.reclaim = function (spore, color) {
        if (Spore.cacheSpore[color.toString()] == null) { }
        Spore.cacheSpore[color.toString()] = [];
        var tempSporeArr = Spore.cacheSpore[color.toString()];
        if (tempSporeArr.indexOf(spore) == -1)
            tempSporeArr.push(spore);
    };
    return Spore;
}(egret.Sprite));
Spore.cacheSpore = {};
__reflect(Spore.prototype, "Spore");
//# sourceMappingURL=Spore.js.map