const employerInterestTab = document.querySelector("#employer-interest");
const candidateInterestTab = document.querySelector("#candidate-interest");
const interviewTab = document.querySelector("#interviews");


const employerBtn = document.querySelector("#employer-btn");
const candidateBtn = document.querySelector("#candidate-btn");
const interviewBtn = document.querySelector("#interview-btn");

const add_buttons = document.querySelectorAll('[id=add-btn]');
const del_buttons = document.querySelectorAll('[id=del-btn]');

console.log(add_buttons);

function init() {

    candidateInterestTab.style.display = 'none';
    interviewTab.style.display = 'none';
    employerInterestTab.style.display = 'flex';

}


function tabHandler(event) {
    event.preventDefault();


    candidateBtn.classList.remove('active');
    employerBtn.classList.remove('active');
    interviewBtn.classList.remove('active');

    switch (event.target.id) {
        case "interview-btn":

            employerInterestTab.style.display = 'none';
            candidateInterestTab.style.display = 'none';
            interviewTab.style.display = 'flex';
            interviewBtn.classList.add('active');
            break;

        case "candidate-btn":
            employerInterestTab.style.display = 'none';
            candidateInterestTab.style.display = 'flex';
            interviewTab.style.display = 'none';
            candidateBtn.classList.add('active');
            break;

        case "employer-btn":
            employerInterestTab.style.display = 'flex';
            candidateInterestTab.style.display = 'none';
            interviewTab.style.display = 'none';
            employerBtn.classList.add('active');
            break;

    }

}


function createAddButtons(_arr)
{

    // add events to all buttons (updates the interest type to "interview")
    _arr.forEach(btn => {

        async function addHandler(event) {

            event.preventDefault();
            //get interest id from data attribute
           const id = event.target.getAttribute("data-id");

           //update using put request
           const response = await fetch('/api/interests/'+id, {
            method: 'put',
            body: JSON.stringify({
                type:'interview'
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            console.log('success');
            location.reload(false);
        } else {
            alert(response.statusText);
        }

        }


            btn.addEventListener("click",addHandler);

    })
}

function createDelButtons(_arr)
{
       // add events to all buttons (updates the interest type to "interview")

    _arr.forEach(btn => {

           async function delHandler(event) {

                

                event.preventDefault();
                //get interest id from data attribute
               const id = event.target.getAttribute("data-id");

                  //update using put request

               const response = await fetch('/api/interests/'+id, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            });
    
            // check the response status
            if (response.ok) {
                console.log('success');
                location.reload(false);
            } else {
                alert(response.statusText);
            }

            }

            btn.addEventListener("click",delHandler);

    })
}


createDelButtons(del_buttons);
createAddButtons(add_buttons);

init();




employerBtn.addEventListener("click", tabHandler);
candidateBtn.addEventListener("click", tabHandler);
interviewBtn.addEventListener("click", tabHandler);