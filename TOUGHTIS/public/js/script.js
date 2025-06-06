window.addEventListener('scroll', ()=> {
    const navBar = document.querySelector('.navBar');
    const img = document.querySelector('.logoIMG')
    if(window.scrollY  > 110) {
        navBar.classList.add('navbar-reduced');
    }else {
        navBar.classList.remove('navbar-reduced');
        img.classList.add('logo')
    }
});