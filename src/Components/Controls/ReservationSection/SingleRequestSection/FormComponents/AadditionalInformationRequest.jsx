import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const AadditionalInformationRequest = ({ register }) => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [channels, setChannel] = useState()

  const getChannels = () => {
    axios
      .get(`${baseUrlPms}/channel_booking/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setChannel(res.data);
      })
      .catch((error) => { });
  };

  const [visitPurpose, setVisitPurpose] = useState()

  const getVisitPurpose = () => {
    axios
      .get(`${baseUrlPms}/visit_purpose/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setVisitPurpose(res.data);
      })
      .catch((error) => { });
  };
  useEffect(() => {
    getChannels();
    getVisitPurpose()
  }, []);

  return (
    <>
      <div className="reservation-section p-4">
        <div className="separetor mb-4" />

        <div className="section-head d-flex justify-content-between ">
          <h5 className="section-title ">additional Information</h5>
        </div>
        <div className="form-inputs  container-fluid  gx-0">
          <div className="row ">
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100" >
                  request type
                </label>
                <select type="text" className="px-login-input w-100 ">
                  <option value>select request type</option>
                  <option value="confirmed">confirmed</option>
                  <option value="not confirmed">not confirmed</option>
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100" htmlFor>
                  Purpose of visit

                </label>
                <select type="text" className="px-login-input w-100 ">
                  <option value="">select Reason</option>
                  {visitPurpose && visitPurpose?.map((visit) => (
                    <option key={visit.id} value={visit.id}>
                      {
                        visit?.pms_visit_purpose_en
                          ?.visit_purpose_en
                      }
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100" htmlFor>
                  channel booking
                </label>
                <select
                  className="px-login-input w-100"
                  placeholder="enter channel booking"
                  {...register("channel_booking_id")}
                >
                  {/* waiting from back end */}
                  <option value="">select channel booking</option>
                  {channels && channels?.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {
                        channel?.pms_channel_booking_en
                          ?.channel_booking_name_en
                      }
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AadditionalInformationRequest;
