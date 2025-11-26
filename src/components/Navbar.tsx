"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-black px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl text-white font-semibold">
        GO-TASK
      </Link>

      <div className="hidden md:flex items-center gap-6 text-white">
        <Link href="/task">Tasks</Link>
        <Link href="/profile">Profile</Link>
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/task" className="w-full">
                Tasks
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
