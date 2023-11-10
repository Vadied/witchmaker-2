"use client";

import { useEffect, useState } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import Link from "next/link";

import style from "./Navbar.module.css";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>(null);

  const handleProviders = async () => {
    const providers = await getProviders();
    setProviders(providers);
  };

  useEffect(() => {
    handleProviders();
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className={style.navbar}>
      <div className={`${style.logo} center-content`}>
        <Link href="/">WitchMaker</Link>
      </div>
      {session?.user && (
        <div className={style.links}>
          <Link href="/campaigns">Campaigns</Link>
          <Link href="/characters">Characters</Link>
          <button type="button" onClick={handleLogout}>
            Sign out
          </button>
          <Image src={session.user.image} alt="profile" width={37} height={37} />
        </div>
      )}
      {!session?.user &&
        providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button type="button" onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </nav>
  );
};

export default Navbar;
