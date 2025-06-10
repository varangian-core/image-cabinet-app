export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FLUORESCENT_COLORS = [
  { name: 'Neon Pink', value: '#FF006E', glow: 'rgba(255, 0, 110, 0.5)' },
  { name: 'Electric Blue', value: '#00F5FF', glow: 'rgba(0, 245, 255, 0.5)' },
  { name: 'Lime Green', value: '#00FF88', glow: 'rgba(0, 255, 136, 0.5)' },
  { name: 'Cyber Yellow', value: '#FFE500', glow: 'rgba(255, 229, 0, 0.5)' },
  { name: 'Hot Magenta', value: '#FF0090', glow: 'rgba(255, 0, 144, 0.5)' },
  { name: 'Acid Green', value: '#88FF00', glow: 'rgba(136, 255, 0, 0.5)' },
  { name: 'Electric Purple', value: '#BF00FF', glow: 'rgba(191, 0, 255, 0.5)' },
  { name: 'Neon Orange', value: '#FF6600', glow: 'rgba(255, 102, 0, 0.5)' },
  { name: 'Plasma Red', value: '#FF0040', glow: 'rgba(255, 0, 64, 0.5)' },
  { name: 'UV Blue', value: '#0080FF', glow: 'rgba(0, 128, 255, 0.5)' },
  { name: 'Toxic Green', value: '#40FF00', glow: 'rgba(64, 255, 0, 0.5)' },
  { name: 'Laser Pink', value: '#FF0080', glow: 'rgba(255, 0, 128, 0.5)' },
];

export const DEFAULT_CATEGORIES: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Documents',
    color: FLUORESCENT_COLORS[1].value,
    icon: 'FileText',
    description: 'PDFs, Word docs, spreadsheets, and text files'
  },
  {
    name: 'Images',
    color: FLUORESCENT_COLORS[0].value,
    icon: 'Image',
    description: 'Photos, screenshots, and graphics'
  },
  {
    name: 'Videos',
    color: FLUORESCENT_COLORS[6].value,
    icon: 'Video',
    description: 'Movies, clips, and recordings'
  },
  {
    name: 'Archives',
    color: FLUORESCENT_COLORS[3].value,
    icon: 'Archive',
    description: 'Zip files and compressed folders'
  },
  {
    name: 'Projects',
    color: FLUORESCENT_COLORS[2].value,
    icon: 'Folder',
    description: 'Project files and workspaces'
  }
];