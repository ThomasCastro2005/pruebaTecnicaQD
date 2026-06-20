const app = require('./src/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Fleet tracker backend running on port ${PORT}`);
});
