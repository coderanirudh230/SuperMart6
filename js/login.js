document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic validation
    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch("http://supermart-nmm3.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {

            alert("Login successful 🎉");

            // Save user in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to home page
            window.location.href = "../index/main.html";

        } else {
            alert(data.message || "Login failed");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server not responding");
    }
});