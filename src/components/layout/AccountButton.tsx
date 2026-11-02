"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";

const subscribe = () => () => {};

export default function AccountButton() {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const showToast = useToastStore((s) => s.show);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!isMounted) {
    return (
      <Link
        href="/login"
        aria-label="Account Login"
        className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high"
      >
        <Icon name="person" className="text-[22px]" />
      </Link>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Link
        href="/login"
        aria-label="Account Login"
        className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary active:scale-95"
      >
        <Icon name="person" className="text-[22px]" />
      </Link>
    );
  }

  const initial = user.name ? user.name[0].toUpperCase() : "U";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen((o) => !o)}
        aria-label={`User account: ${user.name}`}
        aria-expanded={dropdownOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-roasted-terracotta text-label-md font-bold text-pure-parchment shadow-sm transition-all hover:bg-primary active:scale-95"
      >
        {initial}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-12 z-50 w-52 rounded-xl bg-pure-parchment p-3 shadow-xl border border-surface-container text-on-surface">
          <div className="border-b border-surface-container pb-2 px-2">
            <p className="text-label-sm font-bold truncate">{user.name}</p>
            <p className="text-label-xs text-on-surface-variant truncate">{user.email}</p>
          </div>
          <div className="pt-2 space-y-1 text-label-sm">
            <Link
              href="/cart"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-surface-container transition-colors"
            >
              <Icon name="shopping_bag" className="text-[18px] text-primary" />
              <span>Shopping Cart</span>
            </Link>
            <Link
              href="/shop"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-surface-container transition-colors"
            >
              <Icon name="storefront" className="text-[18px] text-secondary" />
              <span>Shop Products</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                setDropdownOpen(false);
                showToast("Logged out of account");
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-error hover:bg-error-container/20 transition-colors text-left"
            >
              <Icon name="logout" className="text-[18px]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
