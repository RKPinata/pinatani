import { cn } from "@root/src/lib/utils";

type TTitleProps = {
  size?: "large" | "medium" | "medium";
  className?: string
  children: React.ReactNode;
};
const Title = ({ size, children, className }: TTitleProps) => {
  const titleSize = {
    large: "text-2xl ", // 24px
    medium: "text-xl", // 20px
    small: "text-base", // 16px
  }[size ? size : "large"];

  return (
    <h3 className={cn("font-semibold", titleSize, className)}>{children}</h3>
  );
};
export { Title };
