import { useAuthStore } from '@/stores';
import { BASE_API_URL } from '@/utils';
import Axios, { AxiosError, AxiosResponse } from 'axios';

export const axios = Axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function responseHandler(response: AxiosResponse) {
  const contentType = response.headers['content-type'];

  if (contentType && contentType.includes('application/json')) {
    const data = response.data;

    if (data.success === false) {
      console.error('API operation failed:', data.message);
      return Promise.reject(new Error(data.message) || 'Unknown error occurred');
    }

    return { ...data, message: data.message };
  }

  return response.data;
}

function errorHandler(error: AxiosError) {
  // Periksa jika tidak ada respons dari server (misalnya jaringan bermasalah)
  if (!error.response) {
    console.error('Error jaringan:', error.message);
    return Promise.reject(new Error('Error jaringan. Silakan coba lagi nanti.'));
  }

  // Ekstrak error data dari respons server
  const responseData = error.response.data;

  // Pastikan responseData memiliki struktur yang sesuai
  if (
    typeof responseData === 'object' &&
    responseData !== null &&
    'message' in responseData &&
    typeof responseData.message === 'string'
  ) {
    // Dapatkan kode status dari respons server
    const status: number = error.response.status;

    // Handle kesalahan berdasarkan kode status spesifik
    switch (status) {
      case 400:
        // Tangani kesalahan permintaan yang buruk
        console.error('Permintaan tidak valid:', responseData.message);
        return Promise.reject(new Error(`${responseData.message}`));
      case 401:
        // Tangani kesalahan otorisasi (misalnya token tidak valid)
        console.error('Tidak diizinkan:', responseData.message);

        const authStore = useAuthStore();

        authStore.resetCredentials();

        window.location.href = '/login';

        return Promise.reject(new Error('Tidak diizinkan. Silakan login kembali.'));
      // Tambahkan kasus lain jika diperlukan
      default:
        // Tangani kesalahan lainnya
        console.error('Kesalahan server:', responseData.message);
        return Promise.reject(new Error('Kesalahan server. Silakan coba lagi nanti.'));
    }
  } else {
    // Jika responseData tidak sesuai dengan struktur yang diharapkan
    console.error('Respon error tidak sesuai dengan struktur yang diharapkan:', responseData);

    return Promise.reject(new Error('Kesalahan dalam memproses respons server.'));
  }
}

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  const token = authStore.token;

  if (token) config.headers.authorization = `Bearer ${token}`;

  return config;
}, errorHandler);

axios.interceptors.response.use(responseHandler, errorHandler);
