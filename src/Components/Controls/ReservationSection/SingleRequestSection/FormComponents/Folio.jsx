const Folio = () => {
  return (
    <>
      <div className="folio-details px-5 py-3 mt-4 d-flex justify-content-between flex-wrap ">
        <div className="title w-100">
          <h5>folio details</h5>
        </div>
        <div className="details w-50 d-flex my-3">
          <span className="paied-amount me-5">
            <h6>amount paied : $10,500</h6>
          </span>
          <span className="initial-cost me-5">
            <h6>initial cost : $10,000</h6>
          </span>
          <span className="total-taxes">
            <h6>total taxes : $500</h6>
          </span>
        </div>
        <div className="total w-50 d-flex my-3 justify-content-end ">
          <span className="total-cost me-5">
            <h6>Total Cost : $10,500</h6>
          </span>
          <span className="remaining">
            <h6>Remaining : $500</h6>
          </span>
        </div>
      </div>

    </>
  )
}

export default Folio