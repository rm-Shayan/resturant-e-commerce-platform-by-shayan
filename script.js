document.addEventListener("DOMContentLoaded", () => {
    const restaurantContainer = document.getElementById("restaurantSection");
    const searchInput = document.getElementById("searchRestaurant");


// Function to toggle cart visibility


const getRandomFallbackImage = () => {
    const fallbackImages = [
        "admin-pannel/assets/resturant-images/1.jpeg",
        "admin-pannel/assets/resturant-images/2.jpeg",
        
    ];
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};





    // Function to load and display restaurants
    const loadRestaurants = (filter = "") => {
        let restaurants = JSON.parse(localStorage.getItem("restaurants"));

        if (!restaurants) {
            // If no restaurants in local storage, fetch from JSON file
            fetch("admin-pannel/resturant.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to load restaurant data.");
                    }
                    return response.json();
                })
                .then(data => {
                    // Save to local storage for future use
                    localStorage.setItem("restaurants", JSON.stringify(data));
                    displayRestaurants(data, filter);
                })
                .catch(error => {
                    console.error("Error loading JSON:", error);
                    restaurantContainer.innerHTML = `<p class="text-red-500">Failed to load restaurants.</p>`;
                });
        } else {
            displayRestaurants(restaurants, filter);
        }
    };

    // Function to display restaurants
    const displayRestaurants = (restaurants, filter) => {
        restaurantContainer.innerHTML = ""; // Clear existing content
    
        const filteredRestaurants = restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(filter.toLowerCase())
        );
    
        if (filteredRestaurants.length === 0) {
            restaurantContainer.innerHTML = `
                <div class="bg-white p-4 rounded-lg shadow-md text-center">
                    <h4 class="text-lg font-semibold text-gray-700">No restaurants found</h4>
                    <p class="text-gray-500">Try searching for something else.</p>
                    <img src="admin-pannel/assets/resturant-images/subway.webp" 
                        class="w-32 mx-auto mt-2">
                </div>
            `;
            return;
        }
    let i=0
        filteredRestaurants.forEach((restaurant, index) => {
            const restaurantCard = document.createElement("div");
           ++i; 
            restaurantCard.className = "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300";
    
            // Ensure a valid image URL or use a default fallback
            const imageUrl = restaurant.logo && restaurant.logo.trim() !== "" 
                ? restaurant.logo 
                : "admin-pannel/assets/resturant-images/subway.webp";
    
            restaurantCard.innerHTML = `
                <img src="${imageUrl}" 
         alt="${restaurant.name}"
         class="w-full h-40 object-cover rounded" 
         onerror="this.onerror=null; this.src='${getRandomFallbackImage()}';">

                <h4 class="text-lg font-semibold mt-2">${restaurant.name}</h4>
                <p class="text-gray-500">${restaurant.address || "Address not available"}</p>
                <button class="mt-2 bg-green-500 text-white px-4 py-2 rounded view-restaurant" data-index="${index}">View</button>
            `;
 
            restaurantContainer.appendChild(restaurantCard);
        });
    
        document.querySelectorAll(".view-restaurant").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                viewRestaurant(index);
            });
        });
    };
    

    // Function to handle restaurant selection
    const viewRestaurant = (index) => {
        localStorage.setItem("selectedRestaurantIndex", index);
        window.location.href = "foodSection/foodsection.html";
    };

    // Search functionality
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            loadRestaurants(searchInput.value);
        }
    });

    // Load restaurants on page load
    loadRestaurants();

    
});
