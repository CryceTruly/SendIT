const baseURL = "https://trulysendit.herokuapp.com/api/v2/"
const erroutput = document.querySelector('#errors')
let btn = document.querySelector('#login');
btn.addEventListener('click', e => {
    errors = []
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    if (is_valid_email(email) == false) {
        errors.push('email is invalid')
    }
    if (password.length < 6) {
        errors.push('password should be 6 characters')
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

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(baseURL + "auth/login", {
        method: "POST", body: JSON.stringify(data), headers: headers
    })
        .then(response => response.json())
        .then(jsondata => {
            document.querySelector("body").classList.remove("spinner-1");
            if (jsondata['auth_token']) {
                saveToken(jsondata['auth_token'])
                document.location.href = 'index.html';

            } else {
                display_erors(jsondata['message'])
                setTimeout(() => {

                }, 1000);
                clear_errors()
            }


        })

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

function saveToken(token) {
    localStorage.setItem('_token', token)


}

function is_logged_in(){
    
}