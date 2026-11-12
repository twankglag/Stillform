const button = document.querySelector("#add-to-cart");
const feedback = document.querySelector("#cart-feedback");
const summary = document.querySelector("#card-summary");
const cartTotal = document.querySelector("#cart-total");

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalQuantity = cart.reduce(function(total, product) {
        return total + product.quantity;
    }, 0);

    summary.textContent = "Items in cart: " + totalQuantity;

    // Calculate the total price
    const totalPrice = cart.reduce(function(total, product) {
        return total + product.quantity * product.price; 
    }, 0);

    cartTotal.textContent = "Total: $" + totalPrice.toFixed(2);

}

button.addEventListener("click", function() {
    // Retrieve the existing cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check whether this product is already in the cart
    const existingProduct = cart.find(function(product) {
        return product.id === "ny-cheesecake";
    });

    if (existingProduct) {
        // Increase quantity if the product already exists
        existingProduct.quantity += 1;
    } else {
        // Otherwise, add a new product
        cart.push({
            id: "ny-cheesecake",
            name: "Classic New York Cheesecake",
            price: 7.49,
            quantity: 1
        });
    }

    // Save the updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    
    feedback.textContent = "Added to cart!";

    updateCartSummary();
});

updateCartSummary();