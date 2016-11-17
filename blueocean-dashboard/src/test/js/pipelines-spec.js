import { prepareMount } from './util/EnzymeUtils';
prepareMount();

import React from 'react';
import { assert } from 'chai';
import { mount, shallow } from 'enzyme';

import { Pipelines } from '../../main/js/components/Pipelines.jsx';
import { pipelines } from './data/pipelines/pipelinesSingle';
import { pipelinesDupName } from './data/pipelines/pipelinesTwoJobsSameName';

const resultArrayHeaders = ['Name', 'Status', 'Branches', 'Pull Requests', ''];

describe('Pipelines', () => {
    const config = {
        getRootURL: () => '/',
    };

    const context = {
        params: {},
        location: {},
        config,
    };

    describe('basic table rendering', () => {
        let wrapper;

        beforeEach(() => {

            wrapper = shallow(
                <Pipelines pipelines={pipelines} setTitle={()=>{}}/>,
                { context }
            );
        });

        it('check header to be as expected', () => {
            assert.equal(wrapper.find('Table').props().headers.length, resultArrayHeaders.length);
        });

        it('check rows number to be as expected', () => {
            assert.equal(wrapper.find('PipelineRowItem').length, 2);
        });
    });

    describe('duplicate job names', () => {
        it('should render two rows when job names are duplicated across folders', () => {

            const wrapper = mount(
                <Pipelines pipelines={pipelinesDupName} setTitle={()=>{}}/>,
                { context },
            );

            assert.equal(wrapper.find('PipelineRowItem').length, 2);
        });
    });
});
