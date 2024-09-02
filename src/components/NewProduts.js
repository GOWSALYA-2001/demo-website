import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Autocomplete from "@mui/material/Autocomplete";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;
const NewProduts = (props) => {
  const [openDialog, setOpenDialog] = useState(props.openDialog);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productSize, setProductSize] = useState([]);
  const [productSPrice, setProductSPrice] = useState("");
  const [productDiscription, setProductDiscription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(props.selectedProduct);
  const [inputsError, setInputError] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const [availableSize] = useState([
    { id: 1, name: "Small", code: "sm" },
    { id: 2, name: "Medium", code: "md" },
    { id: 3, name: "Large", code: "lg" },
    { id: 4, name: "Extra Large", code: "xl" },
    { id: 5, name: "Extra Extra Large", code: "xxl" },
  ]);

  useEffect(() => {
    setOpenDialog(props.openDialog);
    setSelectedItem(props.selectedProduct);
    console.log(props.selectedProduct);
  }, [openDialog, props.openDialog, props.selectedProduct]);

  const isArrayCheck = (key, data) => {
    return data.indexOf(key) !== -1;
  };

  useEffect(() => {
    if (selectedItem) {
      let pName = selectedItem.productName ? selectedItem.productName : "";
      let pPrice = selectedItem.price ? selectedItem.price : "";
      let pDiscount = selectedItem.discount ? selectedItem.discount : "";
      let pSPrice = selectedItem.sellingPrice ? selectedItem.sellingPrice : "";
      let pdescription = selectedItem.description
        ? selectedItem.description
        : "";
      let psize = [];
      let pImage = selectedItem.image ? selectedItem.image : "";
      let sizeArr = [];

      if (selectedItem.size) {
        psize = selectedItem.size.split(/[,]+/);
      }

      availableSize.forEach((item) => {
        if (psize.length > 0) {
          psize = psize.map((item) => item.trim());
          if (isArrayCheck(item.code, psize)) {
            sizeArr.push(item);
          }
        }
      });

      setProductName(pName);
      setProductPrice(pPrice);
      setProductDiscription(pdescription);
      setProductDiscount(pDiscount);
      setProductSPrice(pSPrice);
      setProductSize(sizeArr);
      setProductImage(pImage);
    }
  }, [selectedItem, availableSize]);

  function isValidNumber(input) {
    const regex = /^[0-9]*\.?[0-9]+$/;
    return regex.test(input);
  }

  const handleChange = (e, name, err, errMsg, type) => {
    let value = "";
    let autoArr = [...productSize];

    if (type === "file") {
      let file = e.target.files ? e.target.files[0] : null;
      let reader = new FileReader();
      if(file){
        reader.onload = ()=> {
          value = reader.result;
          setProductImage(value);
        };
         reader.readAsDataURL(file);
        console.log(value);
        // setProductImage(value);
        // setProductImage(reader.readAsDataURL(file));
      }else{
        console.log("No file selected")
      }
      // console.log('Files:', e.target.files);
      // setProductImage(reader);
      
      // value = reader;
    } else if (type === "number") {
      value = "";
      if (isValidNumber(e.target.value)) {
        value = e.target.value;
      }
    } else if (type === "auto") {
      autoArr = e;
      if (autoArr.length > 0) {
        // Safe to access autoArr[0]
      } else {
        // console.log("autoArr is empty");
      }
    } else {
      value = e.target.value;
    }

    // console.log(value);

    if (name === "productName") {
      setProductName(value);
    } else if (name === "productPrice") {
      setProductPrice(value);
    } else if (name === "productDiscount") {
      setProductDiscount(value);
    } else if (name === "productSPrice") {
      setProductSPrice(value);
    } else if (name === "productSize") {
      setProductSize(autoArr);
      // console.log('Product Size:', productSize);
    } 
    // else if (name === "productImage") {
    //   setProductImage(value);
    // } 
    else if (name === "productDiscription") {
      setProductDiscription(value);
    }

    setInputError(true);
    setErrorCode("");
  };

  const handleSubmit = () => {
    if (productName.trim() === "") {
      setInputError(true);
      setErrorCode("pName");
      document.getElementById("productName").focus();
    } else if (productPrice === "") {
      setInputError(true);
      setErrorCode("price");
      document.getElementById("price").focus();
    } else if (productSPrice === "") {
      setInputError(true);
      setErrorCode("pSPrice");
      document.getElementById("sPrice").focus();
    } else if (productSize.length === 0) {
      setInputError(true);
      setErrorCode("pSize");
      document.getElementById("size").focus();
    } else {
      let sizeArr = [];
      if (productSize.length > 0) {
        productSize.forEach((item) => {
          sizeArr.push(item.code);
        });
      }

      let obj = {
        id:
          selectedItem && selectedItem.id
            ? selectedItem.id
            : new Date().getTime(),
        productName: productName ? productName : "",
        price: productPrice ? productPrice : "",
        discount: productDiscount ? productDiscount : "",
        sellingPrice: productSPrice ? productSPrice : "",
        size: sizeArr ? sizeArr : [],
        description: productDiscription ? productDiscription : "",
        image: productImage ? productImage : "",
      };

      if (obj) {
        if (selectedItem && selectedItem.id) {
          props.callBackHome("update", obj);
        } else {
          props.callBackHome("addNew", obj);
        }
      }
    }
  };

  return (
    <Dialog open={openDialog}>
      <DialogTitle className="bg-primary text-white d-flex justify-content-between align-items-center">
        {"Add Products"}
        <CancelIcon
          style={{ cursor: "pointer" }}
          onClick={() => props.callBackHome("close", "")}
        />
      </DialogTitle>
      <DialogContent>
        <div className="row">
          <div className="col-sm-12 mt-3">
            <TextField
              type="text"
              id="productName"
              label="Product Name"
              variant="outlined"
              value={productName}
              onChange={(e) =>
                handleChange(e, "productName", "inputsError", "pName", "text")
              }
              error={
                inputsError === true && errorCode === "pName" ? true : false
              }
              helperText={
                inputsError === true && errorCode === "pName"
                  ? "This field is requied"
                  : "Maximum 50 chaacters"
              }
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              value={productPrice}
              onChange={(e) =>
                handleChange(
                  e,
                  "productPrice",
                  "inputsError",
                  "price",
                  "number"
                )
              }
              error={
                inputsError === true && errorCode === "price" ? true : false
              }
              helperText={
                inputsError === true && errorCode === "price"
                  ? "This field is requied"
                  : "Maximum 50 chaacters"
              }
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            <TextField
              type="text"
              id="discount"
              label="Discount"
              variant="outlined"
              value={productDiscount}
              onChange={(e) =>
                handleChange(e, "productDiscount", "", "", "number")
              }
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            <TextField
              type="text"
              id="sPrice"
              label="Selling Price"
              variant="outlined"
              value={productSPrice}
              onChange={(e) =>
                handleChange(
                  e,
                  "productSPrice",
                  "inputsError",
                  "pSPrice",
                  "number"
                )
              }
              error={
                inputsError === true && errorCode === "pSPrice" ? true : false
              }
              helperText={
                inputsError === true && errorCode === "pSPrice"
                  ? "This field is requied"
                  : "Maximum 50 chaacters"
              }
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            <Autocomplete
              multiple
              limitTags={2}
              id="size"
              options={availableSize}
              getOptionLabel={(option) => option.name}
              value={productSize}
              onChange={(e, val) =>
                handleChange(
                  val,
                  "productSize",
                  "inputsError",
                  "errorCode",
                  "auto"
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Size"
                  placeholder="Select Size"
                  fullWidth
                  error={
                    inputsError === true && errorCode === "size" ? true : false
                  }
                  helperText={
                    inputsError === true && errorCode === "size"
                      ? "This field is requied"
                      : "Maximum 50 chaacters"
                  }
                />
              )}
            />
          </div>
          <div className="col-sm-12 mt-3">
            <TextField
              id="description"
              label="Description"
              multiline
              rows={2}
              value={productDiscription}
              onChange={(e) =>
                handleChange(e, "productDiscription", "", "", "text")
              }
              fullWidth
            />
          </div>
          <div className="col-sm-12 mt-3">
            {productImage ? (
              <div className="row">
                <div className="col-sm-9 mt-3">
                  <TextField
                    type="file"
                    id="image"
                    label="Image"
                    onChange={(e) =>
                      handleChange(e, "productImage", "", "", "file")
                    }
                    accept=".png,.jpg,.jpeg,.webp"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    fullWidth
                    multiple
                  />
                </div>
                <div className="col-sm-3 mt-3 d-flex justify-content-center align-item-center">
                  <Avatar
                    alt="Product Image"
                    src={productImage}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
              </div>
            ) : (
              <TextField
                type="file"
                id="image"
                label="Image"
                onChange={(e) =>
                  handleChange(e, "productImage", "", "", "file")
                }
                accept=".png,.jpg,.jpeg,.webp"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
                multiple
              />
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          className="bg-success text-white"
          onClick={handleSubmit}
        >
          {"Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProduts;
