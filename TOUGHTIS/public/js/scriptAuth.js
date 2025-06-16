// Função de verificação
async function checkEmailExists(email) {
  const response = await fetch('/check-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return data.exists;
}

// Event Listener principal
document.getElementById('formRegister').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  const nameUser = document.getElementById("nameRegister").value.trim();
  const emailUser = document.getElementById("emailConfigRegister").value.trim();
  const passwordUser  = document.getElementById("passwordRegister").value.trim();
  const passwordUserConfirma  = document.getElementById("passwordConfigRegister").value.trim();

  if (!nameUser || !emailUser || !passwordUser || !passwordUserConfirma ) {
    showToast("Campo Obrigatorio", "error");
    return;
  } 

  if(passwordUser.length  < 8 ) {
    showToast('Senha deve ter mais de 8 Caracteres', 'error');
    return;
  }

  if(passwordUser !== passwordUserConfirma ) {
    showToast('Senha Não Coincide, Tente Novamente', 'error');
    return;
  } 

  const exists = await checkEmailExists(emailUser);

  if (exists) {
    showToast("Email já cadastrado!", "error");
    return;
  }

  showToast("Usuário Cadastrado com Sucesso ! ... ", "success");

  setTimeout(() => {
    form.submit();
  }, 2000);
});


function showToast(text, type = 'success') {

    const toastColors= {
        success: '#361efc',
        error: '#dc2626'
    };

  Toastify({
    text: text,
    duration: 2000,
    position: "center",
    style: {
      background: toastColors[type],
      boxShadow: "none",
    },
  }).showToast();

}
