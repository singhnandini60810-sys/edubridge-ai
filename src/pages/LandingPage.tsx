import { BookOpen, Mic, Sparkles, Volume2 } from "lucide-react";
import Navbar from "../components/Navbar";
import TranslatorPage from "./TranslatorPage";
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <section className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              AI-assisted learning for rural classrooms
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
              Translate lessons with text, voice, and AI support.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              EduBridge AI helps teachers and students understand lessons in their preferred
              language using typing translation, microphone input, speech output, and saved
              learning history.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#translator"
                className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
              >
                Start Translating
              </a>

              <a
                href="#dashboards"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
              >
                View Dashboards
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-sky-50 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Live Classroom Demo</p>
                  <h3 className="text-2xl font-bold text-slate-900">Teacher Translator</h3>
                </div>
                <Sparkles className="text-emerald-600" />
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-slate-400">INPUT</p>
                  <p className="mt-2 text-slate-700">Water cycle explains how water moves...</p>
                </div>

                <div className="rounded-2xl bg-emerald-600 p-4 text-white shadow-sm">
                  <p className="text-xs font-semibold text-emerald-100">TRANSLATED OUTPUT</p>
                  <p className="mt-2">जल चक्र बताता है कि पानी कैसे चलता है...</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <Mic className="mx-auto text-sky-600" />
                    <p className="mt-2 text-xs font-bold text-slate-600">Speak</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <Volume2 className="mx-auto text-emerald-600" />
                    <p className="mt-2 text-xs font-bold text-slate-600">Listen</p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <BookOpen className="mx-auto text-orange-500" />
                    <p className="mt-2 text-xs font-bold text-slate-600">Save</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TranslatorPage />
      </main>
    </div>
  );
};

export default LandingPage;