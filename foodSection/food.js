document.addEventListener("DOMContentLoaded", () => {
    const foodSection = document.getElementById("foodSection");
    const restaurantNameElement = document.getElementById("restaurantName");


    // Get the selected restaurant index from local storage
    const selectedRestaurantIndex = localStorage.getItem("selectedRestaurantIndex");

    // Get all restaurants from local storage
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

    // Set the restaurant name in the header
    restaurantNameElement.textContent = selectedRestaurant.name;

    // Display food items from sections
    displayMenu(selectedRestaurant.sections);

    // Function to display menu sections and dishes
    function displayMenu(sections) {
        foodSection.innerHTML = ""; // Clear existing content
    
        sections.forEach(section => {
            // Section Wrapper
            const sectionWrapper = document.createElement("div");
            sectionWrapper.className = "mb-8 w-full";
    
            // Section Title
            const sectionTitle = document.createElement("h3");
            sectionTitle.className = "text-xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2 px-4";
            sectionTitle.textContent = section.name;
    
            // Section Container for Dishes
            const sectionContainer = document.createElement("div");
            sectionContainer.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
    
            if (!section.dishes || section.dishes.length === 0) {
                // If section has no dishes, show a message
                sectionContainer.innerHTML = `<p class="text-gray-500">No dishes available in this section.</p>`;
            } else {
                section.dishes.forEach((dish,index) => {
                    const dishCard = document.createElement("div");
                    dishCard.setAttribute("id",`${index}`)
                    dishCard.className = "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-auto min-w-[250px]";

    
                    dishCard.innerHTML = `
                        <img src="${dish.image || '../admin-pannel/assets/dishes-images/placeholder.jpg'}"
                            alt="${dish.name}"
                            class="w-full h-32 object-cover rounded-md">
    
                        <div class="flex-grow mt-2">
                            <h4 class="text-lg font-semibold">${dish.name}</h4>
                            <p class="text-gray-500">${dish.description || 'Delicious meal'}</p>
                            <p class="mt-1 font-bold text-green-600">$${dish.price || '0.00'}</p>
                        </div>
    
<button class="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full" 
    onclick="itemInCart(document.getElementById('${index}'))">
    Add to Cart
</button>

                    `;
    
                    sectionContainer.appendChild(dishCard);
                });
            }
    
            // Append section title & dishes to the wrapper
            sectionWrapper.appendChild(sectionTitle);
            sectionWrapper.appendChild(sectionContainer);
            foodSection.appendChild(sectionWrapper);
        });
    }
    
    
    
    // Function to show a default menu if no data exists
    function showDefaultMenu() {
        restaurantNameElement.textContent = "Default Restaurant Menu";
        foodSection.innerHTML = `
            <div class="text-center w-full">
                <h3 class="text-xl font-semibold text-gray-700">No restaurant data available.</h3>
                <p class="text-gray-500">Displaying default menu.</p>
            </div>
        `;

        // Example default sections and dishes
        const defaultSections = [
            {
                name: "Burgers",
                dishes: [
                    { name: "Classic Burger", image: "../admin-pannel/assets/dishes-images/download (2).jpeg", description: "Tasty burger", price: "5.99" }
                ]
            },
            {
                name: "Pasta",
                dishes: [
                    { name: "Creamy Alfredo", image: "../admin-pannel/assets/dishes-images/download.jpeg", description: "Delicious pasta", price: "8.99" }
                ]
            }
        ];

        displayMenu(defaultSections);
    }
});


function itemInCart(button) {
    let cardItem = button.closest(".bg-white"); // Get parent card
    let dishName = cardItem.querySelector("h4").textContent;
    let dishPrice = cardItem.querySelector("p.font-bold").textContent;
    let dishImage = cardItem.querySelector("img").src;

    // Object to store
    let itemData = {
        name: dishName,
        price: dishPrice,
        image: dishImage,
        order:"order Now"
    };

    // Get existing cart data from localStorage
    let addToCart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

    // Add new item
    addToCart.push(itemData);

    // Save back to localStorage
    localStorage.setItem("itemsInCart", JSON.stringify(addToCart));

    alert("Item added to cart!");
    console.log("Saved item:", itemData);
}
