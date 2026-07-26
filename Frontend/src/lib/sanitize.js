import DOMPurify from 'dompurify';

/**
 * Sanitize an untrusted HTML string before injecting it via
 * dangerouslySetInnerHTML. Vendor product descriptions are rich text
 * (semi-trusted user input), so we strip <script>, inline event handlers,
 * and dangerous URIs to prevent stored XSS / account takeover via the
 * token that lives in localStorage.
 *
 * @param {string} dirty raw HTML from the API
 * @returns {string} sanitized HTML safe to render
 */
export default function sanitizeHtml(dirty) {
  if (dirty === undefined || dirty === null) return '';
  return DOMPurify.sanitize(String(dirty));
}
