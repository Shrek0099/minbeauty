import type { Metadata } from "next";
import { MijuCategoryPage } from "@/components/miju-blog";
import { getCategory } from "@/lib/blog";

const category = getCategory("cham-soc-da");

export const metadata: Metadata = {
  title: {
    absolute: `${category?.title} | Min Beauty Blog`,
  },
  description: category?.description,
};

export default function SkinCareCategoryPage() {
  return <MijuCategoryPage categorySlug="cham-soc-da" />;
}
