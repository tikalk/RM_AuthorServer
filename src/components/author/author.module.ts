import {create, getItem, getList} from './author.controller';

const SERVICE_URI_PREFIX = '/author';
const SERVICE_ITEM_URI = SERVICE_URI_PREFIX + '/:authorId';


export function AuthorModule(app) {
    app
        .get(SERVICE_URI_PREFIX, getList)
        .get(SERVICE_ITEM_URI, getItem)
        .post(SERVICE_ITEM_URI, create)
    //     .put(SERVICE_ITEM_URI, edit)
    //     .delete(SERVICE_ITEM_URI, remove)
    //     .get(SERVICE_ITEM_URI + '/rating', getUserRating)
    //     .post(SERVICE_ITEM_URI + '/rating', rateRoadmap)
}
