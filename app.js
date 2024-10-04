import puppeteer from "puppeteer";
import { config } from "dotenv";

config();

const noOfvideo = process.env.NO_OF_VIDEO;
const url = process.env.VIDEO_URL;

const watchVideo = async () => {
  const browser = await puppeteer.launch({
    headless: true, // Set to true for headless mode
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Add these args for sandboxing
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  // Wait for the YouTube player to load
  await page.waitForSelector(".html5-video-player");

  await page.click(".html5-video-player");

  // Inject JavaScript to loop the video
  try {
  } catch (e) {
    console.log(e);
  }
};

for (let i = 0; i < noOfvideo; i++) {
  watchVideo();
}
