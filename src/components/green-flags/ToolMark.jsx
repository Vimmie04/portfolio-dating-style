/** App-icon style tile for a design tool. See `tools` in src/content/site.js. */
export default function ToolMark({ tool }) {
  // Official logo file, when provided.
  if (tool.logo) {
    const fill = tool.logoFit === 'fill';
    return (
      <span className={`tool-mark ${fill ? 'tool-mark--logo-fill' : 'tool-mark--light tool-mark--logo'}`}>
        <img src={tool.logo} alt="" draggable="false" loading="lazy" decoding="async" />
      </span>
    );
  }

  if (tool.mark === 'figma') {
    return (
      <span className="tool-mark tool-mark--light">
        <svg className="tool-mark__figma" viewBox="0 0 38 57" aria-hidden="true" focusable="false">
          <path fill="#F24E1E" d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19V0z" />
          <path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" />
          <path fill="#A259FF" d="M19 19H9.5a9.5 9.5 0 0 0 0 19H19V19z" />
          <circle fill="#1ABCFE" cx="28.5" cy="28.5" r="9.5" />
          <path fill="#0ACF83" d="M19 38H9.5a9.5 9.5 0 1 0 9.5 9.5V38z" />
        </svg>
      </span>
    );
  }

  if (tool.mark === 'framer') {
    return (
      <span className="tool-mark tool-mark--ink">
        <svg className="tool-mark__framer" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="#fff" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      </span>
    );
  }

  if (tool.mark === 'canva') {
    return (
      <span className="tool-mark tool-mark--light">
        <span className="tool-mark__canva" aria-hidden="true">
          C
        </span>
      </span>
    );
  }

  return (
    <span className="tool-mark" style={{ background: tool.bg, color: tool.fg }}>
      <span className="tool-mark__letters" aria-hidden="true">
        {tool.letters}
      </span>
    </span>
  );
}
