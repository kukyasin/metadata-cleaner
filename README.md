# AI Metadata Cleaner

A lightweight command-line tool to remove EXIF data and metadata from AI-generated images and videos. Protect your privacy by cleaning hidden metadata that can reveal creation tools, timestamps, and location data.

**NPM Package:** [ai-metadata-cleaner](https://www.npmjs.com/package/ai-metadata-cleaner)

## Features

- **Zero Dependencies** - Built with native Node.js
- **19+ Formats** - Support for all major image and video formats
- **Batch Processing** - Clean entire directories at once
- **Recursive Mode** - Process nested folders
- **Automatic Backups** - Optional timestamped backups
- **Colored Output** - Clear progress indicators
- **Cross-Platform** - Works on macOS, Linux, and Windows

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

## Installation

### Global Installation (Recommended)

```bash
npm install -g ai-metadata-cleaner
```

### Local Installation

```bash
npm install ai-metadata-cleaner
```

## Prerequisites

This tool requires the following system dependencies:

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

### Windows
```bash
# Using Chocolatey
choco install exiftool ffmpeg

# Or download manually from:
# https://exiftool.org/ and https://ffmpeg.org/download.html
```

## Usage

### Command Line Interface

```bash
# Show help
ai-metadata-cleaner --help

# Clean single file with backup
ai-metadata-cleaner -b image.jpg

# Clean multiple files
ai-metadata-cleaner -b image1.jpg image2.png video.mp4

# Clean entire directory
ai-metadata-cleaner -d /path/to/images

# Recursive processing with backup
ai-metadata-cleaner -r -d /path/to/media -b

# Preview without making changes
ai-metadata-cleaner --dry-run image.jpg
ai-metadata-cleaner --dry-run -d /path/to/images

# Alternative command name
clean-ai-metadata -b image.jpg
```

### Command Line Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help message and exit |
| `-b, --backup` | Create backup files before cleaning |
| `-d, --directory` | Process all files in directory |
| `-r, --recursive` | Process directory recursively |
| `--dry-run` | Show what would be cleaned without doing it |

### Programmatic Usage

```javascript
// CommonJS
const { cleanFile, cleanDirectory, checkDependencies } = require('ai-metadata-cleaner');

// ES Modules
import { cleanFile, cleanDirectory, checkDependencies } from 'ai-metadata-cleaner';

// Clean a single file
await cleanFile('image.jpg', { backup: true });

// Clean multiple files
await cleanFile(['image1.jpg', 'image2.png'], { backup: false });

// Clean a directory
await cleanDirectory('/path/to/images', {
  recursive: true,
  backup: true
});

// Check dependencies
const deps = checkDependencies();
if (!deps.hasDependencies) {
  console.log('Missing:', deps.missing);
}
```

### Advanced Examples

```bash
# Batch processing with backup
ai-metadata-cleaner -r -d ./ai-artwork -b

# Dry run to see what will be processed
ai-metadata-cleaner --dry-run -r -d ./media-folder

# Clean specific files
ai-metadata-cleaner -b ./portrait.jpg ./avatar.png ./demo.mp4
```

## What Metadata Gets Removed?

### From Images:
- Camera manufacturer and model information
- GPS location data and coordinates
- Date and time information (creation, modification)
- Camera settings (ISO, aperture, shutter speed)
- Software information and processing history
- Copyright information and comments
- AI tool signatures and watermarks
- EXIF, IPTC, and XMP metadata

### From Videos:
- Creation date and time stamps
- Camera and device information
- GPS location metadata
- Software and encoding information
- Metadata tags and comments
- Stream information and headers

## Safety Features

### Automatic Backups
When using the `-b` or `--backup` option, the script creates timestamped backup files:
```
original.jpg → original.jpg.backup.20241116_143022
```

### Dependency Checking
The package automatically checks for required system tools and provides installation instructions.

### Error Handling
- Verifies file existence before processing
- Checks write permissions
- Validates directory paths
- Provides clear error messages and warnings
- Safe operation with rollback via backups

## Quick Start Examples

```bash
# Install globally
npm install -g ai-metadata-cleaner

# Clean a single file with backup
ai-metadata-cleaner -b ai-generated-portrait.jpg

# Process entire directory
ai-metadata-cleaner -d ./ai-artwork

# Recursive processing with backups
ai-metadata-cleaner -r -d ./media-library -b

# Preview what would be cleaned
ai-metadata-cleaner --dry-run image.jpg video.mp4
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

1. **Command Not Found**
   - Install prerequisites: `brew install exiftool ffmpeg`
   - Verify npm installation: `npm list -g ai-metadata-cleaner`

2. **Dependencies Missing**
   ```bash
   # macOS
   brew install exiftool ffmpeg

   # Ubuntu/Debian
   sudo apt install libimage-exiftool-perl ffmpeg

   # Windows
   choco install exiftool ffmpeg
   ```

3. **Permission Denied**
   - Check file permissions: `ls -la filename.jpg`
   - Ensure write permissions on target files

4. **File Not Found**
   - Verify file paths are correct
   - Use absolute paths if needed

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

- This tool permanently modifies files
- Always create backups when working with important files
- Test on sample files first
- The tool only removes metadata, it doesn't modify actual image/video content

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this tool.

**NPM Package:** [ai-metadata-cleaner](https://www.npmjs.com/package/ai-metadata-cleaner)

**GitHub:** [kukyasin/metadata-cleaner](https://github.com/kukyasin/metadata-cleaner)