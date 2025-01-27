const Report = require('../models/reportModel'); // Ensure the correct path to the reportModel

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.getAllReports(); // Use the correct method from the model
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addReport = async (req, res) => {
    try {
        const newReportId = await Report.saveReport(req.body); // Use the correct method from the model
        res.status(201).json({ id: newReportId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.getReport(req.params.id); // Use the correct method from the model
        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReport = async (req, res) => {
    try {
        await Report.updateReport(req.params.id, req.body); // Use the correct method from the model
        const updatedReport = await Report.getReport(req.params.id); // Fetch the updated report
        res.json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        await Report.deleteReport(req.params.id); // Use the correct method from the model
        res.json({ message: 'Report deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
