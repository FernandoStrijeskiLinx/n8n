import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class HumanusApi implements ICredentialType {
	name = 'humanusApi';
	displayName = 'Humanus API';
	documentationUrl = 'humanus';
	properties = [
			{
					displayName: 'API Key',
					name: 'apiKey',
					type: 'string' as NodePropertyTypes,
					default: '',
			},
	];
}
