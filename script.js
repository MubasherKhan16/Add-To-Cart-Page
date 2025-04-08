const cartIcon=document.querySelector(".addcart-logo");
const crossIcon=document.querySelector(".close");
const cart=document.querySelector(".add-to-cart");

cartIcon.addEventListener("click",()=>{
  cart.classList.add("active");
})

crossIcon.addEventListener(("click"),()=>{
  cart.classList.remove("active");
})

const cartLogo=document.querySelectorAll(".addcart-logo-move");
cartLogo.forEach(button=>{
  button.addEventListener("click",event=>{
    const productBox=event.target.closest(".product1");
    addToCart(productBox);
  })
});

const cartContent=document.querySelector(".cart-details")
const addToCart=productBox=>{
  const productImg=productBox.querySelector("img").src;
  const productTitle=productBox.querySelector(".para p").textContent;
  const productPrice=productBox.querySelector(".same p").textContent;

  const cartItems=document.querySelectorAll(".product-title");
  for(let items of cartItems){
    if( items.textContent===productTitle){
      alert("This product is already added in the Cart");
      return;
    }
  }

  const cartBox=document.createElement("div");
  cartBox.classList.add("cart-Box");  
  cartBox.innerHTML = `
    <div class="left-section"> 
      <img src="${productImg}" alt="">
    </div>
    <div class="middle-section">
      <p class="product-title">${productTitle}</p>
      <p class="product-price">${productPrice}</p>
      <div class="increDec">
        <button class="increment">+</button>
        <p>1</p>
        <button class="decrement">-</button> 
      </div>
    </div>
    <div class="delete-icon">
      <i class="fa-solid fa-trash"></i>
    </div>
  `;

  cartContent.appendChild(cartBox);

  cartBox.querySelector(".delete-icon").addEventListener("click",()=>{
    cartBox.remove();
    updateTotalPrice();
    updateCartItemCount(-1);
  })


  cartBox.querySelector(".increDec").addEventListener("click",event=>{
    const quantityNumber=cartBox.querySelector(".increDec p");
    let quantity=parseInt(quantityNumber.textContent);



    if(event.target.classList.contains("decrement") && quantity>1){
      quantity--;
    }
    else if(event.target.classList.contains("increment")){
      quantity++;
    }
    quantityNumber.textContent=quantity;
    updateTotalPrice();
  });
  updateCartItemCount(1);
  updateTotalPrice();
};


const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total p");
  const cartBoxes = cartContent.querySelectorAll(".cart-Box");
  let total = 0;

  cartBoxes.forEach(cartBox => {
    const priceText = cartBox.querySelector(".product-price").textContent;
    const quantityText = cartBox.querySelector(".increDec p").textContent;

    const price = parseFloat(priceText.replace("$", ""));
    const quantity = parseInt(quantityText);

    total += price * quantity;
  });

  totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
};


let cartItemCount=0;

const updateCartItemCount=change=>{
  let count=document.querySelector(".cart-item-count");
  cartItemCount+=change;

  if(cartItemCount>0){
    count.style.visibility="visible";
    count.textContent=cartItemCount;
  }
  else{
    count.style.visibility="hidden";
    count.textContent="";
  }
}


const buybtn=document.querySelector(".buy-button button");
buybtn.addEventListener("click",()=>{
  const cartBoxes=cartContent.querySelectorAll(".cart-Box");
  if(cartBoxes.length===0){
    alert("Your cart is empty,Please add products to the cart");
    return;
  }

  cartBoxes.forEach(box=>
    box.remove())

    let count=document.querySelector(".cart-item-count");
    count.style.visibility="hidden";
    updateTotalPrice(0);
    updateTotalPrice();
   

    alert("Thankyou for shopping from our website! ")

});



