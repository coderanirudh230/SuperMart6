async function loadMobiles() {
    try {
        const res = await fetch("http://supermart-nmm3.onrender.com/api/products/mobile");
        const data = await res.json();

        const container = document.getElementById("mobileList");
        container.innerHTML = "";

        data.forEach(product => {
            container.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">₹${product.price}</p>
                    </div>

                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (err) {
        console.log("Error loading mobiles:", err);
    }
}

// OPTIONAL CART FUNCTION
function addToCart(id) {
    alert("Added to cart: " + id);
}
function addToWishlist(id, name, price, image) {
    fetch("http://supermart-nmm3.onrender.com/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product_id: id,
            product_name: name,
            price: price,
            image: image
        })
    }).then(() => {
        alert("Added to wishlist ❤️");
    });
}
loadMobiles();