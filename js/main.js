
    try {
        is_user_admin=localStorage.getItem("is_admin");
        console.log(is_user_admin);
        
if(is_user_admin!='true'){
    document.querySelector("#is_admin").style.display='none';
}


if(localStorage.getItem('_token')==null){
    document.location.href='login.html?message=you need to login first';
 }else{
     document.querySelector("#loginli").style.display='none';
     document.querySelector('#registerli').style.display='none';

 }
        
    } catch (error) {
        
    }



