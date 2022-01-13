//npm modules
const router = require(`express`).Router()
//controllers
const controller = require('../controller/MainController')
//routes
router.get('/', controller.renderRootPage)
router.get('/history', controller.getHistory)
router.get(`/info`,controller.fetchInformation)
module.exports = router