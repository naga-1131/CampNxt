import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Container, 
  Typography, 
  Box, 
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Button
} from '@mui/material';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MediaFile } from '../types';
import { apiService } from '../services/api';
import MediaCard from '../components/MediaCard';

const Gallery: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const data = await apiService.getMediaList();
        setMediaList(data);
      } catch (error) {
        console.error('Failed to fetch media:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const filteredMedia = mediaList.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMediaClick = (media: MediaFile) => {
    navigate(`/evaluate/${media.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ 
        mb: 6, 
        p: 4, 
        borderRadius: 4, 
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        color: 'white',
        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" component="h1" fontWeight="800" gutterBottom sx={{ letterSpacing: -1.5 }}>
            Media Evaluation
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, maxWidth: 600, mb: 4 }}>
            Review and score media submissions for the Wiki Loves contests. Your expertise helps identify the best contributions.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by title or author..."
              variant="outlined"
              size="medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="white" />
                  </InputAdornment>
                ),
                sx: { 
                  bgcolor: 'rgba(255, 255, 255, 0.15)', 
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  borderRadius: '12px',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.7)', opacity: 1 }
                }
              }}
              sx={{ minWidth: 300, flexGrow: 1, maxWidth: 500 }}
            />
          </Box>
        </Box>
        
        {/* Decorative elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: -50, 
          right: -50, 
          width: 200, 
          height: 200, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.1)',
          zIndex: 0
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: -20, 
          right: 100, 
          width: 100, 
          height: 100, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.05)',
          zIndex: 0
        }} />
      </Box>

      <Typography variant="h5" fontWeight="800" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        Available Submissions
        <Chip label={filteredMedia.length} size="small" color="primary" sx={{ fontWeight: 700 }} />
      </Typography>

      <Grid container spacing={4}>
        {filteredMedia.map((media) => (
          <Grid key={media.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MediaCard media={media} onClick={handleMediaClick} />
          </Grid>
        ))}
        {filteredMedia.length === 0 && (
          <Grid size={12}>
            <Paper sx={{ py: 10, textAlign: 'center', borderRadius: 4, bgcolor: 'rgba(0,0,0,0.02)', border: '2px dashed rgba(0,0,0,0.05)' }}>
              <Typography variant="h6" color="text.secondary">
                No media found matching your search.
              </Typography>
              <Button variant="text" onClick={() => setSearchQuery('')} sx={{ mt: 1 }}>
                Clear search
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Gallery;
