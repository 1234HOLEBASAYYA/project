import qrcode
from PIL import Image, ImageDraw, ImageFont
import os
import shutil

url = "https://1234holebasayya.github.io/project/"

# Create standard high-contrast crisp QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=16,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

# Generate standard high-res image
img_clean = qr.make_image(fill_color="#000000", back_color="#ffffff").convert('RGBA')

# Also generate modern dark-mode branded QR code
qr_dark = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=16,
    border=4,
)
qr_dark.add_data(url)
qr_dark.make(fit=True)
img_dark = qr_dark.make_image(fill_color="#06B6D4", back_color="#0B0F19").convert('RGBA')

# Save files in public/
os.makedirs("public", exist_ok=True)
img_clean.save("public/qr-code.png")
img_dark.save("public/qr-code-dark.png")

# Also save to artifact directory
artifact_dir = r"C:\Users\HP\.gemini\antigravity-ide\brain\b6185d6a-aae4-4651-89ee-88485ada59ad"
if os.path.exists(artifact_dir):
    img_clean.save(os.path.join(artifact_dir, "reroute_ai_qr.png"))
    img_dark.save(os.path.join(artifact_dir, "reroute_ai_qr_dark.png"))

print("QR codes generated successfully!")
