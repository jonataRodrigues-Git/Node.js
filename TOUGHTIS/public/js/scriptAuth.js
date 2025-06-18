// Função para mostrar mensagem Toastify
function showToast(text, type = 'success') {
  const colors = {
    success: '#361efc',
    error: '#dc2626'
  };
  
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: colors[type] || colors.success,
      boxShadow: 'none'
    }
  }).showToast();
}

// Função que verifica se email já existe via API
async function checkEmailExists(email) {
  const response = await fetch('/check-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return data.exists;
}

// Evento único ao carregar DOM
window.addEventListener('DOMContentLoaded', () => {

  // Mostrar mensagem enviada do backend (se existir)
  if (window.messageFromServer) {
    const { text, type } = window.messageFromServer;
    showToast(text, type);
  }

  // Validação registro
  const formRegister = document.getElementById('formRegister');
  if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;

      const nameUser = document.getElementById("nameRegister").value.trim();
      const emailUser = document.getElementById("emailConfigRegister").value.trim();
      const passwordUser  = document.getElementById("passwordRegister").value.trim();
      const passwordUserConfirma  = document.getElementById("passwordConfigRegister").value.trim();

      if (!nameUser || !emailUser || !passwordUser || !passwordUserConfirma) {
        showToast("Campo Obrigatório", "error");
        return;
      } 

      if (passwordUser.length < 6) {
        showToast('Senha deve ter mais de 6 caracteres', 'error');
        return;
      }

      if (passwordUser !== passwordUserConfirma) {
        showToast('Senhas não coincidem', 'error');
        return;
      }

      const exists = await checkEmailExists(emailUser);
      if (exists) {
        showToast("E-mail já cadastrado!", "error");
        return;
      }

      showToast("Usuário cadastrado com sucesso!", "success");
      setTimeout(() => form.submit(), 2000);
    });
  }

  // Validação login
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;

      const emailLogin = document.getElementById('emailConfigLogin').value.trim();
      const passwordLogin = document.getElementById('passwordConfigLogin').value.trim();

      if (!emailLogin || !passwordLogin) {
        showToast('Campo Obrigatório !!', 'error');
        return;
      }

      const exists = await checkEmailExists(emailLogin);
      if (!exists) {
        showToast("E-mail não cadastrado!", "error");
        return;
      }

      form.submit();
    });
  }
});
