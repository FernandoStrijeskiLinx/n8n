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
			],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
			return [[]];
	}
}
