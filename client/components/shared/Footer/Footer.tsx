// components/Footer.tsx
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2a2a3c] text-white py-10">
      <div className="px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* CONTACT INFO */}
        <div>
          <h3 className="font-bold mb-3 uppercase">Contact Info</h3>
          <p className="mb-2">
            NINAKABBO 227/A Tejgaon-Gulshan Link Road
            <br />
            Postal Code: 1208 Dhaka, Bangladesh
          </p>
          <p className="mb-2">+8801777758704, +880177758713</p>
          <p className="mb-4">hello@sailor.com.bd</p>
          <div className="flex space-x-3">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-gray-300" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-gray-300" />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube className="w-5 h-5 hover:text-gray-300" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 hover:text-gray-300" />
            </a>
          </div>
        </div>

        {/* KNOW US */}
        <div>
          <h3 className="font-bold mb-3 uppercase">Know Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Who We Are
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Sailor Club
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Brand Social Responsibilities (BSR)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Join Us
              </a>
            </li>
          </ul>
        </div>

        {/* SHOPPING INFORMATION */}
        <div>
          <h3 className="font-bold mb-3 uppercase">Shopping Information</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy Page
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Size Guide
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                How To Shop
              </a>
            </li>
          </ul>
        </div>

        {/* SERVICE INFORMATION */}
        <div>
          <h3 className="font-bold mb-3 uppercase">Service Information</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Return And Exchange
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Shipping & Charges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Customer Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Terms And Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Enjoy Up To 25% Off At Sarah Resort
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Store Locator
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-sm flex flex-col md:flex-row justify-around items-center px-4">
        <p>Copyright ©2025 Sailor. All Rights Reserved</p>
        <p>
          System Design & Developed By :{" "}
          <span className="text-red-500">Glimnest Media</span>
        </p>
      </div>
    </footer>
  );
}
