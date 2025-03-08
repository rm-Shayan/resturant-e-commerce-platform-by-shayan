document.addEventListener("DOMContentLoaded", () => {
  
    let isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!isLogin) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
    } 
  
  
  
    const modal = document.getElementById("restaurantModal");
    const openModalBtn = document.getElementById("openRestaurantModal");
    const closeModalBtn = document.getElementById("closeRestaurantModal");
    const closeModalButton = document.getElementById("closeModalBtn");
    const restaurantForm = document.getElementById("restaurantForm");
    const restaurantList = document.getElementById("restaurantList");

    // Buttons
    const saveChangesBtn = document.getElementById("saveChangesBtn");
    const addRestaurantBtn = document.getElementById("addRestaurantBtn");

    // ✅ Default Restaurants
    const defaultRestaurants = [
        {
            name: "Pizza Palace",
            address: "123 Main St, New York, NY",
            description: "Best Italian Pizzas in town!",
            phone: "123-456-7890",
            email: "info@pizzapalace.com",
            logo: "assets/resturant-images/1.jpeg",
            id: "default"
        },
        {
            name: "Burger Hub",
            address: "456 Burger Lane, Los Angeles, CA",
            description: "Tasty and juicy burgers",
            phone: "987-654-3210",
            email: "contact@burgerhub.com",
            logo: "assets/resturant-images/2.jpeg",
            id:  "default"
        }
    ];

    // ✅ Load restaurants from localStorage OR set default restaurants
    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || defaultRestaurants;
    updateLocalStorage(); // Save to localStorage if not present

    function updateLocalStorage() {
        localStorage.setItem("restaurants", JSON.stringify(restaurants));
    }

    function updateRestaurantTable() {
        restaurantList.innerHTML = "";
        restaurants.forEach((restaurant, index) => {
            const row = document.createElement("tr");

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
                    <button onclick="deleteRestaurant(${index})" class="bg-red-500 text-white px-3 py-2 mt-1 rounded shadow-md">❌ Delete</button>
                    <button onclick="editRestaurant(${index})" class="bg-yellow-500 text-white px-6 py-2 mt-2 rounded shadow-md">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            `;
            restaurantList.appendChild(row);
        });
    }

    restaurantForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("restaurantName").value;
        const address = document.getElementById("restaurantAddress").value;
        const description = document.getElementById("restaurantDescription").value;
        const phone = document.getElementById("restaurantPhone").value;
        const email = document.getElementById("restaurantEmail").value;
        const logoInput = document.getElementById("restaurantLogo");

        // Handle logo upload
        if (logoInput.files.length > 0) {
            const file = logoInput.files[0];
            const reader = new FileReader();
            reader.onload = function (event) {
                const logo = event.target.result;
                saveOrUpdateRestaurant(name, address, description, phone, email, logo);
            };
            reader.readAsDataURL(file);
        } else {
            saveOrUpdateRestaurant(name, address, description, phone, email, null);
        }
    });

    function saveOrUpdateRestaurant(name, address, description, phone, email, logo) {
        if (editIndex !== null) {  
            // Updating existing restaurant
            restaurants[editIndex].name = name;
            restaurants[editIndex].address = address;
            restaurants[editIndex].description = description;
            restaurants[editIndex].phone = phone;
            restaurants[editIndex].email = email;
            if (logo) restaurants[editIndex].logo = logo;
        } else {
            // Adding new restaurant
            const id = new Date().getTime();
            const newRestaurant = { name, address, description, phone, email, logo, id };
            restaurants.push(newRestaurant);
        }

        updateLocalStorage();
        updateRestaurantTable();
        closeModal();
    }

    function closeModal() {
        modal.classList.add("hidden");
        restaurantForm.reset();
        editIndex = null;

        // Reset buttons
        addRestaurantBtn.classList.remove("hidden"); // Show "Add Restaurant"
        saveChangesBtn.classList.add("hidden"); // Hide "Save Changes"
    }

    window.newWindow = (id) => {
        window.open(`items-section.html?restaurant=${id || "default"}`, "_blank");
    };

    window.deleteRestaurant = (index) => {
        restaurants.splice(index, 1);
        updateLocalStorage();
        updateRestaurantTable();
    };

    window.editRestaurant = (index) => {
        editIndex = index;
        const restaurant = restaurants[index];

        document.getElementById("restaurantName").value = restaurant.name;
        document.getElementById("restaurantAddress").value = restaurant.address;
        document.getElementById("restaurantDescription").value = restaurant.description;
        document.getElementById("restaurantPhone").value = restaurant.phone;
        document.getElementById("restaurantEmail").value = restaurant.email;

        modal.classList.remove("hidden");

        // Switch buttons
        addRestaurantBtn.classList.add("hidden"); // Hide "Add Restaurant"
        saveChangesBtn.classList.remove("hidden"); // Show "Save Changes"
    };

    openModalBtn.addEventListener("click", () => {
        editIndex = null; 
        restaurantForm.reset();
        modal.classList.remove("hidden");

        // Switch buttons
        addRestaurantBtn.classList.remove("hidden");
        saveChangesBtn.classList.add("hidden");
    });

    closeModalBtn.addEventListener("click", closeModal);
    closeModalButton.addEventListener("click", closeModal);

    // ✅ Initialize table
    updateRestaurantTable();
});
