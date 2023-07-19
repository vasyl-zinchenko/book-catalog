import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";
import { useMediaQuery } from "react-responsive";

export const Header = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <>
      {isLargeScreen && <HeaderDesktop />}
      {!isLargeScreen && <HeaderMobile />} 
    </>
  );
};
