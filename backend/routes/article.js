const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', articleCtrl.createArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.get('/', articleCtrl.getAllArticles);
router.post('/:id/like', articleCtrl.postLike);

module.exports = router;