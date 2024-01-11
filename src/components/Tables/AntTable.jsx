import React, { useEffect } from 'react';
import { Table, Button, Pagination } from 'antd';
import useTableFilters from '../../common/store/tableFiltersStore';


const makeColumns = (columns) => {
    const modifiedColumns = columns.map((col, i) => ({
        ...col,
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        key: i,
        align: 'center',
        ellipsis: true,
        sorter: col.dataIndex && col.order !== false ? true : false,
        sortDirections: ['ascend', 'descend', 'ascend']
    }));
    
    return modifiedColumns;
}


const AntTable = (
    {
        columns=[],
        data=[], 
        setRowSelection=false, 
        expandable=false, 
        expandedRowRender=()=>{return <></>}, 
        loading=false,
        pagination=true,
        scroll={x: true, y: true},
    }) => {

    const {tableFilters, setTableFilters, nexPageUrl, previousPageUrl, setPreviousPage, setNextPage} = useTableFilters();

    const handleTableChange = (pagination, filters, sorter) => {
        setTableFilters({
          pagination,
          filters,
          sorter: Object.keys(sorter).length > 0 ? sorter : tableFilters.sorter,
        });
      };

      useEffect(() => {

      }, [tableFilters])
      

    return (
        <Table
            style={{
                tableLayout: 'auto',
                width: '100%',
                height: '100%',
                overflowY: 'auto'
            }}
            columns={makeColumns(columns)}
            rowKey={(record) => record.id}
            rowSelection={
                setRowSelection &&
                {
                onChange: (_, selectedRows) => {
                    setRowSelection(selectedRows);
                },
            }}
            rowClassName="text-xs"
            expandable={ expandable ? {
                expandedRowRender,
                defaultExpandedRowKeys: ['0']
                }: false
            }
            dataSource={data}
            pagination={pagination && {
                ...tableFilters.pagination,
            }}
            size="small"
            loading={loading}
            bordered
            onChange={handleTableChange}
            scroll={scroll}
        />
    )
}

export default AntTable;