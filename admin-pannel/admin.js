document.addEventListener("DOMContentLoaded", () => {
    let getRestaurant = JSON.parse(localStorage.getItem("restaurants")) || [];
    const restaurantContainer = document.getElementById("restaurantSection");

    if (!restaurantContainer) {
        console.error("Element with ID 'restaurantSection' not found.");
        return;
    }

    // Clear existing content
    restaurantContainer.innerHTML = "";

    // Loop through stored restaurants and create cards
    getRestaurant.forEach((restaurant, index) => {
        const restaurantCard = document.createElement("div");
        restaurantCard.className = "bg-white p-4 rounded-lg shadow-md";

        restaurantCard.innerHTML = `
            <img src="${restaurant.logo || 'https://via.placeholder.com/150'}" 
                 alt="${restaurant.name}" 
                 class="w-full h-40 bg-gray-300 rounded object-cover">
            <h4 class="text-lg font-semibold mt-2">${restaurant.name}</h4>
            <p class="text-gray-600">${restaurant.address}</p>
            <button class="mt-2 bg-green-500 text-white px-4 py-2 rounded" onclick="viewRestaurant(${index})">View</button>
        `;

        restaurantContainer.appendChild(restaurantCard);
    });
});

// ✅ Function to Handle "View" Button Click
function viewRestaurant(index) {
    localStorage.setItem("selectedRestaurantIndex", index);
    document.addEventListener("DOMContentLoaded", () => {
        let getRestaurant = JSON.parse(localStorage.getItem("restaurants")) || [];
        const restaurantContainer = document.getElementById("restaurantSection");
    
        if (!restaurantContainer) {
            console.error("Element with ID 'restaurantSection' not found.");
            return;
        }
    
        // Clear existing content
        restaurantContainer.innerHTML = "";
    
        // Loop through stored restaurants and create cards
        getRestaurant.forEach((restaurant, index) => {
            const restaurantCard = document.createElement("div");
            restaurantCard.className = "bg-white p-4 rounded-lg shadow-md";
    
            restaurantCard.innerHTML = `
                <img src="${restaurant.logo || 'https://via.placeholder.com/150'}" 
                     alt="${restaurant.name}" 
                     class="w-full h-40 bg-gray-300 rounded object-cover">
                <h4 class="text-lg font-semibold mt-2">${restaurant.name}</h4>
                <p class="text-gray-600">${restaurant.address}</p>
                <button class="mt-2 bg-green-500 text-white px-4 py-2 rounded" onclick="viewRestaurant(${index})">View</button>
            `;
    
            restaurantContainer.appendChild(restaurantCard);
        });
    });
    
    // ✅ Function to Handle "View" Button Click
    function viewRestaurant(index){
        localStorage.setItem("selectedRestaurantIndex", index);
        window.location.href = "items-section.html";
    }
    
}

