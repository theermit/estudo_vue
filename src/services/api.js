import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:80'
})

axiosInstance.interceptors.request.use(
    (config) => {
        if(process.env.NODE_ENV === 'development')
        {
            config.headers['Access-Control-Allow-Origin'] = '*'; // Permite solicitações de qualquer origem
            config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'; // Permite os métodos HTTP especificados
            config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'; // Permite os cabeçalhos especificados
        }
        
        if(window.localStorage.logado != undefined)
        {
            if(window.localStorage.logado.toLowerCase() == 'true')
            {
                const token = window.localStorage.token;
                if (token) 
                    config.headers['authorization'] = `${token}`;
                
            }
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
            const response = await axiosInstance.post('/api/consultaremail', obj_body);
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
            const {status} = await axiosInstance.post('/api/cadastrarusuario', body);
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
            const response = await axiosInstance.post('/api/login', obj_body);
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
            const {status} = await axiosInstance.post('/api/incluir_contato', obj_body);
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
            const {status} = await axiosInstance.put('/api/editar_contato/' + id, obj_body);
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
            const {status} = await axiosInstance.delete('/api/apagar_contato/' + id);
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
            const response = await axiosInstance.get('/api/contato/' + id);
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
            const response = await axiosInstance.get('/api/lista');
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
