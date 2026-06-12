async function loadDashboard() {
    try {
        // SALES
        const salesRes = await fetch("http://supermart-nmm3.onrender.com/api/dashboard/sales");
        const salesData = await salesRes.json();
        document.getElementById("salesCount").innerText = salesData.totalSales;

        // PRODUCTS
        const productRes = await fetch("http://supermart-nmm3.onrender.com/api/dashboard/products");
        const productData = await productRes.json();
        document.getElementById("productCount").innerText = productData.totalProducts;

        // USERS
        const userRes = await fetch("http://supermart-nmm3.onrender.com/api/dashboard/users");
        const userData = await userRes.json();
        document.getElementById("userCount").innerText = userData.totalUsers;

    } catch (err) {
        console.log("Dashboard error:", err);
    }
}

// run on page load
loadDashboard();