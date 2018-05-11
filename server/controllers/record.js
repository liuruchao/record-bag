var create_record = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else if (!ctx.request.body.tid) {
    response = {code: -1, error: 'need tid'};
  } else if (!ctx.request.body.detail) {
    response = {code: -1, error: 'need detail'};
  } else {
    let skey = ctx.request.header['x-wx-skey'];
    let tid = ctx.request.body.tid;
    let detail = ctx.request.body.detail;
    let users = await ctx.knex('cSessionInfo').where({skey});
    // 检查用户
    if (users.length === 1) {
      let uuid = users[0].uuid;
      // 检查模版
      let templates = await ctx.knex('t_template').where({tid, uuid});
      if (templates.length === 1) {
        let create_time = +new Date();
        let last_visit_time = create_time;
        let record = {tid, uuid, detail, create_time, last_visit_time};
        let result = await ctx.knex('t_record').insert(record);
        response = {code: 0, data: Object.assign({rid: result[0]}, record)}
      } else {
        response = {code: -1, error: `have no template with tid is ${tid}`};
      }
    } else {
      response = {code: -1, error: `have no user with skey is ${skey}`};
    }
  }
  ctx.body = response;
};

var delete_record = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else if (!parseInt(ctx.request.body.rid)) {
    response = {code: -1, data: {error: 'param rid illegal'}};
  } else {
    let rid = parseInt(ctx.request.body.rid);
    let records = await ctx.knex('t_record').where({rid});

    if (records.length === 1) {
      await ctx.knex('t_record').where({rid}).del();
      response = {code: 0, data: records[0]}
    } else {
      response = {code: -1, data: {error: `have no record with rid is ${rid}`}};
    }
  }
  ctx.body = response;
};

var update_record = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else if (!parseInt(ctx.request.body.rid)) {
    response = {code: -1, data: {error: 'param rid illegal'}};
  } else if (!ctx.request.body.detail) {
    response = {code: -1, error: 'param detail illegal'};
  } else {
    let rid = parseInt(ctx.request.body.rid);
    let detail = ctx.request.body.detail;
    let records = await ctx.knex('t_record').where({rid});

    if (records.length === 1) {
      let last_visit_time = +new Date();
      let new_record = {detail, last_visit_time};
      let result = await ctx.knex('t_record').where('rid', '=', rid).update(new_record);
      if (result === 1) {
        response = {code: 0, data: Object.assign(records[0], new_record)}
      }
    } else {
      response = {code: -1, data: {error: `have no record with rid is ${rid}`}};
    }
  }
  ctx.body = response;
};

var get_records = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else {
    let rid = parseInt(ctx.request.query.rid);
    let tid = parseInt(ctx.request.query.tid);
    let uuid = ctx.request.uuid;
    let records = [];
    let record = {};
    if (rid) {
      record.rid = rid;
    } else {
      tid && (record.tid = tid);
      uuid && (record.uuid = uuid);
    }

    if (record.rid || record.tid || record.uuid) {
      records = await ctx.knex('t_record').where(record);
    } else {
      records = await ctx.knex('t_record').select();
    }

    response = {code: 0, data: records}
  }
  ctx.body = response;
};

module.exports = {
  'POST /record': create_record,
  'DELETE /record': delete_record,
  'PUT /record': update_record,
  'GET /record': get_records
};