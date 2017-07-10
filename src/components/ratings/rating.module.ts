import {create, getItem} from './rating.controller';

const SERVICE_URI_PREFIX = '/rating';
const SERVICE_ITEM_URI = SERVICE_URI_PREFIX + '/:user';


export function RatingModule(app) {

    app
        .get(SERVICE_ITEM_URI, getItem)
        .post(SERVICE_ITEM_URI, create)
}
