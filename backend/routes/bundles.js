const express = require('express');
const router = express.Router();
const { getBundles, getBundleById, createBundle, updateBundle, deleteBundle } = require('../controllers/bundleController');
const { protect, admin, seller } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getBundles)
    .post(protect, seller, createBundle);

router.route('/:id')
    .get(getBundleById)
    .put(protect, seller, updateBundle)
    .delete(protect, admin, deleteBundle);

module.exports = router;
