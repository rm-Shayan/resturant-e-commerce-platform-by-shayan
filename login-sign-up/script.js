

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

    
    function setCookie(name, value, days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
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


    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = fullName.value.trim();
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

      
        let emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Invalid email format!");
            return;
        }

        
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.");
            return;
        }


        setCookie("userName", name, 7);
        setCookie("userEmail", email, 7);
        setCookie("userPassword", password, 7); 
       
        alert("Sign-up successful! You can now log in.");
        loginBtn.click(); 
    });

  
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
    
        let enteredEmail = loginEmail.value.trim();
        let enteredPassword = loginPassword.value.trim();
    
        let savedEmail = getCookie("userEmail");
        let savedPassword = getCookie("userPassword");
    
        if (enteredEmail === savedEmail && enteredPassword === savedPassword) {
            setCookie("userLogin", "true", 7); 
            alert(`Welcome back, ${getCookie("userName")}!`);
            window.open( "../index.html");
        } else {
            alert("Incorrect email or password. Please try again.");
        }
    });
    
});

