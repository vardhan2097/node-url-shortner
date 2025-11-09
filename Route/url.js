const express = require("express");
const router = express.Router();
const {
  handleAnalysis,
  handleGenerateNewShortUrl,
  handleShortIdClick,
} = require("../Controller/url");

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleShortIdClick);
router.get("/analysis/:shortId", handleAnalysis);

module.exports = router;
