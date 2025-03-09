document.addEventListener("DOMContentLoaded", function () {
    // ✅ 1. Check if User is Logged In
    let isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!isLogin) {
        window.location.href = "login.html"; // Redirect if not logged in
        return; // Stop execution
    }

    // ✅ 2. Select DOM Elements AFTER Page Loads
    const profileBtn = document.getElementById("profileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const logoutBtn = document.getElementById("logoutBtn");
    const profileImage = document.getElementById("profileImage");
    const profileImageSidebar = document.getElementById("profileImageSidebar");
    const cartUserImg = document.getElementById("cartUserImage");
    const imageUpload = document.getElementById("imageUpload");

    // ✅ 3. Profile Dropdown Toggle
    profileBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent immediate closing
        dropdownMenu.classList.toggle("hidden");
    });

    // ✅ 4. Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });

    // ✅ 5. Logout Function
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("profileImage"); // Remove saved image on logout
        window.location.href = "login.html";
    });

    // ✅ 6. Load Profile Image from Local Storage
    const savedImage = localStorage.getItem("profileImage");
    const defaultImg = "assets/download.jpeg"; // Set a default image

    if (savedImage) {
        profileImage.src = savedImage;
        profileImageSidebar.src = savedImage;
        cartUserImg.src = savedImage;
    } else {
        profileImage.src = defaultImg;
        profileImageSidebar.src = defaultImg;
        cartUserImg.src = defaultImg;
    }

    // ✅ 7. Handle Image Upload
    imageUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                profileImage.src = imageUrl;
                profileImageSidebar.src = imageUrl;
                cartUserImg.src = imageUrl; // Ensure image updates everywhere
                localStorage.setItem("profileImage", imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });
});









const salesData = {
labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
datasets: [{
    label: "Monthly Sales ($)",
    data: [5000, 7000, 8000, 12000, 15000, 14000, 16000, 18000, 20000, 22000, 21000, 25000],
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
    borderWidth: 2,
    fill: true
}]
};

// Chart Configuration
const config = {
type: "line",  // Line chart
data: salesData,
options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: true, position: "top" }
    },
    scales: {
        y: { beginAtZero: true }
    }
}
};

// Load Chart
document.addEventListener("DOMContentLoaded", function () {
const ctx = document.getElementById("salesChart").getContext("2d");
new Chart(ctx, config);
});



document.addEventListener("DOMContentLoaded", function () {
const cartLink = document.getElementById("cartLink");

if (cartLink) {
cartLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleCart();
});
} else {
console.error("cartLink element not found!");
}
});

