// ----------------------
// LOAD CART
// ----------------------
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.cart__content');

    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Your cart is currently empty.</p>';
        updateTotal();
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item__img">
            <span>${item.name} (${item.quantity}) — $${item.price.toFixed(2)}</span>
            <button class="button button-card" onclick="removeItem(${item.id})">Remove</button>
        </div>
    `).join('');

    updateTotal();
}

// ----------------------
// REMOVE ITEM (with animation)
// ----------------------
function removeItem(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const itemElement = document.querySelector(`[data-id="${id}"]`);
    if (itemElement) {
        itemElement.classList.add('cart-item-remove');
        setTimeout(() => {
            itemElement.remove();
            loadCart();
        }, 300);
    }
}

// ----------------------
// CLEAR CART
// ----------------------
function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

// ----------------------
// UPDATE TOTAL
// ----------------------
function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalBox = document.querySelector('.cart-total');
    if (!totalBox) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    totalBox.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// ----------------------
// CHECKOUT
// ----------------------
function checkout() {
    localStorage.removeItem('cart');

    const container = document.querySelector('.cart__content');
    container.innerHTML = '<p class="cart-empty">Thank you! Your order has been placed.</p>';

    updateTotal();
}

// ----------------------
// INIT
// ----------------------
document.addEventListener('DOMContentLoaded', loadCart);
