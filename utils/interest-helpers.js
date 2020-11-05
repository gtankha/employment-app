module.exports = {


    format_interests_employer: (interests,tab) => {

      const emp_interests = [];
      console.log(JSON.stringify(interests))

      interests.forEach(job => {
        
        job.job_interests.forEach(int => {

          if(int.type == tab)
          {
          
          var intObj = { type:int.type,job_id:int.job_id,user_id:int.user_id,title:job.title,
                         description:job.description,candidate_name:int.candidates.full_name,
                         candidate_description:int.candidates.description,candidate_image:int.candidates.image,
                         candidate_id:int.candidates.id};

          emp_interests.push(intObj);
            
          }



        })
       // int.job_interests.forEach(jobI => console.log(jobI))
       //emp_interests.push({type:jobI.type});



      })

      var innerHtml = ``;

      emp_interests.forEach(i=>{

        innerHtml += 
        `<div class="card" style="width: 18rem; margin: 10px">

            <div class="card-header">
                <h2 class="card-title">${i.candidate_name}</h2>
                <h6 class="card-subtitle mb-2 text-muted">Job Interest:${i.title}</h6>
            </div>
            <div class="card-body">
                <img src="${i.candidate_image}" width='100' height='100'/><br>
                <div class="card-text"><b>Candidate description</b>:<br><p>${i.candidate_description}</p></div>
                <a href="http://localhost:3001/api/users/${i.candidate_id}" class="" style="margin: 10px;">See User Profile</a>
            </div>
        </div>`

      })
     
      return innerHtml
    }


  }