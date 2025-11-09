const shortid = require("shortid");
const Url = require("../Models/url");

async function handleGenerateNewShortUrl(req, res) {
  const shortId = shortid();
  const body = req.body;

  if (!body) return res.status(400).json({ error: "URL is Required" });

  await Url.create({
    shortId: shortId,
    redirectedUrl: body.url,
    visitedHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleShortIdClick(req, res) {
  const shortId = req.param.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  if (!entry) {
    return res.status(400).json({ error: "ShortId URL not found" });
  }

  res.redirect(entry.redirectedUrl);
}

async function handleAnalysis(req, res) {
  const shortId = req.param.shortId;
  const result = await Url.findOne({ shortId });

  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: visit.visitedHistory,
  });
}

module.exports = {
  handleAnalysis,
  handleGenerateNewShortUrl,
  handleShortIdClick,
};
