const Bundle = require('../models/Bundle');

exports.getBundles = async (req, res) => {
    const bundles = await Bundle.find({ status: 'active' });
    res.json(bundles);
};

exports.getBundleById = async (req, res) => {
    const bundle = await Bundle.findById(req.params.id);
    if (bundle) {
        res.json(bundle);
    } else {
        res.status(404).json({ message: 'Bundle not found' });
    }
};

exports.createBundle = async (req, res) => {
    const { network, name, size, price } = req.body;
    const bundle = new Bundle({ network, name, size, price });
    const createdBundle = await bundle.save();
    res.status(201).json(createdBundle);
};

exports.updateBundle = async (req, res) => {
    const { network, name, size, price, status } = req.body;
    const bundle = await Bundle.findById(req.params.id);

    if (bundle) {
        bundle.network = network || bundle.network;
        bundle.name = name || bundle.name;
        bundle.size = size || bundle.size;
        bundle.price = price || bundle.price;
        bundle.status = status || bundle.status;

        const updatedBundle = await bundle.save();
        res.json(updatedBundle);
    } else {
        res.status(404).json({ message: 'Bundle not found' });
    }
};

exports.deleteBundle = async (req, res) => {
    const bundle = await Bundle.findById(req.params.id);
    if (bundle) {
        await bundle.deleteOne();
        res.json({ message: 'Bundle removed' });
    } else {
        res.status(404).json({ message: 'Bundle not found' });
    }
};
