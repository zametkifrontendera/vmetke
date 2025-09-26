import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../config/routes';
import { Button } from '../Button';
import styles from './styles.module.scss';

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <NavLink
            to={RoutesEnum.HOME}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Лента
          </NavLink>
        </li>
        <li>
          <NavLink
            to={RoutesEnum.PROFILE}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to={RoutesEnum.MESSAGES}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Сообщения
          </NavLink>
        </li>
        <li>
          <NavLink
            to={RoutesEnum.FRIENDS}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Друзья
          </NavLink>
        </li>
      </ul>
      <Button variant="secondary">Создать пост</Button>
    </nav>
  );
}
