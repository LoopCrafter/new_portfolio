import Link from "next/link";
import MagneticWrapper from "./MagneticButton";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center fixed top-0 left-0 w-full z-2 p-6">
      <MagneticWrapper strength={20} textStrength={20}>
        <Link href="/">
          <div className="flex justify-start items-center gap-2">
            <span>©</span>
            <div className="relative overflow-hidden">
              <span className="code-by ">Code by </span>
            </div>
          </div>
        </Link>
      </MagneticWrapper>
      <ul className="flex justify-center items-center gap-3">
        <li className="btn btn-link">
          <MagneticWrapper strength={20} textStrength={20}>
            <button className="btn-click">
              <span className="btn-text">Work</span>
            </button>
          </MagneticWrapper>
        </li>
        <li className="btn btn-link">
          <MagneticWrapper strength={20} textStrength={20}>
            <button className="btn-click">
              <span className="btn-text">About</span>
            </button>
          </MagneticWrapper>
        </li>
        <li className="btn btn-link">
          <MagneticWrapper strength={20} textStrength={20}>
            <button className="btn-click">
              <span className="btn-text">Contact</span>
            </button>
          </MagneticWrapper>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
