// src/context/Auth/AuthManager.js

// Fungsi ini akan dipanggil oleh Interceptor API
export const logoutAndRedirect = (message = "Sesi berakhir. Silakan login kembali.") => {    
    
    // Hapus token
    
    
    // Hapus state  (Asumsi ada mekanisme global untuk me-reset state, 
    // tapi cara paling aman untuk 401 adalah:
    
    // Redirect Penuh: Ini memaksa reload aplikasi, me-reset state global React
    window.location.replace("/");     
};  