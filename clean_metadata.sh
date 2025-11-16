#!/bin/bash

# Metadata Cleaner for AI-generated Images and Videos
# This script removes EXIF data and other metadata from image and video files

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    local missing_deps=()

    if ! command -v exiftool &> /dev/null; then
        missing_deps+=("exiftool")
    fi

    if ! command -v ffmpeg &> /dev/null; then
        missing_deps+=("ffmpeg")
    fi

    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing_deps[*]}"
        print_info "Install with:"
        if command -v brew &> /dev/null; then
            echo "  brew install exiftool ffmpeg"
        elif command -v apt &> /dev/null; then
            echo "  sudo apt install libimage-exiftool-perl ffmpeg"
        elif command -v yum &> /dev/null; then
            echo "  sudo yum install perl-Image-ExifTool ffmpeg"
        else
            echo "  Please install exiftool and ffmpeg manually"
        fi
        exit 1
    fi
}

# Check if file exists
check_file() {
    if [ ! -f "$1" ]; then
        print_error "File not found: $1"
        return 1
    fi
    return 0
}

# Backup file
backup_file() {
    local file="$1"
    local backup="${file}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$file" "$backup"
    print_info "Backup created: $backup"
}

# Clean metadata from image files
clean_image_metadata() {
    local file="$1"
    local create_backup="$2"

    print_info "Processing image: $file"

    if [ "$create_backup" = true ]; then
        backup_file "$file"
    fi

    # Remove all metadata using exiftool
    exiftool -all= -overwrite_original "$file"

    print_info "Metadata removed from: $file"
}

# Clean metadata from video files
clean_video_metadata() {
    local file="$1"
    local create_backup="$2"

    print_info "Processing video: $file"

    if [ "$create_backup" = true ]; then
        backup_file "$file"
    fi

    # Create temporary file
    local temp_file="${file}.tmp"

    # Use ffmpeg to remove metadata
    ffmpeg -i "$file" -map_metadata -1 -c:v copy -c:a copy "$temp_file" -y -loglevel error

    # Replace original file
    mv "$temp_file" "$file"

    print_info "Metadata removed from: $file"
}

# Process multiple files
process_files() {
    local files=("$@")
    local create_backup="$1"
    shift

    for file in "$@"; do
        if check_file "$file"; then
            # Get file extension
            local extension="${file##*.}"
            extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

            case "$extension" in
                jpg|jpeg|png|gif|bmp|tiff|tiff|webp|heic|heif)
                    clean_image_metadata "$file" "$create_backup"
                    ;;
                mp4|avi|mov|mkv|wmv|flv|webm|m4v|3gp|ogv)
                    clean_video_metadata "$file" "$create_backup"
                    ;;
                *)
                    print_warning "Unsupported file type: $extension ($file)"
                    ;;
            esac
        fi
    done
}

# Process directory recursively
process_directory() {
    local directory="$1"
    local recursive="$2"
    local create_backup="$3"

    print_info "Processing directory: $directory"

    if [ "$recursive" = true ]; then
        find "$directory" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.tiff" -o -iname "*.webp" -o -iname "*.heic" -o -iname "*.heif" -o -iname "*.mp4" -o -iname "*.avi" -o -iname "*.mov" -o -iname "*.mkv" -o -iname "*.wmv" -o -iname "*.flv" -o -iname "*.webm" -o -iname "*.m4v" -o -iname "*.3gp" -o -iname "*.ogv" \) | while read -r file; do
                    extension="${file##*.}"
                    extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

                    case "$extension" in
                        jpg|jpeg|png|gif|bmp|tiff|webp|heic|heif)
                            clean_image_metadata "$file" "$create_backup"
                            ;;
                        mp4|avi|mov|mkv|wmv|flv|webm|m4v|3gp|ogv)
                            clean_video_metadata "$file" "$create_backup"
                            ;;
                    esac
                done
    else
        find "$directory" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.tiff" -o -iname "*.webp" -o -iname "*.heic" -o -iname "*.heif" -o -iname "*.mp4" -o -iname "*.avi" -o -iname "*.mov" -o -iname "*.mkv" -o -iname "*.wmv" -o -iname "*.flv" -o -iname "*.webm" -o -iname "*.m4v" -o -iname "*.3gp" -o -iname "*.ogv" \) | while read -r file; do
                    extension="${file##*.}"
                    extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

                    case "$extension" in
                        jpg|jpeg|png|gif|bmp|tiff|webp|heic|heif)
                            clean_image_metadata "$file" "$create_backup"
                            ;;
                        mp4|avi|mov|mkv|wmv|flv|webm|m4v|3gp|ogv)
                            clean_video_metadata "$file" "$create_backup"
                            ;;
                    esac
                done
    fi
}

