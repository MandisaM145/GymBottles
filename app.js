

// get color according to image

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
    document.querySelector('.banner-left img').src = `img/bottle_${color}.png`;
}


 
    

// select modal-btn,modal-overlay,close-btn
// listen for click events on modal-btn and close-btn
// when user clicks modal-btn add .open-modal to modal-overlay
// when user clicks close-btn remove .open-modal from modal-overlay

const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtnModal = document.querySelector(".close-btn-modal");

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
});
closeBtnModal.addEventListener("click", function () {
  modal.classList.remove("open-modal");
});


// === CART ===== //////
// Variables
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

// Event Listener
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));



// // -==== selected items to cart =======//
// Variable
const AddCartButtons = document.querySelectorAll(".add-cart");

// function
AddCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box");
    addToCart(productBox);
  });
});

// Variable
const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
const productImgSrc = productBox.querySelector("img").src;
const productTitle = productBox.querySelector(".product-title").textContent;
const productPrice = productBox.querySelector(".price").textContent;   

const cartItems = cartContent.querySelectorAll(".cart-product-title");
for(let item of cartItems) {
  if(item.textContent === productTitle){
    alert("This Item is a duplicate");
    return;
  }
}

// // display items onload
const cartBox = document.createElement("div");
cartBox.classList.add("cart-box");
cartBox.innerHTML = `<img src="${productImgSrc}" class="cart-img" alt="">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button class="increment" >+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>`;
        
        cartContent.appendChild(cartBox);

        cartBox.querySelector(".cart-remove").addEventListener("click", () => {
          cartBox.remove();

          updateTotalPrice();
        });

// click events for  increment button
const updateQuantity = () => {
const increment = cartBox.querySelector('.increment');
const decrement = cartBox.querySelector('#decrement');
const numberElement = cartBox.querySelector('.number');

let p = 0;

increment.addEventListener("click", () => {
  p++;

  p = (p < 10 ) ? + p : p;
  numberElement.innerHTML = p;
  decrement.style.color = "#333";

});
 decrement.addEventListener("click", () => {
  if(p > 1){
    p--;
    
    p = (p > 10) ? + p : p;
    numberElement.innerHTML = p;
    decrement.style.color = "#999";
  }

  console.log(p);
  updateTotalPrice();
});

};

        // cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        //   const numberElement = cartBox.querySelector(".number");
        //   const decrementButton = cartBox.querySelector("#decrement");
        //   let quantity = numberElement.textContent;

          // if(event.target.id === "decrement" && quantity > 1 ) {
          //   quantity--;
          //   if (quantity === 1) {
          //     decrementButton.style.color = "#999";
          //   }
          // } else if (event.target.id === "increment") {
          //     quantity++;
          //     decrementButton.style.color = "#333";
          //   }
          // numberElement.textContent = quantity;
          // updateTotalPrice();
//         });

      // updateTotalPrice();
 };


// // sum to calculate total price for each
// const updateTotalPrice = () => {
//   let total = 0;
//   document.querySelectorAll('.product-box').forEach(product => {
//     let priceText = product.querySelector('.price').innerText.replace("R", "");
//     let price = parseFloat(priceText) || 0;
//     total += price;
//   });

//   document.querySelector('.total-price').innerText = `R${total.toFixed(2)}`;
// };

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.add-cart').forEach(button => {
//     button.addEventListener('click', (e) => {
//       let productBox = e.target.closest('.product-box');
//       let priceText = productBox.querySelector('.price').innerText.replace("R", "");
//       let price = parseFloat(priceText) || 0;

//       // Update the total price when an item is added
//       let totalPriceElement = document.querySelector('.total-price');
//       let currentTotal = parseFloat(totalPriceElement.innerText.replace("R", "")) || 0;
//       totalPriceElement.innerText = `R${(currentTotal + price).toFixed(2)}`;
//     });
//   });
// });


// Function to calculate the total price for all products
const updateTotalPrice = () => {
  let total = 0;
  document.querySelectorAll('.product-box').forEach(product => {
    let priceText = product.querySelector('.price').innerText.replace("R", "");
    let price = parseFloat(priceText) || 0;
    let quantity = parseInt(product.getAttribute('data-quantity')) || 0; // Get the quantity stored as data attribute
    total += price * quantity; // Multiply price by quantity to get the total for this product
  });

  document.querySelector('.total-price').innerText = `R${total.toFixed(2)}`;
};

// Event listener for the "DOMContentLoaded" event to ensure the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Handle adding to cart
  document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      let productBox = e.target.closest('.product-box');
      let priceText = productBox.querySelector('.price').innerText.replace("R", "");
      let price = parseFloat(priceText) || 0;

      // Retrieve the current quantity from the data attribute (initially set to 1)
      let quantity = parseInt(productBox.getAttribute('data-quantity')) || 0;
      
      // Increment the quantity
      quantity += 1;
      productBox.setAttribute('data-quantity', quantity); // Store updated quantity in the data attribute

      // Update the total price
      updateTotalPrice();
    });
  });

  // Handle removing products (decrease quantity or remove entirely)
  document.querySelectorAll('.cart-remove').forEach(button => {
    button.addEventListener('click', (e) => {
      let productBox = e.target.closest('.product-box');
      let quantity = parseInt(productBox.getAttribute('data-quantity')) || 1;

      if (quantity > 1) {
        quantity -= 1; // Decrease quantity by 1
        productBox.setAttribute('data-quantity', quantity); // Update the quantity in the data attribute
      } else {
        productBox.remove(); // If the quantity is 1, remove the product box entirely
      }

      // Update the total price
      updateTotalPrice();
    });
  });

  // Initial total price update on page load
  updateTotalPrice();
});

// const totalPriceElement = document.querySelector(".total-price");
// const cartBoxes = cartContent.querySelectorAll(".cart-box");

// cartBoxes.forEach(cartBox => {
//   const priceElement = cartBox.querySelector(".cart-price");
//   const numberElement1 = cartBox.querySelector(".number");
//   const price = priceElement.textContent.replace("R", "");
//   const quantity = numberElement1.textContent;
//   total += price * quantity;
// });

// totalPriceElement.textContent = `$${total}`;
// };

// const doGrandTotal = () => {
//   let gtotal = 0;
//   document.querySelectorAll('.total').forEach(t => {
//     gtotal += +t.innerText.replaceAll("$", "")
//   })
//   document.querySelector('#gtotal').innerText = `$${gtotal.toFixed(2)}`;
// }
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.quantity').forEach(q => {
//     q.addEventListener('input', e => {
//       let p = +e.target.closest('tr').querySelector('[data-amount]').dataset.amount * +e.target.value;
//       e.target.closest('tr').querySelector('.total').innerText = `$${p.toFixed(2)}`;
//       doGrandTotal()
//     })
//   })
//   doGrandTotal()
// })





// // submit purchase









// printing output on click
// 





// get price /
