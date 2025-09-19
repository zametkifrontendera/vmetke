import { Button } from '../../shared/ui/Button'
import styles from './styles.module.scss'

export function AuthPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Авторизация</h1>
      <Button>Войти</Button>
    </div>
  )
}