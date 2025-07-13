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
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
const navItems = [
  { name: "Markets", link: "/app/markets" },
  { name: "Trade", link: "/app/trade" },
  { name: "Earn", link: "/app/earn" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  let showLogin = false;
  try {
    // Only call hook in client
    showLogin = typeof window !== "undefined" && !useAuthContext().user;
  } catch {}

  return (
    <ResizableNavbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        {showLogin && (
          <Link
            href="/auth/login"
            style={{ position: "relative", zIndex: 50 }}
            className="px-4 py-2 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            Login
          </Link>
        )}
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <NavItems items={navItems} onItemClick={() => setMobileOpen(false)} />
          {showLogin && (
            <Link
              href="/auth/login"
              style={{ position: "relative", zIndex: 50 }}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
} 