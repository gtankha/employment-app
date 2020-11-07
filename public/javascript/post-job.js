async function postJob(event) {
    event.preventDefault();
    console.log(document.querySelector('#UserID').value)
    console.log('wtf')
    const company_id = document.querySelector('#UserID').value;
    const title = document.querySelector('#job-title').value.trim();
    const description = document.querySelector('#job-description').value.trim();



    const response = await fetch('/api/jobs', {
        method: 'post',
        body: JSON.stringify({
            title,
            description,
            company_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.post-form').addEventListener('submit', postJob);