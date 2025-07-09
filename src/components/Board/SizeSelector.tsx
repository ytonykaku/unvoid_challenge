'use client';
import { useState } from 'react';
import styles from './Board.module.css';
import Button from '../Button/Button';

interface SizeSelectorProps {
  onSizeChange: (width: number, height: number) => void;
}

export default function SizeSelector({ onSizeChange }: SizeSelectorProps) {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, dimension: 'width' | 'height') => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 8;
    if (value < 6) value = 6;
    if (value > 12) value = 12;

    if (dimension === 'width') {
      setWidth(value);
    } else {
      setHeight(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSizeChange(width, height);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
        <div>
        <label>Board:</label>
        <input
            type="number"
            value={width}
            onChange={(e) => handleInputChange(e, 'width')}
            min="6"
            max="12"
            className={styles.input}
        />
        <span>x</span>
        <input
            type="number"
            value={height}
            onChange={(e) => handleInputChange(e, 'height')}
            min="6"
            max="12"
            className={styles.input}
        />
        <Button htmlType="submit" type="primary" size="default">
            Confirmar
        </Button>
        </div>
    </form>
  );
}