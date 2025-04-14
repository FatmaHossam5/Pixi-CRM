import { useEffect, useState } from 'react';
import PaymentTab from '../../../Controls/SettingsSection/SettingsTab/PaymentTab'
import PaymentSettings from './PaymentSettings';

const PaymentPage = () => {

      // Manage activeTab in the parent component
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("paymentActiveTab") || "payment-method";
  });

  // Update localStorage whenever activeTab changes
  useEffect(() => {
    localStorage.setItem("paymentActiveTab", activeTab);
  }, [activeTab]);

  return (
    <>
      <PaymentTab activeTab={activeTab} setActiveTab={setActiveTab}/>
      <PaymentSettings activeTab={activeTab}/>
    </>
  )
}

export default PaymentPage
