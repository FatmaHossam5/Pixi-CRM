const Dependents = ({
  dependentsNumber,
  register,
  dependentsRelationships,
  dependentsTypes,
}) => {
  return (
    <>
      <div
        className={`reservation-section ${
          dependentsNumber > 0 ? "px-section-show" : "px-section-hide"
        } `}
      >
        <div className="separetor my-4" />
        <div className="section-head d-flex justify-content-between">
          <h5 className="section-title ">Dependents Information</h5>
        </div>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-25">
            <label className="mb-2" htmlFor>
              dependant english name
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className="px-form-input w-100 m-auto"
              {...register("dependant_name_en")}
            />
          </div>

          <div className="input-package mt-3 px-2 d-flex flex-column w-25">
            <label className="mb-2">dependant arabic name</label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className="px-form-input w-100 m-auto"
              {...register("dependant_name_ar")}
            />
          </div>

          <div className="input-package mt-3 px-2 d-flex flex-column w-25">
            <label className="mb-2" htmlFor>
              dependant type
            </label>
            <select
              type="text"
              className="px-login-input w-100 "
              {...register("age_group_id")}
            >
              <option value="">select type</option>
              {dependentsTypes && dependentsTypes.map((dependentsType) => (
                <option key={dependentsType.id} value={dependentsType.id}>
                  {
                    dependentsType?.pms_age_group_en
                      ?.age_group_name_en
                  }
                </option>
              ))}
            </select>
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-25">
            <label className="mb-2" htmlFor>
              relationship
            </label>
            <select
              type="text"
              className="px-login-input w-100 "
              {...register("dependant_relationship_id")}
            >
              <option value="">select relationship</option>
              {dependentsRelationships &&
                dependentsRelationships?.map((dependentsRelationship) => (
                  <option
                    key={dependentsRelationship.id}
                    value={dependentsRelationship.id}
                  >
                    {
                      dependentsRelationship?.pms_dependant_relationship_en
                        ?.dependant_relationship_name_en
                    }
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3  d-flex flex-column w-50 pe-2">
            <label className htmlFor>
              age
            </label>
            <input
              type="text"
              placeholder="age"
              className="px-form-input w-100 m-auto"
              {...register("dependant_age")}
            />
          </div>
          <div className="input-package mt-3 w-50 ps-2">
            <label className htmlFor>
              national ID
            </label>
            <div className="id">
              <input
                type="number"
                className="px-form-input id-input-number w-100"
                placeholder="National Id"
                {...register("dependant_national_id")}
              />
              <label className="id-icon" htmlFor="id-file">
                <svg
                  width={16}
                  height={18}
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1950_5778)">
                    <path
                      d="M13.3826 2.36602C12.3595 1.34297 10.7001 1.34297 9.6771 2.36602L2.9271 9.11602C1.28179 10.7613 1.28179 13.4262 2.9271 15.0715C4.57241 16.7168 7.23726 16.7168 8.88257 15.0715L14.2263 9.72773C14.4443 9.50977 14.8029 9.50977 15.0209 9.72773C15.2388 9.9457 15.2388 10.3043 15.0209 10.5223L9.6771 15.866C7.59233 17.9508 4.21382 17.9508 2.13257 15.866C0.0513185 13.7812 0.047803 10.4062 2.13257 8.32148L8.88257 1.57148C10.3451 0.108984 12.7146 0.108984 14.1771 1.57148C15.6396 3.03398 15.6396 5.40352 14.1771 6.86602L7.71538 13.3277C6.72398 14.3191 5.09273 14.2277 4.21382 13.1344C3.46499 12.1992 3.53882 10.8492 4.38608 10.002L9.72632 4.66523C9.94429 4.44727 10.3029 4.44727 10.5209 4.66523C10.7388 4.8832 10.7388 5.2418 10.5209 5.45977L5.18413 10.7965C4.74116 11.2395 4.70249 11.9426 5.09272 12.4313C5.54976 13.0008 6.40054 13.05 6.91734 12.5332L13.3826 6.07148C14.4056 5.04844 14.4056 3.38906 13.3826 2.36602Z"
                      fill="#4B4F56"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1950_5778">
                      <rect width="15.75" height={18} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </label>
              <input
                className="d-none id-input-file"
                type="file"
                id="id-file"
              />
            </div>
          </div>
        </div>
        <div className="actions d-flex my-3">
          <button className="px-btn px-blue-btn ms-auto" type="button">
            add dependent
          </button>
        </div>
      </div>
    </>
  );
};

export default Dependents;
