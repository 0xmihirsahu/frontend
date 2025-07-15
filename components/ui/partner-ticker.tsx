import React, { useRef, useEffect, useState } from "react"
import Link from "next/link"

const initialPartners = [
  {
    src: "/partners/Alpaca.svg",
    alt: "Alpaca",
    link: "https://alpaca.markets/",
  },
  {
    src: "/partners/Blocksense.png",
    alt: "Blocksense",
    link: "https://blocksense.network/",
  },
  {
    src: "/partners/Chainlink.svg",
    alt: "Chainlink",
    link: "https://chain.link/",
  },
  {
    src: "/partners/ERC3643Full.png",
    alt: "ERC3643",
    link: "https://www.erc3643.org/",
  },
  {
    src: "/partners/Faroswap.svg",
    alt: "Faroswap",
    link: "https://faroswap.xyz/",
  },
  { src: "/partners/Inco.png", alt: "Inco", link: "https://www.inco.org/" },
  {
    src: "/partners/Pharos.svg",
    alt: "Pharos",
    link: "https://pharosnetwork.xyz/",
  },
]

export default function PartnerTicker() {
  const [partners, setPartners] = useState(initialPartners)
  const tickerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const speed = 1 // px per frame

  useEffect(() => {
    let frame: number
    let running = true
    const animate = () => {
      setOffset((prev) => prev - speed)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => {
      running = false
      cancelAnimationFrame(frame)
    }
  }, [])

  // When the first logo is out of view, move it to the end
  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return
    const firstLogo = ticker.children[0] as HTMLAnchorElement
    if (!firstLogo) return
    const firstLogoWidth = firstLogo.offsetWidth + 48 // 48px gap-12
    if (Math.abs(offset) >= firstLogoWidth) {
      setPartners((prev) => {
        const [first, ...rest] = prev
        return [...rest, first]
      })
      setOffset((prev) => prev + firstLogoWidth)
    }
  }, [offset])

  return (
    <div
      className="w-full overflow-x-hidden h-16 relative"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        ref={tickerRef}
        className="flex items-center gap-12 h-16 will-change-transform"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {partners.map((partner, idx) => (
          <Link
            key={idx}
            href={partner.link}
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none"
            tabIndex={0}
            aria-label={partner.alt}
            style={{ display: "inline-block" }}
          >
            <img
              src={partner.src}
              alt={partner.alt}
              className="h-12 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
              draggable={false}
              style={{ userSelect: "none" }}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
