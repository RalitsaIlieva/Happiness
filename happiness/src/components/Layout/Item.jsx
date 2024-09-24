import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import { doc, getDoc } from 'firebase/firestore/lite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Item = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function getData() {
      const docRef = doc(db, 'organisations', id);
      try {
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]);
  if (!data) return null;

  return (
    <Card elevation={0} sx={{marginTop: "20px"}}>
      <CardHeader title={data.name} sx={{marginTop: "10px"}} align="center"/>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={3}>
          <CardMedia component="img" height="250" image={data.picture} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} align='center'>
              {data.description}
            </Typography>
          </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Item;
