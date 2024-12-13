document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.getElementById("cartTable").querySelector("tbody");
    const totalPriceElem = document.getElementById("totalPrice");
    const addToFavouritesBtn = document.getElementById("addToFavourites");
    const applyFavouritesBtn = document.getElementById("applyFavourites");
    const buyNowBtn = document.getElementById("buyNow");

    const medicineInputs = document.querySelectorAll("input[type='number']");

    // Prices for each medicine
    const medicinePrices = {
        Codeine: 5,
        Fentanyl: 10,
        Hydrocodone: 12,
        Methadone: 8,
        Oxycodone: 9,
        Naloxone: 6,
        Dicloxacillin: 7,
        Amoxicillin: 8,
        Nafciline: 11,
        Oxacillin: 9,
        Penicillin: 5,
        "Penicillin-G": 7,
        Citalopram: 10,
        Escitaloprám: 12,
        Paroxetine: 8,
        Sertraline: 9,
        Vilazodene: 11,
        Fluticasone: 6,
        Ceutrizine: 4,
        Mecilizine: 5,
        Doxylamine: 6,
        Cyclizine: 7,
        Chlorpheniramine: 8,
        Diphenhydramine: 6,
        "ACE-inhibitor": 10,
        Bumetanide: 9,
        "Beta blocker": 8,
        Minoxidil: 7,
        Terazosin: 11,
        Angiotensin: 12,
    };

    function filterProducts() {
        const query = document.getElementById('searchBar').value.toLowerCase();
        const products = document.querySelectorAll('.medicine');
        products.forEach(product => {
            const label = product.querySelector('label').textContent.toLowerCase();
            product.style.display = label.includes(query) ? 'block' : 'none';
        });
    }
    
    function addToCart(){
        const quantity = document.getElementById(name).value;
        if (quantity > 0) {
            alert(`${quantity} x ${name} added to cart at $${price} each.`);
        } else {
            alert('Please enter a quantity greater than 0.');
        }
    }

    //update the cart
    function updateCart() {
        cartTable.innerHTML = ""; // Clear cart
        let totalPrice = 0;

        medicineInputs.forEach(input => {
            const quantity = parseInt(input.value);
            const medicineName = input.id;
            const price = medicinePrices[medicineName] || 0;

            if (quantity > 0) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${medicineName}</td>
                    <td>${quantity}</td>
                    <td>$${quantity * price}</td>
                `;
                cartTable.appendChild(row);
                totalPrice += quantity * price;
            }
        });

        totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
    }

    //event listeners for quantity change
    medicineInputs.forEach(input => {
        input.addEventListener("input", updateCart);
    });

    // Save favourites
    addToFavouritesBtn.addEventListener("click", () => {
        const favourites = Array.from(medicineInputs).map(input => ({
            id: input.id,
            quantity: input.value,
        }));
        localStorage.setItem("favourites", JSON.stringify(favourites));
        alert("Favourites saved successfully!");
    });

    // Apply favourites
    applyFavouritesBtn.addEventListener("click", () => {
        const favourites = JSON.parse(localStorage.getItem("favourites"));

        if (favourites) {
            favourites.forEach(fav => {
                const input = document.getElementById(fav.id);
                if (input) input.value = fav.quantity;
            });
            updateCart();
        } else {
            alert("No favourites found!");
        }
    });

    //Navigate to payment page
    buyNowBtn.addEventListener("click", () => {
        window.location.href = "payments.html";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("Payment");
    const confirmationMessage = document.getElementById("confirmationMessage");

    //process payment
    function processPayment(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get values from the form
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const deliveryDate = document.getElementById("deliveryDate").value;
        const cardNumber = document.getElementById("cardNumber").value;

        //form validation
        if (!name || !email || !address || !deliveryDate || !cardNumber) {
            alert("Please fill in all fields.");
            return;
        }

        // Valid card number
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        //confirmation message
        confirmationMessage.innerHTML = `
            <h2>Thank you for your purchase!</h2>
            <p>We have received your order and will deliver it to:</p>
            <p><strong>${name}</strong></p>
            <p>${address}</p>
            <p>Delivery Date: <strong>${deliveryDate}</strong></p>
            <p>An email has been sent to <strong>${email}</strong> with your order details.</p>
        `;
    }

    // link processPayment function to the form submit 
    paymentForm.addEventListener("submit", processPayment);
});
