import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div
      className={cn("flex items-center text-warm-amber", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const name = rating >= i + 1 ? "star" : rating > i ? "star_half" : "star";
        return (
          <Icon key={i} name={name} filled={rating > i} className="text-[18px]" />
        );
      })}
    </div>
  );
}
