const button = document.querySelector("#add-to-cart");
const feedback = document.querySelector("#cart-feedback");

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
});