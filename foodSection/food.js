document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Checking login status...");
        
        let userLogin = localStorage.getItem("userLogin");
        console.log("User Login Status:", userLogin); // Debugging
    
        if (userLogin === "true") {
            console.log("Redirecting to home page...");
            window.location.reload
        }else{
            console.log("Redirecting to login page...");
            window.location.href = "login-sign-up/index.html"; // Adjust path if needed
        }
    });
    



    // Get elements
    const foodSection = document.getElementById("foodSection");
    const restaurantNameElement = document.getElementById("restaurantName");
    const productSidebar = document.getElementById("productSidebar");
    const sidebarContent = document.getElementById("sidebarContent");
    const closeSidebar = document.getElementById("closeSidebar");

    // Get selected restaurant from local storage
    const selectedRestaurantIndex = localStorage.getItem("selectedRestaurantIndex");
    let restaurants = JSON.parse(localStorage.getItem("restaurants"));

    if (!restaurants || selectedRestaurantIndex === null) {
        showDefaultMenu();
        return;
    }

    const selectedRestaurant = restaurants[selectedRestaurantIndex];

    if (!selectedRestaurant || !selectedRestaurant.sections || selectedRestaurant.sections.length === 0) {
        showDefaultMenu();
        return;
    }

    // Set restaurant name in header
    restaurantNameElement.textContent = selectedRestaurant.name;
    displayMenu(selectedRestaurant.sections);

    // Function to display menu
    function displayMenu(sections) {
        foodSection.innerHTML = ""; // Clear previous content
    
        sections.forEach(section => {
            const sectionWrapper = document.createElement("div");
            sectionWrapper.className = "w-full";
    
            const sectionTitle = document.createElement("h3");
            sectionTitle.className = "text-xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2 px-4";
            sectionTitle.textContent = section.name;
    
            const sectionContainer = document.createElement("div");
            sectionContainer.className = "flex flex-wrap gap-6"; // Use Flexbox
    
            if (!section.dishes || section.dishes.length === 0) {
                sectionContainer.innerHTML = `<p class="text-gray-500">No dishes available in this section.</p>`;
            } else {
                section.dishes.forEach(dish => {
                    const dishCard = document.createElement("div");
                    dishCard.className = "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-start w-[250px] h-auto";
    
                    // Create dish image element
                    const dishImage = document.createElement("img");
                    dishImage.src = dish.image || '../admin-pannel/assets/dishes-images/placeholder.jpg';
                    dishImage.alt = dish.name;
                    dishImage.className = "w-full h-40 object-cover rounded-md cursor-pointer";
    
                    // ✅ Attach event listener to image only
                    dishImage.addEventListener("click", () => openSidebar(dish));
    
                    // Create dish details container
                    const dishDetails = document.createElement("div");
                    dishDetails.className = "flex-grow mt-3";
                    dishDetails.innerHTML = `
                        <h4 class="text-lg font-semibold">${dish.name}</h4>
                        <p class="text-gray-500 text-sm">${dish.description || 'Delicious meal'}</p>
                        <p class="mt-2 font-bold text-green-600 text-lg">$${dish.price || '0.00'}</p>
                    `;
    
                    // Create "Order Now" button
                    const orderButton = document.createElement("button");
                    orderButton.className = "mt-4 bg-green-500 text-white px-4 py-2 rounded w-full";
                    orderButton.textContent = "Order Now";
                    orderButton.addEventListener("click", () => orderNow(dish.name, dish.price, dish.image));
    
                    // Create "Add to Cart" button
                    const cartButton = document.createElement("button");
                    cartButton.className = "mt-2 bg-red-500 text-white px-4 py-2 rounded w-full";
                    cartButton.textContent = "Add to Cart";
                    cartButton.addEventListener("click", () => itemInCart(dish.name, dish.price, dish.image));
    
                    // Append elements inside the dish card
                    dishCard.appendChild(dishImage);
                    dishCard.appendChild(dishDetails);
                    dishCard.appendChild(orderButton);
                    dishCard.appendChild(cartButton);
    
                    sectionContainer.appendChild(dishCard);
                });
            }
    
            sectionWrapper.appendChild(sectionTitle);
            sectionWrapper.appendChild(sectionContainer);
            foodSection.appendChild(sectionWrapper);
        });
    }
    
    
    
    
    
    function openSidebar(dish) {
        // Add product details inside sidebar
        sidebarContent.innerHTML = `
            <button id="closeSidebar" class="absolute top-4 right-6 text-xl text-red-500 font-bold">✖</button>
            
            <h2 class="text-2xl font-bold text-green-600">${dish.name}</h2>
            <img src="${dish.image || '../admin-pannel/assets/dishes-images/placeholder.jpg'}"
                alt="${dish.name}"
                class="w-full h-64 object-cover rounded-md mt-4">
            <p class="mt-4 text-gray-600">${dish.description || "A tasty meal"}</p>
            <p class="mt-2 font-bold text-green-600 text-xl">$${dish.price || "0.00"}</p>
            
            <button id="orderNowBtn" class="mt-4 bg-green-500 text-white px-6 py-2 rounded w-full">
                Order Now
            </button>
    
            <button id="addToCartBtn" class="mt-2 bg-red-500 text-white px-6 py-2 rounded w-full">
                Add to Cart
            </button>
        `;
    
        // Show sidebar
        productSidebar.classList.remove("translate-x-full");
    
        // Attach event listener for close button
        setTimeout(() => {
            const closeBtn = document.getElementById("closeSidebar");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    productSidebar.classList.add("translate-x-full");
                });
            }
    
            // ✅ Attach event listener for "Order Now" button
            const orderBtn = document.getElementById("orderNowBtn");
            if (orderBtn) {
                orderBtn.addEventListener("click", () => {
                    orderNow(dish.name, dish.price, dish.image);
                });
            }
    
            // ✅ Attach event listener for "Add to Cart" button
            const cartBtn = document.getElementById("addToCartBtn");
            if (cartBtn) {
                cartBtn.addEventListener("click", () => {
                    itemInCart(dish.name, dish.price, dish.image);
                });
            }
    
        }, 50); // Small delay to ensure elements exist before adding listeners
    }
    
    




   

    // Function to show default menu
    function showDefaultMenu() {
        restaurantNameElement.textContent = "Default Restaurant Menu";
        foodSection.innerHTML = `
            <div class="text-center w-full p-10 bg-yellow-100 rounded-lg shadow-md">
                <h3 class="text-2xl font-bold text-gray-700">Oops! No restaurant data found.</h3>
                <p class="text-gray-500">Showing a default menu.</p>
            </div>
        `;

        const defaultSections = [
            {
                name: "Burgers",
                dishes: [
                    { name: "Classic Burger", image: "../admin-pannel/assets/dishes-images/download (2).jpeg", description: "Tasty burger with fresh ingredients.", price: "5.99" }
                ]
            },
            {
                name: "Pasta",
                dishes: [
                    { name: "Creamy Alfredo", image: "../admin-pannel/assets/dishes-images/download.jpeg", description: "Rich and creamy Alfredo pasta.", price: "8.99" }
                ]
            }
        ];

        displayMenu(defaultSections);
    }








    // Function to handle ordering a dish
function orderNow(name, price, image) {
    let orders = JSON.parse(localStorage.getItem("orderItems")) || [];

    let orderItem = {
        name: name,
        price: price,
        image: image,
        status: "Pending Order"
    };

    orders.push(orderItem);
    localStorage.setItem("orderItems", JSON.stringify(orders));

    alert(`✅ Order placed for ${name}`);
}

// Function to add item to the cart
function itemInCart(name, price, image) {
    let cartItems = JSON.parse(localStorage.getItem("itemsInCart")) || [];

    let cartItem = {
        name: name,
        price: price,
        image: image
    };

    cartItems.push(cartItem);
    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));

    alert(`🛒 ${name} added to cart!`);
}

});
