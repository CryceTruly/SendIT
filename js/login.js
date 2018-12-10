if(localStorage.getItem('_token')!=null){
    document.location.href='index.html';
 }
 const baseURL = "http://127.0.01:3000/api/v2/"
const erroutput = document.querySelector('#errors')
 const urlParams = new URLSearchParams(window.location.search);
 
let btn = document.querySelector('#login');
 const current_item=urlParams.get('message');
 const status=urlParams.get('status');
 if(status=='success'){
     erroutput.classList.add('success');
     
 }
if(current_item!=null){
    display_erors(current_item);
}
btn.addEventListener('click', e => {
    errors = []
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    if (is_valid_email(email) == false) {
        errors.push('email is invalid')

    }
    if (password.length < 6) {
    
        errors.push('password should be atleast 6 characters')
    }

    if (errors.length > 0) {

        errors.forEach(err => {
            display_erors(err);

            

        })
    } else {
        document.querySelector("body").classList.add("spinner-1");
        data = {
            "email": email,
            "password": password
        }
        startLogin(data)
    }






    e.preventDefault()

})


function is_valid_email(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);


}
function startLogin(data) {
    console.log(data);
    btn.value='Please wait';
    btn.classList.add('disabled');


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(baseURL + "auth/login", {
        method: "POST", body: JSON.stringify(data), headers: headers
    })
        .then(response => response.json())
        .then(jsondata => {
            
    btn.value='Login';
    btn.classList.remove('disabled');
            document.querySelector("body").classList.remove("spinner-1");
            if (jsondata['auth_token']) {
                save_user_info(jsondata['auth_token'],jsondata['is_admin'],jsondata['user_id'])
                document.location.href = 'index.html';

            } else {
                display_erors(jsondata['message'])
                
            }


        })

}

function display_erors(err) {
    err.toLowerCase();
    erroutput.innerHTML += `
    <li class="errlist">${err}</li>
    `

    setTimeout(() => {

    }, 4000);
    clear_errors()
}

function clear_errors() {
    setTimeout(() => {
        erroutput.innerHTML = "";
        erroutput.classList.remove('success');
    }, 4000);

}

function save_user_info(token,is_admin,user_id) {
    localStorage.setItem('_token', token)
    localStorage.setItem('is_admin',is_admin)
    localStorage.setItem('user_id',user_id)


}

function is_logged_in(){
    
}

function displayMessage(msg){
    document.querySelector('#output').innerHTML=`
    ${msg}
    `
}