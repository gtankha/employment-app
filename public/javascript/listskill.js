
async function skillForm(event) {
    event.preventDefault();
 
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
            console.log(results.skills[0]);


           if (results.type == "seeker") {
            console.log (" I am in listskill.js")
                const response = await fetch('/api/users/'+results.user, {
                    method: 'put',
                    body: JSON.stringify({
                       skillIds: results.skills
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    console.log ("asASAS");
                    document.location.replace('/dash');
                    return;
                } else {
                    alert(response.statusText);
                    return;
                }

            }
        }
    }
}

document.querySelector("#submitbutton").addEventListener('click', skillForm);