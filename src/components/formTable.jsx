import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import Checkbox from "@mui/material/Checkbox";
import EditField from "./editField";

//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";
import { useSelector } from "react-redux";

import "../styles/table.css";
import { Button } from "@mui/material";
import EditSelector from "./editSelector";

const nationalities = require("../data/nationality.json");

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

export default function FormTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const nationalityList = useRef(
    nationalities.map((el) => {
      return el["nationality"];
    })
  );
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  //Redux
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setCurrentTable } = bindActionCreators(actionCreators, dispatch);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="selected-all">
        <span>Select All</span>
        <Checkbox
          onChange={(event) => {
            let tableCopy = state.app.currentTable.slice();
            tableCopy.forEach((row, index) => {
              tableCopy[index].isChecked = !isSelectedAll;
            });
            setIsSelectedAll(!isSelectedAll);
            setCurrentTable(tableCopy);
          }}
        />
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            let tableCopy = state.app.currentTable.slice();
            tableCopy.forEach((row, index) => {
              if (row.isChecked) {
                tableCopy[index].isDeleted = true;
              }
            });
            window.localStorage.setItem(
              "applicants",
              JSON.stringify(tableCopy)
            );
            setCurrentTable(tableCopy);
          }}
        >
          Delete
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
            <TableRow>
              <TableCell>Selected</TableCell>
              <TableCell align="right">Name&nbsp;</TableCell>
              <TableCell align="right">Gender&nbsp;</TableCell>
              <TableCell align="right">Mobile Phone&nbsp;</TableCell>
              <TableCell align="right">Nationality&nbsp;</TableCell>
              <TableCell align="right">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? props.rows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.rows
            ).map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell style={{ width: 5 }}>
                    <Checkbox
                      checked={row.isChecked}
                      onChange={(event) => {
                        let tableCopy = state.app.currentTable.slice();
                        tableCopy[row.rowIndex].isChecked = !row.isChecked;
                        setCurrentTable(tableCopy);
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <EditField
                      value={row.firstName}
                      edit={row.isEditing}
                      onChange={(event) => {
                        let tableCopy = state.app.currentTable.slice();
                        tableCopy[row.rowIndex].firstName = event.target.value;
                        setCurrentTable(tableCopy);
                      }}
                    />
                    {"  "}
                    <EditField
                      value={row.lastName}
                      edit={row.isEditing}
                      onChange={(event) => {
                        let tableCopy = state.app.currentTable.slice();
                        tableCopy[row.rowIndex].lastName = event.target.value;
                        setCurrentTable(tableCopy);
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <EditSelector
                      value={row.gender}
                      list={["female", "male", "unisex"]}
                      edit={row.isEditing}
                      onChange={(event) => {
                        let tableCopy = state.app.currentTable.slice();
                        tableCopy[row.rowIndex].gender = event.target.value;
                        setCurrentTable(tableCopy);
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <EditField
                      value={row.mobilePhone}
                      edit={row.isEditing}
                      onChange={(event) => {
                        let tableCopy = state.app.currentTable.slice();
                        tableCopy[row.rowIndex].mobilePhone =
                          event.target.value;
                        setCurrentTable(tableCopy);
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    <EditSelector
                      value={row.nationality}
                      list={nationalityList.current}
                      edit={row.isEditing}
                      onChange={(event) => {
                        let tableCopy = state.app.currentTable.slice();
                        tableCopy[row.rowIndex].nationality =
                          event.target.value;
                        setCurrentTable(tableCopy);
                      }}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.isEditing ? (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => {
                          let tableCopy = state.app.currentTable.slice();
                          tableCopy[row.rowIndex].isEditing = false;
                          window.localStorage.setItem(
                            "applicants",
                            JSON.stringify(tableCopy)
                          );
                          setCurrentTable(tableCopy);
                        }}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          let tableCopy = state.app.currentTable.slice();
                          tableCopy[row.rowIndex].isEditing = true;
                          setCurrentTable(tableCopy);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    {"  "}
                    {row.isEditing ? (
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => {
                          let tableCopy = state.app.currentTable.slice();
                          tableCopy[row.rowIndex].isEditing = false;
                          setCurrentTable(tableCopy);
                        }}
                      >
                        Discard
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => {
                          let tableCopy = state.app.currentTable.slice();
                          tableCopy[row.rowIndex].isDeleted = true;
                          window.localStorage.setItem(
                            "applicants",
                            JSON.stringify(tableCopy)
                          );
                          setCurrentTable(tableCopy);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
