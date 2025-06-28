export const DashedLine = () => {
  return (
    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] z-0">
      <svg width="100%" height="2" className="overflow-visible">
        <line
          x1="4"
          y1="1"
          x2="98%"
          y2="1"
          stroke="#C0C0C0"
          strokeWidth="1"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />

        <circle cx="4" cy="1" r="1.5" fill="#C0C0C0" />
        <circle cx="98%" cy="1" r="1.5" fill="#C0C0C0" />
      </svg>
    </div>
  )
}
