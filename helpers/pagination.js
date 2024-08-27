let pagaMetaService = (page, limit, result, total) => {
  
  let pageCount = Math.ceil(total / limit);

  return {
    result: result,
    total:limit,
    pageMeta: {
      page,
      pageCount,
      nextPage: page >= Math.ceil(total/limit) ? null : page + 1,
      pageSize: limit,
      hasNextPage: page < pageCount,
      total: total,
    },
  };
};

module.exports = {
  pagaMetaService,
};
