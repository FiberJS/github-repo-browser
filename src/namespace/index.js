import Flight from 'flight';

const NameSpace = {
    System : Flight.getOrCreateEventPool('data/system'),
    GitHub : Flight.getOrCreateEventPool('data/github'),
};

export default NameSpace;
