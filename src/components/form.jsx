import "../styles/form.css";
import Selector from "./selector";
import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import RadioButton from "./radioButton";
import CustomSelector from "../components/customSelector";
import { Button } from "@mui/material";
import FormTable from "./formTable";
//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";
import { useSelector } from "react-redux";

const { DateTime } = require("luxon");
const nationalities = require("../data/nationality.json");
const countries = require("../data/countries.json");

export default function Form() {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthday] = useState(DateTime.now());
  const [nationality, setNationality] = useState("Thai");
  const nationalityList = useRef(
    nationalities.map((el) => {
      return el["nationality"];
    })
  );
  // can use some refactor
  const idField1Dom = useRef();
  const idField2Dom = useRef();
  const idField3Dom = useRef();
  const idField4Dom = useRef();
  const idField5Dom = useRef();
  const [idField1, setIdField1] = useState("");
  const [idField2, setIdField2] = useState("");
  const [idField3, setIdField3] = useState("");
  const [idField4, setIdField4] = useState("");
  const [idField5, setIdField5] = useState("");

  const [gender, setGender] = useState("");
  const [mobilePhoneCountry, setMobilePhoneCountry] = useState("+66");
  const [mobilePhone, setMobilePhone] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  //Redux
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setCurrentTable } = bindActionCreators(actionCreators, dispatch);

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  const handleSubmitForm = () => {
    // can be develop to specifict business logic validator
    if (title === "") {
      alert("Title is require");
      return;
    }
    if (firstName === "") {
      alert("First name is require");
      return;
    }
    if (lastName === "") {
      alert("Last name is require");
      return;
    }
    if (birthDay.hasSame(DateTime.now(), "year")) {
      alert("Birthday is require");
      return;
    }
    if (
      idField1 !== "" ||
      idField2 !== "" ||
      idField3 !== "" ||
      idField4 !== "" ||
      idField5 !== ""
    ) {
      if (!isNumeric(idField1)) {
        alert("Citizen Id must contain number only");
        return;
      }
      if (!isNumeric(idField2)) {
        alert("Citizen Id must contain number only");
        return;
      }
      if (!isNumeric(idField3)) {
        alert("Citizen Id must contain number only");
        return;
      }
      if (!isNumeric(idField4)) {
        alert("Citizen Id must contain number only");
        return;
      }
      if (!isNumeric(idField5)) {
        alert("Citizen Id must contain number only");
        return;
      }
    }
    if (mobilePhone === "") {
      alert("Mobile phone number is require");
      return;
    }
    if (!isNumeric(mobilePhone)) {
      alert("Mobile phone number need to contain only number");
      return;
    }
    if (mobilePhone.length !== 10) {
      alert("Must be a proper mobile phone number");
      return;
    }
    if (expectedSalary === "") {
      alert("Expected salary is require");
      return;
    }
    if (!isNumeric(expectedSalary)) {
      alert("Expected salary is require need to contain only number");
      return;
    }
    if (!window.localStorage.getItem("applicants")) {
      const data = [
        {
          tempThis: { ...this },
          isChecked: false,
          isEditing: false,
          isDeleted: false,
          rowIndex: 0,
          title,
          firstName,
          lastName,
          birthDay,
          nationality,
          citizenId: idField1 + idField2 + idField3 + idField4 + idField5,
          gender,
          mobilePhone: mobilePhoneCountry + mobilePhone,
          passportNumber,
          expectedSalary,
        },
      ];
      setCurrentTable(data);
      window.localStorage.setItem(`applicants`, JSON.stringify(data));
    } else {
      const applicants = state.app.currentTable.slice();
      applicants.push({
        tempThis: { ...this },
        isChecked: false,
        isEditing: false,
        isDeleted: false,
        rowIndex: applicants.length,
        title,
        firstName,
        lastName,
        birthDay,
        nationality,
        citizenId: idField1 + idField2 + idField3 + idField4 + idField5,
        gender,
        mobilePhone: mobilePhoneCountry + mobilePhone,
        passportNumber,
        expectedSalary,
      });
      window.localStorage.setItem("applicants", JSON.stringify(applicants));
      setCurrentTable(applicants);
    }
    alert("save successful");
  };

  useEffect(() => {
    console.log(state.app.currentTable);
    if (window.localStorage.getItem("applicants")) {
      setCurrentTable(JSON.parse(window.localStorage.getItem("applicants")));
    }
  }, []);

  return (
    <>
      <div className="form-body">
        <div className="flex">
          <label className="label">
            Title{"  "}
            <span className="red">*{"  "}</span>:
          </label>
          <Selector
            error
            label="Title"
            value={title}
            list={["Mr.", "Mrs.", "Ms.", "Dr."]}
            width={80}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label className="label">
            First name{"  "}
            <span className="red">*{"  "}</span>:
          </label>
          <TextField
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <label className="label">
            Last name{"  "}
            <span className="red">*{"  "}</span>:
          </label>
          <TextField
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </div>
        <div className="flex">
          <label className="label">
            Birthday{"  "}
            <span className="red">*{"  "}</span>:
          </label>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
              label=""
              inputFormat="MM/dd/yyyy"
              value={birthDay}
              onChange={(newDate) => {
                setBirthday(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <label className="label">Nationality{"  "}:</label>
          <Selector
            label="Title"
            value={nationality}
            list={nationalityList.current}
            width={160}
            onChange={(event) => {
              console.log(event.target.value);
              setNationality(event.target.value);
            }}
          />
        </div>
        <div className="flex-small">
          <label className="label">Citizen ID{"  "}:</label>
          <TextField
            inputRef={idField1Dom}
            sx={{ width: 40 }}
            value={idField1}
            onChange={(event) => {
              if (event.target.value.length === 1) {
                setIdField1(event.target.value);
                idField2Dom.current.focus();
              }
            }}
          />
          {"-"}
          <TextField
            inputRef={idField2Dom}
            sx={{ width: 80 }}
            value={idField2}
            onChange={(event) => {
              if (event.target.value.length <= 5) {
                setIdField2(event.target.value);
              }
              if (event.target.value.length === 5) {
                idField3Dom.current.focus();
              }
            }}
          />
          {"-"}
          <TextField
            inputRef={idField3Dom}
            sx={{ width: 70 }}
            value={idField3}
            onChange={(event) => {
              if (event.target.value.length <= 4) {
                setIdField3(event.target.value);
              }
              if (event.target.value.length === 4) {
                idField4Dom.current.focus();
              }
            }}
          />
          {"-"}
          <TextField
            inputRef={idField4Dom}
            sx={{ width: 50 }}
            value={idField4}
            onChange={(event) => {
              if (event.target.value.length <= 2) {
                setIdField4(event.target.value);
              }
              if (event.target.value.length === 2) {
                idField5Dom.current.focus();
              }
            }}
          />
          {"-"}
          <TextField
            inputRef={idField5Dom}
            sx={{ width: 40 }}
            value={idField5}
            onChange={(event) => {
              if (event.target.value.length === 1)
                setIdField5(event.target.value);
            }}
          />
        </div>
        <div className="flex">
          <label className="label">Gender{"  "}:</label>
          <RadioButton
            value={gender}
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </div>
        <div className="flex-small">
          <label className="label">
            Mobile Phone{"  "}
            <span className="red">*{"  "}</span>:
          </label>
          <CustomSelector
            list={countries}
            width={110}
            value={mobilePhoneCountry}
            onChange={(event) => {
              setMobilePhoneCountry(event.target.value);
            }}
          />
          {"-"}
          <TextField
            value={mobilePhone}
            onChange={(event) => {
              setMobilePhone(event.target.value);
            }}
          />
        </div>
        <div className="flex">
          <label className="label">Passport No:{"  "}</label>
          <TextField
            value={passportNumber}
            onChange={(event) => {
              setPassportNumber(event.target.value);
            }}
          />
        </div>
        <div className="flex-2">
          <div className="flex">
            <label className="label">
              Expected Salary{"  "}
              <span className="red">*{"  "}</span>:
            </label>
            <TextField
              value={expectedSalary}
              onChange={(event) => {
                setExpectedSalary(event.target.value);
              }}
            />
          </div>
          <Button variant="contained" size="large" onClick={handleSubmitForm}>
            Submit
          </Button>
        </div>
      </div>
      <div className="table">
        <FormTable
          rows={state.app.currentTable.filter((el) => !el.isDeleted)}
        />
      </div>
    </>
  );
}
