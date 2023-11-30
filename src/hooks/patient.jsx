import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import useTableFilters from "../common/store/tableFiltersStore";
import { axiosDelete, axiosGet, axiosPaginateGet, axiosPost, axiosPut } from "../apis/calls";

const resourceType = "Patient";

export const useGetPatients = () => {
    const { tableFilters, setTotal, setNextPageUrl, setPreviousPageUrl } = useTableFilters();
    return useQuery({
        queryKey: [resourceType, tableFilters],
        queryFn: async () => {
            const data = await axiosPaginateGet(resourceType, tableFilters);
            if (data) {
                setTotal(data.total)
                const { entry , link } = data ? data : [];
                link.map(l => {
                    if (l.relation === "next"){
                        console.log("NEXT URL");
                        setNextPageUrl(l.url);
                    }
                    if (l.relation === "previous"){
                        console.log("PREV URL");
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
    return useMutation({
      mutationFn: async (body) => !body.id ? axiosPost(`${resourceType}`, body): axiosPut(`${resourceType}/${body.id} `, body),
      onSuccess: (response) => {
        toast.success("Patient saved successfully!");
        queryClient.invalidateQueries([key]);
      },
      onError: () => {
        toast.error("Error saving Patient");
      },
    });
  };