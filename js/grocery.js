async function loadGrocery() {
    try {
        const res = await fetch("http://supermart-nmm3.onrender.com/api/products");
        const products = await res.json();

        const container = document.getElementById("groceryList");
        container.innerHTML = "";

        // Filter only Grocery products
        const groceryItems = products.filter(p => p.category === "Grocery");

        groceryItems.forEach(p => {
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
        console.log("Error loading grocery:", err);
    }
}

// CART FUNCTION (basic)
function addToCart(name, price) {
    alert(`${name} added to cart (₹${price})`);
}

// AUTO LOAD
loadGrocery();