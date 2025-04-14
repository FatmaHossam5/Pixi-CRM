import axios from "axios";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Folio from "./Folio";

const PaymentInformation = ({ register }) => {
    const { baseUrlPms, Headers, userId, baseUrlMis } = useContext(AuthContext);
    const [taxes, setTaxes] = useState([]);
    const taxsData = () => {
        axios
            .get(`${baseUrlPms}/tax/all/`, {
                headers: Headers,
            })
            .then((res) => {
                setTaxes(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [currency, setCurrency] = useState();
    const getCurrency = () => {
        axios
            .get(`${baseUrlMis}/currency/all/`, {
                headers: Headers,
            })
            .then((res) => {
                setCurrency(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [paymentMethod, setPaymentMethod] = useState();
    const getPaymentMethod = () => {
        axios
            .get(`${baseUrlPms}/payment_method/all/`, {
                headers: Headers,
            })
            .then((res) => {
                setPaymentMethod(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const [paymentAccount, setPaymentAccount] = useState();
    const getPaymentAccount = () => {
        axios
            .get(`${baseUrlPms}/payment_account/all/`, {
                headers: Headers,
            })
            .then((res) => {
                setPaymentAccount(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        taxsData()
        getCurrency()
        getPaymentMethod()
        getPaymentAccount()
    }, [])

    return (
        <>
            <div className="reservation-section p-4">
                <div className="separetor mb-4" />

                <div className="section-head d-flex justify-content-between ">
                    <h5 className="section-title ">Payment Information</h5>
                </div>

                <div className="form-inputs mt-3 d-flex flex-wrap justify-content-between w-100">
                    <div className="input-package w-50 pe-2">
                        <label className="w-100">
                            Amount Payment
                        </label>
                        <div className="position-relative">
                            <input
                                type="text"
                                placeholder="Enter amount"
                                className="px-form-input w-100"
                                {...register("dependant_name_en")}
                            />
                            <select className="form-select position-absolute end-0 top-0 h-100 " style={{ width: 'auto', zIndex: 1 }}>
                                <option value="">Currency</option>
                                {currency && currency.map((cur) => (
                                    <option key={cur.id} value={cur.id}>
                                        {
                                            cur?.currency_symbol
                                        }
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="input-package w-50 ps-2">
                        <label className="w-100">
                            Taxes
                        </label>
                        <select
                            type="text"
                            className="px-login-input w-100 "
                            {...register("dependant_type_id")}
                        >
                            <option value="">select tax</option>
                            {taxes && taxes.map((tax) => (
                                <option key={tax.id} value={tax.id}>
                                    {
                                        tax?.pms_tax_en
                                            ?.tax_name_en
                                    }
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="form-inputs  container-fluid  gx-0">
                    <div className="row ">
                        <div className="col-4">
                            <div className="input-package mt-4">
                                <label className="w-100" htmlFor>
                                    Payment Method
                                </label>
                                <select
                                    type="text"
                                    className="px-login-input w-100 "
                                >
                                    <option value="">select Payment Method</option>
                                    {paymentMethod &&
                                        paymentMethod?.map((payment) => {
                                            return (
                                                <option key={payment.id} value={payment.id}>
                                                    {payment?.pms_payment_method_en?.payment_method_name_en}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="input-package mt-4">
                                <label className="w-100" htmlFor>
                                    Payment Account
                                </label>
                                <select
                                    type="text"
                                    className="px-login-input w-100 "
                                >
                                    <option value="">selsct room view</option>
                                    {paymentAccount &&
                                        paymentAccount?.map((payAcc) => {
                                            return (
                                                <option key={payAcc.id} value={payAcc.id}>
                                                    {payAcc?.pms_payment_account_en?.payment_account_description_en}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="input-package mt-4">
                                <label className="w-100" htmlFor>
                                    Payment Account
                                </label>
                                <select
                                    type="text"
                                    className="px-login-input w-100 "
                                >
                                    <option value="">selsct Payment Account
                                    </option>
                                    {paymentAccount &&
                                        paymentAccount?.map((payAcc) => {
                                            return (
                                                <option key={payAcc.id} value={payAcc.id}>
                                                    {payAcc?.pms_payment_account_en?.payment_account_description_en}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-inputs mt-3 d-flex flex-wrap justify-content-between w-100">
                    <div class="input-group w-30 mb-3">
                        <span class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"><h6 class="mb-0">guest balance : $500</h6></span>
                        <button class="input-group-text blue-text" id="basic-addon2">use balance</button>
                    </div>

                </div>

            </div>
            {/* Folio */}
            {/* <Folio /> */}

        </>
    );
}

export default PaymentInformation