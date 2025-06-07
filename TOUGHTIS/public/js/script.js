window.addEventListener('scroll', ()=> {
    const navBar = document.querySelector('.navBar');
    if(window.scrollY  > 110) {
        navBar.classList.add('navbar-reduced');
    }else {
        navBar.classList.remove('navbar-reduced');
    }
});