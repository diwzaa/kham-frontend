'use client';

import React, { useState, useRef } from 'react';
import { UploadFormData } from '@/types/pattern';
import { categories } from '@/lib/patterns';
import Button from '../ui/Button';
import styles from '@/styles/components/UploadForm.module.css';

interface UploadFormProps {
  onSubmit: (data: UploadFormData) => void;
  onCancel: () => void;
}

export default function UploadForm({ onSubmit, onCancel }: UploadFormProps) {
  const [formData, setFormData] = useState<UploadFormData>({
    name: '',
    category: categories[0],
    description: '',
    tags: [],
    image: null
  });
  
  const [tagInput, setTagInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof UploadFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleInputChange('image', e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('image', e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>ภาพลวดลาย *</label>
        <div 
          className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''} ${formData.image ? styles.hasFile : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className={styles.hiddenInput}
          />
          
          {formData.image ? (
            <div className={styles.fileInfo}>
              <div className={styles.fileIcon}>📁</div>
              <span>{formData.image.name}</span>
            </div>
          ) : (
            <div className={styles.dropContent}>
              <div className={styles.uploadIcon}>📸</div>
              <p>ลากและวางไฟล์ หรือคลิกเพื่อเลือก</p>
              <small>รองรับไฟล์ JPG, PNG, GIF ขนาดไม่เกิน 10MB</small>
            </div>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>ชื่อลวดลาย *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="เช่า ลายกนกท้องลาย"
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.field}>
          <label className={styles.label}>หมวดหมู่</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={styles.select}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>คำอธิบาย</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="อธิบายรายละเอียด ลายทาง ที่มาของลวดลาย"
          className={styles.textarea}
          rows={4}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>แท็กคำค้น</label>
        <div className={styles.tagInput}>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="เช่า ลายครามไทย, ลายดั้งเดิม, ..."
            className={styles.input}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" onClick={handleAddTag} size="small">
            เพิ่ม
          </Button>
        </div>
        
        {formData.tags.length > 0 && (
          <div className={styles.tags}>
            {formData.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                <button 
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className={styles.tagRemove}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button type="submit" disabled={!formData.name || !formData.image}>
          📤 สร้างลวดลาย
        </Button>
      </div>
    </form>
  );
}