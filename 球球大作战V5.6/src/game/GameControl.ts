// TypeScript file

class GameControl extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        this.init();
    }

    //控制面板区
    public control_bg : egret.Shape;
    //控制点
    public control_ball : egret.Shape;

    //控制盘与控制点定位坐标
    public control_X : number;
    public control_Y : number;

    //控制点flag
    public controlFlag : boolean = false;

    //控制盘大小
    private conBgSize : number = 50;

    //世界地图边缘碰撞检测标志
    private mapRightFlag : boolean[] = [false];

    private mapLeftFlag : boolean[] = [false];

    private mapTopFlag : boolean[] = [false];

    private mapBottomFlag : boolean[] = [false];

    //我方球球体积
    public myCirBulk : egret.TextField ;
    public myCirWeight : number;

    //分裂控制区
    private splitArea : egret.Shape;

    private myCirArr : Circle[] = LayerManager.game.myCirArr;

    public X : number;
    public Y : number;

    private gameBackGround : egret.Bitmap = LayerManager.game.gameBackGround;

    private bootAlgea : Algea[] = LayerManager.game.bootAlgea;

    private bootCirArr : Circle[] = LayerManager.game.bootCirArr;

    private bootThorn : Thorn[] = LayerManager.game.bootThorn;

    private mySporeArr : Spore[] = LayerManager.game.mySpornArr;

    //我方球球碰撞检测在分裂时期是否开启（正常情况： 分裂的时候不开启碰撞检测）

    public splitHitTest : boolean = true;
    public spliteHitTimer : egret.Timer;

    public spornHitTest : boolean = true;
    public spornHitTimer : egret.Timer;

    public offsetLocalX : number = 0 ;

    public offsetLocalY : number = 0;

    //吐孢子按钮去
    private spornArea : egret.Shape;


    //排行榜区域
    private rankingArea : egret.Shape;


    //排行榜各名字
    public NO1 : egret.TextField;

    public NO2 : egret.TextField;

    public NO3 : egret.TextField;

    public NO4 : egret.TextField;

    public NO5 : egret.TextField;

    public NO6 : egret.TextField;

    public NO7 : egret.TextField;

    public NO8 : egret.TextField;

    public NO9 : egret.TextField;

    public NO10 : egret.TextField;

    //名字容器
    public rankingArr : string[] = [] ;

    //倒计时文本
    public timeText : egret.TextField;

    //游戏时间
    private timeTotal : number  = 180;  

    //倒计时定时器
    private gameTimer : egret.Timer;

    private init(){



        /**
         * 初始化控制盘
         */
        this.control_bg = new egret.Shape();
        this.control_bg.graphics.beginFill(0xffffff,0.2);
        this.control_bg.graphics.drawCircle(0,0,this.conBgSize);
        this.control_bg.graphics.endFill();
        //this.con_bg.anchorOffsetX = 50;
        //this.con_bg.anchorOffsetY = 50;
        //this.control_bg.x = 120;
        //this.control_bg.y = 360;
        this.control_bg.touchEnabled = true;
        //this.addChild(this.control_bg);

        /**
         * 初始化控制点
         */

        this.control_ball = new egret.Shape();
        this.control_ball.graphics.beginFill(0xff0011,0.5);
        this.control_ball.graphics.drawCircle(0,0,15);
        this.control_ball.graphics.endFill();
        //this.con_ball.anchorOffsetX = 7.5;
        //this.con_ball.anchorOffsetY = 7.5;
        //this.control_ball.x = 120;
        //this.control_ball.y = 360;
        //this.addChild(this.control_ball);

        /**
         * 控制盘侦听
         */

        LayerManager.game.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouch,this);
        LayerManager.game.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);

        /**
         * 创建分数区
         */

        this.myCirBulk = new egret.TextField();
        this.myCirBulk.text = "当前体积：";
        this.myCirBulk.textColor = 0xffffff;
        this.myCirBulk.size = 12;
        this.myCirBulk.x = GameManager.stage.stageWidth /2 - 350;
        this.myCirBulk.y = GameManager.stage.stageHeight /2 - 230; 
        this.addChild(this.myCirBulk);

        /**
         * 创建分裂按钮
         * 
         */

        this.splitArea = new egret.Shape();
        this.splitArea.graphics.beginFill(0xffffff,0.2);
        this.splitArea.graphics.drawCircle(0,0,25);
        this.splitArea.graphics.endFill();
        this.splitArea.x = GameManager.stage.$stageWidth -160;
        this.splitArea.y = GameManager.stage.$stageHeight - 45;
        this.splitArea.touchEnabled = true;
        this.addChild(this.splitArea);

        this.splitArea.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSplit,this);


        /**
         * 创建吐孢子按钮
         * 
         */
        this.spornArea = new egret.Shape();
        this.spornArea.graphics.beginFill(0xffffff,0.2);
        this.spornArea.graphics.drawCircle(0,0,30);
        this.spornArea.graphics.endFill();
        this.spornArea.x = GameManager.stage.$stageWidth - 90;
        this.spornArea.y = GameManager.stage.$stageHeight - 50;
        this.spornArea.touchEnabled = true;
        this.addChild(this.spornArea);

        this.spornArea.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSpore,this);


        /**
         * 创建排行榜区
         * 
         */
        
        this.rankingArea = new egret.Shape();
        this.rankingArea.graphics.beginFill(0x000000,0.2);
        this.rankingArea.graphics.drawRect(0,0,150,160);
        this.rankingArea.graphics.endFill();
        this.rankingArea.x = 650;
        this.addChild(this.rankingArea);

        

        //名字初始化
        var j : number = 0;
        this.NO1 = this.initName(this.NO1);
        this.NO2 = this.initName(this.NO2);
        this.NO3 = this.initName(this.NO3);
        this.NO4 = this.initName(this.NO4);

        this.NO5 = this.initName(this.NO5);
        this.NO6 = this.initName(this.NO6);
        this.NO7 = this.initName(this.NO7);
        this.NO8 = this.initName(this.NO8);

        this.NO9 = this.initName(this.NO9);
        this.NO10 = this.initName(this.NO10);
        



        /**
         * 名字容器赋值，分配到排行榜
         * 
         */
        
        var i : number = 0 ;
        for( i = 0 ; i < 10; i++){
            if( i  == 0 ){
                this.rankingArr.push(LayerManager.welcome.myCirName);
            }
            else{
                if(LayerManager.game.bootCirArr[i - 1].name != undefined)
                this.rankingArr.push(LayerManager.game.bootCirArr[i - 1].name);
            }
        }

        this.NO1.text = "1   " + this.rankingArr[0];
        this.NO1.x = 670;
        this.NO1.y = 5;

        this.NO2.text = "2   " + this.rankingArr[1];
        this.NO2.x = 670;
        this.NO2.y = 20;

        this.NO3.text = "3   " + this.rankingArr[2];
        this.NO3.x = 670;
        this.NO3.y = 35;

        this.NO4.text = "4   " + this.rankingArr[3];
        this.NO4.x = 670;
        this.NO4.y = 50;

        this.NO5.text = "5   " + this.rankingArr[4];
        this.NO5.x = 670;
        this.NO5.y = 65;

        this.NO6.text = "6   " + this.rankingArr[5];
        this.NO6.x = 670;
        this.NO6.y = 80;

        this.NO7.text = "7   " + this.rankingArr[6];
        this.NO7.x = 670;
        this.NO7.y = 95;

        this.NO8.text = "8   " + this.rankingArr[7];
        this.NO8.x = 670;
        this.NO8.y = 110;

        this.NO9.text = "9   " + this.rankingArr[8];
        this.NO9.x = 670;
        this.NO9.y = 125;

        this.NO10.text = "10   " + this.rankingArr[9];
        this.NO10.x = 662;
        this.NO10.y = 140;

        /**
         *定时解除我方球球碰撞
         *
         */



        this.spliteHitTimer = new egret.Timer(600,1);

        this.spliteHitTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.changeSplitStatus,this); //定时将在点击分裂按钮后开启，功能是将碰撞检测重新打开

        /**
         * 
         * 定时解除我方孢子碰撞
         * 
         */

        this.spornHitTimer = new egret.Timer(500,1);
        this.spornHitTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.changeSpornStatus,this);

        /**
         * 
         * 初始化游戏时长显示文本
         * 
         */

        this.timeText = new egret.TextField();
        this.timeText.text = this.changeTime();
        this.timeText.textColor = 0xffffff;
        this.timeText.size = 16;
        this.timeText.x = 400 - this.timeText.width/2;
        this.timeText.y = 10;
        //console.log(this.timeText.text);
        this.addChild(this.timeText);

        /**
         * 初始化游戏时长
         */

        this.gameTimer = new egret.Timer(1000,this.timeTotal);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onRefresh,this);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.gameover,this);
        this.gameTimer.start();

    }



    /**
     * 
     * 游戏时长转换
     * 
     */
    private changeTime(): string{

      var second =   this.timeTotal%60;
      var min = parseInt((this.timeTotal/60).toString());
      var resultTimeText : string;
      if(min < 10 && second < 10){
          resultTimeText = "0" + min + ":" + "0" + second;   
      }
      else if(min < 10 && second >= 10){
          resultTimeText = "0" + min + ":" + second;
      }
      else if(min >= 10 && second < 10){
          resultTimeText =  min + ":" + "0" + second;
      }

    //  console.log(typeof(second));
    //  console.log(second);
    
      return resultTimeText;

    }


    /**
     * 
     * 每秒刷新剩余时间
     * 
     */

    private onRefresh(){
        this.timeTotal -= 1;
        //console.log(this.timeTotal);
        this.timeText.text = this.changeTime();
    }

    /**
     * 时间到游戏结束
     * 
     */
    private gameover(){
       LayerManager.onTouch2(); 
    }

    /**
     * 
     * 名字初始化工厂
     * 
     */
    private initName(needInitName : egret.TextField): egret.TextField{
        needInitName = new egret.TextField();
        // needInitName.text = "当前体积：";
        needInitName.textColor = 0xffffff;
        needInitName.size = 14;
        // needInitName.x = GameManager.stage.stageWidth /2 - 200;
        // needInitName.y = GameManager.stage.stageHeight /2 - 230; 
        this.addChild(needInitName);
        return needInitName;
    }


    /**
     * 碰撞检测开关
     * 
     */
    private changeSplitStatus(){
        this.splitHitTest = true;
        this.spliteHitTimer.stop();
    }


    /**
     * 另外一个开关
     * 
     */
    private changeSpornStatus(){
        this.spornHitTest = true;
        this.spornHitTimer.stop();
    }


    /**
     * 我方球球位移由控制点控制
     * 
     */

    private move(event:egret.TouchEvent){


        var stance : number = 3;//步长

        var j : number;
        var i : number ;
        var cir : Circle;
        var algea : Algea;
        var myCir : Circle;
        var thorn : Thorn;
        var spore : Spore;

        //重绘、缩放与位移都需要判定最大的球球
        var maxRadius : number = 0; 


        for(j = 0 ; j < this.myCirArr.length ; j++ ){
            //由每个小球来确定自己的速度
            //this.myCirArr[j].stance = this.myCirArr[j].speed * (1- (this.myCirArr[j].radius - this.myCirR)/1000);
            this.myCirArr[j].stance = 0.8 * (15 / this.myCirArr[j].radius) //半径约小，速度越大
            if(this.myCirArr[j].radius > maxRadius){
                maxRadius = this.myCirArr[j].radius;
                myCir = this.myCirArr[j];
            }

        }


        //更新每个球球的边界flag
        this.mapHitTest(this.myCirArr);

            /**
             * 世界地图的移速是以我方最大的小球的移速决定
             * 其余移速慢的小球不靠世界地图位移来展示
             * 而是有小球自己运动叠加运动效果来显示较快的移速
             * 
             */

            //console.log(this.X,this.Y,this.control_X,this.control_Y)

            //通过判断控制盘的坐标，来操作我的小球的运动方向
            if(this.X > this.control_X && this.Y < this.control_Y)
            {   
                //判断我方球球任意一个小球是否出世界地图
                if(this.returnResult("right",this.myCirArr))
                {   

                    //我方球球不动  触碰的那个小球不动
                    //this.gameBackGround.x = - (this.gameBackGround.width - GameManager.stage.stageWidth /2 - myCir.radius);
                    //其他的小球继续运动，并且是小球运动，而不是世界地图运动
                    //我方最大球球移动  地图移动

                    //检测出已碰到边界的小球，不予操作（不动），其他小球则运动（世界地图停止运动，小球运动，最大球根据stance，小球根据自己的stance）

                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapRightFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * ( stance );
                            else 
                                this.myCirArr[i].x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }

                }
                else
                {
                    //我方所有小球移动 
                    this.gameBackGround.x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;

                    //除最大球之外，小球相对于摄像机也在移动
                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }

                    //改成世界地图容器移动，地图、浮游物、刺、NPC都不需单独移动，但是我方球球不需要移动，因为移动容器就是想让我方球球看起来在移动，所以这里因该在容器移动的基础再反方向移动，这样球球其实就是不动的
                    //for( j  = 0 ; j < this.myCirArr.length ; j ++){
                    //        this.myCirArr[j].x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                    //}
                    
                    //NPC球球移动  当NPC和世界地图以相同的速度、方向运动时，看起来只有我的小球在运动
                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    //浮游物移动
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.x = algea.algeaX = algea.x - Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    //球刺移动
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.x  -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                }


                if(this.returnResult("top",this.myCirArr))
                {
                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapTopFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * ( stance );
                            else 
                                this.myCirArr[i].y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }
                    
                }
                else
                {
                    //世界地图移动，除最大球之外，小球相对于摄像机运动
                    this.gameBackGround.y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    //
                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }

                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.y = algea.algeaY = algea.y - Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.y  -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                }

            }


            if(this.X > this.control_X && this.Y > this.control_Y)
            {   
                if(this.returnResult("right",this.myCirArr))
                {   
                    //我方球球不动  触碰的那个小球不动
                    //this.gameBackGround.x = - (this.gameBackGround.width - GameManager.stage.stageWidth /2 - myCir.radius);
                    //其他的小球继续运动，并且是小球运动，而不是世界地图运动
                    //我方最大球球移动  地图移动

                    //检测出已碰到边界的小球，不予操作（不动），其他小球则运动（世界地图停止运动，小球运动，最大球根据stance，小球根据自己的stance）

                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapRightFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * (stance );
                            else 
                                this.myCirArr[i].x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }

                }
                else
                {

                    //我方所有小球移动 
                    this.gameBackGround.x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;

                    //除最大球之外，小球相对于摄像机也在移动
                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }
                    //NPC球球移动  当NPC和世界地图以相同的速度、方向运动时，看起来只有我的小球在运动
                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    //浮游物移动
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.x = algea.algeaX = algea.x - Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.x  -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                }


                if(this.returnResult("bottom",this.myCirArr))
                {
                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapBottomFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * ( stance );
                            else 
                                this.myCirArr[i].y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }
                }
                else 
                {
                    this.gameBackGround.y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    //
                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.y = algea.algeaY = algea.y - Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.y  -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                }

            }

            if(this.X < this.control_X && this.Y < this.control_Y)
            {
                if(this.returnResult("left",this.myCirArr))
                {
                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapLeftFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * (  stance );
                            else 
                                this.myCirArr[i].x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }
                }
                else 
                {
                    this.gameBackGround.x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;

                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.x = algea.algeaX = algea.x + Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.x  += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }

                }

                if(this.returnResult("top",this.myCirArr))
                {
                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapTopFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * ( stance );
                            else 
                                this.myCirArr[i].y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }
                }
                else
                {
                    this.gameBackGround.y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;

                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.y = algea.algeaY = algea.y + Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.y  += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                }
                    //this.gameBackGround.y = (GameManager.stage.stageHeight /2 - myCir.radius);
            }

            if(this.X < this.control_X && this.Y > this.control_Y){

                if(this.returnResult("left",this.myCirArr))
                {
                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapLeftFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * ( stance );
                            else 
                                this.myCirArr[i].x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }
                }
                else
                {
                    this.gameBackGround.x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;

                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].x -= Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.x += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.x = algea.algeaX = algea.x + Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.x  += Math.cos(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                } 
                    //this.gameBackGround.x = (GameManager.stage.stageWidth/2 - myCir.radius);
                if(this.returnResult("bottom",this.myCirArr))
                {
                    for( i = 0 ; i < this.myCirArr.length ; i++){
                        if(this.mapBottomFlag[i] == false){
                            if(this.myCirArr[i] == myCir)
                                this.myCirArr[i].y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * (  stance );
                            else 
                                this.myCirArr[i].y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[i].stance ;
                        }
                        else {}
                            //不动
                    }
                }
                else
                {
                    this.gameBackGround.y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;

                    for( j  = 0 ; j < this.myCirArr.length ; j ++){
                        if(this.myCirArr[j] != myCir){
                            this.myCirArr[j].y -= Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * this.myCirArr[j].stance;
                        }
                    }
                    for(i = 0 ; i < this.mySporeArr.length;i++){
                        spore = this.mySporeArr[i];
                        spore.y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0 ; i < this.bootCirArr.length;i++){
                        cir = this.bootCirArr[i];
                        cir.y += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for(i = 0; i < this.bootAlgea.length;i++){
                        algea = this.bootAlgea[i];
                        algea.y = algea.algeaY = algea.y + Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                    for( i = 0 ;  i < this.bootThorn.length ; i++){
                        thorn = this.bootThorn[i];
                        thorn.y  += Math.sin(Math.atan((this.control_ball.y - this.control_Y)/(this.control_ball.x - this.control_X))) * stance;
                    }
                } 
                    //this.gameBackGround.y = -(this.gameBackGround.height - (GameManager.stage.stageHeight /2 + myCir.radius))
            }


    }


    /**
     * 世界地图边缘碰撞检测
     * 
     */
    private mapHitTest(circle : Circle[]){
        var i : number ;
        for( i = 0 ; i < circle.length ; i ++){
            if(this.gameBackGround.x <= - (this.gameBackGround.width - (circle[i].x + circle[i].radius)))   
                this.mapRightFlag[i] = true;
            else
                this.mapRightFlag[i] = false;
            if(this.gameBackGround.y >=  (circle[i].y -  circle[i].radius))
                this.mapTopFlag[i] = true;
            else 
                this.mapTopFlag[i] = false;
            if(this.gameBackGround.x >= (circle[i].x - circle[i].radius))
                this.mapLeftFlag[i] = true;
            else 
                this.mapLeftFlag[i] = false;
            if(this.gameBackGround.y <= - (this.gameBackGround.height - (circle[i].y + circle[i].radius)))
                this.mapBottomFlag[i] = true;
            else 
                this.mapBottomFlag[i] = false;
        }
    }

