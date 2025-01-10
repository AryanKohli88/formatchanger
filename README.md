# FormatChanger  
A **simple yet powerful offline tool** for video editors to convert video file formats effortlessly.  


## 🔍 Check if FFmpeg is Installed  
1. Open your terminal/bash/command prompt.  
2. Run the following command to check if FFmpeg is installed:  
   ```bash
   ffmpeg -version
If FFmpeg is installed, this command will display the version information.

# 📥 Steps to Install FFmpeg
Prerequisites
1. Ensure Node.js is installed by running:
    ```bash
    node --version
    
2. Install ffmpeg from - https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-2025-01-08-git-251de1791e-full_build.7z and extract the archive file
3. Open the bin folder, copy its path and add it to the 'PATH' environment variable on you windows pc. 

# After ffmpeg is installed
Note: Make sure that name of each folder is correct, and another folder with the name of target folder should NOT exist before running the script.

1. Create a folder and paste all the material whose format you want to complete. One folder should have files of same extention only.
2. Paste converter.js at the same location where this folder is present.
3. Run ``node converter.js`` and enter the details asked.

# ✨ Example Workflow
Enter the source file extension (e.g., mkv): mkv

Enter the target file extension (e.g., mp4): mp4

Enter the source folder name: mkvfolder

Enter the target folder name: mp4folder



❤️ Contribute
Feel free to fork this repository, open issues, or submit pull requests to improve this tool.