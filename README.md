# Metadata Cleaner for AI-generated Images and Videos

This shell script removes EXIF data and other metadata from AI-generated images and videos, helping protect privacy and remove traces of AI generation tools.

## Supported Formats

### Images
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- BMP (.bmp)
- TIFF (.tiff)
- WebP (.webp)
- HEIF (.heic, .heif)

### Videos
- MP4 (.mp4)
- AVI (.avi)
- MOV (.mov)
- MKV (.mkv)
- WMV (.wmv)
- FLV (.flv)
- WebM (.webm)
- M4V (.m4v)
- 3GP (.3gp)
- OGV (.ogv)

## Prerequisites

The script requires the following tools:

### macOS (using Homebrew)
```bash
brew install exiftool ffmpeg
```

### Ubuntu/Debian
```bash
sudo apt install libimage-exiftool-perl ffmpeg
```

### CentOS/RHEL/Fedora
```bash
sudo yum install perl-Image-ExifTool ffmpeg
# or on newer systems
sudo dnf install perl-Image-ExifTool ffmpeg
```

## Installation

1. Download the script:
```bash
curl -O https://raw.githubusercontent.com/your-repo/metadata-deleter/main/clean_metadata.sh
```

2. Make it executable:
```bash
chmod +x clean_metadata.sh
```

3. (Optional) Move to a directory in your PATH:
```bash
sudo mv clean_metadata.sh /usr/local/bin/clean-metadata
```

## Usage

### Basic Usage

Clean metadata from individual files:
```bash
./clean_metadata.sh image.jpg
./clean_metadata.sh video.mp4
```

Clean metadata from multiple files:
```bash
./clean_metadata.sh image1.jpg image2.png video.mp4
```

### Advanced Options

#### Create Backups
Automatically create backup files before cleaning:
```bash
./clean_metadata.sh -b image.jpg
./clean_metadata.sh --backup image1.jpg image2.mp4
```

#### Process Directories
Clean all media files in a directory:
```bash
./clean_metadata.sh -d /path/to/images
./clean_metadata.sh --directory /path/to/videos
```

#### Recursive Processing
Process directories and all subdirectories:
```bash
./clean_metadata.sh -r -d /path/to/media
./clean_metadata.sh --recursive --directory /path/to/media
```

#### Combine Options
Create backups while processing directories recursively:
```bash
./clean_metadata.sh -r -d /path/to/media -b
./clean_metadata.sh --recursive --directory /path/to/media --backup
```

#### Dry Run Mode
Preview what would be cleaned without making changes:
```bash
./clean_metadata.sh --dry-run image.jpg
./clean_metadata.sh --dry-run -d /path/to/images
```

## Command Line Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help message and exit |
| `-b, --backup` | Create backup files before cleaning |
| `-d, --directory` | Process all files in directory |
| `-r, --recursive` | Process directory recursively |
| `--dry-run` | Show what would be cleaned without doing it |

## Examples

### Example 1: Clean a single image with backup
```bash
./clean_metadata.sh -b ai-generated-portrait.jpg
```
**Output:**
```
[INFO] Metadata Cleaner for AI-generated Images and Videos
[INFO] Backup enabled: true
[INFO] Processing image: ai-generated-portrait.jpg
[INFO] Backup created: ai-generated-portrait.jpg.backup.20241116_143022
[INFO] Metadata removed from: ai-generated-portrait.jpg
[INFO] Metadata cleaning completed!
```

### Example 2: Process an entire directory
```bash
./clean_metadata.sh -d ./ai-artwork
```
**Output:**
```
[INFO] Metadata Cleaner for AI-generated Images and Videos
[INFO] Backup enabled: false
[INFO] Processing directory: ./ai-artwork
[INFO] Processing image: ./ai-artwork/portrait1.jpg
[INFO] Metadata removed from: ./ai-artwork/portrait1.jpg
[INFO] Processing video: ./ai-artwork/animation1.mp4
[INFO] Metadata removed from: ./ai-artwork/animation1.mp4
[INFO] Metadata cleaning completed!
```

### Example 3: Recursive processing with backups
```bash
./clean_metadata.sh -r -d ./media-library -b
```

### Example 4: Dry run to see what would be processed
```bash
./clean_metadata.sh --dry-run image.jpg video.mp4
```
**Output:**
```
[INFO] Metadata Cleaner for AI-generated Images and Videos
[INFO] Backup enabled: false
[WARNING] DRY RUN MODE - No files will be modified
[INFO] Would process 2 files:
  - image.jpg
  - video.mp4
  Create backups: false
```

## What Metadata Gets Removed?

### From Images:
- Camera manufacturer and model
- GPS location data
- Date and time information
- Camera settings (ISO, aperture, shutter speed)
- Software information
- Copyright information
- Comments and descriptions
- AI tool signatures and watermarks

### From Videos:
- Creation date and time
- Camera information
- GPS location data
- Software information
- Metadata tags
- Comments and descriptions

## Safety Features

### Backup Files
When using the `-b` or `--backup` option, the script creates timestamped backup files:
```
original.jpg → original.jpg.backup.20241116_143022
```

### Dependency Checking
The script automatically checks for required tools and provides installation instructions if they're missing.

### Error Handling
- Verifies file existence before processing
- Checks write permissions
- Validates directory paths
- Provides clear error messages

## Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   chmod +x clean_metadata.sh
   ```

2. **Command Not Found**
   - Install prerequisites (exiftool, ffmpeg)
   - Check if script is in your PATH

3. **File Not Found**
   - Verify file paths are correct
   - Use absolute paths if needed

4. **Permission Denied for Directory Processing**
   ```bash
   sudo ./clean_metadata.sh -d /protected/path
   ```

### Verification
To verify metadata has been removed:

#### For Images:
```bash
exiftool filename.jpg
# Should show minimal metadata
```

#### For Videos:
```bash
ffprobe filename.mp4
# Check metadata section
```

## Security Considerations

- This script permanently modifies files
- Always create backups when working with important files
- Test on sample files first
- The script only removes metadata, it doesn't modify the actual image/video content

## License

This script is provided as-is for educational and personal use. Use responsibly and only on files you own or have permission to modify.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this tool.

## Changelog

### v1.0.0
- Initial release
- Support for major image and video formats
- Backup functionality
- Directory processing
- Recursive processing
- Dry run mode