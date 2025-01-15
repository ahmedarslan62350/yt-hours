import puppeteer from "puppeteer";
import { config } from "dotenv";

config();

const noOfvideo = process.env.NO_OF_VIDEO;
const url = process.env.VIDEO_URL;

let cookies = [
  {
    domain: ".youtube.com",
    expirationDate: 1769000904.248744,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000qgiNCvcrzkFdC78GnNdz610r5bfLfDOzf1Db9b2_5jTZo0oPv4ufOw8ug2CKsW0R_eZMWQACgYKAdkSARcSFQHGX2MifJxg6oCdXEExKyVj6D5k2hoVAUF8yKoh57tNm4htzKsOQrI_nREB0076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1765977515.896292,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: "None",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB7wV3sSNEZ2mCTytZg3Rn6zu9pEP_CzISZRD_NDXy-TRC6DWsnVqKw12EwlwfopygpxAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1769000904.248247,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: "None",
    secure: true,
    session: false,
    storeId: null,
    value: "WWIPRLXBK0oj2px8/AI-eycfLCWdzNuk4T",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1765977675.81844,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: "None",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzUJzEJcNAmckT2eonxPyW3yG2BAuhh0JrO82o2IyrGw064xeJ1ii-2P__YZSVCyvuYF",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1769000904.248047,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: "None",
    secure: true,
    session: false,
    storeId: null,
    value: "AjJRAeDIKFz_fpQox",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1769000904.248351,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: "None",
    secure: true,
    session: false,
    storeId: null,
    value: "WWIPRLXBK0oj2px8/AI-eycfLCWdzNuk4T",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1769000904.248647,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: "None",
    secure: true,
    session: false,
    storeId: null,
    value:
      "g.a000qgiNCvcrzkFdC78GnNdz610r5bfLfDOzf1Db9b2_5jTZo0oPfJRjl_FRJ1h9WGM1Ya6xkAACgYKAZQSARcSFQHGX2Mi9UpU_p_eio9mP4YZvQi6TRoVAUF8yKrX1MKVhksrtSXYstOS-3740076",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1769000904.248447,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value: "WWIPRLXBK0oj2px8/AI-eycfLCWdzNuk4T",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1765977675.818525,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AKEyXzU7__KULkG_l6HgGZzwWu7qNtk7m27GIdzs14c6G_1ce7IFoBQhYM7Jxofv8RIn9v6T",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1765977515.896493,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "sidts-CjIB7wV3sSNEZ2mCTytZg3Rn6zu9pEP_CzISZRD_NDXy-TRC6DWsnVqKw12EwlwfopygpxAA",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1769000905.542883,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: null,
    value:
      "AFmmF2swRQIhAK1WL9BEfiZ_MCBqiTxLjqVY2Tmbf_JviiS5LWtfLGf-AiATCuec6X4l6iLBSL2V2n3GqXibvPwcYVce3udKwlKBbA:QUQ3MjNmeUVlVDV0UW5FZUI4dGNqSEtldDBBVFEybmpRV3NuUlN1cy1zcjhhT19icm1qTDV5TEJESm1sVEZFNW9Bd2RTc1ktNnl5bmE3T3R1bjdoT19GcVRrVi1EVGhMV1ltRVR5d09uc3FUQWtpUEhLd01NMVFsNnYzRWdMVzZsODdTTmJXTHVrS2dfejh2THVwWk9Ic093M1hadVFmS3pn",
  },
  {
    domain: ".youtube.com",
    expirationDate: 1769001046.18132,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: "None",
    secure: true,
    session: false,
    storeId: null,
    value: "tz=Asia.Karachi",
  },
];

// Filter proxies that are working well (e.g., high uptime and low latency)
// let validProxies = proxyList.filter(
//   (proxy) => proxy.upTime > 80 && proxy.latency < 200
// );

// Randomly select a proxy from the valid list

const watchVideo = async () => {
  // const randomProxy =
  //   validProxies[Math.floor(Math.random() * validProxies.length)];
//   const proxyUrl = `https://34.93.185.230:8660`;

  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    //   `--proxy-server=${proxyUrl}`, // Set the proxy server
    ],
  });

  const page = await browser.newPage();

  await page.setCookie(...cookies);
  console.log("All cookies have been set.");

  try {
    // Randomly select a valid proxy from the proxy list
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Launch the browser with proxy settings

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 1200000, // Timeout for page load
    });

    await page.waitForSelector(".html5-video-player");

    await page.click(".html5-video-player");
    await page.click(".html5-video-player", { button: "right" });

    const duration = await page.evaluate(() => {
      const video = document.querySelector("video");
      return video ? video.duration : 0; // Return duration if video exists
    });

    const randomPercentage = 30 + Math.floor(Math.random() * 70);
    console.log(
      `Video will be played for ${randomPercentage}% of its duration.`
    );
    const timeToSee = duration * (randomPercentage / 100);

    console.log(`Video will be played for ${timeToSee} seconds.`);

    setTimeout(async () => {
      console.log("Browser closed after watching the video.", timeToSee);
      await browser.close();
      watchVideo(); // Recurse to watch the next video
    }, timeToSee * 1000);
  } catch (error) {
    console.error(
      "Error occurred with proxy. Retrying with a new proxy:",
      error
    );
    // Retry with a new proxy after a delay
    setTimeout(async () => {
      // validProxies = validProxies.filter(
      //   (proxy) => proxy._id !== randomProxy._id
      // );
      await browser.close(); // Close the browser to release resources
      watchVideo(); // Retry by calling the function again
    }, 5000); // Retry after 5 seconds
  }
};

// Start the video watching loop
for (let i = 0; i < noOfvideo; i++) {
  watchVideo();
}
