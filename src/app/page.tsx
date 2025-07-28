'use client';

import React, { useState, useEffect } from 'react';
import { Pattern, SearchFilters, UploadFormData } from '@/types/pattern';
import { mockPatterns } from '@/lib/patterns';

import Header from '@/components/ui/Header';
import SearchSection from '@/components/ui/SearchSection';
import AIPromptSection from '@/components/ui/AIPromptSection';
import PatternCard from '@/components/ui/PatternCard';
import Modal from '@/components/ui/Modal';
import UploadForm from '@/components/forms/UploadForm';

export default function HomePage() {
  const [patterns, setPatterns] = useState<Pattern[]>(mockPatterns);
  const [filteredPatterns, setFilteredPatterns] = useState<Pattern[]>(mockPatterns);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAISection, setShowAISection] = useState(false);
  const [currentView, setCurrentView] = useState<'gallery' | 'ai'>('gallery');

  const handleSearch = (filters: SearchFilters) => {
    let filtered = patterns;

    // Filter by search query
    if (filters.query) {
      filtered = filtered.filter(pattern =>
        pattern.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        pattern.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        pattern.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()))
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(pattern => pattern.category === filters.category);
    }

    // Sort patterns
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    setFilteredPatterns(filtered);
  };

  const handleUpload = (formData: UploadFormData) => {
    // Create new pattern from form data
    const newPattern: Pattern = {
      id: `custom_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : '/images/patterns/placeholder.jpg',
      description: formData.description,
      tags: formData.tags,
      likes: 0,
      isFavorite: false
    };

    setPatterns(prev => [newPattern, ...prev]);
    setFilteredPatterns(prev => [newPattern, ...prev]);
    setShowUploadModal(false);
  };

  const handleFavoriteToggle = (patternId: string) => {
    setPatterns(prev =>
      prev.map(pattern =>
        pattern.id === patternId
          ? { ...pattern, isFavorite: !pattern.isFavorite }
          : pattern
      )
    );
    setFilteredPatterns(prev =>
      prev.map(pattern =>
        pattern.id === patternId
          ? { ...pattern, isFavorite: !pattern.isFavorite }
          : pattern
      )
    );
  };

  const handleAIGenerate = async (prompt: string, tags: string[]) => {
    // Simulate AI generation
    const aiPattern: Pattern = {
      id: `ai_${Date.now()}`,
      name: `AI Generated Pattern`,
      category: 'ลายสร้างด้วย AI',
      imageUrl: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0idGhhaVBhdHRlcm4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMWU3NGJhIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iOCIgZmlsbD0iI2ZmZiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN0aGFpUGF0dGVybikiLz48L3N2Zz4=`,
      description: `Generated from prompt: ${prompt}`,
      tags: [...tags, 'AI Generated'],
      likes: 0,
      isFavorite: false
    };

    setPatterns(prev => [aiPattern, ...prev]);
    setFilteredPatterns(prev => [aiPattern, ...prev]);
    setShowAISection(false);
    setCurrentView('gallery');
  };

  const handleShowAI = () => {
    setShowAISection(true);
    setCurrentView('ai');
  };

  const handleBackToGallery = () => {
    setShowAISection(false);
    setCurrentView('gallery');
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="ค้นพบและสร้างสรรค์"
        subtitle="ลวดลายผ้าครามไทย"
        description="เก็บรักษาข้อมูลลวดลายผ้าครามดั้งเดิม และสร้างลายใหม่ด้วยเทคโนโลยี AI"
      />

      {currentView === 'gallery' && (
        <>
          <SearchSection 
            onSearch={handleSearch}
            onUploadClick={() => setShowUploadModal(true)}
            onAIClick={handleShowAI}
          />

          <div className="container">
            <div className="main-content">
              {filteredPatterns.length > 0 ? (
                <>
                  <div className="text-center mb-4">
                    <p style={{ color: 'white', fontSize: '16px' }}>
                      พบลวดลาย {filteredPatterns.length} ลาย
                    </p>
                  </div>
                  <div className="grid grid-3 fade-in">
                    {filteredPatterns.map((pattern) => (
                      <PatternCard
                        key={pattern.id}
                        pattern={pattern}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center" style={{ color: 'white', padding: '60px 0' }}>
                  <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>ไม่พบลวดลายที่ค้นหา</h3>
                  <p style={{ fontSize: '16px', opacity: 0.8 }}>ลองเปลี่ยนคำค้นหาหรือสร้างลวดลายใหม่</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {currentView === 'ai' && (
        <AIPromptSection 
          onGenerate={handleAIGenerate}
          onClose={handleBackToGallery}
        />
      )}

      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="อัปโหลดลวดลายผ้าครามใหม่"
        size="large"
      >
        <UploadForm
          onSubmit={handleUpload}
          onCancel={() => setShowUploadModal(false)}
        />
      </Modal>

      <div className="text-center" style={{ padding: '40px 0', color: 'rgba(255, 255, 255, 0.6)' }}>
        <p>© 2024 Khram - ระบบจัดเก็บและสร้างลวดลายผ้าครามไทย</p>
      </div>
    </div>
  );
}