# Show usage
show_usage() {
    echo "Metadata Cleaner for AI-generated Images and Videos"
    echo
    echo "Usage: $0 [OPTIONS] <file1> [file2] ... [fileN]"
    echo "       $0 [OPTIONS] -d <directory>"
    echo
    echo "Options:"
    echo "  -h, --help           Show this help message"
    echo "  -b, --backup         Create backup files before cleaning"
    echo "  -d, --directory      Process all files in directory"
    echo "  -r, --recursive      Process directory recursively (requires -d)"
    echo "  --dry-run            Show what would be cleaned without doing it"
    echo
    echo "Supported formats:"
    echo "  Images: jpg, jpeg, png, gif, bmp, tiff, webp, heic, heif"
    echo "  Videos: mp4, avi, mov, mkv, wmv, flv, webm, m4v, 3gp, ogv"
    echo
    echo "Examples:"
    echo "  $0 image1.jpg video.mp4"
    echo "  $0 -b image1.jpg image2.png"
    echo "  $0 -d /path/to/images"
    echo "  $0 -r -d /path/to/media -b"
}

# Main function
main() {
    local files=()
    local create_backup=false
    local process_dir=false
    local recursive=false
    local directory=""
    local dry_run=false

    # Check dependencies
    check_dependencies

    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_usage
                exit 0
                ;;
            -b|--backup)
                create_backup=true
                shift
                ;;
            -d|--directory)
                process_dir=true
                directory="$2"
                shift 2
                ;;
            -r|--recursive)
                recursive=true
                shift
                ;;
            --dry-run)
                dry_run=true
                shift
                ;;
            -*)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
            *)
                files+=("$1")
                shift
                ;;
        esac
    done

    # Validate arguments
    if [ "$process_dir" = true ]; then
        if [ -z "$directory" ]; then
            print_error "Directory specified but path is missing"
            show_usage
            exit 1
        fi
        if [ ! -d "$directory" ]; then
            print_error "Directory not found: $directory"
            exit 1
        fi
    elif [ ${#files[@]} -eq 0 ]; then
        print_error "No files specified"
        show_usage
        exit 1
    fi

    # Validate recursive flag
    if [ "$recursive" = true ] && [ "$process_dir" = false ]; then
        print_error "--recursive requires --directory"
        show_usage
        exit 1
    fi

    print_info "Metadata Cleaner for AI-generated Images and Videos"
    print_info "Backup enabled: $create_backup"

    if [ "$dry_run" = true ]; then
        print_warning "DRY RUN MODE - No files will be modified"
    fi

    # Process files
    if [ "$process_dir" = true ]; then
        if [ "$dry_run" = false ]; then
            process_directory "$directory" "$recursive" "$create_backup"
        else
            print_info "Would process directory: $directory"
            print_info "Recursive: $recursive"
            print_info "Create backups: $create_backup"
        fi
    else
        if [ "$dry_run" = false ]; then
            process_files "$create_backup" "${files[@]}"
        else
            print_info "Would process ${#files[@]} files:"
            for file in "${files[@]}"; do
                echo "  - $file"
            done
            echo "  Create backups: $create_backup"
        fi
    fi

    if [ "$dry_run" = false ]; then
        print_info "Metadata cleaning completed!"
    fi
}

# Run main function with all arguments
main "$@"