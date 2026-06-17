import iconAsset from "@/assets/barry-bee-icon.asset.json";
import stackedAsset from "@/assets/barry-bee-stacked.asset.json";

export const LOGO_ICON = iconAsset.url;
export const LOGO_STACKED = stackedAsset.url;

export const SITE = {
  name: "Barry Bee Auto",
  tagline: "Driven by Trust. Delivering Excellence.",
  shortTag: "Benin City's Trusted Car Dealer",
  address: "Besides Doctors House, Ugbowo Lagos Road, Benin City, Edo State, Nigeria",
  phone1: "08063662031",
  phone2: "09066074181",
  wa1: "2348063662031",
  wa2: "2349066074181",
  mapsQuery: "Doctors House Ugbowo Lagos Road Benin City",
};

export const WA_LINK = `https://wa.me/${SITE.wa1}`;
export const WA_LINK2 = `https://wa.me/${SITE.wa2}`;
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
