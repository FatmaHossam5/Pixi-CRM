import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../Shared/Breadcrumbs/Breadcrumbs";
import TabsCarousel from "../../../Shared/TabsCarousel/TabsCarousel";
import Tabs, { generateSlides } from "../../../Shared/Tabs/Tabs";
import { useMemo } from "react";

const PaymentTab = ({ activeTab, setActiveTab }) => {
  const { t, i18n } = useTranslation();

  const tabs = [
    "payment-method",
    "account-category",
    "account-type",
    "payment-account",
  ];
  
  const slides = useMemo(() => generateSlides(tabs), [tabs]);

  // Breadcrumbs are dynamically derived based on the current active tab
  const breadcrumbs = [
    t("settings"),
    t("paymentSettings"),
    activeTab ? t(activeTab) : null
  ].filter(Boolean);// Filter removes null values (e.g., when activeTab is undefined)
  // Handle tab click and update activeTab in the parent
  const handleMainTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="px-card p-4 pb-0 mb-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 gx-0">
              <div className="card-head d-flex flex-wrap  ">
                <div className="breadcrumbs-list w-100">
                  <Breadcrumbs breadcrumbs={breadcrumbs} isRTL={i18n.language === "ar"} />
                </div>
                <div className="page-name  w-100">
                  <h3> {t('paymentSettings')}</h3>
                  {/*----------------- start taps -----------------*/}
           
                    <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleMainTabClick} />
                  {/*------------------ end taps ------------------*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentTab