class SearchService {
  search(events, filters = {}) {
    let results = [...events];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      results = results.filter(
        (e) =>
          e.title.toLowerCase().includes(kw) ||
          e.description.toLowerCase().includes(kw)
      );
    }

    if (filters.tag) {
      results = results.filter((e) => e.tags.includes(filters.tag));
    }

    if (filters.fromDate) {
      const from = new Date(filters.fromDate);
      results = results.filter((e) => e.startTime >= from);
    }

    if (filters.toDate) {
      const to = new Date(filters.toDate);
      results = results.filter((e) => e.startTime <= to);
    }

    return results;
  }
}

module.exports = SearchService;
