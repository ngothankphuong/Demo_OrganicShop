function isExistedInCart(item, arrCart){
    let myIndex = -1;
    arrCart.forEach((itemCart, index)=>{
        if(item.id == itemCart.id)  myIndex = index;
    });
    return myIndex;

}
function loadShoppingCart(){
    let products = [] ;//chứa các mặt hàng hiện có của giỏ hàng
    const selectedItems = (evt) => {
        const linkClicked = evt.target;
        alert("Id item: "+ linkClicked.parentElement.children[0].textContent)
        if(typeof Storage !== undefined){

            let newItem = {
                id: linkClicked.parentElement.children[0].textContent, // Lấy id 
                name: linkClicked.parentElement.children[1].textContent, // Lấy tên sản phẩm
                price: linkClicked.parentElement.children[2].textContent, // Lấy giá sản phẩm
                quantity: 1 // Khởi tạo số lượng sản phẩm bằng 1
            };
            if(JSON.parse(localStorage.getItem('cartItems')) === null){
                products.push(newItem); // thêm đối tượng sản phẩm vào giỏ hàng 
                localStorage.setItem('cartItems', JSON.stringify(products)); 
                window.location.reload();
                // Tải lại trang

            }
            else{
                const products = JSON.parse(localStorage.getItem('cartItems'));
                let index = isExistedInCart(newItem,products);
                if(index >=0){
                    products[index].quantity++; // tăng số lượng lên 1
                    localStorage.setItem('cartItems', JSON.stringify(products));
                    window.location.reload();
                }
                else products.push(newItem);
                localStorage.setItem('cartItems', JSON.stringify(products));
                window.location.reload();
            }
        }else{
            alert( "Localstorage is not working on your browser !");
        }
    }
    const attachingEvent = evt => evt.addEventListener('click',selectedItems);
    const addToCart = document.getElementsByClassName('add__cart');
    Array.prototype.forEach.call(addToCart,attachingEvent); 

    const shoppingCard = document.querySelector('.shopping__cart');
    shoppingCard.addEventListener('click', function(){
        location.href = 'GioHang.html';
    });

    if(localStorage.getItem('cartItems') != undefined){
        const numberOrderedItems = document.querySelector('.shopping__cart .no__order-item');
        let numberOfItems = 0;
        let customerOrdered = JSON.parse(localStorage.getItem('cartItems'));
        customerOrdered.forEach(item => {
            numberOfItems += item.quantity;
        })
        numberOrderedItems.innerHTML = numberOfItems;
    }
}
function showCart(){
    if(localStorage.getItem('cartItems') == undefined){
        alert("Your cart is empty. Please go back home to order items");
        // window.location.href = "GioHang.html";
    }
    else{
        let customerCart = JSON.parse(localStorage.getItem('cartItems'));

        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblFoot = document.getElementsByTagName('tfoot')[0];

        let headColumns = bodyRows = footColumns = '';
        headColumns += '<tr><th>No</th><th>Item ID</th><th>Item Name</th><th>Quantity</th><th>Item price</th><th>Delete</th></tr>';
        tblHead.innerHTML = headColumns;
        vat = total = amoutPaid = 0;
        no = 0;
        if(customerCart[0] === null){
            bodyRows += '<tr><td colspan="5">No items found</td></tr>';
        }else{
            customerCart.forEach(item => {
                total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g,""));
                bodyRows += '<tr><td>'+ ++no+'</td><td>'+ item.id+'</td><td>'+ item.name+'</td><td>'+ item.quantity+'</td>'+'<td>'+ formatCurrency(item.price.replace(/[^0-9]/g,"")) +'</td><td><a href="#" onclick=deleteCart(this);>Delete</a></td></tr>';
            })
        }
        tblBody.innerHTML = bodyRows;
        footColumns += '<tr><td colspan="4">Total: </td> <td>'+formatCurrency(total) +'</td><td rowspan="3"></td></tr>';
        footColumns += '<tr><td colspan="4">VAT (10%):</td> <td>'+formatCurrency(Math.floor(total*0.1)) +'</td></tr>';
        footColumns += '<tr><td colspan="4">Amount paid:</td> <td>'+formatCurrency(Math.floor(total*1.1)) +'</td></tr>';
        
        tblFoot.innerHTML = footColumns;
    }
}
// Xóa sản phẩm trong giỏ hàng
function deleteCart(evt){
    let updateProducts = [];
    let customerCart = JSON.parse(localStorage.getItem('cartItems'));
    customerCart.forEach(item => {
        if(item.id != evt.parentElement.parentElement.children[1].textContent){
            updateProducts.push((item));
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(updateProducts));
    window.location.reload();
}
// Chuyễn đổi đơn vị tiền tệ Việt nam
const formatCurrency = (amount, locale="vi-VN") => {
    return new Intl.NumberFormat(locale,{
        style:'currency',
        currency: 'VND',
        minimumFractionDigits:0,
        maximumFractionDigits:2
    }).format(amount);
}