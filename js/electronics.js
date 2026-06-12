async function loadElectronics() {
    try {
        const res = await fetch("http://supermart-nmm3.onrender.com/api/products");
        const products = await res.json();

        const container = document.getElementById("productList");
        container.innerHTML = "";

        // show only electronics category
        const electronics = products.filter(p => p.category === "Electronics");

        electronics.forEach(p => {
            container.innerHTML += `
                <div class="product-card">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>₹${p.price}</p>
                    <button onclick="addToCart('${p.name}', ${p.price})">
                        Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (err) {
        console.log("Error loading products:", err);
    }
}

// OPTIONAL CART FUNCTION
function addToCart(name, price) {
    alert(`${name} added to cart! ₹${price}`);
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
// AUTO LOAD
loadElectronics();