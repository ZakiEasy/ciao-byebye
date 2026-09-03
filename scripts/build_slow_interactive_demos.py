import os
import glob
import subprocess
from PIL import Image, ImageDraw, ImageFont

FFMPEG = os.path.abspath("node_modules/ffmpeg-static/ffmpeg")
if not os.path.exists(FFMPEG):
    raise FileNotFoundError(f"FFmpeg not found at {FFMPEG}")

FPS = 4  # 4 frames per second for a relaxed, slow, highly legible pace

def get_font(size):
    for p in ["/System/Library/Fonts/Helvetica.ttc", "/System/Library/Fonts/Supplemental/Arial.ttf"]:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

font_title = get_font(28)
font_sub = get_font(18)
font_badge = get_font(16)

def create_banner_overlay(base_img, step_title, step_desc, step_num=1, total_steps=4, highlight_box=None, highlight_label=""):
    w, h = base_img.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    if highlight_box:
        hx1, hy1, hx2, hy2 = highlight_box
        draw.rectangle([hx1, hy1, hx2, hy2], outline=(239, 68, 68, 255), width=4)
        if highlight_label:
            lbl_w = len(highlight_label) * 11 + 24
            draw.rounded_rectangle([hx1, max(10, hy1 - 34), hx1 + lbl_w, hy1 - 4], radius=6, fill=(239, 68, 68, 240))
            draw.text((hx1 + 10, max(14, hy1 - 30)), highlight_label, fill=(255, 255, 255), font=font_badge)

    bw = 1100
    bh = 80
    bx = (w - bw) // 2
    by = 25
    
    draw.rounded_rectangle([bx + 4, by + 4, bx + bw + 4, by + bh + 4], radius=16, fill=(0, 0, 0, 100))
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=16, fill=(15, 23, 42, 235), outline=(59, 130, 246, 255), width=2)
    
    badge_text = f"ÉTAPE {step_num} / {total_steps}"
    draw.rounded_rectangle([bx + 18, by + 18, bx + 155, by + bh - 18], radius=8, fill=(37, 99, 235, 255))
    draw.text((bx + 30, by + 28), badge_text, fill=(255, 255, 255), font=font_badge)
    
    draw.text((bx + 175, by + 14), step_title, fill=(255, 255, 255), font=font_title)
    draw.text((bx + 175, by + 48), step_desc, fill=(148, 163, 184), font=font_sub)
    
    combined = Image.alpha_composite(base_img.convert("RGBA"), overlay)
    return combined.convert("RGB")

