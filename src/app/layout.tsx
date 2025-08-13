import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/ui/Header';

export const metadata: Metadata = {
  title: 'Khram - ค้นพบและสร้างสรรค์ลวดลายผ้าครามไทย',
  description: 'เก็บรักษาและสร้างสรรค์ลวดลายผ้าครามไทยดั้งเดิม และสร้างลายใหม่ด้วยเทคโนโลยี AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
    <Header 
        title="ค้นพบและสร้างสรรค์"
        subtitle="ลวดลายผ้าครามไทย"
        description="เก็บข้อมูลลวดลายผ้าครามดั้งเดิม และสร้างลายใหม่ด้วยเทคโนโลยี AI"
      />
      {children}</body>
    </html>
  );
}