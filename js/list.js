class Delails{
    num=0;
    num1=0
    num2=0
    num3=0


    constructor(){

        this.bindEve();

        this.dataGet();

    }

    bindEve(){
        // 排序显示
        this.$$(".fil-btn").addEventListener('click',this.sortclick.bind(this))
        // 排序隐藏
        this.$$(".fil-list").addEventListener('click',this.sortclicOne.bind(this))

        // 返回顶部
        this.$$(".goto-top").addEventListener('click',this.pageScroll.bind(this))

        // 排序移入和移出
        this.$$(".fil-list").addEventListener('mouseover',this.sortover.bind(this))
        this.$$(".fil-list").addEventListener('mouseout',this.sortout.bind(this))

        // 左侧关闭
        this.$$(".goods-size").addEventListener('click',this.arrowClick.bind(this))
        this.$$(".goods-season").addEventListener('click',this.seasonClick.bind(this))
        this.$$(".goods-year").addEventListener('click',this.yearClick.bind(this))
        this.$$(".goods-series").addEventListener('click',this.seriesClick.bind(this))

        // 顶部移入移出
        this.$$(".topbar").addEventListener('mouseover',this.topbarOver.bind(this))
        this.$$(".topbar").addEventListener('mouseout',this.topbarOut.bind(this))

        // 导航移入移出
        this.$$(".nav-list").addEventListener('mouseover',this.navOver.bind(this))
        this.$$(".nav-list").addEventListener('mouseout',this.navOut.bind(this))

        this.$$(".goods-list").addEventListener('click',this.goodsClick.bind(this))
    }
    goodsClick(eve){
        console.log(eve.target);
        let parenOne=eve.target.parentNode.parentNode.parentNode;
        let parenTwo=eve.target.parentNode.parentNode;
        // console.log(parenOne,parenTwo);
        if(parenOne.classList.contains('goods-item')){
            // console.log(goods_id);
            let goodsId=parenOne.dataset.id;
            // console.log(goodsId);
            window.localStorage.setItem('id',goodsId)
        }
        if(parenTwo.classList.contains('goods-item')){
            let goodsId=parenTwo.dataset.id;
            // console.log(goodsId);
            window.localStorage.getItem('gooos_id')
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

        if(target.parentNode.dataset.id=='one'){
            // console.log(11);
            // console.log(Home.$$('.erjione')[0]);    
            this.$$('.erjione')[0].style.display='block'        
        }
        if(target.parentNode.dataset.id=='two'){
            // console.log(11);
            // console.log(Home.$$('.erjione')[0]);    
            this.$$('.erjione')[1].style.display='block'        
        }
        if(target.parentNode.dataset.id=='three'){
            // console.log(11);
            // console.log(Home.$$('.erjione')[0]);    
            this.$$('.erjione')[2].style.display='block'        
        }
    }
    navOut(eve){
        let target=eve.target;
        if(target.tagName=='A'){
            target.style['border-bottom']='none'
        }

        this.$$('.erjione')[0].style.display='none';
        this.$$('.erjione')[1].style.display='none';
        this.$$('.erjione')[2].style.display='none';
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

    // 左侧展开关闭
    seriesClick(eve){
        this.num++;
        if(this.num%2){
            this.sizeNone(eve);
        }else{
            this.sizeBlock(eve);
            this.num=0
        }
    }
    yearClick(eve){
        this.num++;
        if(this.num%2){
            this.sizeNone(eve);
        }else{
            this.sizeBlock(eve);
            this.num=0
        }
    }
    seasonClick(eve){
        this.num++;
        if(this.num%2){
            this.sizeNone(eve);
        }else{
            this.sizeBlock(eve);
            this.num=0
        }
    }
    arrowClick(eve){
        // console.log(1);

        this.num++;
        // console.log(this.num);
        
        if(this.num%2){
            this.sizeNone(eve);
        }else{
            this.sizeBlock(eve);
            this.num=0
        }
        // console.log(this.num);
    }
    sizeBlock(eve){
        eve.target.parentNode.nextElementSibling.style.display='block'
    }
    sizeNone(eve){
        // setTimeout(function(){
        //     eve.target.parentNode.nextElementSibling.style.display='none'
        //     // console.log(eve.target.parentNode.nextElementSibling);
        // },10)
        eve.target.parentNode.nextElementSibling.style.display='none'
    }

    // 排序移入移出
    sortover(eve){
        // console.log(1);
        if(eve.target.tagName=='A'){
            eve.target.style.background='lightgray'
        }
    }
    sortout(eve){
        // console.log(2);
        if(eve.target.tagName=='A'){
            eve.target.style.background='none'
        }
    }

    // 排序显示
    sortclick(){
        // console.log(11);
        this.$$(".fil-list").style.display='block';
    }

    // 回顶
    pageScroll(){
        let times;
        let speed=50;

        times=setInterval(function(){

            // console.log(top);
            document.documentElement.scrollTop-=speed;
            if(document.documentElement.scrollTop==0){
                clearInterval(times);
            }
        },10)

    }

    // 获取数据
    async dataGet(){
        let {data,status}=await axios.get('http://localhost:8888/goods/list?current=1')
        // console.log(data,status);

        if(status==200){
            // console.log(data);

            let html='';
            data.list.forEach(goods=>{
                // console.log(goods);
                
                html+=`<li class="goods-item" data-id="${goods.goods_id}">
                <div class="goods-body"">
                    <a href="../index/details_index.html" >
                        <img src="${goods.img_big_logo}" style="display: inline;" class="goods-pic" alt="">
                    </a>
                    <a href="#none" class="goods-name">${goods.title}</a>
                    <a href="#none" class="goods-price">
                        <span>${goods.price}</span>
                    </a>
                </div>
            </li>`;
            })
            this.$$(".goods-list").innerHTML=html;
        }
    }

    // 数量隐藏渲染
    sortclicOne(eve){

        // console.log(11);
        let nm=eve.target.tagName;
        // console.log(nm);

        // if(nm=='SPAN'){
        // // this.$$(".chima").style.display='none'
        // setTimeout(function(){
        //     eve.target.parentNode.parentNode.style.display='none'
        // },10)
        // }

        if(nm=='A'){
            // console.log(eve.target.innerHTML);
            this.$$('.fil-btn').innerText=eve.target.innerHTML;
            setTimeout(function(){
                eve.target.parentNode.parentNode.style.display='none'
            },10)

        }
    }

    // 封装获取节点
    $$(target){
        let res=document.querySelectorAll(target);

        return res.length==1? res[0]:res;
    }
}

new Delails;