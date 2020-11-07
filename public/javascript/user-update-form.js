async function skillSubmit(event) {
    event.preventDefault()
    const skills = document.querySelector('#skills');

    // check the response status
    if (response.ok) {
        console.log('success');
        document.location.replace('/dash')
    } else {
        alert(response.statusText);
    }
}


async function descriptionUpdate(event) {
    event.preventDefault();
    const description = document.querySelector('#descriptionUpdate').value.trim();
    console.log(document.querySelector("UserID"))
    console.log(description);
    console.log("Test34")

    userID=document.querySelector("#UserID").value;

    const response = await fetch(`/dash/`+userID, {
        method: 'put',
        body: JSON.stringify({
            description: description,
        }),
        headers: { 'Content-Type': 'application/json' }
    });


    if (response.ok) {
        document.location.replace('/dash')
    } else {
        alert(response.statusText);
    }
}

async function photoChange(event) {
    event.preventDefault();

        if (response.ok) {
            document.location.replace('/dash')
        } else {
            alert(response.statusText);
        }
}

document.querySelector('#skills').addEventListener('click', skillSubmit);
document.querySelector('#description').addEventListener('click', descriptionUpdate);
document.querySelector('#image').addEventListener('click', photoChange);