#!/bin/bash
# Notify IndexNow (Bing, Yandex, Seznam, Naver) about every URL in the sitemap after a deploy.
set -e
cd "$(dirname "$0")/.."
KEY=$(cat scripts/indexnow-key.txt)
python3 - "$KEY" <<'PY'
import json, sys, urllib.request
key = sys.argv[1]
urls = [u.strip() for u in open('scripts/urls.txt') if u.strip()]
body = json.dumps({'host': 'leaddrivecrm.org', 'key': key, 'keyLocation': f'https://leaddrivecrm.org/{key}.txt', 'urlList': urls}).encode()
req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body, headers={'Content-Type': 'application/json; charset=utf-8'})
try:
    with urllib.request.urlopen(req, timeout=30) as r: print('IndexNow:', r.status, len(urls), 'URLs')
except urllib.error.HTTPError as e: print('IndexNow error:', e.code, e.read()[:200])
PY
