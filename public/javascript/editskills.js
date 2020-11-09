
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
            let job_id = document.getElementById("skillform");
            if (job_id) { job_id = job_id.className };
            let results = { job_id: job_id, skills: skills, type: type };
            console.log(results);
            console.log(results.job_id);


           if (results.type = "employer") {
            console.log (" I am in listskill.js")
                const response = await fetch('/api/users/'+job_id, {
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

document.querySelector("#skills-edit").addEventListener('click', skillForm);