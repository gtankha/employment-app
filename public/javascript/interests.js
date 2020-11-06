const employerInterestTab = document.querySelector("#employer-interest");
const candidateInterestTab = document.querySelector("#candidate-interest");
const interviewTab = document.querySelector("#interviews");


const employerBtn = document.querySelector("#employer-btn");
const candidateBtn = document.querySelector("#candidate-btn");
const interviewBtn = document.querySelector("#interview-btn");

function init() {

    candidateInterestTab.style.display = 'none';
    interviewTab.style.display = 'none';
    employerInterestTab.style.display = 'flex';

}

init();


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




employerBtn.addEventListener("click", tabHandler);
candidateBtn.addEventListener("click", tabHandler);
interviewBtn.addEventListener("click", tabHandler);