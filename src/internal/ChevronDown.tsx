/** The chevron the kit draws from its icon set, written out so the package has no runtime dependency. */
export function ChevronDown({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide-icon lucide lucide-chevron-down ${className ?? ''}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
