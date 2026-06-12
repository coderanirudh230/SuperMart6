// Load All Sellers
async function loadSellers() {
    try {
        const res = await fetch(
            "http://supermart-nmm3.onrender.com/api/sellers"
        );

        const sellers = await res.json();

        const table =
            document.getElementById("sellerTable");

        table.innerHTML = "";

        sellers.forEach((seller) => {

            const statusClass =
                seller.status === "Approved"
                    ? "approved"
                    : seller.status === "Rejected"
                    ? "blocked"
                    : "pending";

            const actionButtons =
                seller.status === "Pending"
                    ? `
                        <button onclick="approveSeller(${seller.id})">
                            Approve
                        </button>

                        <button onclick="rejectSeller(${seller.id})">
                            Reject
                        </button>
                    `
                    : "Completed";

            table.innerHTML += `
                <tr>
                    <td>${seller.id}</td>
                    <td>${seller.seller_name}</td>
                    <td>${seller.email}</td>
                    <td>${seller.store_name}</td>

                    <td>
                        <span class="${statusClass}">
                            ${seller.status}
                        </span>
                    </td>

                    <td>${actionButtons}</td>
                </tr>
            `;
        });

        // Statistics
        document.getElementById("totalSellers").innerText =
            sellers.length;

        document.getElementById("approvedSellers").innerText =
            sellers.filter(
                seller => seller.status === "Approved"
            ).length;

        document.getElementById("pendingSellers").innerText =
            sellers.filter(
                seller => seller.status === "Pending"
            ).length;

        document.getElementById("rejectedSellers").innerText =
            sellers.filter(
                seller => seller.status === "Rejected"
            ).length;

    } catch (err) {
        console.error(
            "Error loading sellers:",
            err
        );
    }
}

// Approve Seller
async function approveSeller(id) {
    try {

        const res = await fetch(
            `http://supermart-nmm3.onrender.com/api/sellers/approve/${id}`,
            {
                method: "PUT"
            }
        );

        const data = await res.json();

        alert(
            data.message || "Seller Approved Successfully"
        );

        loadSellers();

    } catch (err) {
        console.error(
            "Error approving seller:",
            err
        );
    }
}

// Reject Seller
async function rejectSeller(id) {
    try {

        const res = await fetch(
            `http://supermart-nmm3.onrender.com/api/sellers/reject/${id}`,
            {
                method: "PUT"
            }
        );

        const data = await res.json();

        alert(
            data.message || "Seller Rejected Successfully"
        );

        loadSellers();

    } catch (err) {
        console.error(
            "Error rejecting seller:",
            err
        );
    }
}

// Search Seller
function searchSeller() {

    const input =
        document.getElementById("searchSeller");

    const filter =
        input.value.toLowerCase();

    const rows =
        document.querySelectorAll(
            "#sellerTable tr"
        );

    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        row.style.display =
            text.includes(filter)
                ? ""
                : "none";
    });
}

// Load sellers when page opens
document.addEventListener(
    "DOMContentLoaded",
    loadSellers
);