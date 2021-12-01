const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(__dirname + '/public'))
app.use('/box', express.static(__dirname + '/box'));
app.use('/box_withcontrol', express.static(__dirname + '/box_withcontrol'));
app.use('/bloch_sphere', express.static(__dirname + '/bloch_sphere'));

app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.listen(3000, () =>
  console.log('Visit http://127.0.0.1:3000')
);