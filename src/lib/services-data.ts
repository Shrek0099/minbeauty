export type ServiceFaq = { question: string; answer: string };
export type ServiceSection = { heading: string; paragraphs: string[] };

export type ServiceData = {
  id: string;
  slug: string;
  title: string;
  category: "cosmetic";
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  intro: string;
  sections: ServiceSection[];
  whoFor: string[];
  process: string[];
  aftercare: string[];
  faqs: ServiceFaq[];
  relatedPostSlugs: string[];
  isActive: boolean;
  order: number;
};

const sharedProcess = [
  "Gửi hình qua Zalo hoặc đến trực tiếp cơ sở tại Hòa Thành, Tây Ninh.",
  "Trao đổi mong muốn và xem tình trạng thực tế trước khi đề xuất phương án.",
  "Thống nhất dịch vụ, mức độ thực hiện và lịch hẹn phù hợp.",
  "Thực hiện dịch vụ và hướng dẫn chăm sóc sau tại nhà.",
];

export const servicesData: ServiceData[] = [
  {
    id: "moi-baby",
    slug: "moi-baby",
    title: "Tiêm môi baby",
    category: "cosmetic",
    shortDescription: "Tư vấn dáng môi mềm mại, tự nhiên và hài hòa với gương mặt tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Tiêm môi baby Tây Ninh — Tư vấn dáng môi tự nhiên tại Min Beauty",
    seoDescription:
      "Dịch vụ tiêm môi baby tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn dáng môi mềm, tự nhiên theo từng gương mặt. Đặt lịch 0971.700.952.",
    heroImage: "/images/services/moi-baby.jpg",
    intro:
      "Môi baby hướng đến cảm giác môi căng nhẹ, mềm và hài hòa với tổng thể gương mặt. Tại Min Beauty, mỗi khách hàng được tư vấn dựa trên nền môi, độ dày môi, nhân trung và mong muốn thực tế — không áp dụng một dáng môi cố định cho tất cả.",
    sections: [
      {
        heading: "Môi baby tập trung vào sự tự nhiên",
        paragraphs: [
          "Dáng môi baby thường được yêu thích vì cảm giác tươi, mềm và không quá sắc. Mục tiêu là làm môi trông đầy đặn hơn nhưng vẫn giữ được nét riêng của từng gương mặt.",
          "Không phải ai cũng cần cùng một độ căng hay cùng một hình dáng. Khi tư vấn, chúng tôi xem xét tỷ lệ môi-trên-mặt, đường viền môi và thói quen trang điểm hằng ngày.",
        ],
      },
      {
        heading: "Quy trình tư vấn tại Min Beauty",
        paragraphs: [
          "Bạn có thể gửi hình môi qua Zalo để được tham khảo sơ bộ, hoặc đến trực tiếp để được xem kỹ hơn. Buổi tư vấn giúp làm rõ dáng môi phù hợp, lượng chất làm đầy dự kiến và thời gian ổn định.",
          "Nếu đang có tình trạng viêm, kích ứng hoặc tiền sử dị ứng, hãy trao đổi kỹ trước khi quyết định thực hiện.",
        ],
      },
    ],
    whoFor: [
      "Người muốn môi trông mềm, căng nhẹ và tự nhiên hơn.",
      "Khách hàng cần tư vấn dáng môi phù hợp với gương mặt, không theo trend chung.",
      "Người ở Hòa Thành, Tây Ninh và khu vực lân cận muốn được tư vấn trực tiếp.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tránh tác động mạnh vào môi trong thời gian đầu.",
      "Hạn chế nhiệt cao, đồ uống quá nóng và trang điểm nặng nếu chưa được hướng dẫn.",
      "Theo dõi tình trạng môi và liên hệ cơ sở nếu có dấu hiệu bất thường.",
    ],
    faqs: [
      {
        question: "Môi baby có phù hợp với mọi gương mặt không?",
        answer: "Không phải dáng môi nào cũng hợp mọi người. Cần tư vấn dựa trên tỷ lệ gương mặt và nền môi thực tế.",
      },
      {
        question: "Cần chuẩn bị gì trước khi đến tư vấn?",
        answer: "Bạn có thể gửi hình môi không filter qua Zalo hoặc đến trực tiếp. Nên trao đổi tiền sử dị ứng nếu có.",
      },
      {
        question: "Sau khi làm môi baby cần lưu ý gì?",
        answer: "Tuân thủ hướng dẫn chăm sóc, tránh va chạm mạnh và theo dõi phản ứng của môi theo lời dặn.",
      },
    ],
    relatedPostSlugs: ["moi-baby-la-gi", "cham-soc-sau-filler"],
    isActive: true,
    order: 1,
  },
  {
    id: "nang-tang-mat-giua",
    slug: "nang-tang-mat-giua",
    title: "Nâng tầng mặt giữa",
    category: "cosmetic",
    shortDescription: "Tư vấn làm đầy tầng mặt giữa, cân đối gương mặt tự nhiên tại Min Beauty, Tây Ninh.",
    seoTitle: "Nâng tầng mặt giữa Tây Ninh — Filler cân đối gương mặt",
    seoDescription:
      "Dịch vụ nâng tầng mặt giữa tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn làm đầy vùng mặt giữa tự nhiên, hài hòa. Gọi 0971.700.952.",
    heroImage: "/images/services/nang-tang-mat-giua.jpg",
    intro:
      "Vùng mặt giữa có thể trông thiếu đầy đặn do cơ địa hoặc thay đổi theo thời gian. Dịch vụ nâng tầng mặt giữa tại Min Beauty tập trung vào sự cân đối tổng thể — ưu tiên kết quả tự nhiên thay vì thay đổi quá nhiều so với nét sẵn có.",
    sections: [
      {
        heading: "Khi nào nên xem xét nâng tầng mặt giữa",
        paragraphs: [
          "Một số người có vùng gò má dưới hoặc rãnh giữa mặt trông thiếu mềm mại, làm tổng thể gương mặt có cảm giác mệt hoặc hốc hác.",
          "Tình trạng này có thể đến từ cơ địa, thay đổi theo thời gian hoặc sự mất cân đối giữa các vùng trên gương mặt.",
        ],
      },
      {
        heading: "Vì sao cần tư vấn trực tiếp",
        paragraphs: [
          "Làm đầy tầng mặt giữa cần dựa trên tỷ lệ gương mặt, độ lõm thực tế và mong muốn của khách hàng.",
          "Một phương án phù hợp thường ưu tiên sự tự nhiên, tránh làm gương mặt nặng hoặc thay đổi quá nhiều.",
        ],
      },
    ],
    whoFor: [
      "Người cảm thấy vùng mặt giữa thiếu đầy đặn, gương mặt trông hốc hác.",
      "Khách hàng muốn cân đối tổng thể gương mặt mà không thay đổi quá nhiều.",
      "Người cần tư vấn trực tiếp trước khi quyết định filler.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tránh tác động mạnh vào vùng vừa thực hiện.",
      "Hạn chế nhiệt cao, xông hơi trong thời gian đầu nếu chưa được cho phép.",
      "Theo dõi và liên hệ cơ sở nếu có dấu hiệu bất thường.",
    ],
    faqs: [
      {
        question: "Nâng tầng mặt giữa có đau không?",
        answer: "Mức độ cảm giác khác nhau tùy cơ địa. Chúng tôi sẽ trao đổi kỹ trước khi thực hiện.",
      },
      {
        question: "Kết quả có tự nhiên không?",
        answer: "Mục tiêu là cân đối và tự nhiên. Lượng và vị trí thực hiện được tư vấn theo từng gương mặt.",
      },
      {
        question: "Cần bao lâu để ổn định?",
        answer: "Thời gian ổn định khác nhau tùy cơ địa. Bạn sẽ được hướng dẫn theo dõi sau dịch vụ.",
      },
    ],
    relatedPostSlugs: ["khi-nao-nen-lam-day-tang-mat-giua", "hieu-lam-ve-filler"],
    isActive: true,
    order: 2,
  },
  {
    id: "bong-mat-cuoi",
    slug: "bong-mat-cuoi",
    title: "Bọng mắt cười",
    category: "cosmetic",
    shortDescription: "Tạo điểm nhấn vùng mắt trẻ trung, tự nhiên tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Bọng mắt cười Tây Ninh — Tư vấn filler vùng mắt",
    seoDescription:
      "Dịch vụ bọng mắt cười tại Min Beauty, Tây Ninh. Tư vấn tạo điểm nhấn vùng mắt trẻ trung, hài hòa. Liên hệ 0971.700.952.",
    heroImage: "/images/services/bong-mat-cuoi.jpg",
    intro:
      "Bọng mắt cười là điểm nhấn giúp gương mặt trông tươi và thân thiện hơn khi được cân đối đúng cách. Tại Min Beauty, chúng tôi tư vấn dựa trên cấu trúc vùng mắt, nếp cười và tổng thể gương mặt để tránh làm vùng mắt trông nặng hoặc không tự nhiên.",
    sections: [
      {
        heading: "Bọng mắt cười phù hợp khi nào",
        paragraphs: [
          "Một số khách hàng muốn vùng mắt trông tươi hơn, có điểm nhấn khi cười mà vẫn giữ được nét tự nhiên.",
          "Việc tư vấn trực tiếp giúp xác định mức độ và vị trí phù hợp, tránh làm quá nhiều so với cấu trúc gương mặt.",
        ],
      },
    ],
    whoFor: [
      "Người muốn vùng mắt trông tươi, trẻ trung hơn khi cười.",
      "Khách hàng cần tư vấn cân đối vùng mắt với tổng thể gương mặt.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tránh chà xát mạnh vùng mắt.",
      "Hạn chế trang điểm nặng vùng mắt trong thời gian đầu.",
      "Theo dõi theo hướng dẫn chăm sóc sau dịch vụ.",
    ],
    faqs: [
      {
        question: "Bọng mắt cười có làm mắt trông sưng không?",
        answer: "Một số cảm giác căng nhẹ có thể xuất hiện tùy cơ địa. Chúng tôi sẽ hướng dẫn theo dõi sau dịch vụ.",
      },
      {
        question: "Có cần tư vấn trước không?",
        answer: "Có. Vùng mắt nhạy cảm, cần xem cấu trúc thực tế trước khi đề xuất phương án.",
      },
    ],
    relatedPostSlugs: ["hieu-lam-ve-filler"],
    isActive: true,
    order: 3,
  },
  {
    id: "lam-day-tran-hom",
    slug: "lam-day-tran-hom",
    title: "Làm đầy trán hỏm, trán baby",
    category: "cosmetic",
    shortDescription: "Tư vấn cải thiện vùng trán thiếu đầy, cân đối gương mặt tại Min Beauty, Tây Ninh.",
    seoTitle: "Làm đầy trán hỏm, trán baby Tây Ninh — Filler trán tự nhiên",
    seoDescription:
      "Dịch vụ làm đầy trán hỏm, trán baby tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn cải thiện vùng trán tự nhiên. Đặt lịch 0971.700.952.",
    heroImage: "/images/services/lam-day-tran-hom.jpg",
    intro:
      "Trán hỏm hoặc trán thiếu đầy có thể làm tổng thể gương mặt trông thiếu cân đối. Dịch vụ làm đầy trán hỏm, trán baby tại Min Beauty tập trung vào việc tạo độ mềm mại cho vùng trán mà vẫn giữ được tỷ lệ tự nhiên giữa trán, mũi và vùng mắt.",
    sections: [
      {
        heading: "Trán hỏm ảnh hưởng đến tổng thể gương mặt",
        paragraphs: [
          "Vùng trán là một phần quan trọng trong tỷ lệ gương mặt. Khi trán thiếu đầy, gương mặt có thể trông cứng hoặc thiếu hài hòa.",
          "Tư vấn trực tiếp giúp xác định mức độ cần cải thiện và tránh làm trán trông quá cao hoặc không tự nhiên.",
        ],
      },
    ],
    whoFor: [
      "Người có vùng trán lõm, thiếu đầy đặn từ góc nhìn nghiêng.",
      "Khách hàng muốn cân đối tỷ lệ trán-mắt-mũi.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tránh tác động mạnh vùng trán.",
      "Ngủ nằm ngửa nếu được khuyên trong thời gian đầu.",
      "Liên hệ cơ sở nếu có dấu hiệu bất thường.",
    ],
    faqs: [
      {
        question: "Làm đầy trán có thay đổi nhiều không?",
        answer: "Mục tiêu là cải thiện vừa đủ, tự nhiên. Mức độ được tư vấn theo từng gương mặt.",
      },
      {
        question: "Có cần nghỉ dưỡng lâu không?",
        answer: "Thời gian hồi phục khác nhau tùy cơ địa. Bạn sẽ được hướng dẫn cụ thể sau dịch vụ.",
      },
    ],
    relatedPostSlugs: ["khi-nao-nen-lam-day-tang-mat-giua"],
    isActive: true,
    order: 4,
  },
  {
    id: "meso",
    slug: "meso",
    title: "Meso căng bóng",
    category: "cosmetic",
    shortDescription:
      "Liệu trình meso căng bóng hỗ trợ cấp ẩm, làm sáng và cải thiện bề mặt da tại Min Beauty, Tây Ninh.",
    seoTitle: "Meso căng bóng Tây Ninh — Liệu trình chăm sóc da tại Min Beauty",
    seoDescription:
      "Dịch vụ meso căng bóng tại Min Beauty, Hòa Thành, Tây Ninh. Hỗ trợ cấp ẩm, làm sáng và cải thiện bề mặt da. Tư vấn 0971.700.952.",
    heroImage: "/images/services/meso.jpg",
    intro:
      "Meso căng bóng thường được chọn khi da thiếu ẩm, bề mặt kém mịn hoặc cần liệu trình chăm sóc chuyên sâu hơn routine tại nhà. Tại Min Beauty, liệu trình được tư vấn theo tình trạng da thực tế — không áp dụng một phác đồ chung cho mọi người.",
    sections: [
      {
        heading: "Meso hỗ trợ da như thế nào",
        paragraphs: [
          "Meso có thể hỗ trợ cấp ẩm, cải thiện độ mịn và làm da trông tươi hơn khi kết hợp chăm sóc đúng cách.",
          "Hiệu quả phụ thuộc vào tình trạng da, thói quen chăm sóc và việc tuân thủ hướng dẫn sau liệu trình.",
        ],
      },
    ],
    whoFor: [
      "Da thiếu ẩm, bề mặt kém mịn hoặc trông mệt.",
      "Người muốn liệu trình chăm sóc da chuyên sâu hơn skincare tại nhà.",
    ],
    process: sharedProcess,
    aftercare: [
      "Chống nắng kỹ và dưỡng ẩm theo hướng dẫn.",
      "Tránh tự phối hoạt chất mạnh nếu chưa được tư vấn.",
      "Theo dõi phản ứng da và liên hệ cơ sở khi cần.",
    ],
    faqs: [
      {
        question: "Meso có phù hợp mọi loại da không?",
        answer: "Cần xem da trước khi chọn liệu trình. Một số tình trạng da cần phục hồi trước.",
      },
      {
        question: "Bao lâu thì thấy cải thiện?",
        answer: "Tùy tình trạng da và cách chăm sóc sau liệu trình. Kết quả có thể khác nhau giữa các khách hàng.",
      },
    ],
    relatedPostSlugs: ["meso-ho-tro-cham-soc-da"],
    isActive: true,
    order: 5,
  },
  {
    id: "tre-hoa-vung-mat",
    slug: "tre-hoa-vung-mat",
    title: "Xóa thâm quầng mắt + trẻ hóa vùng mắt (H.A)",
    category: "cosmetic",
    shortDescription:
      "Xóa thâm quầng mắt và trẻ hóa vùng mắt với HA tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Xóa thâm quầng mắt + trẻ hóa vùng mắt (H.A) Tây Ninh",
    seoDescription:
      "Dịch vụ xóa thâm quầng mắt và trẻ hóa vùng mắt (H.A) tại Min Beauty, Hòa Thành, Tây Ninh. Chăm sóc vùng mắt tự nhiên. Gọi 0971.700.952.",
    heroImage: "/images/services/tre-hoa-vung-mat.jpg",
    intro:
      "Vùng mắt là khu vực nhạy cảm, dễ lộ thâm quầng và dấu hiệu mệt mỏi. Liệu trình xóa thâm quầng mắt kết hợp trẻ hóa vùng mắt (H.A) tại Min Beauty được thiết kế theo tình trạng thực tế — ưu tiên sự tự nhiên và an toàn cho da mỏng quanh mắt.",
    sections: [
      {
        heading: "Vì sao vùng mắt cần chăm sóc riêng",
        paragraphs: [
          "Da quanh mắt mỏng và nhạy cảm hơn các vùng khác, cần phương án chăm sóc phù hợp.",
          "Liệu trình được tư vấn dựa trên tình trạng thực tế: thiếu ẩm, thâm, bọng mắt hoặc nếp nhăn nhẹ.",
        ],
      },
    ],
    whoFor: [
      "Người có vùng mắt trông mệt, thiếu sức sống.",
      "Khách hàng muốn chăm sóc vùng mắt chuyên sâu hơn kem mắt thông thường.",
    ],
    process: sharedProcess,
    aftercare: [
      "Chống nắng và dưỡng ẩm vùng mắt nhẹ nhàng.",
      "Tránh chà xát mạnh hoặc dùng sản phẩm kích ứng.",
      "Ngủ đủ giấc và uống đủ nước để hỗ trợ da.",
    ],
    faqs: [
      {
        question: "Trẻ hóa vùng mắt có đau không?",
        answer: "Tùy phương án được chọn. Chúng tôi sẽ trao đổi kỹ trước khi thực hiện.",
      },
      {
        question: "Bao nhiêu buổi thì đủ?",
        answer: "Số buổi phụ thuộc tình trạng da và mục tiêu. Được tư vấn sau khi xem da trực tiếp.",
      },
    ],
    relatedPostSlugs: ["duy-tri-da-khoe-manh"],
    isActive: true,
    order: 6,
  },
  {
    id: "thon-gon-ham",
    slug: "thon-gon-ham",
    title: "Thon gọn hàm, viền hàm",
    category: "cosmetic",
    shortDescription:
      "Tư vấn thon gọn hàm và viền hàm cân đối gương mặt tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Thon gọn hàm, viền hàm Tây Ninh — Tư vấn tại Min Beauty",
    seoDescription:
      "Dịch vụ thon gọn hàm, viền hàm tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn cân đối gương mặt tự nhiên. Gọi 0971.700.952.",
    heroImage: "/images/hero/min-beauty-hero.jpg",
    intro:
      "Hàm to hoặc viền hàm thiếu cân đối có thể làm gương mặt trông nặng hoặc vuông hơn mong muốn. Dịch vụ thon gọn hàm, viền hàm tại Min Beauty tập trung vào tư vấn phương án phù hợp với cấu trúc gương mặt — ưu tiên kết quả tự nhiên, hài hòa.",
    sections: [
      {
        heading: "Khi nào nên xem xét thon gọn hàm",
        paragraphs: [
          "Một số khách hàng muốn viền hàm trông mềm hơn, gương mặt cân đối hơn khi nhìn nghiêng hoặc chụp hình.",
          "Tư vấn trực tiếp giúp xác định nguyên nhân (cơ địa, cơ nhai, tỷ lệ xương hàm) và phương án phù hợp.",
        ],
      },
    ],
    whoFor: [
      "Người muốn viền hàm trông thon gọn, mềm mại hơn.",
      "Khách hàng cần tư vấn cân đối tổng thể gương mặt trước khi quyết định.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tránh nhai cứng, nhai kẹo cao su liên tục trong thời gian đầu nếu được khuyên.",
      "Massage nhẹ theo hướng dẫn nếu có.",
      "Liên hệ cơ sở nếu có dấu hiệu bất thường.",
    ],
    faqs: [
      {
        question: "Thon gọn hàm có phù hợp mọi gương mặt không?",
        answer: "Cần tư vấn dựa trên cấu trúc hàm và mong muốn thực tế. Không phải ai cũng cần cùng một phương án.",
      },
      {
        question: "Cần bao lâu để thấy thay đổi?",
        answer: "Thời gian khác nhau tùy phương án và cơ địa. Bạn sẽ được hướng dẫn theo dõi sau dịch vụ.",
      },
    ],
    relatedPostSlugs: ["hieu-lam-ve-filler"],
    isActive: true,
    order: 7,
  },
  {
    id: "thon-gon-bap-tay",
    slug: "thon-gon-bap-tay",
    title: "Thon gọn bắp tay (tan mỡ)",
    category: "cosmetic",
    shortDescription:
      "Liệu trình thon gọn bắp tay, hỗ trợ tan mỡ tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Thon gọn bắp tay (tan mỡ) Tây Ninh — Min Beauty",
    seoDescription:
      "Dịch vụ thon gọn bắp tay, tan mỡ tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn liệu trình phù hợp. Gọi 0971.700.952.",
    heroImage: "/images/hero/min-beauty-hero.jpg",
    intro:
      "Bắp tay chảy xệ hoặc tích mỡ là mối quan tâm của nhiều khách hàng, đặc biệt khi mặc áo ngắn tay. Liệu trình thon gọn bắp tay (tan mỡ) tại Min Beauty được tư vấn theo tình trạng thực tế — kết hợp hướng dẫn chăm sóc và sinh hoạt phù hợp.",
    sections: [
      {
        heading: "Thon gọn bắp tay cần tư vấn cá nhân hóa",
        paragraphs: [
          "Mức độ tích mỡ, độ đàn hồi da và thói quen sinh hoạt ảnh hưởng đến phương án phù hợp.",
          "Tư vấn trực tiếp giúp đặt kỳ vọng đúng và chọn liệu trình phù hợp với cơ địa.",
        ],
      },
    ],
    whoFor: [
      "Người muốn bắp tay trông gọn hơn, săn chắc hơn.",
      "Khách hàng quan tâm liệu trình tan mỡ vùng cánh tay.",
    ],
    process: sharedProcess,
    aftercare: [
      "Uống đủ nước và vận động nhẹ theo hướng dẫn.",
      "Tránh nhiệt cao, xông hơi nếu chưa được cho phép.",
      "Theo dõi vùng bắp tay và liên hệ cơ sở khi cần.",
    ],
    faqs: [
      {
        question: "Tan mỡ bắp tay có đau không?",
        answer: "Mức độ cảm giác khác nhau tùy liệu trình và cơ địa. Chúng tôi sẽ trao đổi kỹ trước khi thực hiện.",
      },
      {
        question: "Cần bao nhiêu buổi?",
        answer: "Số buổi phụ thuộc tình trạng và mục tiêu. Được tư vấn sau khi thăm khám trực tiếp.",
      },
    ],
    relatedPostSlugs: [],
    isActive: true,
    order: 8,
  },
  {
    id: "bap",
    slug: "bap",
    title: "BAP",
    category: "cosmetic",
    shortDescription:
      "Liệu trình BAP (Bio Aesthetic Points) với collagen Karisma L-ACE tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "BAP Tây Ninh — Liệu trình tại Min Beauty",
    seoDescription:
      "Dịch vụ BAP tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn liệu trình phù hợp từng khách hàng. Gọi 0971.700.952.",
    heroImage: "/images/services/bap.jpg",
    intro:
      "BAP (Bio Aesthetic Points) là kỹ thuật tiêm các điểm làm đẹp sinh học, thường kết hợp collagen và các hoạt chất như Karisma L-ACE để hỗ trợ căng bóng, trẻ hóa và tái tạo da từ bên trong. Tại Min Beauty, mỗi liệu trình được tư vấn theo tình trạng da và mục tiêu thực tế.",
    sections: [
      {
        heading: "BAP và collagen Karisma L-ACE",
        paragraphs: [
          "Liệu trình BAP có thể hỗ trợ da căng bóng, mịn màng hơn, kích thích sinh collagen tự nhiên và phục hồi da theo từng vùng được tư vấn.",
          "Buổi tư vấn giúp làm rõ số buổi, cách chăm sóc sau liệu trình và kỳ vọng phù hợp với tình trạng da hiện tại.",
        ],
      },
    ],
    whoFor: [
      "Khách hàng được giới thiệu hoặc quan tâm liệu trình BAP.",
      "Người muốn được tư vấn trực tiếp trước khi thực hiện.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tuân thủ hướng dẫn chăm sóc sau liệu trình.",
      "Tránh tác động mạnh vào vùng vừa thực hiện.",
      "Liên hệ cơ sở nếu có dấu hiệu bất thường.",
    ],
    faqs: [
      {
        question: "BAP là gì?",
        answer:
          "BAP (Bio Aesthetic Points) là kỹ thuật tiêm các điểm làm đẹp sinh học, thường dùng collagen như Karisma L-ACE để hỗ trợ căng bóng và trẻ hóa da. Chi tiết liệu trình sẽ được trao đổi trong buổi tư vấn trực tiếp.",
      },
      {
        question: "Có cần đặt lịch trước không?",
        answer: "Nên đặt lịch để được tư vấn và sắp xếp thời gian phù hợp. Gọi 0971.700.952 hoặc nhắn Zalo.",
      },
    ],
    relatedPostSlugs: [],
    isActive: true,
    order: 9,
  },
  {
    id: "tai-tai-loc",
    slug: "tai-tai-loc",
    title: "Tai tài lộc",
    category: "cosmetic",
    shortDescription:
      "Tư vấn tai tài lộc cân đối, hài hòa gương mặt tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Tai tài lộc Tây Ninh — Tư vấn tại Min Beauty",
    seoDescription:
      "Dịch vụ tai tài lộc tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn dáng tai hài hòa gương mặt. Đặt lịch 0971.700.952.",
    heroImage: "/images/hero/min-beauty-hero.jpg",
    intro:
      "Tai tài lộc là dịch vụ được nhiều khách hàng quan tâm khi muốn điều chỉnh hình dáng tai cho hài hòa hơn với gương mặt. Tại Min Beauty, mỗi trường hợp được tư vấn dựa trên tỷ lệ tai-mặt và mong muốn thực tế.",
    sections: [
      {
        heading: "Tai tài lộc và tỷ lệ gương mặt",
        paragraphs: [
          "Hình dáng tai ảnh hưởng đến cảm nhận tổng thể khi nhìn nghiêng và chụp hình.",
          "Tư vấn trực tiếp giúp xác định phương án phù hợp, tránh thay đổi quá mức so với nét tự nhiên.",
        ],
      },
    ],
    whoFor: [
      "Người muốn điều chỉnh hình dáng tai cho hài hòa hơn.",
      "Khách hàng cần tư vấn trực tiếp trước khi quyết định.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tránh tác động mạnh vào vùng tai trong thời gian đầu.",
      "Ngủ tránh nghiêng về phía vừa thực hiện nếu được khuyên.",
      "Theo dõi và liên hệ cơ sở nếu có dấu hiệu bất thường.",
    ],
    faqs: [
      {
        question: "Tai tài lộc có phù hợp mọi người không?",
        answer: "Cần tư vấn dựa trên hình dáng tai và tỷ lệ gương mặt. Không phải ai cũng cần cùng một phương án.",
      },
      {
        question: "Cần chuẩn bị gì trước khi đến?",
        answer: "Bạn có thể gửi hình qua Zalo hoặc đến trực tiếp. Nên trao đổi tiền sử dị ứng nếu có.",
      },
    ],
    relatedPostSlugs: [],
    isActive: true,
    order: 10,
  },
];

