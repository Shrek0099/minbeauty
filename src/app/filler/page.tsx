import type { Metadata } from "next";
import { MijuCategoryPage } from "@/components/miju-blog";
import { getCategory } from "@/lib/blog";

const category = getCategory("filler");

export const metadata: Metadata = {
  title: {
    absolute: `${category?.title} | Min Beauty Blog`,
  },
  description: category?.description,
};

export default function FillerCategoryPage() {
  return <MijuCategoryPage categorySlug="filler" />;
}
