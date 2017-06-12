// TypeScript file
class GameOverPanel extends eui.Component{
    public constructor(){
        super();
        this.skinName = "GameOverPanelSkin";
        this.init();
    }

    // public restarGameBtn : egret.TextField;

    public returnHall : eui.Button;

    private rankingList : eui.Group;

    private allList : eui.ArrayCollection;

    private init(){
        var  i : number ;
        // this.restarGameBtn = new egret.TextField();
        // this.restarGameBtn.text = "不服，再来一次!";
        // this.restarGameBtn.x = GameManager.stage.stageWidth /2;
        // this.restarGameBtn.y = GameManager.stage.stageHeight /2;
        // this.restarGameBtn.touchEnabled = true;
        // this.addChild(this.restarGameBtn);
        // this.restarGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,LayerManager.onTouch2,this);

        this.rankingList.x = 5;
        this.rankingList.y = 123;

        /**
         * 排名列表名字、体重赋值
         * 
         */

        //alert(this.allList.source[1].排名);
        

        for( i = 0 ; i < 10 ; i ++){
            if( i == 0){
                this.allList.source[i].体重 = LayerManager.gameControl.myCirWeight + "kg";
                this.allList.source[i].名字 = LayerManager.gameControl.rankingArr[i];
                this.allList.source[i].吞噬 = LayerManager.game.myCirSwallowed;
            }
            else{
                this.allList.source[i].体重 = LayerManager.game.bootCirArr[i - 1].weight + "kg";
                this.allList.source[i].名字 = LayerManager.gameControl.rankingArr[i];
                this.allList.source[i].吞噬 = LayerManager.game.bootCirArr[i - 1].swallowed;
            }
        }


    }

    // private onReturnHall():void{
    //     this.returnHall.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturnHall,this);
    //     LayerManager.gameLayer.removeChild(this);
    //     var welcome : WelcomePanel = new WelcomePanel;
    //     LayerManager.gameLayer.addChild(welcome);
    // }

    //private onTouch ():void{
    //    this.restarGameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    //    LayerManager.gameLayer.removeChild(this);
    //    var game : GamePanel = new GamePanel;
    //    LayerManager.gameLayer.addChild(game);
    //}


}