const baseURL = "https://trulysendit.herokuapp.com/api/v2/";
headers=new Headers()
document.querySelector(".test").classList.add("spinner-1");
headers.append('Content-Type', 'application/json');
headers.append('authorization','Bearer '+localStorage.getItem('_token'))
const urlParams = new URLSearchParams(window.location.search);
const msg=urlParams.get("message");
const current_item=urlParams.get('user');
if(current_item!==null){
    user=parseInt(current_item)

}else{
    user=parseInt(localStorage.getItem('user_id'));
}
loadProfile(user)


if(localStorage.getItem('is_admin')=='true'){
   if(user!=100){
       document.querySelector("#mp").innerHTML="User Profile";


   }
    


 }


if(msg){
    document.querySelector("#msgoutput").innerHTML=`
    <li>
        <h4 class="success">${msg}</h4></li>`;

   setTimeout(() => {
    document.querySelector("#msgoutput").innerHTML=``;
   }, 4000);
}



fetch(baseURL +`users/${user}/parcels`, {
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
                <td>${timeSince(parcel.placed)} ago</td>
                  <td><a href=details.html?parcel=${parcel.parcel_id} class="button">Details</a></td>
              </tr>
                `
                
            })
            document.querySelector(".count").innerHTML=`${dcount}`;
              
               
               
        }
        
            })
        
        
        
            function loadProfile(user){
        
        fetch(baseURL + `users/${user}`, {
            method: "GET", headers: headers
        })
            .then(response => response.json())
            .then(data => {
                document.querySelector(".test").classList.remove("spinner-1");
                console.log(data);
                
                
                document.querySelector('.output').innerHTML=`
                <img src="./img/pic.png" height="100" id="profileimg">
        
                   <h3>${data.fullname}</h3>
                   <p>${data.email}</p>
                   <p>${data.telephone_number}</p>
                   <a href="editprofile.html?user=${data.user_id}" class="button" id=editbtn>Edit your Profile</a>
             
                `
                
            })
                   
        }
        function formatDate(date){
            return date.split('00')[0];
        }
        var DURATION_IN_SECONDS = {
            epochs: ['year', 'month', 'day', 'hour', 'minute'],
            year: 31536000,
            month: 2592000,
            day: 86400,
            hour: 3600,
            minute: 60
          };
          
          function getDuration(seconds) {
            var epoch, interval;
          
            for (var i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
              epoch = DURATION_IN_SECONDS.epochs[i];
              interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
              if (interval >= 1) {
                return {
                  interval: interval,
                  epoch: epoch
                };
              }
            }
          
          };
          
          function timeSince(date) {
            var seconds = Math.floor((new Date() - new Date(date)) / 1000);
            var duration = getDuration(seconds);
try {
    var suffix = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
                return duration.interval + ' ' + duration.epoch + suffix;
} catch (error) {
    return 'seconds';
}
                
            
            
          };
          