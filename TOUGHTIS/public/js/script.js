window.addEventListener('scroll', ()=> {
    const navBar = document.querySelector('.navBar');
    if(window.scrollY  > 10) {
        navBar.classList.add('navbar-reduced');
    }else {
        navBar.classList.remove('navbar-reduced');
    }
});