export type Interest = 'clinic' | 'research' | 'investor' | 'waitlist';

export interface WaitlistEntry {
  email: string;
  interest: Interest;
  organisation?: string;
  message?: string;
}

export type SubmitResult = { ok: true; stored: boolean } | { ok: false; error: string };

/**
 * {{TODO: connect backend}}
 *
 * Set VITE_WAITLIST_ENDPOINT (e.g. in .env.local) to a URL that accepts a JSON
 * POST of `WaitlistEntry` — a serverless function, Formspree, a Google Apps
 * Script, etc. Until then the form validates and reports honestly that the
 * entry was not stored.
 */
export async function submitWaitlist(entry: WaitlistEntry): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, stored: false };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...entry, source: 'omhs-landing' }),
    });
    if (!res.ok) return { ok: false, error: `The server responded with ${res.status}.` };
    return { ok: true, stored: true };
  } catch {
    return { ok: false, error: 'Network error — please try again.' };
  }
}