function toggleCart() {
const cartSidebar = document.getElementById("cartSidebar");

if (cartSidebar.classList.contains("hidden")) {
cartSidebar.classList.remove("hidden");
setTimeout(() => {
    cartSidebar.classList.remove("translate-x-80");
    cartSidebar.classList.add("translate-x-0");
}, 10); // Small delay to allow transition to take effect
loadCartItems(); // Load items when opening
} else {
cartSidebar.classList.remove("translate-x-0");
cartSidebar.classList.add("translate-x-80");

setTimeout(() => {
    cartSidebar.classList.add("hidden");
}, 300); // Wait for transition to complete before hiding
}
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    if (!cartItemsContainer) {
        console.error("Cart container not found!");
        return;
    }

    cartItemsContainer.innerHTML = ""; // Clear previous content
    let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];
    console.log("Loaded Cart Data:", cart);

    if (!Array.isArray(cart) || cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='text-center text-gray-500'>Your cart is empty.</p>";
        return;
    }

    // ✅ Fix User Info Loading
    let cartUser = document.getElementById("cartUserName");
    let cartEmail = document.getElementById("cartUserEmail");
    let cartImg = document.getElementById("cartUserImage");

    let UserEmail = localStorage.getItem("userEmail");
    let userName = localStorage.getItem("userName");
    const defaultImage = "admin-pannel/assets/download.jpeg"; 
    const savedImage = localStorage.getItem("userImage") || defaultImage;

    if (cartEmail && UserEmail) {
        cartEmail.innerText = UserEmail;
    } else {
        console.error("User Email element not found or missing data!");
    }

    if (cartUser && userName) {
        cartUser.innerText = userName;
    } else {
        console.error("User Name element not found or missing data!");
    }

    if (cartImg) {
        cartImg.src = savedImage;
    } else {
        console.error("Cart profile image element not found!");
    }

    // ✅ Load Cart Items
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "flex items-center justify-between p-3 border-b";

        cartItem.innerHTML = `
            <div class="flex items-center space-x-3">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div>
                    <p class="font-semibold">${item.name}</p>
                    <p class="text-gray-600">${item.price}</p>
                </div>
            </div>
            <button class="remove-btn text-red-500" data-index="${index}">&times;</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // ✅ Attach Event Listeners for Remove Buttons
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            removeFromCart(index);
        });
    });
}


// Function to remove item from cart
function removeFromCart(index) {
let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];
cart.splice(index, 1);
localStorage.setItem("itemsInCart", JSON.stringify(cart));
loadCartItems(); // Refresh cart display
}







document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded.");

    // ✅ CLOSURE: Manages Order Sidebar State
    const OrderSidebar = (function () {
        const orderSidebar = document.getElementById("orderSidebar");

        function toggle(callback) {
            if (!orderSidebar) return console.error("❌ Order sidebar not found!");

            if (orderSidebar.classList.contains("translate-x-full")) {
                orderSidebar.classList.remove("translate-x-full");
                orderSidebar.classList.add("translate-x-0");

                // ✅ Use callback to ensure UI updates before sidebar opens
                if (callback) callback();
            } else {
                orderSidebar.classList.add("translate-x-full");
                orderSidebar.classList.remove("translate-x-0");
            }
        }

        return { toggle };
    })();

    // ✅ EVENT LISTENERS
    const orderLink = document.getElementById("order");
    if (orderLink) {
        orderLink.addEventListener("click", function (event) {
            event.preventDefault();
            OrderSidebar.toggle(loadOrders);
            loadUserInfo();
        });
    }

    document.getElementById("closeOrderSidebar")?.addEventListener("click", function () {
        OrderSidebar.toggle();
    });

    // ✅ FUNCTION: Load User Info in Order Sidebar
    function loadUserInfo() {
        console.log("Loading user info...");

        const defaultImage = "admin-pannel/assets/download.jpeg";
        const savedImage = localStorage.getItem("userImage") || defaultImage;
        const userEmail = localStorage.getItem("userEmail");
        const userName = localStorage.getItem("userName");

        updateElement("orderUserImage", img => img.src = savedImage);
        updateElement("orderUserName", el => el.innerText = userName);
        updateElement("orderUserEmail", el => el.innerText = userEmail);
    }

    // ✅ FUNCTION: Load Orders from localStorage
    function loadOrders() {
        console.log("Loading orders...");
    
        const orderItemsContainer = document.getElementById("orderItemsContainer");
        if (!orderItemsContainer) return console.error("❌ Order container not found!");
    
        orderItemsContainer.innerHTML = "";
    
        let orders = JSON.parse(localStorage.getItem("orderItems")) || [];
        if (!Array.isArray(orders) || orders.length === 0) {
            return orderItemsContainer.innerHTML = `<p class='text-center text-gray-500 text-lg font-semibold py-5'>No orders placed yet.</p>`;
        }
    
        // ✅ Apply Flexbox for Left Alignment on Small Screens
        orderItemsContainer.className = "flex flex-wrap justify-start gap-4 p-4"; 
    
        orders.forEach((order, index) => {
            orderItemsContainer.appendChild(createOrderCard(order, index));
        });
    }
    
    // ✅ Function to Create Order Cards (Styled with Flexbox)
    function createOrderCard(order, index) {
        const orderItem = document.createElement("div");
        orderItem.className = `
            flex flex-col p-5 border rounded-xl shadow-lg bg-white 
            hover:shadow-xl transition-all duration-300 ease-in-out 
            w-full sm:w-[48%] md:w-[31%] lg:w-[24%] 
        `;
    
        orderItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${order.image}" alt="${order.name}" 
                     class="w-20 h-20 object-cover rounded-lg border shadow-md">
    
                <div class="flex-1">
                    <p class="font-semibold text-lg text-gray-800">${order.name}</p>
                    <p class="text-gray-500 text-sm">${order.price}</p>
    
                    <div class="mt-3">
                        <label class="text-sm font-bold text-gray-700">Status:</label>
                        <select class="order-status p-2 border rounded-md text-sm w-full bg-gray-100">
                            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                            <option value="Canceled" ${order.status === "Canceled" ? "selected" : ""}>Canceled</option>
                            <option value="Not Available" ${order.status === "Not Available" ? "selected" : ""}>Not Available</option>
                        </select>
                    </div>
    
                    <div class="mt-3">
                        <label class="text-sm font-bold text-gray-700">Time Remaining:</label>
                        <input type="number" class="order-timer-input w-full p-2 border rounded-md text-sm bg-gray-100"
                               value="${order.time}" min="0"> min
                    </div>
                </div>
            </div>
    
            <div class="mt-5 flex justify-between">
                <button class="update-order bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white 
                               text-sm font-semibold px-4 py-2 rounded-md shadow-md w-[48%]">
                    Update Order
                </button>
                <button class="cancel-order bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white 
                               text-sm font-semibold px-4 py-2 rounded-md shadow-md w-[48%]">
                    Cancel Order
                </button>
            </div>
        `;
    
        // Attach event listeners inside closure
        orderItem.querySelector(".update-order").addEventListener("click", () => updateOrder(index, orderItem));
        orderItem.querySelector(".cancel-order").addEventListener("click", () => cancelOrder(index));
    
        return orderItem;
    }
    

    // ✅ FUNCTION: Create Order Card (With Better UI & Layout)
    function createOrderCard(order, index) {
        const orderItem = document.createElement("div");
        orderItem.className = `
            flex flex-col p-5 border rounded-xl shadow-lg bg-white 
            hover:shadow-xl transition-all duration-300 ease-in-out 
            max-w-md mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[60%]
        `;

        orderItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${order.image}" alt="${order.name}" 
                     class="w-24 h-24 object-cover rounded-lg border shadow-md">

                <div class="flex-1">
                    <p class="font-semibold text-lg text-gray-800">${order.name}</p>
                    <p class="text-gray-500 text-sm">${order.price}</p>

                    <div class="mt-3">
                        <label class="text-sm font-bold text-gray-700">Status:</label>
                        <select class="order-status p-2 border rounded-md text-sm w-full bg-gray-100">
                            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                            <option value="Canceled" ${order.status === "Canceled" ? "selected" : ""}>Canceled</option>
                            <option value="Not Available" ${order.status === "Not Available" ? "selected" : ""}>Not Available</option>
                        </select>
                    </div>

                    <div class="mt-3">
                        <label class="text-sm font-bold text-gray-700">Time Remaining:</label>
                        <input type="number" class="order-timer-input w-full p-2 border rounded-md text-sm bg-gray-100"
                               value="${order.time}" min="0"> min
                    </div>
                </div>
            </div>

            <div class="mt-5 flex justify-between">
                <button class="update-order bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white 
                               text-sm font-semibold px-4 py-2 rounded-md shadow-md w-[48%]">
                    Update Order
                </button>
                <button class="cancel-order bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white 
                               text-sm font-semibold px-4 py-2 rounded-md shadow-md w-[48%]">
                    Cancel Order
                </button>
            </div>
        `;

        // Attach event listeners inside closure
        orderItem.querySelector(".update-order").addEventListener("click", () => updateOrder(index, orderItem));
        orderItem.querySelector(".cancel-order").addEventListener("click", () => cancelOrder(index));

        return orderItem;
    }

    // ✅ FUNCTION: Update Order
    function updateOrder(index, orderItem) {
        let orders = JSON.parse(localStorage.getItem("orderItems")) || [];

        orders[index].status = orderItem.querySelector(".order-status").value;
        orders[index].time = parseInt(orderItem.querySelector(".order-timer-input").value) || 0;

        localStorage.setItem("orderItems", JSON.stringify(orders));
        loadOrders();
        alert("✅ Order updated successfully!");
    }

    // ✅ FUNCTION: Cancel Order
    function cancelOrder(index) {
        let orders = JSON.parse(localStorage.getItem("orderItems")) || [];
        orders.splice(index, 1);
        localStorage.setItem("orderItems", JSON.stringify(orders));
        loadOrders();
        alert("❌ Order canceled!");
    }

    // ✅ FUNCTION: Utility to update elements safely
    function updateElement(id, callback) {
        const el = document.getElementById(id);
        if (el) callback(el);
        else console.error(`❌ Element #${id} not found!`);
    }

    console.log("Script initialized.");
});

