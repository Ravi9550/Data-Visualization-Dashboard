import React, { useContext, useState } from "react";
import {
  Table,
  styled,
  createTheme,
  ThemeProvider,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Tooltip,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../services/api/dataContext.js";
import FilterPopup from "../helper/filterPopup.js";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
    color: theme.palette.common.white,
  },
}));

// custom theme
const theme = createTheme({
  palette: {
    mode: "dark", // Optional: Set dark mode
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Set the text color to white
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#ffffff", // Set the border color to white
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Set the label color to white
        },
      },
    },
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: "#1e1e1e",
    color: theme.palette.common.white,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
    // backgroundColor: "#303030",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  borderBottom: "1px solid rgba(224, 224, 224, 1)",
}));

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(false); // State to control filter popup
  const [filters, setFilters] = useState({}); // State to store filter values
  const data = useContext(DataContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterOpen = () => {
    setOpenFilter(true);
  };

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  if (!data)
    return (
      <div >
        No Data Present
      </div>
    );

  const filteredData = data.filter((item) => {
    return (
      (!filters.end_year || item.end_year === filters.end_year) &&
      (!filters.topic || item.topic === filters.topic) &&
      (!filters.sector || item.sector === filters.sector) &&
      (!filters.region || item.region === filters.region) &&
      (!filters.pestle || item.pestle === filters.pestle) &&
      (!filters.source || item.source === filters.source)
    );
  });

  const rows = filteredData.map((item, index) => ({
    serialNumber: index + 1, // Adding serial number
    end_year: item.end_year || "N/A",
    intensity: item.intensity || 0,
    sector: item.sector || "N/A",
    topic: item.topic || "N/A",
    insight: item.insight || "N/A",
    url: item.url || "N/A",
    region: item.region || "N/A",
    start_year: item.start_year || "N/A",
    impact: item.impact || "N/A",
    added: item.added || "N/A",
    published: item.published || "N/A",
    country: item.country || "N/A",
    relevance: item.relevance || 0,
    pestle: item.pestle || "N/A",
    source: item.source || "N/A",
    title: item.title || "N/A",
    likelihood: item.likelihood || 0,
  }));

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="tableHeader">
          <Tooltip title="Filter Table">
            <IconButton onClick={handleFilterOpen} style={{ margin: "10px" }}>
              <FontAwesomeIcon icon={faFilter} style={{ fontSize: "18px" }} />
            </IconButton>
          </Tooltip>

          <FilterPopup
            open={openFilter}
            onClose={handleFilterClose}
            filters={filters}
            setFilters={setFilters}
            theme={theme}
          />
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            theme={theme}
            style={{
              position: "sticky",
              left: 0,
              zIndex: 1,
              backgroundColor: "transparent",
              color: "#ffffff",
              margin: 0,
            }}
          />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Serial Number</StyledTableCell>
                <StyledTableCell align="left">End Year</StyledTableCell>
                <StyledTableCell align="left">Intensity</StyledTableCell>
                <StyledTableCell align="left">Sector</StyledTableCell>
                <StyledTableCell align="left">Topic</StyledTableCell>
                <StyledTableCell align="left">Insight</StyledTableCell>
                <StyledTableCell align="left">URL</StyledTableCell>
                <StyledTableCell align="left">Region</StyledTableCell>
                <StyledTableCell align="left">Start Year</StyledTableCell>
                <StyledTableCell align="left">Impact</StyledTableCell>
                <StyledTableCell align="left">Added</StyledTableCell>
                <StyledTableCell align="left">Published</StyledTableCell>
                <StyledTableCell align="left">Country</StyledTableCell>
                <StyledTableCell align="left">Relevance</StyledTableCell>
                <StyledTableCell align="left">PESTLE</StyledTableCell>
                <StyledTableCell align="left">Source</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Likelihood</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <StyledTableRow key={row.serialNumber}>
                  <StyledTableCell component="th" scope="row">
                    {row.serialNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.end_year}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.intensity}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.sector}</StyledTableCell>
                  <StyledTableCell align="left">{row.topic}</StyledTableCell>
                  <StyledTableCell align="left">{row.insight}</StyledTableCell>
                  <StyledTableCell align="left">
                    <a href={row.url} target="blank">
                      Link of the report
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.region}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.start_year}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.impact}</StyledTableCell>
                  <StyledTableCell align="left">{row.added}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.published}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.country}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.relevance}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.pestle}</StyledTableCell>
                  <StyledTableCell align="left">{row.source}</StyledTableCell>
                  <StyledTableCell align="left">{row.title}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.likelihood}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </>
  );
};

export default DataTable;
