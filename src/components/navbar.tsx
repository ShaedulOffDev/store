import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex items-center px-4 md:px-12 justify-between py-2 fixed top-0 start-0 w-full end-0 z-50 shadow bg-white">
      <Link href="/">
        <Image src={"/logo.png"} alt="awd" width={75} height={75} />
      </Link>
      <div className="flex items-center space-x-2.5 text-sm">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={'/'} className="mr-5 hover:text-gray-900">Home Page</Link>
          <Link href={'/products'} className="mr-5 hover:text-gray-900">All Products</Link>
          <Link href={'/contact'} className="mr-5 hover:text-gray-900">Contact</Link>
        </nav>
        <Link href={`/shopping-cart/`} className="button bg-blue-600 text-white hover:bg-transparent border-transparent hover:text-blue-600 hover:border-blue-600">
          My bag
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
