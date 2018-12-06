const baseURL = "http://127.0.01:3000/api/v2/";
headers=new Headers()
document.querySelector(".test").classList.add("spinner-1");
headers.append('Content-Type', 'application/json');
headers.append('authorization','Bearer '+localStorage.getItem('_token'))
loadProfile()


fetch(baseURL +`users/${parseInt(localStorage.getItem('user_id'))}/parcels`, {
    method: "GET", headers: headers
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector("body").classList.remove("spinner-1");
        if(data.parcels==undefined){
            console.log('user has no parcels');
            document.querySelector('table').innerHTML=`No orders yet! <a class=new href=createorder.html>Create One</a>`
            document.querySelector(".count2").innerHTML=`0`; 
            document.querySelector(".count").innerHTML=`0`;
        }else{
            document.querySelector(".count2").innerHTML=`${data.parcels.length}`;

            dcount=0
           
            data.parcels.forEach(parcel=>{
                if(parcel['status']==='delivered'){
                    dcount+=1
                }
           
        
                document.querySelector('tbody').innerHTML+=`
                <tr>
                <td>${parcel.parcel_id}</td>
                <td>${parcel.status}</td>
                <td>${formatDate(parcel.placed)}</td>
                  <td><a href=details.html?parcel=${parcel.parcel_id} class="button">Details</a></td>
              </tr>
                `
                
            })
            document.querySelector(".count").innerHTML=`${dcount}`;
              
               
               
        }
        
            })
        
        
        
            function loadProfile(){
        
        fetch(baseURL + `users/${localStorage.getItem('user_id')}`, {
            method: "GET", headers: headers
        })
            .then(response => response.json())
            .then(data => {
                document.querySelector(".test").classList.remove("spinner-1");
                console.log(data);
                
                
                document.querySelector('.output').innerHTML=`
                <img src="./img/pic.jpg" height="100" id="profileimg">
        
                   <h3>${data.fullname}</h3>
                   <p>${data.email}</p>
                   <p>${data.telephone_number}</p>
                   <a href="editprofile.html?user=${data.user_id}" class="button">Edit your Profile</a>
             
                `
                
            })
                   
        }
        function formatDate(date){
            return date.split('00')[0];
        }
        