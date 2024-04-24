document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const container = document.querySelector('.container');
    const signupForm = document.querySelector('.signup form');
    function adjustCardPosition() {
        const cardWidth = card.offsetWidth;
        const containerWidth = container.offsetWidth;
        return containerWidth - cardWidth;
    }
    card.innerHTML = '<h2>Welcome To Code & Quill</h2>' +
                     '<p>Are you a new user?</p>' +
                     '<button>Sign Up</button>' +
                     '<p class="hidden-content">Do you already have an account?</p>' +
                     '<button class="hidden-content">Log In</button>';
    let signUpButton = card.querySelector('button');
    let loginButton = card.querySelectorAll('button')[1];
    signUpButton.addEventListener('click', function() {
        card.style.right = adjustCardPosition() + 'px';
        card.querySelector('p').classList.add('hidden-content');
        signUpButton.classList.add('hidden-content');
        card.querySelectorAll('p')[1].classList.remove('hidden-content');
        loginButton.classList.remove('hidden-content');
    });

    loginButton.addEventListener('click', function() {
        card.style.right = '0px';
        card.querySelector('p').classList.remove('hidden-content');
        signUpButton.classList.remove('hidden-content');
        card.querySelectorAll('p')[1].classList.add('hidden-content');
        loginButton.classList.add('hidden-content');
    });
    window.addEventListener('resize', function() {
        card.style.right = adjustCardPosition() + 'px';
    });
    signupForm.addEventListener('submit', function(event) {
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const confirmPasswordField = document.getElementById('confirm-password');
        let errorMessage = document.getElementById('error-message');

        if (password !== confirmPassword) {
            event.preventDefault(); 
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.id = 'error-message';
                errorMessage.style.color = 'red';
                errorMessage.textContent = 'Passwords do not match!';
                confirmPasswordField.parentNode.insertBefore(errorMessage, confirmPasswordField.nextSibling);
            }
        } else {
            errorMessage && errorMessage.parentNode.removeChild(errorMessage);
        }
    });
    const signUpButtonForm = signupForm.querySelector('button[type="submit"]');
    const inputs = signupForm.querySelectorAll('input');
    
    signUpButtonForm.disabled = true;
    signUpButtonForm.style.backgroundColor = '#ccc';

    function checkInputs() {
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value === '') {
                allFilled = false;
            }
        });

        signUpButtonForm.disabled = !allFilled;
        signUpButtonForm.style.backgroundColor = allFilled ? '#007BFF' : '#ccc';  // Restore original color on active
    }

    inputs.forEach(input => {
        input.addEventListener('input', checkInputs);
    });
});
