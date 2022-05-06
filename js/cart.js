class Cart{

    constructor(){

        this.loginNo();

        this.getGoods();

        this.bindEve();
    }
    bindEve(){

        this.$$(".carts-tab").addEventListener('click',this.clicks.bind(this));

        this.$$(".checkbox-all-t input").addEventListener('click',this.checkAll.bind(this))
        this.$$(".checkbox-all-b input").addEventListener('click',this.checkAll.bind(this))


        // 导航移入移出
        this.$$(".nav-list").addEventListener('mouseover',this.navOver.bind(this))
        this.$$(".nav-list").addEventListener('mouseout',this.navOut.bind(this))

        // 顶部移入移出
        this.$$(".topbar").addEventListener('mouseover',this.topbarOver.bind(this))
        this.$$(".topbar").addEventListener('mouseout',this.topbarOut.bind(this))

        // 返回顶部
        this.$$(".goto-top").addEventListener('click',this.pageScroll.bind(this))

        // 结算
        this.$$(".btn-to-set").addEventListener('click',this.setBtn.bind(this))

        // input加减
        this.$$(".cart-table").addEventListener('click',this.inputClick.bind(this))
    }
    // input加减
    inputClick(eve){
        // console.log(111);
        if(eve.target.classList.contains('num-minus')){
            // console.log(11);
            // console.log(eve.target.nextElementSibling);
            eve.target.nextElementSibling.value=eve.target.nextElementSibling.value-1;
            if(eve.target.nextElementSibling.value==0) {
                eve.target.style="pointer-events: none;cursor: default;color:gray;"
            }else{
                eve.target.style="";
            }
        }
        if(eve.target.classList.contains('num-plus')){
            eve.target.previousElementSibling.previousElementSibling.style="";
            eve.target.previousElementSibling.value=eve.target.previousElementSibling.value-0+1;
        }
        
    }

    // 结算
    setBtn(){
        alert('你有钱吗就结算？')
    }

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
    
    }
    navOut(eve){
            let target=eve.target;
            if(target.tagName=='A'){
                target.style['border-bottom']='none'
            }
    
    }
    

// 全选
    checkAll(eve){
        // console.log(eve.target);
        let check=eve.target.checked;
        // console.log(check);

        this.checks(check);
        // 总价总量
        this.getAll();

    }
// 单独
    checks(check){
        // console.log(this.$$(".checkbox-labal input").checked);
        let trObj=this.$$(".goods-item");
        // console.log(trObj,check);
        trObj.forEach(tr=>{
            tr.firstElementChild.firstElementChild.firstElementChild.checked=check;
        })
        this.$$(".checkbox-all-t input").checked=check;
        this.$$(".checkbox-all-b input").checked=check;
    }
    

