import {create, remove, getList, getItem, edit} from './roadmaps.controller';

const SERVICE_URI_PREFIX = '/roadmaps';
const SERVICE_ITEM_URI = SERVICE_URI_PREFIX + '/:roadmapId';


export function RoadmapModule(app) {

    app
        .get(SERVICE_URI_PREFIX, getList)
        .get(SERVICE_ITEM_URI, getItem)
        .post(SERVICE_ITEM_URI, create)
        .put(SERVICE_ITEM_URI, edit)
        .delete(SERVICE_ITEM_URI, remove);
}