export function getActiveServices() {
  return servicesData.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
}

export function getServiceNavDropdown() {
  return [
    { href: "/services", label: "Tất cả dịch vụ" },
    ...getActiveServices().map((service) => ({
      href: `/services/${service.slug}`,
      label: service.title,
    })),
  ];
}

export function getServiceCards() {
  return getActiveServices().map((service) => ({
    id: service.id,
    title: service.title,
    image: service.heroImage,
  }));
}

export function getService(slug: string) {
  return servicesData.find((s) => s.slug === slug && s.isActive);
}

export const localPageSlug = "tham-my-vien-hoa-thanh-tay-ninh";

export const localPageData = {
  slug: localPageSlug,
  seoTitle: "Thẩm mỹ viện Hòa Thành Tây Ninh — Min Beauty",
  seoDescription:
    "Min Beauty — thẩm mỹ viện tại Hòa Thành, Tây Ninh. Tiêm môi baby, filler, meso căng bóng và các dịch vụ làm đẹp. Tư vấn miễn phí. Gọi 0971.700.952.",
  h1: "Thẩm mỹ viện Min Beauty tại Hòa Thành, Tây Ninh",
  intro:
    "Min Beauty là cơ sở làm đẹp tại 61A, hẻm 24 Trịnh Phong Đáng, Trường Giang, Trường Tây, Hòa Thành, Tây Ninh. Chúng tôi tập trung vào tiêm môi baby, filler, meso và các dịch vụ thẩm mỹ — mỗi khách hàng được tư vấn theo tình trạng thực tế trước khi thực hiện.",
  sections: [
    {
      heading: "Khu vực phục vụ",
      paragraphs: [
        "Min Beauty phục vụ khách hàng tại Hòa Thành, Tây Ninh và các khu vực lân cận như Trảng Bàng, Gò Dầu, Tây Ninh thành phố.",
        "Bạn có thể gửi hình qua Zalo để được tư vấn sơ bộ trước khi đến trực tiếp cơ sở.",
      ],
    },
    {
      heading: "Dịch vụ chính tại Min Beauty",
      paragraphs: [
        "Dịch vụ làm đẹp: tiêm môi baby, nâng tầng mặt giữa, bọng mắt cười, làm đầy trán hỏm trán baby, meso căng bóng, xóa thâm quầng mắt + trẻ hóa vùng mắt (H.A), thon gọn hàm viền hàm, thon gọn bắp tay, BAP và tai tài lộc.",
      ],
    },
    {
      heading: "Giờ làm việc và liên hệ",
      paragraphs: [
        "Thời gian làm việc: 8:00 – 20:00, Thứ Hai đến Chủ nhật.",
        "Hotline tư vấn & đặt lịch: 0971.700.952. Zalo: 0971700952.",
      ],
    },
  ],
};
