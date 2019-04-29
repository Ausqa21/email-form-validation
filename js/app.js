// Variables

const sendBtn = document.getElementById('sendBtn'),
      email = document.getElementById('email'),
      subject = document.getElementById('subject'),
      message = document.getElementById('message'),
      resetBtn = document.getElementById('resetBtn'),
      sendEmailForm = document.getElementById('email-form');


// Event Listeners

eventListeners();

function eventListeners() {
    // app init
    document.addEventListener('DOMContentLoaded', appInit);

    // validate the form
    email.addEventListener('blur', validateField);
    subject.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);

    // send email and reset button
    sendEmailForm.addEventListener('submit', sendEmail);
    resetBtn.addEventListener('click', resetForm);
}


// Functions

// App initialization
function appInit() {
    sendBtn.disabled = true;
}

function sendEmail(e) {
    e.preventDefault();

    // show the spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'img/mail.gif';
    sendEmailImg.style.display = 'block';

    // hide spinner and show the send email image
    setTimeout(() => {
        spinner.style.display = 'none';
        // show the img
        document.querySelector('#loaders').appendChild(sendEmailImg);
        // after 3 seconds, hide the image
        setTimeout(() => {
            sendEmailForm.reset();
            sendEmailImg.remove();
        }, 3000);
    }, 3000);
}

// Validates the fields
function validateField() {
    let errors;

    // validate the length of the field
    validateLength(this);

    // validate the email
    if(this.type === 'email') {
        validateEmail(this);
    }

    // both will return errors and check if there are any errors
    errors = document.querySelectorAll('.error');

    // check that the inputs are not empty
    if(email.value !== '' && subject.value !== '' && message.value !== '') {
        if(errors.length === 0) {
            sendBtn.disabled = false;
        }
    }
}

// Validates the lengths of the fields
function validateLength(field) {
    if(field.value.length > 0) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    };
}

// Validates the email field (checks for @ in the value)
function validateEmail(field) {
    let emailText = field.value;
    // check if email value contains '@' sign
    if(emailText.includes('@')) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    };
}

// Reset the form
function resetForm() {
    sendEmailForm.reset();
}