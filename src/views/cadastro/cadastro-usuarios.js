import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

function CadastroUsuarios() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/clientes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepeticao, setSenhaRepeticao] = useState('');
  // const [logradouro, setLogradouro] = useState('');
  // const [numeroResidencia, setNumeroResidencia] = useState('');
  // const [complemento, setComplemento] = useState('');
  // const [bairro, setBairro] = useState('');
  // const [cidade, setCidade] = useState('');
  // const [UF, setUF] = useState('');
  // const [CEP, setCep] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCpf('');
      setEmail('');
      setTelefone('');
      // setLogradouro('');
      // setNumeroResidencia('');
      // setBairro('')
      // setCidade('')
      // setUF('')
      // setCep('')
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setEmail(dados.email);
      setTelefone(dados.telefone);
      // setLogradouro(dados.logradouro);
      // setNumeroResidencia(dados.numeroResidencia);
      // setBairro(dados.bairro);
      // setCidade(dados.cidade);
      // setUF(dados.uf);
      // setCep(dados.cep)
    }
  }

  async function salvar() {
    let data = { id, nome, cpf, email, telefone};
    
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`Usuario ${id} cadastrado com sucesso!`);
          navigate(`/adm/listagem-usuarios`);
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
          mensagemSucesso(`Usuario ${id} alterado com sucesso!`);
          navigate(`/adm/listagem-usuarios`);
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
    setNome(dados.nome);
    setCpf(dados.cpf);
    setEmail(dados.email);
    setTelefone(dados.telefone);
  }

  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;


  return (
    <div className='listContainer'>
      <Card title='Cadastro'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome '
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CPF : *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='text'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name=' email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type="text"
                  id='inputTelefone'
                  value={telefone}
                  className='form-control'
                  name='Telefone '
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type="password" 
                  name='senha'
                  className='form-control'
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
             
              </FormGroup>
              <FormGroup label='Senha Repetição: *' htmlFor='inputSenhaRepeticao'>
                <input
                  type="password" 
                  name='senhaRepeticao'
                  className='form-control'
                  value={senhaRepeticao}
                  onChange={(e) => setSenhaRepeticao(e.target.value)}
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
                  onClick={inicializar}
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

export default CadastroUsuarios;