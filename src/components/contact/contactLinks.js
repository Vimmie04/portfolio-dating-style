import { useCallback } from 'react';
import { links, microcopy, profile } from '../../content/site.js';
import { useToast } from '../toast/Toast.jsx';
import { useLikes } from '../likes/LikesContext.jsx';

export const CONTACT_LABELS = {
  email: 'Email',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  behance: 'Behance',
};

/** ['a','b','c'] → 'a, b and c' */
export function formatList(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** Short sentence-friendly summary of what the visitor liked. */
export function likedSummary(likes, max = 3) {
  const labels = likes.map((l) => l.label);
  if (labels.length <= max) return formatList(labels);
  return `${labels.slice(0, max).join(', ')} and ${labels.length - max} more`;
}

/** The likes thread's last stop: a pre-filled email draft. */
export function buildMailto(likes) {
  const subject = 'We matched on your portfolio';
  const liked = likes.length ? ` I liked ${likedSummary(likes, 6)}.` : '';
  const body = `Hi ${profile.nickname},\n\nWe matched on your portfolio.${liked}\n\nI'd love to talk about…\n\n`;
  return `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Returns a function: key → link props.
 * Real links open in a new tab; email opens a draft; empty placeholders
 * show a friendly toast instead of a broken link.
 */
export function useContactLink() {
  const toast = useToast();
  const { likes } = useLikes();

  return useCallback(
    (key) => {
      const label = CONTACT_LABELS[key] ?? key;
      if (key === 'email' && links.email) return { href: buildMailto(likes) };
      if (key !== 'email' && links[key]) return { href: links[key], target: '_blank', rel: 'noopener noreferrer' };
      // Brand names keep their capitals; "email" reads better lowercase mid-sentence.
      const name = key === 'email' ? 'email' : label;
      return {
        href: '#connect',
        onClick: (e) => {
          e.preventDefault();
          toast(microcopy.linkMissing.replace('{name}', name));
        },
      };
    },
    [likes, toast],
  );
}
