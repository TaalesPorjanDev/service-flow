import { Outlet, NavLink } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1 className={styles.brandTitle}> ⚡ Flow CRM</h1>
          <p className={styles.brandSubtitle}>Gestão de Clientes</p>
        </div>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [styles.navLink, isActive && styles.navLinkActive]
                .filter(Boolean)
                .join(' ')
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/clientes"
            end
            className={({ isActive }) =>
              [styles.navLink, isActive && styles.navLinkActive]
                .filter(Boolean)
                .join(' ')
            }
          >
            Clientes
          </NavLink>
        </nav>
        <footer className={styles.sidebarFooter}>
          <p>Flow CRM • v1.0</p>
        </footer>
      </aside>
      <div className={styles.content}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
