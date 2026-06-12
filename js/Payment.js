function loadPaymentSummary(){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let paymentItems =
        document.getElementById("paymentItems");

    let subtotal = 0;

    paymentItems.innerHTML = "";

    cart.forEach(item => {

        let itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        paymentItems.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${itemTotal.toLocaleString()}</td>
        </tr>
        `;
    });

    let delivery = 50;

    let gst = Math.round(subtotal * 0.18);

    let total =
        subtotal + delivery + gst;

    document.getElementById("subtotal")
        .innerText =
        "₹" + subtotal.toLocaleString();

    document.getElementById("gst")
        .innerText =
        "₹" + gst.toLocaleString();

    document.getElementById("totalAmount")
        .innerText =
        "₹" + total.toLocaleString();
}
function confirmOrder(){

    localStorage.removeItem("cart");

    window.location.href =
        "../index/order-success.html";
}
loadPaymentSummary();


let address =
JSON.parse(localStorage.getItem("deliveryAddress"));

if(address){

document.getElementById("savedAddress").innerHTML = `
<div style="
    background:#f5f5f5;
    padding:15px;
    border-radius:10px;
    margin-bottom:20px;
">

<h3>📍 Delivery Address</h3>

<p><b>${address.name}</b></p>
<p>${address.address}</p>
<p>${address.city}, ${address.state} - ${address.pincode}</p>
<p>📞 ${address.mobile}</p>

</div>
`;
}