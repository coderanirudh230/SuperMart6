function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: "Gaming Laptop",
        price: 89999,
        image: "../img/laptop.jpg",
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

    alert("Gaming Laptop Added To Cart!");
}