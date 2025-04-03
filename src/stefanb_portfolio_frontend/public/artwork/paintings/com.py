import os
import io
from PIL import Image

# Define the file size threshold: 1.9MB in bytes.
THRESHOLD = int(1.8 * 1024 * 1024)

def process_image(file_path):
    """Reduce image resolution iteratively until file size is <= THRESHOLD while preserving transparency."""
    try:
        img = Image.open(file_path)
    except Exception as e:
        print(f"Error opening {file_path}: {e}")
        return

    original_size = os.path.getsize(file_path)
    if original_size <= THRESHOLD:
        return

    print(f"Processing {file_path} (original size: {original_size} bytes)")
    orig_width, orig_height = img.size
    scale_factor = 1.0  # Start at original resolution.
    iteration = 0
    max_iterations = 20

    while iteration < max_iterations:
        # Calculate new dimensions.
        new_width = int(orig_width * scale_factor)
        new_height = int(orig_height * scale_factor)
        if new_width < 1 or new_height < 1:
            print(f"Image {file_path} has been reduced to an unusable size.")
            break

        # Resize image using the LANCZOS filter.
        resized_img = img.resize((new_width, new_height), Image.LANCZOS)

        # Save resized image to an in-memory buffer.
        buf = io.BytesIO()
        try:
            resized_img.save(buf, format="PNG", optimize=True)
        except Exception as e:
            print(f"Error saving {file_path} at iteration {iteration}: {e}")
            break

        new_size = buf.tell()
        print(f"Iteration {iteration}: scale_factor={scale_factor:.2f}, dimensions=({new_width}x{new_height}), size={new_size} bytes")

        # Check if resized image meets the file size requirement.
        if new_size <= THRESHOLD:
            with open(file_path, "wb") as f:
                f.write(buf.getvalue())
            print(f"Updated {file_path} to {new_size} bytes")
            return

        # Reduce the resolution further by decreasing the scale factor.
        scale_factor *= 0.9  # Decrease resolution by 10% each iteration.
        iteration += 1

    print(f"Max iterations reached for {file_path}; final size was {new_size} bytes")

def main():
    # Recursively walk through the current directory and its subdirectories.
    for root, _, files in os.walk("."):
        for file in files:
            if file.lower().endswith(".png"):
                full_path = os.path.join(root, file)
                process_image(full_path)

if __name__ == "__main__":
    main()

