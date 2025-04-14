// import React, { useContext, useMemo } from "react";
import AddModal from "../../Shared/AddModal/AddModal";
import { useTranslation } from "react-i18next";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import TabContent from "../TabContent/TabContent";
import SubTabs from "../SubTabs/SubTabs";
import { useTabs } from "../../Helpers/Context/TabContext";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useMemo } from "react";
import AddFormOffcanvas from "../AddFormOffcanvas/AddFormOffcanvas";
import useLayerStore from "../useLayerStore";

const DynamicSection = ({ subTabsConfig, contentMapConfig, componentMapConfig, customCreateButtonMapConfig = {}, handleTabClick, ...extraProps }) => {
  const { t } = useTranslation();
  const { showState, handleClose, setShowState } = useContext(ModalContext);
  const { activeSubTab } = useTabs();
  const customCreateButton = customCreateButtonMapConfig[activeSubTab];
  const resetLayers = useLayerStore((state) => state.resetLayers); // Get resetLayers from the store

  // Memoized subTabs
  const subTabs = useMemo(
    () =>
      subTabsConfig.map((tab) => ({
        id: tab.id,
        label: t(tab.label, { defaultValue: tab.label }),
      })),
    [subTabsConfig, t]
  );

  const nameBtn = subTabs.find((tab) => tab.id === activeSubTab)?.label || t("unknownTab");
  const content = contentMapConfig[activeSubTab] || <div>{t("noContentAvailable")}</div>;
  const component = componentMapConfig[activeSubTab]
    ? React.cloneElement(componentMapConfig[activeSubTab], { ...extraProps })
    : <div>{t("noComponentAvailable")}</div>;

  const handleShowAdd = () => {
    setShowState(nameBtn);
  };

  // Reset layers when the active tab changes
  useEffect(() => {
    resetLayers(); // Close all layers when the tab changes
  }, [activeSubTab, resetLayers]);

  return (
    <div className="px-card">
      <div className="card-head d-flex p-4 pb-0">
        {/* SubTabs */}
        {subTabsConfig.length > 0 && (
          <div className="px-sub-taps w-50 me-auto">
            <SubTabs tabs={subTabs} activeTab={activeSubTab} onTabClick={handleTabClick} />
          </div>
        )}

        {/* Button */}
        {customCreateButton ? (
          customCreateButton
        ) : (
          <button
            onClick={handleShowAdd}
            className="px-btn px-blue-btn ms-3"
            aria-label={`${t("createNew")} ${nameBtn}`}
          >
            {t("createNew")} {nameBtn}
          </button>
        )}

        {/* Add Modal */}
        {!customCreateButton && (
          // <AddModal
          //   name={nameBtn}
          //   showState={showState}
          //   handleClose={handleClose}
          //   title={`${t("createNew")} ${nameBtn}`}
          //   headerClassName="custom-header"
          //   component={component}
          // />

          // <AddFormOffcanvas
          //   name={nameBtn}
          //   showState={showState}
          //   handleClose={handleClose}
          //   title={`${t("createNew")} ${nameBtn}`}
          //   headerClassName="custom-header"
          //   formComponent={component}
          // />
          <AddFormOffcanvas
            name={nameBtn}
            showState={showState}
            handleClose={handleClose}
            title={`${t("createNew")} ${nameBtn}`}
            headerClassName="custom-header"
            formComponent={component}
            // nestedContents={{
            //   settings: {
            //     title: "Settings",
            //     content: <div>Settings Content</div>,
            //     nested: {
            //       advanced: {
            //         title: "Advanced",
            //         content: <div>Advanced Settings</div>,
            //       },
            //     },
            //   },
            // }}
          />

        )}
      </div>

      {/* Tab Content */}
      <TabContent activeTab={activeSubTab} contentMap={contentMapConfig} />
    </div>
  );
};

DynamicSection.propTypes = {
  subTabsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  contentMapConfig: PropTypes.object.isRequired,
  componentMapConfig: PropTypes.object.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default DynamicSection;
