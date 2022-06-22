//importa as interfaces de credenciais e propriedades utilizadas pelo n8n
import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

//cria o objeto "HumanusApi" como uma interface de credencial
export class HumanusApi implements ICredentialType {
	//Nome da interface de credencial a ser utilizado pelo node
	name = 'humanusApi';
	//Nome a ser exibido dentro do node
	displayName = 'Humanus API';
	//Link para documentação quando existir
	documentationUrl = 'humanus';
	properties = [
			{
				  //nome do campo dentro das credenciais onde vamos colar a chave bearer gerada
					displayName: 'API Key',
					//nome interno do campo
					name: 'apiKey',
					//tipo texto
					type: 'string' as NodePropertyTypes,
					default: '',
			},
	];
}
