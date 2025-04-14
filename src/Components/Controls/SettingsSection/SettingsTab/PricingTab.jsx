const PricingTab = ({ activeTab, setActiveTab }) => {
  // Handle tab click and update activeTab in the parent
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="px-card p-4 pb-0 mb-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 gx-0">
              <div className="card-head d-flex flex-wrap">
                <div className="page-name pt-2 pb-2 w-100">
                  <h3>Pricing settings</h3>
                  {/* Start Tabs */}
                  <div className="px-taps">
                    <ul
                      className="nav nav-pills mt-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "beds-pricing" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("beds-pricing")}
                          type="button"
                        >
                          Beds Pricing
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "rooms-pricing" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("rooms-pricing")}
                          type="button"
                        >
                          Rooms Pricing
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "floors-pricing" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("floors-pricing")}
                          type="button"
                        >
                          Floors Pricing
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "buildings-pricing" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("buildings-pricing")}
                          type="button"
                        >
                          Buildings Pricing
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "packages" ? "active" : ""
                          }`}
                          onClick={() => handleTabClick("packages")}
                          type="button"
                        >
                          Packages
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* End Tabs */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingTab;
