import BookingProcess from "@/components/booking-process";
import ClientSection from "@/components/client-section";
import CallToActionSection from "@/components/cta-section";
import HeroSection from "@/components/HeroSection2";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/pricing-footer";
import ServiceBenefits from "@/components/service-benefits";


export default function Home() {
  return (
    <div >
      <Navbar /> 
      <HeroSection />
      <BookingProcess />
      <ClientSection />
      <ServiceBenefits />
      <CallToActionSection />
      <PricingSection />
      
    </div>
  );
}
