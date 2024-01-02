"use client";
import { Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <nav className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b bg-slate-200">
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
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar>
                    <AvatarImage
                      src={session.user?.image!}
                      className="cursor-pointer"
                    />
                    <AvatarFallback>{session?.user?.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text>{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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
