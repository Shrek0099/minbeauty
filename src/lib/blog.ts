export type BlogCategory = {
  slug: string;
  title: string;
  description: string;
};

export type BlogSection = {
  heading: string;
  body: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  sections: BlogSection[];
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
};

export const blogCategories: BlogCategory[] = [
  {
    slug: "moi-baby",
    title: "Môi baby",
    description: "Kiến thức trước và sau khi tư vấn dáng môi baby tự nhiên, mềm mại.",
  },
  {
    slug: "filler",
    title: "Filler",
    description: "Thông tin tham khảo về filler, làm đầy và cân đối gương mặt.",
  },
  {
    slug: "cham-soc-da",
    title: "Chăm sóc da",
    description: "Gợi ý chăm sóc da, meso và duy trì làn da khỏe theo tình trạng thực tế.",
  },
  {
    slug: "cham-soc-sau-dich-vu",
    title: "Chăm sóc sau dịch vụ",
    description: "Các lưu ý chăm sóc sau khi thực hiện filler, môi và liệu trình da.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "moi-baby-la-gi",
    title: "Môi Baby là gì? Những điều nên biết trước khi thực hiện",
    excerpt:
      "Môi Baby hướng đến dáng môi mềm mại, tự nhiên và hài hòa với gương mặt. Trước khi thực hiện, bạn nên được tư vấn kỹ về dáng môi, chất liệu và cách chăm sóc sau dịch vụ.",
    category: "moi-baby",
    date: "2026-06-16",
    readTime: "5 phút đọc",
    tags: ["môi baby", "dáng môi", "tư vấn thẩm mỹ"],
    image: "/images/news/moi-baby-la-gi.jpg",
    seoTitle: "Môi Baby là gì? Những điều nên biết trước khi thực hiện",
    seoDescription:
      "Môi Baby hướng đến dáng môi mềm mại, tự nhiên. Tìm hiểu trước khi thực hiện tại Min Beauty, Tây Ninh.",
    status: "published",
    sections: [
      {
        heading: "Môi Baby tập trung vào sự hài hòa",
        body: [
          "Dáng môi Baby thường được yêu thích vì cảm giác mềm, căng nhẹ và không quá sắc. Mục tiêu là làm môi trông tươi hơn nhưng vẫn hợp tỷ lệ gương mặt.",
          "Không phải ai cũng cần cùng một dáng môi. Khi tư vấn, Min Beauty sẽ xem nền môi, độ dày môi, nhân trung và mong muốn của từng khách hàng.",
        ],
      },
      {
        heading: "Những điều nên hỏi trước khi làm",
        body: [
          "Bạn nên hỏi rõ về dáng môi phù hợp, lượng chất làm đầy dự kiến, thời gian ổn định và cách chăm sóc sau dịch vụ.",
          "Nếu đang có tình trạng viêm, kích ứng hoặc tiền sử dị ứng, hãy trao đổi kỹ trước khi quyết định thực hiện.",
        ],
      },
      {
        heading: "Chăm sóc sau dịch vụ",
        body: [
          "Sau khi thực hiện, bạn nên tránh tác động mạnh vào môi, hạn chế nhiệt cao và làm theo hướng dẫn chăm sóc được dặn trực tiếp.",
        ],
      },
    ],
  },
  {
    slug: "khi-nao-nen-lam-day-tang-mat-giua",
    title: "Khi nào nên làm đầy tầng mặt giữa?",
    excerpt:
      "Vùng mặt giữa có thể trông thiếu đầy đặn do cơ địa hoặc thay đổi theo thời gian. Việc tư vấn trực tiếp giúp xác định phương án phù hợp với từng gương mặt.",
    category: "filler",
    date: "2026-06-16",
    readTime: "4 phút đọc",
    tags: ["filler", "tầng mặt giữa", "cân đối gương mặt"],
    image: "/images/news/lam-day-tang-mat-giua.jpg",
    seoTitle: "Khi nào nên làm đầy tầng mặt giữa?",
    seoDescription: "Tư vấn làm đầy tầng mặt giữa tự nhiên tại Min Beauty, Tây Ninh.",
    status: "published",
    sections: [
      {
        heading: "Dấu hiệu vùng mặt giữa thiếu đầy đặn",
        body: [
          "Một số người có vùng gò má dưới hoặc rãnh giữa mặt trông thiếu mềm mại, làm tổng thể gương mặt có cảm giác mệt hoặc hốc hác.",
          "Tình trạng này có thể đến từ cơ địa, thay đổi theo thời gian hoặc sự mất cân đối giữa các vùng trên gương mặt.",
        ],
      },
      {
        heading: "Vì sao cần tư vấn trực tiếp",
        body: [
          "Làm đầy tầng mặt giữa cần dựa trên tỷ lệ gương mặt, độ lõm thực tế và mong muốn của khách hàng, không nên quyết định chỉ qua hình ảnh tham khảo.",
          "Một phương án phù hợp thường ưu tiên sự tự nhiên, tránh làm gương mặt nặng hoặc thay đổi quá nhiều so với nét sẵn có.",
        ],
      },
    ],
  },
  {
    slug: "meso-ho-tro-cham-soc-da",
    title: "Meso hỗ trợ chăm sóc da như thế nào?",
    excerpt:
      "Meso thường được nhắc đến trong các liệu trình hỗ trợ cấp ẩm, làm sáng và cải thiện bề mặt da. Hiệu quả có thể khác nhau tùy tình trạng da và cách chăm sóc sau liệu trình.",
    category: "cham-soc-da",
    date: "2026-06-16",
    readTime: "4 phút đọc",
    tags: ["meso", "chăm sóc da", "cấp ẩm"],
    image: "/images/news/meso-cham-soc-da.jpg",
    seoTitle: "Meso hỗ trợ chăm sóc da như thế nào?",
    seoDescription: "Tìm hiểu liệu trình meso chăm sóc da tại Min Beauty, Hòa Thành, Tây Ninh.",
    status: "published",
    sections: [
      {
        heading: "Meso thường được chọn khi nào",
        body: [
          "Meso có thể được tư vấn khi da thiếu ẩm, bề mặt kém mịn hoặc cần một liệu trình hỗ trợ chăm sóc da chuyên sâu hơn chăm sóc tại nhà.",
          "Tình trạng da mỗi người khác nhau, vì vậy nên được xem da và hỏi kỹ về thói quen chăm sóc trước khi chọn liệu trình.",
        ],
      },
      {
        heading: "Kết quả phụ thuộc vào chăm sóc sau liệu trình",
        body: [
          "Sau liệu trình, việc chống nắng, dưỡng ẩm, làm sạch nhẹ nhàng và tuân thủ hướng dẫn chăm sóc ảnh hưởng nhiều đến cảm giác da ổn định.",
          "Bạn không nên tự phối quá nhiều hoạt chất mạnh ngay sau khi làm nếu chưa được hướng dẫn.",
        ],
      },
    ],
  },
  {
    slug: "cham-soc-sau-filler",
    title: "Chăm sóc sau filler: những điều nên lưu ý",
    excerpt:
      "Sau khi thực hiện filler, bạn nên tuân thủ hướng dẫn chăm sóc, tránh tác động mạnh vào vùng vừa làm và theo dõi tình trạng theo lời dặn của chuyên viên.",
    category: "cham-soc-sau-dich-vu",
    date: "2026-06-16",
    readTime: "4 phút đọc",
    tags: ["chăm sóc sau filler", "filler", "lưu ý sau dịch vụ"],
    image: "/images/news/cham-soc-sau-filler.jpg",
    seoTitle: "Chăm sóc sau filler: những điều nên lưu ý",
    seoDescription: "Hướng dẫn chăm sóc sau filler tại Min Beauty. Lưu ý quan trọng sau dịch vụ.",
    status: "published",
    sections: [
      {
        heading: "Những việc nên tránh trong thời gian đầu",
        body: [
          "Bạn nên tránh tác động mạnh, massage tùy ý hoặc dùng nhiệt cao lên vùng vừa thực hiện trong thời gian đầu.",
          "Nếu có lịch chăm sóc da, xông hơi hoặc hoạt động thể thao cường độ cao, hãy hỏi lại chuyên viên về thời điểm phù hợp.",
        ],
      },
      {
        heading: "Theo dõi phản ứng của cơ thể",
        body: [
          "Một số cảm giác căng nhẹ hoặc thay đổi ban đầu có thể xuất hiện tùy cơ địa. Điều quan trọng là theo dõi đúng hướng dẫn và liên hệ cơ sở nếu có dấu hiệu bất thường.",
        ],
      },
    ],
  },
  {
    slug: "hieu-lam-ve-filler",
    title: "Những hiểu lầm thường gặp về filler",
    excerpt:
      "Filler không phải lúc nào cũng cần làm nhiều mới đẹp. Kết quả tự nhiên thường đến từ việc lựa chọn lượng phù hợp và cân đối với tổng thể gương mặt.",
    category: "filler",
    date: "2026-06-16",
    readTime: "4 phút đọc",
    tags: ["filler", "làm đẹp tự nhiên", "tư vấn filler"],
    image: "/images/news/hieu-lam-ve-filler.jpg",
    seoTitle: "Những hiểu lầm thường gặp về filler",
    seoDescription: "Giải đáp hiểu lầm về filler — tư vấn tự nhiên tại Min Beauty, Tây Ninh.",
    status: "published",
    sections: [
      {
        heading: "Không phải cứ nhiều là đẹp",
        body: [
          "Một kết quả hài hòa thường đến từ lượng phù hợp và vị trí phù hợp. Làm quá nhiều có thể khiến gương mặt mất tự nhiên.",
          "Tư vấn kỹ trước khi thực hiện giúp xác định vùng nào thật sự cần cải thiện và vùng nào nên giữ nguyên.",
        ],
      },
      {
        heading: "Filler không thay thế mọi phương án",
        body: [
          "Tùy tình trạng, có trường hợp nên chăm sóc da, điều chỉnh thói quen sinh hoạt hoặc chọn phương án khác thay vì chỉ nghĩ đến filler.",
        ],
      },
    ],
  },
  {
    slug: "duy-tri-da-khoe-manh",
    title: "Làm sao để duy trì làn da khỏe mạnh mỗi ngày?",
    excerpt:
      "Làm sạch, dưỡng ẩm, chống nắng và sinh hoạt điều độ là nền tảng quan trọng để duy trì làn da khỏe. Các liệu trình chăm sóc nên được lựa chọn theo tình trạng da thực tế.",
    category: "cham-soc-da",
    date: "2026-06-16",
    readTime: "5 phút đọc",
    tags: ["chăm sóc da", "da khỏe", "routine skincare"],
    image: "/images/news/duy-tri-lan-da-khoe.jpg",
    seoTitle: "Làm sao để duy trì làn da khỏe mạnh mỗi ngày?",
    seoDescription: "Bí quyết duy trì da khỏe mỗi ngày — gợi ý từ Min Beauty, Tây Ninh.",
    status: "published",
    sections: [
      {
        heading: "Nền tảng bắt đầu từ thói quen hằng ngày",
        body: [
          "Làm sạch nhẹ nhàng, dưỡng ẩm đủ và chống nắng đều đặn là ba bước cơ bản giúp da ổn định hơn theo thời gian.",
          "Giấc ngủ, nước uống và cách sinh hoạt cũng ảnh hưởng đến độ tươi của làn da, đặc biệt với da dễ mệt hoặc thiếu ẩm.",
        ],
      },
      {
        heading: "Chọn liệu trình theo tình trạng da",
        body: [
          "Không phải làn da nào cũng cần cùng một liệu trình. Việc xem da và trao đổi thói quen chăm sóc giúp chọn phương án phù hợp hơn.",
        ],
      },
    ],
  },
];

export function getPublishedPosts() {
  return blogPosts.filter((post) => post.status === "published");
}

export function getCategory(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}

export function getCategoryPosts(slug: string) {
  return getPublishedPosts().filter((post) => post.category === slug);
}

export function getPost(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost) {
  return getPublishedPosts()
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3);
}
