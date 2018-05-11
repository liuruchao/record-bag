var create_template = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else if (!ctx.request.body.fields) {
    response = {code: -1, error: 'param fields illegal'};
  } else {
    let skey = ctx.request.header['x-wx-skey'];
    let fields = ctx.request.body.fields;
    let users = await ctx.knex('cSessionInfo').where({skey});

    if (users.length === 1) {
      let uuid = users[0].uuid;
      let create_time = +new Date();
      let last_visit_time = create_time;
      let template = {uuid, fields, create_time, last_visit_time};
      let result = await ctx.knex('t_template').insert(template);
      response = {code: 0, data: Object.assign({tid: result[0]}, template)}
    } else {
      response = {code: -1, error: `have no user with skey is ${skey}`};
    }
  }
  ctx.body = response;
};

var delete_template = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else if (!parseInt(ctx.request.body.tid)) {
    response = {code: -1, data: {error: 'param tid illegal'}};
  } else {
    let tid = parseInt(ctx.request.body.tid);
    let templates = await ctx.knex('t_template').where({tid});

    if (templates.length === 1) {
      await ctx.knex('t_template').where({tid}).del();
      response = {code: 0, data: templates[0]}
    } else {
      response = {code: -1, data: {error: `have no template with tid is ${tid}`}};
    }
  }
  ctx.body = response;
};

var update_template = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else if (!parseInt(ctx.request.body.tid)) {
    response = {code: -1, data: {error: 'param tid illegal'}};
  } else if (!ctx.request.body.fields) {
    response = {code: -1, error: 'param fields illegal'};
  } else {
    let tid = parseInt(ctx.request.body.tid);
    let fields = ctx.request.body.fields;
    let templates = await ctx.knex('t_template').where({tid});

    if (templates.length === 1) {
      let last_visit_time = +new Date();
      let new_tempalte = {fields, last_visit_time};
      let result = await ctx.knex('t_template').where('tid', '=', tid).update(new_tempalte);
      if (result === 1) {
        response = {code: 0, data: Object.assign(templates[0], new_tempalte)}
      }
    } else {
      response = {code: -1, data: {error: `have no template with tid is ${tid}`}};
    }
  }
  ctx.body = response;
};

var get_templates = async (ctx, next) => {
  let response = null;
  if (!ctx.request.header['x-wx-skey']) {
    response = {code: -1, error: 'need login'};
  } else {
    let tid = parseInt(ctx.request.query.tid);
    let templates = [];

    if (tid) {
      templates = await ctx.knex('t_template').where({tid});
    } else {
      templates = await ctx.knex('t_template').select();
    }

    response = {code: 0, data: templates}
  }
  ctx.body = response;
};

module.exports = {
  'POST /template': create_template,
  'DELETE /template': delete_template,
  'PUT /template': update_template,
  'GET /template': get_templates
};