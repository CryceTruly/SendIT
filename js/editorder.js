const baseURL = "http://127.0.0.1:3000/api/v2/"
const erroutput = document.querySelector('#errors')
const urlParams = new URLSearchParams(window.location.search);
const current_item=urlParams.get('order')


let btn = document.querySelector('#update');
btn.addEventListener('click', e => {
    errors = []
    let current_location = document.querySelector('#present').value
    
    var event = document.getElementById("st");
let status = event.options[event.selectedIndex].value;
    if (status.length < 2) {
        errors.push('status should be 2 characters')
    }

    if (errors.length > 0) {
        errors.forEach(err => {
            display_erors(err);

            clear_errors();

        })
    } else {
        document.querySelector("body").classList.add("spinner-1");
        
        update_presentLocation(current_location,status)
       
    }






    e.preventDefault()

})

function update_presentLocation(location,status) {
    console.log(location+status);
    let headers = new Headers();
    headers.append('authorization','Bearer '+localStorage.getItem('_token'))
    headers.append('Content-Type', 'application/json');
    fetch(baseURL + `parcels/${current_item}/status`, {
        method: "PUT", body: JSON.stringify({'status':status}), headers: headers
    }).then(res=>res.json).then(function(data){
       
        
    fetch(baseURL +`parcels/${current_item}/presentLocation`, {
        method: "PUT", body: JSON.stringify({'current_location':location}), headers: headers
    })
        .then(response => response.json())
        .then(jsondata => {
            document.querySelector("body").classList.remove("spinner-1");

            console.log(jsondata);
            
        
// document.location.href=`details.html?item=${current_item}&message=Current Location Updated&status=success`


        })
    
    


    })
}

function display_erors(err) {
    err.toLowerCase();
    erroutput.innerHTML += `
    <li class="errlist">${err}</li>
    `
}

function clear_errors() {
    setTimeout(() => {
        erroutput.innerHTML = "";
    }, 2000);

}
