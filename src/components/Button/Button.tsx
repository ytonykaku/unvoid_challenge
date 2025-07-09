'use client';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
  size?: 'default' | 'small';
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  type = 'secondary',
  size = 'default',
  disabled = false,
  htmlType = 'button',
}: ButtonProps) {
  
  const classNames = [
    styles.button,
    styles[type],
    styles[size],
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
}