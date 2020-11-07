module.exports = {


    format_interests_company: (interests,tab) => {

      const emp_interests = [];
      let intObj = {};
      
      console.log(JSON.stringify(interests))
      interests.forEach(job => {
        
        job.job_interests.forEach(int => {

          if(int.type == tab)
          {

         
           intObj = { id:int.id, type:int.type,job_id:int.job_id,user_id:int.user_id,title:job.title,
                         description:job.description,candidate_name:int.candidates.full_name,
                         candidate_description:int.candidates.description,candidate_image:int.candidates.image,
                         candidate_id:int.candidates.id};        

          emp_interests.push(intObj);
            
          }



        })


      })

      const display = tab == "seeker" ? "": "none";

      var innerHtml = ``;

    

      emp_interests.forEach(i=>{

      

        innerHtml += 
        `<div class="card mt-5" style="width: 18rem; margin: 10px">

            <div class="card-header">
                <h5 class="card-title signup_heading">${i.candidate_name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Job Interest:${i.title}</h6>
            </div>
            <div class="card-body">
                <img src="${i.candidate_image}" width='100' height='100'/><br>
                <div class="card-text"><b>Candidate description</b>:<br><p>${i.candidate_description}</p></div>
                <button type="button" id="add-btn" data-id="${i.id}" style="display:${display}" class="btn btn-primary">I'm Interested</button>
                <button type="button" id="del-btn" data-id="${i.id}" class="btn btn-secondary">Delete</button>
            </div>
        </div>`



      })
     
      return innerHtml
    },
    format_interests_seeker: (interests,tab) => {

      console.log(JSON.stringify(interests))

      const emp_interests = [];
      let intObj = {};
      

      interests.forEach(int => {
        
        

          if(int.type == tab)
          {

         
           intObj = { id:int.id, type:int.type,job_id:int.job_id,user_id:int.user_id,title:int.interested_in.title,
                         description:int.interested_in.description,company_name:int.interested_in.company.company_name,
                         company_image:int.interested_in.company.image};        

          emp_interests.push(intObj);
            
          }


      })

      const display = tab == "seeker" ? "none": "";

      var innerHtml = ``;

      emp_interests.forEach(i=>{

      

        innerHtml += 
        `<div class="card mt-5" style="width: 18rem; margin: 10px">

            <div class="card-header">
                <h5 class="card-title signup_heading">${i.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Company:${i.company_name}</h6>
            </div>
            <div class="card-body">
                <img src="${i.company_image}" width='100' height='100'/><br>
                <div class="card-text"><b>Job description</b>:<br><p>${i.description}</p></div>
                <button type="button" id="add-btn" data-id="${i.id}" style="display:${display}" class="btn btn-primary">I'm Interested</button>
                <button type="button" id="del-btn" data-id="${i.id}" class="btn btn-secondary">Delete</button>
            </div>
        </div>`



      })
     
      return innerHtml
    }


  }