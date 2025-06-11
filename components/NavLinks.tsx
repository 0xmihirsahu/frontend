"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Portfolio", href: "/dashboard/paul/portfolio" },
  { label: "Statements & Legal", href: "/dashboard/paul/statements" },
  { label: "Settings", href: "/dashboard/paul/settings" },
]

export function NavLinks() {
  const pathname = usePathname()
  return (
    <div className="flex-1 flex justify-center gap-4">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
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
  )
}
