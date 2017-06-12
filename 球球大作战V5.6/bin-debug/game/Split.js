// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Split = (function () {
    function Split() {
    }
    Split.splitAction = function (circle, coor_bg, coor_ball, tha, gameStageW, gameStageH, gameBG, bootCirArr, bootAlgea) {
        var i;
        var cir;
        var cirArr = [];
        var j = 0;
        // var distanceArr : number[] = [];
        // var disX : number = coor_ball.x - coor_bg.x;
        // var disY : number = coor_ball.y - coor_bg.y;
        // var hypotenuse : number = Math.sqrt(disX *disX + disY * disY);
        // var cos : number = Math.abs(disX) / hypotenuse;
        // //var radian : any= Math.acos(cos) * 360 / 2*Math.PI;
        // var radian  =  Math.floor(180/(Math.PI/Math.acos(cos)));
        //console.log(radian);
        //var radian2 : number = Math.atan(Math.abs(disX)/Math.abs(disY)) * 360 / 2*Math.PI;
        var lenthX = [];
        var lenthY = [];
        for (i = 0; i < circle.length; i++) {
            lenthX[i] = Math.cos(Math.atan((LayerManager.gameControl.control_ball.y - LayerManager.gameControl.control_Y) / (LayerManager.gameControl.control_ball.x - LayerManager.gameControl.control_X))) * circle[i].radius * 2.5;
            lenthY[i] = Math.sin(Math.atan((LayerManager.gameControl.control_ball.y - LayerManager.gameControl.control_Y) / (LayerManager.gameControl.control_ball.x - LayerManager.gameControl.control_X))) * circle[i].radius * 2.5;
        }
        // if(disX >= 0 && disY <= 0){
        // }
        // if(disX <= 0 && disY <= 0){
        //     radian = 180 - radian;
        // }
        // if(disX <= 0 && disY >= 0){
        //     radian = 180 + radian;
        // }
        // if(disX >= 0 && disY >= 0){
        //     radian = 360 - radian;
        // }
        //console.log(radian);
        for (i = 0; i < circle.length; i++) {
            console.log("可以分裂的球的XY：" + circle[i].x, circle[i].y);
            this.cirX[i] = circle[i].x;
            this.cirY[i] = circle[i].y;
            this.cirR[i] = circle[i].radius;
            this.weight[i] = circle[i].weight;
            console.log("可以分裂的球球" + i + "半径： " + circle[i].radius);
        }
        var r;
        for (i = 0; i < circle.length; i++) {
            cir = circle[i];
            r = this.cirR[i] / 2;
            console.log(r);
            //var cirX : number  = cir.x;
            //var cirY : number  = cir.y;
            for (j = 0; j < 2; j++) {
                //console.log(cir.cirName)
                var newCir = Circle.produce(this.weight[i] / 2, cir.cirName, cir.color, cir.name);
                //newCir.bulk = newCir.radius;
                newCir.x = this.cirX[i];
                newCir.y = this.cirY[i];
                console.log("X : " + newCir.x, "Y : " + newCir.y);
                if (cirArr.indexOf(newCir) == -1)
                    cirArr.push(newCir);
                LayerManager.game.addChild(newCir);
            }
        }
        // for( i = 0; i < circle.length; i++){
        //     cir = circle[i];
        //     console.log("可以分裂的球的坐标：" + circle[i].x + "," + circle[i].y );
        //     r= circle[i].radius;
        //     //console.log(cir.radius);
        //     //var cirX : number  = cir.x;
        //     //var cirY : number  = cir.y;
        //     for( j = 0; j < 2; j ++){
        //         //console.log(cir.cirName)
        //         var newCir : Circle = Circle.produce(r/2,cir.cirName,cir.color);
        //         newCir.bulk = newCir.radius;
        //         newCir.x = circle[i].x;
        //         newCir.y = circle[i].y;
        //         console.log("X : " + newCir.x , "Y : " + newCir.y)
        //         if(cirArr.indexOf(newCir) == -1)
        //             cirArr.push(newCir);
        //         LayerManager.game.addChild(newCir);
        //     }
        // }
        var flag = false;
        //var j : number ; 
        var newXorY;
        for (i = 0; i < cirArr.length; i++) {
            cir = cirArr[i];
            if (i % 2 == 1)
                j = i / 2 - 0.5;
            if (i % 2 == 0)
                j = i / 2;
            if (i % 2 == 0) {
                //正方向缓动
                //通过判断控制盘的坐标，来操作我的小球的运动方向
                if (LayerManager.gameControl.X > LayerManager.gameControl.control_X && LayerManager.gameControl.Y < LayerManager.gameControl.control_Y) {
                    egret.Tween.get(cir).to({ x: cir.x + lenthX[j], y: cir.y + lenthY[j] }, 600, egret.Ease.sineIn);
                }
                if (LayerManager.gameControl.X > LayerManager.gameControl.control_X && LayerManager.gameControl.Y > LayerManager.gameControl.control_Y) {
                    egret.Tween.get(cir).to({ x: cir.x + lenthX[j], y: cir.y + lenthY[j] }, 600, egret.Ease.sineIn);
                }
                if (LayerManager.gameControl.X < LayerManager.gameControl.control_X && LayerManager.gameControl.Y < LayerManager.gameControl.control_Y) {
                    egret.Tween.get(cir).to({ x: cir.x - lenthX[j], y: cir.y - lenthY[j] }, 600, egret.Ease.sineIn);
                }
                if (LayerManager.gameControl.X < LayerManager.gameControl.control_X && LayerManager.gameControl.Y > LayerManager.gameControl.control_Y) {
                    egret.Tween.get(cir).to({ x: cir.x - lenthX[j], y: cir.y - lenthY[j] }, 600, egret.Ease.sineIn);
                }
            }
        }
        //cirArr中所有的圆要返回给gamepanel的圆数组中
        console.log("返回的圆个数：" + cirArr.length);
        return cirArr;
    };
    //private static onScale (circle : Circle[] , gameStageW : number , gameStageH : number,gameBG : egret.Bitmap,bootCirArr : Circle[], bootAlgea : Algea[]){
    //    ScaleMap.scale(circle,  gameStageW , gameStageH,gameBG ,bootCirArr, bootAlgea )
    //}
    Split.sporeAction = function (circle, coor_bg, coor_ball, tha, gameStageW, gameStageH, gameBG, bootCirArr, bootAlgea) {
        //console.log("分裂一次");
        var i;
        var cir;
        //  需要返回的孢子
        var sporeArr = [];
        var distanceArr = [];
        var disX = coor_ball.x - coor_bg.x;
        var disY = coor_ball.y - coor_bg.y;
        var hypotenuse = Math.sqrt(disX * disX + disY * disY);
        var cos = Math.abs(disX) / hypotenuse;
        // console.log(cos);
        //var radian : any= Math.acos(cos) * 360 / 2*Math.PI;
        var radian = Math.floor(180 / (Math.PI / Math.acos(cos)));
        //console.log(radian);
        //var radian2 : number = Math.atan(Math.abs(disX)/Math.abs(disY)) * 360 / 2*Math.PI;
        //console.log(radian2);
        var lenthX = [];
        var lenthY = [];
        for (i = 0; i < circle.length; i++) {
            lenthX[i] = Math.cos(Math.atan((LayerManager.gameControl.control_ball.y - LayerManager.gameControl.control_Y) / (LayerManager.gameControl.control_ball.x - LayerManager.gameControl.control_X))) * circle[i].radius * 4;
            lenthY[i] = Math.sin(Math.atan((LayerManager.gameControl.control_ball.y - LayerManager.gameControl.control_Y) / (LayerManager.gameControl.control_ball.x - LayerManager.gameControl.control_X))) * circle[i].radius * 4;
        }
        var r;
        for (i = 0; i < circle.length; i++) {
            cir = circle[i];
            r = cir.radius;
            //console.log(cir.radius);
            //var cirX : number  = cir.x;
            //var cirY : number  = cir.y;
            //console.log(cir.cirName)
            console.log(cir.color);
            var newSpore = Spore.produce(9, cir.color);
            newSpore.x = cir.x;
            newSpore.y = cir.y;
            if (sporeArr.indexOf(newSpore) == -1)
                sporeArr.push(newSpore);
            LayerManager.game.addChildAt(newSpore, 1);
        }
        var flag = false;
        var j;
        var spore;
        var newX;
        var newY;
        for (i = 0; i < sporeArr.length; i++) {
            spore = sporeArr[i];
            if (LayerManager.gameControl.X >= LayerManager.gameControl.control_X && LayerManager.gameControl.Y <= LayerManager.gameControl.control_Y) {
                egret.Tween.get(spore).to({ x: spore.x + lenthX[i], y: spore.y + lenthY[i] }, 300, egret.Ease.sineIn);
            }
            if (LayerManager.gameControl.X > LayerManager.gameControl.control_X && LayerManager.gameControl.Y > LayerManager.gameControl.control_Y) {
                egret.Tween.get(spore).to({ x: spore.x + lenthX[i], y: spore.y + lenthY[i] }, 300, egret.Ease.sineIn);
            }
            if (LayerManager.gameControl.X < LayerManager.gameControl.control_X && LayerManager.gameControl.Y < LayerManager.gameControl.control_Y) {
                egret.Tween.get(spore).to({ x: spore.x - lenthX[i], y: spore.y - lenthY[i] }, 300, egret.Ease.sineIn);
            }
            if (LayerManager.gameControl.X < LayerManager.gameControl.control_X && LayerManager.gameControl.Y > LayerManager.gameControl.control_Y) {
                egret.Tween.get(spore).to({ x: spore.x - lenthX[i], y: spore.y - lenthY[i] }, 300, egret.Ease.sineIn);
            }
        }
        return sporeArr;
    };
    return Split;
}());
Split.cirX = [];
Split.cirY = [];
Split.cirR = [];
Split.weight = [];
__reflect(Split.prototype, "Split");
//# sourceMappingURL=Split.js.map