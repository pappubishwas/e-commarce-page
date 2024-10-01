document.addEventListener("DOMContentLoaded", function () {
  const minusBtn = document.querySelector(".minus");
  const plusBtn = document.querySelector(".plus");
  const quantityDisplay = document.querySelector(".add-item p");

  // Function to update the quantity display
  function updateQuantity(quantity) {
    quantityDisplay.textContent = quantity;
  }

  // Event listener for the plus button (increase quantity)
  plusBtn.addEventListener("click", function () {
    let qt = parseInt(quantityDisplay.textContent);
    qt++;
    updateQuantity(qt);
  });

  // Event listener for the minus button (decrease quantity)
  minusBtn.addEventListener("click", function () {
    let qt = parseInt(quantityDisplay.textContent);
    if (qt > 0) {
      qt--;
      updateQuantity(qt);
    }
  });

  const bigPic = document.querySelector(".big-pic img");
  const smallPics = document.querySelectorAll(".small-pic img");

  // Event listeners for clicking on small images to change the big image
  smallPics.forEach(function (smallPic) {
    smallPic.addEventListener("click", function () {
      bigPic.src = smallPic.src.replace("-thumbnail", "");
      smallPics.forEach(function (pic) {
        pic.style.filter = "none";
      });

      smallPic.style.filter =
        "grayscale(400%) sepia(400%) hue-rotate(20deg) saturate(55%) blur(1px)";
    });
  });



  const bigImageMain = document.querySelector(".product .big-pic img"); 
  const popup = document.querySelector(".product-pic[style]"); 
  const bigImagePopup = popup.querySelector(".big-pic1 .big-image1"); 
  const closeIcon = popup.querySelector(".close-icon"); 
  const prevIcon = popup.querySelector(".prev-button"); 
  const nextIcon = popup.querySelector(".next-button"); 
  const smallPicsPopup = popup.querySelectorAll(".small-pic1 img");

  let currentImageIndex = 0;


  const imageSources = [
    "/images/image-product-1.jpg",
    "/images/image-product-2.jpg",
    "/images/image-product-3.jpg",
    "/images/image-product-4.jpg",
  ];

  // Open popup when the main big image is clicked
  bigImageMain.addEventListener("click", function () {
    popup.style.display = "flex";
    document.body.classList.add("blur-background"); 
    updateBigImageInPopup(currentImageIndex); 
  });

  // Close popup when the close icon is clicked
  closeIcon.addEventListener("click", function () {
    popup.style.display = "none";
    document.body.classList.remove("blur-background"); 
  });

  // Update the big image in the popup
  function updateBigImageInPopup(index) {
    bigImagePopup.src = imageSources[index];
    smallPicsPopup.forEach((pic, idx) => {
      pic.style.filter = idx === index ? "grayscale(400%) sepia(400%) hue-rotate(20deg) saturate(55%) blur(1px)" : "none";
    });
  }

  // Event listener for the previous button in the popup
  prevIcon.addEventListener("click", function () {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = imageSources.length - 1;
    }
    updateBigImageInPopup(currentImageIndex);
  });

  // Event listener for the next button in the popup
  nextIcon.addEventListener("click", function () {
    if (currentImageIndex < imageSources.length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0; 
    }
    updateBigImageInPopup(currentImageIndex);
  });


  // Handle small picture clicks in the popup to update the big image
  smallPicsPopup.forEach(function (smallPic, index) {
    smallPic.addEventListener("click", function () {
      updateBigImageInPopup(index); 
    });
  });



  // Get the image element and buttons
  const bigImage = document.querySelector(".big-image");
  const prevButton = document.querySelector(".prev-button1");
  const nextButton = document.querySelector(".next-button1");
  let currentIndex = 0;


  function updateImage() {
    bigImage.src = imageSources[currentIndex];
  }

  // Event listener for the previous button
  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    updateImage();
  });

  // Event listener for the next button
  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    updateImage();
  });




  function updateCartQuantity() {
    const quantityElement = document.querySelector(".add-item p");
    const cartQuantityElement = document.getElementById("cart-quantity");

    let quantity =
      parseInt(quantityElement.textContent) +
      parseInt(cartQuantityElement.textContent);

    if (quantity > 0) {
      cartQuantityElement.textContent = quantity;
      cartQuantityElement.style.display = "inline-block";
    } else {
      cartQuantityElement.textContent = "0";
      cartQuantityElement.style.display = "none";
    }
    quantityElement.textContent = "0";
  }


  const addCartBtn = document.querySelector(".add-card-btn button");

  addCartBtn.addEventListener("click", function () {
    const quantityElement = document.querySelector(".add-item p");
    let quantity = parseInt(quantityElement.textContent);

    if (quantity > 0) updateCartQuantity();
  });


  // Function to toggle the visibility of the cart
  function toggleCart() {
    const cartDiv = document.querySelector(".cart");
    const emptyMessage = cartDiv.querySelector(".empty-message");
    const itemsContainer = cartDiv.querySelector(".items");
    const cartQuantityElement = document.getElementById("cart-quantity");
    let quantity = parseInt(cartQuantityElement.textContent);

    if (cartDiv.style.display === "none") {
      cartDiv.style.display = "block";
      if (quantity > 0) {
        itemsContainer.style.display = "block";
        emptyMessage.style.display = "none";

        const totalResult = 125 * quantity; 
        const priceElement = document.querySelector(".price");
        priceElement.innerText = `$${125} x ${quantity} = $${totalResult}`;
      } else {
        itemsContainer.style.display = "none";
        emptyMessage.style.display = "block";
      }
    } else {
      cartDiv.style.display = "none";
    }
  }

  // Function to delete an item from the cart
  function deleteItem() {
    const emptyMessage = document.querySelector(".empty-message"); 
    const itemsContainer = document.querySelector(".items");

    if (itemsContainer) {
      const cartQuantityElement = document.getElementById("cart-quantity");
      cartQuantityElement.textContent = "0";
      cartQuantityElement.style.display = "none";
      emptyMessage.style.display = "block"; 
      itemsContainer.style.display = "none"; 
    }
  }

  // Function to close the cart when clicking outside of it
  function closeCart(event) {
    const cartDiv = document.querySelector(".cart");
    const cartIcon = document.querySelector(".card-nav-icon");

    if (!cartDiv.contains(event.target) && !cartIcon.contains(event.target)) {
      cartDiv.style.display = "none";
    }
  }

  document.querySelector(".delete-icon").addEventListener("click", deleteItem);

  document.querySelector(".card-nav-icon").addEventListener("click", toggleCart);
  //document.querySelector(".card-nav-icon").addEventListener("mouseenter",toggleCart);

  document.addEventListener("click", closeCart);


  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.querySelector(".sidebar");
  const sidebarClose = document.querySelector(".sidebar img");

  menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("active"); 
  });

  sidebarClose.addEventListener("click", function () {
    sidebar.classList.toggle("active"); 
  });


});
