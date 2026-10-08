import { Fragment } from 'react';

const TODO = /(\{\{TODO[^}]*\}\})/g;

/** Renders copy from content/site.ts, showing any {{TODO ...}} fragment as an obvious dashed placeholder. */
export function Text({ children, className }: { children: string; className?: string }) {
  const parts = children.split(TODO).filter(Boolean);
  const body = parts.map((part, i) =>
    part.startsWith('{{TODO') ? (
      <span key={i} className="todo">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
  return className ? <span className={className}>{body}</span> : <>{body}</>;
}
