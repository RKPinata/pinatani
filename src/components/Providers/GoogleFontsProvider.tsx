import { cn } from "@/lib/utils";
import { spaceGrotesk } from "@public/fonts/fonts-provider";

function GoogleFontsProvider({ children }: { children: React.ReactNode }) {
  return <div className={cn(spaceGrotesk.variable)}>{children}</div>;
}

export default GoogleFontsProvider;
