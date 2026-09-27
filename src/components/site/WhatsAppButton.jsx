import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

/**
 * Reusable WhatsApp CTA Button with ping animation and consistent styling
 *
 * @param {object} props
 * @param {string} [props.href] - Direct URL (overrides phone + message)
 * @param {string} [props.phone] - Target phone number
 * @param {string} [props.message] - Text payload
 * @param {string} [props.label] - Button label
 * @param {'solid'|'outline'} [props.variant='solid']
 * @param {boolean} [props.showPing] - Whether to show the pulsing dot
 * @param {string} [props.className] - Additional styles
 * @param {React.ReactNode} [props.children]
 * @param {React.ReactNode} [props.rightElement]
 */
const WhatsAppButton = ({
  href,
  phone,
  message,
  label,
  variant = 'solid',
  showPing,
  className = '',
  children,
  rightElement,
  ...props
}) => {
  const finalHref = href || buildWhatsAppUrl(phone, message);
  const displayPing = showPing !== undefined ? showPing : variant === 'solid';

  const baseStyles = "min-h-[40px] rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer font-cairo transition-all select-none";

  const variantStyles = variant === 'solid'
    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:scale-95 px-4 py-2"
    : "border font-bold shadow-2xs border-emerald-700/20 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/80 hover:border-emerald-700/35 hover:text-emerald-900 dark:border-emerald-500/25 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/50 dark:hover:border-emerald-500/40 dark:hover:text-emerald-200 px-5 py-2.5";

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
      {...props}
    >
      {displayPing && (
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>
      )}
      <WhatsAppIcon
        className={`w-4 h-4 fill-current shrink-0 ${variant === 'outline' ? 'text-emerald-600 dark:text-emerald-400' : ''}`}
      />
      <span>{label || children}</span>
      {rightElement}
    </a>
  );
};

export default WhatsAppButton;
export { WhatsAppButton };
