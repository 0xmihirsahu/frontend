import Image from "next/image"
import Link from "next/link"

import { UserMenu } from "@/components/UserMenu"
import { NavLinks } from "@/components/NavLinks"

const Header = ({
  pathname,
  username,
}: {
  pathname: string
  username: string
}) => {
  console.log("pathname:", pathname)
  return (
    <header className="py-8 mb-10 px-10 md:px-28 lg:px-40 xl:px-56">
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
