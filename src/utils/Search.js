import Fuse from "fuse.js";

export default function Search(query, data) {
    const fuse = new Fuse(data, {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 80,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["info.name", "info.tags"]
    });

    const result = fuse.search(query);

    return result.map((m) => m.item);
}
