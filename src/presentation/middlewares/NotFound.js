export function notFound(req, res) {
  res.status(404).send({ status: 'error', message: 'Resource not found' })
}
