export default class ClarifaiGeneralResponseObject {

    response = {
        id: '',
        status: {
            code: 0,
            description: ''
        },
        created_at: '',
        model: {
            id: '',
            name: '',
            created_at: '',
            app_id: '',
            output_info: {
                output_config: {
                    concepts_mutually_exclusive: false,
                    closed_environment: false,
                    max_concepts: 0,
                    min_value: 0
                },
                message: '',
                type: '',
                type_ext: '',
                fields_map: {
                    concepts: ''
                }
            },
            model_version: {
                id: '',
                created_at: '',
                status: {
                    code: 0,
                    description: ''
                }
            },
            display_name: '',
            input_info: {
                fields_map: {
                    image: ''
                }
            },
            train_info: {},
            model_type_id: ''
        },
        input: {
            id: '',
            data: {
                image: {
                    url: ''
                }
            }
        },
        data: {
            concepts: [
                {
                    id: '',
                    name: 'people',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'portrait',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'one',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'adult',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'man',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'outfit',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'leader',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'wear',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'administration',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'facial expression',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'politician',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'business',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'confidence',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'tie',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'profile',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'side view',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'election',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'neckwear',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'menswear',
                    value: 0,
                    app_id: 'main'
                },
                {
                    id: '',
                    name: 'candidate',
                    value: 0,
                    app_id: 'main'
                }
            ]
        }
    }
}

export class AnotherResponseType {
    
}