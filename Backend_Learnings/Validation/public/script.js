document.addEventListener('DOMContentLoaded', () => {
    const fullname = document.getElementById("fullname");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const topic = document.getElementById("topic");

    //Fetch corresponding span error messages.
    const fullnameError = document.getElementById("fullnameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const topicError = document.getElementById("topicError");

    fullname.addEventListener('input', () => {
        if (!/^[A-Z]/.test(fullname.value)) {
            fullnameError.textContent = "Name must start with an uppercase letter.";
        } else {
            fullnameError.textContent = "";
        }
    });

    phone.addEventListener('input', () => {
        if (!/^\d{10}$/.test(phone.value)) {
            phoneError.textContent = "Phone number must be 10 digits.";
        } else {
            phoneError.textContent = "";
        }
    });

    email.addEventListener('input', () => {
        if (!/@/.test(email.value)) {
            emailError.textContent = "Email must contain @.";
        } else {
            emailError.textContent = "";
        }
    });

    topic.addEventListener('input', () => {
        if (topic.value.trim() === '') {
            topicError.textContent = "Topic cannot be empty.";
        } else {
            topicError.textContent = "";
        }
    });

    const form = document.getElementById("contactForm");
    form.addEventListener('submit', (event) => {
        if (fullnameError.textContent || phoneError.textContent || emailError.textContent || topicError.textContent) {
            event.preventDefault();
            alert("Please fix the errors in the form before submitting. ");
        }
    });
});