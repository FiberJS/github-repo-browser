
class Repository {

    constructor(repo) {
        this.name = repo.name;
        this.description = repo.description || '- no description -';
        this.language = repo.language || '?';
        this.fork = repo.fork;
        this.url = repo.url;
    }

    clone() {
        return new Repository(this);
    }
}

export default Repository;
