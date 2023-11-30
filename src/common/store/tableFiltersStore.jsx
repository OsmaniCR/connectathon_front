import { create } from 'zustand'
import { Button } from 'antd';

const baseURL = {
  production: import.meta.env.VITE_PROD_API,
  qa: import.meta.env.VITE_QA_API,
  development: import.meta.env.VITE_DEV_API,
};
const ENV = import.meta.env.VITE_ENV;

const URL = baseURL[ENV]

console.log(URL);

const useTableFilters = create((set) => ({ 
  tableFilters: {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      defdefaultPageSize: 10,
      pageSizeOptions: [10, 25, 50, 100],
      position: ["bottomRight"],
      showSizeChanger: true,
      simple: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageUrl: null,
      nexPageUrl: null,
      previousPageUrl: null,
    },
    sorter: {
      columnKey: 0,
      field: "id",
      order: "descend"
    },
    filters: {},
  },
  setTableFilters: (filters) => set(() => ({ tableFilters: filters })),
  setTotal: (num) => set((state) => ({ 
    tableFilters: {
      ...state.tableFilters,
      pagination: {
        ...state.tableFilters.pagination,
        total: num
      }
    } 
  })),
  setPageUrl: (url) => set((state) => ({ 
    tableFilters: {
      ...state.tableFilters,
      pagination: {
        ...state.tableFilters.pagination,
        pageUrl: url
      }
    } 
  })),
  setNextPageUrl: (url) => set((state) => ({ 
    tableFilters: {
      ...state.tableFilters,
      pagination: {
        ...state.tableFilters.pagination,
        nexPageUrl: url
      }
    } 
  })),
  setPreviousPageUrl: (url) => set((state) => ({ 
    tableFilters: {
      ...state.tableFilters,
      pagination: {
        ...state.tableFilters.pagination,
        previousPageUrl: url
      }
    } 
  })),
  setNextPage: () => set((state) => ({ 
    tableFilters: {
      ...state.tableFilters,
      pagination: {
        ...state.tableFilters.pagination,
        pageUrl: state.tableFilters.pagination.nexPageUrl
      }
    } 
  })),
  setPreviousPage: () => set((state) => ({ 
    tableFilters: {
      ...state.tableFilters,
      pagination: {
        ...state.tableFilters.pagination,
        pageUrl: state.tableFilters.pagination.previousPageUrl
      }
    } 
  })),
}))

export default useTableFilters;
