import { loginUser, signInWithGoogle, setUserLocalStorage } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <div class= "container">
    <div class= "card">
      <header class="header-pages">
        <a href="/#home">
          <img class="header-image" src="../img/logo.png">
        </a>
      </header>
      <h2 class="title">Login</h2>
        <form class="form-login" action="">
          <p id="error-message" class="error-message"></p>
          <label for="get-email" class="label-login">Email</label><br>
          <input type="text" name="email" id="email-user" class="input-login"><br>
          <label for="get-password" class="label-login">Senha</label><br>
          <div class="password-content">
            <input type="password" name="password" id="password-user"><br>
            <div class="show-password">
              <i id="eye-register" class="fa fa-eye" aria-hidden="true"></i>
            </div>
          </div>
        </form> 
        <div class="btn-box">
          <button id="login-button" class="btn login-button">Login</button><br>
          <button id="google-button" class="btn google-button"><img src="img/google-logo.png" alt=""></button>
        </div>
        <div> 
          <hr> 
        </div>
        <p> Não tem uma conta? 
        <a href="/#register"> Cadastre-se </a>
        </p>
    </div>
  </div>
`;

  container.innerHTML = template;

  // Login

  const btnLogin = container.querySelector('#login-button');
  const email = container.querySelector('#email-user');
  const password = container.querySelector('#password-user');
  const googleButton = container.querySelector('#google-button');

  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginUser(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserLocalStorage(user);
        window.location.hash = '#feed';
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        const errorMsg = document.querySelector('#error-message');
        if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Email inválido. Insira um e-mail válido';
          errorMsg.innerHTML = errorMessage;
        } else if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Seu email ou senha está incorreto. Tente novamente';
          errorMsg.innerHTML = errorMessage;
        } else {
          errorMessage = 'Usuário não cadastrado';
          errorMsg.innerHTML = errorMessage;
        }
        return error;
      });
  });

  // Login Google

  googleButton.addEventListener('click', (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;
        setUserLocalStorage(user);
        window.location.hash = '#feed';
      })
      // eslint-disable-next-line arrow-parens
      .catch(() => {
        window.location.hash = '#not-found';
      });
  });

  container.querySelector('#eye-register')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputPassword = document.querySelector('#password-user');
      if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
      } else {
        inputPassword.setAttribute('type', 'password');
      }
    });
  return container;
};
