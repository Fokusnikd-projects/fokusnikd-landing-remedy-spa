import type { Channel, Locale, ServiceId } from "@/lib/facts";

export type Copy = {
  metaTitle: string;
  metaDescription: string;
  logo: string;
  navServices: string;
  navBooking: string;
  navReviews: string;
  navHours: string;
  navContact: string;
  bookOnline: string;
  bookOnlineHeader: string;
  bookOnlineBar: string;
  callLabel: string;
  heroOverline: string;
  headline: string;
  subheadline: string;
  rating: string;
  addressLine: string;
  heroMessenger: string;
  servicesOverline: string;
  servicesTitle: string;
  servicesNote: string;
  photo: string;
  photoHero: string;
  photoTreatment: string;
  serviceName: Record<ServiceId, string>;
  serviceDescription: string;
  duration: string;
  price: string;
  priceUsd: string | null;
  serviceMeta: string;
  bookLink: string;
  bookingOverline: string;
  bookingTitle: string;
  demoBanner: string;
  stepService: string;
  stepDate: string;
  stepTime: string;
  stepSummary: string;
  timeZoneNote: string;
  legendAvailable: string;
  legendBooked: string;
  legendSelected: string;
  groupMorning: string;
  groupAfternoon: string;
  groupEvening: string;
  slotNote: string;
  labelService: string;
  labelDate: string;
  labelTime: string;
  labelDuration: string;
  labelPrice: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  countryCode: string;
  confirmVia: string;
  channelWhatsapp: string;
  channelZalo: string;
  channelCall: string;
  channelNote: string;
  confirmOn: (channel: Channel, number: string) => string;
  wrongNumber: string;
  copied: string;
  copyFailed: string;
  tryAgain: string;
  slotTaken: string;
  showMap: string;
  reviewsLead: string;
  previewNotSent: string;
  sendRequest: string;
  chooseTime: string;
  orMessage: string;
  demoFooter: string;
  // TODO(copy): optional note is in the build brief, not in the Figma copy table.
  noteLabel: string;
  errName: string;
  errPhone: string;
  loadingTimes: string;
  slotsError: string;
  slotsErrorAction: string;
  fullyBooked: (when: string, next: string, time: string) => string;
  showNext: (when: string) => string;
  reviewsOverline: string;
  reviewsTitle: string;
  reviewKicker: string;
  reviewRating: string;
  reviewText: string;
  reviewMeta: string;
  seeAllReviews: string;
  hoursOverline: string;
  hoursTitle: string;
  openDaily: string;
  hoursRange: string;
  lateHours: string;
  hoursAddress: string;
  openMaps: string;
  mapTitle: string;
  contactOverline: string;
  contactTitleMobile: string;
  contactTitleDesktop: string;
  contactInvite: string;
  contactPrimary: string;
  contactSecondary: string;
  contactCall: string;
  contactAssumption: string;
  footerAddress: string;
  footerHours: string;
  footerLangs: string;
  copyright: string;
  previousMonth: string;
  nextMonth: string;
  earlierDates: string;
  laterDates: string;
  requestSentTitle: string;
  waiting: string;
  requestNumber: string;
  messageUs: string;
  getDirections: string;
  needChange: string;
  backHome: string;
  requestDemoNote: string;
  confirmedTitle: string;
  confirmedChip: string;
  confirmedMessage: string;
  addToCalendar: string;
  confirmedNote: string;
  summaryAddress: string;
  booked: string;
  available: string;
  selected: string;
};

const servicesEn: Record<ServiceId, string> = {
  body: "Body massage",
  therapeutic: "Therapeutic massage / Eastern medicine",
  // TODO(placeholder): mockup had two extra cards. They are not real services and are not shown.
  "placeholder-3": "Ask us about treatments",
  "placeholder-4": "Ask us about treatments",
};

const servicesVi: Record<ServiceId, string> = {
  body: "Massage toàn thân",
  therapeutic: "Massage trị liệu / Đông y",
  // TODO(placeholder): mockup had two extra cards. They are not real services and are not shown.
  "placeholder-3": "Hỏi chúng tôi về liệu trình",
  "placeholder-4": "Hỏi chúng tôi về liệu trình",
};

