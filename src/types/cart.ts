import { CountryCode, PriceElement } from "./products";

export interface Store {
  user: User;
  geoLocation: GeoLocation;
  boostiny: Boostiny;
  utm: Utm;
  queryId: null;
  cart: Cart;
  clinic: Clinic;
  compare: Compare;
  demo: Demo;
  wishlist: Compare;
  i18n: I18N;
  auth: Auth;
}

export interface Auth {
  user: boolean;
  loggedIn: boolean;
  strategy: string;
  config?: Config;
  deliver: string;
  redirect: string;
  busy: boolean;
}

export interface Config {
  MINIMUM_ORDER: number;
  INSTANT_DELIVERY_FEE: number;
  EXPRESS_DELIVERY_FEE: number;
  INSTANT_TIME: number;
  COD_CHARGES: number;
  ORDERING_ENABLED: boolean;
  SAMEDAY_DELIVERY_END_TIME: number;
  SAMEDAY_DELIVERY_ZONE: SamedayDeliveryZone;
  SPLASH_FILE_LINK: string;
  ARABIC_ENABLED: boolean;
  INSTANT_INFO: string;
  EXPRESS_INFO: string;
  WALLET_TOPUP_ENABLED: boolean;
  IS_INSTANT_DEFAULT: boolean;
  IS_COD_ENABLED: boolean;
  IS_CARD_ENABLED: boolean;
  IS_WALLET_ENABLED: boolean;
  CONTACT_PHONE: string;
  HOME_TITLES: HomeTitles;
  MIN_ANDROID_VERSION: number;
  MIN_IOS_VERSION: number;
  REVIEW_TAGS: ReviewTag[];
  IS_INSTANT_DISABLED: boolean;
  MIN_ORDER_VALUE: number;
  ACTIVE_SLOTS: ActiveSlot[];
  IS_APPLEPAY_ENABLED: boolean;
  OFFER_EXCLUSION_LIST: OfferExclusionList[];
  FLASH_SALE_SKU: string;
  FLASH_SALE_MIN: string;
  IS_FLASH_SALE_ACTIVE: boolean;
  RETURN_POLICY_TEXT: string;
  FLASH_OFFERS: string;
  ACTIVE_SEARCH_ENGINE: string;
  CUSTOM_SEARCH_ENDPOINT: string;
  SEARCH_AUTH_KEY: string;
  "APPSFLYERKEY ": string;
  PRODUCT_PAGE_BANNERS: ProductPageBanner[];
  PRODUCT_PAGE_BANNERS1: ProductPageBanner[];
  WEB_NEWSLETTER: WebNewsletter;
  IS_OUTLET_ENABLED: boolean;
  APPLE_PAY_ENABLED: boolean;
  STORE_ANDROID_APP_CONFIG: StoreAndroidAppConfig;
  DEFAULT_PG: number;
  CKO_PK: string;
  CKO_APPLEPAY: boolean;
  PAYTAB_KEYS: PaytabKeys;
  PT_APPLEPAY: boolean;
  PT_WEBVIEW: boolean;
  CURRENT_HOMEPAGE: string;
  PT_SDK: boolean;
  GIFT_OFFER_ID: string;
  SEARCH_BASE_URL: string;
  ISSUE_TITLES: Title[];
  APP_NOTIFICATION_SETTINGS: AppNotificationSettings;
  V2_CURRENT_HOMEPAGE: string;
  PRESCRIPTION_BANNER: string;
  APP_POPUP: AppPopup;
  IP_LOCATOR: string;
  CLUSTERS: string;
  TIP_TITLE: string;
  TIP_DESCRIPTION: string;
  ENABLE_RATING_ALERT: boolean;
  IS_TIP_ENABLED: boolean;
  STORE_APP_TICKETS_ISSUE_FLAG_ENABLED: boolean;
  CHAT_PROVIDER: number;
  APP_PRODUCT_DETAILS_BOTTOM_BANNER: AppProductDetailsBottomBanner[];
  APP_PRODUCT_DETAILS_TOP_BANNER: any[];
  GEOFENCES_AREA_CONFIG: GeofencesAreaConfig;
  CART_OFFERS: CartOffer[];
  CART_BOTTOM_ALERT: string;
  MEDICAL_CENTER_TITLE: string;
  CLINIC_HOME_SLIDER: ClinicHomeSlider[];
  APP_UPDATE_MIN_VERSION: AppUpdateMinVersion;
  MEMBERSHIP_PRICE_LABEL: MembershipPriceLabel;
  IS_TABBY_ENABLED: boolean;
  TABBY_MIN_AMOUNT: number;
  LOGIN_BANNER: LoginBanner;
  NON_UAE_MESSAGE: string;
  ENABLED_SOCIAL_LOGINS: EnabledSocialLogins;
  WHATSAPP_NUMBER: string;
  SPLASH_SCREEN_URL: string;
  WEB_TOP_HEADER_DOWNLOAD_LINK: string;
  PRODUCT_PAGE_BANNERS_AR: ProductPageBanner[];
  "CONTACT_PHONE ": string;
  WEB_TOP_HEADER: WebTopHeader;
  CART_TOP_ALERT: CartTopAlert;
  CHANGE_ADDRESS_WARNING: string;
  PRESCRIPTION_ADDRESS_ALERT: string;
  IS_LP_APPLEPAY_ENABLED: boolean;
  LP_PROVIDER: number;
  SUBSCRIPTION: Subscription;
}

