import React from 'react';

const TemplateContext = React.createContext();

export class TemplateProvider extends React.Component {
    state = {
        dataTemplate: null,
        bodyTemplates: [],
        idTemplate: null,
        edit: false,
        create : false,
        listTemplates : []
    }

    updateTemplates = ( data ) => {
        this.setState({
            listTemplates : data
        });
    }

    selectedTemplateEdit = (data, id) => {
        this.setState({
            dataTemplate: data
        });

        if (data != null) {
            data.map((items) => (
                this.setState({
                    bodyTemplates: JSON.parse(items.body),
                    idTemplate: id,
                    edit: true,
                    create : false
                })

            ));
        }
    }

    addElementBody = (newElem) => {
        this.state.bodyTemplates.push([newElem , null]);
    }

    deleteEmenetBody = (elem) => {
        
        var newArr = [];

        this.state.bodyTemplates.map((item) => {
            let index = item.indexOf(elem);
            if (index == -1) {
                newArr.push(item);
                return;
            }
        });
        
        this.setState({
            bodyTemplates : newArr
        });
    }

    saveUpdateTemplate = () => {
        this.setState({
            dataTemplate: null,
            bodyTemplates: [],
            idTemplate: null,
            edit: false,
            create : false
        })
    }

    createTemplate = () => {
        this.setState({
            create : true,
            edit : false
        })
    }


    render() {

        const { dataTemplate, bodyTemplates, idTemplate, edit, create, listTemplates } = this.state;
        const { selectedTemplateEdit, addElementBody, deleteEmenetBody, saveUpdateTemplate, createTemplate, updateTemplates, forceUpdateList } = this;

        return (
            <TemplateContext.Provider value={{ edit, create, listTemplates, dataTemplate, bodyTemplates, idTemplate, selectedTemplateEdit, addElementBody, deleteEmenetBody, saveUpdateTemplate, createTemplate, updateTemplates, forceUpdateList }}>
                {this.props.children}
            </TemplateContext.Provider>
        );
    }
}
export default TemplateContext;