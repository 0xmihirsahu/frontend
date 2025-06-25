import Image from "next/image"
import Link from "next/link"

import { UserMenu } from "@/components/UserMenu"
import { NavLinks } from "@/components/NavLinks"

const Header = ({ username }: { username: string }) => {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between w-full py-4">
        <Link href="/">
          <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Image src="/Whale.png" alt="Spout Logo" width={45} height={45} className="mr-3" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Spout</h1>
              <p className="text-xs text-gray-500">Financial Dashboard</p>
            </div>
          </div>
        </Link>
        <NavLinks />
        <div className="flex items-center justify-end">
          <UserMenu username={username} />
        </div>
      </div>
    </header>
  )
}

export { Header }
