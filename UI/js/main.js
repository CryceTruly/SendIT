newFunction();

function newFunction() {
    let menu = document.querySelector('#menu');
    let menulink = document.querySelector('#menushow');
    menulink.addEventListener('click', (e) => {
        console.log('clicked');
        menu.classList.toggle('showing');
        e.preventDefault();
    });
    // bodywidth=document.body.clientWidth;
    // if(bodywidth<=535){
    //     menulink.addEventListener('click',function(){
    //         document.location='index.html';
    //     })
    // forgot navigation
    try {
        document.getElementById('fgtp').addEventListener('click', () => {
           
            document.location.href ="http://127.0.0.1:5500/UI/forgot.html";
        });
    }
    catch (e) {
    }
}
