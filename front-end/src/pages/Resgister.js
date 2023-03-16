import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/Input';
import ButtonSubmit from '../components/ButtonSubmit';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [name_user, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState('');

  const navigate = useNavigate();

  const handlerSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await api.post('/register', {
        name_user,
        email,
        password,
      });
      if (data.token) {
        console.log(data.token);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/tasks');
      }
      alert('Cadastro realizado com sucesso!')
    } catch (err) {
      setError('Dados inválidos');
    }
  };

  const disableSubmit = () => {
    if (
      typeof email === 'string' &&
      typeof password === 'string' &&
      typeof name_user === 'string'
    ) {
      setDisabled(false);
      setError('');
    } else {
      setDisabled(true);
      setDisabled('Dados inválidos');
    }
  };

  return (
    <form className="formRegister" onSubmit={handlerSubmit}>
      <section className="sectionNome">
        <Input
          placeholder="Nome"
          name="nome"
          type="text"
          onChange={({ target }) => {
            setName(target.value);
          }}
          onKeyUp={disableSubmit}
          value={name_user}
        ></Input>
      </section>
      <section className="sectionEmail">
        <Input
          placeholder="Email"
          name="email"
          type="text"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          onKeyUp={disableSubmit}
          value={email}
        ></Input>
      </section>
      <section className="sectionSenha">
        <Input
          placeholder="Senha"
          type="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          onKeyUp={disableSubmit}
          value={password}
        ></Input>
      </section>
      <section>
        <ButtonSubmit
          type="submit"
          content="Cadastrar"
          disabled={disabled}
        ></ButtonSubmit>
      </section>
      <section>{error && <p className="erroDeDados">{error}</p>}</section>
    </form>
  );
}
