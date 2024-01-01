
type locale = "ae-en" | "ae-ar" | "sa-en" | "sa-ar";


type SupportedDeviceType = "mobile" | "desktop";

 type MainNavItem = NavItemWithOptionalChildren

  



 interface PayloadProps {
    action?: "update_items";
    data: {
      items: [{
        id: string;
        qty: number;
      }];
      address_id?: string | null;
    };
  }