// Card.jsx
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Card(props) {
  const { name, price, categoryName } = props;
  return (
    <MuiCard elevation={3} sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          height: 120,
          bgcolor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
        }}
      >
        Image
      </Box>
      <CardContent>
        <Typography variant="caption" color="text.secondary">{categoryName}</Typography>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Price: ${price}</Typography>
      </CardContent>
    </MuiCard>
  );
}
export default Card;