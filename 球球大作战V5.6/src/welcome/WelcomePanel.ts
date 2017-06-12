// TypeScript file
class WelcomePanel extends eui.Component{
    //public static game : GamePanel;
    public gameStartBtn : eui.Button;
    private nameInput : eui.TextInput;
    private refreshBtn : eui.Button;
    private gameName : eui.Label;

    private topList : eui.Button;
    private buttomList : eui.Button;

    private ListButton : eui.Button;

    public myCirName : string;

        //滚动的列表
        private scroller: eui.Scroller;
        //滚动列表上的遮罩
        private spMask: egret.Shape;
        //列表是否展开了
        private isShow: boolean = false;

        //列表
        private list :eui.List;

        //滚动区域消失位置的 y 坐标
        private posScrollerClose: number;

        private listGroup : eui.Group;

        private displayText : eui.Label;

    private nameArr : string[] = ["没心没肺的智多星", "虎火柴棍", "闪耀的电灯泡" , "不帅你报警", "吃货精灵" , "超人黑蜘蛛" , "不正经的大脸猫" , "任性的牛仔" , "闹钟你别闹" ,"骑士骨头"];
    
    public constructor(){
        super();
        this.skinName = "WelcomePanelSkin";
        //alert(this.gameStartBtn);
        this.init();


    }
    //开始游戏按钮
    // public  starGameBtn : egret.TextField;
     private init(){
    //     this.starGameBtn = new egret.TextField();
    //     this.starGameBtn.text = "开始游戏";
    //     this.starGameBtn.x = GameManager.stage.stageWidth /2;
    //     this.starGameBtn.y = GameManager.stage.stageHeight /2;
    //     this.starGameBtn.touchEnabled = true;
    //     this.addChild(this.starGameBtn);

        //alert(this.nameInput);
           //this.nameInput.prompt = "leo"
           this.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch, this);
           this.topList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch2,this);
           this.buttomList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch3,this);

            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch4,this);

            // console.log(this.listGroup);
            // this.listGroup.x = 100;

            // this.listGroup.x = 248;
            // this.listGroup.y = 249;


            //添加滚动条
            var scroller = new eui.Scroller(); 
            //  scroller.y = 400;
            scroller.height = 36*4;
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
     }
        protected createChildren() {
            super.createChildren();
            //alert(this.ListButton);
            this.spMask.y = this.ListButton.height + 213;
            //设置消失点坐标
             //this.posScrollerClose = this.scroller.y = -this.scroller.height ;
             this.posScrollerClose =  249 - 144 ;
             this.scroller.y = 249 - 144 ;

            this.ListButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeListType, this);
        }

        private changeListType(): void {
            if (!this.isShow) {
                egret.Tween.get(this.scroller).to({y:this.ListButton.height + 213}, 300);
                this.isShow = true;
            } else {
                egret.Tween.get(this.scroller).to({y:this.posScrollerClose}, 300);
                this.isShow = false;
            }

            //console.log(this.btn.y , this.scroller.y)
        }

     private onTouch(){
         //alert(this.nameLabel);
         this.myCirName = this.gameName.text = this.nameArr[Math.floor(Math.random()*10)];
     }

     
     
     private onTouch2(){

         if(this.topList.skinName == "topList"){
                this.topList.skinName = "topList2";
         }
         if(this.buttomList.skinName == "buttomList2"){
                this.buttomList.skinName = "buttomList";
         }


     }

     private onTouch3(){

         if(this.topList.skinName == "topList2"){
                this.topList.skinName = "topList";
         }
         if(this.buttomList.skinName == "buttomList"){
                this.buttomList.skinName = "buttomList2";
         }

         
     }
        private onTouch4(event: egret.TouchEvent){

        //这里执行收回列表、获取点击的文字、替换掉按钮的文字
        
        if(event.target.parent.$children[1].text != undefined){
            this.displayText.text = event.target.parent.$children[1].text;           
        }

        if(this.isShow){
                egret.Tween.get(this.scroller).to({y:this.posScrollerClose}, 300);
                this.isShow = false;
        }
        
        console.log("你点击的是" + event.target.parent.$children[1].text);

    }


    private gameViewUpdata(){
        
                    //console.log(this.scroller.x,this.scroller.y);

    }
}