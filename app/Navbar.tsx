"use client";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillBugFill } from "react-icons/bs";

const Navbar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

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
          <li key={link.href}>
            <Link
              className={` ${
                link.href === currentPath ? "text-zinc-900" : "text-zinc-500"
              }  hover:text-zinc-900 transition-transform font-bold`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Sign out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
