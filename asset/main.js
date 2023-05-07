//dong mo menu tren mobile
var header = document.getElementById('header_container')
var btn_menu = document.getElementById('menu')
var navbar_menu = document.getElementById('navbar_menu');

btn_menu.onclick = function() {
    if(navbar_menu.className==='navbar') {
        navbar_menu.className='active_menu';
    }
    else {
        navbar_menu.className='navbar';
    }
}

//lay ra kich thuoc chieu ngang màn hình
var widthDisplay =  document.documentElement.clientWidth;
//lay ra the li dropdown
var nav_sanpham = document.getElementById('drop_content_a');
//lay ra the ul dropdown
var dropwdown__ul = document.querySelector('#dropdown-content')

//xu li su kien click the li va hien ra menu con
if(widthDisplay < 500) {
    nav_sanpham.onclick = function () {
        if( dropwdown__ul.className=='display-none') {
            dropwdown__ul.className = 'display-block';
        }
        else if(dropwdown__ul.className=='display-block'){
            dropwdown__ul.className ='display-none';
        }
    }
}


// backtop
const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
        backTop.classList.add("active");
    } else {
        backTop.classList.remove("active"); 
    }
})


// loading trang web
var loader = function() {
    setTimeout(function() {
        $('#loader').css({ 'opacity': 0, 'visibility':'hidden' });
    }, 200);
};
$(function(){
    loader();
});


