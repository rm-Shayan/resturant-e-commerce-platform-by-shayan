document.addEventListener("DOMContentLoaded", () => {

    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "login.html"; // Redirect if not logged in
    }

    const login=localStorage.getItem("isLogin")
    if(login!="true"){
window.open("login.html")
    }
    const modal = document.getElementById("restaurantModal");
    const openModalBtn = document.getElementById("openRestaurantModal");
    const closeModalBtn = document.getElementById("closeRestaurantModal");
    const closeModalButton = document.getElementById("closeModalBtn");
    const restaurantForm = document.getElementById("restaurantForm");
    const restaurantList = document.getElementById("restaurantList");

    // Open Modal
    openModalBtn.addEventListener("click", () => {
        modal.classList.remove("hidden"); // Show modal
    });

    // Close Modal
    closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden"); // Hide modal
    });

    closeModalButton.addEventListener("click", () => {
        modal.classList.add("hidden"); // Hide modal
    });

    // Load default data
    const defaultRestaurants = [
        {
            name: "Pizza Palace",
            address: "123 Main St, New York, NY",
            description: "Best Italian Pizzas in town!",
            phone: "123-456-7890",
            email: "info@pizzapalace.com",
            logo: "assets/resturant-images/1.jpeg",
            id: Date.now() + 1 // ✅ UNIQUE ID
        },
        {
            name: "Burger Hub",
            address: "456 Burger Lane, Los Angeles, CA",
            description: "Tasty and juicy burgers",
            phone: "987-654-3210",
            email: "contact@burgerhub.com",
            logo: "assets/resturant-images/2.jpeg",
            id: Date.now() + 2 // ✅ UNIQUE ID
        }
    ];
    

    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || defaultRestaurants;

    function updateLocalStorage() {
        localStorage.setItem("restaurants", JSON.stringify(restaurants));
    }

    function updateRestaurantTable() {
        restaurantList.innerHTML = "";
        restaurants.forEach((restaurant, index) => {
            const row = document.createElement("tr");

            // ✅ Fix: Correct onclick event assignment using arrow function
            row.innerHTML = `
            <td class="border p-3">
                <img src="${restaurant.logo}" class="w-12 h-12 object-cover rounded cursor-pointer" onclick="newWindow('${restaurant.id}')">
            </td>
            <td class="border p-3">${restaurant.name}</td>
            <td class="border p-3">${restaurant.address}</td>
            <td class="border p-3">${restaurant.description}</td>
            <td class="border p-3">${restaurant.phone}</td>
            <td class="border p-3">${restaurant.email}</td>
            <td class="border p-3">
                <button onclick="deleteRestaurant(${index})" class="bg-red-500 text-white px-3 py-1 rounded shadow-md">❌ Delete</button>
            </td>
        `;
        
            restaurantList.appendChild(row);
        });
    }

    // Function to add a new restaurant
    restaurantForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload

        // Get values from form
        const name = document.getElementById("restaurantName").value;
        const address = document.getElementById("restaurantAddress").value;
        const description = document.getElementById("restaurantDescription").value;
        const phone = document.getElementById("restaurantPhone").value;
        const email = document.getElementById("restaurantEmail").value;
        const logoInput = document.getElementById("restaurantLogo");
        const id = new Date().getTime(); // Generate unique ID

        // Default logo

        // Handle logo upload
        if (logoInput.files.length > 0) {
            const file = logoInput.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                logo = event.target.result;
                saveRestaurant(name, address, description, phone, email, logo, id);
            };
            reader.readAsDataURL(file);
        } else {
            saveRestaurant(name, address, description, phone, email, logo, id);
        }
    });

    function saveRestaurant(name, address, description, phone, email, logo, id) {
        // Create restaurant object
        const newRestaurant = { name, address, description, phone, email, logo, id };

        // Add to array
        restaurants.push(newRestaurant);

        // Save to localStorage
        updateLocalStorage();

        // Update UI
        updateRestaurantTable();

        // Close modal
        modal.classList.add("hidden");

        // Reset form
        restaurantForm.reset();
    }

    // ✅ Fix: Assign function correctly
    window.newWindow = (id) => {
        if (!id || id === "undefined" || id === "null" || id === "" || isNaN(id) ) {
            window.open(`items-section.html?restaurant=default`, "_blank");
        } else {
            window.open(`items-section.html?restaurant=${id}`, "_blank");
        }
    };
    
    
    // Function to delete restaurant
    window.deleteRestaurant = (index) => {
        restaurants.splice(index, 1);
        updateLocalStorage();
        updateRestaurantTable();
    };

    // Initialize the table
    updateRestaurantTable();
});
