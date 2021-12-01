import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import Podlet from '@podium/podlet';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
const port = 3000

const podlet = new Podlet({
  name: 'html-footer',
  // version: '1.0.0',
  /**
   * brukes i layout til å detektere endring
   * if you change version when you update you don't have to restart layout
   * build hash i prod
   */
  version: Date.now().toString(),
  pathname: '/', // required
  development: true, // optional, defaults to false
});

app.use(podlet.middleware());

app.use('/dist', express.static("dist"))

podlet.js({ value: 'http://localhost:3000/dist/bundle.js', defer: true  });

// podlet.css({})

// bruk full

// podlet og layout har default html template
// localt full template, layout får bare snippet. 
// broser får hele template med podlet, layout får bare snippet

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`<nav id="root"></nav>`);
})

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})