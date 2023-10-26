/*import React, { useState } from 'react';
import './Login.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione aqui a lógica para processar o login
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail ou Username"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;*/
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples (você pode expandir isso mais tarde)
    if (!email.includes('@')) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Adicione aqui a lógica para processar o login
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <label>
          E-mail ou Username:
          <input
            type="text"
            placeholder="Digite seu e-mail ou username"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
      <button onClick={() => {/* Adicione lógica para navegar para a tela de registro aqui */}}>
        Registrar-se
      </button>
    </div>
  );
}

export default Login;
