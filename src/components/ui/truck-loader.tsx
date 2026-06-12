"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Rounding up your shoppers…",
  "Warming up the campaign engine…",
  "Polishing your dashboard…",
  "Delivering the good stuff…",
  "Almost at your doorstep…",
];

export function TruckLoader() {
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setMsg((m) => (m + 1) % MESSAGES.length),
      1600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
      <div className="loader">
        <div className="truckWrapper">
          <div className="truckBody">
            <svg viewBox="0 0 198 93" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeWidth="3"
                stroke="#2563eb"
                fill="#dbeafe"
                d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
              />
              <path
                strokeWidth="3"
                stroke="#2563eb"
                fill="#eff6ff"
                d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
              />
              <path
                strokeWidth="2"
                stroke="#2563eb"
                fill="#2563eb"
                d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
              />
              <rect
                strokeWidth="3"
                stroke="#2563eb"
                fill="#3b82f6"
                rx="2"
                height="90"
                width="121"
                y="1.5"
                x="6.5"
              />
              <rect
                strokeWidth="2"
                stroke="#2563eb"
                fill="#eff6ff"
                rx="2"
                height="4"
                width="6"
                y="84"
                x="1"
              />
            </svg>
          </div>
          <div className="truckTires">
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle
                strokeWidth="3"
                stroke="#2563eb"
                fill="#1e3a8a"
                r="13.5"
                cy="15"
                cx="15"
              />
              <circle fill="#eff6ff" r="6" cy="15" cx="15" />
            </svg>
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <circle
                strokeWidth="3"
                stroke="#2563eb"
                fill="#1e3a8a"
                r="13.5"
                cy="15"
                cx="15"
              />
              <circle fill="#eff6ff" r="6" cy="15" cx="15" />
            </svg>
          </div>
          <div className="road" />
          <svg
            className="lampPost"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 453.459 453.459"
          >
            <path
              fill="#2563eb"
              d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,224.083,16,253.295,16c29.992,0,54.388,24.396,54.388,54.388c0,9.972-2.703,19.673-7.831,28.041l13.616,8.342c6.681-10.904,10.215-23.498,10.215-36.383C323.683,31.755,291.927,0,252.882,0z M232.77,111.694c0,21.864-17.788,39.652-39.652,39.652c-21.864,0-39.652-17.788-39.652-39.652c0-5.531,1.146-10.798,3.21-15.583h72.883C231.624,100.896,232.77,106.163,232.77,111.694z"
            />
          </svg>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500 transition-opacity duration-300">
        {MESSAGES[msg]}
      </p>
    </div>
  );
}
