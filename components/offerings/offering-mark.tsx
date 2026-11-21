import Image from "next/image";
import "./offerings.css";

export function OfferingMark() {
  return (
    <div className="offering-brand">
      <Image
        src="/images/offerings/boyar-partners.png"
        alt="Boyar Partners — Boutique Cross-Border & Transaction Advisory"
        width={758}
        height={196}
        loading="eager"
        unoptimized
      />
    </div>
  );
}
