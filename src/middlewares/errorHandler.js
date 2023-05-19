export default function (err, req, res, next) {
  if (err) console.log(err)
  res.status(500).send('Error en el servidor')
}
