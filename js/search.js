if(localStorage.getItem('_token')==null){
    document.location.href='login.html';
 }
 if(localStorage.getItem('is_admin')!=='true'){
    document.location.href='../index.html?message=you cannot access that';
 }
 const baseURL = "http://127.0.0.1:3000/api/v2/";

document.querySelector("#userinput").addEventListener('keyup',(e)=>{
    v=e.target.value.trim();
    if(v.length>0){
        document.querySelector("#output").classList.add("spinner-1");
        document.querySelector('#output').innerHTML=  `
        
        `
        searchApp(v.trim().toLowerCase());
    }else{
        document.querySelector('#output').innerHTML=  `
        Please type your query
        `
    }
    
   

    
})


function searchApp(data) {
    console.log(data);
    q={
        "query":data
    }
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer '+localStorage.getItem('_token'))
    fetch(baseURL + "search/", {
        method: "POST",body: JSON.stringify(q), headers: headers
    })
        .then(response => 
            response.json()
            ).catch(err=>console.log(err)            )
        .then(jsondata => {

            if(jsondata.status){
                document.querySelector("#output").innerHTML+=`No results for `+data
            }

            document.querySelector("#output").classList.remove("spinner-1");
            
            // document.querySelector("#table").style.display='block';
            jsondata.data.forEach(data => {
                document.querySelector("#output").innerHTML+=`
                <tr><a title='view profile and orders' class=searchResults href=profile.html?user=${data.user_id}>
                <td>${data.user_id}</td>
                <td>${data.user_email}</td>
                <td><b>${data.user_name}</b></td>
                </tr>
                </a>

                <br>

                `

                
    
            });
            
            
            
            
               
                
            


        }).catch(err=>console.log(err)
        )

}