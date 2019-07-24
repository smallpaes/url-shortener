const crypto = require('crypto')
// Include user model
const Url = require('../models/url')

module.exports = {
  getShortened: async (req, res) => {
    const inputUrl = req.query.url
    try {
      // validate input
      const httpRegex = /^http:\/\//
      const httpsRegex = /^https:\/\//

      // Add server side validation
      if (!inputUrl || (!inputUrl.match(httpRegex) && !inputUrl.match(httpsRegex))) {
        return res.render('index', {
          inputUrl,
          error: "Please enter a valid url: http://... or https://..."
        })
      }

      // check if url exists in database
      const urlResult = await Url.findOne({ originalUrl: inputUrl })
      // if url already exist
      if (urlResult) { return res.status(200).json({ url: urlResult.shortenedUrl }) }

      // generate an unique shortened url
      let shortenedUrl = ''

      while (true) {
        // generate shortened url
        shortenedUrl = crypto.randomBytes(Math.ceil((5 * 3) / 4)).toString('base64').replace(/\+/g, '0').replace(/\//g, '0').slice(0, 5)
        // check if this url is unique
        const url = await Url.findOne({ shortenedUrl: shortenedUrl })
        if (!url) break
      }

      // create new url document
      await Url.create({
        originalUrl: inputUrl,
        shortenedUrl
      })
      // redirect back to landing page
      res.status(200).json({ url: shortenedUrl })
    } catch (error) {
      console.log(error)
    }
  },
  getOriginal: (req, res) => {
    Url.findOne({ shortenedUrl: req.params.shortenedUrl })
      .then(data => {
        // no such url
        if (!data) { return res.redirect('/') }
        // url found, redirect to original url page
        res.redirect(data.originalUrl)
      })
  }
}