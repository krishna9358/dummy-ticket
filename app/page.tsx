import BookingProcess from "@/components/booking-process";
import CallToActionSection from "@/components/cta-section";
// import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection2";
// import Navbar from "@/components/Navbar";
import PricingSection from "@/components/pricing-footer";
import ServiceBenefits from "@/components/service-benefits";


export default function Home() {
  return (
    <div >
      {/* <Navbar />  */}
      <HeroSection />
      <BookingProcess />
      {/* <ClientSection /> */}
      <PricingSection />
      <ServiceBenefits />
      <CallToActionSection />
      {/* <Footer /> */}
    </div>
  );
}
