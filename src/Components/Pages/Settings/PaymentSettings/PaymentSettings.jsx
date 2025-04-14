import React from "react";
import PaymentMethod from "../../../Controls/SettingsSection/PaymentSettings/PaymentMethod/PaymentMethod";
import AccountCategory from "../../../Controls/SettingsSection/PaymentSettings/AccountCategory/AccountCategory";
import PaymentStatement from "../../../Controls/SettingsSection/PaymentSettings/PaymentStatement/PaymentStatement";
import AccountType from "../../../Controls/SettingsSection/PaymentSettings/AccountType/AccountType";
import PaymentAccount from "../../../Controls/SettingsSection/PaymentSettings/PaymentAccount/PaymentAccount";

const PaymentSettings = ({ activeTab }) => {
  return (
    <>
      {/* payment tab */}
      <div
        className={`tab-pane fade ${activeTab === "payment-method" ? "show active" : ""}`}
        id="pills-payment-method"
        role="tabpanel"
        aria-labelledby="pills-payment-method-tab"
        tabIndex={0}
      >
        <PaymentMethod />
      </div>
      <div
         className={`tab-pane fade ${activeTab === "account-category" ? "show active" : ""}`}
        id="pills-account-category"
        role="tabpanel"
        aria-labelledby="pills-account-category-tab"
        tabIndex={0}
      >
        <AccountCategory/>
      </div>
      {/* <div
        className="tab-pane fade"
        id="pills-buildings"
        role="tabpanel"
        aria-labelledby="pills-buildings-tab"
        tabIndex={0}
      >
        <PaymentStatement/>
      </div> */}
      <div
         className={`tab-pane fade ${activeTab === "account-type" ? "show active" : ""}`}
        id="pills-account-type"
        role="tabpanel"
        aria-labelledby="pills-account-type-tab"
        tabIndex={0}
      >
        <AccountType />
      </div>
      <div
        className={`tab-pane fade ${activeTab === "payment-account" ? "show active" : ""}`}
        id="pills-payment-account"
        role="tabpanel"
        aria-labelledby="pills-payment-account-tab"
        tabIndex={0}
      >
        <PaymentAccount />
      </div>
    </>
  );
};

export default PaymentSettings;
