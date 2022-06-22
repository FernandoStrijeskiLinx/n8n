//importa a biblioteca express e funcionalidades nativas do n8n
import { json } from 'express';
import {
	IExecuteFunctions,
} from 'n8n-core';

//importa as interfaces utilizadas pelo workflow
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

//importa o arquivo de interfaces que criamos na pasta Humanus
import {
	OptionsWithUri,
} from 'request';
import { IData } from './Interfaces';

//cria o objeto Humanus para exportação como um tipo node
export class Humanus implements INodeType {
	description: INodeTypeDescription = {
			//Nome do node que será exibido
			displayName: 'Humanus',
			//nome interno do node
			name: 'humanus',
			//arquivo de imagem que criamos na pasta como ícone
			icon: 'file:humanus.png',
			//grupo que pertence o node
			group: ['transform'],
			//versão do node
			version: 1,
			//descrição que aparece junto do node ao utilizar
			description: 'Consume Humanus API',
			//configurações padrao de nome e cor
			defaults: {
					name: 'Humanus',
					color: '#1A82e2',
			},
			inputs: ['main'],
			outputs: ['main'],
			//node do arquivo de credenciais criado na pasta de "Credenciais"
			credentials: [
				{
					name: 'humanusApi',
					required: true,
			},
			],
			properties: [
					// Propriedades do node que serão exibidas para o usuario utilizar
					{
						displayName: 'Resource',
						name: 'resource',
						type: 'options',
						options: [
								{
									//Pode selecionar o recurso "Colaboradores"
									name: 'Employees',
									value: 'employees',
								},
								{
									//Pode selecionar o recurso "Contábil"
									name: 'Accounting',
									value: 'accounting',
							  },
								{
									//Pode selecioar o recurso "Financeiro"
									name: 'Financial',
									value: 'financial',
							  },
						],
						//Recurso exibido por padrão "Colaboradores"
						default: 'employees',
						required: true,
						//Descrição genérica
						description: 'Resource to consume',
				},
				{
						//Aqui criamos as operações a serem realizadas pelos recursos acima
						displayName: 'Operation',
						name: 'operation',
						type: 'options',
						displayOptions: {
								show: {
										//Aqui definimos quais recursos permitem exibir as operações
										resource: [
												'employees',
												'accounting',
												'financial',
										],
								},
						},
						//agora criamos as opções que serão exibidas dentro das operações
						options: [
								{
										//Exportar com uma breve descrição da ação
										name: 'Export',
										value: 'export',
										description: 'Export all datas',
								},
						],
						default: 'export',
						description: 'The operation to perform.',
				},
				{
					  //A partir daqui são os campos com preenchimento obrigatórios para cada tipo de recurso
						//AliasName é o nome da conexão que a API utilizada pelo node precisa para saber em qual base conectar.
						displayName: 'AliasName',
						name: 'aliasName',
						type: 'string',
						required: true,
						displayOptions: {
								show: {
										//aqui definimos que a operação sera exportação, com o mesmo nome que definimos acima em operação.
										operation: [
												'export',
										],
										//aqui determinamos quais recursos vão exibir esse campo AliasName
										resource: [
											'employees',
											'accounting',
											'financial',
										],
								},
						},
						default:'',
						description:'Alias name of database.',
				},
				{
					//Aqui um exemplo de um campo "CPF" que é exibido apenas para o tipo de recurso "Colaboradores"
					displayName: 'Employee CPF',
					name: 'cpf',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									//Exibe apenas para exportação
									operation: [
											'export',
									],

									//Recurso a ser exibido "Colaboradores"
									resource: [
										'employees',
									],
							},
					},
					default:'',
					description:'Employee CPF to be exported.',
				},
				{
					//Aqui um exemplo de um campo "Código da empresa" que é exibido para os recursos "Contábil e Financeiro"
					displayName: 'Company Code',
					name: 'codEmpresa',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									//Exibe apenas para exportação
									operation: [
											'export',
									],
									//Recursos as serem exibidos "Contabil e Financeiro"
									resource: [
										'accounting',
										'financial',
									],
							},
					},
					default:'',
					description:'Company code to be exported.',
				},
				{
					//Exemplo de campo da "competência a ser gerada" exibido apenas para o recurso "Financeiro".
					displayName: 'Year and Month of Financial Generation',
					name: 'competenciaGeracao',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'financial',
									],
							},
					},
					default:'',
					description:'Year and Month of Financial Generation.',
				},
				{
					//Campo data de geração exibido apenas para o recurso "Financeiro".
					displayName: 'Date Generation',
					name: 'dataGeracao',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'financial',
									],
							},
					},
					default:'',
					description:'Financial integration generation date.',
				},
				{
					//Campo número da filial exibido para os recursos "Contábil e Financeiro".
					displayName: 'Branch Number',
					name: 'nroFilial',
					type: 'number',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'accounting',
										'financial',
									],
							},
					},
					default:'',
					description:'Branch number to be exported.',
				},
				{
					//Campo hora da geração exibido apenas para o recurso "Financeiro".
					displayName: 'Generation Time',
					name: 'horaGeracao',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'financial',
									],
							},
					},
					default:'',
					description:'Financial integration generation time.',
				},
				{
					//Campo titulos financeiros exibido apenas para o recurso "Financeiro".
					displayName: 'List of financial securities',
					name: 'listatitulos',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'financial',
									],
							},
					},
					default:'',
					description:'List of financial securities.',
				},
				{
					//Campo plano de contas exibido apenas para o recurso "Contábil".
					displayName: 'Chart of Accounts',
					name: 'planoContas',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'accounting',
									],
							},
					},
					default:'',
					description:'Chart of Accounts used by accounting export.',
				},
				{
					//Campo competência do lote (ano + mes) exibido apenas para o recurso "Contábil".
					displayName: 'Year and Month Accounting Lot',
					name: 'competenciaLote',
					type: 'number',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'accounting',
									],
							},
					},
					default:'',
					description:'Year and Month Accounting Lot.',
				},
			],
	};

	//Ação assíncrona executada durante a chamada do node pelo usuário na aplicação n8n
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		//Essa função sempre retorna uma interface IDataObject

		var body: IDataObject = {};

		// const options: OptionsWithUri = {
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	},
		// 	method,
		// 	body,
		// 	uri: `https://commentanalyzer.googleapis.com${endpoint}`,
		// 	json: true,
		// };

		// if (!body.length) {
		// 	//nao usa body se estiver vazio
		// }

		// try {
		// 	return await this.helpers.requestOAuth2.call(this, 'googlePerspectiveOAuth2Api', options);
		// } catch (error) {
		// 	throw new NodeApiError(this.getNode(), error);
		// }



		//dados de retorno
		let responseData;
		//aqui recuperamos o recursos selecionado pelo usuário (ex. "Colaboradores")
    const resource = this.getNodeParameter('resource', 0) as string;

		//aqui recuperamos a operação selecionada pelo usuario (ex. "Exportação")
    const operation = this.getNodeParameter('operation', 0) as string;

    //Aqui recuperamos as credenciais fornecidas pelo usuário
    const credentials = await this.getCredentials('humanusApi') as IDataObject;

		//Inicialmente só tratei para caso o recurso selecionado seja "Colaboradores", precisa ser feito para os demais
    if (resource === 'employees') {
				//Se o usuario selecionou a opção de exportação então entra no if
        if (operation === 'export') {
            //Recupera os campos preenchidos pelo usuario de "aliasName e cpf"
						const aliasName = this.getNodeParameter('aliasName', 0) as string;
						const cpf = this.getNodeParameter('cpf', 1) as string;

            // Caso precise criar parametros adicionais opcionais, recupera dessa forma abaixo:
            // const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;

						//Agora vamos criar uma interface alimnentando com o conteúdo dos campos preenchidos pelo usuario, para enviar no corpo da requisição POST.
						const body: IData = {
							aliasName: aliasName,
							cpf: cpf,
						};

						//atribui as propriedades do objeto js para a interface
            Object.assign(body);

            //Agora monta a requisição na api a partir das instruções descritas pelo swagger <https://crsistemas.net.br/humanus/humanus/integracao/api/swagger/index.html>
						//endpoint utilizado: https://crsistemas.net.br/humanus/humanus/integracao/api/planx/integracaoColaborador/cadastro

            const options: OptionsWithUri = {
								//define o header para aceitar o json e autenticar na api pela chave fornecida pelo usuario no n8n
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${credentials.apiKey}`,
                },
                method: 'POST',
								//envia os parâmetros da requisição (aliasName, cpf) no corpo.
                body: body,
                uri: `https://crsistemas.net.br/humanus/humanus/integracao/api/planx/integracaoColaborador/cadastro`,
                json: true,
            };

						//Chama a requisição de forma síncrona e retona o resultado
            responseData = await this.helpers.request(options);
        }
    }

    // Mapeia as informações do json para o tipo de interface IDataObject utilizado pelo n8n
    return [this.helpers.returnJsonArray(responseData)];
	}
}
