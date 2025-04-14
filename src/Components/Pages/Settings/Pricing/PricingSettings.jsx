import BedsPricing from "../../../Controls/SettingsSection/PricingSettingSection/BedsPricing/BedsPricing"
import BuildingsPricing from "../../../Controls/SettingsSection/PricingSettingSection/BuildingsPricing/BuildingsPricing"
import FloorsPricing from "../../../Controls/SettingsSection/PricingSettingSection/FloorsPricing/FloorsPricing"
import RoomsPricing from "../../../Controls/SettingsSection/PricingSettingSection/RoomsPricing/RoomsPricing"

const PricingSettings = ({ activeTab }) => {
  return (
    <>
      <div className="tab-content" id="pills-tabContent">
        <div
          className={`tab-pane fade ${activeTab === "beds-pricing" ? "show active" : ""}`}
          id="pills-beds-pricing"
          role="tabpanel"
          aria-labelledby="pills-beds-pricing-tab"
          tabIndex={0}
        >
          <BedsPricing />
          
        </div>
        
        <div
          className={`tab-pane fade ${activeTab === "rooms-pricing" ? "show active" : ""}`}
          id="pills-rooms-pricing"
          role="tabpanel"
          aria-labelledby="pills-rooms-pricing-tab"
          tabIndex={0}
        >
          <RoomsPricing />
        </div>
        <div
          className={`tab-pane fade ${activeTab === "floors-pricing" ? "show active" : ""}`}
          id="pills-floors-pricing"
          role="tabpanel"
          aria-labelledby="pills-floors-pricing-tab"
          tabIndex={0}
        >
          <FloorsPricing />
        </div>
        <div
          className={`tab-pane fade ${activeTab === "buildings-pricing" ? "show active" : ""}`}
          id="pills-buildings-pricing"
          role="tabpanel"
          aria-labelledby="pills-buildings-pricing-tab"
          tabIndex={0}
        >
          <BuildingsPricing />
        </div>
        <div
          className={`tab-pane fade ${activeTab === "rooms" ? "show active" : ""}`}
          id="pills-rooms"
          role="tabpanel"
          aria-labelledby="pills-rooms-tab"
          tabIndex={0}
        >
          {/* <Rooms /> */}
        </div>
      </div>
    </>
  )
}

export default PricingSettings