export interface ActiveSlot {
  slot_id: number;
  fees: number;
  title: string;
  subtitle: string;
  label: string;
  time: string;
  active: boolean;
  selected: boolean;
  unavailable_text: string;
}

export interface AppNotificationSettings {
  promotional_message_title: string;
  promotional_message_detail: string;
  promotional_message_alert: string;
  transactional_message_title: string;
  transactional_message_detail: string;
  transactional_message_alert: string;
}

export interface AppPopup {
  banner_url: string;
  action_key: string;
  action_value: string;
  new_action_value: string;
  action_title: string;
  action_button_label: string;
  active: boolean;
  action_button_color: string;
  action_button_bg_color: string;
}

export interface AppProductDetailsBottomBanner {
  banner_url: string;
  action_key: string;
  action_value: string;
  height: number;
  width: number;
}

export interface AppUpdateMinVersion {
  title: string;
  subtitle: string;
  ios: string;
  android: number;
  action: Action;
}

export interface Action {
  key: string;
  value: string;
  enable: boolean;
  button_text: string;
}

export interface CartOffer {
  label_text: null;
  action_key: string;
  action_value: string;
  product_id: string;
  button_text: string;
  title: string;
  featured_image: string;
  min_cart: number | string;
  start_at: null;
  end_at: null;
  active: boolean;
}

export interface CartTopAlert {
  title: null;
  icon: string;
  background: string;
  text_color: string;
  button_text: string;
  sub_title: null;
  action_title: null;
  action_key: string;
  action_value: null;
  coupon_code: string;
  active: boolean;
}

export interface ClinicHomeSlider {
  image_url: string;
  action_key: string;
  action_value: null;
  action_slug: null;
  height: number;
  width: number;
}

export interface EnabledSocialLogins {
  whatsapp: boolean;
  google: boolean;
  apple: boolean;
}

export interface GeofencesAreaConfig {
  STORE_PRESCRIPTION_GEOFENCES: boolean;
}

export interface HomeTitles {
  titles: Title[];
  "text-color": string;
  "background-color": string;
  shimmer: boolean;
}

export interface Title {
  text: string;
}

export interface LoginBanner {
  file: string;
  type: string;
  active_from: Date;
  active_until: Date;
  title: string;
}

export interface MembershipPriceLabel {
  icon: string;
  bg_color: string;
  text_color: string;
  title: string;
  description: string;
}

export interface OfferExclusionList {
  sku: string;
  offer_id: string;
}

export interface PaytabKeys {
  PROFILE_ID: string;
  SERVER_KEY: string;
  CLIENT_KEY: string;
}

export interface ProductPageBanner {
  link: string;
  url: string;
  active: boolean;
}

export interface ReviewTag {
  value: number;
  remarks: string;
  tags: string[];
}

export interface SamedayDeliveryZone {
  polygons: Polygon[];
}

export interface Polygon {
  coordinates: Coordinate[];
}

export interface Coordinate {
  long: number;
  lat: number;
}

export interface StoreAndroidAppConfig {
  MIN_ANDROID_VERSION: string;
  URL: string;
  enable_logout: boolean;
  is_home_delivery_enabled: boolean;
  is_walkin_enabled: boolean;
  is_prescription_upload_enabled: boolean;
}

export interface Subscription {
  banner_url: string;
}

export interface WebNewsletter {
  active: boolean;
  image_url: string;
  link: string;
  campaign_id: number;
}

