const baseURL = "http://localhost:5000/api/v2/"

const erroutput = document.querySelector('#errors')
let btn = document.querySelector('#register');
btn.addEventListener('click', e => {
    errors = []
    let email = document.querySelector('#email').value
    let username = document.querySelector('#username').value
    let fullname = document.querySelector('#fullname').value
    let phone = document.querySelector('#phone').value
    let password = document.querySelector('#password').value
    let password_again = document.querySelector('#p2').value
    if (is_valid_email(email) == false) {
        errors.push('email is invalid')
    }
    if (password.length < 6) {
        errors.push('passwords should be atleast  6 characters')
    }
   if (phone.length<9){
       errors.push('phone number should atleast 10 characters long')
   }
   if (fullname.length<9){
    errors.push('Fullname should atleast 4 characters long')
}
if (username.length<3){
    errors.push('username should atleast 4 characters long')
}
   if(password!==password_again){
       errors.push('Passwords donot match')

   }


    if (errors.length > 0) {

        errors.forEach(err => {
            display_erors(err);

            clear_errors();

        })
    } else {
        document.querySelector("body").classList.add("spinner-1");
        data = {
            "email": email,
            "password": password,
            "username":username,
            "fullname":fullname,
            "phone_number":phone
        }
        startSignUp(data)
    }






    e.preventDefault()

})


function is_valid_email(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);


}
function startSignUp(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(baseURL + "auth/signup", {
        method: "POST", body: JSON.stringify(data), headers: headers
    })
        .then(response => 
            response.json()
            ).catch(err=>console.log(err)            )
        .then(jsondata => {
            document.querySelector("body").classList.remove("spinner-1");
            if (jsondata['Success']) {
                
                document.location.href='/login.html'
             
             
               

            } else {
                display_erors(jsondata['message'])
                setTimeout(() => {

                }, 1000);
                clear_errors()
            }


        }).catch(err=>console.log(err)
        )

}

function display_erors(err) {
    err.toLowerCase();
    erroutput.innerHTML += `
    <li>${err}</li>
    `
}

function clear_errors() {
    setTimeout(() => {
        erroutput.innerHTML = "";
    }, 2000);

}
