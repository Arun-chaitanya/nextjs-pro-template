const Clock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 7C13 10.3139 10.3139 13 7 13C3.68605 13 1 10.3139 1 7C1 3.68605 3.68605 1 7 1C10.3139 1 13 3.68605 13 7Z"
      stroke="#555555"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9.22598 8.9086L6.78058 7.44979V4.30579" stroke="#555555" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Clock;
