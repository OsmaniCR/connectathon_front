import { useAuthStore } from '../common/store/authStore';
import axios from './axiosConfig';


export const axiosPaginateGet = async (ruta, params) => {
  const token = useAuthStore.getState().token;
  const {sorter} = params;
  const order = sorter.order === "ascend" ? `?_sort=_${sorter.field}` : `?_sort=-_${sorter.field}` 
  const { current, pageSize } = params.pagination ? params.pagination : {};
  const { data } = await axios.get(
    `${ruta}${order}&_count=${pageSize}&_getpagesoffset=${pageSize * (current-1) }&_total=accurate`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token || ""}`,
      },
    }
  );
  return data;
};

export const axiosGet = async (ruta) => {
  const { data }  = await axios.get(`${ruta}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer `,
    },
  });
  return data;
};

export const axiosPost = async (ruta, cuerpo) => {
  const token = useAuthStore.getState().token;
  const { data } = await axios.post(`${ruta}`, cuerpo, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const axiosPostFile = async (ruta, cuerpo) => {
  const token = useAuthStore.getState().token;
  const { data } = await axios({
    method: 'post',
    url: `${ruta}`,
    data: cuerpo,
    headers: {
      'Content-Type': `multipart/form-data`,
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const axiosPut = async (ruta, cuerpo) => {
  const token = useAuthStore.getState().token;
  const { data } = await axios.put(`${ruta}`, cuerpo, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const axiosDelete = async (ruta, cuerpo) => {
  const token = useAuthStore.getState().token;
  const { data } = await axios.delete(`${ruta}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(cuerpo),
  });
  return data;
};

export const baseFilePost = async (ruta, file) => {
  const token = useAuthStore.getState().token;
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await fetch(`${ruta}`, {
      method: 'POST',
      headers: token ? { authorization: 'Bearer ' + token } : {},
      body: formData,
    });

    const data = await res.json();
    if (res.status !== 200 && res.status !== 201) {
      return null;
    }
    return data;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

export const baseGetFile = async (ruta) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(`${ruta}`);
    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const baseGetBlobFile = async (ruta, cuerpo) => {
  const token = useAuthStore.getState().token;
  const { data } = await axios({
    method: 'post',
    url: `${ruta}`,
    data: cuerpo,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  });
  return URL.createObjectURL(data);
};

export async function baseGetImageDataUrl(ruta) {
  const response = await fetch(`${ruta}`);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const multiPartPost = async (ruta, cuerpo) => {
  let header =
    token == ''
      ? {}
      : {
          authorization: 'Bearer ' + token,
        };

  try {
    const res = await fetch(`${ruta}`, {
      method: 'POST',
      headers: header,
      body: cuerpo,
    });
    const data = await res.json();
    if (res.status != 200 && res.status != 201) {
      return null;
    } else {
      return data;
    }
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

export const multiPartPut = async (ruta, cuerpo) => {
  let header =
    token == ''
      ? {}
      : {
          authorization: 'Bearer ' + token,
        };

  try {
    const res = await fetch(`${ruta}`, {
      method: 'PUT',
      headers: header,
      body: cuerpo,
    });
    const data = await res.json();
    if (res.status != 200 && res.status != 201) {
      return null;
    } else {
      return data;
    }
  } catch (e) {
    console.log('error', e);
    return null;
  }
};
