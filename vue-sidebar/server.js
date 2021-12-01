import express from 'express'
import Podlet from '@podium/podlet';

const app = express()
const port = 8083

const podlet = new Podlet({
  name: 'vue-sidebar', // required
  // version: '1.0.0', // required, brukes i layout til å detektere endring
  // build hash i prod
  version: Date.now().toString(),
  pathname: '/', // required
  development: true, // optional, defaults to false
});

app.use(podlet.middleware());

app.use('/dist', express.static("dist"))

podlet.js({ value: `http://localhost:${port}/dist/bundle.js`, defer: true  });
podlet.css({ value: `http://localhost:${port}/dist/styles.css`  });

// podlet.css({})

// podlet og layout har default html template
// localt full template, layout får bare snippet. 
// broser får hele template med podlet, layout får bare snippet

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`<aside id="sidebar"></aside>`);
})

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});


app.listen(port, () => {
  console.log(`Main react content being served at http://localhost:${port}`)
})