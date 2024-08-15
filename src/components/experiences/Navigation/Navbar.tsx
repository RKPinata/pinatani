import MaxWidthContainer from "@components/UI/MaxWidthContainer";

function Navbar() {
  return (
    <nav>
      <div className="hidden md:block sticky h-20 w-full border-b backdrop-blur-sm text-foreground">
        <MaxWidthContainer>Navbar</MaxWidthContainer>
      </div>
    </nav>
  );
}

export default Navbar;
