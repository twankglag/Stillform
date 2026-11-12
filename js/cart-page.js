const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

function renderCart() {
    cartItems.replaceChildren();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(function(product) {
        const item = document.createElement("div");

        const name = document.createElement("h3");
        const quantity = document.createElement("p");
        const subtotal = document.createElement("p");

        const increaseButton = document.createElement("button");
        const decreaseButton = document.createElement("button");
        const removeButton = document.createElement("button");

        // Set the name's textContent
        name.textContent = product.name;

        // Set the quantity's textContent
        quantity.textContent = "Quantity: " + product.quantity;

        // Calculate and display the subtotal
        const subtotalPrice = product.price * product.quantity;
        subtotal.textContent = "Subtotal: $" + subtotalPrice.toFixed(2);

        // Increase the quantity of product
        increaseButton.textContent = "+";
        increaseButton.addEventListener("click", function() {
            product.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });

        // Decrease the quantity of product
        decreaseButton.textContent = "-";
        decreaseButton.addEventListener("click", function() {
            if (product.quantity > 1) {
                product.quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        });

        // Remove product from cart
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function() {
            const updatedCart = cart.filter(function(item) {
                return item.id !== product.id;
            });
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            renderCart();
        });

        // Append all three elements to item
        item.appendChild(name);
        item.appendChild(quantity);
        item.appendChild(subtotal);
        item.appendChild(increaseButton);
        item.appendChild(decreaseButton);
        item.appendChild(removeButton);

        // Append item to cartItems
        cartItems.appendChild(item);
    });
}

renderCart();