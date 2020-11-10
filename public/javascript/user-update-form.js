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

    const description = document.querySelector('#descriptionUpdate').value.trim();

    const bodyObj = {description:description}

    if(document.querySelector('#fullnameUpdate'))
    {
    const full_name = document.querySelector('#fullnameUpdate').value.trim();
    bodyObj.full_name = full_name;
    }

    if(document.querySelector('#companynameUpdate'))
    {
    const company_name = document.querySelector('#companynameUpdate').value.trim();
    bodyObj.company_name = company_name;
    }


    const userID=document.querySelector("#UserID").value;

    const response = await fetch(`/api/users/`+userID, {
        method: 'put',
        body: JSON.stringify(bodyObj),
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

    const imgInputEl = document.getElementById('img-input');
    var formData = new FormData();
    formData.append("image", imgInputEl.files[0]);
    console.log(document.querySelector("#UserID").value)

    const response = await fetch('/api/upload?id=' + document.querySelector("#UserID").value, {
        method: 'POST',
        body: formData
    });
        if (response.ok) {
           document.location.replace('/dash')
        } else {
            alert(response.statusText);
        }
}

//document.querySelector('#skills').addEventListener('click', skillSubmit);
document.querySelector('#description').addEventListener('click', descriptionUpdate);
document.querySelector('#submit-image').addEventListener('click', photoChange);

