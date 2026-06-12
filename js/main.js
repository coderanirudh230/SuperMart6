const API = "http://supermart-nmm3.onrender.com/api/products";

// Load products when page opens
window.onload = () => {
    loadProducts();
    updateWishlistCount();
    updateCartCount();   // ✅ ADD THIS
};
// Get container
const productsSection = document.getElementById("productsSection");

// Load Products
async function loadProducts() {

    try {

        const res = await fetch(API);
        const products = await res.json();

        productsSection.innerHTML = "";

        products.forEach(product => {

            productsSection.innerHTML += `
                <div class="product-card">

                    <img src="${product.image}" alt="${product.name}">

                    <h3>${product.name}</h3>

                    <p>₹${product.price}</p>

                   <button onclick="addToCart(event, ${product.id})">
    🛒 Add to Cart
</button>

                    <button onclick="addToWishlist(${product.id})">
                        ❤️ Wishlist
                    </button>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        alert("Failed to load products");
    }
}
function addToCart(event, productId) {

    const productCard = event.target.closest(".product-card");

    const name = productCard.querySelector("h3").innerText;
    const price = productCard.querySelector("p").innerText.replace("₹", "");
    const image = productCard.querySelector("img").src;

    fetch("http://supermart-nmm3.onrender.com/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product_id: productId,
            product_name: name,
            price: price,
            image: image,
            quantity: 1
        })
    })
    .then(() => alert("Added to cart 🛒"))
    .catch(() => alert("Error adding to cart"));
}
function addToWishlist(productId) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(item => item.id === productId);

    if (exists) {
        alert("Already in wishlist ❤️");
        return;
    }

    wishlist.push({ id: productId });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();

    alert("Added to wishlist ❤️");
}

function updateWishlistCount() {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    document.getElementById("wishCount").innerText = wishlist.length;
}
function updateCartCount() {
    fetch("http://supermart-nmm3.onrender.com/cart")
        .then(res => res.json())
        .then(data => {
            document.getElementById("cartCount").innerText = data.length;
        });
}