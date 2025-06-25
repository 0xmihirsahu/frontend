import Link from 'next/link'
import { Heart } from 'lucide-react'

const Footer = () => (
  <footer className="w-full bg-white border-t border-gray-200 mt-16">
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 lg:px-12 xl:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-gray-900">Spout</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your comprehensive financial dashboard for smart investment decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Quick Links</h3>
          <div className="space-y-2">
            <Link href="/portfolio" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
            <Link href="/markets" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Markets
            </Link>
            <Link href="/statements" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Statements
            </Link>
            <Link href="/settings" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Settings
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Support</h3>
          <div className="space-y-2">
            <Link href="/help" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Help Center
            </Link>
            <Link href="/contact" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Company</h3>
          <div className="space-y-2">
            <Link href="/about" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link href="/careers" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Careers
            </Link>
            <Link href="/blog" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/security" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Spout Dashboard. All rights reserved.
        </div>
        <div className="flex items-center text-sm text-gray-600 mt-4 md:mt-0">
          Made with <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" /> for better investing
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
