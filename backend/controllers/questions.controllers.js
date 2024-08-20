const Questions = require("../models/questions.models");
const Results = require("../models/results.models");
const { questions, answers } = require("../data.js");

async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function insertQuestions(req, res) {
  try {
    // Clear existing questions before inserting
    await Questions.deleteMany();

    const formattedData = {
      questions: questions.map((question, index) => ({
        id: question.id,
        question: question.question,
        options: question.options,
      })),
      answers: answers,
      createdAt: new Date(),
    };

    await Questions.create(formattedData);
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function storeResult(req, res) {
  try {
    const { username, result, attempts, achieved } = req.body;
    if (!username || !result) throw new Error("Data Not Provided...!");

    await Results.create({ username, result, attempts, achieved });
    res.json({ msg: "Result Saved Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Results Deleted Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getResult,
  storeResult,
  dropResult,
};
