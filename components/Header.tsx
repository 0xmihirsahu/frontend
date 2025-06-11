import Image from "next/image"
import Link from "next/link"

import { UserMenu } from "@/components/UserMenu"
import { NavLinks } from "@/components/NavLinks"

const Header = ({ username }: { username: string }) => {
  return (
    <header>
      <div className="flex items-center justify-between w-full">
        <Link href="/dashboard/portfolio">
          <div className="flex items-center cursor-pointer">
            <Image src="/Whale.png" alt="logo" width={45} height={45} />
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
