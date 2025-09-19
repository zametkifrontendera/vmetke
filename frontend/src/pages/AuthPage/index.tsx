import { useState } from 'react';
import { LoginForm } from '../../features/auth/ui/LoginForm';
import { RegisterForm } from '../../features/auth/ui/RegisterForm';
import styles from './styles.module.scss';

export function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isRegister ? 'Регистрация' : 'Вход'}</h1>
      {isRegister ? <RegisterForm /> : <LoginForm />}
      <button
        className={styles.toggle}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? 'Уже есть аккаунт? Войти'
          : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </div>
  );
}
