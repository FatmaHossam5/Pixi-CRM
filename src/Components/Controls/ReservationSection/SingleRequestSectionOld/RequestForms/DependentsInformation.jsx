import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";

const DependentsInformation = ({ id, sections, setSections }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "all" });
  const { baseUrlPms, Headers, userId } = useContext(AuthContext);

  // Dependent Information
  /* dependent type select menu */
  const [dependentsTypes, setDependentsTypes] = useState([]);

  const getDependentType = () => {
    axios
      .get(`${baseUrlPms}/age_group/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setDependentsTypes(res.data);
      })
      .catch((error) => {});
  };

  const [dependentsRelationships, setDependentsRelationships] = useState([]);
  const getDependentRelationship = () => {
    axios
      .get(`${baseUrlPms}/dependant_relationship/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setDependentsRelationships(res.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getDependentType();
    getDependentRelationship();
  }, []);

  const removeSection = () => {
    setSections(elementID => elementID.filter( x => x.id !== id))
  };

  return (
    <>
      <div className="reservation-section">
        <div className="section-head d-flex justify-content-between mt-5">
          <h5 className="section-title ">Dependents Information</h5>
          <button
            class="px-btn  px-minus-btn"
            onClick={removeSection}
            type="button"
          >
            <i class="fa-regular fa-minus"></i>
          </button>
        </div>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              dependant arabic name
            </label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className="px-form-input w-100 m-auto"
            />
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              dependant english name
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className="px-form-input w-100 m-auto"
            />
          </div>
        </div>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              dependant type
            </label>

            <select type="text" className="px-login-input w-100 ">
              <option value>Select Type</option>
              {dependentsTypes &&
                dependentsTypes.map((dependentType) => {
                  return (
                    <option value={dependentType.id}>
                      {
                        dependentType?.pms_dependant_type_en
                          ?.dependant_type_name_en
                      }
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              relationship
            </label>
            <select
              type="text"
              className="px-login-input w-100 "
              {...register("dependant_relationship_id")}
            >
              <option value="">Select Relationship</option>
              {dependentsRelationships.map((dependentsRelationship) => (
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
        <div className="input-package mt-3  d-flex flex-column w-100">
          <label className htmlFor>
            national id
          </label>
          <input
            type="text"
            placeholder="National id"
            className="px-form-input w-100 m-auto"
          />
        </div>
      </div>
    </>
  );
};

export default DependentsInformation;
