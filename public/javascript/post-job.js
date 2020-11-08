
async function postJob(event) {
    event.preventDefault();
    console.log("I am here in job creation");
    console.log(document.querySelector('#UserID').value)
    console.log('wtf')
    const company_id = document.querySelector('#UserID').value;
    const title = document.querySelector('#job-title').value.trim();
    const description = document.querySelector('#job-description').value.trim();

    const response = await fetch('/api/jobs', {
        method: 'post',
        body: JSON.stringify({
            title: title,
            description: description,
            company_id: company_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
       console.log((response.json()).get('id'));
        // ------------Add the Skill -----------------------//
        let i = 0;
        let skills = [];
        while (i >= 0) {
            let skillsSelect = document.querySelector('#skill' + i)
            if (skillsSelect) {
                let skillsCheck = skillsSelect.checked;
                if (skillsCheck) {
                    skills.push(skillsSelect.value)
                }
                i++;
            }
            else {

                let type = document.getElementById("types").className;
                let user_id = document.getElementById("skillform");
                if (user_id) { user_id = user_id.className };
                let results = { user: user_id, skills: skills, type: type };
                console.log(results);
                console.log(results.user);


                if (results.type = "company") {
                    console.log(" I am in listskill.js")
                    const response2 = await fetch('/api/jobs/' + response.id, {
                        method: 'put',
                        body: JSON.stringify({
                            skillIds: results.skills
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response2.ok) {
                        console.log("asASAS");
                        document.location.replace('/dash');
                        return;
                    } else {
                        alert(response2.statusText);
                        return;
                    }

                }
            }
        }



        // ----------------End add skill ---------------------//
        document.location.replace('/dash');
    } else {
        alert(response.statusText);
    }



}

document.querySelector('#post-job').addEventListener('click', postJob);