private returnResult (dir : string , circle : Circle[]): boolean{

    var i : number;

    if(dir == "right"){
        for( i = 0 ; i < circle.length ; i++){
            if(this.mapRightFlag[i] == true){
                return true;
            }
        }
    }
    if(dir == "top"){
        for( i = 0 ; i < circle.length ; i++){
            if(this.mapTopFlag[i] == true){
                return true;
            }
        }
    }
    if(dir == "left"){
        for( i = 0 ; i < circle.length ; i++){
            if(this.mapLeftFlag[i] == true){
                return true;
            }
        }
    }
    if(dir == "bottom"){
        for( i = 0 ; i < circle.length ; i++){
            if(this.mapBottomFlag[i] == true){
                return true;
            }
        }
    }
}


    /**
     * 控制盘定位
     */
    public onTouch(event : egret.TouchEvent)
    {   

        //console.log("touch")

        if(this.controlFlag == false){

            //重新计算坐标，将event.localX换成this.offsetLocalX；
            this.offsetLocalX = event.localX + ScaleMap.tempNumX;
            this.offsetLocalY = event.localY + ScaleMap.tempNumY;

            this.control_X = this.offsetLocalX;
            this.control_Y = this.offsetLocalY;

            this.control_bg.x = this.control_X;
            this.control_bg.y = this.control_Y;

            this.control_ball.x = this.control_X;
            this.control_ball.y = this.control_Y;

            this.addChild(this.control_bg);
            this.addChild(this.control_ball);

            this.controlFlag = true;
            //
            //console.log("第一次点击event.localX:" + event.localX + "event.localY: " +　this.offsetLocalX);
        }

        //console.log("test click is in move?")
        //console.log("move not in con_bg");
        //触碰位置在控制盘内


        if(event.target == this.control_bg){
                        //console.log("控制盘内" + event.localX);
            LayerManager.game.addEventListener(egret.Event.ENTER_FRAME,this.move,this);
            

            this.X = event.localX + this.control_X;
            this.Y = event.localY + this.control_Y;

            //console.log(event.localX + 120 ,event.localY + 360);

            this.control_ball.x =  event.localX + this.control_X;
            this.control_ball.y =  event.localY + this.control_Y;

        }
        //触碰在控制盘外
        else {
            LayerManager.game.addEventListener(egret.Event.ENTER_FRAME,this.move,this);

            this.offsetLocalX = event.localX + ScaleMap.tempNumX;
            this.offsetLocalY = event.localY + ScaleMap.tempNumY;

            //console.log("控制盘外 event.localX:" + event.localX + "event.localY: " +　this.offsetLocalX);

            this.X = this.offsetLocalX ;
            this.Y = this.offsetLocalY ;

            //console.log(event.localX + 120 ,event.localY + 360);

            var disX : number = this.control_X - (this.offsetLocalX );
            var disY : number = this.control_Y - (this.offsetLocalY );

            var distance : number = Math.sqrt((disX*disX) + (disY*disY));

            if(this.offsetLocalX > this.control_X && this.offsetLocalY  < this.control_Y){
                this.control_ball.y = this.control_Y - (this.conBgSize/distance)*(this.control_Y - this.offsetLocalY );
                this.control_ball.x = this.control_X + (this.conBgSize/distance)*(this.offsetLocalX - this.control_X);
            }
            if(this.offsetLocalX  > this.control_X && this.offsetLocalY  > this.control_Y){
                this.control_ball.y = this.control_Y + (this.conBgSize/distance)*(this.offsetLocalY  - this.control_Y);
                this.control_ball.x = this.control_X + (this.conBgSize/distance)*( this.offsetLocalX- this.control_X);
            }
            if(this.offsetLocalX  < this.control_X && this.offsetLocalY  < this.control_Y){
                this.control_ball.y = this.control_Y - (this.conBgSize/distance)*(this.control_Y - this.offsetLocalY );
                this.control_ball.x = this.control_X - (this.conBgSize/distance)*(this.control_X - this.offsetLocalX);
            }
            if(this.offsetLocalX  < this.control_X && this.offsetLocalY  > this.control_Y){
                this.control_ball.y = this.control_Y + (this.conBgSize/distance)*(this.offsetLocalY  -this.control_Y);
                this.control_ball.x = this.control_X - (this.conBgSize/distance)*(this.control_X - this.offsetLocalX);
            }

        }
    }



    /**
     * 分裂入口
     * 
     */
    private onSplit(event:egret.TouchEvent){
        if(event.target == this.splitArea){
                    //console.log("dianji")
            var cirArr : Circle[] = []; //分裂后的球球
            //var tempCir : Circle[];
            var canSplitCir : Circle[] = []; //需要分裂的球球
            var cantSplitCir : Circle[] = []; //不需要分裂的球球

            var coor_bg : egret.Point ;
            var coor_ball : egret.Point;

            var myCir : Circle;

            var i : number;
            var k : number = 0;
            var l : number = 0;

            //关闭定时器绘制，以免冲突
            //this.Timer.stop();

            coor_bg = new egret.Point(this.control_bg.x,this.control_bg.y);
            coor_ball = new egret.Point(this.control_ball.x,this.control_ball.y);

            //关闭我方球球碰撞检测
            this.splitHitTest = false;
            this.spliteHitTimer.start();


            //console.log(LayerManager.game.myCirArr.length);
            for( i= 0 ; i < LayerManager.game.myCirArr.length; i++){
                if(LayerManager.game.myCirArr[i].weight >= (27000)){
                    
                    canSplitCir.push(LayerManager.game.myCirArr[i]);

                }
            }
            //console.log(LayerManager.game.myCirArr.length);
            var tempNum : number = LayerManager.game.myCirArr.length;

            var j : number = 0;


            for(i = 0 ; i < tempNum ; i ++){
                if(LayerManager.game.myCirArr[j].weight >= (27000) ){
                    myCir = LayerManager.game.myCirArr[j];
                    LayerManager.game.removeChild(myCir);
                    LayerManager.game.myCirArr.splice(LayerManager.game.myCirArr.indexOf(myCir),1);
                    //myCir.weight = 8000;
                    Circle.reclaim(myCir,myCir.cirName);
                }
                else{
                    j += 1;
                }
            }
            //console.log("此时圆的个数应该为0" + LayerManager.game.myCirArr.length);
    

            if(canSplitCir.length >=1 ){

                cirArr = Split.splitAction(canSplitCir,coor_bg,coor_ball,this,LayerManager.game.gameStageWidth, LayerManager.game.gameStageHeight,LayerManager.game.gameBackGround,LayerManager.game.bootCirArr,LayerManager.game.bootAlgea);

                for( i = 0 ; i < cirArr.length ;  i++){
                    var tempCir : Circle;
                    tempCir = cirArr[i];
                    LayerManager.game.myCirArr.push(tempCir);
                }

                while(cirArr.length > 0){
                    cirArr.splice(cirArr.indexOf(cirArr[0]),1);
                }

                //console.log(this.myCirArr.length);

                while(canSplitCir.length > 0){
                    canSplitCir.splice(canSplitCir.indexOf(canSplitCir[0]),1);
                }

            }

            
        }
    }

    /**
     * 孢子入口
     * 
     */
    private onSpore(event:egret.TouchEvent){
        if(event.target == this.spornArea){
                    //console.log("dianji")
            var sporeArr : Spore[] = []; //吐出的孢子
            //var tempCir : Circle[];
            var canSporeCir : Circle[] = []; //可以吐孢子的球球
            var cantSplitCir : Circle[] = []; //不可以吐孢子的球球

            var coor_bg : egret.Point ;
            var coor_ball : egret.Point;

            var myCir : Circle;

            var i : number;
            var k : number = 0;
            var l : number = 0;

            coor_bg = new egret.Point(this.control_bg.x,this.control_bg.y);
            coor_ball = new egret.Point(this.control_ball.x,this.control_ball.y);

            //关闭我方球球碰撞检测
            this.spornHitTest = false;
            this.spornHitTimer.start();


            for( i= 0 ; i < LayerManager.game.myCirArr.length; i++){
                if(LayerManager.game.myCirArr[i].weight >= (20^3)){
                    canSporeCir.push(LayerManager.game.myCirArr[i]);
                }
            }

            var tempNum : number = LayerManager.game.myCirArr.length;

            var j : number = 0;


            for(i = 0 ; i < tempNum ; i ++){
                if(LayerManager.game.myCirArr[i].weight >= (20^3) && LayerManager.game.myCirArr[i].weight < (50^3)){
                    LayerManager.game.myCirArr[i].weight -= 300;
                    //LayerManager.game.myCirArr[i].bulk -= 1;
                }
                if(LayerManager.game.myCirArr[i].weight >= (50^3)){
                    LayerManager.game.myCirArr[i].weight -= 300;
                    //LayerManager.game.myCirArr[i].bulk -= 0.2;
                }
            }

    

            if(canSporeCir.length >=1 ){
                sporeArr = Split.sporeAction(canSporeCir,coor_bg,coor_ball,this,LayerManager.game.gameStageWidth, LayerManager.game.gameStageHeight,LayerManager.game.gameBackGround,LayerManager.game.bootCirArr,LayerManager.game.bootAlgea);

                for( i = 0 ; i < sporeArr.length ;  i++){
                    var tempSpore : Spore;
                    tempSpore = sporeArr[i];
                    LayerManager.game.mySpornArr.push(tempSpore);
                }

                while(sporeArr.length > 0){
                    sporeArr.splice(sporeArr.indexOf(sporeArr[0]),1);
                }

                //console.log(this.myCirArr.length);

                while(canSporeCir.length > 0){
                    canSporeCir.splice(canSporeCir.indexOf(canSporeCir[0]),1);
                }

            }

            
        }
    }


    /**
     * 控制点还原
     * 
     */
    public touchEnd(event:egret.TouchEvent){

        //如果单击的话，会触发TOUCH_END,不会触发TOUCH_MOVE，所以这里需要检测有无控制板再操作
        
        if(this.control_ball.parent != null && this.control_bg.parent != null){
            //console.log("1111");
            this.removeChild(this.control_bg);
            this.removeChild(this.control_ball);
            this.controlFlag = false;
        }
        else{
            //如果单机，则停止小球移动
            if(event.target != this.splitArea)
            //console.log(this.control_ball.x,this.control_X,this.control_ball.y,this.control_Y);
            this.removeEventListener(egret.Event.ENTER_FRAME,this.move,this);
        }

        //这里不再需要判断鼠标的位置是否在控制盘内了，小球会一直运动，无需取消侦听，在下一次触碰后重新定位、显示控制盘即可
        //隐藏控制盘，继续侦听

    }

    public removeControl():void{
        if(this.control_bg.parent != null)
            this.removeChild(this.control_bg);
        if(this.control_ball.parent != null)
            this.removeChild(this.control_ball);

        this.removeChild(this.splitArea);
        this.removeChild(this.spornArea);
        this.removeChild(this.rankingArea);

        this.rankingArr = [];

        this.spliteHitTimer.stop();
        this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.changeSplitStatus,this);

        this.spornHitTimer.stop();
        this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.changeSpornStatus,this);

        this.gameTimer.stop();
        this.removeEventListener(egret.TimerEvent.TIMER,this.onRefresh,this);
        this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.gameover,this);


    }



}