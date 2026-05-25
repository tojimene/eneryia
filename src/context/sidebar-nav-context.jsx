"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/navigation";
import {
  buildOpenStateFromIds,
  getCollapsibleIdsFromNavigation,
  getOpenIdsForPathname,
} from "@/lib/sidebar-nav-utils";

const SidebarNavContext = createContext(null);

const COLLAPSIBLE_IDS = getCollapsibleIdsFromNavigation(navigation);

export function SidebarNavProvider({ children }) {
  const pathname = usePathname();
  const [openState, setOpenState] = useState(() =>
    buildOpenStateFromIds(getOpenIdsForPathname(navigation, pathname))
  );
  const [userCollapsed, setUserCollapsed] = useState(false);

  useEffect(() => {
    if (userCollapsed) return;
    const activeIds = getOpenIdsForPathname(navigation, pathname);
    setOpenState((prev) => {
      const next = { ...prev };
      for (const id of activeIds) next[id] = true;
      return next;
    });
  }, [pathname, userCollapsed]);

  const setItemOpen = useCallback((id, isOpen) => {
    setOpenState((prev) => {
      if (prev[id] === isOpen) return prev;
      return { ...prev, [id]: isOpen };
    });
    if (isOpen) setUserCollapsed(false);
  }, []);

  const isItemOpen = useCallback(
    (id) => Boolean(openState[id]),
    [openState]
  );

  const openCount = useMemo(
    () => COLLAPSIBLE_IDS.filter((id) => openState[id]).length,
    [openState]
  );

  const allExpanded =
    COLLAPSIBLE_IDS.length > 0 && openCount >= COLLAPSIBLE_IDS.length;

  const hasAnyOpen = openCount > 0;

  const collapseAll = useCallback(() => {
    setUserCollapsed(true);
    setOpenState({});
  }, []);

  const value = useMemo(
    () => ({
      isItemOpen,
      setItemOpen,
      collapseAll,
      allExpanded,
      hasAnyOpen,
      openCount,
      totalCollapsibles: COLLAPSIBLE_IDS.length,
    }),
    [
      isItemOpen,
      setItemOpen,
      collapseAll,
      allExpanded,
      hasAnyOpen,
      openCount,
    ]
  );

  return (
    <SidebarNavContext.Provider value={value}>
      {children}
    </SidebarNavContext.Provider>
  );
}

export function useSidebarNavOptional() {
  return useContext(SidebarNavContext);
}
