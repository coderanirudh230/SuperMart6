async function loadOrders() {
    try {
        const res = await fetch("http://supermart-nmm3.onrender.com/api/orders");
        const orders = await res.json();

        const table = document.getElementById("orderTable");
        table.innerHTML = "";

        let pending = 0;
        let delivered = 0;
        let cancelled = 0;

        orders.forEach(order => {
            if (order.status === "Pending") pending++;
            if (order.status === "Delivered") delivered++;
            if (order.status === "Cancelled") cancelled++;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>#ORD${order.id}</td>
                <td>${order.customer_name}</td>
                <td>${order.product_name}</td>
                <td>₹${order.amount}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="updateStatus(${order.id}, 'Pending')">
                        Process
                    </button>

                    <button onclick="updateStatus(${order.id}, 'Delivered')">
                        Deliver
                    </button>

                    <button onclick="updateStatus(${order.id}, 'Cancelled')">
                        Cancel
                    </button>
                </td>
            `;

            table.appendChild(row);
        });

        document.getElementById("totalOrders").textContent = orders.length;
        document.getElementById("pendingOrders").textContent = pending;
        document.getElementById("deliveredOrders").textContent = delivered;
        document.getElementById("cancelledOrders").textContent = cancelled;

    } catch (error) {
        console.error("Error loading orders:", error);
    }
}

async function updateStatus(id, status) {
    try {
        await fetch(`http://supermart-nmm3.onrender.com/api/orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        loadOrders();

    } catch (error) {
        console.error("Error updating status:", error);
    }
}

window.onload = loadOrders;