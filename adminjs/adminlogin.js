async function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://supermart-nmm3.onrender.com/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            alert("Login Successful ✅");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Username or Password ❌");
        }

    } catch (err) {
        console.log("Login error:", err);
        alert("Server error");
    }
}