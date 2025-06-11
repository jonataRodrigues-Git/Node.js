document.addEventListener("submit", (event) => {

  const form = event.target;

  if(form.id === 'formLogin') {

    event.preventDefault();

    const emailConfig = document.getElementById("emailConfig").value.trim();
    const passwordConfig = document.getElementById("passwordConfig").value.trim();

    if (!emailConfig || !passwordConfig) {
      configMsg("Campo Obrigatorio", "#dc2626");
      return;
    }
  
    configMsg(" Carregando !", "#22c55e");
  }

  if(form.id === 'formRegister') {
    event.preventDefault();

    const nameUser = document.getElementById("nameRegister").value.trim();
    const emailUser = document.getElementById("emailConfigRegister").value.trim();
    const passwordUser = document.getElementById("paswordRegister").value.trim();
    const passwordUserConfimra = document.getElementById("passwordConfiRegirter").value.trim();

    if (!nameUser || !emailUser || !passwordUser || !passwordUserConfimra) {
      configMsg("Compo Obrigatorio", "#dc2626");
      return;
    } 

    if(passwordUser.length  < '8' ) {
      configMsg('Senha deve ter mais de 8 Caracteres', '#dc2626');
      return;
    }

    if(passwordUser !== passwordUserConfimra) {
      configMsg('Senha Não Coincide, Tente Novamente', '#dc2626');
      return;
    } 

    configMsg("Registrado", "#22c55e");
  }

});

function configMsg(text, background) {
  Toastify({
    text: text,
    duration: 2000,
    position: "center",
    style: {
      background: background,
      boxShadow: "none",
    },
  }).showToast();
}
