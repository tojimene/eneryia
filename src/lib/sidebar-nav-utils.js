function collectCollapsibleIds(items, path = "") {
  const ids = [];
  for (const item of items) {
    if (!item.children?.length) continue;
    const id = path ? `${path}/${item.title}` : item.title;
    ids.push(id);
    ids.push(...collectCollapsibleIds(item.children, id));
  }
  return ids;
}

export function getCollapsibleIdsFromNavigation(navigationTree) {
  return navigationTree.flatMap((section) =>
    collectCollapsibleIds(section.items)
  );
}

function hasActiveDescendant(item, pathname) {
  if (item.href && pathname.startsWith(item.href)) return true;
  if (!item.children?.length) return false;
  return item.children.some((child) => hasActiveDescendant(child, pathname));
}

function collectOpenIdsForPath(items, pathname, path = "") {
  const ids = [];
  for (const item of items) {
    if (!item.children?.length) continue;
    const id = path ? `${path}/${item.title}` : item.title;
    if (hasActiveDescendant(item, pathname)) {
      ids.push(id);
      ids.push(...collectOpenIdsForPath(item.children, pathname, id));
    }
  }
  return ids;
}

export function getOpenIdsForPathname(navigationTree, pathname) {
  return navigationTree.flatMap((section) =>
    collectOpenIdsForPath(section.items, pathname)
  );
}

export function buildOpenStateFromIds(ids) {
  return ids.reduce((acc, id) => {
    acc[id] = true;
    return acc;
  }, {});
}
