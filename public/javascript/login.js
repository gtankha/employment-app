async function signupFormHandler(event) {
    event.preventDefault();

    const full_name = document.querySelector('#username-signup').value.trim();
    const company_name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const description = "this is the default description"
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
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);