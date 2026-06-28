export const MAIN_MENU_TEXT = "كيف يمكنني مساعدتك؟ 👇";

export function buildQuickReplies() {
  return [
    { content_type: "text", title: "⏰ ساعات العمل", payload: "HORAIRES" },
    { content_type: "text", title: "🏪 استفسار متجر", payload: "MAGASIN" },
    { content_type: "text", title: "🅿️ الباركينج", payload: "PARKING" },
    { content_type: "text", title: "📍 الموقع", payload: "LOCALISATION" },
  ];
}

export function buildPersistentMenuProfile() {
  return {
    get_started: {
      payload: "GET_STARTED",
    },
    greeting: [
      {
        locale: "default",
        text: "مرحبًا بك في المدينة سنتر 🏬\nاضغط على ابدأ للحصول على المساعدة!",
      },
    ],
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          { type: "postback", title: "🏠 القائمة الرئيسية", payload: "MENU" },
          { type: "postback", title: "⏰ ساعات العمل", payload: "HORAIRES" },
          { type: "postback", title: "🏪 استفسار عن متجر", payload: "MAGASIN" },
          { type: "postback", title: "🅿️ الباركينج", payload: "PARKING" },
          { type: "postback", title: "📍 الموقع على الخريطة", payload: "LOCALISATION" },
        ],
      },
    ],
  };
}
