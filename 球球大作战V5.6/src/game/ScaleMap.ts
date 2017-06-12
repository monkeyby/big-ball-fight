// TypeScript file

/**
 * 
 * 地图缩放，由球球之间的距离决定（减去俩圆半径），距离越远，缩放比例越大，但最大不能让世界地图在摄像机之内
 * 
 * 缩放比例为： 在俩球之间距离的200px之内，世界地图可以缩放自己原本大小的一半，超过200px，不再缩放
 * 
 * 这个方法最好在一开始时，俩球距离很小时，就连续使用，一直到最大，并在updataView中调用，一直侦听俩球的距离
 * 
 * 因为根据我方最大的球球，世界地图也一直在缩放，这里以距离的缩放要以球球的体积缩放为参考
 * 
 * 
 * 
 */
class ScaleMap {

    public constructor(){
       // this.init();
    }


    private static lastZoomScale : number = 1;

    private static lastWidth : number = 2136;

    private static lastHeight : number = 1200;

    private static lastScaleW : number = 0 ;

    private static lastScaleH : number = 0;

    private static testNum : number = 1;

    public static offsetX : number = 0;

    public static offsetY : number = 0;

    public static tempNumX : number = 0;

    public static tempNumY : number = 0;

    private static zoomScale : number ;

    private static singleZommScale : number = 0;



    public static scale(circle : Circle[],  gameStageW : number , gameStageH : number,gameBG : egret.Bitmap,bootCirArr : Circle[], bootAlgea : Algea[]):void{
        var cir  : Circle[] = circle;
        var doubleZoomScale : number;
        var i : number ;
        //var maxRadius : number = circle[0].radius;
        var maxCir : Circle = circle[0];

        //计算圆之间的距离
        if(circle.length > 1){
            //console.log("更新中")
            //console.log(gameStageH,gameStageW);
            doubleZoomScale = this.getZoomScale(cir);
            //console.log(zoomScale);

            for( i = 0 ; i < circle.length; i++){
                if(circle[i].radius >= maxCir.radius){
                    maxCir = circle[i];
                }
            }


            if(maxCir.radius >= 50)
            {
                this.singleZommScale = - ((maxCir.radius - 50)/500)          
            }
            else{
                this.singleZommScale = 0;
            }

            //以这个距离计算出缩放比例，立马执行缩放（改变世界地图的高宽度、位移）
            //console.log("缩放大小："+zoomScale);
            // console.log("球的数量：" + cir.length);
            this.zoomScale = doubleZoomScale + this.singleZommScale ;
            this.runZoom(this.zoomScale ,cir ,gameStageW,gameStageH,gameBG,bootCirArr,bootAlgea);


            //console.log(maxCir.radius);

            //this.autoMove(cir);

        }
        if(circle.length == 1){
            //将视角拉回我方球球，地图缩放还原
            //console.log(LayerManager.game.scaleX);

            if(circle[0].radius >= 50)
            {
                this.singleZommScale = - ((circle[0].radius - 50)/500)
                this.runZoom(1 + this.singleZommScale ,cir ,gameStageW,gameStageH,gameBG,bootCirArr,bootAlgea);                
            }
            else
            {
                this.singleZommScale = 0;
                this.lastWidth  = 2136;
                this.lastHeight  = 1200;
                this.zoomScale = 1;
                LayerManager.game.$setScaleX(this.zoomScale);
                LayerManager.game.$setScaleY(this.zoomScale);                
            }
            //this.autoMove(cir);
            //this.tempNumX = 0;
            //this.tempNumY = 0;
            //this.runZoom(zoomScale ,cir ,gameStageW,gameStageH,gameBG,bootCirArr,bootAlgea);
        //console.log(circle[0].radius);

        }


    }

    private  static getZoomScale(circle : Circle[]):number{
        var zoomScale : number ;
        var i : number;
        var maxCirX : number = circle[0].x;
        var maxCirY : number = circle[0].y;
        var minCirX : number = circle[0].x;
        var minCiry : number = circle[0].y;

        for(i = 0; i < circle.length; i++){
            if(circle[i].x > maxCirX)
                maxCirX = circle[i].x;
            if(circle[i].x < minCirX)
                minCirX = circle[i].x;
            if(circle[i].y > maxCirY)
                maxCirY = circle[i].y;
            if(circle[i].y < minCiry)
                minCiry = circle[i].y;
        }

        //console.log("第一个球坐标：" +circle[0].x , circle[0].y);
        //console.log( "第二个球坐标："+circle[1].x , circle[1].y);

        var diffX : number = maxCirX - minCirX;
        var diffY : number = maxCirY - minCiry;

        var maxDiff : number = diffX > diffY ? diffX : diffY;

        //这里设定缩放比例最大为世界地图的0.5，基数为800像素

        if(maxDiff/400 == 0)
            zoomScale = 1;
        if(maxDiff/400 >0 && maxDiff/400 <1)
            zoomScale = 1 - maxDiff/1000;
        if(maxDiff/400 >= 1)
            zoomScale = maxDiff/800;

        //缩放范围是0.5 - 1
        //console.log(zoomScale);
        return zoomScale;
    }

    private  static runZoom(zoomScale : number , cir: Circle[], gameStageW : number , gameStageH : number,gameBG : egret.Bitmap,bootCirArr : Circle[], bootAlgea : Algea[]): void{

        //console.log("缩放中")

                LayerManager.game.$setScaleX(zoomScale);
                LayerManager.game.$setScaleY(zoomScale);

                //console.log(LayerManager.game.width, LayerManager.game.height,gameStageW,gameStageH);

                if(zoomScale < this.lastZoomScale){
                    LayerManager.game.x += Math.abs((this.lastWidth - this.lastWidth * zoomScale)/16);
                    LayerManager.game.y += Math.abs((this.lastHeight - this.lastHeight *  zoomScale)/16);
                    this.tempNumX += Math.abs((this.lastWidth - this.lastWidth * zoomScale)/16);
                    this.tempNumY += Math.abs((this.lastHeight - this.lastHeight *  zoomScale)/16);
                    //LayerManager.game.transX += Math.abs((this.lastWidth - this.lastWidth * zoomScale)/2);
                    //LayerManager.game.transY += Math.abs((this.lastHeight - this.lastHeight *  zoomScale)/2);
                } 

                if(zoomScale > this.lastZoomScale){
                    LayerManager.game.x -= Math.abs((this.lastWidth - this.lastWidth * zoomScale)/16);
                    LayerManager.game.y -= Math.abs((this.lastHeight - this.lastHeight *  zoomScale)/16);
                    this.tempNumY -=  Math.abs((this.lastHeight - this.lastHeight *  zoomScale)/16);
                    this.tempNumX -=  Math.abs((this.lastWidth - this.lastWidth * zoomScale)/16);
                    //LayerManager.game.transX -=  Math.abs((this.lastHeight - this.lastHeight *  zoomScale)/2);
                   //LayerManager.game.transY -=  Math.abs((this.lastWidth - this.lastWidth * zoomScale)/2);
                }
                //console.log(Math.abs((this.lastWidth - gameStageW * zoomScale)/2),Math.abs((this.lastHeight - gameStageH *  zoomScale)/2));
                this.lastWidth = this.lastScaleW  * zoomScale;
                this.lastHeight = this.lastHeight * zoomScale;

                this.lastZoomScale = zoomScale;

                //console.log(this.tempNumX,this.tempNumY);

            }

            //我方球球自动向中心靠拢

        }

  
