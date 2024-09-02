import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";

const AddProduct = React.lazy(() => import(`./NewProduts.js`));

const Index = () => {
  const [productListData, setProductListData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [openMoreMenu, setOpenMoreMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [anchorEl, setAnchorEl] = useState(true);
  const [selectedMoreText, setSelectedMoreText] = useState("");
  const [moreTextDialog, setMoreTextDialog] = useState(false);

  const headerData = [
    {
      name: "data",
      label: " ",
      options: {
        display: false,
        filter: false,
        viewColumns: false,
        download: false,
        print: false,
      },
    },
    { name: "productName", label: "Product Name", options: {} },
    { name: "price", label: "Price", options: { filter: false } },
    // { name: "discount", label: "Discount", options: {} },
    { name: "size", label: "", options: {} },
    { name: "description", label: "Desciption", options: { filter: false } },
    { name: "action", label: " ", options: { filter: false } },
  ];
  const [columnData, setColumnData] = useState([]);

  const options = {
    selectableRows: false,
    download: false,
    print: false,
    viewColumns: false,
    rowsPerPage: 5,
  };

  const addProducts = () => {
    setOpenDialog(true);
    setSelectedItem("");
  };

  const callBackHome = (action, data, index) => {
    console.log(data);
    let interchangeArr = [...productListData];
    let sizeString = "";

    if (data && data.size && data.size.length > 0) {
      data.size.forEach((sizes) => {
        sizeString =
          sizeString.trim() === ""
            ? sizes
            : sizeString
            ? sizeString + ", " + sizes
            : "";
      });
      data["size"] = sizeString;
    }
    if (data) {
      if (action && action === "addNew") {
        interchangeArr.push(data);
      } else if (action && action === "update") {
        interchangeArr.forEach((item, i) => {
          if (item.id && data.id && item.id === data.id) {
            interchangeArr[i] = data;
          }
        });
      }
    }

    if (interchangeArr.length > 0) {
      localStorage.removeItem("_MY_PRODUCT_LIST");
      localStorage.setItem("_MY_PRODUCT_LIST", JSON.stringify(interchangeArr));
    }

    setProductListData(interchangeArr);
    setOpenDialog(false);
  };

  // useEffect(() => {
  //   if(productListData.length > 0){
  //     frameTable();
  //   }
  // }, [productListData]);

  const handleUpdateProduct = (product, index) => {
    // setSelectedProduct(product);
    // setSelectedIndex(index);
    setOpenDialog(true);
    setOpenMoreMenu(false);
  };

  const handleDeleteProduct = (index) => {
    setSelectedIndex(index);
    setOpenDelete(true);
    setOpenMoreMenu(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedIndex(null);
    setOpenMoreMenu(false);
  };

  const handleYesDelete = () => {
    let interchangeArr = [...productListData];
    interchangeArr.splice(selectedIndex, 1);
    setProductListData(interchangeArr);
    setOpenDelete(false);

    if (interchangeArr.length === 0) {
      frameTable();
    }
  };

  const buildDeleteConfirmDialogue = () => (
    <Dialog open={openDelete} onClose={handleCloseDelete}>
      <DialogContent>
        <div className="row">
          <div className="col-sm-12 mt-3">
            Are you sure you want to delete this product?
          </div>
          <div className="col-sm-12 mt-3 text-right">
            <Button
              size="small"
              variant="contained"
              className="bg-red text-white me-2"
              onClick={handleCloseDelete}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              className="bg-green text-white"
              onClick={handleYesDelete}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const handleCloseMoreMenu = () => {
    setAnchorEl(null);
    setSelectedIndex("");
    setSelectedItem("");
    setOpenMoreMenu(false);
  };

  const buildMoreMenu = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMoreMenu}
        onClose={handleCloseMoreMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          className="text-primary"
          onClick={() => handleUpdateProduct(selectedItem, selectedIndex)}
        >
          Edit
        </MenuItem>
        <MenuItem
          className="text-primary"
          onClick={() => handleDeleteProduct(selectedIndex)}
        >
          Delete
        </MenuItem>
      </Menu>
    );
  };

  const moreMenu = (e, data, index) => {
    setSelectedIndex(index);
    setSelectedItem(data);
    setOpenMoreMenu(true);
    setAnchorEl(e.currentTarget);
  };

  const buildMoreTextDialog = () => {
    return (
      <Dialog open={moreTextDialog} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-primary text-white d-flex justify-content-between align-items-center">
          {"Description"}
          <CancelIcon
            style={{ cursor: "pointer" }}
            onClick={() => setMoreTextDialog(false)}
          />
        </DialogTitle>
        <DialogContent>
          <div className="mt-3">{selectedMoreText}</div>
        </DialogContent>
      </Dialog>
    );
  };

  const handleOpenMoeText = (text) => {
    setMoreTextDialog(true);
    setSelectedMoreText(text);
  };

  // const moreTextString = (text) => {
  //   let str = "";

  //   if (text && text.length > 10) {
  //     str = (
  //       <div
  //         className="text-primary"
  //         style={{ cursor: "pointer" }}
  //         onClick={() => handleOpenMoeText(text)}
  //       >
  //         {text.slice(0, 10) + "..."}
  //       </div>
  //     );
  //   } else if (text) {
  //     str = text;
  //   }

  //   return str;
  // };

  const moreTextString = useCallback((text) => {
    let str = "";
    if (text && text.length > 10) {
      str = (
        <div
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => handleOpenMoeText(text)}
        >
          {text.slice(0, 10) + "..."}
        </div>
      );
    } else if (text) {
      str = text;
    }

    return str;
  }, []);

  // const frameTable = (data) => {
  //   let interchangeArr = [...productListData];
  //   let html = [];

  //   if (interchangeArr.length > 0) {
  //     interchangeArr.forEach((item, index) => {
  //       let concatString = moreTextString(item.description);

  //       html.push({
  //         data: item,
  //         productName: item.productName ? item.productName : "-",
  //         price: item.sellingPrice ? item.sellingPrice : "-",
  //         size: item.size ? item.size : "-",
  //         description: concatString,
  //         action: (
  //           <MoreVertIcon
  //             className="text-primary pointer"
  //             style={{ cursor: "pointer" }}
  //             onClick={(e) => moreMenu(e, item, index)}
  //           />
  //         ),
  //       });
  //     });
  //   }

  //   setColumnData(html);
  // };

  const frameTable = useCallback(() => {
    let interchangeArr = [...productListData];
    let html = [];

    if (interchangeArr.length > 0) {
      interchangeArr.forEach((item, index) => {
        let concatString = moreTextString(item.description);

        html.push({
          data: item,
          productName: item.productName ? item.productName : "-",
          price: item.sellingPrice ? item.sellingPrice : "-",
          size: item.size ? item.size : "-",
          description: concatString,
          action: (
            <MoreVertIcon
              className="text-primary pointer"
              style={{ cursor: "pointer" }}
              onClick={(e) => moreMenu(e, item, index)}
            />
          ),
        });
      });
    }

    setColumnData(html);
  }, [productListData, moreTextString]);

  useEffect(() => {
    frameTable();
  }, [frameTable]);

  useEffect(() => {
    let myProduct = localStorage.getItem("_MY_PRODUCT_LIST");

    if (myProduct) {
      myProduct = JSON.parse(myProduct);
    }

    if (myProduct.length > 0) {
      let interchangeArr = myProduct;
      setProductListData(interchangeArr);
    }
  }, []);

  return (
    <div className="appWrapper">
      <div className="pageTitle shadow rounded d-flex justify-content-between align-items-center">
        <h3>My Product</h3>
        <div>
          <Button
            size="small"
            variant="contained"
            className="btn-primary"
            onClick={addProducts}
          >
            Add
          </Button>
        </div>
      </div>

      <div>
        {columnData.length > 0 ? (
          <div>
            <Suspense fallback={<h1> </h1>}>
              <MUIDataTable
                columns={headerData}
                data={columnData}
                options={options}
              />
            </Suspense>
          </div>
        ) : (
          <div className="p-3 shadow d-flex justify-content-center align-items-center">
            No data found
          </div>
        )}
      </div>

      {openDialog && (
        <Suspense fallback={<h1>Loading...</h1>}>
          <AddProduct
            openDialog={openDialog}
            callBackHome={callBackHome}
            selectedProduct={selectedItem}
            // index={selectedIndex}
          />
        </Suspense>
      )}

      {openDelete && buildDeleteConfirmDialogue()}
      {openMoreMenu === true ? buildMoreMenu() : null}
      {moreTextDialog === true ? buildMoreTextDialog() : null}
    </div>
  );
};

export default Index;
