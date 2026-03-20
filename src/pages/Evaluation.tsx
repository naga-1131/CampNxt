import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Paper, 
  Grid, 
  Rating, 
  TextField, 
  Button,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  Chip,
  Avatar
} from '@mui/material';
import { ChevronLeft, Send, Info, Music as MusicIcon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { MediaFile } from '../types';
import { apiService } from '../services/api';

const Evaluation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      if (!id) return;
      try {
        const data = await apiService.getMediaById(id);
        if (data) {
          setMedia(data);
        } else {
          navigate('/gallery');
        }
      } catch (error) {
        console.error('Failed to fetch media:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (!media || score === null) return;
    setSubmitting(true);
    try {
      await apiService.submitEvaluation({
        mediaId: media.id,
        score: score,
        comment: comment,
        jurorId: 'juror-1', // Mock juror
        timestamp: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => navigate('/gallery'), 1500);
    } catch (error) {
      console.error('Failed to submit evaluation:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!media) return null;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button 
          startIcon={<ChevronLeft size={18} />} 
          onClick={() => navigate('/gallery')}
          variant="outlined"
          sx={{ 
            borderRadius: '12px', 
            borderColor: 'rgba(0,0,0,0.1)',
            color: 'text.secondary',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: 'white' }
          }}
        >
          Back to Gallery
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label="DRAFT" size="small" sx={{ fontWeight: 700, bgcolor: 'warning.main', color: 'white' }} />
          <Chip label="PENDING REVIEW" size="small" sx={{ fontWeight: 700, bgcolor: 'info.main', color: 'white' }} />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Media Viewer */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={0} sx={{ 
            bgcolor: '#0f172a', 
            borderRadius: 6, 
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {media.type === 'image' && (
              <img 
                src={media.url} 
                alt={media.title} 
                style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain' }}
                referrerPolicy="no-referrer"
              />
            )}
            {media.type === 'video' && (
              <video 
                src={media.url} 
                controls 
                style={{ maxWidth: '100%', maxHeight: '85vh' }}
              />
            )}
            {media.type === 'audio' && (
              <Box sx={{ textAlign: 'center', p: 4, width: '100%' }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
                  <img 
                    src={media.thumbnailUrl} 
                    alt={media.title} 
                    style={{ width: 280, height: 280, borderRadius: 32, objectFit: 'cover', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}
                    referrerPolicy="no-referrer"
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: -15, 
                    right: -15, 
                    width: 60, 
                    height: 60, 
                    bgcolor: 'warning.main', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
                  }}>
                    <MusicIcon size={30} />
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <audio src={media.url} controls style={{ width: '100%', maxWidth: 500, filter: 'invert(1) hue-rotate(180deg)' }} />
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Evaluation Panel */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 6, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
          }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" fontWeight="800" gutterBottom sx={{ letterSpacing: -1 }}>
                {media.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Chip 
                  avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{media.author.charAt(5)}</Avatar>}
                  label={media.author} 
                  variant="outlined" 
                  sx={{ fontWeight: 600 }}
                />
                <Chip label={media.license} size="small" sx={{ fontWeight: 600, bgcolor: 'rgba(0,0,0,0.05)' }} />
              </Box>
            </Box>

            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6 }}>
              {media.description}
            </Typography>

            <Divider sx={{ my: 2, opacity: 0.5 }} />

            <Box sx={{ flexGrow: 1, py: 2 }}>
              <Typography variant="h6" fontWeight="800" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                Evaluation
              </Typography>
              
              <Box sx={{ 
                my: 4, 
                p: 3, 
                borderRadius: 4, 
                bgcolor: 'rgba(99, 102, 241, 0.03)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                textAlign: 'center'
              }}>
                <Typography variant="subtitle2" color="primary" fontWeight="700" gutterBottom>
                  SELECT SCORE (1-10)
                </Typography>
                <Rating
                  name="media-score"
                  value={score}
                  onChange={(_, newValue) => setScore(newValue)}
                  max={10}
                  size="large"
                  sx={{ 
                    fontSize: '2.5rem',
                    '& .MuiRating-iconFilled': { color: 'primary.main' },
                    '& .MuiRating-iconHover': { color: 'primary.light' }
                  }}
                />
                <Typography variant="h3" fontWeight="900" sx={{ mt: 1, color: 'primary.main' }}>
                  {score || 0}<span style={{ fontSize: '1rem', color: '#94a3b8' }}>/10</span>
                </Typography>
              </Box>

              <TextField
                label="Write your feedback..."
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    bgcolor: 'white'
                  }
                }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />}
                disabled={score === 0 || score === null || submitting}
                onClick={handleSubmit}
                sx={{ 
                  py: 2, 
                  borderRadius: '16px', 
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                }}
              >
                {submitting ? 'Submitting...' : 'Submit Evaluation'}
              </Button>
            </Box>

            <Box sx={{ mt: 3, p: 2.5, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ color: 'text.secondary' }}>
                <Info size={20} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                Your evaluation is anonymous and will be aggregated with other jurors' scores.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={success} autoHideDuration={3000}>
        <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: '12px', fontWeight: 600 }}>
          Evaluation submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Evaluation;
