import React from 'react';

import Card from '../../components/card';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import { BASE_URL as  BASE_URL2} from '../../config/axios';

const baseURL = `${BASE_URL}/tiposTickets`;

function ListagemTiposTicket() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`../adm/cadastro/cadastro-tiposTicket`);
  };

  const editar = (id) => {
    navigate(`../adm/cadastro/cadastro-tiposTicket/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
   
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Tipo de ticket excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o Tipo de ticket`);
      });
  }

  const [dadosCinemas, setDadosCinemas] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });

    axios.get(`${BASE_URL2}/cinemas`).then((response) => {
      setDadosCinemas(response.data);
    });
  }, []);

  if (!dados || !dadosCinemas) return null;

  return (
    <div className='listContainer'>
      <Card title='Listagem de tickets'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo tipo de ticket
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Código</th>
                    <th scope='col'>Cinema</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dadosCinemas.find(cinema => cinema.id === dado.idCinema).nome}</td>
                      <td>{dado.tipo}</td>
                      <td>{dado.valor}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemTiposTicket;