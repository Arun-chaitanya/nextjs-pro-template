const Multiple: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
    <rect y="0.00012207" width="40" height="40" rx="20" fill="white" />
    <path
      d="M11 24.5001L20 29.7501L29 24.5001"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 20.0001L20 25.2501L29 20.0001"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 15.5001L20 20.7501L29 15.5001L20 10.2501L11 15.5001Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Multiple;
