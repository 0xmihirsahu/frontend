"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Wrapper } from "./Wrapper"
import { Icons } from "./icons/icons"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Portfolio", href: "/dashboard/portfolio" },
  { label: "Statements & Legal", href: "/dashboard/statements" },
  { label: "Settings", href: "/dashboard/settings" },
]

const Header = () => {
  const { username } = useCurrentUser()
  const pathname = usePathname()
  return (
    <header className="py-8 mb-10 px-10 md:px-28 lg:px-40 xl:px-56">
      <div className="flex items-center justify-between w-full">
        <Link href="/dashboard/portfolio">
          <div className="flex items-center cursor-pointer">
            <Image src="/Whale.png" alt="logo" width={45} height={45} />
          </div>
        </Link>
        <div className="flex-1 flex justify-center gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button
                variant="ghost"
                className={
                  pathname === link.href
                    ? "border-b-2 border-primary rounded-none"
                    : "border-b-2 border-transparent rounded-none"
                }
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-center items-center rounded-full cursor-pointer w-8 h-8 transition-all hover:bg-slate-100">
                <Icons.UserProfile className="w-6 h-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                {username}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Enable 2FA
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => alert("Logout")}
                variant="destructive"
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export { Header }
