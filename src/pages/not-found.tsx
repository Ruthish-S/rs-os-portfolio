export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0A] text-[#F2F2F0] px-6">
      <div className="text-center font-mono">
        <div className="text-[#E85002] text-xs tracking-[0.2em] mb-6">
          RS.OS · ERROR_LOG
        </div>
        <h1 className="font-display font-extrabold text-7xl md:text-9xl tracking-tighter mb-4">
          404
        </h1>
        <p className="text-[#A0A09C] text-sm tracking-wide mb-10">
          ROUTE_NOT_FOUND — requested path does not exist in the system index.
        </p>
        <a
          href="/"
          className="inline-block bg-[#E85002] hover:bg-[#C44000] text-white px-6 py-3 text-xs tracking-widest uppercase transition-colors"
        >
          [Return to Root]
        </a>
      </div>
    </div>
  );
}
