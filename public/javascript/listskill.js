
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
        else 
        {
            console.log (skills);
            let user_id = document.getElementById("skillform");
            if (user_id) { user_id = user_id.className};
            console.log ("user_id"  + user_id);
           let results =  {user: user_id, skills: skills};
           console.log (results);
           return results;
            }
    }
}

    document.querySelector("#skillform").addEventListener('submit', skillForm);