"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
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
    <nav className="border-b px-10 mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} className="gap-16">
            <Link href="/">
              <BsFillBugFill size={35} />
            </Link>
            <ul className="flex space-x-10">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={` ${
                      link.href === currentPath
                        ? "text-zinc-900"
                        : "text-zinc-500"
                    }  hover:text-zinc-900 transition-transform font-bold`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Sign out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
