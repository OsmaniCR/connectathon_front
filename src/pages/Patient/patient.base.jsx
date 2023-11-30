import dayjs from "dayjs";
import { formatDate } from "../../utils/formatDates";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import COUNTRIES, { getCountryDisplayName } from "../../resources/Countries";
import MARITALSTATUS, { getMtDisplayName } from "../../resources/MaritalStatus";
import BIOLOGICALSEX, { getBsDisplayName } from "../../resources/BiologicalSex";

export const makeColumns = ({setModalIsOpen, setEditingPatient, form}) => {
  const cols = [
    /* {
        dataIndex: "id",
        title: "ID",
        align: "center"
    }, */
    {
        dataIndex: "identifier",
        title: "Indentifier",
        align: "center",
        render: (identifier) => (
            <>{identifier && identifier[0].value}</>
        )
    },
    {
        dataIndex: "name",
        title: "Name",
        align: "center",
        render: (name) => (
            <>{name && name[0].given?.join(" ")}</>
        )
    },
    {
        dataIndex: "name",
        title: "Surname",
        align: "center",
        render: (name) => (
            <>{name && name[0].family}</>
        )
    },
    {
        dataIndex: "name",
        title: "Lastname",
        align: "center",
        render: (name) => (
            <>{name && name[0]._family && name[0]._family.extension[0].valueString}</>
        )
    },
    {
        dataIndex: "gender",
        title: "Gender",
        align: "center",
        render: (gender) => (
            <>{getBsDisplayName(gender)}</>
        )
    },
    {
        dataIndex: "birthDate",
        title: "BirthDate",
        align: "center",
        render: (birthDate) => (
            <>{formatDate(birthDate)}</>
        )
    },
    {
        dataIndex: "extension",
        title: "Country",
        align: "center",
        render: (extension) => (
            <>
                {
                    extension && extension[0] && extension[0].valueCodeableConcept.coding[0] 
                    && getCountryDisplayName(extension[0].valueCodeableConcept.coding[0].code)
                }
            </>
        )
    },
    {
        dataIndex: "address",
        title: "Address",
        align: "center",
        render: (address) => (
            <>{address && address[0] && address[0].line[0]}</>
        )
    },
    {
        dataIndex: "telecom",
        title: "Phone Number",
        align: "center",
        render: (telecom) => (
            <>{telecom && telecom[0] && telecom[0].value}</>
        )
    },
    {
        dataIndex: "maritalStatus",
        title: "Marital Status",
        align: "center",
        render: (maritalStatus) => (
            <>{maritalStatus?.coding[0] && getMtDisplayName(maritalStatus.coding[0].code)}</>
        )
    },
    {
        key: "actions",
        title: "Actions",
        render: record => (
            <Space>
                <Tooltip title="Edit Patient">
                    <Button type="link" onClick={() => {
                        setEditingPatient(record.id);
                        setModalIsOpen(true);
                        console.log(record);
                        form.setFieldsValue({
                            ...(record.identifier && record.identifier[0] ? {identifierValue: record.identifier[0].value}: {}),
                            ...(record.name && record.name[0] && record.name[0].given ? {name : record.name[0].given.join(" ")} : {}),
                            ...(record.name && record.name[0] && record.name[0].family[0] ? {firtsFamilyName : record.name[0].family} : {}),
                            ...(record.name && record.name[0] && record.name[0]._family && record.name[0]._family.extension ? 
                                {lastFamilyName : record.name[0]._family.extension[0].valueString} : {}),
                            ...(record.telecom && record.telecom[0] ? { phoneNumber: record.telecom[0].value}: {}),
                            ...(record.extension && record.extension[0] ? { countryId: record.extension[0].valueCodeableConcept.coding[0].code}: {}),
                            ...(record.address && record.address[0] ? { address: record.address[0].line[0]}: {}),
                            ...(record.maritalStatus ? { maritalStatus: record.maritalStatus.coding[0].code}: {}),
                            ...(record.gender ? {gender: record.gender}: {}),
                            ...(record.birthDate ? {birthDate: dayjs(record.birthDate, 'YYYY-MM-DD')}: {}),
                            });
                    }} icon={<EditOutlined />}/>
                </Tooltip>
                    
            </Space>
        )
    }
  ];
  return cols;
}


export const makeFields = ({}) => {
  const fields = [
    {
        name: "identifierValue",
        label: "Identifier",
        type: "rut",
        required: true
    },
    {
        name: "name",
        label: "Name",
        type: "text",
        required: true
    },
    {
        name: "firtsFamilyName",
        label: "Surname",
        type: "text",
        required: true
    },
    {
        name: "lastFamilyName",
        label: "Lastname",
        type: "text",
        required: true
    },
    {
        name: "gender",
        label: "Gender",
        type: "select",
        options: BIOLOGICALSEX,
        required: true
    },
    {
        name: "birthDate",
        label: "BirtDate",
        type: "date",
        required: true
    },
    {
        name: "countryId",
        label: "Country",
        type: "select",
        options: COUNTRIES,
        required: true
    },
    {
        name: "address",
        label: "Address",
        type: "text",
        required: true
    },
    {
        name: "phoneNumber",
        label: "Phone Number",
        type: "text",
        required: true
    },
    {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: MARITALSTATUS,
        required: true
    },
  ];
  return fields;
}
