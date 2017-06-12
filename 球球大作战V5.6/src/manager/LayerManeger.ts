// TypeScript file
class LayerManager {

    public static alertLayer : egret.Sprite = new egret.Sprite;
    public static gameLayer : egret.Sprite = new egret.Sprite;

    public sconstructor(){

    }

    public static welcome : WelcomePanel;
    public static game : GamePanel;
    public static gameOver : GameOverPanel;
    public static gameControl : GameControl;

    public static init (stage : egret.Stage){
        GameManager.stage = stage;
        stage.addChild(this.alertLayer);
        stage.addChild(this.gameLayer);
        //this.fixScreen();

        //初始化欢迎面板
        this.welcome = new WelcomePanel();
        //var welcome : WelcomePanel = new WelcomePanel();
        LayerManager.gameLayer.addChild(this.welcome);

        this.welcome.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);

    }

    private static onTouch():void{

        this.welcome.gameStartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);

        LayerManager.gameLayer.removeChild(this.welcome);
        this.game  = new GamePanel();
        LayerManager.gameLayer.addChild(this.game);

        this.gameControl = new GameControl;
        LayerManager.gameLayer.addChild(this.gameControl);
        
    }


    //时间到的时候，或者我方球球被吃完执行
    public static onTouch2():void{

        this.gameOver = new GameOverPanel();
        LayerManager.gameLayer.addChild(this.gameOver);

        LayerManager.game.gameOver();
        LayerManager.gameLayer.removeChild(this.game);
        LayerManager.gameLayer.removeChild(this.gameControl);

        LayerManager.gameOver.returnHall.addEventListener(egret.TouchEvent.TOUCH_TAP,LayerManager.onTouch3,this);
    }

    public static onTouch3():void{

        LayerManager.gameOver.returnHall.removeEventListener(egret.TouchEvent.TOUCH_TAP,LayerManager.onTouch3,this);
        LayerManager.gameLayer.removeChild(LayerManager.gameOver);
        //this.game = null;

        // LayerManager.game  = new GamePanel;
        // LayerManager.gameLayer.addChild(LayerManager.game);

        // //this.gameControl = null;
        // LayerManager.gameControl = new GameControl;
        // LayerManager.gameLayer.addChild(LayerManager.gameControl);

        //初始化欢迎面板
        this.welcome = new WelcomePanel();
        //var welcome : WelcomePanel = new WelcomePanel();
        LayerManager.gameLayer.addChild(this.welcome);

        this.welcome.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        

    }


    public static fixScreen(){
        if (egret.Capabilities.isMobile) {
            GameManager.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            //GameManager.stage.scaleMode = egret.StageScaleMode.FIXED_WIDE;
            //GameManager.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }else {
            GameManager.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    }

}