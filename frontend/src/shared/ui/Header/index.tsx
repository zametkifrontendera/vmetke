import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../config/routes';
import { useAppStore } from '../../../app/store';
import styles from './styles.module.scss';

export function Header() {
  const { user, setUser } = useAppStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    setUser(null);
    navigate(RoutesEnum.AUTH);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <NavLink to={RoutesEnum.HOME} className={styles.logoLink}>
            <div className={styles.logoIcon}>V</div>
            <span className={styles.logoText}>VMetke</span>
          </NavLink>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className={styles.search}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            🔍
          </button>
        </form>

        {/* Navigation */}
        <nav className={styles.nav}>
          <NavLink
            to={RoutesEnum.HOME}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>🏠</span>
            <span className={styles.navText}>Главная</span>
          </NavLink>
          
          <NavLink
            to={RoutesEnum.MESSAGES}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>💬</span>
            <span className={styles.navText}>Сообщения</span>
          </NavLink>
          
          <NavLink
            to={RoutesEnum.FRIENDS}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>👥</span>
            <span className={styles.navText}>Друзья</span>
          </NavLink>
        </nav>

        {/* User Menu */}
        <div className={styles.userSection}>
          <button className={styles.notificationButton}>
            🔔
            <span className={styles.notificationBadge}>3</span>
          </button>
          
          <div className={styles.userMenu}>
            <button
              className={styles.userButton}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className={styles.userAvatar}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.dropdownArrow}>▼</span>
            </button>
            
            {showUserMenu && (
              <div className={styles.userDropdown}>
                <NavLink
                  to={RoutesEnum.PROFILE}
                  className={styles.dropdownItem}
                  onClick={() => setShowUserMenu(false)}
                >
                  👤 Мой профиль
                </NavLink>
                <button
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  🚪 Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
