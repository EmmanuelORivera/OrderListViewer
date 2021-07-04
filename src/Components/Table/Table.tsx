import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { COLUMNS } from '../../Utils/columns';
import { Product } from '../../Redux/slices/types';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const StyledTd = styled.td`
  padding: 1rem 0;
`;
const StyledTh = styled(StyledTd)`
  background: #455c95;
  color: white;
  font-weight: bold;
`;
const StyledTr = styled.tr`
  &:nth-child(even) {
    background: #e2eeff;
  }
  &:hover {
    background: #d2e5ff;
  }
`;

interface Props {
  data: Product[];
}

const Table: FC<Props> = ({ data }) => {
  const columns: any = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <StyledTr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <StyledTh {...column.getHeaderProps()}>
                {column.render('Header')}
              </StyledTh>
            ))}
          </StyledTr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledTr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <StyledTd {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </StyledTd>
                );
              })}
            </StyledTr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default Table;
