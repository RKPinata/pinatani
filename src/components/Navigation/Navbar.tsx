import MaxWidthContainer from "../UI/MaxWidthContainer";

function Navbar() {
  return (
    <header>
      <nav>
        <div className="hidden md:block sticky h-20 w-full border-b backdrop-blur-sm text-foreground">
          <MaxWidthContainer>Navbar</MaxWidthContainer>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
