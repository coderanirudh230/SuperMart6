function addToCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: "Wireless Headphones",
        price: 2999,
        image: "../img/headphone.jpg",
        quantity: 1
    };

    let existingProduct = cart.find(
        item => item.name === product.name
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Wireless Headphones Added To Cart!");
}