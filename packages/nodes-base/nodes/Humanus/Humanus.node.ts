import { json } from 'express';
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
import { IData } from './Interfaces';

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
										name: 'Employees',
										value: 'employees',
								},
								{
									name: 'Accounting',
									value: 'accounting',
							  },
								{
									name: 'Financial',
									value: 'financial',
							  },
						],
						default: 'employees',
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
												'employees',
												'accounting',
												'financial',
										],
								},
						},
						options: [
								{
										name: 'Export',
										value: 'export',
										description: 'Export all datas',
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
					displayName: 'Employee CPF',
					name: 'cpf',
					type: 'string',
					required: true,
					displayOptions: {
							show: {
									operation: [
											'export',
									],
									resource: [
										'employees',
									],
							},
					},
					default:'',
					description:'Employee CPF to be exported.',
				},
				{
					displayName: 'Company Code',
					name: 'codEmpresa',
					type: 'string',
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
					description:'Company code to be exported.',
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
										'financial',
									],
							},
					},
					default:'',
					description:'Year and Month of Financial Generation.',
				},
				{
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
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

		if (!body.length) {
			//nao usa body se estiver vazio
		}

		// try {
		// 	return await this.helpers.requestOAuth2.call(this, 'googlePerspectiveOAuth2Api', options);
		// } catch (error) {
		// 	throw new NodeApiError(this.getNode(), error);
		// }




		let responseData;
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    //Get credentials the user provided for this node
    const credentials = await this.getCredentials('humanusApi') as IDataObject;

    if (resource === 'employees') {
        if (operation === 'export') {
            // get email input
            //const email = this.getNodeParameter('aliasName', 0) as string; //nao utilizado
						const aliasName = this.getNodeParameter('aliasName', 0) as string;
						const cpf = this.getNodeParameter('cpf', 1) as string;

            // get additional fields input
            // const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;

						const body: IData = {
							aliasName: aliasName,
							cpf: cpf,
						};

            Object.assign(body);
						//return [this.helpers.returnJsonArray(body)]; // precisa ser IDataObject

            //Make http request according to <https://crsistemas.net.br/humanus/humanus/integracao/api/swagger/index.html>
						//https://crsistemas.net.br/humanus/humanus/integracao/api/planx/integracaoColaborador/cadastro

            const options: OptionsWithUri = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${credentials.apiKey}`,
                },
                method: 'POST',
                body: body,
                uri: `https://crsistemas.net.br/humanus/humanus/integracao/api/planx/integracaoColaborador/cadastro`,
                json: true,
            };

            responseData = await this.helpers.request(options);
        }
    }

    // Map data to n8n data
    return [this.helpers.returnJsonArray(responseData)];
	}
}
