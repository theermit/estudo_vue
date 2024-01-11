import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : '',
})

axiosInstance.interceptors.request.use(
    (config) => {
        if(window.localStorage.logado.toLowerCase() == 'true')
        {
            const token = window.localStorage.token;
            if (token) 
                config.headers['x-access-token'] = token;
            
        }
        return config;
    },
    async (error) => {
        return Promise.reject(error)
    },
);

export const api = {
    async consultar_email(obj_body) {
        try 
        {
            const response = await axiosInstance.post('/consultaremail', obj_body);
            if(response.status == 200)
            {
                return ({
                    status: response.status,
                    data: response.data
                });
            }
            else 
            {
                return ({
                    status: response.status
                });
            }
        }
        catch (e)
        {
            alert(e);
        }
    },
    async cadastrar_usuario(body) {
        try 
        {
            const {status} = await axiosInstance.post('/cadastrarusuario', body);
            return status;
        }
        catch(e)
        {
            console.log(e);
        }
    },
    async login(obj_body) {
        try 
        {
            const response = await axiosInstance.post('/login', obj_body);
            if(response.status == 200)
            {
                return ({
                    status: response.status,
                    data: response.data
                });
            }
            else 
            {
                return ({
                    status: response.status
                });
            }
        }
        catch (e)
        {
            console.log(e);
        }
    },
    async criar_contato(obj_body) {
        try 
        {
            const {status} = await axiosInstance.post('/contato', obj_body);
            return status;
        }
        catch (e)
        {
            console.log(e);
        }
    },
    async atualizar_contato(id, obj_body)
    {
        try 
        {
            const {status} = await axiosInstance.put('/contato/' + id, obj_body);
            return status;
        }
        catch(e)
        {
            console.log(e);
        }
    },
    async apagar_contato(id)
    {
        try 
        {
            const {status} = await axiosInstance.delete('/contato/' + id);
            return status;
        }
        catch(e)
        {
            console.log(e);
        }
    },
    async selecionar_contato(id)
    {
        try 
        {
            const response = await axiosInstance.get('/contato/' + id);
            if(response.status == 200)
            {
                return ({
                    status: response.status,
                    data: response.data
                });
            }
            else 
            {
                return ({
                    status: response.status
                });
            }
        }
        catch(e)
        {
            console.log(e);
        }
    },
    async selecionar_todos_contatos()
    {
        try 
        {
            const response = await axiosInstance.get('/contato');
            if(response.status == 200)
            {
                return ({
                    status: response.status,
                    data: response.data
                });
            }
            else 
            {
                return ({
                    status: response.status
                });
            }
        }
        catch(e)
        {
            alert(e);
        }
    }
};
