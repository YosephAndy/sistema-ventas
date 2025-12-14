const API_URL = 'http://localhost:3001/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Error en la petición' }));
        throw new Error(error.message || 'Error en la respuesta del servidor');
    }
    return response.json();
};

export const productosService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/productos`);
        return handleResponse(response);
    },
    create: async (data) => {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    update: async (id, data) => {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id) => {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    }
};

export const clientesService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/clientes`);
        return handleResponse(response);
    },
    create: async (data) => {
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    update: async (id, data) => {
        const response = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id) => {
        const response = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    }
};

export const ventasService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/ventas`);
        return handleResponse(response);
    },
    create: async (data) => {
        const response = await fetch(`${API_URL}/ventas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    }
};

export const authService = {
    login: async (credentials) => {
        const response = await fetch(`${API_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse(response);
    }
};
