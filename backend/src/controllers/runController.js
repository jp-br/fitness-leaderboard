// backend/src/controllers/runController.js
const runService = require('../services/runService');

const getAllRuns = async (req, res) => {
  try {
    console.log("📥 Frontend is requesting all runs...");
    const runsList = await runService.fetchAllRuns();
    console.log(`✅ Successfully found ${runsList.length} runs. Sending to React...`);
    res.status(200).json(runsList);
  } catch (error) {
    console.error('❌ Error fetching runs:', error);
    res.status(500).json({ error: 'Failed to fetch runs from the database' });
  }
};

const submitRun = async (req, res) => {
  try {
    console.log("\n=== 🏃‍♂️ NEW RUN SUBMISSION ===");
    await runService.createRun(req.body);
    console.log("🎉 RUN SAVED SUCCESSFULLY!\n");
    res.status(201).json({ success: true, message: 'Run saved successfully' });
  } catch (error) {
    if (error.message === 'DUPLICATE_RUN') {
      console.log("🚫 BLOCKING DUPLICATE!");
      return res.status(400).json({ error: 'You have already logged this specific run!' });
    }
    console.error('❌ Error saving run:', error);
    res.status(500).json({ error: 'Failed to save run to the database' });
  }
};

// ==========================================
// ✨ NEW: THE SOCIAL CONTROLLERS
// ==========================================

const toggleKudos = async (req, res) => {
  try {
    const { id } = req.params; // The ID of the run
    const { runnerName } = req.body; // The person clicking 'Like'

    if (!runnerName) return res.status(400).json({ error: "runnerName is required" });

    const updatedKudos = await runService.toggleKudos(id, runnerName);
    res.status(200).json({ kudos: updatedKudos });
  } catch (error) {
    console.error('❌ Error toggling kudos:', error);
    res.status(500).json({ error: 'Failed to update kudos' });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { runnerName, text } = req.body;

    if (!runnerName || !text) return res.status(400).json({ error: "runnerName and text are required" });

    const updatedComments = await runService.addComment(id, runnerName, text);
    res.status(200).json({ comments: updatedComments });
  } catch (error) {
    console.error('❌ Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// ✨ Export all four functions!
module.exports = { 
  getAllRuns,
  submitRun,
  toggleKudos,
  addComment
};