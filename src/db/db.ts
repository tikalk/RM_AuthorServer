import {connect} from 'mongoose';
import './models/roadmap.model';
import './models/rating.model';

export let DB = () =>  {
    connect('mongodb://tikal:123123@ds153682.mlab.com:53682/tikal-roadmap');
};
