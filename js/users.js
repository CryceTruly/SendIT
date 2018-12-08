const baseURL="http://127.0.0.1:3000/api/v2/";
if(localStorage.getItem('_token')==null){
    document.location.href='../login.html?message=you need to log in first';
 }
 if(localStorage.getItem('is_admin')!=='true'){
    document.location.href='../index.html?message=you cannot access that';
 }
document.querySelector("tbody").classList.add("spinner-1");
headers=new Headers()
headers.append('Content-Type', 'application/json');
headers.append('authorization','Bearer '+localStorage.getItem('_token'));
allparcels = null;
fetch(baseURL + "users", {
    method: "GET", headers: headers
})
    .then(response => response.json())
    .then(data => {
    all=
    data.users.length;
    admins=0;
    regular=0;
    moderators=0;
      
         data.users.forEach(user => {
             
role=null;
action=null;


if(user.is_admin==true){
    role="Admin";
    action=`demote`
    admins+=1;
}else{
    role="Normal";
    action=`promote`;
    regular+=1;
}
         
          document.querySelector('tbody').innerHTML+=`
          <tr>
          <td>${user.user_id}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${formatDate(user.joined)}</td>
          <td>${role} ${action}</td>

          <td><a href=../profile.html?user=${user.user_id}><i class="fa fa-long-arrow-right"></i></a></td>
      </tr>
          `
          
          document.querySelector("tbody").classList.remove("spinner-1");
         });
        
         document.querySelector('#can').textContent=`${all}`;
         document.querySelector('#del').textContent=`${regular}`;
         document.querySelector('#in').textContent=`_`;
         document.querySelector('#pen').textContent=`${admins}`;
    }
    )

    function formatDate(date){
        return date.split('00')[0];
    }