export const copy: Record<Locale, Copy> = {
  en: {
    metaTitle: "Remedy Spa · Massage & Eastern medicine · District 1",
    metaDescription:
      "Body massage and therapeutic massage at 35 Hai Bà Trưng, District 1, Ho Chi Minh City. Open daily 09:00–23:45. 4.7 · 201 Google reviews.",
    logo: "R",
    navServices: "Services",
    navBooking: "Booking",
    navReviews: "Reviews",
    navHours: "Hours",
    navContact: "Contact",
    bookOnline: "Book online",
    bookOnlineHeader: "Book online",
    bookOnlineBar: "Book online",
    callLabel: "Call +84 867 135 393",
    heroOverline: "Massage & Eastern medicine · District 1",
    // TODO(copy): owner has not written a tagline. This line uses only the real services and district.
    headline: "Body massage and Eastern medicine in District 1",
    subheadline: "35 Hai Bà Trưng, Ho Chi Minh City. Open daily 09:00–23:45.",
    rating: "4.7 · 201 Google reviews",
    addressLine: "35 Hai Bà Trưng, District 1 · Directions",
    heroMessenger: "Message on WhatsApp",
    servicesOverline: "Services & prices",
    servicesTitle: "Treatments",
    servicesNote: "Ask us for current prices and durations.",
    photo: "Photo",
    photoHero: "Photo",
    photoTreatment: "Photo",
    serviceName: servicesEn,
    serviceDescription: "Ask us about this treatment.",
    duration: "Ask us for the duration",
    price: "Ask us for the current price",
    priceUsd: null,
    serviceMeta: "Ask us for the duration and the current price.",
    bookLink: "Book →",
    bookingOverline: "Online booking",
    bookingTitle: "Book your visit",
    demoBanner: "⚠ DEMO DATA — availability shown here is sample data, not real",
    stepService: "1 · Choose a service",
    stepDate: "2 · Choose a date",
    stepTime: "3 · Choose a time",
    stepSummary: "4 · Your booking",
    timeZoneNote: "Times are Vietnam time (ICT, UTC+7).",
    legendAvailable: "Available",
    legendBooked: "Booked",
    legendSelected: "Selected",
    groupMorning: "Morning · 09:00–11:30",
    groupAfternoon: "Afternoon · 12:00–16:30",
    groupEvening: "Evening · 17:00–22:30",
    slotNote:
      "Slots every 30 min from 09:00. Last start = 23:45 closing − service duration (shown for a 60-min service: last start 22:30). Slots earlier than now + 30 min are hidden. Assumption — confirm with the spa.",
    labelService: "Service",
    labelDate: "Date",
    labelTime: "Time",
    labelDuration: "Duration",
    labelPrice: "Price",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "WhatsApp or phone",
    phonePlaceholder: "Phone number",
    countryCode: "Country code",
    confirmVia: "Confirm via",
    channelWhatsapp: "WhatsApp",
    channelZalo: "Zalo",
    channelCall: "Call",
    channelNote: "[Channels the spa can confirm on — to be agreed with the owner]",
    confirmOn: (channel, number) =>
      channel === "call"
        ? `We’ll confirm by phone at ${number}`
        : channel === "zalo"
          ? `We’ll confirm on Zalo to ${number}`
          : `We’ll confirm on WhatsApp to ${number}`,
    wrongNumber: "Wrong number? Edit",
    copied: "Booking details copied",
    copyFailed: "Couldn’t copy the booking details",
    tryAgain: "Try again",
    slotTaken: "That time was just taken. Please choose another.",
    showMap: "Show map",
    reviewsLead: "Guest reviews are on Google Maps.",
    previewNotSent: "This preview did not send a message.",
    sendRequest: "Send booking request",
    chooseTime: "Choose a time to continue",
    orMessage: "or message us on WhatsApp",
    demoFooter: "Demo only: not connected to a real calendar, nothing is sent.",
    noteLabel: "Note (optional)",
    errName: "Enter your name",
    errPhone: "Enter a phone number",
    loadingTimes: "Loading times…",
    slotsError: "Couldn’t load times. Message us on WhatsApp",
    slotsErrorAction: "Message us on WhatsApp",
    fullyBooked: (when, next, time) => `Fully booked on ${when} · Next free: ${next}, ${time}`,
    showNext: (when) => `Show ${when} →`,
    reviewsOverline: "Reviews",
    reviewsTitle: "What guests say",
    reviewKicker: "Review from Google Maps — placeholder",
    reviewRating: "",
    reviewText: "",
    reviewMeta: "",
    seeAllReviews: "See all 201 reviews on Google Maps →",
    hoursOverline: "Hours & location",
    hoursTitle: "Open late, every day",
    openDaily: "Open daily",
    hoursRange: "09:00–23:45",
    lateHours: "Late hours — until 23:45",
    hoursAddress: "35 Hai Bà Trưng, District 1, HCMC",
    openMaps: "Open in Google Maps",
    mapTitle: "Google Maps — 35 Hai Bà Trưng, District 1",
    contactOverline: "Contact",
    contactTitleMobile: "Book in one tap",
    contactTitleDesktop: "Book in one click",
    // TODO(copy): owner has not written an invite. This line does not claim Zalo or WhatsApp are confirmed.
    contactInvite: "Call or send a message.",
    contactPrimary: "WhatsApp · +84 867 135 393",
    contactSecondary: "Zalo · +84 867 135 393",
    contactCall: "Call +84 867 135 393",
    contactAssumption:
      "⚠ Zalo and WhatsApp are assumed to be on the same number, +84 867 135 393 — to be confirmed with the spa.",
    footerAddress: "35 Hai Bà Trưng, District 1, HCMC",
    footerHours: "Open daily 09:00–23:45",
    footerLangs: "English · Tiếng Việt",
    copyright: "© 2026 Remedy Spa",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    earlierDates: "Earlier dates",
    laterDates: "Later dates",
    requestSentTitle: "Request sent",
    waiting: "Waiting for confirmation.",
    requestNumber: "Request number is not assigned in this preview.",
    messageUs: "Message us on WhatsApp",
    getDirections: "Get directions",
    needChange: "Need to change? Message us",
    backHome: "Back to Remedy Spa",
    requestDemoNote:
      "⚠ Demo screen — nothing is sent. Request number, response time and the guest’s number are placeholders.",
    confirmedTitle: "Booking confirmed",
    confirmedChip: "Confirmed by the spa",
    confirmedMessage: "This screen is a preview. The spa has not confirmed a visit.",
    addToCalendar: "Add to calendar",
    confirmedNote:
      "⚠ How the guest gets to this screen (e.g. a link in the spa’s WhatsApp reply) — to be agreed with the spa.",
    summaryAddress: "35 Hai Bà Trưng, District 1, HCMC",
    booked: "Booked",
    available: "Available",
    selected: "Selected",
  },
  vi: {
    metaTitle: "Remedy Spa · Massage & Đông y · Quận 1",
    metaDescription:
      "Massage toàn thân và massage trị liệu tại 35 Hai Bà Trưng, Quận 1, TP. Hồ Chí Minh. Mở cửa hằng ngày 09:00–23:45. 4.7 · 201 đánh giá trên Google.",
    logo: "R",
    navServices: "Dịch vụ",
    navBooking: "Đặt lịch",
    navReviews: "Đánh giá",
    navHours: "Giờ mở cửa",
    navContact: "Liên hệ",
    bookOnline: "Đặt lịch online",
    bookOnlineHeader: "Đặt lịch online",
    bookOnlineBar: "Đặt lịch",
    callLabel: "Gọi +84 867 135 393",
    heroOverline: "Massage & Đông y · Quận 1",
    // TODO(copy): owner has not written a tagline. This line uses only the real services and district.
    headline: "Massage toàn thân và Đông y tại Quận 1",
    subheadline: "35 Hai Bà Trưng, TP. Hồ Chí Minh. Mở cửa hằng ngày 09:00–23:45.",
    rating: "4.7 · 201 đánh giá trên Google",
    addressLine: "35 Hai Bà Trưng, Quận 1 · Chỉ đường",
    heroMessenger: "Nhắn Zalo",
    servicesOverline: "Dịch vụ & bảng giá",
    servicesTitle: "Liệu trình",
    servicesNote: "Hỏi chúng tôi về giá và thời lượng hiện tại.",
    photo: "Ảnh",
    photoHero: "Ảnh",
    photoTreatment: "Ảnh",
    serviceName: servicesVi,
    serviceDescription: "Hỏi chúng tôi về liệu trình này.",
    duration: "Hỏi chúng tôi về thời lượng",
    price: "Hỏi chúng tôi về giá hiện tại",
    priceUsd: null,
    serviceMeta: "Hỏi chúng tôi về thời lượng và giá hiện tại.",
    bookLink: "Đặt lịch →",
    bookingOverline: "Đặt lịch online",
    bookingTitle: "Đặt lịch hẹn",
    demoBanner: "⚠ DỮ LIỆU DEMO — lịch trống hiển thị ở đây là dữ liệu mẫu, không có thật",
    stepService: "1 · Chọn dịch vụ",
    stepDate: "2 · Chọn ngày",
    stepTime: "3 · Chọn giờ",
    stepSummary: "4 · Lịch hẹn của bạn",
    timeZoneNote: "Giờ Việt Nam (ICT, UTC+7).",
    legendAvailable: "Còn trống",
    legendBooked: "Đã kín",
    legendSelected: "Đang chọn",
    groupMorning: "Buổi sáng · 09:00–11:30",
    groupAfternoon: "Buổi chiều · 12:00–16:30",
    groupEvening: "Buổi tối · 17:00–22:30",
    slotNote:
      "Khung giờ cách nhau 30 phút từ 09:00. Giờ bắt đầu cuối = 23:45 (đóng cửa) − thời lượng dịch vụ (ví dụ dịch vụ 60 phút: bắt đầu muộn nhất 22:30). Ẩn các khung giờ sớm hơn hiện tại + 30 phút. Giả định — cần xác nhận với spa.",
    labelService: "Dịch vụ",
    labelDate: "Ngày",
    labelTime: "Giờ",
    labelDuration: "Thời lượng",
    labelPrice: "Giá",
    nameLabel: "Họ tên",
    namePlaceholder: "Tên của bạn",
    phoneLabel: "Zalo hoặc số điện thoại",
    phonePlaceholder: "Số điện thoại",
    countryCode: "Mã quốc gia",
    confirmVia: "Xác nhận qua",
    channelWhatsapp: "WhatsApp",
    channelZalo: "Zalo",
    channelCall: "Gọi",
    channelNote: "[Kênh spa có thể xác nhận — cần thống nhất với chủ spa]",
    confirmOn: (channel, number) =>
      channel === "call"
        ? `Chúng tôi sẽ xác nhận qua điện thoại tại ${number}`
        : channel === "whatsapp"
          ? `Chúng tôi sẽ xác nhận qua WhatsApp tới ${number}`
          : `Chúng tôi sẽ xác nhận qua Zalo tới ${number}`,
    wrongNumber: "Sai số? Sửa",
    copied: "Đã sao chép nội dung đặt lịch",
    copyFailed: "Không sao chép được nội dung đặt lịch",
    tryAgain: "Thử lại",
    slotTaken: "Khung giờ này vừa được đặt. Vui lòng chọn giờ khác.",
    showMap: "Xem bản đồ",
    reviewsLead: "Đánh giá của khách nằm trên Google Maps.",
    previewNotSent: "Bản xem trước này không gửi tin nhắn.",
    sendRequest: "Gửi yêu cầu đặt lịch",
    // TODO(copy): disabled-button string is EN-only on the states board.
    chooseTime: "Chọn giờ để tiếp tục",
    orMessage: "hoặc nhắn qua Zalo",
    demoFooter: "Chỉ là demo: chưa kết nối lịch thật, không gửi dữ liệu.",
    noteLabel: "Ghi chú (không bắt buộc)",
    errName: "Nhập họ tên",
    errPhone: "Nhập số điện thoại",
    loadingTimes: "Đang tải giờ…",
    slotsError: "Không tải được giờ. Nhắn Zalo cho chúng tôi",
    slotsErrorAction: "Nhắn Zalo cho chúng tôi",
    fullyBooked: (when, next, time) => `Đã kín vào ${when} · Ngày trống kế: ${next}, ${time}`,
    showNext: (when) => `Xem ${when} →`,
    reviewsOverline: "Đánh giá",
    reviewsTitle: "Khách hàng nói gì",
    reviewKicker: "Đánh giá từ Google Maps — nội dung tạm",
    reviewRating: "",
    reviewText: "",
    reviewMeta: "",
    seeAllReviews: "Xem tất cả 201 đánh giá trên Google Maps →",
    hoursOverline: "Giờ mở cửa & địa chỉ",
    hoursTitle: "Mở cửa muộn, mỗi ngày",
    openDaily: "Mở cửa hằng ngày",
    hoursRange: "09:00–23:45",
    lateHours: "Mở muộn — đến 23:45",
    hoursAddress: "35 Hai Bà Trưng, Quận 1, TP.HCM",
    openMaps: "Mở trên Google Maps",
    mapTitle: "Google Maps — 35 Hai Bà Trưng, Quận 1",
    contactOverline: "Liên hệ",
    contactTitleMobile: "Đặt lịch chỉ với một chạm",
    contactTitleDesktop: "Đặt lịch chỉ với một cú nhấp",
    // TODO(copy): owner has not written an invite. This line does not claim Zalo or WhatsApp are confirmed.
    contactInvite: "Gọi hoặc nhắn tin.",
    contactPrimary: "Zalo · +84 867 135 393",
    contactSecondary: "WhatsApp · +84 867 135 393",
    contactCall: "Gọi +84 867 135 393",
    contactAssumption:
      "⚠ Zalo và WhatsApp được giả định dùng cùng số +84 867 135 393 — cần xác nhận với spa.",
    footerAddress: "35 Hai Bà Trưng, Quận 1, TP.HCM",
    footerHours: "Mở cửa hằng ngày 09:00–23:45",
    footerLangs: "English · Tiếng Việt",
    copyright: "© 2026 Remedy Spa",
    previousMonth: "Tháng trước",
    nextMonth: "Tháng sau",
    earlierDates: "Ngày trước",
    laterDates: "Ngày sau",
    requestSentTitle: "Đã gửi yêu cầu",
    waiting: "Đang chờ xác nhận.",
    requestNumber: "Bản xem trước không cấp mã yêu cầu.",
    messageUs: "Nhắn Zalo cho chúng tôi",
    getDirections: "Chỉ đường",
    needChange: "Cần thay đổi? Nhắn cho chúng tôi",
    backHome: "Quay lại Remedy Spa",
    requestDemoNote:
      "⚠ Màn hình demo — không gửi gì. Mã yêu cầu, thời gian phản hồi và số của khách là nội dung tạm.",
    confirmedTitle: "Đã xác nhận lịch hẹn",
    confirmedChip: "Spa đã xác nhận",
    confirmedMessage: "Đây là màn hình xem trước. Spa chưa xác nhận lịch hẹn.",
    addToCalendar: "Thêm vào lịch",
    confirmedNote:
      "⚠ Cách khách mở màn hình này (ví dụ link trong tin nhắn Zalo của spa) — cần thống nhất với spa.",
    summaryAddress: "35 Hai Bà Trưng, Quận 1, TP.HCM",
    booked: "Đã kín",
    available: "Còn trống",
    selected: "Đang chọn",
  },
};

export function channelOrder(locale: Locale): Channel[] {
  return locale === "vi" ? ["zalo", "whatsapp", "call"] : ["whatsapp", "zalo", "call"];
}

export function channelLabel(locale: Locale, channel: Channel): string {
  const t = copy[locale];
  if (channel === "zalo") return t.channelZalo;
  if (channel === "call") return t.channelCall;
  return t.channelWhatsapp;
}
