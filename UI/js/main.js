    const baseURL="https://trulysendit.herokuapp.com/"
    const erroutput=document.querySelector('#errors')
    let btn=document.querySelector('#login');
    btn.addEventListener('click',e=>{
        errors=[]
        let email=document.querySelector('#email').value
        let password=document.querySelector('#password').value
        if(is_valid_email(email)==false){
            errors.push('email is invalid')   
        }
        if(password.length<6){
            errors.push('password should be 6 characters')    
        }

        if(errors.length>0){
          
            errors.forEach(err => {
            display_erors(err);
                  
            clear_errors();
           
        })}else{
            document.querySelector("body").classList.add("spinner-1");
            data={
                "password":email,
                "password":password
            }
            startLogin(data)
        }

        

        


        e.preventDefault()
        
    })


function is_valid_email(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
function startLogin(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(baseURL+"/api/v2/auth/login",
     {
        method: 'POST',
        body:data,
        headers:headers
        
        
      }
         
    ).then(res=>{
        document.querySelector("body").classList.remove("spinner-1");
        console.log(res.data);
        
        display_erors(res.statusText)
        setTimeout(() => {
            
        }, 1000);
        clear_errors()
        
    }).catch(err=>{
        document.querySelector("body").classList.remove("spinner-1");
        console.log(err);
    
        
    })
}

function display_erors(err){
    erroutput.innerHTML+=`
    <li>${err}</li>
    `
}

function clear_errors(){
    setTimeout(() => {
                 
        erroutput.innerHTML="";
     }, 2000);
       
}