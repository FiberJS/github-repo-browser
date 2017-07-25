const repositoryPatch = (view) => {
    return {
        name : [view.$.name],
        description : [view.$.description],
        language : (language) => {
            view.$.language.innerHTML = language;
            view.$.language.className = classNameFor(language);
        },
        fork : (fork) => {
            view.className = fork ? 'forked' : '';
        },
    };
};
export default repositoryPatch;

function classNameFor(language) {
    return language.toLowerCase()
        .replace(/[\+]/g, 'p')
        .replace(/[^a-z]/g, '')
        ;
}
