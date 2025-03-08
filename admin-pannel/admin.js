
document.addEventListener("DOMContentLoaded",function(){
    let isLogin = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!isLogin) {
        // Redirect to login page if not logged in
        window.location.href = "admin";
    } 
})
function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}
// Profile Dropdown Logic
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const logoutBtn = document.getElementById("logoutBtn");
const profileImage = document.getElementById("profileImage");
const profileImageSidebar = document.getElementById("profileImageSidebar");
const imageUpload = document.getElementById("imageUpload");

profileBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add("hidden");
    }
});

// Logout Function
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
});

// Load profile image from local storage
document.addEventListener("DOMContentLoaded", () => {
    const savedImage = localStorage.getItem("profileImage");
    const cartUserImg=document.getElementById("cartUserImage")
    const defaultImg="assets/download.jpeg"
    if (savedImage) {
       cartUserImg.src = savedImage;
       
    }else{
cartUserImg.src=defaultImg;
    }
});

// Handle Image Upload
imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            profileImage.src = imageUrl;
            profileImageSidebar.src = imageUrl;
            localStorage.setItem("profileImage", imageUrl);
        };
        reader.readAsDataURL(file);
    }
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
function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}


let cartUser=document.getElementById("cartUserName")
let cartEmail=document.getElementById("cartUserEmail")
UserEmail=JSON.stringify(localStorage.getItem("userEmail"))
let userName=getCookie("userName")
if(!UserEmail){
    console.error("User Email not found!");
}else{
    cartEmail.innerText=UserEmail;
}


if(!userName){
    console.error("User Name not found!");
}else{
    cartUser.innerText=userName;
}



document.addEventListener("DOMContentLoaded",()=>{
    const defaultImage = "admin-pannel/assets/download.jpeg"; 
        
// Get saved image from localStorage or use default image
const savedImage = localStorage.getItem("userImage") || defaultImage;

let cartImg=document.getElementById("cartUserImage")
cartImg.src=savedImage;


})

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

// Attach event listeners to remove buttons
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
    // Order Sidebar Toggle
    const orderLink = document.getElementById("order");

    if (orderLink) {
        orderLink.addEventListener("click", function (event) {
            event.preventDefault();
            toggleOrderSidebar();
            loadUserInfo();
        });
    }

    // Function to load user profile info in order sidebar
    function loadUserInfo() {
        const defaultImageOrder = "admin-pannel/assets/download.jpeg"; 
        const savedImage = localStorage.getItem("userImage") || defaultImageOrder;

        let orderImg = document.getElementById("orderUserImage");
        let orderUserName = document.getElementById("orderUserName");
        let orderUserEmail = document.getElementById("orderUserEmail");

        let userEmail = localStorage.getItem("userEmail");
        let userName = getCookie("userName");

        if (orderUserEmail && userEmail) {
            orderUserEmail.innerText = userEmail;
        } else {
            console.error("User Email not found or element missing!");
        }

        if (orderUserName && userName) {
            orderUserName.innerText = userName;
        } else {
            console.error("User Name not found or element missing!");
        }

        if (orderImg) {
            orderImg.src = savedImage;
        } else {
            console.error("Profile image element not found!");
        }
    }

    // Function to toggle the order sidebar
    function toggleOrderSidebar() {
        const orderSidebar = document.getElementById("orderSidebar");

        if (orderSidebar.classList.contains("translate-x-full")) {
            orderSidebar.classList.remove("translate-x-full");
            orderSidebar.classList.add("translate-x-0");
            loadOrders();
        } else {
            orderSidebar.classList.remove("translate-x-0");
            orderSidebar.classList.add("translate-x-full");
        }
    }

    // Function to load orders from localStorage
    function loadOrders() {
        const orderItemsContainer = document.getElementById("orderItemsContainer");
        if (!orderItemsContainer) {
            console.error("Order container not found!");
            return;
        }

        orderItemsContainer.innerHTML = ""; 

        let orders = JSON.parse(localStorage.getItem("orderItems")) || [];

        if (!Array.isArray(orders) || orders.length === 0) {
            orderItemsContainer.innerHTML = "<p class='text-center text-gray-500'>No orders placed yet.</p>";
            return;
        }

        orders.forEach((order, index) => {
            const orderItem = document.createElement("div");
            orderItem.className = "flex flex-col p-3 border-b bg-gray-50 rounded-lg shadow-md";

            orderItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="${order.image}" alt="${order.name}" class="w-16 h-16 object-cover rounded">
                    <div>
                        <p class="font-semibold">${order.name}</p>
                        <p class="text-gray-600">${order.price}</p>
                        <label class="text-sm font-bold">Status:</label>
                        <select class="order-status p-1 border rounded text-sm">
                            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                            <option value="Canceled" ${order.status === "Canceled" ? "selected" : ""}>Canceled</option>
                            <option value="Not Available" ${order.status === "Not Available" ? "selected" : ""}>Not Available</option>
                        </select>

                        <label class="text-sm font-bold">Time Remaining:</label>
                        <input type="number" class="order-timer-input w-20 p-1 border rounded text-sm" 
                            value="${order.time}" min="0"> min
                    </div>
                </div>
                <button class="update-order bg-blue-500 text-white text-sm px-3 py-1 rounded mt-2 w-full">
                    Update Order
                </button>
                <button class="cancel-order bg-red-500 text-white text-sm px-3 py-1 rounded mt-2 w-full">
                    Cancel Order
                </button>
            `;

            orderItemsContainer.appendChild(orderItem);

            // Attach event listeners
            orderItem.querySelector(".update-order").addEventListener("click", function () {
                updateOrder(index, orderItem);
            });

            orderItem.querySelector(".cancel-order").addEventListener("click", function () {
                cancelOrder(index);
            });
        });
    }

    // Function to update order details
    function updateOrder(index, orderItem) {
        let orders = JSON.parse(localStorage.getItem("orderItems")) || [];

        const newStatus = orderItem.querySelector(".order-status").value;
        const newTime = parseInt(orderItem.querySelector(".order-timer-input").value) || 0;

        orders[index].status = newStatus;
        orders[index].time = newTime * 60; // Convert minutes to seconds for countdown

        localStorage.setItem("orderItems", JSON.stringify(orders));
        loadOrders();
        alert("✅ Order updated successfully!");
    }

    // Function to cancel an order
    function cancelOrder(index) {
        let orders = JSON.parse(localStorage.getItem("orderItems")) || [];
        orders.splice(index, 1);
        localStorage.setItem("orderItems", JSON.stringify(orders));
        loadOrders();
        alert("❌ Order canceled!");
    }

    // Function to place an order (Called from "Order Now" button)
    function orderNow(name, price, image) {
        let orders = JSON.parse(localStorage.getItem("orderItems")) || [];

        let orderItem = {
            name: name,
            price: price,
            image: image,
            status: "Pending",
            time: 15 * 60 // 15 minutes default
        };

        orders.push(orderItem);
        localStorage.setItem("orderItems", JSON.stringify(orders));

        alert(`✅ Order placed for ${name}`);
    }
});

