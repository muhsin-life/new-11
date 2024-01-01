import { Content } from "@/types/page";
import { Gap } from "./Gap";
import { ProductGrid } from "./ProductGrid";
import { PersonalizedSlider } from "./PersonalizedSlider";
import { Blog } from "./Blog";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { DynamicGrid } from "./DynamicGrid";
import { DynamicSliderGrid } from "./DynamicSliderGrid";
import { useProducts } from "./hooks/useData";

export const PageStructure = ({ content }: { content: Content }) => {

  const isHideInMobile = content.settings?.hide_in_mobile_web ?? false;
  const isHideInDesktop = content.settings?.hide_in_desktop_web ?? false;

  const getPageComponent = (
    supportedDeviceTypes: SupportedDeviceType[] | null
  ) => {
    switch (content.section_type) {
      case "dynamic_grid":
        return supportedDeviceTypes?.map((deviceType) => (
          <MaxWidthWrapper>
            <DynamicGrid
              key={`${content.order_id}-${deviceType}`}
              contentData={content}
              deviceType={deviceType}
            />
          </MaxWidthWrapper>
        ));
      case "dynamic_slider_grid":
        return supportedDeviceTypes?.map((deviceType) => (
          <DynamicSliderGrid
            key={`${content.order_id}-${deviceType}`}
            contentData={content}
            deviceType={deviceType}
          />
        ));
      case "gap":
        return <Gap contentData={content} />;
      case "product_grid":
        const sectionTitle =
          content?.settings?.show_section_title ?? true
            ? content.section_title
            : null;
        const type_key = content.section_data_object?.type_key;
        const getSlugFromTypeKey = () => {
          switch (type_key) {
            case "collection":
              return "collections";
            case "category":
              return "categories";
            case "brand":
              return "brands";
          }
        };
        const slug = content.section_data_object?.slug;

        const { data, isLoading } = useProducts(
          getSlugFromTypeKey() as string,
          slug as string
        );

        return (
          <ProductGrid
            key={`${content.order_id}`}
            supportedDeviceTypes={supportedDeviceTypes}
            products={{ data: data?.data.products, isLoading: isLoading }}
            productGridProps={{
              title: sectionTitle,
              slug: content.section_data_object?.slug,
              type_key: content.section_data_object?.type_key,
              type_value: content.section_data_object?.type_value,
            }}
          />
        );

      case "personalized_slider":
        return <PersonalizedSlider contentData={content} />;
      case "blog":
        return <Blog contentData={content} />;
      default:
        return <div></div>;
    }
  };

  const getSupportedDevicetypes = (): SupportedDeviceType[] | null => {
    if (isHideInDesktop === true && isHideInMobile === true) {
      return null;
    } else if (isHideInDesktop === true && isHideInMobile === false) {
      return ["mobile"];
    } else if (isHideInDesktop === false && isHideInMobile === true) {
      return ["desktop"];
    } else {
      return ["mobile", "desktop"];
    }
  };

  return getSupportedDevicetypes() !== null ? (
    getPageComponent(getSupportedDevicetypes())
  ) : (
    <></>
  );
};
