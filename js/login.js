class Cart{

    constructor(){

        this.bindEve();

        this.backImg();

    }

    bindEve(){

        // 登录
        this.$$(".login-btns").addEventListener('click',this.loginClick.bind(this));
    }
    // 背景
    backImg(){
        let imgs=Array.from(document.querySelectorAll(".back-images>img"))
        console.log(imgs);

        let times=null;
        let index=0;
        let lastIndex=0;

        times=setInterval(()=>{

            lastIndex=index;
            index++
            
            if(index>imgs.length-1) index=0;
            // console.log(index,lastIndex);
            // console.log(imgs[index]);

            imgs[lastIndex].removeClass;
            imgs[index].calssName='ac'
        },1000)
    }

    // 登录
    loginClick(){
        let form=document.forms[0].elements;
        // console.log(usname,password);

        let username=form.usname.value;
        let password=form.password.value;
        let retuHttp=location.search.split('=')[1]
        // console.log(retuHttp);


        if(!username.trim() || !password.trim()){
            throw new Error('不能为空')
        }
        // console.log(username,password);
        axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded'
        let data=`username=${username}&password=${password}`;
        axios.post('http://localhost:8888/users/login',data).then(key=>{
            let {status,data}=key;
            // console.log(data);
            if(status==200){
                // console.log(data.code,data.user.id,data.token);
                if(data.code==1){
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('user_id',data.user.id)

                    location.assign(retuHttp);
                    // console.log(11);
                }else{
                    alert('密码或账号错误')
                }
            }
        })
    }

    // 封装获取节点
    $$(target){
        let res=document.querySelectorAll(target);

        return res.length==1? res[0]:res;
    }

}

new Cart;