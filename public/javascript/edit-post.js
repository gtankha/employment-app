async function nameUpdate(event) {

    const description = document.querySelector('#description').value.trim();
    const jobId = document.querySelector('#jobID').value;
    const name = String(document.querySelector("#title").value);
    console.log(jobId);
    console.log(name)
   
    const response = await fetch('/edit/'+jobId, {
        method: 'put',
        body: JSON.stringify({
            description: description,
            title: name,
            id: jobId
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace('/dash')
    } else {
        alert(response.statusText);
    }
}


document.querySelector('#Job-name-edit').addEventListener('click', nameUpdate);