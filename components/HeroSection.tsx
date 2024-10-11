import GridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export  default function  HeroSection () {
return <div>
    
    <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
</div>
}