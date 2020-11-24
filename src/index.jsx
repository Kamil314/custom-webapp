import React from 'react';
import { render } from 'react-dom';
import './styles.less';


import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <App />,
    document.getElementById('app')
);