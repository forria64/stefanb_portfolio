#!/usr/bin/env python3
# /compress_webp.py

import os
import io
from PIL import Image

# Use decimal MB (2,000,000 bytes) instead of binary MB
TARGET_SIZE = 1_900_000  # 2.0 MB in decimal bytes

def compress_image_to_target(image, target_size, initial_quality=90, min_quality=5):
    """
    Compress the given PIL Image to be below or equal to target_size by using binary search
    on quality. Returns a tuple of (compressed_image_bytes, used_quality) if successful,
    or (None, None) if not.
    """
    low = min_quality
    high = initial_quality
    best_data = None
    best_quality = None

    while low <= high:
        mid = (low + high) // 2
        buffer = io.BytesIO()
        try:
            image.save(buffer, format='WEBP', quality=mid, optimize=True)
        except Exception as e:
            print(f"Error saving image at quality {mid}: {e}")
            return None, None

        size = buffer.tell()
        print(f"  - Trying quality {mid}, size = {size} bytes ({size / 1_000_000:.2f} MB decimal)")
        
        if size <= target_size:
            best_data = buffer.getvalue()
            best_quality = mid
            # Try a higher quality for better visual results
            low = mid + 1
        else:
            high = mid - 1

    if best_data is not None:
        return best_data, best_quality
    else:
        return None, None

def process_webp_file(file_path):
    """
    Process a single .webp file: always attempt to compress it (regardless of size).
    """
    try:
        original_size = os.path.getsize(file_path)
        print(f"Processing '{file_path}'")
        print(f"  Original size: {original_size} bytes ({original_size / 1_000_000:.2f} MB decimal)")

        with Image.open(file_path) as img:
            img.load()
            compressed_data, used_quality = compress_image_to_target(img, TARGET_SIZE)
            if compressed_data is None:
                print(f"  Could not compress '{file_path}' below {TARGET_SIZE} bytes at min quality.")
                return

        with open(file_path, 'wb') as f:
            f.write(compressed_data)

        new_size = os.path.getsize(file_path)
        print(f"  Compressed to {new_size} bytes ({new_size / 1_000_000:.2f} MB) at quality {used_quality}.\n")
    except Exception as e:
        print(f"Error processing '{file_path}': {e}")

def search_and_compress(root_dir):
    """
    Recursively search the 'paintings' directory under root_dir for .webp files
    and compress them.
    """
    paintings_dir = os.path.join(root_dir, "paintings")
    if not os.path.isdir(paintings_dir):
        print(f"No 'paintings' directory found in {root_dir}")
        return

    for subdir, _, files in os.walk(paintings_dir):
        for file in files:
            if file.lower().endswith('.webp'):
                file_path = os.path.join(subdir, file)
                process_webp_file(file_path)

if __name__ == "__main__":
    current_dir = os.getcwd()
    print(f"Starting compression in directory: {current_dir}")
    search_and_compress(current_dir)

