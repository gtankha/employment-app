

function windowSizeHandler(event) {

    if (document.querySelector("ul")) {
        if (window.innerWidth <= 1000) {
            document.querySelector("ul").classList.remove('nav-tabs');
            document.querySelector("ul").classList.add('nav-pills');
            document.querySelector("ul").classList.add('flex-column');
        }
        else {
            document.querySelector("ul").classList.add('nav-tabs');
            document.querySelector("ul").classList.remove('nav-pills');
            document.querySelector("ul").classList.remove('flex-column');
        }
    }


    if (window.innerWidth <= 500) {


        document.querySelector("header").classList.remove('d-flex');
        document.querySelector("header").classList.add('flex-column');
        document.querySelector("nav").classList.remove('justify-content-end');
        document.querySelector("nav").classList.add('justify-content-center');
        document.querySelector("h1").classList.remove('ml-5');

        if (!document.getElementById("company-interest")) return

        if (document.getElementById("company-interest").style.display == "flex") document.getElementById("company-interest").style.display = "";
        if (document.getElementById("candidate-interest").style.display == "flex") document.getElementById("candidate-interest").style.display = "";
        if (document.getElementById("interviews").style.display == "flex") document.getElementById("interviews").style.display = "";
        if (document.getElementById("matching-skills").style.display == "flex") document.getElementById("matching-skills").style.display = "";


    }
    else {


        document.querySelector("header").classList.add('d-flex');
        document.querySelector("header").classList.remove('flex-column');
        document.querySelector("nav").classList.add('justify-content-end');
        document.querySelector("nav").classList.remove('justify-content-center');
        document.querySelector("h1").classList.add("ml-5")

        if (!document.getElementById("company-interest")) return

        if (document.getElementById("company-interest").style.display == "") document.getElementById("company-interest").style.display = "flex";
        if (document.getElementById("candidate-interest").style.display == "") document.getElementById("candidate-interest").style.display = "flex";
        if (document.getElementById("interviews").style.display == "") document.getElementById("interviews").style.display = "flex";
        if (document.getElementById("matching-skills").style.display == "") document.getElementById("matching-skills").style.display = "flex";


    }
}

window.addEventListener('resize', windowSizeHandler);

windowSizeHandler(null);