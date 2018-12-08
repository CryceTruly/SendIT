const erroutput = document.querySelector('#errors')
const urlParams = new URLSearchParams(window.location.search);
const current_item=urlParams.get('message')


if(current_item!==""){
 display_erors(current_item);
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