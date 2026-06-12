async function loadUsers() {
    try {

        const res = await fetch("http://supermart-nmm3.onrender.com/api/users");

        const users = await res.json();

        if (!Array.isArray(users)) {
            throw new Error("Invalid API response");
        }

        const table = document.getElementById("userTable");
        table.innerHTML = "";

        users.forEach(user => {

            table.innerHTML += `
                <tr>
                    <td>#U${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.joined_date}</td>

                    <td>
                        <span class="status ${user.status.toLowerCase()}">
                            ${user.status}
                        </span>
                    </td>

                    <td>
                        <button onclick="viewUser(${user.id})">
                            View
                        </button>

                        <button onclick="toggleUser(${user.id})">
                            ${user.status === "Active" ? "Block" : "Unblock"}
                        </button>
                    </td>
                </tr>
            `;
        });

        // ✅ Stats update
        document.getElementById("totalUsers").innerText = users.length;

        document.getElementById("activeUsers").innerText =
            users.filter(u => u.status === "Active").length;

        document.getElementById("blockedUsers").innerText =
            users.filter(u => u.status === "Blocked").length;

    } catch (err) {
        console.error("Error loading users:", err);

        // optional fallback UI
        document.getElementById("userTable").innerHTML =
            `<tr><td colspan="6">Failed to load users</td></tr>`;
    }
}

loadUsers();
function viewUser(id) {
    alert("Viewing User ID: " + id);
}

async function toggleUser(id) {
    try {
        const res = await fetch(
            `http://supermart-nmm3.onrender.com/api/users/toggle/${id}`,
            {
                method: "PUT"
            }
        );

        const data = await res.json();
        console.log(data);

        loadUsers();

    } catch (err) {
        console.error(err);
    }
}