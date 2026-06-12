const API = "http://supermart-nmm3.onrender.com/api/products";

// Load products when page opens
window.onload = () => {
    loadProducts();
};

// Load Products
async function loadProducts() {
    try {
        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await res.json();

        const table = document.getElementById("productTable");
        table.innerHTML = "";

        products.forEach(product => {

            table.innerHTML += `
                <tr>

                    <td>
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            width="80"
                            height="80"
                            style="object-fit:cover;border-radius:6px;"
                            onerror="this.src='https://dummyimage.com/80x80/cccccc/000000&text=No+Image'"
                        >
                    </td>

                    <td>${product.name}</td>

                    <td>₹${product.price}</td>

                    <td>${product.category}</td>

                    <td>
                        <button onclick="editProduct(${product.id})">
                            Edit
                        </button>

                        <button onclick="deleteProduct(${product.id})">
                            Delete
                        </button>
                    </td>

                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
        alert("Failed to load products");
    }
}

// Add Product
async function addProduct() {

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const image = document.getElementById("productImage").value.trim();

    if (!name || !price || !category || !image) {
        alert("Please fill all fields");
        return;
    }

    try {

        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                price,
                category,
                image
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        alert("Product Added Successfully");

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productCategory").value = "";
        document.getElementById("productImage").value = "";

        loadProducts();

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

// Delete Product
async function deleteProduct(id) {

    if (!confirm("Delete this product?")) {
        return;
    }

    try {

        const res = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        alert("Product Deleted");

        loadProducts();

    } catch (error) {
        console.error(error);
        alert("Delete failed");
    }
}

// Edit Product
async function editProduct(id) {

    try {

        const res = await fetch(`${API}/${id}`);
        const product = await res.json();

        const name = prompt("Product Name", product.name);
        if (name === null) return;

        const price = prompt("Price", product.price);
        const category = prompt("Category", product.category);
        const image = prompt("Image URL", product.image);

        const updateRes = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                price,
                category,
                image
            })
        });

        const updateData = await updateRes.json();

        if (!updateRes.ok) {
            throw new Error(updateData.message);
        }

        alert("Product Updated");

        loadProducts();

    } catch (error) {
        console.error(error);
        alert("Update failed");
    }
}
async function editProduct(id) {
    const name = prompt("Enter new product name:");
    const price = prompt("Enter new price:");
    const category = prompt("Enter new category:");
    const image = prompt("Enter new image URL:");

    if (!name || !price || !category || !image) {
        alert("All fields required");
        return;
    }

    try {
        const res = await fetch(`http://supermart-nmm3.onrender.com/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, category, image })
        });

        const data = await res.json();

        if (data.success) {
            alert("Product Updated Successfully");
            loadProducts();
        } else {
            alert("Update failed");
        }

    } catch (err) {
        console.log(err);
    }
}