import { spaceGrotesk } from "@public/fonts/fonts-provider";
import { cn } from "@root/src/lib/utils/common.utils";

function GoogleFontsProvider({ children }: { children: React.ReactNode }) {
  return <div className={cn(spaceGrotesk.variable)}>{children}</div>;
}

export default GoogleFontsProvider;
