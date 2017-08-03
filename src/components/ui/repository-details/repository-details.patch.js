import marked from 'marked';

const repositoryDetailsPatch = (view) => {
    return {
        readme : (readme) => {
            view.$.readme.innerHTML = marked(readme);
        }
    };
};
export default repositoryDetailsPatch;
