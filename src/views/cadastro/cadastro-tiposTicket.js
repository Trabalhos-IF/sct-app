import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios3';
import { BASE_URL as  BASE_URL2} from '../../config/axios';
import { Save } from '@mui/icons-material';

function CadastroTiposTicket() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/tiposTicket`;

  const [id, setId] = useState('');
  const [idCinema, setIdCineme] = useState(0);
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');



  const [dados, setDados] = React.useState([]);

  async function salvar() {
    let data = { id, tipo };
    
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`Tipo de ticket ${tipo} cadastrado com sucesso!`);
          navigate(`/adm/listagem-tiposTicket`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`tipoTicket ${tipo} alterado com sucesso!`);
          navigate(`/adm/listagem-tiposTicket`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if(idParam == null) return;
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setTipo(dados.tipo);
  }

  const [dadosTipoTicket, setDadosTickets] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/tiposTicket`).then((response) => {
      setDadosTickets(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  const retornarListagem = () => navigate(`/adm/listagem-tiposTicket`);

  return (
    <div className='listContainer'>
      <Card title='Cadastro de Tipos de Tickets'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Tipo: *' htmlFor='inputTipo'>
                <input
                  type='text'
                  id='inputTipo'
                  value={tipo}
                  className='form-control'
                  name='tipo'
                  onChange={(e) => setTipo(e.target.value)}
                />
              </FormGroup>
              
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={retornarListagem}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroTiposTicket;