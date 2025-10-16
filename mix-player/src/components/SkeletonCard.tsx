import React from 'react';
import styles from './SkeletonCard.module.scss';

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imagePlaceholder} />
      <div className={styles.textPlaceholder} />
      <div className={styles.textPlaceholder} style={{ width: '60%' }} />
    </div>
  );
};

export default SkeletonCard;