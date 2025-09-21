import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../app/store';
import { RoutesEnum } from '../../shared/config/routes';
import styles from './styles.module.scss';

export function ProfilePage() {
  const navigate = useNavigate();
  const setUser = useAppStore((s) => s.setUser);
  const user = useAppStore((s) => s.user);

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate(RoutesEnum.AUTH, { replace: true });
  }, [navigate, setUser]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль</h1>
      <div className={styles.info}>
        <div className={styles.field}>
          <span className={styles.label}>Имя</span>
          <span className={styles.value}>{user?.name ?? '—'}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user?.email ?? '—'}</span>
        </div>
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
}
export default ProfilePage;
