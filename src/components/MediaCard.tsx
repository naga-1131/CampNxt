import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActionArea,
  Box,
  Chip
} from '@mui/material';
import { Image as ImageIcon, Video as VideoIcon, Music as MusicIcon } from 'lucide-react';
import { MediaFile } from '../types';

interface MediaCardProps {
  media: MediaFile;
  onClick: (media: MediaFile) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ media, onClick }) => {
  const getMediaTheme = () => {
    switch (media.type) {
      case 'video': return { icon: <VideoIcon size={14} />, color: '#ec4899', label: 'VIDEO' };
      case 'audio': return { icon: <MusicIcon size={14} />, color: '#f59e0b', label: 'AUDIO' };
      default: return { icon: <ImageIcon size={14} />, color: '#6366f1', label: 'IMAGE' };
    }
  };

  const mediaTheme = getMediaTheme();

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      '&:hover .media-overlay': { opacity: 1 }
    }}>
      <CardActionArea onClick={() => onClick(media)} sx={{ height: '100%' }}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={media.thumbnailUrl}
            alt={media.title}
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '.MuiCard-root:hover &': { transform: 'scale(1.1)' }
            }}
          />
          <Box 
            className="media-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'flex-end',
              p: 2
            }}
          >
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>
              Click to evaluate
            </Typography>
          </Box>
          <Chip
            icon={mediaTheme.icon}
            label={mediaTheme.label}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              fontWeight: 700,
              fontSize: '0.65rem',
              color: mediaTheme.color,
              '& .MuiChip-icon': { color: 'inherit' },
              border: `1px solid ${mediaTheme.color}44`
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ 
            fontSize: '1.1rem', 
            lineHeight: 1.3,
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {media.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 20, 
              height: 20, 
              borderRadius: '50%', 
              bgcolor: mediaTheme.color + '22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: mediaTheme.color
            }}>
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 800 }}>
                {media.author.charAt(5).toUpperCase()}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              {media.author}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
