import React, { Fragment, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { SwipeableDrawer } from "@mui/material";
import "./schema.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useToasts } from "react-toast-notifications";
import { options } from "../constant/constant";

function Schema() {
  const [modelOpen, setModelOpen] = useState(false);
  const [segName, setSegName] = useState(null);
  const [schemas, setSchemas] = useState([]);
  const [value, setValue] = useState(null);
  const { addToast } = useToasts();

  const onRemoveHandler = (item) => {
    const delIndex = schemas?.findIndex((i) => i?.label === item?.label);
    schemas?.splice(delIndex, 1);
    setSchemas([...schemas]);
  };

  const getOptions = useMemo(() => {
    if (schemas?.length) {
      return options?.filter(
        (item) => !schemas?.some((schema) => schema?.label === item?.label)
      );
    }
    return options;
  }, [schemas]);

  const sendData = () => {
    const schemaData = {
      segment_name: segName,
      schema: schemas?.map((i) => ({ [i?.value]: i?.label })),
    };
    let requestOptions = {
      method: "POST",
      body: JSON.stringify(schemaData),
    };

    fetch(
      "https://webhook.site/53728394-4056-419a-8689-63c012f95dc4",
      {
        mode: "no-cors",
      },
      requestOptions
    )
      .then((response) => {
        console.log(response);
        addToast("Schema Added Successfully!!!", {
          appearance: "success",
          autoDismiss: true,
        });
        setModelOpen(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <Button variant="contained" onClick={() => setModelOpen(true)}>
        Save
      </Button>
      <SwipeableDrawer anchor={"right"} open={modelOpen}>
        <div style={{ width: "500px" }}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              backgroundColor: "#009293",
              color: "white",
              padding: "10px",
            }}
          >
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() => setModelOpen(false)}
            ></ArrowBackIosIcon>
            <p>Saving Segment</p>
          </div>
          <div style={{ padding: "20px" }}>
            <p>Enter the Name of the Segment</p>
            <TextField
              size="small"
              id="outlined-basic"
              label="Name of the segment *"
              variant="outlined"
              onChange={(e) => {
                setSegName(e?.target?.value ?? null);
              }}
            />
            <p>
              To save your segment,you need to add the schemas to build the
              query
            </p>
            {schemas?.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  border: "3px solid #02647e",
                  marginBottom: "20px",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                {schemas?.map((item) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <FiberManualRecordRoundedIcon
                      fontSize="small"
                      style={{
                        color: item?.type === "user" ? "green" : "red",
                      }}
                    />
                    <Autocomplete
                      id="country-customized-option-deo"
                      size="small"
                      fullWidth
                      disabled
                      options={options}
                      value={item}
                      renderInput={(params) => (
                        <TextField {...params} label="Add schema to segment" />
                      )}
                    />
                    <RemoveOutlinedIcon
                      className="del-btn"
                      onClick={() => onRemoveHandler(item)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <FiberManualRecordRoundedIcon
                fontSize="small"
                style={{
                  color: "grey",
                }}
              />
              <Autocomplete
                id="schema-drop-down"
                size="small"
                fullWidth
                options={getOptions}
                value={value}
                onChange={(event, value) => setValue(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Add schema to segment *" />
                )}
              />
            </div>
            <div
              style={{
                display: "flex",

                alignItems: "center",
                textDecoration: "underline",
                marginTop: "20px",
              }}
            >
              <AddIcon color="success" sx={{ fontSize: "20px" }}></AddIcon>
              <Button
                color="success"
                onClick={() => {
                  if (value) {
                    setSchemas([...schemas, value]);
                    setValue(null);
                  }
                }}
                disabled={options?.length === schemas?.length || !value}
              >
                Add new schema
              </Button>
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <Button
            variant="contained"
            id="primary-color"
            disabled={!(segName && schemas?.length)}
            onClick={sendData}
          >
            Save the Segment
          </Button>
          <Button color="error">Cancel</Button>
        </div>
      </SwipeableDrawer>
    </Fragment>
  );
}

export default Schema;
