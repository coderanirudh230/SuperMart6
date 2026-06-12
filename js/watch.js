function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: "Smart Watch",
        price: 4999,
        image: "../img/watches.jpg",
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

    alert("Smart Watch Added To Cart!");
}