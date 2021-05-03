const form = document.querySelector('.form')
const username = document.querySelector('.username')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const password2 = document.querySelector('.password2')
const formBtn = document.querySelector('.btn')


// SHOW ERROR IF INPUT IS NOT VALID
function showError(input, message) {
    // get all elements from HTML
    const formControl = input.parentElement
    const smallEl = input.nextElementSibling
    // add error class
    formControl.classList.add('error')
    // remove success if exists
    formControl.classList.remove('success')
    // get the name of inputs
    smallEl.innerText = message
}

// SHOW SUCCESS IF INPUT IS VALID
function showSuccess(input) {
    const formControl = input.parentElement
    // add success class
    formControl.classList.add('success')
    // remove error if exists
    formControl.classList.remove('error')
}

// CHECK EMAIL WITH REGEX
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(re.test(String(email).toLowerCase()))

    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, getFieldName(input) + ' is not valid')
    }
}

// CHECK REQUIRED FIELDS
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        // console.log(input)

        if (input.value.trim() === '') {
            showError(input, getFieldName(input) + ' is required')
        } else {
            showSuccess(input)
        }
    });
}

// CHECK FOR INPUT LENGTH
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, getFieldName(input) + ` must have at least ${min}`)
    } else if (input.value.length > max) {
        showError(input, getFieldName(input) + ` must be less then ${max} characters`)
    } else {
        showSuccess(input)
    }
}

// GET INPUT FIELD NAME
function getFieldName(input) {
    // get label element from HTML
    const labelEl = input.previousElementSibling
    // get the name of inputs
    return labelEl.innerText
}

// CHECK IF TWO PASSWORDS MATCH
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

// EVENT LISTENER ON FORM SUBMIT
form.addEventListener('submit', (e) => {
    e.preventDefault()

    // check if all inputs are entered
    checkRequired([username, email, password, password2])
    // check for length of input fields, min, max values
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    // check if email is valid
    checkEmail(email)
    // check if two passwords match
    checkPasswordsMatch(password, password2)
})