import os
import glob
import subprocess
from PIL import Image

FFMPEG = os.path.abspath("node_modules/ffmpeg-static/ffmpeg")
if not os.path.exists(FFMPEG):
    raise FileNotFoundError(f"FFmpeg not found at {FFMPEG}")

webp_files = sorted(glob.glob("formation/**/*.webp", recursive=True))
print(f"Found {len(webp_files)} WebP files to convert.")

for webp_path in webp_files:
    avi_path = os.path.splitext(webp_path)[0] + ".avi"
    print(f"\nProcessing: {webp_path}")
    
    try:
        im = Image.open(webp_path)
        width, height = im.size
        n_frames = getattr(im, "n_frames", 1)
        is_animated = getattr(im, "is_animated", False)
        
        # Dimensions must be even for standard video codecs
        w = width - (width % 2)
        h = height - (height % 2)
        
        # Determine fps and frame count
        if is_animated and n_frames > 1:
            durations = []
            for i in range(min(10, n_frames)):
                im.seek(i)
                durations.append(im.info.get("duration", 100))
            avg_duration = sum(durations) / len(durations) if durations else 100
            fps = max(1, round(1000.0 / avg_duration)) if avg_duration > 0 else 10
            total_frames = n_frames
        else:
            fps = 10
            total_frames = 30 # 3 seconds video for static preview
        
        print(f"  Dimensions: {w}x{h}, Frames: {total_frames}, FPS: {fps} -> {avi_path}")
        
        cmd = [
            FFMPEG,
            "-y",
            "-f", "rawvideo",
            "-vcodec", "rawvideo",
            "-s", f"{w}x{h}",
            "-pix_fmt", "rgb24",
            "-r", str(fps),
            "-i", "-",
            "-c:v", "mpeg4",
            "-vtag", "XVID",
            "-q:v", "3",
            avi_path
        ]
        
        proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        
        if is_animated and n_frames > 1:
            for i in range(n_frames):
                im.seek(i)
                frame = im.convert("RGB")
                if frame.size != (w, h):
                    frame = frame.crop((0, 0, w, h))
                proc.stdin.write(frame.tobytes())
        else:
            frame = im.convert("RGB")
            if frame.size != (w, h):
                frame = frame.crop((0, 0, w, h))
            raw_bytes = frame.tobytes()
            for _ in range(total_frames):
                proc.stdin.write(raw_bytes)
                
        stderr_output = proc.communicate()[1]
        
        if proc.returncode == 0:
            size_mb = os.path.getsize(avi_path) / (1024 * 1024)
            print(f"  ✓ Successfully created {avi_path} ({size_mb:.2f} MB)")
        else:
            print(f"  ✗ FFmpeg error on {avi_path}:")
            print(stderr_output.decode()[-300:])
            
    except Exception as e:
        print(f"  ✗ Error converting {webp_path}: {e}")

print("\n--- All conversions completed! ---")
