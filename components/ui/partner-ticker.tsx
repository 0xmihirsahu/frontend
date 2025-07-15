import React from "react"

const partners = [
  { src: "/partners/Alpaca.svg", alt: "Alpaca" },
  { src: "/partners/Blocksense.png", alt: "Blocksense" },
  { src: "/partners/Chainlink.svg", alt: "Chainlink" },
  { src: "/partners/ERC3643Full.png", alt: "ERC3643" },
  { src: "/partners/Faroswap.svg", alt: "Faroswap" },
  { src: "/partners/Inco.png", alt: "Inco" },
  { src: "/partners/Pharos.svg", alt: "Pharos" },
]

export default function PartnerTicker() {
  // Duplicate the array to ensure seamless looping
  const tickerPartners = [...partners, ...partners]
  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative w-full h-16">
        <div className="absolute top-0 left-0 flex items-center gap-12 animate-partner-ticker whitespace-nowrap will-change-transform">
          {tickerPartners.map((partner, idx) => (
            <img
              key={idx}
              src={partner.src}
              alt={partner.alt}
              className="h-12 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
              draggable={false}
              style={{ userSelect: "none" }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes partner-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-partner-ticker {
          animation: partner-ticker 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
