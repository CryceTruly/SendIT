
is_user_admin=localStorage.getItem("is_admin");
if(is_user_admin!==true){
    document.querySelector("#is_admin").style.display='none';
}else{
    document.querySelector("#is_admin").style.display='block';  
}