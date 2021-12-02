import express from 'express'
import Podlet from '@podium/podlet';

const app = express()
const port = 8081

const podlet = new Podlet({
  name: 'html-header',
  version: Date.now().toString(),
  pathname: '/',
  development: true,
});

app.use(podlet.middleware());

app.use(express.static("public"))

podlet.css({ value: `http://localhost:${port}/styles.css`  });

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`<header id="header">I'm a header</header>`);
})

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});


app.listen(port, () => {
  console.log(`header podlet is running at http://localhost:${port}`)
})