def stream_frames_to_video(frame_generator, count, out_mp4, out_avi, w=1920, h=1000, fps=4):
    w = w - (w % 2)
    h = h - (h % 2)
    print(f"Streaming {count} frames -> MP4 & AVI at {fps} fps ({w}x{h})...")
    
    # 1. MP4 with H.264
    cmd_mp4 = [
        FFMPEG, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{w}x{h}", "-pix_fmt", "rgb24",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        out_mp4
    ]
    
    # 2. AVI with XviD
    cmd_avi = [
        FFMPEG, "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{w}x{h}", "-pix_fmt", "rgb24",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "mpeg4", "-vtag", "XVID",
        "-q:v", "3",
        out_avi
    ]
    
    # Run MP4
    p_mp4 = subprocess.Popen(cmd_mp4, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    for frame in frame_generator():
        if frame.size != (w, h):
            frame = frame.crop((0, 0, w, h))
        p_mp4.stdin.write(frame.tobytes())
    p_mp4.communicate()
    print(f"  ✓ MP4 done: {out_mp4} ({os.path.getsize(out_mp4)/(1024*1024):.2f} MB)")
    
    # Run AVI
    p_avi = subprocess.Popen(cmd_avi, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    for frame in frame_generator():
        if frame.size != (w, h):
            frame = frame.crop((0, 0, w, h))
        p_avi.stdin.write(frame.tobytes())
    p_avi.communicate()
    print(f"  ✓ AVI done: {out_avi} ({os.path.getsize(out_avi)/(1024*1024):.2f} MB)")

# ==========================================
# 1. CHEF DE CUISINE DEMO
# ==========================================
print("\n--- 1. Generating Chef de Cuisine Demo ---")
img_kds = Image.open("/Users/zaki/.gemini/antigravity-ide/brain/13cf9e25-daf8-4b64-8810-b6e6a686751c/.tempmediaStorage/media_1788331000858.png").resize((1920, 1000))
img_bom = Image.open("/Users/zaki/.gemini/antigravity-ide/brain/13cf9e25-daf8-4b64-8810-b6e6a686751c/.tempmediaStorage/media_1788414122865.png").resize((1920, 1000))

cuisine_steps = [
    {
        "img": img_kds,
        "title": "Alerte Allergènes Sensibles (Sans Gluten / Sans Lactose)",
        "desc": "Badges écarlates visibles en cuisine pour sécuriser le poste de travail et éviter toute contamination",
        "box": (150, 180, 580, 480),
        "label": "⚠️ ALLERGÈNES DÉTECTÉS",
        "hold_sec": 5
    },
    {
        "img": img_kds,
        "title": "Avancement Cuisson -> Validation 'Prête à servir !'",
        "desc": "Le chef valide la fin de préparation : le ticket glisse automatiquement dans la colonne 'Prêtes'",
        "box": (150, 420, 580, 510),
        "label": "🔔 CLIC : PRÊTE À SERVIR",
        "hold_sec": 5
    },
    {
        "img": img_bom,
        "title": "Nomenclature BOM & Fiches Recettes Ingrédients",
        "desc": "Déduction automatique des stocks au gramme près (Farine Molino, Fior di Latte, Crème de Truffe)",
        "box": (400, 160, 1520, 600),
        "label": "📦 STOCKS & DÉDUCTION RECETTES",
        "hold_sec": 5
    },
    {
        "img": img_bom,
        "title": "Activation Immédiate du Mode 86 (Rupture)",
        "desc": "Un ingrédient est épuisé ? Le chef bascule le commutateur pour bloquer les nouvelles commandes",
        "box": (1200, 220, 1500, 360),
        "label": "🚨 RUPTURE MODE 86",
        "hold_sec": 5
    },
    {
        "img": img_kds,
        "title": "Synchronisation Temps Réel de la Carte & Affichage",
        "desc": "Le plat est retiré de la carte de tous les clients connectés pour zéro insatisfaction",
        "box": (20, 80, 400, 140),
        "label": "⚡ CARTE SYNCHRONISÉE EN DIRECT",
        "hold_sec": 4
    }
]

cuisine_rendered = [
    create_banner_overlay(s["img"], s["title"], s["desc"], idx+1, len(cuisine_steps), s.get("box"), s.get("label", ""))
    for idx, s in enumerate(cuisine_steps)
]

def gen_cuisine():
    for idx, s in enumerate(cuisine_steps):
        frame = cuisine_rendered[idx]
        for _ in range(s["hold_sec"] * FPS):
            yield frame

stream_frames_to_video(
    gen_cuisine,
    sum(s["hold_sec"] * FPS for s in cuisine_steps),
    "formation/parcours_cuisine/demo_cuisine_allergene_bom_menu.mp4",
    "formation/parcours_cuisine/demo_cuisine_allergene_bom_menu.avi",
    fps=FPS
)
cuisine_rendered[0].save(
    "formation/parcours_cuisine/demo_cuisine_allergene_bom_menu.webp",
    save_all=True,
    append_images=[f for f in gen_cuisine()][1:],
    duration=int(1000 / FPS),
    loop=0
)
print("  ✓ Cuisine WebP updated.")

# ==========================================
# 2. CHEF DE RANG DEMO
# ==========================================
print("\n--- 2. Generating Chef de Rang Demo ---")
img_plan = Image.open("/Users/zaki/.gemini/antigravity-ide/brain/13cf9e25-daf8-4b64-8810-b6e6a686751c/.tempmediaStorage/media_1788331097735.png").resize((1920, 1000))

rang_steps = [
    {
        "img": img_plan,
        "title": "Plan de Salle 2D Vivant & Statuts Couleurs",
        "desc": "Visualisation globale du restaurant : Vert (Libre), Bleu (En cours), Orange (Addition demandée)",
        "box": (350, 200, 1550, 820),
        "label": "🗺️ PLAN DE SALLE DYNAMIQUE",
        "hold_sec": 5
    },
    {
        "img": img_plan,
        "title": "Sélection des Tables 03 & 04 pour Grand Banquet",
        "desc": "Deux tables contiguës sélectionnées pour réunir un groupe d'invités sur une seule tablée",
        "box": (600, 320, 1050, 600),
        "label": "👥 SÉLECTION TABLES 03 + 04",
        "hold_sec": 5
    },
    {
        "img": img_plan,
        "title": "Validation de la Fusion de Tables (12 Couverts)",
        "desc": "Commandes et panier fusionnés instantanément avec total mutualisé et division automatique",
        "box": (600, 300, 1050, 400),
        "label": "🔗 TABLES FUSIONNÉES",
        "hold_sec": 5
    },
    {
        "img": img_plan,
        "title": "Affectation Dynamique des Serveurs par Zone",
        "desc": "Attribution des tables 01 à 06 à Lucas (Carré Terrasse) pour équilibrer la charge de travail",
        "box": (1200, 80, 1750, 180),
        "label": "👔 ZONE ASSIGNÉE : LUCAS",
        "hold_sec": 5
    },
    {
        "img": img_plan,
        "title": "Clôture de Caisse & Dé-fusion Automatique",
        "desc": "En fin de service, chaque table retrouve automatiquement sa disposition initiale sans action manuelle",
        "box": (350, 200, 1550, 820),
        "label": "✨ TABLES PRÊTES POUR LE SERVICE SUIVANT",
        "hold_sec": 4
    }
]

rang_rendered = [
    create_banner_overlay(s["img"], s["title"], s["desc"], idx+1, len(rang_steps), s.get("box"), s.get("label", ""))
    for idx, s in enumerate(rang_steps)
]

def gen_rang():
    for idx, s in enumerate(rang_steps):
        frame = rang_rendered[idx]
        for _ in range(s["hold_sec"] * FPS):
            yield frame

stream_frames_to_video(
    gen_rang,
    sum(s["hold_sec"] * FPS for s in rang_steps),
    "formation/parcours_chef_de_rang/demo_chef_de_rang_salle_fusion_serveur.mp4",
    "formation/parcours_chef_de_rang/demo_chef_de_rang_salle_fusion_serveur.avi",
    fps=FPS
)
rang_rendered[0].save(
    "formation/parcours_chef_de_rang/demo_chef_de_rang_salle_fusion_serveur.webp",
    save_all=True,
    append_images=[f for f in gen_rang()][1:],
    duration=int(1000 / FPS),
    loop=0
)
print("  ✓ Chef de Rang WebP updated.")

# ==========================================
# 3. CLIENT (TITRE-RESTO & SPLIT BILL) DEMO
# ==========================================
print("\n--- 3. Generating Client Titre-Resto & Split Bill Demo ---")
img_split = Image.open("/Users/zaki/.gemini/antigravity-ide/brain/13cf9e25-daf8-4b64-8810-b6e6a686751c/.tempmediaStorage/media_1788330697114.png").resize((1920, 1000))
img_track = Image.open("/Users/zaki/.gemini/antigravity-ide/brain/13cf9e25-daf8-4b64-8810-b6e6a686751c/.tempmediaStorage/media_1788330736035.png").resize((1920, 1000))

client_steps = [
    {
        "img": img_split,
        "title": "Partage de l'Addition entre Convives (Split Bill ⅓)",
        "desc": "Fractionnement équitable à 3 personnes : calcul immédiat de la quote-part individuelle",
        "box": (600, 240, 1320, 420),
        "label": "➗ SPLIT BILL : ⅓ PAR PERSONNE",
        "hold_sec": 5
    },
    {
        "img": img_split,
        "title": "Paiement Hybride Titre-Restaurant (Swile / Edenred)",
        "desc": "Déduction instantanée de 19,00 € et complément automatique réglé en Carte Bancaire ou Apple Pay",
        "box": (600, 430, 1320, 680),
        "label": "💳 TITRE-RESTO + COMPLÉMENT CB",
        "hold_sec": 5
    },
    {
        "img": img_track,
        "title": "Suivi de Commande en Temps Réel en Cuisine",
        "desc": "Progression en direct : En Cuisine -> Prête en Salle -> Livraison à Table",
        "box": (600, 260, 1320, 480),
        "label": "🔥 SUIVI LIVE CUISINE",
        "hold_sec": 5
    },
    {
        "img": img_track,
        "title": "Expérience Post-Livraison : Pourboire Brigade (2€)",
        "desc": "Le pourboire n'apparaît qu'une fois les assiettes servies pour valoriser le travail de l'équipe",
        "box": (600, 490, 1320, 620),
        "label": "💖 POURBOIRE ÉQUIPE",
        "hold_sec": 5
    },
    {
        "img": img_track,
        "title": "Dépôt d'Avis & Synchronisation Google Avis 5 Étoiles",
        "desc": "Les clients conquis sont directement invités à publier sur Google My Business pour booster le restaurant",
        "box": (600, 630, 1320, 780),
        "label": "⭐ AVIS 5 ÉTOILES GOOGLE",
        "hold_sec": 4
    }
]

client_rendered = [
    create_banner_overlay(s["img"], s["title"], s["desc"], idx+1, len(client_steps), s.get("box"), s.get("label", ""))
    for idx, s in enumerate(client_steps)
]

def gen_client():
    for idx, s in enumerate(client_steps):
        frame = client_rendered[idx]
        for _ in range(s["hold_sec"] * FPS):
            yield frame

stream_frames_to_video(
    gen_client,
    sum(s["hold_sec"] * FPS for s in client_steps),
    "formation/parcours_client/demo_client_titre_resto_split_bill.mp4",
    "formation/parcours_client/demo_client_titre_resto_split_bill.avi",
    fps=FPS
)
client_rendered[0].save(
    "formation/parcours_client/demo_client_titre_resto_split_bill.webp",
    save_all=True,
    append_images=[f for f in gen_client()][1:],
    duration=int(1000 / FPS),
    loop=0
)
print("  ✓ Client Titre-Resto WebP updated.")

# ==========================================
# 4. SERVEUR & GERANT & CLIENT COMPLET (SLOW DOWN TO 4 FPS)
# ==========================================
def convert_animated_webp(webp_path, out_mp4, out_avi, fps=4):
    print(f"\n--- Slowing down {webp_path} to {fps} fps ---")
    im = Image.open(webp_path)
    n = getattr(im, "n_frames", 1)
    
    def gen():
        for i in range(n):
            im.seek(i)
            yield im.convert("RGB")
            
    stream_frames_to_video(gen, n, out_mp4, out_avi, fps=fps)

convert_animated_webp(
    "formation/parcours_serveur/demo_serveur_mobile_watch.webp",
    "formation/parcours_serveur/demo_serveur_mobile_watch.mp4",
    "formation/parcours_serveur/demo_serveur_mobile_watch.avi",
    fps=FPS
)

convert_animated_webp(
    "formation/parcours_gerant/demo_gerant_qrcode_avis_fidelite.webp",
    "formation/parcours_gerant/demo_gerant_qrcode_avis_fidelite.mp4",
    "formation/parcours_gerant/demo_gerant_qrcode_avis_fidelite.avi",
    fps=FPS
)

convert_animated_webp(
    "formation/parcours_client/demo_client_kds_complet.webp",
    "formation/parcours_client/demo_client_kds_complet.mp4",
    "formation/parcours_client/demo_client_kds_complet.avi",
    fps=FPS
)

print("\n🚀 ALL 5 PERSONAS SUCCESSFULLY COMPILED!")
