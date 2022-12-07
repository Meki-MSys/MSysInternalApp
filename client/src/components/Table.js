import React from "react";
import { useTable, useSortBy, usePagination, useExpanded } from "react-table";
import classNames from "classnames";
import { Edit, Delete } from "react-feather";

const Table = ({
  columns,
  data,
  pagination = true,
  pagesize = 10,
  action = false,
  ongeteditrow,
  ongetdeleterow,
}) => {
  const pagearrsize = pagesize > 5 ? [10, 20, 30, 40, 50] : [5, 10, 15, 20, 25];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: pagesize ? pagesize : 10,
      },
    },
    useSortBy,
    usePagination
  );
  const onEditClick = (e, value) => {
    let rowdata = e.original;
    ongeteditrow(rowdata, value);
  };
  return (
    <div className="table-responsive">
      <table className="table table-centered react-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={classNames({
                    sorting_desc: column.isSortedDesc === true,
                    sorting_asc: column.isSortedDesc === false,
                    sortable: column.sort === true,
                  })}
                >
                  {column.render("Header")}
                </th>
              ))}
              {action ? <th>Action</th> : null}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                {action ? (
                  <td>
                    <div className="">
                      <a
                        onClick={() => onEditClick(row, false)}
                        className="mx-1"
                      >
                        <Edit width={15} />
                      </a>
                      <a
                        className="mx-1"
                        onClick={() => onEditClick(row, true)}
                      >
                        <Delete width={15} />
                      </a>
                    </div>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pagination ? (
        <div className="d-lg-flex align-items-center text-center pb-1">
          <div className="d-inline-block me-3">
            <label className="me-1 label-clr">Display :</label>{" "}
            <select
              className="form-select d-inline-block w-auto custom-select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {pagearrsize.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <span className="me-3">
            <label className="label-clr">Page</label>{" "}
            <strong className="label-clr">
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
            <label className="label-clr">Go to page : </label>{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              className="form-control w-25 ms-1 d-inline-block custom-input"
              style={{ width: "100px" }}
            />
          </span>
          <div className="d-flex ms-auto">
            <button
              className="btn btn-sm btn-primary btn-pagination"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className="btn btn-sm btn-primary btn-pagination"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              className="btn btn-sm btn-primary btn-pagination"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className="btn btn-sm btn-primary btn-pagination"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
