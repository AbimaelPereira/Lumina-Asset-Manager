
import React from 'react';
import { 
  LayoutGrid, 
  Settings, 
  Plus, 
  Search, 
  Trash2, 
  ChevronRight, 
  FileJson, 
  Database,
  ExternalLink,
  Eye,
  AlertCircle,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Video
} from 'lucide-react';

export const COLORS = {
  bg: '#0f0f0f',
  card: '#161616',
  border: '#2a2a2a',
  accent: '#ffffff',
  danger: '#ef4444',
  textMuted: '#71717a',
};

export const ICONS = {
  Assets: <LayoutGrid size={20} />,
  Settings: <Settings size={20} />,
  Plus: <Plus size={20} />,
  Search: <Search size={18} />,
  Trash: <Trash2 size={18} />,
  Chevron: <ChevronRight size={18} />,
  JSON: <FileJson size={18} />,
  Mongo: <Database size={18} />,
  Link: <ExternalLink size={16} />,
  View: <Eye size={16} />,
  Alert: <AlertCircle size={16} />,
  Success: <CheckCircle2 size={16} />,
  Close: <X size={20} />,
  Image: <ImageIcon size={20} />,
  Video: <Video size={20} />,
};
