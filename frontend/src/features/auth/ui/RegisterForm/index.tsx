import { useForm } from 'react-hook-form';
import { useAuth } from '../../model';
import styles from '../LoginForm/styles.module.scss';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { registerUser } = useAuth();

  const onSubmit = (data: FormData) => registerUser(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        placeholder="Имя"
        {...register('name', { required: true })}
      />
      {errors.name && <span className={styles.error}>Обязательное поле</span>}
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
        {...register('password', { required: true, minLength: 6 })}
      />
      {errors.password && (
        <span className={styles.error}>Минимум 6 символов</span>
      )}
      <button type="submit" className={styles.button}>
        Зарегистрироваться
      </button>
    </form>
  );
}
