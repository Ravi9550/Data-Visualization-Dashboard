import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const FilterPopup = ({ open, onClose, filters, setFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <TextField
          name="end_year"
          label="End Year"
          fullWidth
          margin="dense"
          value={filters.end_year || ""}
          onChange={handleChange}
        />
        <TextField
          name="topic"
          label="Topic"
          fullWidth
          margin="dense"
          value={filters.topic || ""}
          onChange={handleChange}
        />
        <TextField
          name="sector"
          label="Sector"
          fullWidth
          margin="dense"
          value={filters.sector || ""}
          onChange={handleChange}
        />
        <TextField
          name="region"
          label="Region"
          fullWidth
          margin="dense"
          value={filters.region || ""}
          onChange={handleChange}
        />
        <TextField
          name="pestle"
          label="PESTLE"
          fullWidth
          margin="dense"
          value={filters.pestle || ""}
          onChange={handleChange}
        />
        <TextField
          name="source"
          label="Source"
          fullWidth
          margin="dense"
          value={filters.source || ""}
          onChange={handleChange}
        />
        {/* Add more filters as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPopup;
