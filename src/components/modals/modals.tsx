import NiceModal from "@ebay/nice-modal-react";
import { LanguageModal } from "./LangageModal";
import { Cart } from "../Cart";

NiceModal.register("language-modal", LanguageModal);
NiceModal.register("cart", Cart);

// NiceModal.register("address-modal", AddressModal);
// NiceModal.register("location-modal", LocationModal);
// NiceModal.register("auth-modal", AuthModal);
// NiceModal.register("sm-search-modal", SmSearchBoxModal);
// NiceModal.register("terms-modal", TermsOfUseModal);
// NiceModal.register("privacy-policy-modal", PrivacyPolicyModal);
// NiceModal.register("order-success-modal", OrderSucessSheet);
// NiceModal.register("countries-modal", ContriesModal);
// NiceModal.register("dashboard-sidebar", DashboardSidebar);
// NiceModal.register("alert-modal", OfferAlertModal);
// NiceModal.register("bxgy-modal", BuyOneGetOneModal);
// NiceModal.register("cart-sidebar", CartSidebar);
// NiceModal.register("payment-modal", PaymentMethodModal);

export { NiceModal as Modals };
