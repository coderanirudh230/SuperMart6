async function loadWishlist() {
    const res = await fetch("http://supermart-nmm3.onrender.com/wishlist");
    const data = await res.json();

    const container = document.querySelector(".wishlist-container");
    container.innerHTML = "";

    if (!data.success || data.data.length === 0) {
        container.innerHTML = "<h3>Wishlist is empty ❤️</h3>";
        return;
    }

    data.data.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <img src="${item.image}" />

                <h3>${item.product_name}</h3>
                <p>₹${item.price}</p>

                <button onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });
}

async function removeItem(id) {
    await fetch(`http://supermart-nmm3.onrender.com/wishlist/delete/${id}`, {
        method: "DELETE"
    });

    loadWishlist();
}

loadWishlist();