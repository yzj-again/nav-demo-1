const $siteList = $('.siteList');
const x = localStorage.getItem('x')
//console.log(x)为null
const xObject = JSON.parse(x);
//console.log(xObject)为null
//第一次xObject等于空，不能直接等于
const hashMap = xObject || [{
    logo: 'A', url: 'https://www.acfun.cn'
}, {
    logo: 'B', url: 'https://www.bilibili.com'
}]
const $lastLi = $siteList.find('li.last');
const simplifyUrl = (url) => {//replace产生一个新的字符串
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');//正则表达式删掉/开头的内容
}
const render = () => {
    //只需要维护hashMap再此构建DOM树
    $siteList.find('li:not(.last)').remove();
    //找到所有li对象数组，唯独不找.last
    hashMap.forEach((node,index) => {//foreach会给两个参数，
        const $startLi = $(`<li>

            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" >
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
            </div>

        </li>`).insertBefore($lastLi);
        $startLi.on('click',()=>{
           window.open(node.url,'_self');
        });
        $startLi.on('click','.close',(e)=>{
           e.stopPropagation()//阻止冒泡
            hashMap.splice(index,1);
           render();
        });
    });
}
render();
$('.addButton').on('click', () => {
    let url = window.prompt('请输入新增网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://www.' + url;
    }
    hashMap.push({logo: simplifyUrl(url)[0].toUpperCase(), url: url})//也可以在css中用text-transform:uppercase
    render();
});
//跳转页面时存储hashmap
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);//是string
    // console.log(string)
    // console.log(hashMap)
    window.localStorage.setItem('x', string)//本地存储x
}
//localStorage与cookie有关或用户硬盘满了，google恰好会删除ls
//3.用户使用无痕模式

// document.addEventListener()
$(document).on('keypress',(e)=>{
    //console.log(e.key)
    const key=e.key;
    for (let i = 0; i < hashMap.length; i++) {
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url,'_self');
        }
    }

})
//no-minify不要压缩