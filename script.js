const body = document.querySelector('body');
const products = document.querySelector('.products');
const shoppingBasket = document.querySelector('.shoppingBasket');
const closeCart = document.querySelector('.close');
const productList = document.querySelector('.productList');
const quantity = document.querySelector('.quantity');
const total = document.querySelector('.total');

let ArrProducts = [
    {
        id: 1,
        name: 'Мясная бомба',
        image: 'prod1.png',
        price: '689',
        rating: 5,
    },
    {
        id: 2,
        name: 'Супер сырный',
        image: 'prod2.png',
        price: '550',
        rating: 4,
    },
    {
        id: 3,
        name: 'Сытный',
        image: 'prod3.png',
        price: '639',
        rating: 4,
    },
    {
        id: 4,
        name: 'Тяжелый удар',
        image: 'prod4.png',
        price: '480',
        rating: 3,
    },
    {
        id: 5,
        name: 'Вечная классика',
        image: 'prod5.png',
        price: '450',
        rating: 4,
    },
    {
        id: 6,
        name: 'Итальянский',
        image: 'prod6.png',
        price: '560',
        rating: 5,
    },
];
let checkOutList = [];

shoppingBasket.onclick = () =>{
    body.classList.add('active');
}

closeCart.onclick = () =>{
    body.classList.remove('active');
}

function onInit(){
    ArrProducts.forEach((item, key) => {
        let div = document.createElement('div');
        div.classList.add('item');

        let star = '';
        for(let i = 0; i < item.rating; i++){
            star += `<i class="fa fa-star"></i>`;
        }

        div.innerHTML = `
            <img src="images/${item.image}" />
            <div class="name">${item.name}</div>
            <div>${star}</div>
            <div class="price"><small>₽</small>${item.price}</div>
            <button onclick="addToCart(${key})"><i class="fa fa-cart-plus"></i> Add to Cart</button>
        `;
        products.appendChild(div);
    }); 
}
onInit();

function addToCart(id){
    if(checkOutList[id] == null){
        checkOutList[id] = ArrProducts[id];
        checkOutList[id].quantity = 1;
    }else{
        checkOutList[id].quantity += 1;
    }
    reloadCart();
}

function reloadCart(){
    productList.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    checkOutList.forEach((item, key) => {
        totalPrice += parseInt(item.price* item.quantity);
        count += item.quantity;
        let li = document.createElement('li');
        li.innerHTML = `
        <img src ="images/${item.image}" />
        <div>${item.name}</div>
        <div>${item.price}</div>
        <div>
        <button onclick="changeQuantity(${key}, ${item.quantity - 1})">-</button>
        <div class="count">${item.quantity}</div>
        <button onclick="changeQuantity(${key}, ${item.quantity + 1})">+</button>
        </div>`;
        productList.appendChild(li);
    });
    total.innerHTML = `<small>Subtotal (${count} items) ₽</small>` + totalPrice
    quantity.innerHTML = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete checkOutList[key];
    }else{
        checkOutList[key].quantity = quantity;
    }
    reloadCart();
}