$(function() {
    /*Start Load Info, Navbar and Footer (DOM HTML Code)*/
    $(".info").load("info.html");
    $("nav.navbar").load('navbar.html', function() {
        $("nav.navbar form .fa-search").on("click", function() {
            $("nav.navbar form input").fadeToggle(400);
        });
    });
    $("footer.footer").load('footer.html');
    /*End Load Info, Navbar and Footer (DOM HTML Code)*/
});

/*Start the Shop Basket (Cart) Mechanism*/
// Define global variables
let shopBasket     = document.querySelector(".shop-item .fa-shopping-cart"),
    ordersBox      = $(".orders-box"),
    ordersList     = document.querySelector(".orders-box .orders-list"),
    cartNumberSpan = document.querySelector(".shop-item span.orders"),
    objectsArray = [];

// When reloading the page for cart number
function onLoadCartNumber() {
    let ordersNumbers = localStorage.getItem("ordersNumbers");
    if(ordersNumbers) {
        cartNumberSpan.textContent = ordersNumbers;
    }
}
onLoadCartNumber();

//When clicking on the shop basket
shopBasket.addEventListener("click", () => {
    shopBasket.classList.toggle("active");
    if(shopBasket.classList.contains("active")) {
        ordersBox.css("position", "absolute").animate({
            right: 0,
        }, 600)
    } else {
        ordersBox.css("position", "fixed").animate({
            right: "-200%",
        }, 600)
    }
});

// Display Products in Cart
function displayProductsInCart() {
    let cartItems = localStorage.getItem("productsInCart"),
        totalCost = localStorage.getItem("totalCost");
    if(cartItems && parseInt(totalCost) != 0) {
        cartItems = JSON.parse(cartItems);
        ordersList.innerHTML = "";
        Object.values(cartItems).slice(0).reverse().map(item => {
            ordersList.innerHTML += `
                <div class="order my-2 p-2 border-bottom shadow rounded relative" id= "${item.name}">
                    <i class="fas fa-times-circle cursor lead cursor z-index"></i>
                    <div class= "row">
                        <div class="col-4">
                            <div class="order-img relative">
                                <span class="in-cart bg-danger white-color rounded-circle px-2">${item.inCart}</span>
                                <img class="img-fluid rounded shadow" src = "${item.img}" alt="order_img">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="order-info">
                                <h6 class="order-name lead">${item.name}</h6>
                                <span class="text-muted">${item.description}</span>
                            </div>
                            <div class="order-cost">
                                 <span class="dark-grey">Price: L.E <span class="price">${item.price}<span>.00<span>
                                 <h6 class="text-danger mt-1">Total: L.E <span class="total-price">${item.price * item.inCart}</span>.00</h6>   
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="quantity middle-content">
                                <i class="fas fa-plus-circle cursor lead quantity-sign"></i>
                                <span class="text-danger ml-1 d-block">${item.inCart}</span>
                                <i class="fas fa-minus-circle cursor lead quantity-sign"></i>                                    
                            </div>
                        </div>
                    </div>
                </div>
            ` 
        });

        ordersList.innerHTML += `
            <div class="orders-total-cost ml-3">
                <h6 class="text-danger my-4">Orders Total Cost: <span class="text-light bg-dark rounded p-1">L.E ${totalCost}.00</span></h6>
                <button class="bg-danger btn btn-lg btn-block rounded shadow"><span class="white-color">Confirm Orders</span></button>
            </div>
        `
    } else {
        ordersList.innerHTML = `<div class="p-1 shadow rounded text-danger mt-3 bg-light" style="min-width: 350px;">Your Cart is Empty</div>`
    }
}

displayProductsInCart();

//Increase incart number for an order in the local storage
function increaseInCart(order) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    cartItems[order.name].inCart += 1;
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

//Decrease incart number for an order in the local storage
function decreaseInCart(order) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    cartItems[order.name].inCart -= 1;
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

//When clicking on different targets on the orders list box
ordersList.addEventListener("click", e => {
    let     cartItems = JSON.parse(localStorage.getItem("productsInCart")),
            totalCost = localStorage.getItem("totalCost"),
            ordersNumbers = localStorage.getItem("ordersNumbers");

    //When clicking on the delete order sign
    if (e.target.classList.contains("fa-times-circle")) {
        let targetParentId = e.target.parentElement.getAttribute("id");
        Object.values(cartItems).map(item => {
            if(item.name == targetParentId) {
                ordersNumbers = parseInt(ordersNumbers) - cartItems[item.name].inCart;
                localStorage.setItem("ordersNumbers", ordersNumbers);
                totalCost = parseInt(totalCost) - (cartItems[item.name].price * cartItems[item.name].inCart);
                localStorage.setItem("totalCost", totalCost);
                delete cartItems[item.name];
                cartItems = JSON.stringify(cartItems);
                localStorage.setItem("productsInCart", cartItems);
                displayProductsInCart();
                onLoadCartNumber()
            }
        });
    //When clicking on plus sign or minus sign to increase or decrease the order quantity
    } else if (e.target.classList.contains("quantity-sign")) {
        let targetParentId = e.target.closest(".order").getAttribute("id");
        Object.values(cartItems).map(item => {
            if(item.name == targetParentId) {
                ordersNumbers = parseInt(ordersNumbers);
                //Clicking on plus sign 
                if(e.target.classList.contains("fa-plus-circle")) {
                    ordersNumbers += 1;
                    totalCost = parseInt(totalCost) + cartItems[item.name].price;
                    increaseInCart(cartItems[item.name]);
                //Clicking on minus sign 
                } else if(e.target.classList.contains("fa-minus-circle")) {
                    if(cartItems[item.name].inCart > 1) {
                        ordersNumbers -= 1;
                        totalCost = parseInt(totalCost) - cartItems[item.name].price;
                        decreaseInCart(cartItems[item.name]); 
                    } 
                }
                localStorage.setItem("ordersNumbers", ordersNumbers);
                localStorage.setItem("totalCost", totalCost);
                displayProductsInCart();
                onLoadCartNumber();
            }
        });
    }
});
/*End the Shop Basket (Cart) Mechanism*/