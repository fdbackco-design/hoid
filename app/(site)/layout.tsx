import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-[72px] md:mt-[90px]">{children}</main>
      <Footer />
    </>
  );
}
