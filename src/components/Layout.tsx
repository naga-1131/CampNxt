import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button, 
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Layout as LayoutIcon, LogOut, Menu } from 'lucide-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          color: 'text.primary'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/gallery')}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
                color: 'white', 
                p: 1, 
                borderRadius: '12px', 
                mr: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
              }}>
                <LayoutIcon size={20} />
              </Box>
              <Typography variant="h6" noWrap fontWeight="800" sx={{ letterSpacing: -1, fontSize: '1.5rem' }}>
                CampWiz<span style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>NXT</span>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                  <Button 
                    variant={location.pathname === '/gallery' ? 'contained' : 'text'}
                    onClick={() => navigate('/gallery')}
                    sx={{ 
                      borderRadius: '10px',
                      px: 3,
                      bgcolor: location.pathname === '/gallery' ? 'primary.main' : 'transparent',
                      color: location.pathname === '/gallery' ? 'white' : 'text.secondary'
                    }}
                  >
                    Gallery
                  </Button>
                  <Button sx={{ borderRadius: '10px', px: 3, color: 'text.secondary' }}>Stats</Button>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, pl: 2, borderLeft: '1px solid rgba(0,0,0,0.05)' }}>
                <Avatar sx={{ 
                  width: 36, 
                  height: 36, 
                  mr: 1, 
                  background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 10px rgba(236, 72, 153, 0.2)'
                }}>JD</Avatar>
                {!isMobile && (
                  <Box sx={{ mr: 2 }}>
                    <Typography variant="body2" fontWeight="800" sx={{ lineHeight: 1 }}>John Doe</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Juror</Typography>
                  </Box>
                )}
                <IconButton size="small" sx={{ bgcolor: 'rgba(0,0,0,0.03)', ml: 1 }}>
                  <LogOut size={16} />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box component="footer" sx={{ py: 3, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} CampWiz NXT - Wikimedia Commons Evaluation Tool
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
