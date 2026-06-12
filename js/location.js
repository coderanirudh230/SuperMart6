function saveAddress(){

    let userAddress = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        pincode: document.getElementById("pincode").value
    };

    localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(userAddress)
    );

    alert("Address Saved Successfully!");

    window.location.href = "main.html";
}

let address =
JSON.parse(localStorage.getItem("deliveryAddress"));

if(address){

document.getElementById("locationText").innerText =
address.city + " - " + address.pincode;

}

