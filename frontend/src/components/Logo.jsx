function Logo({ size = "md" }) {
  const sizes = {
    sm: { icon: 20, text: "text-base" },
    md: { icon: 26, text: "text-xl" },
    lg: { icon: 36, text: "text-3xl" },
  };

  const { icon, text } = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2 select-none">
      {/* SVG mark — diamond with pen-nib */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M16 2L30 16L16 30L2 16L16 2Z" fill="#4f46e5" />
        <path d="M16 8L22 16L16 24L10 16L16 8Z" fill="#ffffff" opacity="0.9" />
        <circle cx="16" cy="16" r="2.5" fill="#4f46e5" />
      </svg>

      {/* Wordmark */}
      <span className={`font-bold tracking-tight text-white ${text}`}>
        Blog
      </span>
    </div>
  );
}

export default Logo;
