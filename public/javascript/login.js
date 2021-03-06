const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');


async function signupFormHandler(event) {
    event.preventDefault();

    const full_name = document.querySelector('#fullname-signup').value.trim();
    const company_name = document.querySelector('#companyname-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const description = "This section is empty. Go to the dashboard to add a new description."
    const type = document.querySelector('#company').value;
    const image = null;

    if (full_name && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                full_name,
                company_name,
                email,
                password,
                description,
                image,
                type
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/')
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert("incorrect email or password");
            
        }
    }
}

function switchHandler(event)
{
    if(!event) signupForm.style.display = 'none';
    if(!event) return

    event.preventDefault();
  

    switch (event.target.getAttribute("id")) {

            case "signup-instead":
                loginForm.style.display = 'none';
                signupForm.style.display = '';
                break;

            case "login-instead":
                loginForm.style.display = '';
                signupForm.style.display = 'none';
                break;
    }
}




document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#signup-instead').addEventListener('click', switchHandler);
document.querySelector('#login-instead').addEventListener('click', switchHandler);

switchHandler(null);