// 监听
    clicks({target}){

        // console.log(target);
        if(target.classList.contains('delete-one')){
            // console.log(1);

            this.deletClick(target);
            

        }
        if(target.classList.contains('check-one')){

            // console.log(target);
            this.checkone(target);
            // 数量价格
            this.getAll();
        }
    }

    // 单选
    checkone(target){
        // console.log(target);
        if(!target.checked){
            this.$$(".checkbox-all-t input").checked=false;
            this.$$(".checkbox-all-b input").checked=false;
            return;
        }

        if(target.checked){

            let only=this.$$(".check-one");
            // console.log(only);
            let res=Array.from(only).find(checkbox=>{
                // console.log(checkbox.checked);
                return !checkbox.checked;
            })
            // console.log(res);
            if(!res){
                this.$$(".checkbox-all-t input").checked=true;
                this.$$(".checkbox-all-b input").checked=true;
            }
        }
    }
    // 删除
    deletClick(target){
        let that=this;
        let id=target.parentNode.parentNode.parentNode.parentNode.dataset.id;
            // console.log(id);
            let userId=localStorage.getItem('user_id')

            layer.confirm('确认删除吗？',{
                title:'删除商品'
            },function(){
                // console.log(id,userId);
                
                axios.get('http://localhost:8888/cart/remove?id='+userId+'&goodsId='+id).then(res=>{
                    let {status,data}=res;
                    // console.log(status,data);
                    if(data.code==1){

                        layer.close();
                        layer.msg('删除成功')

                        target.parentNode.parentNode.parentNode.parentNode.remove();

                        // 数量价格
                        that.getAll();
                    }
                })
            })
    }

    
    // 总价总量
    getAll(){
        let trObj=document.querySelectorAll(".goods-item");
        // console.log(trObj);

        let goodsNum=0;
        let goodsPrice=0
        trObj.forEach(goods=>{
            // console.log(goods);
            // console.log(goods.firstElementChild.firstElementChild.firstElementChild.checked);
            let checks=goods.firstElementChild.firstElementChild.firstElementChild.checked;
            if(checks){
                // console.log(goods.querySelector(".infos-price").innerHTML);
                goodsNum=goods.querySelector('.num-input').value-0+goodsNum;
                goodsPrice=goods.querySelector(".infos-price").innerHTML-0+goodsPrice;
                // console.log(goodsNum,goodsPrice);
            }

            // 渲染
            this.$$(".sum-total").firstElementChild.innerHTML='总计:'+goodsNum+'件';
            this.$$(".sum-total .price").innerHTML='￥'+goodsPrice;
        })

    }

// 渲染
    async getGoods(){

        let userId=localStorage.getItem('user_id');
        let token=localStorage.getItem('token');
        axios.defaults.headers.common['authorization']=token;

        let {status,data}=await axios.get('http://localhost:8888/cart/list?id='+userId)
        // console.log(status,data);
        if(status==200){
            // console.log(data.cart);
            if(data.code==401) location.assign('../index/login_index.html?ReturnUrl=./cart_index.html')

            let html='';
            let allNum=0;
            
            data.cart.forEach(goods=>{

                html+=`<tr class="goods-item" data-id="${goods.goods_id}">
                <td class="td-check">
                    <label for="" class="checkbox-label">
                        <input type="checkbox" class="checkbox-input check-one">
                        
                    </label>
                </td>
                <td class="td-img">
                    <a href="#none">
                        <img src="${goods.img_small_logo}" alt="">
                    </a>
                </td>
                <td class="td-infos">
                    <div class="td-infos-top">
                        <div class="fl">
                            <h5>跑鞋</h5>
                            <p>
                                <span>颜色:荧光亮深红/油彩黄;尺码:40</span>
                            </p>
                        </div>
                        <div class="fr">
                            <span class="infos-price">${goods.price*goods.cart_number}</span><i>元</i>
                        </div>
                    </div>

                    <div class="td-infos-bot">
                        <p class="fl">
                            <span>数量:${goods.cart_number}</span>
                            <a href="#none" class="num-minus">-</a>
                            <input type="text" class="num-input" value="${goods.cart_number}">
                            <a href="#none" class="num-plus">+</a>
                        </p>
                        <p class="fr">
                            <a href="#none" class="delete-one">删除</a>
                        </p>
                    </div>
                </td>
            </tr>`;

            allNum=goods.cart_number+allNum;

            })

            this.$$(".cart-table").innerHTML=html;
            // console.log(allNum);
            this.$$(".cart-title").innerHTML=`<span>我的购物车</span>
            <i class="total-num">共  ${allNum} 件</i>`;
            
        }

    }

// 判断登录
    async loginNo(){

        let token=localStorage.getItem('token')
        axios.defaults.headers.common['authorization']=token;
        let userId=localStorage.getItem('user_id');
        // console.log(token);
        // 登录状态
        let {status,data}=await axios.get('http://localhost:8888/users/info/'+userId)
        // console.log(data);

        if(!token  || data.code==401){
            location.assign('../index/login_index.html?ReturnUrl=./cart_index.html')
        }
    }


    // 封装获取节点
    $$(target){
        let res=document.querySelectorAll(target);

        return res.length==1? res[0]:res;
    }
}

new Cart;