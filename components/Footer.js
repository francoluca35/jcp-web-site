import { Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { TikTokIcon } from "./ui/TikTokIcon";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer */}
        <div className="py-10 border-b border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <img 
                src="/Assets/logojcp.png" 
                alt="JCP Maquinarias Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  JCP MAQUINARIAS
                </h3>
                <div className="text-xs uppercase tracking-[0.2em] text-[#adb5bd]">
                  Empresa familiar
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-[#adb5bd] font-medium uppercase tracking-wide text-xs">
                Síguenos
              </span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Facebook, label: "Síguenos en Facebook", color: "hover:bg-blue-600" },
                  { icon: Instagram, label: "Síguenos en Instagram", color: "hover:bg-pink-600" },
                  { icon: TikTokIcon, label: "Síguenos en TikTok", color: "hover:bg-black" }
                ].map((social, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    size="sm" 
                    aria-label={social.label}
                    className={`p-2.5 text-[#adb5bd] hover:text-white border border-[#3b3b3b] hover:border-transparent rounded-full transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Industrial Bottom Footer */}
        <div className="py-6">
          <div className="text-[#adb5bd] text-center text-sm">
            © 2025 JCP Maquinarias · Created by{" "}
            <a
              href="https://www.deamondd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white transition-colors font-semibold"
            >
              @DeamonDD
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}