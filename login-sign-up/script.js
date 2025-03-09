

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const toggleText = document.getElementById("toggleText");
    const toggleLink = document.getElementById("toggleLink");
    const formText = document.getElementById("text-form");

    const fullName = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("passcode");
    const loginEmail = document.querySelector("#loginForm input[type='email']");
    const loginPassword = document.querySelector("#loginForm input[type='password']");

    const signUpSubmitBtn = document.getElementById("signupBtnSubmit");
    const loginBtnSubmit = document.getElementById("loginBtnSubmit");

    // Toggle between login and signup forms
    signupBtn.addEventListener("click", function () {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        loginBtn.classList.remove("active");
        signupBtn.classList.add("active");
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = "Login now";
        formText.innerText = "Sign Up";
    });

    loginBtn.addEventListener("click", function () {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        signupBtn.classList.remove("active");
        loginBtn.classList.add("active");
        toggleText.innerText = "Not a member?";
        toggleLink.innerText = "Signup now";
        formText.innerText = "Login";
    });

    toggleLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (loginForm.style.display === "none") {
            loginBtn.click();
        } else {
            signupBtn.click();
        }
    });

    // Save user data to localStorage instead of cookies
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = fullName.value.trim();
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        // Validate email format
        let emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Invalid email format!");
            return;
        }

        // Validate password strength
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.");
            return;
        }

        // Store user data in localStorage
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        alert("Sign-up successful! You can now log in.");
        loginBtn.click();
    });

    // Login event
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let enteredEmail = loginEmail.value.trim();
        let enteredPassword = loginPassword.value.trim();

        let savedEmail = localStorage.getItem("userEmail");
        let savedPassword = localStorage.getItem("userPassword");

        if (enteredEmail === savedEmail && enteredPassword === savedPassword) {
            localStorage.setItem("userLogin", "true"); 
            alert(`Welcome back, ${localStorage.getItem("userName")}!`);
            window.location.href = "../index.html"; 
        } else {
            alert("Incorrect email or password. Please try again.");
        }
    });

    
    if (localStorage.getItem("userLogin") === "true") {
        window.open("../index.html")  ;
    }
});

