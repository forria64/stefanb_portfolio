# /tools/hash_above_public.py
#!/usr/bin/env python3
import json
import os
import hashlib

def compute_sha256(file_path: str) -> str:
    """
    Computes and returns the hex-encoded SHA-256 hash of the specified file.
    """
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def main():
    """
    This script is designed to be run from one directory ABOVE the directory named 'public'.
    Inside that 'public' directory, there should be:
      - og_metadata.json
      - the assets referenced by og_metadata.json

    The script performs the following checks for each graphic entry in og_metadata.json:
      1) If 'asset_hash' is missing, it is added.
      2) If 'asset_hash' is present but does not match the actual file's hash,
         the value is replaced with the correct file hash.
      3) If the file corresponding to 'asset' is missing, no changes are made for that entry.

    Usage:
        1) Place this script one directory above the 'public' folder.
        2) Ensure 'og_metadata.json' is located in the './public' directory.
        3) Ensure all files referenced by 'graphics[].asset' exist under './public'.
        4) Run:  ./hash_above_public.py  (or 'python3 hash_above_public.py')
        5) og_metadata.json will be updated in-place.
    """

    # Construct the path to 'public'
    public_dir = os.path.join(os.getcwd(), "public")

    # Construct the path to og_metadata.json inside 'public'
    og_metadata_path = os.path.join(public_dir, "og_metadata.json")

    if not os.path.isfile(og_metadata_path):
        print(f"Error: No og_metadata.json found at {og_metadata_path}.")
        return

    # Load existing metadata
    with open(og_metadata_path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Error: Could not parse JSON from og_metadata.json. Details: {e}")
            return

    # Basic structure check
    if "graphics" not in data or not isinstance(data["graphics"], list):
        print("Error: No 'graphics' array found in og_metadata.json.")
        return

    updated_count = 0
    for idx, graphic in enumerate(data["graphics"]):
        asset_path = graphic.get("asset")
        if not asset_path:
            print(f"Warning: Entry {idx} has no 'asset' field; skipping.")
            continue

        # Resolve local file path relative to the 'public' directory
        # Remove any leading slash from asset, then prepend 'public'
        local_file_path = os.path.join(public_dir, asset_path.lstrip("/"))
        if not os.path.isfile(local_file_path):
            print(f"Warning: File '{local_file_path}' not found; skipping hash check.")
            continue

        # Compute true hash
        computed_hash = compute_sha256(local_file_path)
        
        # If no asset_hash, add it
        if "asset_hash" not in graphic:
            graphic["asset_hash"] = computed_hash
            updated_count += 1
        else:
            current_hash = graphic["asset_hash"]
            # If there's a mismatch, replace the stored hash with the correct one
            if current_hash != computed_hash:
                graphic["asset_hash"] = computed_hash
                updated_count += 1

    # If updates were made, write back to og_metadata.json
    if updated_count > 0:
        with open(og_metadata_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"Updated/added 'asset_hash' for {updated_count} graphic(s) in og_metadata.json.")
    else:
        print("No entries required updating. All asset_hash fields are correct or files are missing.")

if __name__ == "__main__":
    main()

