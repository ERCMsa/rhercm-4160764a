import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logoErcm from "@/assets/logo-ercm.png";

export default function Header() {
  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2 lg:hidden">
        <img src={logoErcm} alt="ERCM" className="h-7 w-auto" />
        <span className="font-bold text-sm text-primary">Rh Doc Gen</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Se connecter
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
}
