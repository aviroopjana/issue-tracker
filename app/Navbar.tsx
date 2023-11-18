"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-10 border-b px-5 mb-5 h-16 items-center">
      <Link href="/">
        <BsFillBugFill size={35} />
      </Link>
      <ul className="flex space-x-10">
        {links.map((link) => (
          <Link
            key={link.href}
            className={` ${
              link.href === currentPath ? "text-zinc-900" : "text-zinc-500"
            }  hover:text-zinc-900 transition-transform font-bold`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
     