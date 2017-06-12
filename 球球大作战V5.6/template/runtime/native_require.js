
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"polyfill/promise.js",
	"bin-debug/game/Thorn.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/game/Circle.js",
	"bin-debug/game/GameControl.js",
	"bin-debug/game/GamePanel.js",
	"bin-debug/game/GameUtil.js",
	"bin-debug/game/ScaleMap.js",
	"bin-debug/game/Split.js",
	"bin-debug/game/Spore.js",
	"bin-debug/game/Algea.js",
	"bin-debug/game/ThornSplit.js",
	"bin-debug/gameover/GameOverPanel.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/manager/GameManager.js",
	"bin-debug/manager/LayerManeger.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/welcome/WelcomePanel.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 800,
		contentHeight: 480,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};