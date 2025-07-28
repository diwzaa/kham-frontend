'use client';

import React, { useState } from 'react';
import { Pattern } from '@/types/pattern';
import styles from '@/styles/components/PatternCard.module.css';

interface PatternCardProps {
  pattern: Pattern;
  onFavoriteToggle?: (id: string) => void;
}

export default function PatternCard({ pattern, onFavoriteToggle }: PatternCardProps) {
  const [isLiked, setIsLiked] = useState(pattern.isFavorite);
  const [likes, setLikes] = useState(pattern.likes);

  const handleFavoriteClick = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onFavoriteToggle?.(pattern.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={pattern.imageUrl} 
          alt={pattern.name}
          className={styles.image}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjQ0NzY4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuC4peC4suC4ouC4hOC4o+C4suC4oTwvdGV4dD48L3N2Zz4=';
          }}
        />
        <button 
          className={`${styles.favoriteBtn} ${isLiked ? styles.favoriteActive : ''}`}
          onClick={handleFavoriteClick}
        >
          ♥
        </button>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{pattern.name}</h3>
        <p className={styles.category}>{pattern.category}</p>
        
        <div className={styles.stats}>
          <span className={styles.likes}>♥ {likes}</span>
          <span className={styles.views}>👁 {Math.floor(Math.random() * 100) + 10}</span>
        </div>
        
        <p className={styles.description}>{pattern.description}</p>
        
        <div className={styles.tags}>
          {pattern.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        
        <button className={styles.downloadBtn}>
          ⬇ ดาวน์โหลด
        </button>
      </div>
    </div>
  );
}