var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var WelcomePanel = (function (_super) {
    __extends(WelcomePanel, _super);
    function WelcomePanel() {
        var _this = _super.call(this) || this;
        //列表是否展开了
        _this.isShow = false;
        _this.nameArr = ["没心没肺的智多星", "虎火柴棍", "闪耀的电灯泡", "不帅你报警", "吃货精灵", "超人黑蜘蛛", "不正经的大脸猫", "任性的牛仔", "闹钟你别闹", "骑士骨头"];
        _this.skinName = "WelcomePanelSkin";
        //alert(this.gameStartBtn);
        _this.init();
        return _this;
    }
    //开始游戏按钮
    // public  starGameBtn : egret.TextField;
    WelcomePanel.prototype.init = function () {
        //     this.starGameBtn = new egret.TextField();
        //     this.starGameBtn.text = "开始游戏";
        //     this.starGameBtn.x = GameManager.stage.stageWidth /2;
        //     this.starGameBtn.y = GameManager.stage.stageHeight /2;
        //     this.starGameBtn.touchEnabled = true;
        //     this.addChild(this.starGameBtn);
        //alert(this.nameInput);
        //this.nameInput.prompt = "leo"
        this.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.topList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this);
        this.buttomList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch3, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch4, this);
        // console.log(this.listGroup);
        // this.listGroup.x = 100;
        // this.listGroup.x = 248;
        // this.listGroup.y = 249;
        //添加滚动条
        var scroller = new eui.Scroller();
        //  scroller.y = 400;
        scroller.height = 36 * 4;
        scroller.width = 276;
        scroller.viewport = this.list;
        this.scroller = scroller;
        this.scroller.x = 248;
        this.addChild(scroller);
        //  this.scroller.y = 249;
        // this.scroller.x = 248;
        //添加遮罩
        var spMask = new egret.Shape();
        spMask.graphics.beginFill(0x000000);
        spMask.graphics.drawRect(0, 0, 276, 144);
        spMask.graphics.endFill();
        this.spMask = spMask;
        this.spMask.x = 248;
        //  this.spMask.y = 249;
        this.addChild(spMask);
        this.scroller.mask = spMask;
        //this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdata,this);
        this.myCirName = this.gameName.text;
    };
    WelcomePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //alert(this.ListButton);
        this.spMask.y = this.ListButton.height + 213;
        //设置消失点坐标
        //this.posScrollerClose = this.scroller.y = -this.scroller.height ;
        this.posScrollerClose = 249 - 144;
        this.scroller.y = 249 - 144;
        this.ListButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeListType, this);
    };
    WelcomePanel.prototype.changeListType = function () {
        if (!this.isShow) {
            egret.Tween.get(this.scroller).to({ y: this.ListButton.height + 213 }, 300);
            this.isShow = true;
        }
        else {
            egret.Tween.get(this.scroller).to({ y: this.posScrollerClose }, 300);
            this.isShow = false;
        }
        //console.log(this.btn.y , this.scroller.y)
    };
    WelcomePanel.prototype.onTouch = function () {
        //alert(this.nameLabel);
        this.myCirName = this.gameName.text = this.nameArr[Math.floor(Math.random() * 10)];
    };
    WelcomePanel.prototype.onTouch2 = function () {
        if (this.topList.skinName == "topList") {
            this.topList.skinName = "topList2";
        }
        if (this.buttomList.skinName == "buttomList2") {
            this.buttomList.skinName = "buttomList";
        }
    };
    WelcomePanel.prototype.onTouch3 = function () {
        if (this.topList.skinName == "topList2") {
            this.topList.skinName = "topList";
        }
        if (this.buttomList.skinName == "buttomList") {
            this.buttomList.skinName = "buttomList2";
        }
    };
    WelcomePanel.prototype.onTouch4 = function (event) {
        //这里执行收回列表、获取点击的文字、替换掉按钮的文字
        if (event.target.parent.$children[1].text != undefined) {
            this.displayText.text = event.target.parent.$children[1].text;
        }
        if (this.isShow) {
            egret.Tween.get(this.scroller).to({ y: this.posScrollerClose }, 300);
            this.isShow = false;
        }
        console.log("你点击的是" + event.target.parent.$children[1].text);
    };
    WelcomePanel.prototype.gameViewUpdata = function () {
        //console.log(this.scroller.x,this.scroller.y);
    };
    return WelcomePanel;
}(eui.Component));
__reflect(WelcomePanel.prototype, "WelcomePanel");
//# sourceMappingURL=WelcomePanel.js.map