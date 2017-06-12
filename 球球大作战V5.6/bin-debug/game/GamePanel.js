/**
 *
 * @auther   wangnan
 *
 * 球球作战游戏面板
 *
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
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super.call(this) || this;
        //我方球球对象
        //private myCirclr : Circle;
        //我方球球半径
        _this.myCirR = 30;
        //我方球球重量
        _this.myWeight = 15000;
        //NPC数量
        _this.bootCirNum = 9;
        //NPC数组
        _this.bootCirArr = [];
        //世界地图边界flag
        _this.dirX = false;
        _this.dirY = false;
        //我方球球上一次位移记录
        _this.lastX = [];
        _this.lastY = [];
        //浮游物数组
        _this.bootAlgea = [];
        //浮游物数量
        _this.bootAlgeaNum = 200;
        //球刺数组
        _this.bootThorn = [];
        //球刺数量
        _this.bootThornNum = 10;
        //浮游物种类名字
        _this.algeaKindName = ["circle", "rect"];
        //世界地图缩放标准
        _this.scanlBase = 0.1;
        //上一次吃到的浮游物
        _this.lastEatAlgea = 50;
        //是否开启滤镜
        _this.isFilter = [];
        //控制盘大小
        _this.conBgSize = 50;
        //NPC半径大小
        _this.circleR = 15;
        _this.circleWeight = 3375;
        //我方球球数组
        _this.myCirArr = [];
        //球球孢子数组
        _this.mySpornArr = [];
        //半径缓存
        _this.cacheRadius = 0;
        _this.mackUp = 0;
        _this.sortingArr = [];
        //计数我方球球吞噬数量
        _this.myCirSwallowed = 0;
        _this.transX = 400;
        _this.transY = 240;
        _this.init();
        return _this;
    }
    GamePanel.prototype.init = function () {
        /*方案一：世界地图用一个黑色矩形
        this.touchEnabled = true;
        this.gameBackGround = new egret.Shape();
        this.gameBackGround.graphics.beginFill(0x000000,0.8);
        this.gameBackGround.graphics.drawRect(0,0,2000,2000);
        this.gameBackGround.graphics.endFill();
        this.gameBackGround.x = - (this.gameBackGround.width - GameManager.stage.stageWidth) /2;
        this.gameBackGround.y = - (this.gameBackGround.height - GameManager.stage.stageHeight) /2;
        this.addChild(this.gameBackGround);
        */
        /**
         * 方案二：世界地图用小图平铺
         */
        //this.gameBackGround = new egret.Bitmap(RES.getRes("bg_jpeg"));
        //this.gameBackGround.fillMode = egret.BitmapFillMode.REPEAT;
        //this.gameBackGround.width = 2000;
        //this.gameBackGround.height = 2540;
        //方案三：世界地图用一张大图
        this.gameBackGround = new egret.Bitmap(RES.getRes("timg_jpg"));
        this.touchEnabled = true;
        this.gameBackGround.x = -(this.gameBackGround.width - GameManager.stage.stageWidth) / 2;
        this.gameBackGround.y = -(this.gameBackGround.height - GameManager.stage.stageHeight) / 2;
        // this.gameBackGround.$setX(0);
        // this.gameBackGround.$setY(0);
        // this.gameBackGround.$setAnchorOffsetX(2136);
        // this.gameBackGround.$setAnchorOffsetY(100);
        this.addChild(this.gameBackGround);
        this.gameStageWidth = this.width;
        this.gameStageHeight = this.height;
        /**
         * 我方球球初始化
         */
        this.myCirArr.push(Circle.produce(this.myWeight, "myCirclr", 16776960, LayerManager.welcome.myCirName));
        if (this.myCirArr.length = 1) {
            this.myCirArr[0].x = GameManager.stage.stageWidth / 2;
            this.myCirArr[0].y = GameManager.stage.stageHeight / 2;
            this.addChild(this.myCirArr[0]);
        }
        else {
        }
        //console.log(GameManager.stage.stageWidth,GameManager.stage.width);
        /**
         * 创建NPC
         */
        this.creatCircle();
        /**
         * 创建浮游物
         */
        this.creatAlgea();
        /**
         * 创建球刺
         */
        this.creatThorn();
        /**
         * 重置我方球球位置
         */
        this.addChildAt(this.myCirArr[0], this.numChildren - 1);
        /**
         * 定时重绘
         *
         */
        this.Timer = new egret.Timer(10);
        this.Timer.addEventListener(egret.TimerEvent.TIMER, this.reGraMyCir, this);
        this.Timer.start();
        this.Timer2 = new egret.Timer(1000);
        this.Timer2.addEventListener(egret.TimerEvent.TIMER, this.reGraBootCir, this);
        this.Timer2.start();
        /**
         * 画面更新
         *
         */
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdata, this);
        /**
         * 外发光初始化
         *
         */
        // var i :　number ;
        // for( i = 0 ; i < this.myCirArr.length; i++){
        //     this.isFilter[i] = true;
        // }
        //将我方球球
    };
    /**
     * 外发光滤镜
     */
    GamePanel.prototype.applyGlowFilter = function (disp) {
        var color = 0x33CCFF;
        var alpha = 0.8;
        var blurX = 35;
        var blurY = 35;
        var strength = 2;
        var quality = 3 /* HIGH */;
        var inner = false;
        var knockout = false;
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        disp.filters = [glowFilter];
    };
    /**
     * 取消外发光
     *
     */
    GamePanel.prototype.cancleGlowFilter = function (disp) {
        var color = 0;
        var alpha = 0;
        var blurX = 0;
        var blurY = 0;
        var strength = 0;
        var quality = 3 /* HIGH */;
        var inner = false;
        var knockout = false;
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        disp.filters = [glowFilter];
    };
    /**
     * 创建NPC
     */
    GamePanel.prototype.creatCircle = function () {
        var nameArr = ["无情的杀手", "作业没做完", "明天又放假", "爱如潮水", "饥不择食", "欠揍的小学生", "冷酷的柯南", "送信的小朋友", "无理取闹的小明", "前端工程师", "微信不可信", "夜尽天明", "秋名山老司机", "周杰伦的双节棍", "可怜的备胎", "要出去打一架么", "甜甜的冰淇淋", "炎热的冬季", "杀马特杀马特", "发光的三极管", "红牛你最牛", "世上只有妈妈好", "吃不完兜着走", "我是一个小狮驼", "吸毒小能手", "信了你的鞋", "那就这样吧", "再爱都无需挣扎", "那就分手吧", "再闻一闻你的长发", "会哭的小鬼头", "肖生克的救赎", "放牛般的春天", "美丽人生", "愿主保佑你", "不是我的错"];
        while (this.bootCirArr.length < this.bootCirNum) {
            var py = Math.floor(Math.random() * (this.gameBackGround.height - this.circleR * 2)) + this.gameBackGround.y;
            var px = Math.floor(Math.random() * (this.gameBackGround.width - this.circleR * 2)) + this.gameBackGround.x;
            var circle = Circle.produce(this.circleWeight, "kind1", 16776960, nameArr[Math.floor(Math.random() * 36)]);
            circle.x = px;
            circle.y = py;
            this.bootCirArr.push(circle);
            this.addChild(circle);
            //给NPC数组进行运动方向初始化
            this.lastX[this.bootCirArr.length - 1] = 1;
            this.lastY[this.bootCirArr.length - 1] = 1;
        }
    };
    /**
     * 创建浮游生物
     */
    GamePanel.prototype.creatAlgea = function () {
        while (this.bootAlgea.length < this.bootAlgeaNum) {
            var py = Math.floor(Math.random() * (this.gameBackGround.height - 10)) + this.gameBackGround.y;
            var px = Math.floor(Math.random() * (this.gameBackGround.width - 10)) + this.gameBackGround.x;
            var algea = Algea.produce(4, this.algeaKindName[Math.floor(Math.random() * this.algeaKindName.length)]);
            algea.x = algea.algeaX = px;
            algea.y = algea.algeaY = py;
            this.addChild(algea);
            this.bootAlgea.push(algea);
        }
    };
    /**
     * 创建球刺
     */
    GamePanel.prototype.creatThorn = function () {
        while (this.bootThorn.length < this.bootThornNum) {
            var py = Math.floor(Math.random() * (this.gameBackGround.height - 10)) + this.gameBackGround.y;
            var px = Math.floor(Math.random() * (this.gameBackGround.width - 10)) + this.gameBackGround.x;
            var thornSize = Math.floor(Math.random() * 10 + 20);
            var thorn = Thorn.produce(thornSize, "circle");
            thorn.x = thorn.thornX = px;
            thorn.y = thorn.thornY = py;
            this.addChild(thorn);
            this.bootThorn.push(thorn);
        }
    };
    /**
     * NPC运动   碰撞检测
     */
    GamePanel.prototype.gameViewUpdata = function (event) {
        var x;
        var y;
        var i;
        var j;
        var cir;
        //小球运动
        for (i = 0; i < this.bootCirArr.length; i++) {
            cir = this.bootCirArr[i];
            var ranx = Math.random();
            var rany = Math.random();
            //较大的概率让小球保持原来的路径行走
            if (ranx >= 0.99)
                this.dirX = true;
            //如果超出边界，马上换个方向
            if ((cir.x - cir.radius) <= this.gameBackGround.x || cir.x >= (this.gameBackGround.x + this.gameBackGround.width - cir.radius))
                this.dirX = true;
            //小球行走
            if (this.dirX) {
                this.lastX[i] = -this.lastX[i];
            }
            //console.log(this.gameBackGround.x,cir.x,)
            if (rany >= 0.99)
                this.dirY = true;
            if (cir.y - cir.radius <= this.gameBackGround.y || cir.y >= (this.gameBackGround.y + this.gameBackGround.height - cir.radius))
                this.dirY = true;
            if (this.dirY) {
                this.lastY[i] = -this.lastY[i];
            }
            //这里决定了NPC的移动速度
            this.lastX[i] *= (1 - (cir.radius - this.circleR) / 10000);
            this.lastY[i] *= (1 - (cir.radius - this.circleR) / 10000);
            cir.x += this.lastX[i];
            cir.y += this.lastY[i];
            this.dirX = this.dirY = false;
            //碰撞检测
            this.gameHitTest();
            //NPC、浮游物重生
            this.reBirth();
            //刷新分数
            var allBulks = 0;
            for (j = 0; j < this.myCirArr.length; j++) {
                //console.log(j + " : " + this.myCirArr[j].bulk);
                allBulks += this.myCirArr[j].weight;
            }
            LayerManager.gameControl.myCirWeight = Math.floor(allBulks);
            LayerManager.gameControl.myCirBulk.text = "当前体积：" + Math.floor((allBulks)) + " kg";
            //小球分裂后会缩放地图
            //ScaleMap.scale(this.myCirArr,this.gameStageWidth, this.gameStageHeight,this.gameBackGround,this.bootCirArr,this.bootAlgea);
            ScaleMap.scale(this.myCirArr, this.gameStageWidth, this.gameStageHeight, this.gameBackGround, this.bootCirArr, this.bootAlgea);
            this.autoMove(LayerManager.game.myCirArr);
            //孢子边界检测
            this.sporeTest();
        }
    };
    /**
     * 碰撞检测
     */
    GamePanel.prototype.gameHitTest = function () {
        var j;
        var k;
        var i;
        var algea;
        var circle;
        var circle2;
        var myCir;
        var thorn;
        var spore;
        //将需要删除的浮游生物
        var delAlgea = [];
        var delCircle = [];
        var delMyCircle = [];
        var delThorn = [];
        var delSpore = [];
        //我方球球可以吃浮游生物
        for (j = 0; j < this.bootAlgea.length; j++) {
            algea = this.bootAlgea[j];
            for (k = 0; k < this.myCirArr.length; k++) {
                myCir = this.myCirArr[k];
                if (GameUtil.hitTest(myCir, algea)) {
                    //console.log("碰撞成功");
                    var disX = myCir.x - (algea.x + algea.distance);
                    var disY = myCir.y - (algea.y + algea.distance);
                    if (Math.sqrt((disX * disX) + (disY * disY)) <= Math.pow(myCir.weight, 1 / 3)) {
                        //将需要删除的浮藻压入删除数组
                        delAlgea.push(algea);
                        //我方球球体积增加
                        if (myCir.weight <= (50 ^ 3))
                            myCir.weight += (100); //浮游生物给求求增加0.1的半径大小
                        else
                            myCir.weight += 100; //减缓增长率
                    }
                }
            }
        }
        //电脑NPC可以吃浮游生物
        for (j = 0; j < this.bootCirArr.length; j++) {
            circle = this.bootCirArr[j];
            for (k = 0; k < this.bootAlgea.length; k++) {
                algea = this.bootAlgea[k];
                if (GameUtil.hitTest(circle, algea)) {
                    var disX = circle.x - (algea.x + algea.distance);
                    var disY = circle.y - (algea.y + algea.distance);
                    if (Math.sqrt((disX * disX) + (disY * disY)) <= Math.pow(circle.weight, 1 / 3)) {
                        //将需要删除的浮藻压入删除数组
                        delAlgea.push(algea);
                        //球球体积增加
                        //circle.bulk += 0.4;
                        circle.weight += 500;
                    }
                }
            }
        }
        //电脑NPC可以吃孢子
        for (j = 0; j < this.bootCirArr.length; j++) {
            circle = this.bootCirArr[j];
            for (k = 0; k < this.mySpornArr.length; k++) {
                spore = this.mySpornArr[k];
                if (GameUtil.hitTest(circle, spore)) {
                    var disX = circle.x - (spore.x + spore.radius);
                    var disY = circle.y - (spore.y + spore.radius);
                    if (Math.sqrt((disX * disX) + (disY * disY)) <= spore.radius) {
                        //将需要删除的浮藻压入删除数组
                        delSpore.push(spore);
                        //球球体积增加
                        //spore.radius +=0.4;
                        circle.weight += 300;
                    }
                }
            }
        }
        //回收浮游生物
        while (delAlgea.length > 0) {
            algea = delAlgea.pop();
            if (algea.isLive == true) {
                this.removeChild(algea);
                this.bootAlgea.splice(this.bootAlgea.indexOf(algea), 1);
                algea.isLive = false;
                Algea.reclaim(algea, algea.algeaName);
            }
        }
        //我方球球和NPC之间可以大吃小
        for (j = 0; j < this.bootCirArr.length; j++) {
            circle = this.bootCirArr[j];
            for (k = 0; k < this.myCirArr.length; k++) {
                myCir = this.myCirArr[k];
                if (GameUtil.hitTest2(myCir, circle)) {
                    var disX = circle.x - myCir.x;
                    var disY = circle.y - myCir.y;
                    var bigCir = myCir.radius > circle.radius ? myCir : circle;
                    //var bigCir : Circle = this.myCirclr.radius > circle.radius ? this.myCirclr : circle;
                    if (Math.sqrt((disX * disX) + (disY * disY)) <= Math.pow(bigCir.weight, 1 / 3)) {
                        if (myCir.weight <= circle.weight) {
                            //这里判断我方小球是否被吃完
                            if (delMyCircle.indexOf(myCir) == -1)
                                delMyCircle.push(myCir);
                            circle.weight += myCir.weight;
                            if (this.myCirArr.length == 1) {
                                this.gameOver();
                            }
                        }
                        else {
                            this.myCirSwallowed += 1;
                            //console.log(Math.sqrt((disX*disX) + (disY*disY)),this.myCirclr.radius);
                            //console.log(this.myCirclr.x,this.myCirclr.y,algea.x,algea.y);
                            //将需要删除的浮藻压入删除数组
                            delCircle.push(circle);
                            //我方球球体积增加
                            if (myCir.weight >= (50 ^ 3)) {
                                myCir.weight += ((circle.weight)); //30为NPC折换比例
                            }
                            else {
                                myCir.weight += (circle.weight); //30为NPC折换比例
                            }
                        }
                    }
                }
            }
        }
        //NPC之间可以互吃
        for (j = 0; j < this.bootCirArr.length; j++) {
            circle = this.bootCirArr[j];
            for (k = 0; k < this.bootCirArr.length; k++) {
                circle2 = this.bootCirArr[k];
                if (j != k) {
                    if (GameUtil.hitTest2(circle, circle2)) {
                        var disX = circle.x - circle2.x;
                        var disY = circle.y - circle2.y;
                        var bigCir = circle.radius > circle2.radius ? circle : circle2;
                        var minCir = circle.radius > circle2.radius ? circle2 : circle;
                        //var bigCir : Circle = this.myCirclr.radius > circle.radius ? this.myCirclr : circle;
                        if (Math.sqrt((disX * disX) + (disY * disY)) <= Math.pow(bigCir.weight, 1 / 3)) {
                            //我方球球体积增加
                            console.log("NPC碰撞");
                            //bigCir.radius += (minCir.radius/5); //30为NPC折换比例
                            //bigCir.bulk += 1;
                            bigCir.weight += minCir.weight;
                            bigCir.swallowed += 1;
                            //将需要删除的浮藻压入删除数组
                            delCircle.push(minCir);
                        }
                    }
                }
            }
        }
        //我方球球之间可以合并 需要开启
        if (LayerManager.gameControl.splitHitTest == true) {
            for (j = 0; j < this.myCirArr.length; j++) {
                circle = this.myCirArr[j];
                for (k = 0; k < this.myCirArr.length; k++) {
                    circle2 = this.myCirArr[k];
                    if (j != k) {
                        if (GameUtil.hitTest2(circle, circle2)) {
                            var disX = circle.x - circle2.x;
                            var disY = circle.y - circle2.y;
                            var bigCir = circle.radius >= circle2.radius ? circle : circle2;
                            var minCir = circle2.radius <= circle.radius ? circle2 : circle;
                            //var bigCir : Circle = this.myCirclr.radius > circle.radius ? this.myCirclr : circle;
                            if (Math.sqrt((disX * disX) + (disY * disY)) <= Math.pow(bigCir.weight, 1 / 3)) {
                                //我方球球体积增加
                                //console.log(bigCir,minCir);
                                console.log("我方球球合并");
                                //分裂时半径对半，扎刺比例应该是4分，当最后一个刺球回归对半回加刚好增加扎刺的总体积
                                if (this.myCirArr.length == 2) {
                                    bigCir.weight += (minCir.weight);
                                }
                                else {
                                    bigCir.weight += (minCir.weight);
                                }
                                //将需要删除的浮藻压入删除数组
                                if (delMyCircle.indexOf(minCir) == -1)
                                    delMyCircle.push(minCir);
                            }
                            //立即回收被合并掉的我方球球   因为这里是我方俩个球球查询，有可能会互换位置
                            while (delMyCircle.length > 0) {
                                circle = delMyCircle.pop();
                                if (circle.isLive == true) {
                                    this.removeChild(circle);
                                    this.myCirArr.splice(this.myCirArr.indexOf(circle), 1);
                                    circle.isLive = false;
                                    if (circle.isLive == false) {
                                        circle.radius = this.circleR;
                                        //circle.skin.width = circle.height = circle.radius*2;
                                        //circle.skin.anchorOffsetX =  circle.radius;
                                        //circle.skin.anchorOffsetY =  circle.radius;
                                        Circle.reclaim(circle, circle.cirName);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //我方球球扎刺
        for (j = 0; j < this.bootThorn.length; j++) {
            thorn = this.bootThorn[j];
            for (k = 0; k < this.myCirArr.length; k++) {
                myCir = this.myCirArr[k];
                if (GameUtil.hitTest2(myCir, thorn)) {
                    var disX = thorn.x - myCir.x;
                    var disY = thorn.y - myCir.y;
                    var bigCir_radius = Math.pow(myCir.weight, 1 / 3) > thorn.radius ? Math.pow(myCir.weight, 1 / 3) : thorn.radius;
                    if (Math.sqrt((disX * disX) + (disY * disY)) <= bigCir_radius) {
                        if (Math.pow(myCir.weight, 1 / 3) < thorn.radius) {
                        }
                        else {
                            //将需要删除的球刺压入删除数组
                            delThorn.push(thorn);
                            //我方球球体积减少
                            //这里改成 刺的体积加到球球里面，然后再进行分裂
                            // myCir.radius -= (myCir.radius/2);
                            // myCir.bulk -= myCir.radius/2;
                            this.splitWeight = (myCir.weight * 2 / 3 + thorn.weight);
                            myCir.weight = (myCir.weight * 1 / 3);
                            //关闭我方球球碰撞检测
                            LayerManager.gameControl.splitHitTest = false;
                            LayerManager.gameControl.spliteHitTimer.start();
                            //添加扎刺分裂
                            var tempThornArr = ThornSplit.splitAction(this.splitWeight, myCir, this);
                            //console.log(this.myCirArr.length);
                            for (i = 0; i < tempThornArr.length; i++) {
                                this.myCirArr.push(tempThornArr[i]);
                            }
                        }
                    }
                }
            }
        }
        //我方球球吃孢子
        if (LayerManager.gameControl.spornHitTest == true) {
            for (j = 0; j < this.mySpornArr.length; j++) {
                spore = this.mySpornArr[j];
                for (k = 0; k < this.myCirArr.length; k++) {
                    myCir = this.myCirArr[k];
                    if (GameUtil.hitTest2(myCir, spore)) {
                        var disX = spore.x - myCir.x;
                        var disY = spore.y - myCir.y;
                        var bigCir_radius = Math.pow(myCir.weight, 1 / 3) > spore.radius ? Math.pow(myCir.weight, 1 / 3) : spore.radius;
                        if (Math.sqrt((disX * disX) + (disY * disY)) <= bigCir_radius) {
                            if (myCir.radius <= 16) {
                            }
                            else {
                                //将需要删除的球刺压入删除数组
                                delSpore.push(spore);
                                //我方球球体积增加
                                if (myCir.weight >= (50 ^ 3)) {
                                    myCir.weight += 300;
                                }
                                else {
                                    myCir.weight += 300;
                                }
                            }
                        }
                    }
                }
            }
        }
        //回收被吃掉的NPC
        while (delCircle.length > 0) {
            circle = delCircle.pop();
            if (circle.isLive == true) {
                this.removeChild(circle);
                this.bootCirArr.splice(this.bootCirArr.indexOf(circle), 1);
                circle.isLive = false;
                if (circle.isLive == false) {
                    circle.weight = this.circleWeight;
                    //circle.radius = this.circleR;
                    Circle.reclaim(circle, circle.cirName);
                }
            }
        }
        //回收被合并掉的我方球球
        while (delMyCircle.length > 0) {
            circle = delMyCircle.pop();
            if (circle.isLive == true) {
                this.removeChild(circle);
                this.myCirArr.splice(this.myCirArr.indexOf(circle), 1);
                circle.isLive = false;
                if (circle.isLive == false) {
                    circle.weight = this.myWeight;
                    //circle.radius = this.circleR;
                    //circle.skin.width = circle.height = circle.radius*2;
                    //circle.skin.anchorOffsetX =  circle.radius;
                    //circle.skin.anchorOffsetY =  circle.radius;
                    Circle.reclaim(circle, circle.cirName);
                }
            }
        }
        //回收被扎掉的球刺
        while (delThorn.length > 0) {
            thorn = delThorn.pop();
            if (thorn.isLive == true) {
                this.removeChild(thorn);
                this.bootThorn.splice(this.bootThorn.indexOf(thorn), 1);
                thorn.isLive = false;
                if (thorn.isLive == false) {
                    //thorn.radius = this.circleR;
                    Thorn.reclaim(thorn, thorn.thornName);
                }
            }
        }
        //回收被吃掉的孢子
        while (delSpore.length > 0) {
            spore = delSpore.pop();
            if (spore.isLive == true) {
                this.removeChild(spore);
                this.mySpornArr.splice(this.mySpornArr.indexOf(spore), 1);
                spore.isLive = false;
                if (spore.isLive == false) {
                    //thorn.radius = this.circleR;
                    Spore.reclaim(spore, spore.color);
                }
            }
        }
    };
    //回收掉的球球、浮游生物重生
    GamePanel.prototype.reBirth = function () {
        this.creatCircle();
        this.creatAlgea();
        this.creatThorn();
        //对数组重新排序
        //this.addChildAt(this.myCirclr,this.numChildren -1);
    };
    /**
     * 我方球球、NPC、浮游物重绘以及世界地图缩放
     *
     */
    // private reGraMyCir(){
    //                     //console.log("当前球球数量：" + this.myCirArr.length);
    //                     console.log("--------------------" + LayerManager.game.myCirArr.length +"个-----------------------");
    //     var i : number ;
    //     var j : number ;
    //     var circle : Circle;
    //     var algea : Algea;
    //     var myCir : Circle;
    //     var coreX : number ;
    //     var coreY : number ;
    //     var maxRadius : number = 0;
    //     //计算我方球球最大半径
    //     for( i = 0 ; i < this.myCirArr.length; i++){
    //         if(this.myCirArr[i].radius > maxRadius)
    //              maxRadius = this.myCirArr[i].radius;
    //     }
    //     for( i = 0 ; i< this.myCirArr.length; i++){
    //         if(this.myCirArr[i].cacheWeight >= 1 && this.myCirArr[i].cacheWeight < 30){
    //             this.myCirArr[i].weight += 1;
    //             this.myCirArr[i].cacheWeight -= 1;
    //         }
    //         if(this.myCirArr[i].cacheWeight >= 30 && this.myCirArr[i].cacheWeight < 90){
    //             this.myCirArr[i].weight += 30;
    //             this.myCirArr[i].cacheWeight -= 30;
    //         }
    //         if(this.myCirArr[i].cacheWeight >= 90 && this.myCirArr[i].cacheWeight < 500){
    //             this.myCirArr[i].weight += 89;
    //             this.myCirArr[i].cacheWeight -= 89;
    //         }
    //         if(this.myCirArr[i].cacheWeight >= 500 && this.myCirArr[i].cacheWeight < 2000){
    //             this.myCirArr[i].weight += 200;
    //             this.myCirArr[i].cacheWeight -= 200;
    //         }
    //         if(this.myCirArr[i].cacheWeight >= 2000 && this.myCirArr[i].cacheWeight < 20000){
    //             this.myCirArr[i].weight += 500;
    //             this.myCirArr[i].cacheWeight -= 500;
    //         }
    //         if(this.myCirArr[i].cacheWeight >= 20000){
    //             this.myCirArr[i].weight += 1000;
    //             this.myCirArr[i].cacheWeight -= 1000;
    //         }
    //     }
    //     for( j = 0; j < this.myCirArr.length; j++){
    //         myCir = this.myCirArr[j];
    //         //我方球球与npc重绘
    //         if(myCir.radius <50){
    //             myCir.radius = Math.pow(myCir.weight,1/3);
    //             if(myCir.skinName == "form2_png")
    //             {
    //                 myCir.removeChild(myCir.skin);
    //                 myCir.skin = new egret.Bitmap(RES.getRes("form1_png"));
    //                 myCir.skinName = "form1_png";
    //                 // myCir.addChild(myCir.skin);
    //                 myCir.addChildAt(myCir.skin,myCir.numChildren - 1);                    
    //             }
    //             myCir.skin.anchorOffsetX =  myCir.radius;
    //             myCir.skin.anchorOffsetY =  myCir.radius;
    //             myCir.skin.width = myCir.skin.height = myCir.radius*2;
    //             //console.log("皮肤大小：" + myCir.skin.width/2);
    //             myCir.shape.graphics.clear();
    //             myCir.shape.graphics.beginFill(myCir.color);
    //             myCir.shape.graphics.drawCircle(0,0,myCir.radius);
    //             myCir.shape.graphics.endFill();
    //             //console.log("球球半径："  + myCir.radius);
    //             if(myCir.weight > (25^3) && myCir.isFilter == false){
    //                 myCir.isFilter = true;
    //                 this.applyGlowFilter(myCir);
    //             }
    //             if(myCir.radius < (25^3) && myCir.isFilter == true){
    //                 myCir.isFilter = false;
    //                 //取消外发光这种用法是否正确待测试
    //                 this.cancleGlowFilter(myCir);                
    //             }
    //         }
    //          else{
    //         //     //我方小球增长变缓，世界地图开始缩放，NPC与浮游生物也进行缩放并重新定位
    //         //     //我方球球体积增加
    //         //     myCir.shape.graphics.beginFill(myCir.color);
    //         //     myCir.shape.graphics.drawCircle(0,0, myCir.radius);
    //         //     myCir.shape.graphics.endFill();
    //             if(myCir.skinName == "form1_png"){
    //                 myCir.removeChild(myCir.skin);
    //                 myCir.skin = new egret.Bitmap(RES.getRes("form2_png"));
    //                 myCir.skinName = "form2_png";
    //                 //myCir.addChild(myCir.skin);
    //                 myCir.addChildAt(myCir.skin,myCir.numChildren-1)
    //             }
    //             myCir.skin.anchorOffsetX =  myCir.radius;
    //             myCir.skin.anchorOffsetY =  myCir.radius;
    //             myCir.skin.width = myCir.skin.height = myCir.radius*2;
    //             //console.log("皮肤大小：" + myCir.skin.width/2);
    //             myCir.shape.graphics.clear();
    //             myCir.shape.graphics.beginFill(myCir.color);
    //             myCir.shape.graphics.drawCircle(0,0,myCir.radius);
    //             myCir.shape.graphics.endFill();
    //         //     myCir.skin.anchorOffsetX =  myCir.radius;
    //         //     myCir.skin.anchorOffsetY =  myCir.radius;
    //         //     myCir.skin.width = myCir.skin.height = myCir.radius*2;
    //         //     //this.gameBackGround.scaleX = 1 - this.scanlBase;
    //         //     //this.gameBackGround.scaleY = 1 - this.scanlBase;
    //         //     //地图缩放与重定位
    //         //     this.lastWidth =  this.width ;
    //         //     this.lastHeight = this.height;
    //         //     //浮游物根据此世界地图中心点判别在那个区域，因为是按照变化前的中心点来判断，必须放在这次舞台变化前
    //         //     //coreX = this.gameBackGround.x + this.gameBackGround.width/2;
    //         //     //coreY = this.gameBackGround.y + this.gameBackGround.height/2;
    //         //     this.width = this.width*(1 - (maxRadius - this.lastEatAlgea)/1000);
    //         //     this.height = this.height * (1 - (maxRadius - this.lastEatAlgea)/1000);
    //         //     if((maxRadius - this.lastEatAlgea) >= 0){
    //         //         this.x += (this.lastWidth - this.width)/2;
    //         //         this.y += (this.lastHeight - this.height)/2;
    //         //     }
    //         //     if((maxRadius - this.lastEatAlgea) < 0){
    //         //         this.x -= (this.lastWidth - this.width)/2;
    //         //         this.y -= (this.lastHeight - this.height)/2;
    //         //     }
    //         }
    //     }
    //     this.lastEatAlgea = maxRadius;
    // }
    /**
     * 使用缩放来代替重绘
     *
     */
    GamePanel.prototype.reGraMyCir = function () {
        //console.log("当前球球数量：" + this.myCirArr.length);
        //console.log("--------------------" + LayerManager.game.myCirArr.length +"个-----------------------");
        var i;
        var j;
        var circle;
        var algea;
        var myCir;
        var coreX;
        var coreY;
        var maxRadius = 0;
        var scaleMulX = 1;
        var scaleMulY = 1;
        //计算我方球球最大半径
        for (i = 0; i < this.myCirArr.length; i++) {
            if (this.myCirArr[i].radius > maxRadius)
                maxRadius = this.myCirArr[i].radius;
        }
        // for( i = 0 ; i< this.myCirArr.length; i++){
        //     if(this.myCirArr[i].cacheWeight >= 1 && this.myCirArr[i].cacheWeight < 30){
        //         this.myCirArr[i].weight += 1;
        //         this.myCirArr[i].cacheWeight -= 1;
        //     }
        //     if(this.myCirArr[i].cacheWeight >= 30 && this.myCirArr[i].cacheWeight < 90){
        //         this.myCirArr[i].weight += 30;
        //         this.myCirArr[i].cacheWeight -= 30;
        //     }
        //     if(this.myCirArr[i].cacheWeight >= 90 && this.myCirArr[i].cacheWeight < 500){
        //         this.myCirArr[i].weight += 89;
        //         this.myCirArr[i].cacheWeight -= 89;
        //     }
        //     if(this.myCirArr[i].cacheWeight >= 500 && this.myCirArr[i].cacheWeight < 2000){
        //         this.myCirArr[i].weight += 200;
        //         this.myCirArr[i].cacheWeight -= 200;
        //     }
        //     if(this.myCirArr[i].cacheWeight >= 2000 && this.myCirArr[i].cacheWeight < 20000){
        //         this.myCirArr[i].weight += 500;
        //         this.myCirArr[i].cacheWeight -= 500;
        //     }
        //     if(this.myCirArr[i].cacheWeight >= 20000){
        //         this.myCirArr[i].weight += 1000;
        //         this.myCirArr[i].cacheWeight -= 1000;
        //     }
        // }
        for (j = 0; j < this.myCirArr.length; j++) {
            myCir = this.myCirArr[j];
            console.log(myCir.radius, Math.pow(myCir.weight, 1 / 3));
            //我方球球与npc重绘
            if (myCir.weight < 50 * 50 * 50) {
                myCir.radius = Math.pow(myCir.weight, 1 / 3);
                // if(myCir.skinName == "form2_png")
                // {
                //     myCir.removeChild(myCir.skin);
                //     myCir.skin = new egret.Bitmap(RES.getRes("form1_png"));
                //     myCir.skinName = "form1_png";
                //     // myCir.addChild(myCir.skin);
                //     myCir.addChildAt(myCir.skin,myCir.numChildren - 1);
                // }
                // myCir.skin.anchorOffsetX =  myCir.radius;
                // myCir.skin.anchorOffsetY =  myCir.radius;
                // myCir.skin.width = myCir.skin.height = myCir.radius;
                //console.log("皮肤大小：" + myCir.skin.width/2);
                // myCir.shape.graphics.clear();
                // myCir.shape.graphics.beginFill(myCir.color);
                // myCir.shape.graphics.drawCircle(0,0,myCir.radius);
                // myCir.shape.graphics.endFill();
                scaleMulX = scaleMulY = Math.pow(myCir.weight, 1 / 3) / Math.pow(this.myWeight, 1 / 3);
                console.log(scaleMulX);
                egret.Tween.get(myCir).to({ "scaleX": scaleMulX, "scaleY": scaleMulY }, 300);
                //console.log("球球半径："  + myCir.radius);
                if (myCir.weight > (25 ^ 3) && myCir.isFilter == false) {
                    myCir.isFilter = true;
                    this.applyGlowFilter(myCir);
                }
                if (myCir.radius < (25 ^ 3) && myCir.isFilter == true) {
                    myCir.isFilter = false;
                    //取消外发光这种用法是否正确待测试
                    this.cancleGlowFilter(myCir);
                }
            }
            else {
                myCir.radius = Math.pow(myCir.weight, 1 / 3);
                //     //我方小球增长变缓，世界地图开始缩放，NPC与浮游生物也进行缩放并重新定位
                //     //我方球球体积增加
                //     myCir.shape.graphics.beginFill(myCir.color);
                //     myCir.shape.graphics.drawCircle(0,0, myCir.radius);
                //     myCir.shape.graphics.endFill();
                // if(myCir.skinName == "form1_png"){
                //     myCir.removeChild(myCir.skin);
                //     myCir.skin = new egret.Bitmap(RES.getRes("form2_png"));
                //     myCir.skinName = "form2_png";
                //     //myCir.addChild(myCir.skin);
                //     myCir.addChildAt(myCir.skin,myCir.numChildren-1)
                // }
                // myCir.skin.anchorOffsetX =  myCir.radius;
                // myCir.skin.anchorOffsetY =  myCir.radius;
                // myCir.skin.width = myCir.skin.height = myCir.radius;
                //console.log("皮肤大小：" + myCir.skin.width/2);
                scaleMulX = scaleMulY = Math.pow(myCir.weight, 1 / 3) / Math.pow(this.myWeight, 1 / 3);
                egret.Tween.get(myCir).to({ "scaleX": scaleMulX, "scaleY": scaleMulY }, 300);
            }
        }
        this.lastEatAlgea = maxRadius;
    };
    GamePanel.prototype.reGraBootCir = function () {
        var circle;
        var tempCir;
        var scaleMulX = 1;
        var scaleMulY = 1;
        var i;
        var j;
        for (i = 0; i < this.bootCirArr.length; i++) {
            circle = this.bootCirArr[i];
            scaleMulX = scaleMulY = Math.pow(circle.weight, 1 / 3) / Math.pow(this.circleWeight, 1 / 3);
            // circle.shape.graphics.beginFill(circle.color);
            // circle.shape.graphics.drawCircle(0,0,circle.radius);
            // circle.shape.graphics.endFill();
            egret.Tween.get(circle).to({ "scaleX": scaleMulX, "scaleY": scaleMulY }, 300);
            //初始化排序数组
            this.sortingArr.push(this.bootCirArr[i]);
        }
        //重新排序
        for (i = 0; i < this.sortingArr.length - 1; i++) {
            for (j = 0; j < this.sortingArr.length - i - 1; j++) {
                if (this.sortingArr[j].weight < this.sortingArr[j + 1].weight) {
                    tempCir = this.sortingArr[j];
                    this.sortingArr[j] = this.sortingArr[j + 1];
                    this.sortingArr[j + 1] = tempCir;
                }
            }
        }
        //重新刷新排行榜
        LayerManager.gameControl.NO2.text = "2   " + this.sortingArr[0].name;
        LayerManager.gameControl.NO3.text = "3   " + this.sortingArr[1].name;
        LayerManager.gameControl.NO4.text = "4   " + this.sortingArr[2].name;
        LayerManager.gameControl.NO5.text = "5   " + this.sortingArr[3].name;
        LayerManager.gameControl.NO6.text = "6   " + this.sortingArr[4].name;
        LayerManager.gameControl.NO7.text = "7   " + this.sortingArr[5].name;
        LayerManager.gameControl.NO8.text = "8   " + this.sortingArr[6].name;
        LayerManager.gameControl.NO9.text = "9   " + this.sortingArr[7].name;
        LayerManager.gameControl.NO10.text = "10   " + this.sortingArr[8].name;
        //console.log(LayerManager.gameControl.NO2.text = "2   " + this.sortingArr[0].name;
        //清空排名数组
        this.sortingArr = [];
    };
    /**
     * 游戏结束
     */
    GamePanel.prototype.gameOver = function () {
        //console.log("游戏结束");
        //console.log(this);
        //回收屏幕上对象
        var i;
        if (this.parent != null) {
            var algea;
            var circle;
            var thorn;
            while (this.bootAlgea.length > 0) {
                algea = this.bootAlgea.pop();
                this.removeChild(algea);
                this.bootAlgea.splice(this.bootAlgea.indexOf(algea), 1);
                Algea.reclaim(algea, algea.algeaName);
            }
            while (this.bootCirArr.length > 0) {
                circle = this.bootCirArr.pop();
                if (circle.isLive == true) {
                    this.removeChild(circle);
                    this.bootCirArr.splice(this.bootCirArr.indexOf(circle), 1);
                    circle.isLive = false;
                    Circle.reclaim(circle, circle.cirName);
                }
            }
            while (this.myCirArr.length > 0) {
                circle = this.myCirArr.pop();
                if (circle.isLive == true) {
                    this.removeChild(circle);
                    this.myCirArr.splice(this.myCirArr.indexOf(circle), 1);
                    circle.isLive = false;
                    Circle.reclaim(circle, circle.cirName);
                }
            }
            while (this.bootThorn.length > 0) {
                thorn = this.bootThorn.pop();
                if (thorn.isLive == true) {
                    this.removeChild(thorn);
                    this.bootThorn.splice(this.bootThorn.indexOf(thorn), 1);
                    thorn.isLive = false;
                    Thorn.reclaim(thorn, thorn.thornName);
                }
            }
            this.cacheRadius = 0;
            this.sortingArr = [];
            //移除对象、侦听器
            // this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouch,this);
            // this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
            //this.removeEventListener(egret.Event.ENTER_FRAME,this.move,this);
            this.Timer.stop();
            this.Timer.removeEventListener(egret.TimerEvent.TIMER, this.reGraMyCir, this);
            this.Timer2.stop();
            this.Timer2.removeEventListener(egret.TimerEvent.TIMER, this.reGraBootCir, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdata, this);
            //删除游戏控制盘和分裂按钮
            LayerManager.gameControl.removeControl();
            //添加游戏结束面板
            //LayerManager.gameLayer.removeChild(this);
            //var gameOver : GameOverPanel = new GameOverPanel;
            //LayerManager.gameLayer.addChild(gameOver);
            console.log("游戏结束");
        }
    };
    GamePanel.prototype.autoMove = function (circle) {
        var i;
        this.transX = -ScaleMap.tempNumX + 400;
        this.transY = -ScaleMap.tempNumY + 240;
        for (i = 0; i < circle.length; i++) {
            //console.log(circle[i].x,circle[i].y);
            if (circle[i].x > this.transX && circle[i].y < this.transY) {
                circle[i].x -= 0.04;
                circle[i].y += 0.04;
            }
            if (circle[i].x < this.transX && circle[i].y < this.transY) {
                circle[i].x += 0.04;
                circle[i].y += 0.04;
            }
            if (circle[i].x < this.transX && circle[i].y > this.transY) {
                circle[i].x += 0.04;
                circle[i].y -= 0.04;
            }
            if (circle[i].x > this.transX && circle[i].y > this.transY) {
                circle[i].x -= 0.04;
                circle[i].y -= 0.04;
            }
        }
    };
    GamePanel.prototype.sporeTest = function () {
        var i;
        var spore;
        var cir;
        for (i = 0; i < this.mySpornArr.length; i++) {
            spore = this.mySpornArr[i];
            if (spore.x + spore.radius >= LayerManager.game.gameBackGround.width + LayerManager.game.gameBackGround.x) {
                egret.Tween.removeTweens(spore);
                spore.x = LayerManager.game.gameBackGround.width + LayerManager.game.gameBackGround.x - spore.radius;
            }
            if (spore.y - spore.radius <= LayerManager.game.gameBackGround.y) {
                egret.Tween.removeTweens(spore);
                spore.y = LayerManager.game.gameBackGround.y + spore.radius;
            }
            if (spore.x - spore.radius <= LayerManager.game.gameBackGround.x) {
                egret.Tween.removeTweens(spore);
                spore.x = LayerManager.game.gameBackGround.x + spore.radius;
            }
            if (spore.y + spore.radius >= LayerManager.game.gameBackGround.height + LayerManager.game.gameBackGround.y) {
                egret.Tween.removeTweens(spore);
                spore.y = LayerManager.game.gameBackGround.height + LayerManager.game.gameBackGround.y - spore.radius;
            }
        }
        for (i = 0; i < this.myCirArr.length; i++) {
            cir = this.myCirArr[i];
            if (cir.x + cir.radius >= LayerManager.game.gameBackGround.width + LayerManager.game.gameBackGround.x) {
                egret.Tween.removeTweens(cir);
                cir.x = LayerManager.game.gameBackGround.width + LayerManager.game.gameBackGround.x - cir.radius;
            }
            if (cir.y - cir.radius <= LayerManager.game.gameBackGround.y) {
                egret.Tween.removeTweens(cir);
                cir.y = LayerManager.game.gameBackGround.y + cir.radius;
            }
            if (cir.x - cir.radius <= LayerManager.game.gameBackGround.x) {
                egret.Tween.removeTweens(cir);
                cir.x = LayerManager.game.gameBackGround.x + cir.radius;
            }
            if (cir.y + cir.radius >= LayerManager.game.gameBackGround.height + LayerManager.game.gameBackGround.y) {
                egret.Tween.removeTweens(cir);
                cir.y = LayerManager.game.gameBackGround.height + LayerManager.game.gameBackGround.y - cir.radius;
            }
        }
    };
    return GamePanel;
}(egret.DisplayObjectContainer));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map