/** Total cholesterol bands used by the app (mg/dL). */
export const BANDS = [
  { label: 'Desirable', range: '<200', min: 0, max: 200 },
  { label: 'Borderline', range: '200–239', min: 200, max: 240 },
  { label: 'High', range: '≥240', min: 240, max: 300 },
] as const;

/** Top of the app's ring gauge scale (mg/dL). */
export const SCALE_MAX = 300;

export function bandFor(mgdl: number) {
  if (mgdl < 200) return BANDS[0];
  if (mgdl < 240) return BANDS[1];
  return BANDS[2];
}
