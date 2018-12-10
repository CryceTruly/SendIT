if(localStorage.getItem('_token')!=null){
    document.location.href='index.html';
 }


    document.forms[0].addEventListener('submit',function(e){
e.preventDefault();
document.querySelector("body").classList.add("spinner-1");
document.querySelector('#submit').value="Checking,Please wait....";
document.querySelector('#submit').classList.add("disabled");

    })
  
