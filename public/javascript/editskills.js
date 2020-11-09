
async function skillForm2(event) {
    event.preventDefault();
 
    let i = 0;
    let skills = [];



    while (i >= 0) {
        let skillsSelect = document.querySelector('#skill' + i);
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
            let results = { job: job_id, skills: skills, type: type };
         


           if (results.type == "company") {
        
                const response = await fetch('/api/users/'+results.job, {
                    method: 'put',
                    body: JSON.stringify({
                       skillIds: results.skills
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                  
                    document.location.replace('/dash');
                    return;
                } else {
                    alert(response.statusText);
                    return;
                }

            }
            break;
        }
    }
}

document.querySelector("#skills-edit").addEventListener('click', skillForm2);