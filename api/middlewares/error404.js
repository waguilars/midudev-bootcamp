module.exports.error404 = (req, res, next) => {
  return res.status(404).json({
    error: 'Can not found'
  })
}
