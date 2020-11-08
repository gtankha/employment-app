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

    const userID=document.querySelector("#UserID").value;

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

    var formEl = document.getElementById('upload-form');
    var imgInputEl = document.getElementById('img-input');
    var user_id = 1;
    var formData = new FormData();

    console.log("right here right now");

    formEl.onsubmit= async (e) => {
           
        console.log("right here right now #2");

        e.preventDefault();
        console.log(formEl);
        formData.append("image", imgInputEl.files[0]);
       
    
        let response = await fetch('/api/upload?id='+user_id, {
          method: 'POST',
          body: formData
        });
    
        let result = await response.json();
    
        alert(result.message);
      };
      /*  if (response.ok) {
            document.location.replace('/dash')
        } else {
            alert(response.statusText);
        }*/
}


//document.querySelector('#skills').addEventListener('click', skillSubmit);
document.querySelector('#description').addEventListener('click', descriptionUpdate);

document.querySelector('#upload-form').addEventListener('click', photoChange);
