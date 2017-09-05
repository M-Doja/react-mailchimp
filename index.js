const express = require('express'),
      Mailchimp = require('mailchimp-api-v3');

require('dotenv').config();

const mc_api_key = process.env.MAIL_CHIMP_KEY;
const list_id = process.env.MAILING_LIST_ID;

const app = express();
const mailchimp = new Mailchimp(mc_api_key);


if (process.env.NODE_ENV === 'production') {
  // Express will serve up prodution assets
  // like mainj.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up index.html
  // if route is unrecognized
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/api/memberList', (req, res) => {
  mailchimp.get(`/lists/${list_id}/members`)
  .then(function(results){
    console.log(results);
    res.send(results);
  })
  .catch(function(err){
    res.send(err);
  });
});





const port = process.env.PORT || 9001;
app.listen(port);

console.log(`App running on port ${port}`);
