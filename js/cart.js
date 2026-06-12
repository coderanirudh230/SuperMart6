const container = document.getElementById("cartContainer");
const totalAmountEl = document.getElementById("totalAmount");

let cartData = [];

function loadCart() {
    fetch("http://supermart-nmm3.onrender.com/cart")
        .then(res => res.json())
        .then(data => {
            cartData = data;
            renderCart();
        });
}

function renderCart() {

    container.innerHTML = "";
    let total = 0;

    cartData.forEach(item => {

        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="100">

                <h3>${item.product_name}</h3>

                <p>Price: ₹${item.price}</p>

                <p>Qty: ${item.quantity}</p>

                <button onclick="removeItem(${item.id})">
                    Remove ❌
                </button>
            </div>
        `;
    });

    totalAmountEl.innerText = total;
}

function removeItem(id) {
    fetch(`http://supermart-nmm3.onrender.com/cart/${id}`, {
        method: "DELETE"
    })
    .then(() => loadCart());
}

function buyNow() {
    if (cartData.length === 0) {
        alert("Cart is empty!");
        return;
    }

    alert("Redirecting to payment 💳");

    // Later: Razorpay / Stripe integration here
}

loadCart();