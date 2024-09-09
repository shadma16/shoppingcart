
const products = [
    {
        "id": 1,
        "name": "Eco-friendly Bamboo Toothbrush",
        "price": 199,
        "currency": "INR",
        "description": "A sustainable bamboo toothbrush with soft bristles, perfect for daily use.",
        "image_url": "https://cdn.shopify.com/s/files/1/0560/4166/8681/products/Charcoal_New_4_87e90225-aa10-47ea-a80c-0ed05ae83ae7_295x.jpg?v=1649761036"
    },
    {
        "id": 2,
        "name": "Stainless Steel Water Bottle",
        "price": 499,
        "currency": "INR",
        "description": "A durable stainless steel water bottle that keeps beverages cold for 24 hours.",
        "image_url": "https://www.milton.in/cdn/shop/files/Gripper_Bottle_700ml_Black_1.jpg?v=1701490401&width=900"
    },
    {
        "id": 3,
        "name": "Organic Cotton T-shirt",
        "price": 799,
        "currency": "INR",
        "description": "Comfortable and breathable organic cotton t-shirt, perfect for casual wear.",
        "image_url": "https://brownliving.in/cdn/shop/products/mens-organic-cotton-polo-fabclo-1-mens-tshirt-brown-living-862049_300x.jpg?v=1682964591"
    }
];

let cart = [];

window.onload = function() {
    displayProducts();
    updateCart();
};


function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" style="width:100%; height:auto;">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">Price: ${product.currency} ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}


function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const existingProduct = cart.find(item => item.product.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ product: product, quantity: 1 });
    }
    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    cartItems.innerHTML = ''; 
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        totalPrice += item.product.price * item.quantity;
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.product.name} - ${item.product.currency} ${item.product.price.toFixed(2)} 
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
        `;
        cartItems.appendChild(listItem);
    });
    
    totalPriceElem.textContent = totalPrice.toFixed(2);
}


function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}


function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); 
    }
    updateCart();
}


function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('Thank you for your purchase!');
        cart = []; 
        updateCart(); 
    }
}
