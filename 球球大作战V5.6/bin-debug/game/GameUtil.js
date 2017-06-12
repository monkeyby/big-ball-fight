var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtil = (function () {
    function GameUtil() {
    }
    /**基于矩形的碰撞检测*/
    GameUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x - obj1.width / 2;
        rect1.y = obj1.y - obj1.height / 2;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //console.log(obj1.x,obj1.y) 
        //console.log(rect1.width,rect1.height,rect2.width,rect2.height);
        //console.log(rect1.x,rect1.y,rect2.x,rect2.y);
        return rect1.intersects(rect2);
    };
    /**圆形碰撞检测 */
    GameUtil.hitTest2 = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x - obj1.width / 2;
        rect1.y = obj1.y - obj1.height / 2;
        rect2.x = obj2.x - obj2.width / 2;
        rect2.y = obj2.y - obj2.height / 2;
        //console.log(obj1.x,obj1.y) 
        //console.log(rect1.width,rect1.height,rect2.width,rect2.height);
        //console.log(rect1.x,rect1.y,rect2.x,rect2.y);
        return rect1.intersects(rect2);
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map