import React, { useState } from "react";
import { MenuItem, TextField } from "@mui/material";

const NewProduts = () => {
  // const [availableSize, setAvailableSize] = useState([
  //   { id: 1, name: "Small", code: "sm" },
  //   { id: 2, name: "Medium", code: "md" },
  //   { id: 3, name: "Large", code: "lg" },
  //   { id: 4, name: "Extra Large", code: "xl" },
  //   { id: 5, name: "Extra  Extra Large", code: "xxl" },
  // ]);

  const [sellingPrice, setSellingPrice] = useState("");

  const handleChange = (e, name) => {};

  return (
    <div className="appWrapper">
      <div className="row">
        <div className="pageTitle shadow rounded">
          <h3>New Product Entry</h3>
          <div></div>
        </div>

        <div className="shadow mt-3 p-3">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
              <TextField
                type="text"
                id="productName"
                label="Product Name"
                variant="outlined"
                value={sellingPrice}
                onChange={(e) => handleChange(e, "sellingPrice")}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
              <TextField
                id="price"
                label="Price"
                variant="outlined"
                value={sellingPrice}
                onChange={(e) => handleChange(e, "sellingPrice")}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
              <TextField
                type="text"
                id="discount"
                label="Discount"
                variant="outlined"
                value={sellingPrice}
                onChange={(e) => handleChange(e, "sellingPrice")}
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
              <TextField
                type="text"
                id="sellingPrice"
                label="Selling Price"
                variant="outlined"
                value={sellingPrice}
                onChange={(e) => handleChange(e, "sellingPrice")}
              />
            </div>
            {/* <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
              <TextField 
              id="size" 
              label="Size" 
              variant="outlined" 
              select
              value={sellingPrice}
                onChange={(e) => handleChange(e, "sellingPrice")}
              >
                {availableSize.map((item) => (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                ))}
              </TextField>
            </div> */}
            <div className="col-sm-12 col-md-6 col-lg-3 mt-3">
              <TextField
                type="text"
                id="sellingPrice"
                label="Selling Price"
                variant="outlined"
                value={sellingPrice}
                onChange={(e) => handleChange(e, "sellingPrice")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduts;
