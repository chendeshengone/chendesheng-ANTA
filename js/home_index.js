class Home{

    constructor(){
        
        this.bindEve();

        // this.rotation();

        // this.scrollToo();
        this.index=0;
        this.times=null;
        this.len=document.querySelectorAll('.rot-one ul li').length;
        this.rotation();

        this.getgoods();
    }

    // 各种事件
    bindEve(){

        // 顶部状态移入事件
        this.$$(".topHead>div").addEventListener('mouseover',this.topMouseOver.bind(this))
        // 顶部状态移出事件
        this.$$(".topHead>div").addEventListener('mouseout',this.topMouseOut.bind(this))

        // 顶部导航移入
        this.$$(".lisNav").addEventListener('mouseover',this.navMouseOver.bind(this))
        // 顶部导航移出
        this.$$(".lisNav").addEventListener('mouseout',this.navMouseOut.bind(this))
        

        // 底部微信二维码移入
        this.$$(".mainweixin").addEventListener('mouseover',this.weixinOver.bind(this))
        // 底部微信二维码移出
        this.$$(".mainweixin").addEventListener('mouseout',this.weixinOut.bind(this))

        // 返回顶部
        this.$$(".goto-top").addEventListener('click',this.pageScroll.bind(this))

        // 跳转
        this.$$(".lisNav").addEventListener('click',this.navClick.bind(this))
    }

    // 底部渲染
    async getgoods(){

        let {data,status}=await axios.get('http://localhost:8888/goods/list?current=4')
        // console.log(data,status);
        let goods=data.list;
        // console.log(goods);
        // console.log(goods.slice(0,4));
        let res=goods.slice(0,4);

        if(status==200){

            let html='';
            res.forEach(goodsOne=>{

                html+=`<li style="width: 328px; margin-right: 20px;">
                <a href="#javascript:;">
                    <img src="${goodsOne.img_big_logo}" alt="">
                    <span>${goodsOne.title}</span>
                </a>
            </li>`;
            })

            this.$$(".wrapper ul").innerHTML=html;

        }
        

    }

    // 轮播
    rotation(){

        this.$$("#goPrev").onclick=()=>this.prevMove();
        this.$$("#goNext").onclick=()=>this.nextMove();
        this.auto();
        this.$$(".rotation").onmouseover=()=>this.stop();
        this.$$(".rotation").onmouseout=()=>this.auto();
    }
    // 移入停止
    stop(){
        // console.log(1);
        clearInterval(this.times)
    }
    // 移出开始
    auto(){
        // console.log(2);
        clearInterval(this.times)
        this.times=setInterval(()=>{
            this.nextMove();
        },3000)
    }
    // 后退
    prevMove(){
        // console.log(3);
        this.index--;
        if(this.index<0){
            this.index=this.len-1;
        }
        this.move();
    }
    // 前进
    nextMove(){
        // console.log(4);
        this.index++;
        // console.log(this.len);
        if(this.index==this.len){
            this.index=0;
        }
        this.move();
    }
    // 设置当前图片
    move(){
        // console.log(this.index);
        
        let res=Array.from(this.$$(".rot-one ul li"))
        for(let i=0;i<this.len;i++){
            res[i].className='';
        }
        
        res[this.index].className='ac'
    }

    // 切换页面
    navClick(eve){
        // console.log(eve.target);
        let sers=eve.target;
        if(sers.tagName=='A'){
            setTimeout(function(){
                location.href='http://127.0.0.1:5500/ANTA/chendesheng-ANTA/index/list_index.html'
            },500)
        }
    }

    // 顶部导航移入
    navMouseOver(eve){

        // console.log(111);
        let target=eve.target;
        // console.log(target);
        let html='';

        let id=target.dataset.id;
        // console.log(id);
        if(target.parentNode.tagName=='LI'){
            // console.log(11);
            target.style['border-bottom']='5px solid red'
        }
        
        if(target.parentNode.dataset.id=='one'){
            // console.log(11);
            // console.log(this.$$('.erjione')[0]);    
            this.$$('.erjione')[0].style.display='block'        
        }
        if(target.parentNode.dataset.id=='two'){
            // console.log(11);
            // console.log(this.$$('.erjione')[0]);    
            this.$$('.erjione')[1].style.display='block'        
        }
        if(target.parentNode.dataset.id=='three'){
            // console.log(11);
            // console.log(this.$$('.erjione')[0]);    
            this.$$('.erjione')[2].style.display='block'        
        }

    }
    // 顶部导航移出
    navMouseOut(eve){
        let target=eve.target;

        if(target.tagName=='A'){
            target.style['border-bottom']='none'
        }

        this.$$('.erjione')[0].style.display='none';
        this.$$('.erjione')[1].style.display='none';
        this.$$('.erjione')[2].style.display='none';
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
            this.$$('.comCode').style.display='block'
        }
    }
    // 微信移出隐藏二维码
    weixinOut(){
        this.$$('.comCode').style.display='none'
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
    $$(target){
        let res=document.querySelectorAll(target);

        return res.length==1? res[0]:res;
    }
}

new Home;