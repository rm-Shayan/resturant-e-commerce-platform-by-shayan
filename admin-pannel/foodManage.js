document.addEventListener("DOMContentLoaded", () => {
    
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "login.html"; // Redirect if not logged in
    }

    checkRestaurantId();  // 🔥 Check the restaurant ID on page load
    document.getElementById("sectionForm")?.addEventListener("submit", addSection);
    document.getElementById("dishForm")?.addEventListener("submit", addDish);
});

// ✅ Check for Restaurant ID in URL
function checkRestaurantId() {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get("restaurant");

    if (restaurantId === "default") {
        displayDefaultSections(); // Agar default restaurant hai to default menu dikhao
    } else if (restaurantId) {
        localStorage.setItem("selectedRestaurantId", restaurantId);
        loadSections(parseInt(restaurantId, 10)); // Baqi restaurants ka data load karo
    } else {
        displayDefaultSections();
    }
}


// ✅ Open & Close Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
}

// ✅ Display Default Sections & Dishes if No Restaurant Selected
function displayDefaultSections() {
    document.getElementById("foodSections").innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-700">Default Menu</h2>
            <ul class="space-y-2">
                <li class="flex items-center gap-3">
                    <img src="https://th.bing.com/th/id/R.ceafb7061be506ed649a852ac02e2eda?rik=MLbTis3FuOiWbg&pid=ImgRaw&r=0" class="w-12 h-12 object-cover rounded" alt="Pizza">
                    <span>Margherita Pizza</span>
                </li>
                <li class="flex items-center gap-3">
                    <img src="https://th.bing.com/th/id/R.8c1a061fcb7d1d7a2bb6fa8647cbd92b?rik=Vme%2bOex9qH7Uag&riu=http%3a%2f%2fwww.urdupalace.com%2fwp-content%2fuploads%2f2016%2f11%2fchicken-malai-boti-recipe.jpg&ehk=LyHE%2fdo6fMYcKpfLV14ueSbI6Fkrkse1fP88%2fVVAMHE%3d&risl=&pid=ImgRaw&r=0" class="w-12 h-12 object-cover rounded" alt="Burger">
                    <span>Cheese Burger</span>
                </li>
                <li class="flex items-center gap-3">
                    <img src="https://th.bing.com/th/id/R.8c1a061fcb7d1d7a2bb6fa8647cbd92b?rik=Vme%2bOex9qH7Uag&riu=http%3a%2f%2fwww.urdupalace.com%2fwp-content%2fuploads%2f2016%2f11%2fchicken-malai-boti-recipe.jpg&ehk=LyHE%2fdo6fMYcKpfLV14ueSbI6Fkrkse1fP88%2fVVAMHE%3d&risl=&pid=ImgRaw&r=0" class="w-12 h-12 object-cover rounded" alt="Burger">
                    <span>Cheese Burger</span>
                </li>
                <li class="flex items-center gap-3">
                    <img src="https://th.bing.com/th/id/R.8c1a061fcb7d1d7a2bb6fa8647cbd92b?rik=Vme%2bOex9qH7Uag&riu=http%3a%2f%2fwww.urdupalace.com%2fwp-content%2fuploads%2f2016%2f11%2fchicken-malai-boti-recipe.jpg&ehk=LyHE%2fdo6fMYcKpfLV14ueSbI6Fkrkse1fP88%2fVVAMHE%3d&risl=&pid=ImgRaw&r=0" class="w-12 h-12 object-cover rounded" alt="Burger">
                    <span>Cheese Burger</span>
                </li>
                <li class="flex items-center gap-3">
                    <img src="https://th.bing.com/th/id/R.ceafb7061be506ed649a852ac02e2eda?rik=MLbTis3FuOiWbg&pid=ImgRaw&r=0" class="w-12 h-12 object-cover rounded" alt="Pizza">
                    <span>Margherita Pizza</span>
                </li>
            </ul>
        </div>
    `;
}

// ✅ Load Sections for the Selected Restaurant
function loadSections(restaurantId) {
    restaurantId = parseInt(restaurantId, 10); // Convert ID to number
    const foodSectionsDiv = document.getElementById("foodSections");
    const sectionDropdown = document.getElementById("sectionDropdown");

    foodSectionsDiv.innerHTML = "";
    sectionDropdown.innerHTML = '<option value="" disabled selected>Select a Section</option>';

    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
    let restaurant = restaurants.find(r => Number(r.id) === restaurantId);

    if (!restaurant) {
        displayDefaultSections();
        return;
    }else if(restaurant=="NaN"){
        displayDefaultSections();
    }
    let sections = restaurant.sections || [];

    sections.forEach((section, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = section.name;
        sectionDropdown.appendChild(option);

        const sectionDiv = document.createElement("div");
        sectionDiv.className = "bg-white p-4 rounded-lg shadow-md";
        sectionDiv.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-semibold text-gray-700">${section.name}</h2>
                <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onclick="deleteSection(${index})">Delete</button>
            </div>
            <ul id="dishes-${index}" class="space-y-2">
                ${section.dishes.map(dish => `
                    <li class="flex items-center gap-3">
                        <img src="${dish.image}" class="w-12 h-12 object-cover rounded" alt="${dish.name}">
                        <span>${dish.name}</span>
                         <span>${dish.Price}</span>
                        <button class="text-red-500 text-sm" onclick="deleteDish(${index}, '${dish.name}')">[Remove]</button>
                    </li>
                `).join("")}
            </ul>
        `;

        foodSectionsDiv.appendChild(sectionDiv);
    });
}

