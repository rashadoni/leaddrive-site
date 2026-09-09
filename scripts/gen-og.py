"""Generate OG images for solution pages: public/og/<lang>-<slug>.png (1200x630)."""
import json, re, subprocess, sys, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# slug/h1/h2 per language come from scripts/dump-solutions.mjs so lib/solutions.ts stays the single source of truth.
data = json.loads(subprocess.check_output(['node', os.path.join(ROOT, 'scripts/dump-solutions.mjs')], cwd=ROOT))
W, H = 1200, 630
bold = lambda s: ImageFont.truetype(os.path.join(ROOT, 'public/fonts/manrope-600.ttf'), s)
reg = lambda s: ImageFont.truetype(os.path.join(ROOT, 'public/fonts/manrope-400.ttf'), s)
LABEL = {'az': 'LeadDrive CRM · Həll', 'ru': 'LeadDrive CRM · Решение', 'en': 'LeadDrive CRM · Solution'}

def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=font) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

for s in data:
    for lang in ('az', 'ru', 'en'):
        h1, h2 = s[lang]
        im = Image.new('RGB', (W, H), (255, 242, 230))
        d = ImageDraw.Draw(im)
        d.rectangle([0, 0, W, 10], fill=(232, 72, 32))
        # wordmark
        d.rounded_rectangle([72, 62, 118, 108], radius=12, fill=(20, 64, 47))
        d.text((84, 68), 'lD', font=bold(30), fill=(255, 255, 255))
        d.text((132, 66), 'LeadDrive', font=bold(34), fill=(22, 27, 22))
        d.text((320, 78), 'CRM', font=reg(20), fill=(124, 130, 116))
        d.text((72, 150), LABEL[lang], font=bold(20), fill=(194, 71, 20))
        y = 190
        size = 64
        while True:
            f = bold(size); l1 = wrap(d, h1, f, 1050); l2 = wrap(d, h2, f, 1050)
            if (len(l1) + len(l2)) * size * 1.15 <= 330 or size <= 36: break
            size -= 4
        for line in l1:
            d.text((72, y), line, font=f, fill=(22, 27, 22)); y += int(size * 1.15)
        for line in l2:
            d.text((72, y), line, font=f, fill=(90, 122, 78)); y += int(size * 1.15)
        d.text((72, H - 70), 'leaddrivecrm.org', font=reg(24), fill=(124, 130, 116))
        d.rounded_rectangle([W - 330, H - 84, W - 72, H - 40], radius=22, fill=(232, 72, 32))
        d.text((W - 300, H - 76), {'az': 'Demoya baxın', 'ru': 'Посмотреть демо', 'en': 'Book a demo'}[lang], font=bold(22), fill=(255, 255, 255))
        im.save(os.path.join(ROOT, f'public/og/{lang}-{s["slug"]}.png'), optimize=True)
print(f'og: {len(data) * 3} images')
