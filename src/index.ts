import express from 'express';
import imageroute from './routes/imageroute';
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/api/image', imageroute);
app.get('/', (req, res) => {
  res.render('image.ejs');
});
app.listen(3000, function () {
  console.log('listening to port 3000');
});
export default app;
