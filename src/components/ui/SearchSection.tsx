'use client';

import React, { useState } from 'react';
import { SearchFilters } from '@/types/pattern';
import Button from './Button';
import styles from '@/styles/components/SearchSection.module.css';

interface SearchSectionProps {
  onSearch: (filters: SearchFilters) => void;
  onUploadClick: () => void;
  onAIClick: () => void;
}

export default function SearchSection({ onSearch, onUploadClick, onAIClick }: SearchSectionProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    sortBy: 'newest'
  });

  const handleSearchChange = (field: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  return (
    <div className={styles.searchSection}>
      <div className="container">
        <div className={styles.searchBar}>
          <div className={styles.searchInput}>
            <input
              type="text"
              placeholder="ค้นหาลวดลาย, ชื่อ, คำจำ, หรือแท็กคำค้น..."
              value={filters.query}
              onChange={(e) => handleSearchChange('query', e.target.value)}
              className={styles.input}
            />
            <Button onClick={() => onSearch(filters)}>
              🔍 ค้นหา
            </Button>
          </div>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.filterButtons}>
            <button 
              className={`${styles.filterBtn} ${filters.category === '' ? styles.active : ''}`}
              onClick={() => handleSearchChange('category', '')}
            >
              ดูทั้งหมดลาย
            </button>
            <button 
              className={`${styles.filterBtn} ${filters.category === 'ai' ? styles.active : ''}`}
              onClick={onAIClick}
            >
              🤖 สร้างลายด้วย AI
            </button>
          </div>
        </div>

        <div className={styles.aiSection}>
          <h2 className={styles.aiTitle}>สร้างลายผ้าด้วย AI</h2>
          <p className={styles.aiDescription}>
            ใช้ปญญาประดิษฐ์เพื่อสร้างลวดลายผ้าครามไทย โดยบีสิร่งงานสามกล้วยที่ท่านข้องการสม
            สร้างสรรดิช่องครบค่า
          </p>
          
          <div className={styles.promptButtons}>
            <Button variant="outline" size="small">
              ⚡ สร้างจาก Prompt
            </Button>
            <Button variant="outline" size="small">
              🔄 เปลี่ยนรายละเอียด
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}