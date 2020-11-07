
function skillForm(event) {
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


        /*    if (type = "seeker") {
                const response = await fetch('/api/users', {
                    method: 'put',
                    body: JSON.stringify({
                       skillIds: skills
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    document.location.replace('/dash');
                } else {
                    alert(response.statusText);
                }

            }
        */}


        return results;
    }
}

document.querySelector("#skillform").addEventListener('submit', skillForm);