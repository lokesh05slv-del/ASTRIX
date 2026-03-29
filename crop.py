import os
import sys
try:
    from PIL import Image
except ImportError:
    os.system("pip install Pillow")
    from PIL import Image

img_path = r"C:\Users\d\.gemini\antigravity\brain\09aecd10-0e65-42aa-87de-9d4e20c539d3\media__1774780080972.png"
out_path = r"d:\ASTRIX\public\logo.png"

os.makedirs(os.path.dirname(out_path), exist_ok=True)

try:
    img = Image.open(img_path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(out_path)
        print(f"Cropped logo to {bbox} and saved.")
    else:
        img.save(out_path)
        print("No alpha bounding box found. Saved original.")
except Exception as e:
    print(f"Error processing image: {e}")
