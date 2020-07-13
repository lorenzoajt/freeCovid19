import React, {useState} from "react";
import { useTable, useFilters, useSortBy } from "react-table";

import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

export default function Table({ columns, data, hostName}) {
  const [filterInput, setFilterInput] = useState("");


  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      setFilter
    } = useTable(
      {
        columns,
        data
      },
      useFilters,
      useSortBy // This plugin Hook will help to sort our table columns
    );


    const handleFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("name", value); // Update the name filter. Now our table will filter and show only the rows which have a matching value
      setFilterInput(value);
    };


    const headerStyle = {fontSize: "25px", textAlign:"center"};
    const cellStyle = {textAlign:"center", fontSize: '15px'};
    const tableStyle = {width: "90%", 
                        margin: '0 auto',                        
                        };

    const buttonStyle = { float: 'right',
                          marginRight: '20px',
                          marginTop: '10px',
    }                      

    return(


      <>
        <input
          value={filterInput}
          onChange={handleFilterChange}
          placeholder={"Buscar Nombre"}
        />
        <Button 
          variant="contained" 
          color="primary"
          component={Link} to="/agregarAnfitrion"
          style={buttonStyle}
          >Agregar Anfitrion
        </Button>
        <TableContainer component={Paper}>
          <MaUTable {...getTableProps() } style={tableStyle}>
            <TableHead >
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()} >
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? "sort-desc"
                            : "sort-asc"
                          : ""
                      }
                      style={headerStyle}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <TableCell {...cell.getCellProps()} style={cellStyle} >{cell.render("Cell")}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MaUTable>
        </TableContainer>
      </>
    )
}