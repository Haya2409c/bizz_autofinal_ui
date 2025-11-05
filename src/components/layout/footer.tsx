import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Modules", href: "/modules" },
  { name: "Pricing", href: "/pricing" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "Help Center", href: "#" },
  { name: "Documentation", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const contactInfo = [
  { icon: MapPin, text: "Karachi, Pakistan" },
  { icon: Mail, text: "support@bizzauto.pk" },
  { icon: Phone, text: "+92 300 1234567" },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & Socials */}
          <div className="md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="rounded-lg bg-indigo-600 p-2 text-white">B</span>
              <span className="text-2xl font-bold text-white">BizzAuto</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              AI-powered business automation platform for traders and
              distributors in Pakistan.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 transition-colors duration-300 hover:text-indigo-500"
                >
                  <link.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-indigo-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              {contactInfo.map((info) => (
                <li key={info.text} className="flex items-start text-sm">
                  <info.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-400" />
                  <span className="ml-2">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BizAuto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
