// Admin route group — no shared layout wrapper needed at this level
// Each sub-route (dashboard, login) provides its own layout
export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
