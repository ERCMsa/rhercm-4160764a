import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoErcm from "@/assets/logo-ercm.png";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="w-5 h-5" />
          </Button>
        )}
        {isMobile && (
          <>
            <img src={logoErcm} alt="ERCM" className="h-7 w-auto" />
            <span className="font-bold text-sm text-primary">Rh Doc Gen</span>
          </>
        )}
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
