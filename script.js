// 🌱 Select form and input fields
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".input");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

// 📤 Select output spans for showing calculated age
const yearOutput = document.querySelector(".year-value");
const monthOutput = document.querySelector(".month-value");
const dayOutput = document.querySelector(".day-value");


form.addEventListener("submit", (e) => {

    // 🔒 Prevent default form submission
    e.preventDefault();

    // 📥 Get numeric values from inputs
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    let hasError = false;

    inputs.forEach(input => {
        const errorMessage = input.nextElementSibling;
        const inputValue = input.value;

        // 🧪 Checking whether fields are empty or not
        if (inputValue === "") {
            errorMessage.classList.remove("hide");
            hasError = true;
        } else {
            errorMessage.classList.add("hide");
        };


        // 🧪 Day validation
        if (input === dayInput && (inputValue.length > 2 || day < 1 || day > 31)) {
            errorMessage.textContent = "Must be a valid day";
            errorMessage.classList.remove("hide");
            hasError = true;
        }

        // 🧪 Month validation
        if (input === monthInput && (inputValue.length > 2 || month < 1 || month > 12)) {
            errorMessage.textContent = "Must be a valid month";
            errorMessage.classList.remove("hide");
            hasError = true;
        }

        // 🧪 Year validation
        if (input === yearInput && (inputValue.length !== 4 || year < 1947 || year > new Date().getFullYear())) {
            errorMessage.textContent = "You weren't born before Pakistan 😅";
            errorMessage.classList.remove("hide");
            hasError = true;
        }

    });


    // ⛔ Stop further execution if there's any validation error and throw error
    if (hasError) return;

    // 📅 Check if the constructed date is valid (e.g. 30 Feb is invalid
    const getFullDate = new Date(year, month - 1, day);
    if (
        getFullDate.getFullYear() !== year ||
        getFullDate.getMonth() !== month - 1 ||
        getFullDate.getDate() !== day
    ) {
        dayInput.nextElementSibling.textContent = "Invalid Date";
        dayInput.nextElementSibling.classList.remove("hide");
        if (hasError) return;
    } else {

        // ✅ Calculate age if everything is valid
        const today = new Date();
        let ageYears = today.getFullYear() - year;
        let ageMonths = today.getMonth() - (month - 1);
        let ageDays = today.getDate() - day;

        // 📆 Borrow days from previous month if days are negative
        if (ageDays < 0) {
            ageMonths--;
            ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        // 📅 Borrow months from previous year if months are negative
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        // 📤 Display calculated age
        yearOutput.textContent = ageYears;
        monthOutput.textContent = ageMonths;
        dayOutput.textContent = ageDays;
    }
});

// 🧹 Hide error message when user click in input field
inputs.forEach(input => {
    input.addEventListener("focus", () => {
        const errorMessage = input.nextElementSibling;
        errorMessage.classList.add("hide");
    })
})


// 🚫 Limit user input length per field by blocking extra key presses when max digits reached (allows editing keys and text replacement)
inputs.forEach(input => {
  const maxLengths = { day: 2, month: 2, year: 4 };

  input.addEventListener('keydown', e => {
    const max = maxLengths[input.id];

    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    
    if (allowedKeys.includes(e.key)) return;
    if (input.value.length >= max && input.selectionStart === input.selectionEnd) {
      e.preventDefault();
    }
  });
});