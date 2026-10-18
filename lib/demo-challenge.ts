// The browser half of the demo form's bot check. The CRM issues a signed
// challenge, the browser finds the number whose SHA-256 with the salt matches
// it (a second or two, while the visitor types), and the request carries the
// answer. Same code as leaddrive-v2 src/lib/demo-center/form-challenge-client.ts;
// the server half and the reasons are in src/lib/demo-center/form-challenge.ts
// there (owner, 18.10.2026: «защита от спама нужна чтоб боты не заполняли формы»).
export type DemoChallenge = { salt: string; issuedAt: number; challenge: string; maxNumber: number; signature: string };
export type DemoSolution = DemoChallenge & { number: number };

/** The CRM refuses a request sent less than this long after its challenge. */
const MIN_FILL_MS = 3_000;

const hex = (buffer: ArrayBuffer) => Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');

async function solve(c: DemoChallenge): Promise<number | null> {
  const encoder = new TextEncoder();
  for (let n = 0; n <= c.maxNumber; n += 1) {
    if (hex(await crypto.subtle.digest('SHA-256', encoder.encode(`${c.salt}${n}`))) === c.challenge) return n;
    if (n % 1000 === 0) await new Promise((r) => setTimeout(r, 0));
  }
  return null;
}

/** Start when the form opens, await on submit. Null when no challenge could be had: the CRM then asks to send again. */
export function prepareDemoSolution(endpoint: string): Promise<DemoSolution | null> {
  const received = Date.now();
  return fetch(endpoint, { cache: 'no-store' })
    .then((r) => (r.ok ? (r.json() as Promise<DemoChallenge>) : null))
    .then(async (c) => {
      if (!c) return null;
      const number = await solve(c);
      if (number === null) return null;
      const wait = MIN_FILL_MS + 250 - (Date.now() - received);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      return { ...c, number };
    })
    .catch(() => null);
}
