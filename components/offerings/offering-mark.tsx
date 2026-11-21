import Image from "next/image";
import "./offerings.css";

export function OfferingMark() {
  return (
    <Image
      className="offering-mark"
      src="/images/offerings/boyar-partners.png"
      alt="Boyar Partners"
      width={96}
      height={32}
      loading="eager"
      unoptimized
    />
  );
}
