document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const navDesserts = document.getElementById('nav-desserts');
    const navSavoryMenu = document.getElementById('nav-savory-menu');
    const navDrinks = document.getElementById('nav-drinks');
    const navOthers = document.getElementById('nav-others');
    const showCartButton = document.getElementById('show-cart');
    const cartContainer = document.getElementById('cart-container');
    const closeCartButton = document.getElementById('close-cart');
    const sectionDesserts = document.getElementById('desserts');
    const sectionSavoryMenu = document.getElementById('savory-menu');
    const sectionDrinks = document.getElementById('drinks');
    const sectionOthers = document.getElementById('others');

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const addToCartModalButton = document.getElementById('addToCartModal');
    const closeModalButton = document.querySelector('.close');
    const customAlert = document.getElementById('custom-alert');
    const customAlertMessage = document.getElementById('custom-alert-message');
    const quantityInput = document.getElementById('quantity');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    let cart = [];

    function showSection(sectionId) {
        sectionDesserts.style.display = 'none';
        sectionSavoryMenu.style.display = 'none';
        sectionDrinks.style.display = 'none';
        sectionOthers.style.display = 'none';

        document.getElementById(sectionId).style.display = 'block';
    }

    navDesserts.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('desserts');
    });

    navSavoryMenu.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('savory-menu');
    });

    navDrinks.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('drinks');
    });

    navOthers.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('others');
    });

    showSection('savory-menu');

    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Limpiar carrito
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} <button class="remove-item" data-index="${index}">Eliminar</button>`;
            cartItemsContainer.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);

        // Añadir eventos a los botones de eliminar
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                cart.splice(index, 1); // Eliminar item del carrito
                updateCart(); // Actualizar vista del carrito
            });
        });
    }

    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCart();
    }

    function changeQuantity(amount) {
        const currentQuantity = parseInt(quantityInput.value, 10);
        if (!isNaN(currentQuantity) && currentQuantity + amount > 0) {
            quantityInput.value = currentQuantity + amount;
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const name = menuItem.getAttribute('data-name');
            const price = parseFloat(menuItem.getAttribute('data-price'));
            const description = menuItem.getAttribute('data-description');
            const image = menuItem.getAttribute('data-image');

            // Set modal content
            modalImage.src = `img/${image}`;
            modalTitle.textContent = name;
            modalDescription.textContent = description;
            modalPrice.textContent = price.toFixed(2);

            // Reset quantity input
            quantityInput.value = 1;

            // Show modal
            modal.style.display = 'block';
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    addToCartModalButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value, 10);
        const name = modalTitle.textContent;
        const price = parseFloat(modalPrice.textContent);

        if (isNaN(quantity) || quantity <= 0) {
            customAlertMessage.textContent = 'Por favor, ingrese una cantidad válida.';
            customAlert.style.display = 'block';
            setTimeout(() => {
                customAlert.style.display = 'none';
            }, 1500);
            return;
        }

        // Añadir item al carrito
        addToCart(name, price, quantity);

        // Mostrar alerta de éxito
        customAlertMessage.textContent = `Se añadió ${quantity} x ${name} al carrito.`;
        customAlert.style.display = 'block';
        setTimeout(() => {
            customAlert.style.display = 'none';
        }, 1500);

        // Ocultar modal
        modal.style.display = 'none';
    });

    showCartButton.addEventListener('click', () => {
        cartContainer.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    });

    window.changeQuantity = function(amount) {
        const currentQuantity = parseInt(quantityInput.value, 10);
        if (!isNaN(currentQuantity) && currentQuantity + amount > 0) {
            quantityInput.value = currentQuantity + amount;
        }
    };

    document.getElementById('custom-alert').addEventListener('click', function() {
        this.style.display = 'none';
    });
});
