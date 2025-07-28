'use client';

import React from 'react';
import styles from '@/styles/components/Header.module.css';

interface HeaderProps {
  title: string;
  subtitle: string;
  description?: string;
}

export default function Header({ title, subtitle, description }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Khram</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>หน้าแรก</a>
            <a href="#" className={styles.navLink}>เกี่ยวกับ</a>
            <a href="#" className={styles.navLink}>ติดต่อ</a>
          </div>
          <div className={styles.userActions}>
            <button className={styles.iconButton}>♥ รายการโปรด</button>
            <button className={styles.iconButton}>👤 เข้าสู่ระบบ</button>
          </div>
        </nav>
        
        <div className={styles.heroSection}>
          <h1 className={styles.title}>
            {title}
            <br />
            <span className={styles.subtitle}>{subtitle}</span>
          </h1>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
    </header>
  );
}