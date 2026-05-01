import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/batches", label: "Live Classes" },
  { to: "/pricing", label: "Pricing" },
  { to: "/my-classes", label: "My Classes" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container-x">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full border border-foreground/5 px-4 py-2 transition-all duration-300 md:px-6",
            scrolled
              ? "bg-background/80 shadow-soft backdrop-blur-xl"
              : "bg-background/40 backdrop-blur-md",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = path === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-foreground text-background"
                        : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="coral" size="default" className="group">
              <Link to="/contact">
                Book a Discovery Call
                <ArrowUpRight className="transition-transform group-hover:rotate-45" />
              </Link>
            </Button>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-background/60 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "container-x lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "mt-3 origin-top overflow-hidden rounded-3xl border border-foreground/5 bg-background/95 shadow-elegant backdrop-blur-xl transition-all duration-300",
            open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="space-y-1 p-4">
            {NAV.map((item) => {
              const active = path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "block rounded-2xl px-5 py-4 text-lg font-display tracking-tight transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-foreground/5",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Button asChild variant="coral" size="lg" className="w-full">
                <Link to="/contact">
                  Book a Discovery Call <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
