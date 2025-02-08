const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

/**
 * Splits an audio file into clips of specified duration
 * @param {string} inputFilePath - Path to the input audio file
 * @param {string} outputDir - Directory to save the clips
 * @param {number} [clipDuration=10] - Duration of each clip in seconds
 * @returns {Promise} - Resolves when all clips are created
 */
function trimAudio(inputFilePath, outputDir, clipDuration = 10) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
      if (err) {
        reject(new Error('Error getting file metadata: ' + err.message));
        return;
      }

      const duration = metadata.format.duration;
      let startTime = 0;
      let clipCount = 0;
      const clipPromises = [];

      while (startTime < duration) {
        const outputFilePath = path.join(
          outputDir,
          `${path.basename(inputFilePath, path.extname(inputFilePath))}_clip_${
            clipCount + 1
          }${path.extname(inputFilePath)}`
        );

        const clipPromise = new Promise((resolveClip, rejectClip) => {
          ffmpeg(inputFilePath)
            .setStartTime(startTime)
            .setDuration(clipDuration)
            .output(outputFilePath)
            .on('end', () => {
              console.log(`Created clip: ${outputFilePath}`);
              resolveClip(outputFilePath);
            })
            .on('error', (err) => {
              rejectClip(new Error('Error processing audio: ' + err.message));
            })
            .run();
        });

        clipPromises.push(clipPromise);
        startTime += clipDuration;
        clipCount++;
      }

      Promise.all(clipPromises)
        .then((clipPaths) => resolve(clipPaths))
        .catch((error) => reject(error));
    });
  });
}

/**
 * Process all audio files in a folder
 * @param {string} inputFolder - Folder containing the original audio files
 * @param {string} outputFolder - Folder to save the clips
 * @param {number} [clipDuration=10] - Duration of each clip in seconds
 * @returns {Promise} - Resolves when all files are processed
 */
async function processFolder(inputFolder, outputFolder, clipDuration) {
  // Ensure the output folder exists
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    fs.readdir(inputFolder, async (err, files) => {
      if (err) {
        reject(new Error('Error reading input folder: ' + err.message));
        return;
      }

      const results = {};
      const supportedFormats = ['.mp3', '.wav', '.flac', '.ogg'];

      try {
        for (const file of files) {
          const inputFilePath = path.join(inputFolder, file);
          const ext = path.extname(file).toLowerCase();

          if (supportedFormats.includes(ext)) {
            const clipPaths = await trimAudio(inputFilePath, outputFolder, clipDuration);
            results[inputFilePath] = clipPaths;
          }
        }
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = {
  trimAudio,
  processFolder
};