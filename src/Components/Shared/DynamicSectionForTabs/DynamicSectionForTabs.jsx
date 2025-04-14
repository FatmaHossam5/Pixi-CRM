import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../Helpers/Context/AuthContext';
import { ModalContext } from '../../Helpers/Context/ModalContext';
import AddFormOffcanvas from '../AddFormOffcanvas/AddFormOffcanvas';
import GeneralTable from '../GeneralTable/GeneralTable';

export default function DynamicSectionForTabs({
    data,
    fetchData,
    createComponent,
    translationKey,
    columnsConfig,
    filterFn,
    extraHeaderControls,
    viewMode,
    customContent,
    customPipelineDiv

}) {
    console.log("📦 viewMode:", viewMode);
    console.log("📦 customContent:", customContent);
    const { t } = useTranslation();
    const { baseUrlPms, Headers } = useContext(AuthContext);
    const { setShowState, showState } = useContext(ModalContext);


    console.log(data);

    const handleShowAdd = () => {
        setShowState(translationKey);
    };
    const component = React.cloneElement(createComponent, { refetch: fetchData });


    const filteredRows = data?.filter(filterFn);

    return (
        <div className="px-card">
            <div className="card-head d-flex pt-4 px-5 align-items-center">
                <h3 className="mb-0 px-sub-taps w-50 me-auto">{t(translationKey)}</h3>
                <button onClick={handleShowAdd} className="px-btn px-blue-btn ms-3">
                    <i className="fa-kit fa-add"></i>  {`${t('Add')} ${t(translationKey)} `}
                </button>



                <AddFormOffcanvas
                    name={translationKey}
                    showState={showState}
                    handleClose={() => setShowState(null)}
                    title={`${t('createNew')} ${t(translationKey)} `}
                    formComponent={component}
                />
              
            </div>
            {customPipelineDiv}
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-Hotel" role="tabpanel" aria-labelledby="pills-Hotel-tab" tabIndex={0}>
                    <GeneralTable
                        filteredRows={filteredRows}
                        columns={columnsConfig}
                        extraHeaderControls={extraHeaderControls}
                        viewMode={
                            viewMode
                        }
                        customContent={customContent}

                    />

                </div>
            </div>

        </div>
    )
}
