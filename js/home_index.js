class Home{

    constructor(){
        
        this.bindEve();

        this.rotation();

        // this.scrollToo();
    }

    // 各种事件
    bindEve(){

        // 顶部状态移入事件
        Home.$$(".topHead>div").addEventListener('mouseover',this.topMouseOver.bind(this))
        // 顶部状态移出事件
        Home.$$(".topHead>div").addEventListener('mouseout',this.topMouseOut.bind(this))

        // 顶部导航移入
        Home.$$(".lisNav").addEventListener('mouseover',this.navMouseOver.bind(this))
        // 顶部导航移出
        Home.$$(".lisNav").addEventListener('mouseout',this.navMouseOut.bind(this))
        

        // 底部微信二维码移入
        Home.$$(".mainweixin").addEventListener('mouseover',this.weixinOver.bind(this))
        // 底部微信二维码移出
        Home.$$(".mainweixin").addEventListener('mouseout',this.weixinOut.bind(this))

        // 返回顶部
        Home.$$(".goto-top").addEventListener('click',this.pageScroll.bind(this))
    }

    // scrollToo(){
    //     // let top=document.documentElement.scrollTop;
    //     console.log(document.body.scrollTop);
    // }

    // 顶部导航移入
    navMouseOver(eve){

        // console.log(111);
        let target=eve.target;
        // console.log(target);
        let html='';

        let id=target.dataset.id;
        // console.log(id);
        if(target.tagName=='A') {
            target.style['border-bottom']='5px solid red'
        }
        
        if(target.parentNode.dataset.id=='one'){
            // console.log(11);
            // console.log(Home.$$('.erjione')[0]);    
            Home.$$('.erjione')[0].style.display='block'        
        }
        if(target.parentNode.dataset.id=='two'){
            // console.log(11);
            // console.log(Home.$$('.erjione')[0]);    
            Home.$$('.erjione')[1].style.display='block'        
        }
        if(target.parentNode.dataset.id=='three'){
            // console.log(11);
            // console.log(Home.$$('.erjione')[0]);    
            Home.$$('.erjione')[2].style.display='block'        
        }

    }
    // 顶部导航移出
    navMouseOut(eve){
        let target=eve.target;

        target.style['border-bottom']='none'

        Home.$$('.erjione')[0].style.display='none';
        Home.$$('.erjione')[1].style.display='none';
        Home.$$('.erjione')[2].style.display='none';
    }

    // 返回顶部
    pageScroll(){
        let times;
        let speed=30;

        times=setInterval(function(){

            // console.log(top);
            document.documentElement.scrollTop-=speed;
            if(document.documentElement.scrollTop==0){
                clearInterval(times);
            }
        },10)

    }

    // 微信移入显示二维码
    weixinOver(eve){
        let comCode=eve.target;
        // console.log(comCode);
        if(comCode.tagName=='LI' || comCode.tagName=='A'){
            // console.log(11);
            Home.$$('.comCode').style.display='block'
        }
    }
    // 微信移出隐藏二维码
    weixinOut(){
        Home.$$('.comCode').style.display='none'
    }

    // 轮播
    rotation(){

        let lisObj=Home.$$('.rot-one ul li')
        // console.log(lisObj);
        let index=0;
        let lastIndex=0;


        let times;

        times=setInterval(function(){

            lastIndex=index;
            index++;

            if(index>lisObj.length-1) index=0;
            
            // Home.change(index,lastIndex,lisObj)
            lisObj[lastIndex].className='';
            lisObj[index].className='ac';

        },3000)
        
    }

    // 顶部移入
    topMouseOver(eve){
        // console.log('移入');
        // console.log(eve.target.tagName);
        // 获取当前标签类型
        let tagsname=eve.target.tagName;
        // console.log( tagsname);

        // 判断标签类型
        if(tagsname=='A'){
            // console.log(eve.target);
            // 改变样式
            eve.target.style.color='black';
            eve.target.style.borderBottom='1px solid black';
        }

    }
    // 顶部移出
    topMouseOut(eve){
        let tagsname=eve.target.tagName;
        if(tagsname=='A'){
            // console.log(eve.target);
            eve.target.style.color='Gray';
            eve.target.style.borderBottom='none';
        }
    }


    // 封装获取节点
    static $$(target){
        let res=document.querySelectorAll(target);

        return res.length==1? res[0]:res;
    }
}

new Home;