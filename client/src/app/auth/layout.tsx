export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-100">
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
