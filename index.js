const app = require('./src/app')
require('dotenv').config();

const PORT = process.env.PORT || 3331;

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ouvindo a porta ${PORT}`);
});
