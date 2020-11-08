const companyInterestTab = document.querySelector("#company-interest");
const candidateInterestTab = document.querySelector("#candidate-interest");
const interviewTab = document.querySelector("#interviews");
//const skillsTab = document.querySelector("#matchingkills");


const companyBtn = document.querySelector("#company-btn");
const candidateBtn = document.querySelector("#candidate-btn");
const interviewBtn = document.querySelector("#interview-btn");

const add_buttons = document.querySelectorAll('[id=add-btn]');
const del_buttons = document.querySelectorAll('[id=del-btn]');

function init() {

    candidateInterestTab.style.display = 'none';
    interviewTab.style.display = 'none';
    companyInterestTab.style.display = 'flex';
  //  skillsTab.style.display = 'none';

    windowSizeHandler(null);

}


function tabHandler(event) {
    event.preventDefault();


    candidateBtn.classList.remove('active');
    companyBtn.classList.remove('active');
    interviewBtn.classList.remove('active');

    switch (event.target.id) {
        case "interview-btn":

            companyInterestTab.style.display = 'none';
            candidateInterestTab.style.display = 'none';
            interviewTab.style.display = 'flex';
            interviewBtn.classList.add('active');
            break;

        case "candidate-btn":
            companyInterestTab.style.display = 'none';
            candidateInterestTab.style.display = 'flex';
            interviewTab.style.display = 'none';
            candidateBtn.classList.add('active');
            break;

        case "company-btn":
            companyInterestTab.style.display = 'flex';
            candidateInterestTab.style.display = 'none';
            interviewTab.style.display = 'none';
            companyBtn.classList.add('active');
            break;

    }

    windowSizeHandler(null);

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




companyBtn.addEventListener("click", tabHandler);
candidateBtn.addEventListener("click", tabHandler);
interviewBtn.addEventListener("click", tabHandler);