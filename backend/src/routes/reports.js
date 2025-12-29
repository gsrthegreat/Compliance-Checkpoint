import express from 'express';
import Report from '../models/Report.js';

const reportRoutes = express.Router();

// Get all reports
reportRoutes.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single report
reportRoutes.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create report
reportRoutes.post('/', async (req, res) => {
  const report = new Report(req.body);
  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update report
reportRoutes.put('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete report
reportRoutes.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get statistics
reportRoutes.get('/stats/summary', async (req, res) => {
  try {
    const total = await Report.countDocuments();
    const compliant = await Report.countDocuments({ status: 'Compliant' });
    const nonCompliant = await Report.countDocuments({ status: 'Non-Compliant' });
    const inProgress = await Report.countDocuments({ status: 'In Progress' });
    const underReview = await Report.countDocuments({ status: 'Under Review' });
    
    res.json({
      total,
      compliant,
      nonCompliant,
      inProgress,
      underReview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default reportRoutes;