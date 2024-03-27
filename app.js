const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product_routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
