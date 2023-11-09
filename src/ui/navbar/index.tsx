import Link from "next/link";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={`${style.logo} center-content`}>
        <Link href="/">WitchMaker</Link>
      </div>
      <div className={style.links}>
        <Link href="/campaigns">Campaigns</Link>
        <Link href="/characters">Characters</Link>
        <Link href="/login">Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;
