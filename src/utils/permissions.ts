export type UserRole = 'Admin' | 'Analyst';

export type TabType =
  | 'dashboard'
  | 'cluster'
  | 'ml'
  | 'ingestion'
  | 'streaming'
  | 'support'
  | 'docs';

/** Tabs each role may open in the portal sidebar. */
export const TAB_PERMISSIONS: Record<TabType, UserRole[]> = {
  dashboard: ['Admin', 'Analyst'],
  cluster: ['Admin'],
  ml: ['Admin', 'Analyst'],
  ingestion: ['Admin'],
  streaming: ['Admin', 'Analyst'],
  support: ['Admin', 'Analyst'],
  docs: ['Admin', 'Analyst'],
};

export const canAccessTab = (role: UserRole, tab: TabType): boolean =>
  TAB_PERMISSIONS[tab].includes(role);

export const getAllowedTabs = (role: UserRole): TabType[] =>
  (Object.keys(TAB_PERMISSIONS) as TabType[]).filter((tab) => canAccessTab(role, tab));

export const getDefaultTabForRole = (role: UserRole): TabType =>
  getAllowedTabs(role)[0] ?? 'dashboard';
