const baseUrl = 'http://localhost:3000';

const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

// Show/Hide Password
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";
        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

// Toggle Login/Signup Form
signUp.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});

// Handle Signup Form Submission
const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#signup-username").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    const confirmPassword = document.querySelector("#signup-confirm-password").value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const response = await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } else {
        alert(data.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

// Handle Login Form Submission
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        window.location.href = "login.html"; // Redirect to the main page
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

// Handle Logout (if needed, for example with a logout button)
const logoutButton = document.querySelector("#logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`${baseUrl}/api/logout`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login page
      } else {
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  });
}