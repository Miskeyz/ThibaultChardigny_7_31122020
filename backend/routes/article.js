const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

const auth = require('../middleware/auth');

router.post('/', auth, articleCtrl.createArticle);
router.put('/:id', auth, articleCtrl.modifyArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.get('/', auth, articleCtrl.getAllArticles);

module.exports = router;