import React from 'react';
import MaterialTable from 'material-table';

export default function TablePerPage(props) {
  const {data, title, columns} = props
  
  
  

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={{
        headerStyle: {
          backgroundColor: '#354b63',
          color: '#FFF',
          textAlign: "center",
          fontSize: "20px"
        },
        cellStyle: {          
          textAlign: "center",
          
        }
      }}
      localization={{                                                   
              pagination: {
                labelDisplayedRows: '{from}-{to} de {count}',
                labelRowsSelect: 'Filas',
                labelRowsPerPage: 'Filas por página:',
                firstAriaLabel: 'Primera página',
                firstTooltip: 'Primera Página',
                previousAriaLabel: 'Página anterior',
                previousTooltip: 'Página anterior',
                nextAriaLabel: 'Siguiente página',
                nextTooltip: 'Siguiente página',
                lastAriaLabel: 'Última página',
                lastTooltip: 'Última página'
              },
              toolbar: {                
                searchTooltip: 'Buscar',
                searchPlaceholder: 'Buscar'
              }
            }}
      
    />
  );
}



