"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { mainNav, type NavEntry } from "@/content/navigation";
import { Icon } from "./icon";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const base = href.split("/").slice(0, 2).join("/");
  return pathname === href || pathname.startsWith(`${base}/`) || pathname === base;
}

/** Desktop disclosure-style mega menu (WAI-ARIA disclosure navigation pattern). */
function MegaMenu({ entry, pathname }: { entry: NavEntry; pathname: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // Reset transient open state when the route is hidden by Activity.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hover = (next: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(next), next ? 60 : 160);
  };

  const active = isActive(pathname, entry.href);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={hover(true)}
      onPointerLeave={hover(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors hover:text-ink ${
          active ? "text-ink" : "text-muted"
        }`}
      >
        {entry.label}
        <Icon name="chevron" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3"
      >
        <div className="rounded-[var(--radius-card)] border border-line bg-deep p-3 shadow-lg shadow-black/10">
          <ul className="grid grid-cols-2 gap-1">
            {entry.menu?.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onNavigate={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="group flex h-full gap-3 rounded-xl p-3 transition-colors hover:bg-ink/5"
                >
                  {item.icon ? (
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-mint/30 bg-mint/10 text-mint-soft">
                      <Icon name={item.icon} />
                    </span>
                  ) : null}
                  <span>
                    <span className="block font-semibold text-ink">{item.label}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{item.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {entry.menuFooter ? (
            <Link
              href={entry.menuFooter.href}
              onNavigate={() => setOpen(false)}
              className="link-arrow mt-1 flex rounded-xl px-3 py-2.5 text-sm hover:bg-ink/5"
            >
              {entry.menuFooter.label}
              <Icon name="arrow" className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useLayoutEffect(() => () => dialogRef.current?.close(), []);

  return (
    <>
      <button
        type="button"
        className="grid size-11 place-items-center rounded-full border border-line text-ink lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
      >
        <Icon name="menu" className="size-5" />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-transparent p-0 text-ice backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col overflow-y-auto border-l border-line bg-deep px-5 pb-8 pt-4">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-full border border-line"
              aria-label="Close menu"
            >
              <Icon name="close" className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8">
            <ul className="space-y-1">
              {mainNav.map((entry) =>
                entry.menu ? (
                  <li key={entry.label}>
                    <details className="group rounded-xl">
                      <summary className="flex items-center justify-between rounded-xl px-3 py-3 text-lg font-semibold">
                        {entry.label}
                        <Icon name="chevron" className="size-5 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="mb-2 ml-3 border-l border-line pl-3">
                        {entry.menu.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onNavigate={close}
                              aria-current={pathname === item.href ? "page" : undefined}
                              className="block rounded-lg px-3 py-2.5 text-muted hover:text-ink aria-[current=page]:text-mint-soft"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        {entry.menuFooter ? (
                          <li>
                            <Link href={entry.menuFooter.href} onNavigate={close} className="block px-3 py-2.5 text-sm font-semibold text-mint-soft">
                              {entry.menuFooter.label}
                            </Link>
                          </li>
                        ) : null}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      onNavigate={close}
                      aria-current={pathname === entry.href ? "page" : undefined}
                      className="block rounded-xl px-3 py-3 text-lg font-semibold aria-[current=page]:text-mint-soft"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link href="/contact" onNavigate={close} className="block rounded-xl px-3 py-3 text-lg font-semibold">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <Link href="/contact" onNavigate={close} className="btn btn-primary mt-auto w-full">
            Let&apos;s Talk
          </Link>
        </div>
      </dialog>
    </>
  );
}

export function Header() {
  const pathname = usePathname() ?? "/";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-space/75 backdrop-blur-xl">
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((entry) => (
              <li key={entry.label}>
                {entry.menu ? (
                  <MegaMenu entry={entry} pathname={pathname} />
                ) : (
                  <Link
                    href={entry.href}
                    aria-current={isActive(pathname, entry.href) ? "page" : undefined}
                    className="rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {entry.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">
            Let&apos;s Talk
          </Link>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
