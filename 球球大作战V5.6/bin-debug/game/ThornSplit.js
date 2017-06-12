// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ThornSplit = (function () {
    function ThornSplit() {
    }
    ThornSplit.splitAction = function (weight, circle, tha) {
        var i = 0;
        var j;
        //临时球球对象
        var cir = circle;
        //返回的球球数组
        var cirArr = [];
        for (j = 0; j < 8; j++) {
            var newCir = Circle.produce(weight / 8, cir.cirName, cir.color, cir.name);
            //newCir.bulk = cir.radius/4;
            newCir.x = cir.x;
            newCir.y = cir.y;
            if (cirArr.indexOf(newCir) == -1)
                cirArr.push(newCir);
            tha.addChild(newCir);
        }
        //console.log(cirArr.length);
        // for(i = 0 ; i < 4; i++){
        while (i < 8) {
            cir = cirArr[i];
            //console.log("分裂第"+ i + "次");
            if (i == 0) {
                egret.Tween.get(cir).to({ x: cir.x + 0, y: cir.y - circle.radius * 4 }, 800, egret.Ease.sineIn);
            }
            if (i == 1) {
                egret.Tween.get(cir).to({ x: cir.x - circle.radius * 4, y: cir.y + 0 }, 800, egret.Ease.sineIn);
            }
            if (i == 2) {
                egret.Tween.get(cir)
                    .to({ x: cir.x + 0, y: cir.y + circle.radius * 4 }, 800, egret.Ease.sineIn);
            }
            if (i == 3) {
                egret.Tween.get(cir)
                    .to({ x: cir.x + circle.radius * 4, y: cir.y + 0 }, 800, egret.Ease.sineIn);
            }
            if (i == 4) {
                egret.Tween.get(cir)
                    .to({ x: cir.x + circle.radius * 2.9, y: cir.y + circle.radius * 2.9 }, 800, egret.Ease.sineIn);
            }
            if (i == 5) {
                egret.Tween.get(cir)
                    .to({ x: cir.x - circle.radius * 2.9, y: cir.y + circle.radius * 2.9 }, 800, egret.Ease.sineIn);
            }
            if (i == 6) {
                egret.Tween.get(cir)
                    .to({ x: cir.x - circle.radius * 2.9, y: cir.y - circle.radius * 2.9 }, 800, egret.Ease.sineIn);
            }
            if (i == 7) {
                egret.Tween.get(cir)
                    .to({ x: cir.x + circle.radius * 2.9, y: cir.y - circle.radius * 2.9 }, 800, egret.Ease.sineIn);
            }
            i++;
        }
        //  }
        //cirArr中所有的圆要返回给gamepanel的圆数组中
        return cirArr;
    };
    return ThornSplit;
}());
__reflect(ThornSplit.prototype, "ThornSplit");
//# sourceMappingURL=ThornSplit.js.map