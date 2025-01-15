export const waitForVideoPlayer = async (page) => {
  console.log("Waiting for video player...");
  await page.waitForSelector("video", { visible: true });
  console.log("Video player found.");
};

export const startVideoPlayback = async (page) => {
  console.log("Starting video playback...");
  await page.evaluate(() => {
    const video = document.querySelector("video");
    if (video) {
      video.play();
    }
  });
};

export const getVideoDuration = async (page) => {
  const videoDuration = await page.evaluate(() => {
    const video = document.querySelector("video");
    return video ? video.duration : null;
  });

  if (videoDuration) {
    console.log(`Video duration is: ${videoDuration} seconds.`);
  } else {
    console.log("Unable to retrieve video duration.");
  }

  return videoDuration;
};
