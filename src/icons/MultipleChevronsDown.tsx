const MultipleChevronsDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
    <rect width="40" height="40" rx="20" fill="white" />
    <path
      d="M13.75 21.25L20 27.5L26.25 21.25"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.75 12.5L20 18.75L26.25 12.5"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MultipleChevronsDown;
