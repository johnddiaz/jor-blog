'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookie from 'js-cookie';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    Cookie.set('color-theme', nextTheme, { expires: 400 });
    const themeColors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;
    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button onClick={toggleTheme} className={styles.action}>
          {theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
