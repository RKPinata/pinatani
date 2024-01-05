import React from "react";
import MaxWidthContainer from "./MaxWidthContainer";

function PageContainer({ children }: { children: React.ReactNode }) {
  return <MaxWidthContainer className="py-10">{children}</MaxWidthContainer>;
}

export default PageContainer;
