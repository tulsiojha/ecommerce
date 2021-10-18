/** @format */
// import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import Filebrowser from "./Filebrowser";
import FileSvg from "./FileSvg";
import { fetchMiddle } from "../fetchMiddle";
import { useLocation, useParams } from "react-router";
import Carousel from "./Carousel";
import {getUser} from "../Auth/User"


const insert = (arr, index, newItems) => {
  // console.log(newItems);
  return [...arr.slice(0, index), ...newItems, ...arr.slice(index)];
};

export default function NewPost(props) {
  const params = useParams();

  const [update, setUpdate] = useState(false);
  const [postStatus, setProductStatus] = useState({
    message: "",
    status: "",
  });
  const [modalOpen, setModalOpen] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [filebrowserOpen, setFilebrowserOpen] = useState(false);
  const [fileBrowserOpener, setFilebrowserOpener] = useState("cover");
  const [coverImage, setCoverImage] = useState("");
  const currentEditor = useRef();

  const [productTitle, setProductTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSellingPrice, setProductSellingPrice] = useState(0);
  const [productMarketPrice, setProductMarketPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productImages, setProductImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [changeCarouselImage, setChangeCarouselImage] = useState(true);


  const [publish, setPublish] = useState(true);

  const [error, setError] = useState(false);

  const filebrowserCallback = (data) => {
    if (fileBrowserOpener === "images") {
      if (changeCarouselImage) {
        productImages[currentSlide] = data;
      } else {
        setProductImages((prevState) => {
          var tempGeneral = [ ...prevState ];
          tempGeneral = insert(tempGeneral, currentSlide + 1, data);
          return tempGeneral;
        });
        // console.log(insert(images, currentSlide + 1, data));
      }
    } else if (fileBrowserOpener === "cover") {
      setCoverImage(data);
    }
  };


  const handleOnImageChangeClicked = () => {
    setChangeCarouselImage(true)
    setFilebrowserOpener("images");
    setFilebrowserOpen(true);
  };
  const handleOnImageAddClicked = () => {
    setFilebrowserOpener("images");
    setChangeCarouselImage(false)
    setFilebrowserOpen(true);
  };
  const handleOnImageDeleteClicked = () => {
    productImages((prevState) => {
      const tempGeneral = { ...prevState };
      tempGeneral.splice(currentSlide, 1);
      return tempGeneral;
    });
    setUpdate(true);
  };

  const handleProductTitleChange = (e) => {
    setProductTitle(e.target.value);
  };

  const handleproductDescChange = (e) => {
    setProductDesc(e.target.value);
  };

  const handleProductSellingPriceChange = (e)=>{
    setProductSellingPrice(e.target.value);
  }

  const handleProductMarketPriceChange = (e)=>{
    setProductMarketPrice(e.target.value);
  }

  const handleProductQuantityChange = (e)=>{
    setProductQuantity(e.target.value);
  }
 

  const handleDraftChange = (e) => {
    setPublish(e.target.checked);
  };

  const handleOnClickPost = () => {
    console.log("clicked");
    if (validateData()) {
      setError(false);
      createProduct();
    } else {
      setError(true);
    }
  };

  const validateData = () => {
    if (
      productTitle === "" ||
      productDesc === "" ||
      productSellingPrice === "" ||
      productMarketPrice === "" ||
      productQuantity === "" ||
      coverImage === ""
    ) {
      return false;
    }
    return true;
  };

  const handleBrowseOnclick = () => {
    setFilebrowserOpener("cover");
    setFilebrowserOpen(true);
  };

  const createProduct = async () => {
    let url = "http://127.0.0.1:8000/add_product";

    const result = await fetchMiddle(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getUser()}`
      },
      body: JSON.stringify(prepareProduct()),
    });
    if (result === "success") {
      setTimeout(() => {
        setProductStatus({
          message: ["Product added successfully"],
          status: "success",
        });
        setShowProgress(false);
        setModalOpen(false);
        setShowAlert(true);
        setUpdate(true);
      }, 1000);
    } else {
      setTimeout(() => {
        setProductStatus({
          message: ["Product addition failed !", "Something went wrong"],
          status: "error",
        });
        setShowProgress(false);
        setShowAlert(true);
      }, 1000);
    }
    console.log(result);
  };

  const prepareProduct = () => {
    const updateData = {};
    updateData.name = productTitle;
    updateData.description = productDesc;
    updateData.marketPrice = productMarketPrice;
    updateData.sellingPrice = productSellingPrice;
    updateData.stocks = productQuantity;
    // updateData.productCategory = productCategory;
    updateData.images = [coverImage].join();
    updateData.cover = coverImage[0];
    // updateData.publish = publish;

    return updateData;
  };

  useEffect(() => {
    console.log(params);
  });
  return (
    <div>
      <Filebrowser
        open={filebrowserOpen}
        setOpen={setFilebrowserOpen}
        callback={filebrowserCallback}
        multiple = {"images" && true}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bordered p-2">
          <div className="form-control">
            <label className="label py-3">
              <span className="label-text font-semibold">Product name</span>
            </label>
            <input
              placeholder="Product title"
              className={`input input-bordered`}
              type="text"
              value={productTitle}
              onChange={handleProductTitleChange}
            />
            {productTitle === "" && error && (
              <label class="pt-2">
                <p class="label-text-alt text-left text-red-400">
                  Product name is required!
                </p>
              </label>
            )}
            <label className="label py-2 mt-4">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              placeholder="Description"
              className={`input input-bordered h-24`}
              onChange={handleproductDescChange}
            >{productDesc}</textarea>
            {productDesc === "" && error && (
              <label class="pt-2">
                <p class="label-text-alt text-left text-red-400">
                  Product description is required!
                </p>
              </label>
            )}

            <label className="label py-2 mt-4">
              <span className="label-text font-semibold">Product Category</span>
            </label>

            <select
              class="select select-bordered w-full max-w-xs"
              onChange={(e) => setProductCategory(e.target.value)}
              value={productCategory}
            >
              <option disabled="disabled" selected="selected">
                Choose Product Category
              </option>
              <option>Electronics</option>
              <option>Mobile Acessories</option>
              <option>Men's Wearable</option>
              <option>Women's Wearable</option>

            </select>
          </div>
          <div className="card rounded-md">
          <label className="label py-2 mt-4">
                  <span className="label-text font-semibold">Cover</span>
                </label>
                <div
                  onClick={handleBrowseOnclick}
                  className="relative card py-1 bordered rounded-md flex flex-row justify-between items-center cursor-pointer"
                >
                  <FileSvg className="p-6 h-48 w-48 flex-1" />
                  <div className="flex-1 mr-4">
                    <h2 className="text-xl font-semibold ">Browse file</h2>
                    <p className="text-gray-300 font-semibold text-sm">
                      Click to open file browser
                    </p>
                  </div>
                  {coverImage !== "" && (
                    <div>
                      <img
                        src={coverImage}
                        className="absolute inset-0 object-cover w-full"
                      />
                      <button className="absolute btn glass top-1/2 left-1/2 -mt-6 -ml-12">
                        change image
                      </button>
                    </div>
                  )}
                </div>
                {coverImage === "" && error && (
                  <label class="pt-2">
                    <p class="label-text-alt text-left text-red-400">
                      Cover is required!
                    </p>
                  </label>
                )}
          </div>
        </div>
        <div className="card bordered p-2">
        <div className="form-control">
        <label className="label py-3">
              <span className="label-text font-semibold">Selling Price</span>
            </label>
            <input
              placeholder="Selling price"
              className={`input input-bordered`}
              type="text"
              value={productSellingPrice}
              onChange={handleProductSellingPriceChange}
              step="any"
            />
            {productSellingPrice === "" && error && (
              <label class="pt-2">
                <p class="label-text-alt text-left text-red-400">
                  Product selling Price is required!
                </p>
              </label>
            )}
            <label className="label py-3">
              <span className="label-text font-semibold">Market Price</span>
            </label>
            <input
              placeholder="Market price"
              className={`input input-bordered`}
              type="text"
              value={productMarketPrice}
              onChange={handleProductMarketPriceChange}
              step="any"
            />
            {productMarketPrice === "" && error && (
              <label class="pt-2">
                <p class="label-text-alt text-left text-red-400">
                  Product Market Price is required!
                </p>
              </label>
            )}
            <label className="label py-3">
              <span className="label-text font-semibold">Quantity</span>
            </label>
            <input
              placeholder="Product Quantity"
              className={`input input-bordered`}
              type="number"
              value={productQuantity}
              onChange={handleProductQuantityChange}
            />
            {productQuantity === "" && error && (
              <label class="pt-2">
                <p class="label-text-alt text-left text-red-400">
                  Product Quantity is required!
                </p>
              </label>
            )}
            {/* <figure className="relative w-96">
            <Carousel
                setCurrentSlide={setCurrentSlide}
                images={productImages}
              />
                  <div className="absolute inset-0 flex flex-col justify-end items-center pb-2">
                    <div class="btn-group">
                      <button
                        className="btn btn-outline btn-xs z-1000"
                        onClick={handleOnImageAddClicked}
                      >
                        add
                      </button>
                      <button
                        className="btn btn-outline btn-xs z-1000"
                        onClick={handleOnImageChangeClicked}
                      >
                        change
                      </button>
                      <button
                        className="btn btn-outline btn-xs z-1000"
                        onClick={handleOnImageDeleteClicked}
                      >
                        remove
                      </button>
          </div>
          </div>
            </figure> */}

          </div>
        </div>
        <div className="card bordered p-2 h-fit">
          <div class="form-control">
            <div class="p-2 card bordered">
              <label class="cursor-pointer label">
                <span class="label-text font-semibold">Publish</span>
                <input
                  type="checkbox"
                  checked={publish}
                  class="toggle toggle-xs"
                  onChange={handleDraftChange}
                />
              </label>
            </div>

            <div className="grid my-2">
              <button className="btn btn-primary btn-block" onClick={handleOnClickPost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
