document.addEventListener("DOMContentLoaded", () => {
    const restaurantContainer = document.getElementById("restaurantSection");
    const searchInput = document.getElementById("searchRestaurant");

    // Function to load and display restaurants
    const loadRestaurants = (filter = "") => {
        fetch("admin-pannel/resturant.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load restaurant data.");
                }
                return response.json();
            })
            .then(restaurants => {
                restaurantContainer.innerHTML = ""; // Clear existing content
                
                // Filter restaurants based on search input
                const filteredRestaurants = restaurants.filter(restaurant =>
                    restaurant.name.toLowerCase().includes(filter.toLowerCase())
                );

                if (filteredRestaurants.length === 0) {
                    // Agar koi result na mile toh ek default card dikhao
                    restaurantContainer.innerHTML = `
                        <div class="bg-white p-4 rounded-lg shadow-md text-center">
                            <h4 class="text-lg font-semibold text-gray-700">No restaurants found</h4>
                            <p class="text-gray-500">Try searching for something else.</p>
                            <img src="https://res.cloudinary.com/demo/image/upload/v1690000000/no-results.png" 
                                class="w-32 mx-auto mt-2">
                        </div>
                    `;
                    return;
                }

                filteredRestaurants.forEach((restaurant, index) => {
                    const restaurantCard = document.createElement("div");
                    restaurantCard.className = "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300";

                    restaurantCard.innerHTML = `
                        <img src="${restaurant.logo || 'https://res.cloudinary.com/demo/image/upload/v1690000000/placeholder.jpg'}"
                             alt="${restaurant.name}"
                             class="w-full h-40 object-cover rounded">
                        <h4 class="text-lg font-semibold mt-2">${restaurant.name}</h4>
                        <p class="text-gray-500">${restaurant.address}</p>
                        <button class="mt-2 bg-green-500 text-white px-4 py-2 rounded view-restaurant" data-index="${index}">View</button>
                    `;

                    restaurantContainer.appendChild(restaurantCard);
                });

                // Add event listeners to "View" buttons
                document.querySelectorAll(".view-restaurant").forEach(button => {
                    button.addEventListener("click", (event) => {
                        const index = event.target.getAttribute("data-index");
                        viewRestaurant(index);
                    });
                });
            })
            .catch(error => {
                console.error("Error loading JSON:", error);
                restaurantContainer.innerHTML = `<p class="text-red-500">Failed to load restaurants.</p>`;
            });
    };

    // Function to handle restaurant selection
    const viewRestaurant = (index) => {
        localStorage.setItem("selectedResturantIndex", index);
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
