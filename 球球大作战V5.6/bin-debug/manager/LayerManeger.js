var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var LayerManager = (function () {
    function LayerManager() {
    }
    LayerManager.prototype.sconstructor = function () {
    };
    LayerManager.init = function (stage) {
        GameManager.stage = stage;
        stage.addChild(this.alertLayer);
        stage.addChild(this.gameLayer);
        //this.fixScreen();
        //初始化欢迎面板
        this.welcome = new WelcomePanel();
        //var welcome : WelcomePanel = new WelcomePanel();
        LayerManager.gameLayer.addChild(this.welcome);
        this.welcome.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    LayerManager.onTouch = function () {
        this.welcome.gameStartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        LayerManager.gameLayer.removeChild(this.welcome);
        this.game = new GamePanel();
        LayerManager.gameLayer.addChild(this.game);
        this.gameControl = new GameControl;
        LayerManager.gameLayer.addChild(this.gameControl);
    };
    //时间到的时候，或者我方球球被吃完执行
    LayerManager.onTouch2 = function () {
        this.gameOver = new GameOverPanel();
        LayerManager.gameLayer.addChild(this.gameOver);
        LayerManager.game.gameOver();
        LayerManager.gameLayer.removeChild(this.game);
        LayerManager.gameLayer.removeChild(this.gameControl);
        LayerManager.gameOver.returnHall.addEventListener(egret.TouchEvent.TOUCH_TAP, LayerManager.onTouch3, this);
    };
    LayerManager.onTouch3 = function () {
        LayerManager.gameOver.returnHall.removeEventListener(egret.TouchEvent.TOUCH_TAP, LayerManager.onTouch3, this);
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
        this.welcome.gameStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    LayerManager.fixScreen = function () {
        if (egret.Capabilities.isMobile) {
            GameManager.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        else {
            GameManager.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
    };
    return LayerManager;
}());
LayerManager.alertLayer = new egret.Sprite;
LayerManager.gameLayer = new egret.Sprite;
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManeger.js.map