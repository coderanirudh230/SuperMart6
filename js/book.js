
async function loadBooks() {
    try {
        const res = await fetch("http://supermart-nmm3.onrender.com/api/books");
        const books = await res.json();

        const container = document.getElementById("booksList");
        container.innerHTML = "";

        books.forEach(book => {
            container.innerHTML += `
                <div class="product">
                    <img src="${book.image}" alt="book">

                    <h3>${book.name}</h3>

                    <p>₹${book.price}</p>

                    <button onclick="deleteBook(${book.id})">
                        Delete
                    </button>
                </div>
            `;
        });

    } catch (err) {
        console.log(err);
    }
}

// DELETE
async function deleteBook(id) {
    const res = await fetch(`http://supermart-nmm3.onrender.com/api/books/${id}`, {
        method: "DELETE"
    });

    const data = await res.json();

    if (data.success) loadBooks();
    else alert("Delete failed");
}
function addToWishlist(id, name, price, image) {
    fetch("http://supermart-nmm3.onrender.com/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product_id: id,
            product_name: name,
            price: price,
            image: image
        })
    }).then(() => {
        alert("Added to wishlist ❤️");
    });
}
loadBooks();