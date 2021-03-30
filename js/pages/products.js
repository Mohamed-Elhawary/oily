$(function() {
    /* Start Global Variables */
    let cartNumberSpan      = document.querySelector(".shop-item span.orders"),
        productsID          = document.querySelector(".products").getAttribute("id");
    /* End Global Variables */

    //Fetch products data from the JSON file
    class Products {
        async getProducts() {
            try {
                let result = await fetch('products.json');
                let data = await result.json();
                return data;
            } catch (error) {
            console.log('error on Fetching Products');
            }
        } 
    }

    //Create UI class to customize the data in the DOM
    class UI {
        displayProducts(products) {
            //Filter the returned data depending on the oil type (Diesel or Gasoline)
            let filtered = products.filter(product => {
                return  product.oilType === document.querySelector(".products-boxes").dataset.oil;
            });
            let result = "";
            filtered.forEach(product => { 
                result += `
                    <div class="col-md-6">
                        <div class="card radius shadow-lg text-center relative mb-5 mr-auto ml-auto" id="${product.descriptionID}">
                            <img src="${product.img}" class="card-img-top rounded-circle border shadow-lg" alt="brand" style="left: 40%">
                            <div class="card-body">
                                <h5 class="card-title dark-grey h3" data-desc="${product.description}">${product.title}</h5>
                                <span class="text-muted">${product.description}</span>
                                <div class="product-dets mb-4">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="stars mt-2">
                                                ${product.stars == "3" ?
                                                ` 
                                                <i class="fas fa-star lead text-danger"></i>
                                                <i class="fas fa-star lead text-danger"></i>
                                                <i class="fas fa-star lead text-danger"></i>` :

                                                `<i class="fas fa-star lead text-danger"></i>
                                                <i class="fas fa-star lead text-danger"></i>
                                                <i class="fas fa-star lead text-light"></i>`}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="price">
                                                <del class="dark-grey">L.E.<span>${product.priceBefore}</span>.00</del>
                                                <span class="text-danger lead">L.E.<span>${product.priceAfter}</span>.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart">
                                    <button class="btn shadow-lg rounded border-danger dark-grey cart-btn">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            let productBox =  $('.products .products-boxes .row');
            productBox.append(result);
        }
    }

    //Create products object from the products class
    const product = new Products();
    //Create ui object from the UI class
    const ui = new UI();
    //Manibulate with product object
    product.getProducts().then(data => {
        let mobil = data.mobil,
            shell = data.shell,
            total = data.total;
            
        if(mobil && productsID === "mobil") { 
            //Call the displayProducts function from ui object 
            ui.displayProducts(mobil);
        }
       
        if(shell && productsID === "shell") {
            //call the displayProducts function from ui object 
            ui.displayProducts(shell);
        }

        if(total && productsID === "total") {
            //Call the displayProducts function from ui object 
            ui.displayProducts(total);
        }
        
        let productsCards = document.querySelectorAll(".products .card"),
            cardsArray    = Array.from(productsCards),
            cartButtons   = document.querySelectorAll(".products .card .cart-btn");
        
        //Create object from each card of the products
        cardsArray.forEach(card => {
            let object = {
                name: card.querySelector("h5.card-title").textContent,
                description: card.getAttribute("id"),
                price: parseInt(card.querySelector(".price span span").textContent),
                img: card.querySelector("img").getAttribute("src"),
                inCart: 0
            }
            objectsArray.push(object);
        });
        /* let cartItems = localStorage.getItem("productsInCart");
        if(cartItems && cartItems.length > 0) {
            cartItems = JSON.parse(cartItems);
        }   */
        
        //When clicking on the cart button 
        for (let i = 0; i < cartButtons.length; i++) {
            cartButtons[i].addEventListener("click", () => {
                cartNumber();
                setItems(objectsArray[i]);
                ordersTotalCost(objectsArray[i]);
                displayProductsInCart(); //External function from the components.js file
            });
        }       
    });
    
    //Calculate cart number when clicking on the cart button
    function cartNumber() {
        let ordersNumbers = localStorage.getItem("ordersNumbers");
        if(ordersNumbers) {
            ordersNumbers = parseInt(ordersNumbers);
            localStorage.setItem("ordersNumbers", ordersNumbers + 1);
            cartNumberSpan.textContent = ordersNumbers + 1;
        } else {
            localStorage.setItem("ordersNumbers", 1);
            cartNumberSpan.textContent = "1";
        }
    }

    //Set items of orders in the local storage
    function setItems(product) {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);
        if(cartItems != null) {
            if(cartItems[product.name] == undefined) {
                product.inCart = 1;
                cartItems = {
                    ...cartItems,
                    [product.name]: product
                }
            } else {
                product.inCart = cartItems[product.name].inCart + 1;
                cartItems = {
                    ...cartItems,
                    [product.name]: product
                }
            }
        } else {
            product.inCart = 1;
            cartItems = {
                [product.name]: product
            }
        }
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    }

    //Calculate total cost for product
    function ordersTotalCost(product) {
        let totalCost = localStorage.getItem("totalCost");
        if(totalCost != null) {
            totalCost = parseInt(totalCost);
            localStorage.setItem("totalCost", totalCost + product.price);
        } else {
            localStorage.setItem("totalCost", product.price);
        }
    }
});