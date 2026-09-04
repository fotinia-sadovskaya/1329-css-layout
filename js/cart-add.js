function addToCart(name, image, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: Date.now(),
            name,
            image,
            price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    showToast("Added to cart!");
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
}
