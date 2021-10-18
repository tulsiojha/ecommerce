/** @format */

import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://rukminim1.flixcart.com/image/800/960/kmz7qfk0/shoe/4/u/a/6-hkr93-7-reebok-heritagenavy-nacho-bl-original-imagfrd23yezdasr.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/kg2l47k0-0/shoe/i/r/k/ew4301-7-reebok-black-horizon-blue-original-imafwdvju4x9fcna.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/k6l2vm80/watch/r/z/n/arrow-black-daniel-jubile-original-imafjyyhwkedgeja.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/kll7bm80/watch/x/g/k/kjr-492-alogo-original-imagyzckaznr8b8a.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/kd94uq80/watch/b/n/h/alogo-181-alogo-original-imafu7f6ewcypgur.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/jupu7ww0/watch/t/t/c/mk-2061w-lorenz-original-imaffrwerygwztxk.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/k070zgw0/sunglass/w/p/z/free-size-sg-45-eyevy-original-imafh5jbtv4np5gz.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/k5msb680/sunglass/e/h/p/free-ts-01-blue-eyevy-original-imafz9ubngyvax3z.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/800/960/krce64w0/shoe/a/s/o/5-gc-2336116-5-woodland-camel-original-imag55rkzydupvjj.jpeg?q=50",
  "https://rukminim1.flixcart.com/image/416/416/kmgn0cw0/pendrive/pendrive/8/z/j/sdcz50-032g-sdcz50-032g-i35-sandisk-original-imagfc7rdywypccr.jpeg?q=70",
  "https://rukminim1.flixcart.com/image/416/416/ksnjp8w0/mobile/k/o/m/c21y-rmx3261-realme-original-imag65kcytrk8dtr.jpeg?q=70",
  "https://rukminim1.flixcart.com/image/416/416/ksj9dow0/mobile/u/p/y/a1-2021-lf1000-lava-original-imag62vfwqkmcf2u.jpeg?q=70",
  "https://rukminim1.flixcart.com/image/416/416/koudfgw0/mobile/d/5/k/note-10s-note-10s-redmi-original-imag37ehhthffv7j.jpeg?q=70"
];
export default function Filebrowser(props) {
  const { open, setOpen, callback, multiple } = props;
  const [isCtrl, setIsCtrl] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  let timeOut = null;

  const x = (e) => {
    if (e.key === "Control") {
      if (e.type === "keydown") {
        clearTimeout(timeOut);
        setIsCtrl(true);
      } else {
        timeOut = setTimeout(() => {
          setIsCtrl(false);
        }, 200);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", x);
    window.addEventListener("keydown", x);
    return () => {
      window.removeEventListener("keyup", x);
      window.removeEventListener("keydown", x);
    };
  }, []);

  const onImageClicked = (e) => {
    const dict = selectedItems;
    if (isCtrl) {
      if (dict[e.target.getAttribute("src")]) {
        delete dict[e.target.getAttribute("src")];
        setSelectedItems({ ...dict });
      } else {
        setSelectedItems((prevItem) => ({
          [e.target.getAttribute("src")]: true,
          ...prevItem,
        }));
      }
    } else if (dict[e.target.getAttribute("src")]) {
      setSelectedItems({});
    } else {
      setSelectedItems({ [e.target.getAttribute("src")]: true });
    }
  };

  const OnChooseClicked = () => {
    setOpen(false);
    console.log("selected Items", Object.keys(selectedItems)[0]);
    callback(
      multiple ? Object.keys(selectedItems) : Object.keys(selectedItems)[0]
    );
    setSelectedItems({});
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItems({});
  };

  const handleMultiple = () => {
    return multiple
      ? Object.keys(selectedItems).length < 1
      : Object.keys(selectedItems).length !== 1;
  };
  return (
    <div className={`modal z-2000 ${open ? "modal-open" : ""}`}>
      <div className="modal-box shadow-md w-1/2">
        <div className="pb-2 font-semibold flex flex-row justify-between items-center">
          <h5>File browser</h5>
          <div className="flex flex-row justify-between items-center">
            <button className="btn btn-ghost btn-sm mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                  clipRule="evenodd"
                />
              </svg>
              <label className="ml-1">Add</label>
            </button>
            <button className="btn btn-circle btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="pl-5 py-1 h-96 w-full bg-gray-800 rounded">
          <div className="pr-5 grid grid-cols-3 gap-3 h-full w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {images.map((image, index) => {
              return (
                <div
                  className="relative max-h-24 bg-gray-200"
                  onClick={onImageClicked}
                >
                  <img
                    src={image}
                    className="object-cover h-full w-full rounded"
                  />
                  {selectedItems[image] && (
                    <span className="bg-check-button w-6 h-6 inline-block absolute top-0 left-0"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row justify-between pl-5 pr-5 pt-2">
          <button
            className="btn btn-error btn-sm"
            disabled={Object.keys(selectedItems).length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <div className="grid grid-cols-2 gap-x-1.5">
            <button
              className="btn btn-primary btn-sm"
              disabled={handleMultiple()}
              onClick={OnChooseClicked}
            >
              Choose
            </button>
            <button className="btn btn-sm" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
