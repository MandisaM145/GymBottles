// select modal-btn,modal-overlay,close-btn
// listen for click events on modal-btn and close-btn
// when user clicks modal-btn add .open-modal to modal-overlay
// when user clicks close-btn remove .open-modal from modal-overlay

const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
});
closeBtn.addEventListener("click", function () {
  modal.classList.remove("open-modal");
});

// -==== Color Change for Banner =======//
const COLOR_BTNS = document.querySelectorAll('.color');
COLOR_BTNS.forEach(color => {
    color.addEventListener('click', () => {
        let colorNameClass = color.className;
        if(!color.classList.contains('active-color')){
            let colorName = colorNameClass.slice(colorNameClass.indexOf('-') + 1, colorNameClass.length);
            resetActiveBtns();
            color.classList.add('active-color');
            setNewColor(colorName)
        };

        
    });
})



// resetting all color btns
function resetActiveBtns(){
    COLOR_BTNS.forEach(color => {
        color.classList.remove('active-color');
    });
}

// set new color on the banner right 
function setNewColor(color){
    document.querySelector('.banner-right img').src = `img/bottle_${color}.png`;
}



// Radio buttons selected//
let radioBtns = document.querySelectorAll("input[name='bottle']");
//  let value = document.querySelectorAll("input{value=[green, grey, lightblue, darkblue, pink]}");
let result = document.getElementById("result");
 let findSelected = () => {
    let selected = document.querySelector("input[name='bottle']:checked").value;
    result.textContent = `Value of selcted radio button: ${selected}`;
 }
 radioBtns.forEach( radioBtns => {
    radioBtns.addEventListener("change",findSelected);
findSelected();

    })

 


// -==== Cart Operations =======//

// Add to Cart Button Event Listener
const AddCartButtons = document.querySelectorAll(".add-cart");
AddCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);

    });
   
});

// Add item to cart
function addToCart(productBox) {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    // Check for duplicates
    if (isDuplicateInCart(productTitle)) {
        alert("This Item is a duplicate");
        return;
    }

    const cartBox = createCartBox(productImgSrc, productTitle, productPrice);
    document.querySelector(".cart-content").appendChild(cartBox);
    updateTotalPrice();
    
}

// Check if the item is already in the cart
function isDuplicateInCart(productTitle) {
    const cartItems = document.querySelectorAll(".cart-product-title");
    return Array.from(cartItems).some(item => item.textContent === productTitle);
}

// Create cart box element
function createCartBox(productImgSrc, productTitle, productPrice) {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img" alt="">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;
    
    // Event listeners for quantity increment and decrement
    setupQuantityButtons(cartBox);

    // Event listener for remove item
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateCartCount (-1);
        updateTotalPrice();
        
    });

    return cartBox;
}

// Setup increment and decrement functionality for quantity
function setupQuantityButtons(cartBox) {
    const increment = cartBox.querySelector('.increment');
    const decrement = cartBox.querySelector('.decrement');
    const numberElement = cartBox.querySelector('.number');
    
    let quantity = 1;
    increment.addEventListener("click", () => {
        quantity++;
        numberElement.innerText = quantity;
        updateTotalPrice();
    });

    decrement.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            numberElement.innerText = quantity;
            updateTotalPrice();
        }
    });
    updateCartCount(1);
}

// Update total price in cart
function updateTotalPrice() {
    let total = 0;
    const cartContent = document.querySelector(".cart-content");
    cartContent.querySelectorAll('.cart-box').forEach(cartBox => {
        const price = parseFloat(cartBox.querySelector('.cart-price').textContent.replace('R', '')) || 0;
        const quantity = parseInt(cartBox.querySelector('.number').textContent) || 1;
        total += price * quantity;
    });
    document.querySelector('.total-price').textContent = `R${total.toFixed(2)}`;
}

// Cart Icon Open/Close functionality
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Item count add
let cartItemCount = 0;

const updateCartCount = change => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  
  // Update the cart item count
  cartItemCount += change;

  if (cartItemCount > 0) {
    // Make the cart count visible and set the correct count
    cartItemCountBadge.style.visibility = 'visible';  
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    // Hide the cart count if no items are in the cart
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";  // Clear the text when hidden
  }

};


const buyNowButton = document.querySelector(".btn-buy");

buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");

    if (cartBoxes.length === 0) {
        alert("Cart is empty, please add items!");
        return;
    }

    // Remove all items from the cart
    cartBoxes.forEach(cartBox => cartBox.remove());

    // Reset cart item count
    cartItemCount = 0;
    
    // Update the cart item count badge
    updateCartCount(0);

    // Update the total price (should be 0 now)
    updateTotalPrice();

    // Show thank you message
    alert("Thank you for your purchase, goodbye.");
});



//Clear submit button //
let clearBtn = document.querySelector('.submit');
let inputs = document.querySelectorAll('input');
clearBtn.addEventListener('click', () => {
inputs.forEach(input => input.value = '');
})


// const burger = document.querySelector('.burger-icon');
// const links = document.querySelector('.links');

// burger.addEventListener('click', () => {
//     links.classList.toggle('show');
// });
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

// Toggle the visibility of the navigation links when the burger menu is clicked
burgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
});
