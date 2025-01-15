import puppeteer from "puppeteer";
import { waitForVideoPlayer, startVideoPlayback, getVideoDuration } from "./videoPlayer.js";

import { config } from "dotenv";
config();

const noOfVideo = process.env.NO_OF_VIDEO;
const url = process.env.VIDEO_URL;

const cookies = [
];

export const watchVideo = async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setCookie(...cookies);

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 1200000, // Timeout for page load
    });

    await waitForVideoPlayer(page);
    await startVideoPlayback(page);

    const duration = await getVideoDuration(page);

    if (duration) {
      const randomPercentage = 30 + Math.floor(Math.random() * 70);
      console.log(`Video will be played for ${randomPercentage}% of its duration.`);
      const timeToSee = duration * (randomPercentage / 100);
      console.log(`Video will be played for ${timeToSee} seconds.`);

      setTimeout(async () => {
        console.log("Browser closed after watching the video.", timeToSee);
        await browser.close();
        watchVideo(); // Recurse to watch the next video
      }, timeToSee * 1000);
    }
  } catch (error) {
    console.error("Error occurred with proxy. Retrying with a new proxy:", error);
    await browser.close();
    setTimeout(() => watchVideo(), 5000); // Retry after 5 seconds
  }
};

for (let i = 0; i < noOfVideo; i++) {
  watchVideo(); // Start the video watching loop
}
