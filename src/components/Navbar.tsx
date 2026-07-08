import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <GraduationCap size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">EduBridge AI</h1>
            <p className="text-xs text-slate-500">Rural Learning Translator</p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
            Features
          </a>
          <a href="#dashboards" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
            Dashboards
          </a>
          <a href="#translator" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
            Translator
          </a>
        </div>

        <a
          href="#translator"
          className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Try Demo
        </a>
      </nav>
    </header>
  );
};

export default Navbar;