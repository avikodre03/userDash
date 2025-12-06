import { Heart } from "lucide-react"; 

export function Footer() {
  return (
  <footer className="bg-slate-900 border-t border-slate-800 mt-auto text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Copyright / Info */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-white mb-2">UserDash</h2>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-3 flex items-center justify-center md:justify-start gap-1.5">
              Made with 
              {/* Kept the heart SVG, but you can replace with an image if desired */}
              <Heart className="w-4 h-4 text-red-500 fill-current inline-block animate-pulse" /> 
              by
              <span className="font-medium text-gray-300">Avinash Kodre</span>
            </p>
          </div>

          {/* Social Links with Official Brand Images */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/avikodre03"
              target="_blank"
              rel="noopener noreferrer"
              // Added group hover text color change to white
              className="group flex items-center gap-3 hover:text-white transition-colors cursor-pointer"
            >
              {/* GitHub Logo Image - Using 'invert' to make the black logo white for dark background */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" 
                alt="GitHub Logo" 
                className="w-7 h-7 opacity-80 group-hover:opacity-100 transition-opacity invert"
              />
              <span className="hidden sm:inline text-sm font-medium group-hover:underline">
                GitHub
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/avinash-kodre/"
              target="_blank"
              rel="noopener noreferrer"
              // Added group hover text color change to light blue
              className="group flex items-center gap-3 hover:text-blue-400 transition-colors cursor-pointer"
            >
              {/* LinkedIn Logo Image */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
                alt="LinkedIn Logo" 
                className="w-7 h-7 opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="hidden sm:inline text-sm font-medium group-hover:underline">
                LinkedIn
              </span>
            </a>
          </div>
        </div>

        {/* Assignment Specific Link */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <a
            href="https://github.com/avikodre03/userDash"
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline cursor-pointer transition-colors"
          >
            View Deployment & Repository Status
          </a>
        </div>
      </div>
    </footer>
  );
}