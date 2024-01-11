import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosDelete, axiosPaginateGet, axiosPost, axiosPut } from "../apis/calls";
import { omit } from "lodash";

const resourceType = "Patient";

export const useGetPatients = () => {
    const { tableFilters, setTotal, setNextPageUrl, setPreviousPageUrl } = useTableFilters();
    return useQuery({
        queryKey: [resourceType, omit(tableFilters, ['pagination.total'])],
        queryFn: async () => {
            const data = await axiosPaginateGet(resourceType, tableFilters);
            if (data) {
                setTotal(data.total)
                const { entry , link } = data ? data : [];
                link.map(l => {
                    if (l.relation === "next"){
                        setNextPageUrl(l.url);
                    }
                    if (l.relation === "previous"){
                        setPreviousPageUrl(l.url);
                    }
                })
                return entry.map(e => e.resource)
            }
        },
        placeholderData: keepPreviousData,
});
}



export const usePatientSave = () => {
    const queryClient = useQueryClient();
    const { tableFilters } = useTableFilters();
    return useMutation({
      mutationFn: async (body) => !body.id ? axiosPost(`${resourceType}`, body): axiosPut(`${resourceType}/${body.id} `, body),
      onSuccess: (response) => {
        toast.success("Patient saved successfully!");
        queryClient.invalidateQueries([resourceType, omit(tableFilters, ['pagination.total'])]);
      },
      onError: (e) => {
        console.log(e);
        toast.error("Error saving Patient");
      },
    });
  };



  export const usePatientDelete = () => {
    const queryClient = useQueryClient();
    const { tableFilters } = useTableFilters();
    return useMutation({
      mutationFn: (id) => axiosDelete(`${resourceType}/${id}`),
      onSuccess: (response) => {
        toast.success("Patient removed successfully!");
        queryClient.invalidateQueries([resourceType, omit(tableFilters, ['pagination.total'])]);
      },
      onError: (e) => {
        console.log(e);
        toast.error("Error removing Patient");
      },
    });
  };