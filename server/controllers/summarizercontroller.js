import axios from 'axios'

export const summarizeFromURL = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success:false, message:"URL is required" });
    }

    const response = await axios.get(
      "https://ai-article-extractor-and-summarizer.p.rapidapi.com/page",
      {
        params: {
          url,
          extract: "true"
        },
        headers: {
          "x-rapidapi-key": process.env.X_RAPID_API_KEY,
          "x-rapidapi-host": "ai-article-extractor-and-summarizer.p.rapidapi.com"
        },
        timeout: 15000
      }
    );

    return res.status(200).json({
      success: true,
      message: "Article extracted successfully",
      data: response.data.content
    });

  } catch (error) {
    console.error("Summarize Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to extract article",
      error: error.response?.data?.message || error.message
    });
  }
};
