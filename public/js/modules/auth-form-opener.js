const passwordInputField1 = document.querySelector("#password1");


export const passwordTogglerFunction1 = function () {
    if (this.classList.contains("fa-eye")) {
        this.classList.replace("fa-eye", "fa-eye-slash");
        passwordInputField1.type = "text";
    } else {
        this.classList.replace("fa-eye-slash", "fa-eye");
        passwordInputField1.type = "password";
    }
}

const passwordInputField2 = document.querySelector("#password2");

export const passwordTogglerFunction2 = function () {
    if (this.classList.contains("fa-eye")) {
        this.classList.replace("fa-eye", "fa-eye-slash");
        passwordInputField2.type = "text";
    } else {
        this.classList.replace("fa-eye-slash", "fa-eye");
        passwordInputField2.type = "password";
    }
}


// when clicked on link (Don't have an account)
export const openSignUpForm = function () {
    this.form.style.display = "none";
    document.querySelector(".signup-form").style.display = "flex";
    if (window.innerWidth <= 768) {
        document.querySelector(".auth-form-container").style.display = "block";
        document.querySelector(".signup-form h2").innerHTML = "Create an account to save your favorite tracks...";
        SignupForm.style.marginTop = "70px";
        SignupForm.style.marginBottom = "70px";
    } else {
        document.querySelector(".signup-form h2").innerHTML = "Create an account to save <br> your favorite tracks...";
    }
}


// LOGIN
const cardContainer = document.querySelector(".card-container");
const LoginForm = document.querySelector(".login-form");
const SignupForm = document.querySelector(".signup-form");

export const openLoginForm = function () {
    cardContainer.style.display = "none";
    document.querySelector(".new-playlist-conatiner").style.display = "none";
    if (window.innerWidth > 768) {
        document.querySelector(".local-search-form").style.display = "none";
    }
    SignupForm.style.display = "none";
    document.querySelector(".auth-form-container").style.display = "flex";
    LoginForm.style.display = "flex";
    if (window.innerWidth <= 768) {
        document.querySelector(".auth-form-container").style.display = "block";
    }
}


export const openSignUpForm2 = function () {
    LoginForm.style.display = "none";
    cardContainer.style.display = "none";
    document.querySelector(".new-playlist-conatiner").style.display = "none";
    if (window.innerWidth > 768) {
        document.querySelector(".local-search-form").style.display = "none";
    }
    document.querySelector(".auth-form-container").style.display = "flex";
    if (window.innerWidth <= 768) {
        document.querySelector(".auth-form-container").style.display = "block";
        document.querySelector(".signup-form h2").innerHTML = "Create an account to save your favorite tracks...";
        SignupForm.style.marginTop = "70px";
        SignupForm.style.marginBottom = "70px";
    } else {
        document.querySelector(".signup-form h2").innerHTML = "Create an account to save <br> your favorite tracks...";
    }
    SignupForm.style.display = "flex";
}



