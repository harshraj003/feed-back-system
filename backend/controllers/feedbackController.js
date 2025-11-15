const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res, next) => {
  try {
    const { name, email, message, rating, category } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'Name, email, and message are required' });

    const feedback = await Feedback.create({ name, email, message, rating: rating || 3, category: category || 'General Feedback' });
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    next(err);
  }
};

exports.getAllFeedback = async (req, res, next) => {
  try {
    const { status, category, search, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const items = await Feedback.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Feedback.countDocuments(query);
    
    res.json({ 
      count: items.length, 
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      feedback: items 
    });
  } catch (err) {
    next(err);
  }
};

exports.getStatistics = async (req, res, next) => {
  try {
    const total = await Feedback.countDocuments();
    const statusCounts = await Feedback.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const categoryCounts = await Feedback.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);

    res.json({
      total,
      statusCounts,
      categoryCounts,
      averageRating: avgRating[0]?.average || 0
    });
  } catch (err) {
    next(err);
  }
};

exports.updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending', 'Reviewed', 'Completed'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const fb = await Feedback.findByIdAndUpdate(id, { status }, { new: true });
    if (!fb) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Updated', feedback: fb });
  } catch (err) {
    next(err);
  }
};

exports.deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fb = await Feedback.findByIdAndDelete(id);
    if (!fb) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};