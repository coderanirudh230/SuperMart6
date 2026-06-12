window.onload = function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    // Fill top profile
    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profileEmail").innerText = user.email;

    // Fill details section
    document.getElementById("fullName").innerText = user.name;
    document.getElementById("mobileNumber").innerText = user.mobile || "Not added";
    document.getElementById("address").innerText = user.address || "Not added";
};

function editProfile() {
    const user = JSON.parse(localStorage.getItem("user"));

    const name = prompt("Enter Name", user.name);
    const mobile = prompt("Enter Mobile", user.mobile || "");
    const address = prompt("Enter Address", user.address || "");

    fetch(`http://supermart-nmm3.onrender.com/api/auth/update-profile/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, mobile, address })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Profile updated!");

            // update localStorage
            user.name = name;
            user.mobile = mobile;
            user.address = address;

            localStorage.setItem("user", JSON.stringify(user));

            location.reload();
        }
    });
}