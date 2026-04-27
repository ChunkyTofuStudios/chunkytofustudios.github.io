import { useEffect } from 'react';

/**
 * Injects a JSON-LD <script> into <head> for the duration of the mount.
 * LLM crawlers and search engines use this for structured understanding.
 */
export function JsonLd({ data, id }: { data: object; id: string }) {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);

    return () => {
      const toRemove = document.getElementById(scriptId);
      if (toRemove) toRemove.remove();
    };
  }, [data, id]);

  return null;
}
