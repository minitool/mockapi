const express = require('express');
const fs = require('fs');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const data = fs.readFileSync('./memo.json');
const dataJSON = JSON.parse(data);
const converToJSON = string => {
  let result;
  try {
    result = JSON.parse(string);
  } catch (error) {
  }
  return result;
}
app.post('/path', (req, res) => {
  const reqBody = req.body;
  const [path] = Object.keys(reqBody);
  const [dataBody] = Object.values(reqBody);
  dataJSON[path] = {};
  dataJSON[path].body = dataBody;
  try {
    fs.writeFileSync('./memo.json', JSON.stringify(dataJSON));
    res.send('success');
  } catch (error) {
    res.send('you just found a bug, please tell the author' + error.message);
  }
  // if (isValidJSON(reqBody)) {
  //   res.send('success');
  // } else {
  //   res.send('we only accept json at the moment')
  // }
  // dataJSON
});

app.get('/path/:id', (req, res) => {
  const { id } = req.params;
  const availableData = dataJSON[id];
  
  if (availableData === undefined) {
    res.send('the page does not have any data')
  } else {
    const availableDataBody = availableData.body;
    const availableDataJSON = converToJSON(availableDataBody);
    if (availableDataJSON) {
      res.json(availableDataJSON);
    } else {
      res.send(availableDataBody);
    }
  } 
});

app.listen(port, () => console.log(`app listening on port ${port}!`));