// ✅ Add a New Section to the Selected Restaurant
function addSection(event) {
    event.preventDefault();

    const sectionName = document.getElementById("sectionName").value.trim();
    if (!sectionName) return;

    const restaurantId = parseInt(localStorage.getItem("selectedRestaurantId"), 10);
    if (isNaN(restaurantId)) return;

    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
    let restaurant = restaurants.find(r => Number(r.id) === restaurantId);

    if (!restaurant.sections) {
        restaurant.sections = [];
    }

    restaurant.sections.push({ name: sectionName, dishes: [] });

    localStorage.setItem("restaurants", JSON.stringify(restaurants));

    document.getElementById("sectionForm").reset();
    closeModal("sectionModal");
    loadSections(restaurantId);
}

// ✅ Add a Dish to a Selected Section
function addDish(event) {
    event.preventDefault();

    const sectionIndex = parseInt(document.getElementById("sectionDropdown").value, 10);
    const dishName = document.getElementById("dishName").value.trim();
    const imageInput = document.getElementById("dishImage").files[0];
    const dishPrice=document.getElementById("dishPrice").value

    if (isNaN(sectionIndex) || !dishName || !imageInput || !dishPrice) return;

    const restaurantId = parseInt(localStorage.getItem("selectedRestaurantId"), 10);
    if (isNaN(restaurantId)) return;

    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
    let restaurant = restaurants.find(r => Number(r.id) === restaurantId);

    if (!restaurant.sections || !restaurant.sections[sectionIndex]) {
        alert("Invalid section.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        restaurant.sections[sectionIndex].dishes.push({ name: dishName, image: reader.result,Price:dishPrice });

        localStorage.setItem("restaurants", JSON.stringify(restaurants));

        document.getElementById("dishForm").reset();
        document.getElementById("imagePreviewContainer").classList.add("hidden");
        closeModal("dishModal");
        loadSections(restaurantId);
    };

    reader.readAsDataURL(imageInput);
}

// ✅ Delete a Dish from a Section
function deleteDish(sectionIndex, dishName) {
    const restaurantId = parseInt(localStorage.getItem("selectedRestaurantId"), 10);
    if (isNaN(restaurantId)) return;

    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
    let restaurant = restaurants.find(r => Number(r.id) === restaurantId);

    let dishIndex = restaurant.sections[sectionIndex].dishes.findIndex(dish => dish.name === dishName);
    if (dishIndex !== -1) {
        restaurant.sections[sectionIndex].dishes.splice(dishIndex, 1);
    }

    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    loadSections(restaurantId);
}

// ✅ Delete an Entire Section
function deleteSection(sectionIndex) {
    const restaurantId = parseInt(localStorage.getItem("selectedRestaurantId"), 10);
    if (isNaN(restaurantId)) return;

    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
    let restaurant = restaurants.find(r => Number(r.id) === restaurantId);

    restaurant.sections.splice(sectionIndex, 1);

    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    loadSections(restaurantId);
}

// ✅ Delete an Entire Restaurant
function deleteRestaurant(index) {
    let restaurants = JSON.parse(localStorage.getItem("restaurants")) || [];
    restaurants.splice(index, 1);

    localStorage.setItem("restaurants", JSON.stringify(restaurants));
    alert("Deleted successfully");
    window.location.href = "index.html";
}
