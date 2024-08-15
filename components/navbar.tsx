"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Logs } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between">
      <NavigationMenu className="lg:w-[60rem] md:w-[40rem] w-[24rem] mx-auto md:border mt-4 border-neutral-300 dark:border-zinc-500 rounded-md p-2 relative bg-background shadow-lg">
        <NavigationMenuList className="md:w-full md:flex md:items-center md:justify-between">
          <NavigationMenuItem className="xl:mr-24 md:mr-0 md:flex hidden">
            <Link href="/" className="flex gap-2">
              <svg
                fill="none"
                height="48"
                viewBox="0 0 42 48"
                width="42"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-blue-500"
              >
                <path
                  clip-rule="evenodd"
                  d="m22.1017 20.8596 9.8995-9.8994-2.1213-2.12137-7.3389 7.33887v-13.1777h-3v13.1777l-7.3388-7.33887-2.1213 2.12137 9.8995 9.8994 1.0606 1.0607zm2.1207 2.1214 9.8995-9.8995 2.1213 2.1213-7.3388 7.3388h13.0956v3h-13.0956l7.3388 7.3389-2.1213 2.1213-9.8995-9.8995-1.0607-1.0607zm-16.26224 12.0208 9.89944-9.8995 1.0607-1.0607-1.0607-1.0606-9.89944-9.8995-2.12133 2.1213 7.33887 7.3388h-13.17574688v3h13.17574688l-7.33887 7.3389zm12.02024-7.7782-9.8995 9.8995 2.1213 2.1213 7.3388-7.3388v13.0944h3v-13.0944l7.3389 7.3388 2.1213-2.1213-9.8995-9.8995-1.0607-1.0607z"
                  className="fill-current"
                />
              </svg>

              <h1 className="font-bold text-xl mt-2">DevHire</h1>
            </Link>
          </NavigationMenuItem>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:block absolute md:relative top-full md:mt-0 md:left-0 mt-4 left-10 right-0`}
          >
            <div className="flex flex-col md:flex-row">
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Link href={"/public"}>About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Link href={"/"}>Services</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Link href={"#pricing"}>Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </div>
          </div>
          <ModeToggle />
        </NavigationMenuList>

        <NavigationMenuList className="flex md:hidden justify-center">
          <div className="flex">
            <NavigationMenuItem>
              <Link href="/">
                <Image
                  src="/assets/navbar-logo.svg"
                  alt="Nexusai Logo"
                  height={130}
                  width={130}
                />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex justify-end mt-2">
              <Logs className="text-primary ml-40" onClick={toggleMenu} />
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
