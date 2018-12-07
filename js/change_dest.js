const baseURL = "http://127.0.0.1:3000/api/v2/"
const erroutput = document.querySelector('#errors')
const urlParams = new URLSearchParams(window.location.search);
const current_item=urlParams.get('parcel')


let btn = document.querySelector('#update');
btn.addEventListener('click', e => {
    e.preventDefault()
    errors = []
    let new_dest = document.querySelector('#dest').value

    if(new_dest.length<4){
        errors.push('Destination address should be atleast 2 characters long');
    }
    
    if (errors.length > 0) {
        errors.forEach(err => {
            display_erors(err);

            clear_errors();

        })
    } else {
        document.querySelector("body").classList.add("spinner-1");
        
        update_destination(new_dest)
       
    }






    e.preventDefault()

})

function update_destination(location) {
    let headers = new Headers();
    headers.append('authorization','Bearer '+localStorage.getItem('_token'))
    headers.append('Content-Type', 'application/json');
    fetch(baseURL +`parcels/${current_item}/destination`, {
        method: "PUT", body: JSON.stringify({'destination_address':location}), headers: headers,mode:'cors'
    })
        .then(response => response.json())
        .then(jsondata => {
            console.log(jsondata);
            
           if(jsondata['new_destination']){
            document.querySelector("body").classList.remove("spinner-1");
            document.location.href=`../details.html?parcel=${current_item}&msg=Destination Updated`

           }else{
            document.querySelector("body").classList.remove("spinner-1");
               display_erors(jsondata['message']);
           }
            
            

        }).catch(function(err){
            console.log(err);
            
            document.querySelector("body").classList.remove("spinner-1");
            display_erors('An error has occured')
        })
    
    

}

function display_erors(err) {
    err.toLowerCase();
    erroutput.innerHTML += `
    <li class="errlist">${err}</li>
    `
    clear_errors()
}

function clear_errors() {
    setTimeout(() => {
        erroutput.innerHTML = "";
    }, 4000);

}
