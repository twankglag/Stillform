const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

function renderCart() {
    cartItems.replaceChildren();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("cart-empty");
        empty.textContent = "Your cart is empty.";
        cartItems.appendChild(empty);
    }

    cart.forEach(function(product) {
        const item = document.createElement("div");
        item.classList.add("cart-item");

        const name = document.createElement("h3");
        const quantity = document.createElement("p");
        const subtotal = document.createElement("p");

        const increaseButton = document.createElement("button");
        increaseButton.classList.add("cart-quantity-button");
        const decreaseButton = document.createElement("button");
        decreaseButton.classList.add("cart-quantity-button");
        const removeButton = document.createElement("button");
        removeButton.classList.add("cart-remove-button");

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
        const controls = document.createElement("div");
        controls.classList.add("cart-controls");

        item.appendChild(name);
        item.appendChild(quantity);
        item.appendChild(subtotal);
        item.appendChild(controls);
        controls.appendChild(increaseButton);
        controls.appendChild(decreaseButton);
        controls.appendChild(removeButton);

        // Append item to cartItems
        cartItems.appendChild(item);
    });

    // Calculate total
    const totalPrice = cart.reduce(function(total, product) {
        return total + product.price * product.quantity;
    }, 0);

    cartTotal.textContent = "Total: $" + totalPrice.toFixed(2);
}

renderCart();