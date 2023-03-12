import { ScreenClass } from "react-grid-system";

import useMediaQuery from "@mui/material/useMediaQuery";

import { BREAKPOINTS } from "@config/constants";

function useBreakpoint(size: { max?: ScreenClass; min?: ScreenClass }) {
  const query: string[] = [];
  if (size.max) query.push(`(max-width:${BREAKPOINTS[size.max]}px)`);
  if (size.min) query.push(`(min-width:${BREAKPOINTS[size.min] + 1}px)`);
  return useMediaQuery(query.join(" and "));
}

export default useBreakpoint;
