import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="sr-only">Your Store Logo</span>
              <div className="w-10 h-10 grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`bg-gray-800 ${i % 2 === 0 ? 'w-3 h-3' : 'w-3 h-3 rotate-45'}`}></div>
                ))}
              </div>
              <span className="text-2xl font-bold">SEELOOK</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Mission</Link></li>
                <li><Link href="#" className="hover:underline">Team</Link></li>
                <li><Link href="/#" className="hover:underline">Newsletter</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Contact</Link></li>
                <li><Link href="#" className="hover:underline">Refund Policy</Link></li>
                <li><Link href="#" className="hover:underline">FAQ&#39;s</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Instagram</Link></li>
                <li><Link href="#" className="hover:underline">LinkedIn</Link></li>
                <li><Link href="#" className="hover:underline">YouTube</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Your Store. All rights reserved.</p>
          <div className="flex space-x-4 text-sm">
            <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}