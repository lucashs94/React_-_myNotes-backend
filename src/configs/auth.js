module.exports = {
  jwt:{
    secret: process.env.AUTH_SECRET || 'qiudsxiquhxiqus',
    expiresIn: '1d',
  }
}