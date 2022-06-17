import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	OptionsWithUri,
} from 'request';

export class Humanus implements INodeType {
	description: INodeTypeDescription = {
			displayName: 'Humanus',
			name: 'humanus',
			icon: 'file:humanus.png',
			group: ['transform'],
			version: 1,
			description: 'Consume Humanus API',
			defaults: {
					name: 'Humanus',
					color: '#1A82e2',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'humanusApi',
					required: true,
			},
			],
			properties: [
					// Node properties which the user gets displayed and
					// can change on the node.
					{
						displayName: 'Resource',
						name: 'resource',
						type: 'options',
						options: [
								{
										name: 'Exportação de colaboradores',
										value: 'expColabs',
								},
								{
									name: 'Exportação contábil',
									value: 'expContabil',
							  },
								{
									name: 'Exportação financeira',
									value: 'expFinanceira',
							  },
						],
						default: 'expColabs',
						required: true,
						description: 'Resource to consume',
				},
				{
						displayName: 'Operation',
						name: 'operation',
						type: 'options',
						displayOptions: {
								show: {
										resource: [
												'expColabs',
												'expContabil',
												'expFinanceira',
										],
								},
						},
						options: [
								{
										name: 'Export',
										value: 'export',
										description: 'Exporta as informações',
								},
						],
						default: 'export',
						description: 'The operation to perform.',
				},
				{
						displayName: 'AliasName',
						name: 'aliasName',
						type: 'string',
						required: true,
						displayOptions: {
								show: {
										operation: [
												'export',
										],
										resource: [
											'expColabs',
											'expContabil',
											'expFinanceira',
										],
								},
						},
						default:'',
						description:'Apelido da base do cliente',
				},
				{
					displayName: 'CPF',
					name: 'cpf',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expColabs',
									],
							},
					},
					default:'',
					description:'CPF do colaborador a ser exportado.',
				},
				{
					displayName: 'Codigo Empresa',
					name: 'codEmpresa',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expContabil',
										'expFinanceira',
									],
							},
					},
					default:'',
					description:'Código da empresa a ser exportada.',
				},
				{
					displayName: 'Competência Geração',
					name: 'competenciaGeracao',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expFinanceira',
									],
							},
					},
					default:'',
					description:'Competência para realizar a geração financeira.',
				},
				{
					displayName: 'Data Geração',
					name: 'dataGeracao',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expFinanceira',
									],
							},
					},
					default:'',
					description:'Data da geração da integrção financeira.',
				},
				{
					displayName: 'Número Filial',
					name: 'nroFilial',
					type: 'number',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expContabil',
										'expFinanceira',
									],
							},
					},
					default:'',
					description:'Número da Filial a ser exportada.',
				},
				{
					displayName: 'Hora da geração',
					name: 'horaGeracao',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expFinanceira',
									],
							},
					},
					default:'',
					description:'Hora da geração da integrção financeira.',
				},
				{
					displayName: 'Lista dos títulos',
					name: 'listatitulos',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expFinanceira',
									],
							},
					},
					default:'',
					description:'Lista dos títulos a exportar da integração financeira.',
				},
				{
					displayName: 'Plano de Contas',
					name: 'planoContas',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expContabil',
									],
							},
					},
					default:'',
					description:'Plano de Contas utilizado pela contabilização.',
				},
				{
					displayName: 'Competência Lote',
					name: 'competenciaLote',
					type: 'number',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'expContabil',
									],
							},
					},
					default:'',
					description:'Competência utilizada para geração do lote contábil.',
				},
			],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
			return [[]];
	}
}
