import { Controller, useForm } from "react-hook-form";
import FromButton from "../FromButton/FromButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import useBranch from "../../Helpers/Hook/useBranch";
import { useTranslation } from "react-i18next";
import Select from "react-select";
const FilterationForm = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({ mode: "all" });

    const { setIsDisabled, isDisabled, setIsLoading } = useContext(AuthContext);
    const { branches } = useBranch()

    const [isActive, setIsActive] = useState(true);  // Default to true (Active)

    const handleStatusChange = (value) => {
        setIsActive(value);
    };

    return (
        <>
            <form
            //  onSubmit={handleSubmit(createBuilding)}
            >
                <div className="form-inputs d-flex w-100 px-3 custom-form-inputs form-inputs-row">
                    <div className="input-package mt-3 d-flex flex-column w-100">
                        <label className="mb-2 modal-label" htmlFor="branch">
                            {`${t("selectInput.select")} ${t("branch")}`}
                        </label>

                        <Controller
                            control={control}
                            name="branch_id"
                            render={({ field }) => {
                                const options =
                                    branches?.map((branch) => ({
                                        value: branch.id,
                                        label: branch?.branch_name_en,
                                    })) || [];
                                return (
                                    <Select
                                        {...field}
                                        value={options.find((option) => option.value === field.value)}
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption ? selectedOption.value : null);
                                        }}
                                        options={options}
                                        placeholder={`${t("selectInput.choose")} ${t("branch")}`}
                                        isClearable
                                        className={`border-0 test border-05 w-100 ${isDisabled ? "disabled-input" : ""}`}
                                        classNamePrefix="select"
                                        disabled={isDisabled}
                                    />
                                );
                            }}
                        />
                    </div>
                </div>


                {/* Activation Section with Radio Buttons */}
                <div className="form-inputs d-flex flex-column px-3 mt-3">
                    <label className="mb-2 modal-label">
                        {t("Activation")}
                    </label>

                    <div className="d-flex gap-3">
                        <label>
                            <input
                                className="form-check-input"
                                type="radio"
                                value="true"
                                checked={isActive === true}
                                onChange={() => handleStatusChange(true)}
                            />
                            Active
                        </label>

                        <label>
                            <input
                                className="form-check-input"
                                type="radio"
                                value="false"
                                checked={isActive === false}
                                onChange={() => handleStatusChange(false)}
                            />
                            Inactive
                        </label>
                    </div>

                    {errors.activation && (
                        <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                    )}
                </div>


                <FromButton reset={reset} />
            </form>
        </>
    )
}

export default FilterationForm

// class="select__indicator-separator css-1u9des2-indicatorSeparator"