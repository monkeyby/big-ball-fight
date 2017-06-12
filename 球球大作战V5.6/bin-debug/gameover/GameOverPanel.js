var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameOverPanelSkin";
        _this.init();
        return _this;
    }
    GameOverPanel.prototype.init = function () {
        var i;
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
        for (i = 0; i < 10; i++) {
            if (i == 0) {
                this.allList.source[i].体重 = LayerManager.gameControl.myCirWeight + "kg";
                this.allList.source[i].名字 = LayerManager.gameControl.rankingArr[i];
                this.allList.source[i].吞噬 = LayerManager.game.myCirSwallowed;
            }
            else {
                this.allList.source[i].体重 = LayerManager.game.bootCirArr[i - 1].weight + "kg";
                this.allList.source[i].名字 = LayerManager.gameControl.rankingArr[i];
                this.allList.source[i].吞噬 = LayerManager.game.bootCirArr[i - 1].swallowed;
            }
        }
    };
    return GameOverPanel;
}(eui.Component));
__reflect(GameOverPanel.prototype, "GameOverPanel");
//# sourceMappingURL=GameOverPanel.js.map