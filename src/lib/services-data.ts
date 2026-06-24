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
    title: "Môi baby",
    category: "cosmetic",
    shortDescription: "Tư vấn dáng môi mềm mại, tự nhiên và hài hòa với gương mặt tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Môi baby Tây Ninh — Tư vấn dáng môi tự nhiên tại Min Beauty",
    seoDescription:
      "Dịch vụ môi baby tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn dáng môi mềm, tự nhiên theo từng gương mặt. Đặt lịch 0971.700.952.",
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
    title: "Làm đầy trán hóm",
    category: "cosmetic",
    shortDescription: "Tư vấn cải thiện vùng trán thiếu đầy, cân đối gương mặt tại Min Beauty, Tây Ninh.",
    seoTitle: "Làm đầy trán hóm Tây Ninh — Filler trán tự nhiên",
    seoDescription:
      "Dịch vụ làm đầy trán hóm tại Min Beauty, Hòa Thành, Tây Ninh. Tư vấn cải thiện vùng trán tự nhiên. Đặt lịch 0971.700.952.",
    heroImage: "/images/services/lam-day-tran-hom.jpg",
    intro:
      "Trán hóm có thể làm tổng thể gương mặt trông thiếu cân đối. Dịch vụ làm đầy trán tại Min Beauty tập trung vào việc tạo độ mềm mại cho vùng trán mà vẫn giữ được tỷ lệ tự nhiên giữa trán, mũi và vùng mắt.",
    sections: [
      {
        heading: "Trán hóm ảnh hưởng đến tổng thể gương mặt",
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
    title: "Meso",
    category: "cosmetic",
    shortDescription: "Liệu trình meso hỗ trợ cấp ẩm, làm sáng và chăm sóc bề mặt da tại Min Beauty, Tây Ninh.",
    seoTitle: "Meso Tây Ninh — Liệu trình chăm sóc da tại Min Beauty",
    seoDescription:
      "Dịch vụ meso tại Min Beauty, Hòa Thành, Tây Ninh. Hỗ trợ cấp ẩm, làm sáng và cải thiện bề mặt da. Tư vấn 0971.700.952.",
    heroImage: "/images/services/meso.jpg",
    intro:
      "Meso thường được chọn khi da thiếu ẩm, bề mặt kém mịn hoặc cần liệu trình chăm sóc chuyên sâu hơn routine tại nhà. Tại Min Beauty, liệu trình meso được tư vấn theo tình trạng da thực tế — không áp dụng một phác đồ chung cho mọi người.",
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
    title: "Trẻ hóa vùng mắt",
    category: "cosmetic",
    shortDescription: "Chăm sóc và trẻ hóa vùng mắt theo tình trạng thực tế tại Min Beauty, Tây Ninh.",
    seoTitle: "Trẻ hóa vùng mắt Tây Ninh — Chăm sóc mắt tại Min Beauty",
    seoDescription:
      "Dịch vụ trẻ hóa vùng mắt tại Min Beauty, Hòa Thành, Tây Ninh. Chăm sóc vùng mắt tự nhiên, theo tình trạng thực tế. Gọi 0971.700.952.",
    heroImage: "/images/services/tre-hoa-vung-mat.jpg",
    intro:
      "Vùng mắt là khu vực nhạy cảm và dễ lộ dấu hiệu mệt mỏi. Liệu trình trẻ hóa vùng mắt tại Min Beauty được thiết kế theo tình trạng thực tế — ưu tiên sự tự nhiên và an toàn cho da mỏng quanh mắt.",
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
    id: "cham-soc-da",
    slug: "cham-soc-da",
    title: "Chăm sóc da",
    category: "cosmetic",
    shortDescription: "Chăm sóc và phục hồi da theo nền da và nhu cầu tại Min Beauty, Hòa Thành, Tây Ninh.",
    seoTitle: "Chăm sóc da Tây Ninh — Liệu trình tại Min Beauty",
    seoDescription:
      "Dịch vụ chăm sóc da tại Min Beauty, Hòa Thành, Tây Ninh. Chăm sóc da theo tình trạng thực tế, tư vấn miễn phí. 0971.700.952.",
    heroImage: "/images/services/cham-soc-da.jpg",
    intro:
      "Chăm sóc da tại Min Beauty bắt đầu từ việc hiểu nền da, thói quen sinh hoạt và mục tiêu của bạn. Chúng tôi không áp dụng một liệu trình chung — mỗi khách hàng được tư vấn phương án phù hợp với tình trạng da hiện tại.",
    sections: [
      {
        heading: "Nền tảng của làn da khỏe",
        paragraphs: [
          "Làm sạch nhẹ nhàng, dưỡng ẩm đủ và chống nắng đều đặn là ba bước cơ bản giúp da ổn định theo thời gian.",
          "Liệu trình tại cơ sở bổ sung cho routine tại nhà, không thay thế hoàn toàn thói quen chăm sóc hằng ngày.",
        ],
      },
    ],
    whoFor: [
      "Da thiếu ẩm, xỉn màu hoặc cần phục hồi sau stress.",
      "Người muốn được tư vấn routine chăm sóc phù hợp với nền da.",
    ],
    process: sharedProcess,
    aftercare: [
      "Tiếp tục chống nắng và dưỡng ẩm theo hướng dẫn.",
      "Tránh thử quá nhiều sản phẩm mới cùng lúc.",
      "Theo dõi phản ứng da sau liệu trình.",
    ],
    faqs: [
      {
        question: "Bao lâu nên chăm sóc da một lần?",
        answer: "Tùy tình trạng da và liệu trình. Được tư vấn sau khi xem da trực tiếp.",
      },
      {
        question: "Có cần ngừng makeup trước khi đến không?",
        answer: "Nên làm sạch da trước khi đến. Chúng tôi sẽ hướng dẫn cụ thể khi đặt lịch.",
      },
    ],
    relatedPostSlugs: ["duy-tri-da-khoe-manh", "meso-ho-tro-cham-soc-da"],
    isActive: true,
    order: 7,
  },
  {
    id: "phuc-hoi-da",
    slug: "phuc-hoi-da",
    title: "Phục hồi da",
    category: "cosmetic",
    shortDescription: "Hỗ trợ da nhạy cảm, thiếu ẩm hoặc cần phục hồi hàng rào bảo vệ tại Min Beauty, Tây Ninh.",
    seoTitle: "Phục hồi da Tây Ninh — Liệu trình phục hồi tại Min Beauty",
    seoDescription:
      "Dịch vụ phục hồi da tại Min Beauty, Hòa Thành, Tây Ninh. Hỗ trợ da nhạy cảm, thiếu ẩm. Tư vấn 0971.700.952.",
    heroImage: "/images/services/phuc-hoi-da.jpg",
    intro:
      "Da nhạy cảm, thiếu ẩm hoặc mất cân bằng hàng rào bảo vệ cần phương án phục hồi nhẹ nhàng và kiên nhẫn. Min Beauty tư vấn liệu trình phục hồi phù hợp — tránh dùng quá nhiều hoạt chất mạnh khi da chưa sẵn sàng.",
    sections: [
      {
        heading: "Khi nào da cần phục hồi",
        paragraphs: [
          "Da có thể cần phục hồi sau khi dùng hoạt chất mạnh, thay đổi thời tiết, stress hoặc skincare không phù hợp.",
          "Liệu trình phục hồi tập trung vào cấp ẩm, làm dịu và hỗ trợ hàng rào bảo vệ da.",
        ],
      },
    ],
    whoFor: [
      "Da nhạy cảm, dễ đỏ hoặc kích ứng.",
      "Người vừa dùng hoạt chất mạnh và cần phục hồi.",
      "Da thiếu ẩm, bong tróc hoặc căng rát.",
    ],
    process: sharedProcess,
    aftercare: [
      "Dùng sản phẩm dịu nhẹ, tránh hoạt chất mạnh.",
      "Chống nắng kỹ và giữ routine đơn giản.",
      "Kiên nhẫn — da phục hồi cần thời gian.",
    ],
    faqs: [
      {
        question: "Phục hồi da mất bao lâu?",
        answer: "Tùy mức độ tổn thương và cách chăm sóc. Được tư vấn cụ thể sau khi xem da.",
      },
      {
        question: "Có thể kết hợp meso khi da đang nhạy cảm không?",
        answer: "Cần xem da trước. Một số trường hợp nên phục hồi trước khi làm liệu trình khác.",
      },
    ],
    relatedPostSlugs: ["duy-tri-da-khoe-manh"],
    isActive: true,
    order: 8,
  },
];

