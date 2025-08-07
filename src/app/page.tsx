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
                <div className="text-center" style={{ color: 'white', padding: '60px 0 ' }}>
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