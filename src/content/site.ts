/**
 * Site copy and every placeholder the team still has to fill in.
 *
 * Any string that starts with "{{TODO" is rendered as a dashed red
 * placeholder on the page (see <Text />), so nothing unfinished can ship
 * looking real. Replace the string and the placeholder styling disappears.
 *
 * Honesty rules: OMHS is a research prototype. No accuracy figures, user
 * counts, testimonials, partner logos, press or regulatory claims.
 */

export const isTodo = (s: string | undefined) => !!s && s.includes('{{TODO');

export const site = {
  name: 'OMHS',
  org: 'Ayuda',
  tagline: 'Toward needle-free cholesterol checks.',
  description:
    'OMHS is a research prototype by Ayuda exploring non-invasive cholesterol estimation with near-infrared light, a pneumatic finger cuff and a companion app for Android and iOS.',
  disclaimer:
    'OMHS is a research prototype and is not a medical device. It is not intended to diagnose or treat any condition.',
  contactEmail: '{{TODO: contact email}}',
  domain: '{{TODO: production domain}}',
};

export const stores = {
  /** Google Play URL once the Android app is published. */
  android: '{{TODO: Google Play link}}',
  /** App Store URL once the iOS app is published. */
  ios: '{{TODO: App Store link}}',
};

export const socials: { label: string; href: string }[] = [
  { label: 'LinkedIn', href: '{{TODO: LinkedIn URL}}' },
  { label: 'GitHub', href: '{{TODO: GitHub URL}}' },
  { label: 'Instagram', href: '{{TODO: Instagram URL}}' },
  { label: 'X', href: '{{TODO: X URL}}' },
];

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public. */
  photo: string;
  /** LinkedIn (or other profile) URL. A {{TODO}} value hides the overlay link. */
  linkedin: string;
}

/**
 * Team photos come from public/team/. Names and roles for Aryan, Rishav and the
 * mentor are carried over from the previous OMHS site; the rest still need filling in.
 */
export const team: TeamMember[] = [
  {
    name: 'Aryan Raj',
    role: 'ML & Hardware Engineer',
    photo: '/team/aryan.webp',
    linkedin: '{{TODO: LinkedIn URL}}',
  },
  {
    name: 'Rishav Singh',
    role: 'AI Developer & Software Engineer',
    photo: '/team/rishav.webp',
    linkedin: '{{TODO: LinkedIn URL}}',
  },
  {
    name: 'Ayush Kumar',
    role: '{{TODO: Role}}',
    photo: '/team/ayush.webp',
    linkedin: '{{TODO: LinkedIn URL}}',
  },
  {
    name: 'Amrit {{TODO: surname}}',
    role: '{{TODO: Role}}',
    photo: '/team/amrit.webp',
    linkedin: '{{TODO: LinkedIn URL}}',
  },
];

export const mentor: TeamMember & { designation: string } = {
  name: 'Dr. Ayes Chinmay',
  role: 'Mentor',
  designation: 'Director, SensorSpine · Assistant Professor, SOA',
  photo: '/team/ayes-chinmay.webp',
  linkedin: '{{TODO: LinkedIn URL}}',
};

export type MilestoneStatus = 'done' | 'now' | 'next' | 'later';

export interface Milestone {
  status: MilestoneStatus;
  title: string;
  body: string;
}

export const roadmap: Milestone[] = [
  {
    status: 'done',
    title: 'v1 prototype',
    body: 'The first prototype of the approach: two SWIR wavelengths plus pneumatic cuff occlusion.',
  },
  {
    status: 'now',
    title: 'v2 modular rebuild',
    body: 'Teensy 4 controller, dual constant-current LED driver, photodiode/TIA board, pneumatics and an ESP32-C3 BLE link — each on its own board. Paired with the Flutter app.',
  },
  {
    status: 'next',
    title: 'Clinic data collection',
    body: 'Collect device readings alongside standard lab cholesterol results to build a calibration dataset.',
  },
  {
    status: 'next',
    title: 'Calibration model',
    body: 'Fit and validate a model that maps the optical signal to a cholesterol estimate, and measure how well it actually performs.',
  },
  {
    status: 'later',
    title: '{{TODO: next milestone}}',
    body: '{{TODO: describe the milestones after calibration}}',
  },
];

export const statusLabel: Record<MilestoneStatus, string> = {
  done: 'Done',
  now: 'Now',
  next: 'Next',
  later: 'Later',
};
