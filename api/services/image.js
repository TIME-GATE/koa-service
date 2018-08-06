const qr = require('qr-image')

class ImageService {

  async productImage(ctx, next) {
    const img = qr.image(ctx.query.url || 'www.baidu.com', { 
      type: 'png' || ctx.query.type, 
      size: 5 || ctx.query.size, 
      margin: 1 || ctx.query.margin 
    })

    ctx.type = 'image/png'
    return { data: img, message: '创建成功' }
  }

}

module.exports = new ImageService()