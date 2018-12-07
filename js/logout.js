document.querySelector(".logout").classList.add("spinner-1");

setTimeout(() => {
    localStorage.clear('_token');
    document.location.href='login.html';
}, 2000);

