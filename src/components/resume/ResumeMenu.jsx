import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { links, microcopy } from '../../content/site.js';
import { useToast } from '../toast/Toast.jsx';
import { DownloadIcon, EyeIcon } from '../icons.jsx';
import './ResumeMenu.css';

/**
 * Every "Resume" button opens this small menu: View (new tab) or Download.
 * `children` is a render function that receives the trigger's props:
 *   <ResumeMenu>{(props) => <button {...props}>Resume</button>}</ResumeMenu>
 * placement: 'down' | 'up'   align: 'start' | 'end'
 */
export default function ResumeMenu({ children, placement = 'down', align = 'end', className = '' }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const toast = useToast();
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const triggerProps = {
    ref: triggerRef,
    type: 'button',
    'aria-expanded': open,
    'aria-controls': menuId,
    onClick: () => {
      if (!links.resume) {
        toast(microcopy.resumeMissing);
        return;
      }
      setOpen((o) => !o);
    },
  };

  const close = () => setOpen(false);

  return (
    <div ref={wrapRef} className={`resume-menu resume-menu--${placement} resume-menu--${align} ${className}`}>
      {children(triggerProps, open)}
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            className="resume-menu__pop"
            initial={{ opacity: 0, y: placement === 'up' ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === 'up' ? 4 : -4 }}
            transition={{ duration: 0.16 }}
          >
            <p className="resume-menu__title">Resume · PDF</p>
            <a
              className="resume-menu__item"
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              data-cursor="hand"
              data-cursor-label="VIEW"
            >
              <EyeIcon width={20} height={20} />
              View
              <span>Opens in a new tab</span>
            </a>
            <a
              className="resume-menu__item"
              href={links.resume}
              download={links.resumeFileName || true}
              onClick={close}
              data-cursor="hand"
              data-cursor-label="DOWNLOAD"
            >
              <DownloadIcon width={20} height={20} />
              Download
              <span>Save the PDF</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
