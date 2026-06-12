function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: "iPhone 16",
        price: 79999,
        image: "../img/ihone.jpg",
        quantity: 1
    };

    let existingProduct = cart.find(
        item => item.name === product.name
    );

    if(existingProduct){
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("iPhone 16 Added To Cart!");
}