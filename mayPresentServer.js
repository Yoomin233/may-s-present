const express = require('express')
const app = express()
const port = 3031

app.use('/', express.static('build'))

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})