async function addSeekerInterest(event) {
    event.preventDefault();

    let i = 0;
    let j = 0;
    let interests = [];
    let jobList = [];
    let user_ide = document.getElementsByClassName("userid");
    user_ide = user_id[0].id;
    user_ids = user_ide.split("_");
    user_id = user_ids[0];
    seeker = user_ids[1];
    console.log(user_id);
    console.log(seeker);

    while (i >= 0 ) {
        let interestSelect = document.querySelector('#joblist' + i);
        let jobListSelect = document.querySelector('#joblistall' + j);
        if (interestSelect) {
            let interestsCheck = interestSelect.checked;
            if (interestsCheck) {
                interests.push(interestSelect.value)
            }
            console.log(interests);
            i++;
        }

        else if (jobListSelect) {
            let jobListCheck = jobListSelect.checked;
            if (jobListCheck) {
                jobList.push(jobList.value)
            }
            console.log(interests);
            j++;
        }

        else {


        if (seeker)    {
            const response = await fetch('/api/users/' + user_id, {
                method: 'put',
                body: JSON.stringify({
                    interestIds: interests
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log("asASAS");
                document.location.replace('/');
                return;
            } else {
                alert(response.statusText);
                return;
            }
        }

        if (!seeker)    {

        for (k=0 ; k<jobListSelect.length; k++){
            const response = await fetch('/api/users/' + jobListSelect[k], {
                method: 'put',
                body: JSON.stringify({
                    interestIds: interests
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                console.log("asASAS");
                document.location.replace('/');
                return;
            } else {
                alert(response.statusText);
                return;
            }
        }
        
        }
    
    
    
    }
    
}

}

    document.querySelector("#submitbutton").addEventListener('click', addSeekerInterest);
   