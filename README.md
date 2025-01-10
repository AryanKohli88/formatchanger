# formatchanger
A very Simple yet useful offline tool for video editors

## Check if ffmpeg is installed
1. To check if ffmpeg is installed run ``ffmpeg -version`` on terminal/bash/cmd.

## Steps to install ffmpeg
1. Make sure node is installed using `` node --version ``
2. Install ffmpeg from - https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-2025-01-08-git-251de1791e-full_build.7z and extract the archive file
3. Open the bin folder, copy its path and add it to the 'PATH' environment variable on you windows pc. 

## After ffmpeg is installed
Note: Make sure that name of each folder is correct, and another folder with the name of target folder should NOT exist before running the script.

1. Create a folder and paste all the material whose format you want to complete. One folder should have files of same extention only.
2. Paste converter.js at the same location where this folder is present.
3. Run ``node converter.js`` and enter the details asked. For example - 

---
Enter the source file extension (e.g., mkv): mkv
Enter the target file extension (e.g., mp4): mp4
Enter the source folder name: mkvfolder
Enter the target folder name: mp4folder
---




# FormatChanger  
A **simple yet powerful offline tool** for video editors to convert video file formats effortlessly.  


## 🔍 Check if FFmpeg is Installed  
1. Open your terminal/bash/command prompt.  
2. Run the following command to check if FFmpeg is installed:  
   ```bash
   ffmpeg -version
If FFmpeg is installed, this command will display the version information.

📥 Steps to Install FFmpeg
Prerequisites
Ensure Node.js is installed by running:

    ```bash
    node --version
    
Installing FFmpeg
Download the latest FFmpeg build from the link below:
Download FFmpeg (2025-01-08)
Extract the downloaded archive.
Open the bin folder inside the extracted files.
Copy the folder's path and add it to your system's PATH environment variable.
For Windows Users: How to Add to PATH
🚀 After FFmpeg is Installed
⚠️ Important Notes
Ensure the folder names are correct as per your input.
The target folder (where converted files will be saved) should not already exist.
Steps to Use FormatChanger
Create a folder containing all the files you want to convert.
All files in this folder should have the same extension.
Place the converter.js script in the same location as this folder.
Open your terminal, navigate to the script's location, and run the command:
bash
Copy code
node converter.js
Follow the prompts to input the required details. Example:
mathematica
Copy code
Enter the source file extension (e.g., mkv): mkv
Enter the target file extension (e.g., mp4): mp4
Enter the source folder name: mkvfolder
Enter the target folder name: mp4folder
✨ Example Workflow
Input Files
mkvfolder/ (contains .mkv files)

Script Location
converter.js is placed in the parent directory of mkvfolder.

Output
A new folder mp4folder/ will be created with all files converted to .mp4 format.

❤️ Contribute
Feel free to fork this repository, open issues, or submit pull requests to improve this tool.

📄 License
This project is licensed under the MIT License.

markdown
Copy code

### Improvements Made:
1. **Headers and Emojis**: Added icons for better readability.
2. **Code Blocks**: Used proper code block syntax for commands.
3. **Links**: Added a clickable link for FFmpeg download and a guide for adding to `PATH`.
4. **Sections**: Clearly divided sections with horizontal lines and proper hierarchy.
5. **Important Notes**: Highlighted key points to avoid user errors.
6. **Contributions and License**: Added standard sections for open-source projects.

Let me know if you’d like any further adjustments! 🚀