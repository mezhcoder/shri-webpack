import React from 'react';

import {LinkEntity} from '../entities/link';
import {LinkComponent} from '../components/Link';

const App = () => {
    return (
        <p>
            <div>{LinkComponent}</div>
            <div>{LinkEntity}</div>
        </p>
    )
};

export default App;