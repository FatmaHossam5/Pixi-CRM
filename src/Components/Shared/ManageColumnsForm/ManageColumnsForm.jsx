const ManageColumnsForm = ({ selectAll,
    handleSelectAll,
    columns,
    visibleColumns,
    handleColumnVisibilityChange,
    handleSaveVisibility }) => {
    return (
        <>
            <div className="w-100 p-2">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    <label className="mb-3 form-check-label text-primary">
                        Select All
                    </label>
                </div>

                {columns?.map((col, index) => (
                    <div key={index} className="mb-3 form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={col.name}
                            checked={visibleColumns?.find((c) => c.name === col.name)?.visible}
                            onChange={() => handleColumnVisibilityChange(col.name)}
                            disabled={index === 0}
                        />
                        <label className="form-check-label">{col.name}</label>
                    </div>
                ))}
            </div>
            {/* Save Button */}
            <button
                className="btn btn-primary w-100"
                onClick={() => {
                    handleSaveVisibility(visibleColumns)

                    console.log("save");

                }}
            >
                Save Column Visibility
            </button>
        </>
    );
};

export default ManageColumnsForm;
