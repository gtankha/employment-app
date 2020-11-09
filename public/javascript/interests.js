const companyInterestTab = document.querySelector("#company-interest");
const candidateInterestTab = document.querySelector("#candidate-interest");
const interviewTab = document.querySelector("#interviews");
const matchingSkillsTab = document.querySelector("#matching-skills");


const companyBtn = document.querySelector("#company-btn");
const candidateBtn = document.querySelector("#candidate-btn");
const interviewBtn = document.querySelector("#interview-btn");
const matchingSkillsBtn = document.querySelector("#matching-skills-btn");

const add_buttons = document.querySelectorAll('[id=add-btn]');
const del_buttons = document.querySelectorAll('[id=del-btn]');

function init() {

    candidateInterestTab.style.display = 'none';
    interviewTab.style.display = 'none';
    matchingSkillsTab.style.display = 'none';
    companyInterestTab.style.display = 'flex';


    windowSizeHandler(null);

}


function tabHandler(event) {
    event.preventDefault();


    candidateBtn.classList.remove('active');
    companyBtn.classList.remove('active');
    interviewBtn.classList.remove('active');
    matchingSkillsBtn.classList.remove('active');

    switch (event.target.id) {
        case "interview-btn":

            companyInterestTab.style.display = 'none';
            candidateInterestTab.style.display = 'none';
            interviewTab.style.display = 'flex';
            matchingSkillsTab.style.display = 'none';
            interviewBtn.classList.add('active');
            break;

        case "candidate-btn":
            companyInterestTab.style.display = 'none';
            candidateInterestTab.style.display = 'flex';
            interviewTab.style.display = 'none';
            matchingSkillsTab.style.display = 'none';
            candidateBtn.classList.add('active');
            break;

        case "company-btn":
            companyInterestTab.style.display = 'flex';
            candidateInterestTab.style.display = 'none';
            interviewTab.style.display = 'none';
            matchingSkillsTab.style.display = 'none';
            companyBtn.classList.add('active');
            break;

        case "matching-skills-btn":
            companyInterestTab.style.display = 'none';
            candidateInterestTab.style.display = 'none';
            interviewTab.style.display = 'none';
            matchingSkillsTab.style.display = 'flex';
            matchingSkillsBtn.classList.add('active');
            break;

    }

    windowSizeHandler(null);

}


function createAddButtons(_arr) {

    // add events to all buttons (updates the interest type to "interview")
    _arr.forEach(btn => {

        async function addHandler(event) {

            event.preventDefault();
            //get interest id from data attribute
            const id = event.target.getAttribute("data-id");

            //update using put request
            const response = await fetch('/api/interests/' + id, {
                method: 'put',
                body: JSON.stringify({
                    type: 'interview'
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            // check the response status
            if (response.ok) {
            
                location.reload(false);
            } else {
                alert(response.statusText);
            }

        }


        btn.addEventListener("click", addHandler);

    })
}

function createDelButtons(_arr) {
    // add events to all buttons (updates the interest type to "interview")

    _arr.forEach(btn => {

        async function delHandler(event) {



            event.preventDefault();
            //get interest id from data attribute
            const id = event.target.getAttribute("data-id");

            //update using put request

            const response = await fetch('/api/interests/' + id, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            });

            // check the response status
            if (response.ok) {
             
                location.reload(false);
            } else {
                alert(response.statusText);
            }

        }

        btn.addEventListener("click", delHandler);

    })
}

function createMatchesButtons() {
    const type = document.getElementById("container-interests").getAttribute("data-type");
    const user_id = document.getElementById("container-interests").getAttribute("data-user-id");

    if (type == "company") {


        fetch('api/jobs')
            .then(response => response.json())
            .then(data => {

                const jobs = data.filter(job => job.company_id == user_id);

                const matches = document.querySelectorAll("[id=match]");



                matches.forEach(div => {
                    const drop = document.createElement('div');
                    //drop.classList.add("dropdown");
                    drop.classList.add("mt-3");

                    const toggle = document.createElement("button");
                    toggle.textContent = "Offer Job";
                    toggle.className = "btn btn-primary dropdown-toggle";

                    toggle.addEventListener('click', function (e) {
                        let dropdown = e.target.parentNode.childNodes[1];
                        if (dropdown.style.display == "") dropdown.style.display = "none"
                        else dropdown.style.display = ""
                    
                    })

                    drop.appendChild(toggle);

                    const dropMenu = document.createElement('div');
                    dropMenu.setAttribute('id', 'dropdown')
                    dropMenu.className = 'dropdown mt-2 shadow-sm';
                    dropMenu.style.display = 'none'

                    jobs.forEach(job => {
                        const btn = document.createElement('button');

                        const data_job_id = document.createAttribute("data-job-id");
                        data_job_id.value = job.id;

                        btn.setAttributeNode(data_job_id);

                        btn.classList.add("dropdown-item");
                        btn.textContent = job.title;

                        btn.addEventListener('click', async function (e) {


                            let id = div.getAttribute('data-user-id');
                            let job_id = e.target.getAttribute('data-job-id');
                            //update using put request
                            const response = await fetch('/api/jobs/' + job_id, {
                                method: 'put',
                                body: JSON.stringify({
                                    interestIds:[id]
                                }),
                                headers: { 'Content-Type': 'application/json' }
                            });

                            // check the response status
                            if (response.ok) {
                             
                                location.reload(false);
                            } else {
                                alert(response.statusText);
                            }


                        })
                        dropMenu.appendChild(btn);
                    });

                    drop.appendChild(dropMenu);

                    div.querySelector(".card-body").appendChild(drop);

                })
            })



    }
    else if (type == "seeker")
    {

        const matches = document.querySelectorAll("[id=match]");
        matches.forEach(seeker => {

            const data_job_id = seeker.getAttribute('data-job-id');
            const button = document.createElement('button');
            button.className = "btn btn-primary mt-3";
            button.textContent = "I'm Interested";

            button.addEventListener("click",async function(e){

               
                //update using put request
                const response = await fetch('/api/users/' + user_id, {
                    method: 'put',
                    body: JSON.stringify({
                        interestIds:[data_job_id]
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                // check the response status
                if (response.ok) {
                
                    location.reload(false);
                } else {
                    alert(response.statusText);
                }

            })

            seeker.querySelector(".card-body").appendChild(button);

        })
    }

}

createMatchesButtons();


createDelButtons(del_buttons);
createAddButtons(add_buttons);

init();




companyBtn.addEventListener("click", tabHandler);
candidateBtn.addEventListener("click", tabHandler);
interviewBtn.addEventListener("click", tabHandler);
matchingSkillsBtn.addEventListener("click", tabHandler);