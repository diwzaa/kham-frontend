'use client';

import React, { useState } from 'react';
import Button from './Button';
import styles from '@/styles/components/AIPromptSection.module.css';

interface AIPromptSectionProps {
  onGenerate: (prompt: string, tags: string[]) => void;
  onClose: () => void;
}

export default function AIPromptSection({ onGenerate, onClose }: AIPromptSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const predefinedTags = ['tag 1', 'tag 2', 'tag 3', 'tag 4'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      await onGenerate(prompt, selectedTags);
      setPrompt('');
      setSelectedTags([]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.aiSection}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>อธิบายความต้องการ</h2>
            <Button variant="outline" onClick={onClose}>
              ← ย้อนกลับ
            </Button>
          </div>

          <div className={styles.promptArea}>
            <label className={styles.label}>
              อธิบายลายที่ต้องการ เช่น "ลายกนกท้องลาย เป็น ลายงามความคิดขนาดใหญ่ ใช้งานจัดพิมพ์"
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="อธิบายลายที่ต้องการ เช่น ลายกนกท้องลาย เป็น ลายงามความคิดขนาดใหญ่ ใช้งานจัดพิมพ์"
              className={styles.textarea}
              rows={4}
            />
          </div>

          <div className={styles.tagsSection}>
            <label className={styles.label}>ตัวอย่าง Prompt:</label>
            <div className={styles.tags}>
              {predefinedTags.map((tag, index) => (
                <button
                  key={index}
                  className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagActive : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <Button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              size="large"
              fullWidth
            >
              {isGenerating ? '🎨 กำลังสร้าง...' : '✨ สร้างลายด้วย AI'}
            </Button>
          </div>

          <div className={styles.exampleSection}>
            <h3 className={styles.exampleTitle}>เลือกความต้องแบบ</h3>
            <div className={styles.examples}>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={styles.exampleCard}>
                  <div className={styles.placeholder}>
                    <span>KRAM-{num}</span>
                  </div>
                  <p className={styles.exampleText}>
                    สปรมซายครามไทยยมดิ้นเงป้น วิลา่านเทาไปมาใครข
                  </p>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => {/* Handle example selection */}}
                  >
                    บันทึกขื้อมูล
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}