import { useMemo } from 'react';
import { DataProvider } from '../../../../Helpers/Context/useData';
import DynamicSection from '../../../../Shared/DynamicSection/DynamicSection';
import CreateMealPlan from './MealPlan/CreateMealPlan';
import MealPlan from './MealPlan/MealPlan';
import useFetchData from '../../../../Helpers/Hook/useFetchData';
import { useTabs } from '../../../../Helpers/Context/TabContext';

const MealPlanTable = ({ handleTabClick }) => {

    const { activeSubTab } = useTabs();
    const subTabsConfig = useMemo(
        () => [
            { id: "meal-plan", label: "meal-plan" },
        ],
        []
    );
    const endpoints = useMemo(() => {
        return {
            "meal-plan": "accommodation_type/all/",};
    }, []);

    const { data, fetchData } = useFetchData(endpoints[activeSubTab]);
    const filteredData = useMemo(() => {

        if (!data) return [];
        switch (activeSubTab) {
            case "meal-plan":
                return data.filter(
                    (row) =>
                        row?.pms_accommodation_type_en?.accommodation_type_name_en &&
                        row?.pms_accommodation_type_ar?.accommodation_type_name_ar
                );

            default:
                return [];
        }
    }, [data, activeSubTab]);

    return (
        <>
            <DataProvider value={{ data: filteredData, fetchData }}>
                <DynamicSection
                    subTabsConfig={subTabsConfig}
                    contentMapConfig={{
                        "meal-plan": (
                            <MealPlan data={filteredData} fetchData={fetchData} />
                        )

                    }}
                    componentMapConfig={{
                        "meal-plan": <CreateMealPlan fetchData={fetchData} />,


                    }}
                    handleTabClick={handleTabClick}
                />

            </DataProvider>
        </>
    );
}

export default MealPlanTable























