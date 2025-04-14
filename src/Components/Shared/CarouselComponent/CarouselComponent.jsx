import React from 'react'
import { useState } from 'react';
import { Carousel } from 'react-bootstrap'
import photo from '../../../../src/assets/images/user2-160x160.jpg';
function CarouselComponent() {
  return (
    <>
      <div className="w-100 my-1 bg-danger">
        <Carousel interval={null} wrap={false} >
          <Carousel.Item>
            {/*----------------- start taps -----------------*/}
            <div className="px-taps">
              <ul
                className="nav pb-2 nav-pills"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active ms-0"
                    id="pills-General-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-General-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-General-Policies"
                    aria-selected="true"
                  >
                    General Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Contract-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Contract-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Contract-Policies"
                    aria-selected="false"
                  >
                    Contract Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Cancellation-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Cancellation-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Cancellation-Policies"
                    aria-selected="false"
                  >
                    Cancellation Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link "
                    id="pills-Refund-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Refund-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Refund-Policies"
                    aria-selected="true"
                  >
                    Refund Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Early-Check-In-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Early-Check-In-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Early-Check-In-Policies"
                    aria-selected="false"
                  >
                    Early Check In Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Late-Check-Out-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Late-Check-Out-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Late-Check-Out-Policies"
                    aria-selected="false"
                  >
                    Late Check Out Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Down-Payment-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Down-Payment-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Down-Payment-Policies"
                    aria-selected="false"
                  >
                    Down Payment Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Insurance-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Insurance-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Insurance-Policies"
                    aria-selected="false"
                  >
                    Insurance Policies
                  </button>
                </li>
              </ul>
            </div>
            {/*------------------ end taps ------------------*/}
          </Carousel.Item>
          <Carousel.Item>
            {/*----------------- start taps -----------------*/}
            <div className="px-taps">
              <ul
                className="nav pb-2 nav-pills"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active ms-0"
                    id="pills-General-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-General-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-General-Policies"
                    aria-selected="true"
                  >
                    General Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Contract-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Contract-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Contract-Policies"
                    aria-selected="false"
                  >
                    Contract Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Cancellation-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Cancellation-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Cancellation-Policies"
                    aria-selected="false"
                  >
                    Cancellation Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link "
                    id="pills-Refund-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Refund-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Refund-Policies"
                    aria-selected="true"
                  >
                    Refund Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Early-Check-In-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Early-Check-In-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Early-Check-In-Policies"
                    aria-selected="false"
                  >
                    Early Check In Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Late-Check-Out-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Late-Check-Out-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Late-Check-Out-Policies"
                    aria-selected="false"
                  >
                    Late Check Out Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Down-Payment-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Down-Payment-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Down-Payment-Policies"
                    aria-selected="false"
                  >
                    Down Payment Policies
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Insurance-Policies-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Insurance-Policies"
                    type="button"
                    role="tab"
                    aria-controls="pills-Insurance-Policies"
                    aria-selected="false"
                  >
                    Insurance Policies
                  </button>
                </li>
              </ul>
            </div>
            {/*------------------ end taps ------------------*/}
          </Carousel.Item>
          <Carousel.Item>
            <h5>Third slide label</h5>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  )
}
export default CarouselComponent