export interface WebTopHeader {
  text: string;
  text_ar: string;
  link: string;
}

export interface Boostiny {
  click_id: null;
  traffic_source: null;
}

export interface Cart {
  data: Items[];
  cart: CartDetails | null;
  cartId: number | null;
  gtmOrders: any[];
  deliveryAllTogether: boolean;
  deliveryFee: DeliveryFee;
}

export interface CartDetails {
  cart_data: CartData;
  cart_summary: CartSummary;
  shipment_data: ShipmentData[];
  delivery_instructions: DeliveryInstruction[];
  settings: any[];
  messages: Messages;
  allow_checkout: boolean;
  driver_tips: DriverTip[];
  available_offers: any[];
  available_payment_methods: any[];
  is_tip_enabled: boolean;
  membership: null;
  available_wallet_balance: number;
  cart_token: string;
}

export interface CartData {
  cart_id: number;
  coupon_applied: null;
  items: Item[];
  address_id: number;
  address_type: null;
  items_out_of_stock: null;
  tip: null;
  payment_method: null;
  removed_offer_products: null;
}

export interface Item {
  offer_id: string | null;
  type: string;
  offer_data: Offer | null;
  items: Items[];
  total_discount?: number;
}

export interface Items {
  id: string;
  title: string;
  featured_image: string;
  sku: string;
  slug: string;
  unit_price: number;
  qty: number;
  gross_line_total: number;
  offers: Offer | null;
  discount: number;
  member_discount: number;
  member_discount_offer_id: null;
  reorder: string;
  is_subscription_enabled: boolean;
  subscription_title: null;
  reorder_label: null;
  subscription_discount: number;
  line_member_discount: number;
  line_total: number;
  ax_price_without_vat: null;
  vat: number;
  net_line_total: number;
  in_stock: number;
  shipment_label: string;
  type: string;
  prices: PriceElement[];
}

export interface Offer {
  id: string;
  start_at: Date;
  end_at: Date;
  is_special: string;
  test_text_do_not_use: string;
  exclude: boolean;
  type: string;
  xValue: number;
  yValue: number;
  offer_ratio?: number;
  deleted_at?: null;
  value?: number;
}

export interface CartSummary {
  sub_total: number;
  item_discount: number;
  discount: number;
  coupon_discount: number;
  coupon_code: null;
  shipping_fee: number;
  member_discount: number;
  subscription_discount: number;
  cod_fee: number;
  vat: number;
  tip: number;
  total: number;
  alerts: any[];
}

export interface DeliveryInstruction {
  icon_unselected: string;
  icon_selected: string;
  instruction: string;
  value: number;
}

export interface DriverTip {
  amount: number;
  value: number;
  label: null | string;
  icon: string;
}

export interface Messages {
  cart_top_alert: null;
  cart_bottom_alert: CartBottomAlert;
  shipment_alert: null;
  toasts: any[];
  alerts: null;
  cart_top_banners: any[];
}

export interface CartBottomAlert {
  icon: string;
  background: string;
  title: string;
  sub_title: string;
  dismissable: boolean;
  action: null;
}

export interface ShipmentData {
  store_code: string;
  products: Product[];
  available_slots: Slot[];
  selected_slot: Slot;
}

export interface Slot {
  id: number;
  geofence_id: number;
  slot_meta_id: number;
  active: boolean;
  active_from: null;
  active_till: null;
  created_at: Date;
  updated_at: Date;
  fees: string;
  title: string;
  subtitle: string;
  label: null;
  in_minutes: number;
  selected: null;
  unavailable_text: null;
  created_by: number;
  shipment_label: string;
  surcharge: string;
  min_cart_total: string;
  time: string;
  time_label: string;
  self_pickup_label: null;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
  qty: number;
}

export interface DeliveryFee {
  instant: boolean;
  express: boolean;
}

export interface Clinic {
  clinic: null;
  patient: null;
}

export interface Compare {
  data: any[];
}

export interface Demo {
  region: boolean;
  campaign: number;
  showNewsletter: boolean;
}

export interface GeoLocation {
  new_method: boolean;
  language: string;
  country: CountryCode;
  type: string;
  latitude: number;
  longitude: number;
  label: string;
  dismiss: boolean;
}

export interface I18N {
  routeParams: User;
}

export interface User {}

export interface Utm {
  utm_source: null;
  utm_medium: null;
  utm_campaign: null;
  campaign_id: null;
  expiry_date: null;
  referrer: null;
}