export function getActiveServices() {
  return servicesData.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
}

export function getService(slug: string) {
  return servicesData.find((s) => s.slug === slug && s.isActive);
}

export const localPageSlug = "tham-my-vien-hoa-thanh-tay-ninh";

export const localPageData = {
  slug: localPageSlug,
  seoTitle: "Thẩm mỹ viện Hòa Thành Tây Ninh — Min Beauty",
  seoDescription:
    "Min Beauty — thẩm mỹ viện tại Hòa Thành, Tây Ninh. Dịch vụ môi baby, filler, meso, chăm sóc da. Tư vấn miễn phí. Gọi 0971.700.952.",
  h1: "Thẩm mỹ viện Min Beauty tại Hòa Thành, Tây Ninh",
  intro:
    "Min Beauty là cơ sở làm đẹp tại 61A, hẻm 24 Trịnh Phong Đáng, Trường Giang, Trường Tây, Hòa Thành, Tây Ninh. Chúng tôi tập trung vào các dịch vụ môi baby, filler, meso và chăm sóc da — mỗi khách hàng được tư vấn theo tình trạng thực tế trước khi thực hiện.",
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
        "Dịch vụ làm đẹp: môi baby, nâng tầng mặt giữa, bọng mắt cười, làm đầy trán hóm, meso, trẻ hóa vùng mắt, chăm sóc da và phục hồi da.",
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
