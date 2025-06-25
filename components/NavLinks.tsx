"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PieChart, TrendingUp, FileText, Settings, Home, Menu } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Portfolio", href: "/portfolio", icon: PieChart },
  { label: "Markets", href: "/markets", icon: TrendingUp },
  { label: "Statements", href: "/statements", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function NavLinks() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1 justify-center">
        <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200
                    ${isActive 
                      ? "bg-white shadow-sm text-blue-600 border border-blue-200" 
                      : "hover:bg-white hover:shadow-sm text-gray-600 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{link.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        {isMobileMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`
                    flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors
                    ${isActive ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" : "text-gray-700"}
                  `}>
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
