import React, { useState } from 'react';
import CustomBreadcrumbs from '../CustomBreadcrumbs/customBreadcrumbs';
import DynamicSectionForTabs from '../DynamicSectionForTabs/DynamicSectionForTabs';
import {
    columns as businessColumns,
    data as businessData,
    fetchData as fetchBusinessData,
  } from '../../../../features/landlord/AllBusiness/BusinessTableConfig';
import BusinessForm from '../../../../features/landlord/AllBusiness/BusinessForm';

export default function AdminTabsContainer({}) {
  const [activeTab, setActiveTab] = useState('businesses');

  const tabConfig = {
    businesses: {
        translationKey: 'business',
        columnsConfig: businessColumns,
        data: businessData,
        fetchData: fetchBusinessData,
        createComponent: <BusinessForm/>,
      },
    subscriptions: {
      translationKey: 'subscription',
      columnsConfig: [],
      data: [],
      fetchData: () => {},
      createComponent: <div>Subscription Form</div>,
    },
    packages: {
      translationKey: 'package',
      columnsConfig: [],
      data: [],
      fetchData: () => {},
      createComponent: <div>Package Form</div>,
    },
    coupons: {
      translationKey: 'coupon',
      columnsConfig: [],
      data: [],
      fetchData: () => {},
      createComponent: <div>Coupon Form</div>,
    },
  };

  const breadcrumb = [
    { label: 'Super Admin', path: '/super-admin' },
    { label: 'All Businesses' },
  ];

  const tabs = [
    { label: 'All Businesses', key: 'businesses' },
    { label: 'Subscriptions', key: 'subscriptions' },
    { label: 'Packages', key: 'packages' },
    { label: 'Coupons', key: 'coupons' },
  ];

  return (
    <>
      <CustomBreadcrumbs
        breadcrumb={breadcrumb}
        title="Super Admin"
        tabs={tabs.map((tab) => ({
          label: tab.label,
          active: activeTab === tab.key,
          onClick: () => setActiveTab(tab.key),
        }))}
      />

      <DynamicSectionForTabs {...tabConfig[activeTab]} />
    </>
  );
}
