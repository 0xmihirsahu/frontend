"use client";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "./ui/resizable-navbar";
import React, { useState } from "react";
import CustomConnectButton from "@/components/custom-connect-wallet";
const navItems = [
  { name: "Markets", link: "/app/markets" },
  { name: "Trade", link: "/app/trade" },
  { name: "Earn", link: "/app/earn" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ResizableNavbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <NavbarButton className="p-0">
          <CustomConnectButton />
        </NavbarButton>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <NavItems items={navItems} onItemClick={() => setMobileOpen(false)} />
          <NavbarButton className="p-0">
            <CustomConnectButton />
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
} 