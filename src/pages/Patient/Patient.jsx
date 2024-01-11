import { useGetPatients, usePatientDelete, usePatientSave } from "../../hooks/patient";
import { Form } from "antd";
import dayjs from 'dayjs';
import AntTable from "../../components/Tables/AntTable";
import BaseModal from "../../components/Modals/BaseModal";
import CustomForm from "../../components/Forms/CustomForm";
import { useState } from "react";
import { makeColumns, makeFields } from "./patient.base";
import patientResource from "../../resources/Patient";

const Patient = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    const [form] = Form.useForm();
  
    const { data, isFetching } = useGetPatients();

    const { mutate: savePatient, isPending: isSaving } = usePatientSave()

    const { mutate: removePatient, isPending: isRemoving } = usePatientDelete();

    const handleSubmit = (values) => {
      const body = patientResource({
        ...(editingPatient ? {id: editingPatient} : {}),
        gender: values.gender,
        countryId: values.countryID,
        originCountryId: values.countryID,
        // birthPlace: "",
        // isNative: false,
        identifierCountry: values.countryID,
        identifierType: "04",
        identifierValue: values.identifierValue,
        firtsFamilyName: values.firtsFamilyName,
        lastFamilyName: values.lastFamilyName,
        given: values.name,
        // telecomType: "phone",
        telecomValue: values.phoneNumber,
        birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
        address: values.address,
        maritalStatus: values.maritalStatus,
      });
      console.log(body);
      savePatient(body);
      form.resetFields();
      setModalIsOpen(false);
    }
    
    const onCancel = () => {
      setModalIsOpen(false);
      form.resetFields();
    }
    

  return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex flex-row justify-start mb-2">
                <BaseModal
                    headTitle="Patient List"
                    style={{
                        top: 50
                    }}
                    title={`${editingPatient ? "Edit" : "Create"} Patient`}
                    text={"Add Patient"}
                    isModalOpen={modalIsOpen}
                    setIsModalOpen={setModalIsOpen}
                    onCancel={onCancel}
                    onOk={form.submit}
                    component={
                        <CustomForm
                            form={form}
                            onFinish={handleSubmit}
                            fields={makeFields({
                                setEditingPatient: setEditingPatient,
                                setModalIsOpen: setModalIsOpen
                            })}
                        />
                    }
                    extraButtons={
                        <div className="flex flex-row w-full">
                        {/* <Button
                            className="text-black"
                            type="primary" 
                            onClick={() => downloadExcel()} 
                        >
                            <div className="flex flex-row items-center justify-center w-full h-full gap-4 text-center">
                                <RiFileExcel2Fill color="green"/>
                            <Text>Exportar</Text>
                            </div>
                        </Button> */}
                        </div>
                    }
                />
            </div>
            <AntTable
                scroll={{
                    x: true,
                    y: true,
                  }}
                loading={isFetching || isSaving || isRemoving}
                data={data}
                columns={makeColumns({
                    setEditingPatient: setEditingPatient,
                    setModalIsOpen: setModalIsOpen,
                    form: form,
                    removePatient: removePatient
                })}
                
            />
        </div>
    );
};

export default Patient;
