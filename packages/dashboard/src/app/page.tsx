import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] w-full pt-32">
      <Header />
      <Main className="flex-grow" />
      <Footer className="mt-auto mb-8" />
    </div>
  );
}
