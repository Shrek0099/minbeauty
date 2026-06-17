import type { Metadata } from "next";
import { MijuCategoryPage } from "@/components/miju-blog";
import { getCategory } from "@/lib/blog";

const category = getCategory("cham-soc-sau-dich-vu");

export const metadata: Metadata = {
  title: {
    absolute: `${category?.title} | Min Beauty Blog`,
  },
  description: category?.description,
};

export default function AftercareCategoryPage() {
  return <MijuCategoryPage categorySlug="cham-soc-sau-dich-vu" />;
}
