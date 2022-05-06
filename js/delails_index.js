class Delails{

    constructor(){

        this.bindEve();

        this.dataGet();

        this.dataGetTwo();

        this.getgoods();
    }

    bindEve(){

        // 商品移入显示
        this.$$(".pro-bigImg").addEventListener('mouseover',this.imgOver.bind(this))
        // 商品移入隐藏
        this.$$(".pro-bigImg").addEventListener('mouseout',this.imgOut.bind(this))

        // 方块跟随鼠标
        this.$$(".pro-bigImg").addEventListener('mousemove',this.imgMove.bind(this))

        // 尺码显示
        this.$$(".goods-size-cell").addEventListener('click',this.clickCell.bind(this))
        // 尺码隐藏
        this.$$(".chima").addEventListener('click',this.clickChi.bind(this))

        // 尺码显示
        this.$$(".goods-num-cell").addEventListener('click',this.clickNum.bind(this))
        // 尺码隐藏
        this.$$(".goods-num").addEventListener('click',this.clickNumNone.bind(this))

        // 优惠券
        this.$$(".infos-dis").addEventListener('click',this.clickInfos.bind(this))

        // 返回顶部
        this.$$(".goto-top").addEventListener('click',this.pageScroll.bind(this))

        // 跳转购物车
        this.$$(".btn-buy").onclick=this.cartBtn.bind(this)
        this.$$(".btn-cart").onclick=this.cartBtn.bind(this)

        // 导航移入移出
        this.$$(".nav-list").addEventListener('mouseover',this.navOver.bind(this))
        this.$$(".nav-list").addEventListener('mouseout',this.navOut.bind(this))

        // 顶部移入移出
        this.$$(".topbar").addEventListener('mouseover',this.topbarOver.bind(this))
        this.$$(".topbar").addEventListener('mouseout',this.topbarOut.bind(this))

    }
    // 获取数据
    async getgoods(){
        // console.log(localStorage.getItem('goods_id'));
        // console.log(goodsId);
        let {data,status}=await axios.get('http://localhost:8888/goods/list?current=1')
        // console.log(data);
        let goodsId=localStorage.getItem('id')
        let newGoods=data.list[goodsId-1]
        // console.log(newGoods);

        this.$$(".box").innerHTML=`<div class="bigImg-box cloud" data-id="${goodsId}">
        <img src="${newGoods.img_big_logo}" alt="">
        <div class="mask"></div>
        </div>`;

        this.$$(".bigImg-box-e").innerHTML=`<img src="${newGoods.img_big_logo}" alt="">`;

        this.$$(".j_infos_t").innerHTML=`<p>综训鞋</p>
        <h3 class="goods-name">${newGoods.title}</h3>
        <p class="goods-sn">款号：112217785</p>
        <p class="goods-price">￥${newGoods.price}</p>`;

        

    }
    // 顶部移入移出
    topbarOver(eve){
        // console.log(eve.target);
        let target=eve.target;
        if(target.tagName=='A'){
            // console.log(1);
            target.style.color='black'
            target.style['border-bottom']='1px solid black'
        }
    }
    topbarOut(eve){
        let target=eve.target;
        if(target.tagName=='A'){
            // console.log(1);
            target.style.color='gray'
            target.style['border-bottom']='none'
        }
    }

        // 导航移入移出
        navOver(eve){
            let target=eve.target;
            // console.log(target);
            if(target.parentNode.tagName=='LI'){
                // console.log(11);
                target.style['border-bottom']='5px solid red'
            }
    
            // if(target.parentNode.dataset.id=='one'){
            //     // console.log(11);
            //     // console.log(Home.$$('.erjione')[0]);    
            //     this.$$('.erjione')[0].style.display='block'        
            // }
            // if(target.parentNode.dataset.id=='two'){
            //     // console.log(11);
            //     // console.log(Home.$$('.erjione')[0]);    
            //     this.$$('.erjione')[1].style.display='block'        
            // }
            // if(target.parentNode.dataset.id=='three'){
            //     // console.log(11);
            //     // console.log(Home.$$('.erjione')[0]);    
            //     this.$$('.erjione')[2].style.display='block'        
            // }
        }
        navOut(eve){
            let target=eve.target;
            if(target.tagName=='A'){
                target.style['border-bottom']='none'
            }
    
            // this.$$('.erjione')[0].style.display='none';
            // this.$$('.erjione')[1].style.display='none';
            // this.$$('.erjione')[2].style.display='none';
        }

    // goto购物车
    async cartBtn(eve){
        let goodsSize=this.$$(".goods-size-cell>a").innerHTML-0;
        let goodsNum=this.$$(".goods-num-cell>a").innerHTML-0;
        // console.log(goodsSize,goodsNum);
        if(!goodsSize  ||  !goodsNum){
            alert('请选择尺码或数量')
            return;
        }
        // console.log(11);

        // console.log(eve.target);
        // 查看登录状态
        let token=localStorage.getItem('token');
        // console.log(token);
        if(!token){
            location.assign('../index/login_index.html?ReturnUrl=./details_index.html')
        }

        if(eve.target.classList.contains('goto-cart')){
            // console.log(111);
            let goodsId=this.$$(".bigImg-box").dataset.id;
            let userId=localStorage.getItem('user_id');
            // console.log(goodsId,userId);
            if(!goodsId || !userId){
                throw new Error('商品或用户ID不存在')
            }
            axios.defaults.headers.common['authorization']=token;
            axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded';
            let str=`id=${userId}&goodsId=${goodsId}`;

            let {data,status}= await axios.post('http://localhost:8888/cart/add',str);
            // console.log(data,status);

            if(status==200){
                // console.log(data);
                if(data.code==1){
                    // alert('加入成功')
                    if(eve.target.classList.contains('btn-cart')){
                        layer.open({
                            content:'您的商品已经成功加入购物车',
                            btn:['去往购物车','留在当前页'],
                            yes:function(index,layero){
                            location.assign('../index/cart_index.html')
                            },
                            btn2:function(idnex,layero){}
                        })
                    }else{
                        location.assign('../index/cart_index.html')
                    }
                }

                if(data.code==401) location.assign('../index/login_index.html?ReturnUrl=./details_index.html')
            }


        }

    }

    // 直接购买


    // 回顶
    pageScroll(){
        let times;
        let speed=60;

        times=setInterval(function(){

            // console.log(top);
            document.documentElement.scrollTop-=speed;
            if(document.documentElement.scrollTop==0){
                clearInterval(times);
            }
        },5)

    }

    // 获取数据
    async dataGetTwo(){
        let {data,status}=await axios.get('http://localhost:8888/goods/list?current=3')
        // console.log(data,status);
        // console.log(data.list.slice(5,10));
        let res=data.list.slice(5,10);

        if(status==200){
            // console.log(res);

            let html='';
            res.forEach(goods=>{
                // console.log(goods);

                html+=`<img src="${goods.img_big_logo}"  alt="">`;
            })
            this.$$(".pro-deta").innerHTML=html;
        }
    }

    // 获取数据
    async dataGet(){
        let {data,status}=await axios.get('http://localhost:8888/goods/list?current=3')
        // console.log(data,status);
        // console.log(data.list.slice(0,5));
        let res=data.list.slice(0,5);

        if(status==200){
            // console.log(res);

            let html='';
            res.forEach(goods=>{
                // console.log(goods);

                html+=`<li class="i">
                <img src="${goods.img_big_logo}" style="display: inline;" alt="">
            </li>`;
            })
            this.$$(".small-list ul").innerHTML=html;
        }
    }

    // 优惠券
    clickInfos(){
        // console.log(1);
        alert("你的手太慢了~优惠券已经么得了~")
    }
    
    // 数量隐藏渲染
    clickNumNone(eve){

        // console.log(11);
        let nm=eve.target.tagName;
        // console.log(nm);

        if(nm=='SPAN'){
        // this.$$(".chima").style.display='none'
        setTimeout(function(){
            eve.target.parentNode.parentNode.style.display='none'
        },10)
        }

        if(nm=='A'){
            // console.log(eve.target.innerHTML);
            this.$$('.goods-num-cell>a').innerText=eve.target.innerHTML;
            setTimeout(function(){
                eve.target.parentNode.parentNode.parentNode.style.display='none'
            },10)

        }
    }

    // 数量显示
    clickNum(){

        this.$$(".goods-num").style.display='block'
    }

    // 尺码隐藏渲染
    clickChi(eve){
        // console.log(11);
        let nm=eve.target.tagName;
        // console.log(nm);

        if(nm=='SPAN'){
        // this.$$(".chima").style.display='none'
        setTimeout(function(){
            eve.target.parentNode.parentNode.style.display='none'
        },10)
        }

        if(nm=='A'){
            // console.log(eve.target.innerHTML);
            this.$$('.goods-size-cell>a').innerText=eve.target.innerHTML;
            setTimeout(function(){
                eve.target.parentNode.parentNode.parentNode.style.display='none'
            },10)

        }

    }
    // 尺码显示
    clickCell(){

        // console.log(11);
        this.$$(".chima").style.display='block'
    }

    // 放大
    imgMove(eve){

        // console.log(11);

        let px=eve.pageX;
        let py=eve.pageY;
        // console.log(px,py);

        let maskw=this.$$('.mask').offsetWidth;
        let maskh=this.$$('.mask').offsetHeight;

        let tmpx=px-maskw*1.5;
        let tmpy=py-maskh*1.5;

        let maxx=this.$$(".pro-bigImg").offsetWidth-maskw;
        let maxy=this.$$(".pro-bigImg").offsetHeight-maskh;

        if(tmpx<0) tmpx=0;
        if(tmpy<0) tmpy=0;

        if(tmpx>maxx) tmpx=maxx;
        if(tmpy>maxy) tmpy=maxy;
        
        this.$$(".mask").style.left=tmpx+'px';
        this.$$(".mask").style.top=tmpy+'px';


        // 大图
        let bigTargetX = this.$$(".bigImg-box-e>img").offsetWidth-this.$$(".bigImg-box-e").offsetWidth;
        let bigTargetY =  this.$$(".bigImg-box-e>img").offsetHeight-this.$$(".bigImg-box-e").offsetHeight;
        let bigX = tmpx/maxx*bigTargetX;
        let bigY = tmpy/maxy*bigTargetY;

        // console.log(bigX,bigY)
        // console.log( this.$$(".bigImg-box-e>img"));

        this.$$(".bigImg-box-e>img").style.left=-bigX+'px';
        this.$$(".bigImg-box-e>img").style.top=-bigY+'px';

    }
    
    // 商品移入显示
    imgOver(){
        // console.log(11);

        this.$$(".mask").style.display='block';
        this.$$(".bigImg-box-e").style.display='block';

    }
    // 商品移入隐藏
    imgOut(){

        this.$$(".mask").style.display='none';
        this.$$(".bigImg-box-e").style.display='none';

    }



    // 封装获取节点
    $$(target){
        let res=document.querySelectorAll(target);

        return res.length==1? res[0]:res;
    }
}

new Delails;