async function addSeekerInterest(event) {
    event.preventDefault();


 
    let ident = this.id;
    identAarr =ident.split("_");
    let ident2 = identAarr[1];


   let user_id = document.getElementsByClassName("userid");
   let job_id = document.getElementsByClassName('jobid'+ident2);
    user_id = user_id[0].id;
    job_id = job_id[0].id;

 
    console.log("user id: " + user_id);
    console.log("job id:  " + job_id);

    const response = await fetch('/api/users/' + user_id, {
        method: 'put',
        body: JSON.stringify({
            interestIds: [job_id]
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log("asASAS");
        document.location.replace('/');
        return;
    } else {
        alert(response.statusText);
        return;
    }

}


let i =0 ;

while (i >= 0) {

    console.log (document.querySelector('#adds-btn_' + i));
    if (document.querySelector('#adds-btn_' + i)) {
        document.querySelector('#adds-btn_' + i).addEventListener('click', addSeekerInterest);
        i++;
        
    }
    else {
        break;
    }
}