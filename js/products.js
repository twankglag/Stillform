const searchInput = document.querySelector("#product-search");
const categorySelect = document.querySelector("#category-filter");
const productCards = document.querySelectorAll(".product-card");

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;

    productCards.forEach(function(card) {
        const productName = card.querySelector("h3").textContent.toLowerCase();

        const productCategory = card.querySelector(".product-category")
            .textContent.toLowerCase().trim();

        const matchesName = productName.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        card.hidden = !(matchesName && matchesCategory);
    });
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);