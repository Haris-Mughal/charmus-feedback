"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Charmus Feedback
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}!
            </span>
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Link href="/signin">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Sign out
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
