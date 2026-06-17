import type { Metadata } from "next";
import { MijuBlogIndex } from "@/components/miju-blog";

export const metadata: Metadata = {
  title: {
    absolute: "Min Beauty Blog - Kiến thức làm đẹp trước khi tư vấn",
  },
  description:
    "Blog Min Beauty với kiến thức về môi baby, filler, meso, chăm sóc da và lưu ý sau dịch vụ.",
};

export default function BlogPage() {
  return <MijuBlogIndex />;
}
