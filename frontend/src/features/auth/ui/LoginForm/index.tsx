import { useForm } from 'react-hook-form';
import { useAuth } from '../../model';
import styles from './styles.module.scss';

interface FormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { login } = useAuth();

  const onSubmit = (data: FormData) => login(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Email"
        {...register('email', { required: true })}
      />
      {errors.email && <span className={styles.error}>Обязательное поле</span>}
      <input
        className={styles.input}
        type="password"
        placeholder="Пароль"
        {...register('password', { required: true })}
      />
      {errors.password && (
        <span className={styles.error}>Обязательное поле</span>
      )}
      <button type="submit" className={styles.button}>
        Войти
      </button>
    </form>
  );
}
